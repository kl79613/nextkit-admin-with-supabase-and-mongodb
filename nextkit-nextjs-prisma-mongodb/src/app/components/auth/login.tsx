"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock } from "lucide-react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { setCookie } from "@/lib/utils/cookie";

export  function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  // 处理登录
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      // Handle Remember Me logic
      if (values.remember) {
        localStorage.setItem("remember_email", values.email);
      } else {
        localStorage.removeItem("remember_email");
      }

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.msg || "Login failed");
      }

      // 登录成功，保存用户信息和 token（与 signup 逻辑一致）
      if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }

      // 保存 token 到 localStorage 和设置 Cookie（用于 middleware 路由保护）
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCookie("accessToken", data.token, 7); // 7 天过期
      }
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      messageApi.success("Login successful! Welcome back!");
      router.push("/invite");
    } catch (error: any) {
      console.error("Login failed:", error);
      messageApi.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black px-4 sm:px-6 lg:px-8">
      {contextHolder}
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
            <h1 className="mb-2 text-3xl text-white">Welcome Back</h1>
            <p className="text-gray-400">
              Sign in to continue creating viral content
            </p>
          </div>

          {/* Email Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const values = {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                remember: remember,
              };
              handleLogin(values);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

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
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="cursor-pointer text-cyan-400 hover:text-cyan-300"
            >
              Sign up
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
