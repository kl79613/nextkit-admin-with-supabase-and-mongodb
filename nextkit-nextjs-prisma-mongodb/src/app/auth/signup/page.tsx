"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Key,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { setCookie } from "@/lib/utils/cookie";
interface PasswordStrength {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function Signup() {
  const [inviteCode, setInviteCode] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCodeValid, setInviteCodeValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [name, setName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 当页面进入时，从 URL 获取邀请码并填入
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setInviteCode(code.toUpperCase());
    }
  }, [searchParams]);

  // 检查密码强度
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  }, [password]);

  // 验证邀请码有效性
  useEffect(() => {
    const validateInviteCode = async () => {
      if (inviteCode.length === 0) {
        setInviteCodeValid(null);
        return;
      }

      if (inviteCode.length === 6) {
        try {
          const res = await fetch("/api/user/check-invite-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: inviteCode }),
          });

          const data = await res.json();
          console.log(data, "check-invite-code data");
          // 后端返回 is_valid: 0 为可用，1 为不可用
          setInviteCodeValid(data.data.is_valid === 0);
        } catch (error) {
          setInviteCodeValid(false);
          console.error("Invite code validation failed:", error);
        }
      } else {
        setInviteCodeValid(null);
      }
    };

    validateInviteCode();
  }, [inviteCode]);

  // 计算密码强度等级
  const getPasswordStrengthLevel = () => {
    const checks = Object.values(passwordStrength).filter(Boolean).length;
    if (checks === 5)
      return {
        level: "Strong",
        color: "text-green-400",
        bgColor: "bg-green-500",
      };
    if (checks >= 3)
      return {
        level: "Medium",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500",
      };
    return { level: "Weak", color: "text-red-400", bgColor: "bg-red-500" };
  };

  const strengthInfo = getPasswordStrengthLevel();
  const strengthPercentage =
    (Object.values(passwordStrength).filter(Boolean).length / 5) * 100;

  // 发送验证码
  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证邀请码
    if (!inviteCode.trim()) {
      messageApi.warning("Please enter your invitation code");
      return;
    }

    if (inviteCodeValid !== true) {
      messageApi.warning("Please enter a valid invitation code");
      return;
    }

    // 验证邮箱
    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/send-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "register" }),
      });
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(
          data.error || data.msg || "Send verification code failed"
        );
      }
      setShowVerification(true);
      startCountdown();
      messageApi.success(data.msg || "Verification code sent to your email!");
    } catch (error: any) {
      messageApi.error(error.message || "Send verification code failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 重新发送验证码
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/send-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "register" }),
      });
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(
          data.error || data.msg || "Send verification code failed"
        );
      }
      setShowVerification(true);
      startCountdown();
      messageApi.success("Verification code sent to your email!");
    } catch (error: any) {
      messageApi.error(error.message || "Send verification code failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 启动60秒倒计时
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 完成注册
  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      messageApi.warning("Please enter the verification code");
      return;
    }

    if (inviteCodeValid !== true) {
      messageApi.warning("Please enter a valid invitation code");
      return;
    }

    // 验证密码强度
    const allChecksPassed = Object.values(passwordStrength).every(Boolean);
    if (!allChecksPassed) {
      messageApi.warning("Password does not meet security requirements");
      return;
    }

    // 验证密码匹配
    if (password !== confirmPassword) {
      messageApi.warning("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          password: password,
          email: email,
          email_code: verificationCode,
          invite_code: inviteCode,
        }),
      });
      const data = await res.json();
      if (!data.token && !data.refresh_token) {
        throw new Error(data.error || data.msg || "Register failed");
      }

      // // 注册成功，保存用户信息和 token（与登录逻辑一致）
      // if (data.user) {
      //   localStorage.setItem("userInfo", JSON.stringify(data.user));
      // }
      // if (data.token) {
      //   localStorage.setItem("token", data.token);
      //   // 设置 Cookie（用于 middleware 路由保护）
      //   setCookie("accessToken", data.token, 7); // 7 天过期
      // }
      // if (data.refresh_token) {
      //   localStorage.setItem("refresh_token", data.refresh_token);
      // }

      // 注册成功后直接跳转到首页（已自动登录）
      messageApi.success("Registration successful! Welcome!");
      router.push("/");
    } catch (error: any) {
      messageApi.error(error.message || "Register failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setShowVerification(false);
    setEmail("");
    setVerificationCode("");
    setName("");
    setPassword("");
  };
  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-950 to-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl text-white">Title Lab</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl text-white">
              {showVerification ? "Verify Your Email" : "Create Your Account"}
            </h1>
            <p className="text-gray-400">
              {showVerification
                ? "Enter the verification code sent to your email"
                : "Start creating viral content in minutes"}
            </p>
          </div>

          {!showVerification ? (
            <>
              {contextHolder}
              {/* Step 1: Invitation Code + Email */}
              <form onSubmit={handleSendVerificationCode} className="space-y-6">
                {/* Invitation Code - Required First */}
                <div>
                  <label
                    htmlFor="inviteCode"
                    className="mb-2 block text-sm text-gray-300"
                  >
                    Invitation Code <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      id="inviteCode"
                      value={inviteCode}
                      onChange={(e) =>
                        setInviteCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter your 6-digit invitation code"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-12 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {inviteCodeValid !== null && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {inviteCodeValid ? (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    )}
                  </div>
                  {inviteCodeValid === false && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <XCircle className="h-3 w-3" />
                      Invalid invitation code
                    </p>
                  )}
                  {inviteCodeValid === true && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Valid invitation code
                    </p>
                  )}
                  {inviteCodeValid === null && inviteCode.length === 0 && (
                    <p className="mt-2 text-xs text-cyan-400">
                      Don't have an invitation code?{" "}
                      <a href="#" className="underline hover:text-cyan-300">
                        Request one
                      </a>
                    </p>
                  )}
                </div>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-300"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            </>
          ) : (
            <>
              {contextHolder}
              {/* Step 2: Email Verification */}
              <form onSubmit={handleCompleteSignup} className="space-y-6">
                {/* Email Display */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">
                        Verification code sent to
                      </div>
                      <div className="text-white">{email}</div>
                    </div>
                  </div>
                </div>

                {/* Verification Code Input */}
                <div>
                  <label
                    htmlFor="verificationCode"
                    className="mb-2 block text-sm text-gray-300"
                  >
                    Verification Code <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Resend Code */}
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-400">
                      Resend code in{" "}
                      <span className="text-cyan-400">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-sm text-cyan-400 underline hover:text-cyan-300 disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Resend verification code"}
                    </button>
                  )}
                </div>

                {/* Additional Registration Fields */}
                <div className="space-y-4 border-t border-gray-800 pt-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Your Name"
                        required
                        className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Password with Strength Indicator */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your Password"
                        required
                        className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Password Strength:
                          </span>
                          <span className={strengthInfo.color}>
                            {strengthInfo.level}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                          <div
                            className={`h-full ${strengthInfo.bgColor} transition-all duration-300`}
                            style={{ width: `${strengthPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Password Requirements */}
                    <div className="mt-3 space-y-2">
                      <PasswordRequirement
                        met={passwordStrength.hasMinLength}
                        text="At least 8 characters"
                      />
                      <PasswordRequirement
                        met={passwordStrength.hasUpperCase}
                        text="Contains uppercase letter (A-Z)"
                      />
                      <PasswordRequirement
                        met={passwordStrength.hasLowerCase}
                        text="Contains lowercase letter (a-z)"
                      />
                      <PasswordRequirement
                        met={passwordStrength.hasNumber}
                        text="Contains number (0-9)"
                      />
                      <PasswordRequirement
                        met={passwordStrength.hasSpecialChar}
                        text="Contains special character (!@#$%...)"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                        <XCircle className="h-3 w-3" />
                        Passwords do not match
                      </p>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-400">
                      I agree to the{" "}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleChangeEmail}
                  className="w-full py-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  ← Change email address
                </button>
              </form>
            </>
          )}

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="cursor-pointer text-cyan-400 hover:text-cyan-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/home" className="text-gray-400 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Password Requirement Component
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        met ? "text-green-400" : "text-gray-500"
      }`}
    >
      {met ? (
        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
      ) : (
        <XCircle className="h-3.5 w-3.5 flex-shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );
}
