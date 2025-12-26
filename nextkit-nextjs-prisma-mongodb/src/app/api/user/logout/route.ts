import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { serverFetch, handleAuthError } from "@/lib/serverFetch";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    const res = await serverFetch(`${apiUrl}/user/logout`, {
      method: "POST",
    });

    const data = await res.json();
    console.log(data, "POST/api/user/logout data");

    if (data.code === 0) {
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("expireAt");
      return NextResponse.json(
        { message: "User Logged out successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: data.error || data.msg || "Logout failed" },
      { status: res.status }
    );
  } catch (error) {
    // 处理 401 错误
    if (error instanceof Error && error.name === "AuthExpiredError") {
      // 即使 token 过期，也清除本地 cookies
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("expireAt");
      return handleAuthError(error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
