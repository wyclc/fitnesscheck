'use client';

import { useDemoSession } from '@/lib/demo-session/session';
import { GoalSummaryCard } from '@/components/goal/goal-summary-card';
import { PetGrowthCard } from '@/components/goal/pet-growth-card';
import { CheckInActionPanel } from '@/components/goal/check-in-action-panel';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoalDetailPage() {
  const { session, isMounted } = useDemoSession();
  const router = useRouter();
  const params = useParams();
  const goalId = params.goalId as string;
  
  useEffect(() => {
    if (isMounted) {
      if (session.activeGoalId !== goalId || !session.activeGoal) {
        // Fallback for Demo if directly navigating to wrong relative goal
        router.push('/');
      }
    }
  }, [isMounted, session.activeGoalId, session.activeGoal, goalId, router]);
  
  if (!isMounted || !session.activeGoal || session.activeGoalId !== goalId) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-8 text-center text-slate-400 animate-pulse">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p>載入中...</p>
      </div>
    );
  }
  
  const goal = session.activeGoal;

  return (
    <main className="p-6 flex flex-col h-full overflow-y-auto pb-24 animate-fade-in-up">
      <header className="mb-6 mt-2">
        <button onClick={() => router.push('/')} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 flex items-center transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          返回首頁
        </button>
      </header>
      
      <GoalSummaryCard goal={goal} />
      <PetGrowthCard completedCount={goal.completedCount} targetCount={goal.targetCount} />
      <CheckInActionPanel goalId={goalId} />
    </main>
  );
}
