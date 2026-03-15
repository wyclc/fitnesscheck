'use client';

import { DepositSelectionForm } from '@/components/deposit/deposit-selection-form';
import { RouteGuard, GuardResult } from '@/components/common/route-guard';
import { useDemoSession } from '@/lib/demo-session/session';

function DepositGuard({ children }: { children: React.ReactNode }) {
  const { session } = useDemoSession();
  
  const check = (): GuardResult => {
    if (session.activeGoalId) {
      return { allowed: false, redirectTo: `/goal/${session.activeGoalId}?reason=active-goal-exists`, reason: 'Already has active goal' };
    }
    if (session.activeDepositId) {
      return { allowed: false, redirectTo: '/goal/new?reason=deposit-exists', reason: 'Deposit already exists' };
    }
    return { allowed: true };
  };

  return <RouteGuard check={check}>{children}</RouteGuard>;
}

export default function DepositPage() {
  return (
    <DepositGuard>
      <main className="flex-1 flex flex-col p-6 pt-12 items-center text-center pb-20 overflow-y-auto">
        <div className="mb-10 w-full animate-fade-in">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-indigo-100 shadow-lg ring-4 ring-indigo-50">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">選擇你的押金金額</h1>
          <p className="text-slate-500 text-sm px-4 leading-relaxed">
            完成目標後，押金將全數返還。<br />大聲說出你的承諾吧！
          </p>
        </div>

        <DepositSelectionForm />
      </main>
    </DepositGuard>
  );
}
