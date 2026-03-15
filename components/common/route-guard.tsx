'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDemoSession } from '@/lib/demo-session/session';

export type GuardResult = 
  | { allowed: true }
  | { allowed: false; redirectTo: string; reason: string };

export function RouteGuard({ 
  check, 
  loadingFallback = <div className="p-8 text-center text-slate-400">Loading...</div>, 
  children 
}: { 
  check: () => GuardResult;
  loadingFallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isMounted } = useDemoSession();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    const result = check();
    if (!result.allowed) {
      router.replace(result.redirectTo);
    } else {
      setIsAllowed(true);
    }
  }, [isMounted, check, router]);

  if (!isMounted || !isAllowed) {
    return <>{loadingFallback}</>;
  }

  return <>{children}</>;
}
