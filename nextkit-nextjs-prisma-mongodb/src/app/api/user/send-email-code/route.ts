import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type } = body;
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email and type are required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${apiUrl}/user/sendEmailCode`, {
      method: "POST",
      body: JSON.stringify({ email, type }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // 如果请求失败，返回错误
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || data.msg || "Failed to send email code" },
        { status: res.status }
      );
    }

    // 返回格式: ApiResponse<VerificationCodeData>
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email code:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
