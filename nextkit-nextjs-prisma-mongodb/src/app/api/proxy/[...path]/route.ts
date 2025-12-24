import { NextRequest, NextResponse } from "next/server";

/**
 * API 代理路由
 * 将前端请求代理到外部 API，解决跨域问题
 * 使用方式: /api/proxy/user/login -> https://api.titlelab.ai/user/login
 */
const API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PUT");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // 构建目标 URL
    const path = params.path.join("/");
    const targetURL = `${API_BASE_URL}/${path}`;

    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullURL = queryString ? `${targetURL}?${queryString}` : targetURL;

    // 获取请求体
    let body: BodyInit | undefined = undefined;
    if (method !== "GET" && method !== "DELETE") {
      try {
        const contentType = request.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          body = JSON.stringify(await request.json());
        } else if (contentType?.includes("multipart/form-data")) {
          body = await request.formData();
        } else {
          body = await request.text();
        }
      } catch (e) {
        // 如果没有 body，忽略错误
      }
    }

    // 构建请求头
    const headers: HeadersInit = {};

    // 转发必要的请求头
    const forwardHeaders = [
      "authorization",
      "content-type",
      "accept",
      "user-agent",
    ];

    request.headers.forEach((value, key) => {
      if (forwardHeaders.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    // 发送请求到外部 API
    const response = await fetch(fullURL, {
      method,
      headers,
      body,
    });

    // 获取响应数据
    const contentType = response.headers.get("content-type");
    let data: any;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // 返回响应
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        code: -1,
        msg: error.message || "Proxy request failed",
        data: null,
      },
      { status: 500 }
    );
  }
}
