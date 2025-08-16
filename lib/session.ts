import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { cache } from "react";

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


// 服务端组件session管理 - 只读取，不设置cookie
export const getOrCreateSessionServerSide = cache(async (): Promise<AnonymousSession> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session-id')?.value;
  
  if (sessionId) {
    // 尝试获取现有session
    const existingSession = await getSession(sessionId);
    if (existingSession) {
      return existingSession;
    }
  }
  
  // 如果没有有效session，创建一个新的（但不设置cookie）
  // cookie将通过其他方式设置（比如客户端或Server Action）
  return await createAnonymousSession();
});

