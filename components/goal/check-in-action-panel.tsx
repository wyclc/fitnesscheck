'use client';

import { useState } from 'react';
import { useDemoSession } from '@/lib/demo-session/session';
import { determineGoalStatus } from '@/lib/selectors/goal-status';
import { useRouter } from 'next/navigation';

export function CheckInActionPanel({ goalId }: { goalId: string }) {
  const { session, updateSession } = useDemoSession();
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const router = useRouter();
  
  const goal = session.activeGoalId === goalId ? session.activeGoal : null;
  
  if (!goal) return null;
  
  if (goal.status !== 'in_progress') {
    return (
      <div className="p-6 bg-slate-50 text-slate-500 rounded-3xl text-center text-sm border border-slate-200 mt-4 font-medium">
        此目標已{goal.status === 'completed' ? '完成' : '結束'}，無法打卡
      </div>
    );
  }
  
  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Determine new status and count
    const newStatus = determineGoalStatus(goal, true);
    const newCount = goal.completedCount + 1;
    
    // Update goal in session
    const updatedGoal = {
      ...goal,
      completedCount: newCount,
      status: newStatus
    };
    
    updateSession({ activeGoal: updatedGoal });
    setIsCheckingIn(false);
    
    // If goal just finished (not Week 4 fully, but we route anyways to result and they might see a simple result page or wait for next week)
    if (newStatus === 'completed' || newStatus === 'failed') {
      router.push(`/result/${goalId}`);
    }
  };
  
  return (
    <div className="mt-4 pb-8">
      <button 
        onClick={handleCheckIn}
        disabled={isCheckingIn}
        className={`w-full py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
          isCheckingIn ? 'bg-indigo-300 text-white cursor-not-allowed transform-none' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isCheckingIn ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            記錄中...
          </>
        ) : (
           <>📝 標記完成今日運動</>
        )}
      </button>
    </div>
  );
}
