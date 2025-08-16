import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export interface AnonymousSession {
  id: string;
  userId: string | null;
  createdAt: string;
  lastAccessed: string;
}

export function generateSessionId(): string {
  return `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function createAnonymousSession(): Promise<AnonymousSession> {
  const sessionId = generateSessionId();
  const session: AnonymousSession = {
    id: sessionId,
    userId: null,
    createdAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
  };

  // 存储到 Redis，设置24小时过期
  await redis.setex(`session:${sessionId}`, 86400, JSON.stringify(session));
  
  return session;
}

export async function getSession(sessionId: string): Promise<AnonymousSession | null> {
  try {
    const sessionData = await redis.get(`session:${sessionId}`);
    if (!sessionData) return null;
    
    let session: AnonymousSession;
    if (typeof sessionData === 'string') {
      session = JSON.parse(sessionData) as AnonymousSession;
    } else {
      // Redis 可能直接返回对象
      session = sessionData as AnonymousSession;
    }
    
    // 更新最后访问时间
    session.lastAccessed = new Date().toISOString();
    await redis.setex(`session:${sessionId}`, 86400, JSON.stringify(session));
    
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function ensureSession(request: NextRequest): Promise<{ session: AnonymousSession; isNew: boolean }> {
  const sessionId = request.cookies.get('session-id')?.value;
  
  if (sessionId) {
    const existingSession = await getSession(sessionId);
    if (existingSession) {
      return { session: existingSession, isNew: false };
    }
  }
  
  // 创建新的匿名会话
  const newSession = await createAnonymousSession();
  return { session: newSession, isNew: true };
}

export function setSessionCookie(response: NextResponse, sessionId: string): NextResponse {
  response.cookies.set('session-id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400, // 24小时
    path: '/',
  });
  
  return response;
}