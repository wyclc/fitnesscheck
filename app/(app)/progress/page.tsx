'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TimeRangeTabs } from '@/components/progress/time-range-tabs';
import { ProgressStatsPanel } from '@/components/progress/progress-stats-panel';
import { BodyMetricsChart } from '@/components/progress/body-metrics-chart';

type TimeRange = 'week' | 'month' | 'all';

export default function ProgressPage() {
  const [activeRange, setActiveRange] = useState<TimeRange>('week');

  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50 min-h-screen pb-24">
      <header className="mb-6 flex items-center justify-between mt-2">
        <h1 className="text-2xl font-extrabold text-slate-800">進度與變化</h1>
        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          回首頁
        </Link>
      </header>

      <section className="flex-1 pb-12 animate-fade-in-up">
        {/* 時間區間切換 */}
        <TimeRangeTabs activeRange={activeRange} onChange={setActiveRange} />

        {/* 總結數據卡 */}
        <ProgressStatsPanel />

        {/* 身體變化摘要卡 */}
        <div className="mb-4 flex items-center justify-between">
           <h2 className="text-lg font-bold text-slate-800">身體變化摘要</h2>
           <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-md">模擬數據</span>
        </div>
        <BodyMetricsChart />

        <div className="mt-8 text-center pt-8 border-t border-slate-200">
           <Link href="/history" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-6 py-3 rounded-full inline-block">
             查看詳細歷史摘要 →
           </Link>
        </div>
      </section>
    </main>
  );
}
