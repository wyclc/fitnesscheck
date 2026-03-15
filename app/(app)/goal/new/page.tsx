'use client';

import { GoalForm } from '@/components/goal/goal-form';
import { RouteGuard, GuardResult } from '@/components/common/route-guard';
import { useDemoSession } from '@/lib/demo-session/session';

function NewGoalGuard({ children }: { children: React.ReactNode }) {
  const { session } = useDemoSession();
  
  const check = (): GuardResult => {
    if (!session.activeDepositId) {
      return { allowed: false, redirectTo: '/deposit?reason=deposit-required', reason: 'Deposit required' };
    }
    if (session.activeGoalId) {
      return { allowed: false, redirectTo: `/goal/${session.activeGoalId}?reason=active-goal-exists`, reason: 'Already has active goal' };
    }
    return { allowed: true };
  };

  return <RouteGuard check={check}>{children}</RouteGuard>;
}

export default function NewGoalPage() {
  return (
    <NewGoalGuard>
      <main className="flex-1 flex flex-col p-6 pt-10 items-center justify-start pb-24 overflow-y-auto">
        <div className="w-full text-center animate-fade-in mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">建立運動目標</h1>
          <p className="text-slate-500 text-sm px-6">
            為自己制定一個切實可行的計畫，然後跟著寵物一起進化吧！
          </p>
        </div>

        <GoalForm />
      </main>
    </NewGoalGuard>
  );
}
