export function BodyMetricsChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
        <div>
          <h3 className="text-sm font-bold text-slate-700">體重變化</h3>
          <p className="text-xs text-slate-400 mt-1">基準: 75kg / 目前: <span className="text-indigo-600 font-bold">72kg</span></p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-bold leading-none">↓ 3kg</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
        <div>
          <h3 className="text-sm font-bold text-slate-700">體脂率變化</h3>
          <p className="text-xs text-slate-400 mt-1">基準: 22% / 目前: <span className="text-indigo-600 font-bold">19.5%</span></p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-bold leading-none">↓ 2.5%</span>
        </div>
      </div>

      <div className="mt-2">
         <h3 className="text-sm font-bold text-slate-700 mb-4">活動量趨勢 (模擬)</h3>
         <div className="flex items-end justify-between h-32 gap-2 border-b border-slate-100 pb-2">
            {[4, 5, 2, 7, 5, 8, 6].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                 <div className="w-full bg-indigo-100 rounded-t-sm relative group-hover:bg-indigo-300 transition-colors" style={{ height: `${h * 10}%` }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}次
                    </span>
                 </div>
                 <span className="text-[10px] text-slate-400 font-medium">{['一', '二', '三', '四', '五', '六', '日'][i]}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
