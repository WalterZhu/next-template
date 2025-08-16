import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";
import { isRegionBlocked, createBlockedResponse, getGeoConfigFromEnv } from "./lib/geo-blocking";

export async function middleware(request: NextRequest) {
  // 1. 首先进行地区屏蔽检查
  const country = request.headers.get('x-vercel-ip-country');
  const region = request.headers.get('x-vercel-ip-region');
  const geoConfig = getGeoConfigFromEnv();
  
  if (isRegionBlocked(country, region, geoConfig)) {
    return createBlockedResponse(country || 'Unknown', geoConfig);
  }

  // 2. 对于需要 session 保护的 API 路由
  if (request.nextUrl.pathname.startsWith('/api/')) {
    
    // 检查是否有 session cookie
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { 
          error: "Session required. Session will be created automatically on page visit.",
          code: "NO_SESSION"
        },
        { status: 401 }
      );
    }
    
    try {
      // 验证 session 是否有效
      const session = await getSession(sessionId);
      
      if (!session) {
        return NextResponse.json(
          { 
            error: "Invalid or expired session. Please refresh the page to create a new session.",
            code: "INVALID_SESSION"
          },
          { status: 401 }
        );
      }
      
      // 在请求头中添加 session 信息供 API 使用
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-session-id', session.id);
      requestHeaders.set('x-user-id', session.userId || '');
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      
    } catch (error) {
      console.error("Middleware session validation error:", error);
      return NextResponse.json(
        { 
          error: "Session validation failed",
          code: "SESSION_ERROR"
        },
        { status: 500 }
      );
    }
  }
  
  // 3. 其他请求直接通过
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 匹配所有 API 路由和页面，排除静态文件
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

