"use client";
import { useState, useEffect } from "react";
import { Copy, Check, User, UserPlus, Sparkles } from "lucide-react";
import { message } from "antd";
import { clientFetch } from "@/lib/clientFetch";
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}
// 类型定义（与 API route 保持一致）
interface User {
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

interface Invite {
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

interface InviteResponse {
  limit: number;
  total: number;
  remaining: number;
  list: Invite[];
}

interface InviteCode {
  id: string;
  code: string;
  link: string;
  status: "unused" | "used";
  usedBy?: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
}

// 日期显示组件，避免 hydration mismatch
const CreatedDateDisplay = ({ date }: { date: Date }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    // 只在客户端格式化日期，避免 SSR 和客户端不一致
    setFormattedDate(
      `Created: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
    );
  }, [date]);

  return <span>{formattedDate || "Loading..."}</span>;
};

const InviteSection = () => {
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<"code" | "link" | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [maxInvites, setMaxInvites] = useState(6);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // 将 API 返回的 Invite 转换为组件需要的 InviteCode 格式
  const transformInviteToInviteCode = (invite: Invite): InviteCode => {
    return {
      id: invite.id.toString(),
      code: invite.code,
      link:
        invite.invite_link ||
        `https://www.titlelab.ai/auth/signup?code=${invite.code}`,
      status: invite.status === 0 ? "unused" : "used",
      usedBy: invite.used_by_user
        ? {
            name: invite.used_by_user.nickname || invite.used_by_user.username,
            avatar: invite.used_by_user.avatar || "",
          }
        : undefined,
      createdAt: new Date(invite.created_at_ts * 1000), // 时间戳转 Date
    };
  };

