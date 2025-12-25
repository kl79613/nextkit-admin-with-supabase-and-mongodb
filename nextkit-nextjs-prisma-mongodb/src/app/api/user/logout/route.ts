import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    const res = await fetch(`${apiUrl}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.cookies.get("accessToken")?.value}`,
      },
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
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
