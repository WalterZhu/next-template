'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Session {
  id: string;
  userId: string | null;
  createdAt: string;
  lastAccessed: string;
}

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

interface SessionProviderProps {
  children: ReactNode;
  sessionData?: Session | null;
}

export function SessionProvider({ children, sessionData }: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(sessionData || null);
  const [loading, setLoading] = useState(!sessionData);

  const fetchSession = async () => {
    try {
      const response = await fetch('/api/session');
      if (response.ok) {
        const data = await response.json();
        setSession(data.session);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    setLoading(true);
    await fetchSession();
  };

  useEffect(() => {
    // 如果已有sessionData，不需要fetch
    if (!sessionData) {
      fetchSession();
    }
  }, [sessionData]);

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
}