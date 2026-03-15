import { GoalRecord } from '@/types/goal';

export function GoalSummaryCard({ goal }: { goal: GoalRecord }) {
  const percent = Math.min(100, Math.round((goal.completedCount / goal.targetCount) * 100));

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{goal.goalTitle}</h1>
          <p className="text-sm text-slate-500">{goal.exerciseType}</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
          {goal.status === 'in_progress' ? '進行中' : goal.status === 'completed' ? '已完成' : '失敗'}
        </span>
      </div>
      
      <div className="mb-2 mt-4">
        <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
          <span>完成進度</span>
          <span>{goal.completedCount} / {goal.targetCount} 次</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="text-xs text-slate-400 mt-5 flex justify-between font-medium">
        <span>起：{goal.startDate}</span>
        <span>迄：{goal.endDate}</span>
      </div>
    </div>
  );
}
