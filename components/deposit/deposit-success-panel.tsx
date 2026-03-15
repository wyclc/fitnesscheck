'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function DepositSuccessPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const amount = useMemo(() => {
    const val = searchParams.get('amount');
    return val ? parseInt(val, 10) : 200;
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center text-center w-full animate-fade-in-up">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100 ring-8 ring-green-50 relative">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2 mt-4">押金設定成功！</h2>
      <p className="text-slate-500 mb-10 text-lg">
        你已成功承諾 <span className="font-extrabold text-indigo-600">${amount}</span> 押金
      </p>

      <div className="w-full bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          解鎖目標設定
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed relative z-10">
          很好！有了押金的約束，現在讓我們開始設定你的第一個運動目標吧！一隻專屬虛擬寵物將會與你一起成長，陪伴你達成目標。
        </p>
      </div>

      <button
        onClick={() => router.push('/goal/new')}
        className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
      >
        開始設定目標
      </button>

      <button
        onClick={() => router.push('/')}
        className="mt-6 py-2 text-slate-400 hover:text-slate-600 font-medium transition-colors text-sm"
      >
        稍後再說，回首頁
      </button>
    </div>
  );
}
