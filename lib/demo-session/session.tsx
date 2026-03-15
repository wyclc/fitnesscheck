'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { DemoSession } from '../../types/session';
import { getSession, saveSession, clearSession } from './storage';

interface SessionContextValue {
  session: DemoSession;
  isMounted: boolean;
  updateSession: (updates: Partial<DemoSession>) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession>({
    hasSeenWelcome: false,
    newPetUnseen: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(getSession());
    setIsMounted(true);
  }, []);

  const updateSession = useCallback((updates: Partial<DemoSession>) => {
    setSession((prev) => {
      const next = { ...prev, ...updates };
      saveSession(next);
      return next;
    });
  }, []);

  const resetSession = useCallback(() => {
    clearSession();
    setSession(getSession());
  }, []);

  return (
    <SessionContext.Provider value={{ session, isMounted, updateSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useDemoSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useDemoSession must be used within a SessionProvider');
  return ctx;
}
