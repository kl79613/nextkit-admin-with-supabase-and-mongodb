/**
 * Client-side fetch utility with automatic 401 error handling and redirect to login
 * @param input - Request URL or Request object
 * @param init - Fetch options (headers, method, body, etc.)
 * @returns Promise<any> - Returns parsed JSON data
 * @throws {AuthExpiredError} When response code is 401
 */
export async function clientFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<any> {
  const res = await fetch(input, {
    ...init,
    credentials: "include", // 自动带 Cookie
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
    },
  });
  // ⭐ 统一处理 401
  const data = await res.json();
  if (data.code === 401) {
    // 跳转到登录页
    window.location.href = "/";

    throw new AuthExpiredError();
  }

  return data;
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
