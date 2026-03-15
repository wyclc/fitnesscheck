'use client';

import { Suspense } from 'react';
import { RouteGuard, GuardResult } from '@/components/common/route-guard';
import { useDemoSession } from '@/lib/demo-session/session';
import { DepositSuccessPanel } from '@/components/deposit/deposit-success-panel';

function DepositSuccessGuard({ children }: { children: React.ReactNode }) {
  const { session } = useDemoSession();
  
  const check = (): GuardResult => {
    if (session.activeGoalId) {
      return { allowed: false, redirectTo: `/goal/${session.activeGoalId}?reason=active-goal-exists`, reason: 'Already has active goal' };
    }
    if (!session.activeDepositId) {
      return { allowed: false, redirectTo: '/deposit?reason=missing-deposit', reason: 'No active deposit found' };
    }
    return { allowed: true };
  };

  return <RouteGuard check={check}>{children}</RouteGuard>;
}

export default function DepositSuccessPage() {
  return (
    <DepositSuccessGuard>
      <main className="flex-1 flex flex-col p-6 pt-16 items-center justify-center min-h-[80vh]">
        <Suspense fallback={<div className="animate-pulse w-full h-64 bg-slate-100 rounded-2xl"></div>}>
          <DepositSuccessPanel />
        </Suspense>
      </main>
    </DepositSuccessGuard>
  );
}
