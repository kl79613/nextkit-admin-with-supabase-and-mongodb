import SignupContent from "./SignupContent";

// 服务端组件 - 接收 searchParams prop
export default function Page({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  // 从 searchParams 获取邀请码
  const initialInviteCode = searchParams.code?.toUpperCase() || "";

  return <SignupContent initialInviteCode={initialInviteCode} />;
}