  // 获取邀请码列表
  const fetchInviteCodes = async () => {
    try {
      setLoading(true);
      const res = await clientFetch("/api/invite/myCodes", {
        method: "POST",
      });

      // clientFetch 已经返回解析后的 JSON 数据
      const inviteData = res as ResponseData<InviteResponse>;
      console.log(
        inviteData,
        "inviteData=====================fetchInviteCodes"
      );
      // 更新限制和统计信息
      setMaxInvites(inviteData.data.limit);
      setTotal(inviteData.data.total);
      setRemaining(inviteData.data.remaining);

      // 转换并设置邀请码列表
      const transformedCodes = inviteData.data.list.map(
        transformInviteToInviteCode
      );
      setInviteCodes(transformedCodes);
    } catch (error: any) {
      console.error("Failed to fetch invite codes:", error);
      message.error(error?.message || "Failed to fetch invite codes");
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取邀请码列表
  useEffect(() => {
    fetchInviteCodes();
  }, []);

  const usedCount = total;
  const remainingCount = remaining;

  // 生成邀请码
  const generateInviteCode = async () => {
    // 检查是否已达到最大数量
    if (usedCount >= maxInvites) {
      message.warning("You have reached the maximum number of invite codes!");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await clientFetch("/api/invite/generate", {
        method: "POST",
      });

      // clientFetch 已经返回解析后的 JSON 数据
      const inviteData = res as ResponseData<InviteResponse>;
      console.log(
        inviteData,
        "inviteData=====================generateInviteCode"
      );
      // 返回的是完整的列表响应（包含 limit, total, remaining, list）
      if (inviteData.data.list && Array.isArray(inviteData.data.list)) {
        // 更新限制和统计信息
        setMaxInvites(inviteData.data.limit);
        setTotal(inviteData.data.total);
        setRemaining(inviteData.data.remaining);

        // 转换并设置邀请码列表
        const transformedCodes = inviteData.data.list.map(
          transformInviteToInviteCode
        );
        setInviteCodes(transformedCodes);

        message.success("Invite code generated successfully!");
      } else {
        // 如果格式不符合预期，重新获取列表
        await fetchInviteCodes();
        message.success("Invite code generated successfully!");
      }
    } catch (error: any) {
      console.error("Failed to generate invite code:", error);
      message.error(
        error?.message || "Failed to generate invite code, please try again"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (
    text: string,
    id: string,
    type: "code" | "link"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setCopiedType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopiedType(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-2xl font-bold text-slate-100 text-transparent sm:text-3xl">
              Invite Friends
            </h1>
            <p className="text-sm text-slate-400">
              Share Title Lab with your friends and colleagues
            </p>
          </div>

          {/* Invite Counter */}
          <div className="w-full rounded-lg border border-cyan-500/20 bg-slate-900/50 px-6 py-4 shadow-lg shadow-cyan-500/10 backdrop-blur-sm sm:w-auto">
            <div className="text-center">
              <p className="mb-1 text-sm text-slate-400">Invite Codes</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-cyan-400">{usedCount}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-300">{maxInvites}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {remainingCount} remaining
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="mb-1 flex items-center justify-center gap-2 text-slate-100 sm:justify-start">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                Generate New Invite
              </h3>
              <p className="text-sm text-slate-400">
                Create a new invite code and link to share with others
              </p>
            </div>
            <button
              onClick={generateInviteCode}
              disabled={usedCount >= maxInvites || loading || isGenerating}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 transition-all sm:w-auto ${
                usedCount >= maxInvites || loading || isGenerating
                  ? "cursor-not-allowed bg-slate-800 text-slate-500"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Generate Invite
                </>
              )}
            </button>
          </div>
        </div>

        {/* Invite Codes List */}
        {loading ? (
          <div className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-12 text-center shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            </div>
            <h3 className="mb-2 text-slate-300">Loading Invite Codes...</h3>
            <p className="text-sm text-slate-500">
              Please wait while we fetch your invite codes
            </p>
          </div>
        ) : inviteCodes.length === 0 ? (
          <div className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-12 text-center shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50">
              <UserPlus className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="mb-2 text-slate-300">No Invites Generated Yet</h3>
            <p className="text-sm text-slate-500">
              Click the "Generate Invite" button above to create your first
              invite code
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inviteCodes.map((invite) => (
              <div
                key={invite.id}
                className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-sm transition-all hover:border-cyan-500/40"
              >
                {/* Status and Codes Row */}
                <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center">
                  {/* Status Badge */}
                  <div className="lg:w-20 lg:flex-shrink-0">
                    {invite.status === "unused" ? (
                      <span className="inline-flex w-20 items-center justify-center whitespace-nowrap rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-400 lg:w-full">
                        Unused
                      </span>
                    ) : (
                      <span className="inline-flex w-20 items-center justify-center whitespace-nowrap rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs text-green-400 lg:w-full">
                        Used
                      </span>
                    )}
                  </div>

                  {/* Invite Code */}
                  <div className="lg:w-64 lg:flex-shrink-0">
                    <label className="mb-1 block text-xs text-slate-400">
                      Invite Code
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-2 font-mono text-sm text-cyan-300">
                        {invite.code}
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(invite.code, invite.id, "code")
                        }
                        className="group flex-shrink-0 rounded-lg border border-slate-700 bg-slate-800 p-2 transition-all hover:border-cyan-500/50 hover:bg-slate-700"
                        title="Copy code"
                      >
                        {copiedId === invite.id && copiedType === "code" ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Invite Link */}
                  <div className="min-w-0 flex-1">
                    <label className="mb-1 block text-xs text-slate-400">
                      Invite Link
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 truncate rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-sm text-slate-300">
                        {invite.link}
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(invite.link, invite.id, "link")
                        }
                        className="group flex-shrink-0 rounded-lg border border-slate-700 bg-slate-800 p-2 transition-all hover:border-cyan-500/50 hover:bg-slate-700"
                        title="Copy link"
                      >
                        {copiedId === invite.id && copiedType === "link" ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Created Date and User Info Row */}
                <div className="flex flex-col gap-3 border-t border-slate-800 pt-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                  {/* Created Date */}
                  <div className="order-2 text-slate-500 sm:order-1">
                    <CreatedDateDisplay date={invite.createdAt} />
                  </div>

                  {invite.status === "used" && invite.usedBy && (
                    <div className="order-1 flex items-center gap-2 self-start rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 sm:order-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-300">
                        {invite.usedBy.name}
                      </span>
                    </div>
                  )}

                  {/* {invite.status === "unused" && (
                    <button
                      onClick={() => simulateUseInvite(invite.id)}
                      className="text-xs text-slate-500 hover:text-cyan-400 transition-colors px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50"
                    >
                      Simulate Use
                    </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default InviteSection;
