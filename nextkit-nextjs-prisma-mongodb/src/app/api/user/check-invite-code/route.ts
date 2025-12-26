import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    if (!code) {
      return NextResponse.json(
        { error: "Invite code is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${apiUrl}/invite/validateCode`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // 如果请求失败，返回错误
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || data.msg || "Invalid invite code" },
        { status: res.status }
      );
    }

    // 返回格式: { is_valid: 1 | 0 }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error checking invite code:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
