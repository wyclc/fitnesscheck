'use client';

import { GoalRecord } from '@/types/goal';
import { PetRecord } from '@/types/pet';
import { DepositRecord } from '@/types/deposit';
import { useRouter } from 'next/navigation';

interface ResultStatusPanelProps {
  goal: GoalRecord;
  pet?: PetRecord;
  deposit?: DepositRecord;
}

export function ResultStatusPanel({ goal, pet }: ResultStatusPanelProps) {
  const router = useRouter();

  if (goal.status === 'in_progress') {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold mb-4">目標還在進行中！</h2>
        <button 
          onClick={() => router.push(`/goal/${goal.goalId}`)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium"
        >
          查看目前進度
        </button>
      </div>
    );
  }

  const isSuccess = goal.status === 'completed';

  return (
    <div className="flex flex-col items-center p-6 text-center animate-fade-in-up">
      {/* 視覺圖示區 */}
      <div className="w-full flex justify-center mb-8 relative">
        <div className={`w-40 h-40 rounded-full flex items-center justify-center -translate-y-4 shadow-xl ${
          isSuccess ? 'bg-gradient-to-tr from-yellow-300 to-amber-500' : 'bg-slate-200'
        }`}>
          {isSuccess ? (
            <div className="text-6xl animate-bounce">
              {/* 展示獲得的寵物 */}
              🎉🐶
            </div>
          ) : (
            <div className="text-6xl text-slate-400">
              🥀
            </div>
          )}
        </div>
      </div>

      {/* 標題與摘要 */}
      <h1 className={`text-3xl font-extrabold mb-2 ${isSuccess ? 'text-amber-600' : 'text-slate-700'}`}>
        {isSuccess ? '恭喜完成目標！' : '很可惜，目標未達成'}
      </h1>
      <p className="text-slate-500 mb-8 whitespace-pre-wrap leading-relaxed">
        {isSuccess 
          ? `你在 ${goal.goalTitle} 的旅程中，\n成功完成了 ${goal.targetCount} 次挑戰！` 
          : `你的 ${goal.goalTitle} 目標已經結束。\n下次一定可以做得更好！`}
      </p>

      {/* 押金狀態卡 */}
      <div className="w-full bg-white rounded-3xl p-5 mb-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-500'
          }`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-500 font-medium">挑戰押金</p>
            <p className={`font-bold text-lg ${isSuccess ? 'text-emerald-600' : 'text-rose-500'}`}>
              {goal.linkedDepositAmount} 元
            </p>
          </div>
        </div>
        <div className={`text-sm font-bold px-3 py-1 rounded-full ${
          isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
        }`}>
          {isSuccess ? '模擬退還成功' : '未返還'}
        </div>
      </div>

      {/* 寵物區 / 失敗激勵區 */}
      {isSuccess && pet && (
        <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 mb-8 border border-indigo-100">
          <h3 className="text-indigo-800 font-bold mb-2">✨ 獲得新夥伴 ✨</h3>
          <p className="text-indigo-600 text-sm mb-4">你的寵物已經長大，並加入收藏圖鑑囉！</p>
          <div className="bg-white/60 rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl">
              🐱
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">{pet.petName}</p>
              <p className="text-xs text-slate-500">完全體 ({pet.species})</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA 區塊 */}
      <div className="w-full flex flex-col gap-3">
        {isSuccess ? (
           <>
            <button 
              onClick={() => router.push('/pets')} 
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              查看我的寵物
            </button>
            <button 
              onClick={() => router.push('/')} 
              className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-full hover:bg-slate-200 transition-colors"
            >
              回首頁
            </button>
           </>
        ) : (
          <>
            <button 
              onClick={() => router.push('/deposit')} 
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              重新設定新目標
            </button>
            <button 
              onClick={() => router.push('/')} 
              className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-full hover:bg-slate-200 transition-colors"
            >
              先回首頁
            </button>
          </>
        )}
      </div>
    </div>
  );
}
