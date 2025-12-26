import { NextRequest, NextResponse } from "next/server";
import { serverFetch, handleAuthError } from "@/lib/serverFetch";

export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  mobile: string;
  level_id: number;
  level_name: string;
  join_time: string;
}

export interface Invite {
  id: number;
  code: string;
  status: 0 | 1; // 0未使用，1已使用
  used_by_user_id: number | null;
  used_by_user: User | null;
  used_at_ts: number | null;
  expired_at_ts: number | null;
  created_at_ts: number;
  updated_at_ts: number;
  invite_link: string;
}

export interface InviteResponse {
  limit: number;
  total: number;
  remaining: number;
  list: Invite[];
}

export async function POST(req: NextRequest) {
  try {
    const apiUrl = process.env.EXTERNAL_API_BASE_URL;

    const res = await serverFetch(`${apiUrl}/invite/myCodes`, {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || data.msg || "Failed to fetch invite codes" },
        { status: res.status }
      );
    }

    // 返回 InviteResponse 格式
    return NextResponse.json(data);
  } catch (error) {
    console.log(error, "error=====================");
    // 处理 401 错误
    if (error instanceof Error && error.name === "AuthExpiredError") {
      return handleAuthError(error);
    }
    console.error("Error fetching invite codes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
