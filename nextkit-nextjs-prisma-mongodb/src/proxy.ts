import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy 鉴权
 *
 * 功能：
 * - 保护页面路由，只有登录后才能访问（除了 /home 和 /auth/login）
 * - 从 Cookie 中读取 accessToken 进行验证
 * - 未登录用户重定向到登录页
 *
 * 说明：
 * - Token 存储在 Cookie（用于路由保护）和 localStorage（用于 API 调用）
 * - 只检查 token 是否存在，不验证签名（后端 API 会完整验证）
 * 
 * 注意：Next.js 16 将 middleware 重命名为 proxy
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ==================== 公共路由配置 ====================
  // 这些路由不需要鉴权，直接放行
  const publicRoutes = [
    "/auth/login", // 登录页
    "/auth/register", // 注册页（如果需要）
    "/home", // 首页（公开访问）
    "/api", // 所有 API 路由（后端会验证）
    "/_next", // Next.js 内部路由
    "/favicon.ico", // 图标
  ];

  // 检查是否为公共路由
  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ==================== Token 检查 ====================
  // 从 Cookie 中获取 token
  const token = request.cookies.get("accessToken")?.value;
  console.log(token, "==================== Token 检查 ====================");

  // ==================== 如果没有 token，重定向到登录页 ====================
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    // 保存原始路径，登录后可以跳转回来
    if (pathname !== "/auth/login") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // ==================== 允许通过 ====================
  // 注意：这里不验证 token 签名，完整的验证由后端 API 完成
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

