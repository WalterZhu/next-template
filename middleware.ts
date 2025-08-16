import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  // 对于需要 session 保护的 API 路由
  if (request.nextUrl.pathname.startsWith('/api/') && 
      !request.nextUrl.pathname.startsWith('/api/session')) {
    
    // 检查是否有 session cookie
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { 
          error: "Session required. Please visit /api/session first to get a session.",
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
            error: "Invalid or expired session. Please visit /api/session to get a new session.",
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
  
  // 其他请求直接通过
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 匹配所有 API 路由和页面，排除静态文件
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

/*
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request: NextRequest) {
    const requestHeaders = request.headers;
    const country = requestHeaders.get("x-vercel-ip-country");

    if (country === "CN") {
        return new NextResponse(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gaur.com</title>
            </head>
            <body style="height: 100vh; display: flex; flex-direction: column;justify-content: center; align-items:center;  padding: 0; background: #1a1a1a;">
                <div class="page word-break-word2" style="display: flex; flex-direction: column; align-items: center; background: #1a1a1a; text-align: center;">
                    <div class="header" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 20px 16px 12px; box-sizing: border-box;">
                        <p class="title" style="flex: 1; color: #fff; font-size: 17px;  line-height: normal;">Attention</p >
                    </div>
                    <div class="main" style="width: 100%; padding: 0 16px 25px; box-sizing: border-box; display: flex; flex-direction: column; text-align: center;">
                        <p class="text" style="color: #878787; text-align: center; font-size: 14px;">Sorry, due to local laws, you have been blocked. You are unable to access Game.com.</p >
                    </div>
                </div>
            </body>
            </html>
            `,
            { status: 403, headers: { 'content-type': 'text/html; charset=utf-8' } }
        );
    }

    // JWT 验证
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await jwtVerify(token, secret);
    } catch (error) {
      console.error('JWT verification failed in middleware:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
}
    */