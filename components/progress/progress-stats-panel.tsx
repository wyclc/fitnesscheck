export function ProgressStatsPanel() {
  // Mock data for overall progress stats
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <p className="text-slate-400 text-xs font-medium mb-1">總完成次數</p>
        <p className="text-3xl font-extrabold text-slate-800">42<span className="text-sm font-normal text-slate-500 ml-1">次</span></p>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <p className="text-slate-400 text-xs font-medium mb-1">最長連續打卡</p>
        <p className="text-3xl font-extrabold text-emerald-500">14<span className="text-sm font-normal text-slate-500 ml-1">天</span></p>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 col-span-2 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium mb-1">綜合目標達成率</p>
          <p className="text-3xl font-extrabold text-indigo-600">85<span className="text-lg font-bold ml-1">%</span></p>
        </div>
        <div className="w-16 h-16 relative flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-indigo-500"
              strokeDasharray="85, 100"
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-xs font-bold text-indigo-700">A級</span>
        </div>
      </div>
    </div>
  );
}
