import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    const res = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || data.msg || "Registration failed" },
        { status: res.status }
      );
    }

    // 根据 LoginResponse 接口，返回格式应该是:
    // { token, refresh_token, expire_at, user }
    // 参考 login route 的数据结构，可能是 data.data 或 data
    const loginResponse = {
      token: data.data?.token || data.token,
      refresh_token: data.data?.refresh_token || data.refresh_token,
      expire_at: data.data?.expire_at || data.expire_at,
      user: data.data?.user || data.user,
    };

    const response = NextResponse.json(loginResponse);

    // 设置 cookies（参考 login route 的设置方式）
    if (loginResponse.token) {
      response.cookies.set("accessToken", loginResponse.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (loginResponse.refresh_token) {
      response.cookies.set("refreshToken", loginResponse.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (loginResponse.expire_at) {
      response.cookies.set("expireAt", String(loginResponse.expire_at), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
