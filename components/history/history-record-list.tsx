'use client';

import { GoalRecord } from '@/types/goal';
import { DepositRecord } from '@/types/deposit';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/demo-session/session';

interface HistoryRecordListProps {
  goals: GoalRecord[];
  deposits: DepositRecord[];
}

export function HistoryRecordList({ goals, deposits }: HistoryRecordListProps) {
  const router = useRouter();
  const { session } = useDemoSession();

  const displayGoals = [...goals];
  const displayDeposits = [...deposits];

  if (session.activeGoal && (session.activeGoal.status === 'completed' || session.activeGoal.status === 'failed')) {
    if (!displayGoals.some(g => g.goalId === session.activeGoal!.goalId)) {
      displayGoals.unshift(session.activeGoal);
      
      if (session.activeDepositId && !displayDeposits.some(d => d.depositId === session.activeDepositId)) {
        displayDeposits.push({
          depositId: session.activeDepositId,
          amount: session.activeGoal.linkedDepositAmount || 0,
          createdAt: session.activeGoal.startDate,
          depositStatus: 'confirmed',
          linkedGoalId: session.activeGoal.goalId,
          refundStatus: session.activeGoal.status === 'completed' ? 'refunded' : 'not_refunded'
        });
      }
    }
  }

  if (displayGoals.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4 grayscale opacity-50">📂</div>
        <p className="text-slate-500 font-medium">尚無歷史紀錄</p>
        <p className="text-sm text-slate-400 mt-2">當你完成或失敗運動目標後，紀錄會顯示在這裡。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-12">
      {displayGoals.map(goal => {
        const deposit = displayDeposits.find(d => d.linkedGoalId === goal.goalId);
        const isSuccess = goal.status === 'completed';

        return (
          <div 
            key={goal.goalId} 
            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md cursor-pointer group"
            onClick={() => router.push(`/result/${goal.goalId}`)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                  {goal.goalTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {isSuccess ? '已完成' : '未達標'}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm mt-4 p-3 bg-slate-50 rounded-2xl">
              <div className="flex-1">
                <span className="text-slate-400 block text-xs mb-1">運動完成度</span>
                <span className="font-semibold text-slate-700">
                  {goal.completedCount} / {goal.targetCount} 次
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex-1">
                <span className="text-slate-400 block text-xs mb-1">押金狀態</span>
                {deposit ? (
                  <span className={`font-semibold ${isSuccess ? 'text-emerald-600' : 'text-rose-500'}`}>
                    ${deposit.amount} 
                    <span className="text-xs ml-1 font-normal opacity-80">
                      ({deposit.refundStatus === 'refunded' ? '已返還' : deposit.refundStatus === 'not_refunded' ? '未返還' : '扣除'})
                    </span>
                  </span>
                ) : (
                  <span className="text-slate-400">紀錄遺失</span>
                )}
              </div>
              <div className="text-slate-300 group-hover:text-indigo-400 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
