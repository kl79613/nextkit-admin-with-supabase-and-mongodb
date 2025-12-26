import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Refresh access token using refresh token
 * @throws {AuthExpiredError} When refresh token is invalid or expired
 */
async function refreshToken(): Promise<void> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refreshToken")?.value;
  const apiUrl = process.env.EXTERNAL_API_BASE_URL;

  if (!refresh) {
    throw new AuthExpiredError();
  }

  const res = await fetch(`${apiUrl}/user/refreshToken`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refresh}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new AuthExpiredError();
  }

  const data = await res.json();
  const newAccessToken = data.data?.token || data.token || data.accessToken;

  if (!newAccessToken) {
    throw new AuthExpiredError();
  }

  // 更新 accessToken cookie
  cookieStore.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // 如果返回了新的 refresh_token，也更新它
  const newRefreshToken = data.data?.refresh_token || data.refresh_token;
  if (newRefreshToken) {
    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  // 如果返回了新的 expire_at，也更新它
  const newExpireAt = data.data?.expire_at || data.expire_at;
  if (newExpireAt) {
    cookieStore.set("expireAt", String(newExpireAt), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }
}

/**
 * Server-side fetch utility with automatic token handling, 401 error handling, and token refresh
 * @param input - Request URL or Request object
 * @param init - Fetch options (headers, method, body, etc.)
 * @param retryCount - Internal retry counter to prevent infinite loops
 * @returns Promise<Response>
 * @throws {AuthExpiredError} When response status is 401 or refresh token fails
 */
export async function serverFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  retryCount: number = 0
): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  // ⭐ 检查响应体中的 code，如果是 4011 则刷新 token 并重试
  // 注意：需要先 clone response 来读取 body，因为 Response 只能读取一次
  // 只有在响应成功（200-299）时才检查 code
  if (res.ok) {
    const clonedRes = res.clone();
    console.log(clonedRes, "clonedRes=====================");
    const data = await clonedRes.json();
    console.log(data.code, "data.code=====================");
    // ⭐ 统一处理 401 HTTP 状态码
    if (data.code === 401) {
      throw new AuthExpiredError();
    }

    try {
      const contentType = clonedRes.headers.get("content-type");
      // 只处理 JSON 响应
      if (contentType?.includes("application/json")) {
        // 如果响应 code 是 4011，表示 token 需要刷新
        if (data.code === 4011) {
          // 防止无限重试
          if (retryCount >= 1) {
            throw new AuthExpiredError();
          }

          // 刷新 token
          await refreshToken();

          // 重新发送原始请求
          return serverFetch(input, init, retryCount + 1);
        }
      }
    } catch (error) {
      // 如果解析 JSON 失败或刷新 token 失败
      if (error instanceof AuthExpiredError) {
        throw error;
      }
      // 如果不是 JSON 响应或其他错误，继续返回原始响应
    }
  }

  return res;
}

/**
 * Custom error class for authentication expiration
 */
export class AuthExpiredError extends Error {
  constructor() {
    super("Authentication expired. Please login again.");
    this.name = "AuthExpiredError";
  }
}

/**
 * Helper function to handle AuthExpiredError in route handlers
 * Returns a NextResponse with 401 status and error message
 */
export async function handleAuthError(error: unknown): Promise<NextResponse> {
  if (error instanceof AuthExpiredError) {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("expireAt");
    return NextResponse.json(
      { error: "Authentication expired. Please login again." },
      { status: 401 }
    );
  }
  throw error; // Re-throw if it's not an AuthExpiredError
}
