'use client';

import Link from 'next/link';
import { useDemoSession } from '@/lib/demo-session/session';
import { useRouter } from 'next/navigation';

export function HomeStatePanel() {
  const { session, isMounted, resetSession } = useDemoSession();
  const router = useRouter();

  if (!isMounted) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-8 text-center text-slate-400 animate-pulse">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p>載入中...</p>
      </div>
    );
  }

  // State C: Active Goal
  if (session.activeGoalId && session.activeGoal) {
    const goal = session.activeGoal;
    return (
      <div className="flex-1 flex flex-col gap-6 animate-fade-in-up">
        <div className="p-6 bg-indigo-600 rounded-3xl text-left shadow-xl shadow-indigo-200 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-2xl opacity-20 transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10 mb-2 inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            進行中
          </div>
          <h2 className="text-2xl font-extrabold mb-1 relative z-10">{goal.goalTitle}</h2>
          <div className="text-indigo-100 text-sm mb-6 relative z-10 flex gap-4">
            <span>{goal.exerciseType}</span>
            <span>進度 {goal.completedCount}/{goal.targetCount}</span>
          </div>
          <button 
            onClick={() => router.push(`/goal/${session.activeGoalId}`)}
            className="w-full py-4 bg-white text-indigo-700 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 relative z-10 text-lg"
          >
            查看進度與打卡
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/progress" className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center hover:bg-slate-50 transition-all hover:shadow-md shadow-sm">
            <span className="text-3xl mb-3">📊</span>
            <span className="font-bold text-sm text-slate-700">我的進度</span>
          </Link>
          <Link href="/pets" className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center hover:bg-slate-50 transition-all hover:shadow-md shadow-sm relative">
            {session.newPetUnseen && (
              <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            )}
            <span className="text-3xl mb-3">🐾</span>
            <span className="font-bold text-sm text-slate-700">寵物收藏</span>
          </Link>
        </div>

        <div className="mt-auto pt-8">
          <button 
            onClick={resetSession}
            className="text-xs text-slate-400 hover:text-red-500 underline underline-offset-4 w-full text-center py-2 transition-colors"
          >
            [Demo] 點此重設本機進度
          </button>
        </div>
      </div>
    );
  }

  // State B: Deposit Linked, No Goal yet
  if (session.activeDepositId) {
    return (
      <div className="flex-1 space-y-6 animate-fade-in-up">
        <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl text-center shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>
          <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-5 flex items-center justify-center text-emerald-600 shadow-inner relative z-10">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3 relative z-10 tracking-tight">押金已確認</h2>
          <p className="text-sm text-slate-600 mb-8 px-2 leading-relaxed relative z-10">
            你已經完成承諾！現在，請立即為自己建立第一個運動目標，開始養成專屬寵物。
          </p>
          <Link href="/goal/new" className="inline-block w-full py-4 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 relative z-10">
            建立運動目標
          </Link>
        </div>

        <div className="mt-8">
          <button 
            onClick={resetSession}
            className="text-xs text-slate-400 hover:text-red-500 underline underline-offset-4 w-full text-center py-2 transition-colors"
          >
            [Demo] 點此重設本機進度
          </button>
        </div>
      </div>
    );
  }

  // State A: No Deposit
  return (
    <div className="flex-1 space-y-6 animate-fade-in-up">
      <div className="p-8 bg-white border border-slate-100 rounded-3xl text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-60 transform translate-x-10 -translate-y-10"></div>
        <div className="w-20 h-20 bg-indigo-50 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl shadow-inner relative z-10">⚡️</div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3 relative z-10 tracking-tight">尚未設定押金</h2>
        <p className="text-sm text-slate-500 mb-8 px-1 leading-relaxed relative z-10 font-medium">
          先設定你的挑戰承諾，才能開始建立運動目標與養成專屬虛擬寵物！
        </p>
        <Link href="/deposit" className="inline-block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1 relative z-10">
          立即設定押金
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/progress" className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center hover:bg-slate-50 transition-all hover:shadow-md shadow-sm">
          <span className="text-3xl mb-3">📊</span>
          <span className="font-bold text-sm text-slate-700">我的進度</span>
        </Link>
        <Link href="/pets" className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center hover:bg-slate-50 transition-all hover:shadow-md shadow-sm">
          <span className="text-3xl mb-3">🐾</span>
          <span className="font-bold text-sm text-slate-700">寵物收藏</span>
        </Link>
      </div>
    </div>
  );
}
