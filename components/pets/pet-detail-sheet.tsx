'use client';

import { PetRecord } from '@/types/pet';
import { MockRepository } from '@/lib/mock-repository';

interface PetDetailSheetProps {
  pet: PetRecord;
  onClose: () => void;
}

export function PetDetailSheet({ pet, onClose }: PetDetailSheetProps) {
  const relatedGoal = pet.linkedGoalId ? MockRepository.getGoalById(pet.linkedGoalId) || null : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white w-full sm:w-[400px] rounded-t-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 pb-10 flex flex-col items-center text-center relative">
          {/* 關閉按鈕 */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 寵物圖示 */}
          <div className="w-24 h-24 bg-gradient-to-tr from-purple-100 to-indigo-50 rounded-full flex items-center justify-center text-5xl shadow-inner mb-4">
            {pet.isUnlocked ? '🐾' : '🥚'}
          </div>

          <h3 className="text-2xl font-extrabold text-slate-800 mb-1">{pet.petName}</h3>
          <p className="text-slate-500 text-sm mb-6 flex items-center gap-1 justify-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded-full">{pet.species}</span>
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{pet.growthStage === 'mature' ? '完全體' : '成長中'}</span>
          </p>

          <div className="w-full bg-slate-50 rounded-2xl p-5 text-left space-y-3 border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">獲得日期</p>
              <p className="font-semibold text-slate-700">
                {pet.obtainedDate ? new Date(pet.obtainedDate).toLocaleDateString() : '尚未獲得'}
              </p>
            </div>
            
            {relatedGoal && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">對應完成目標</p>
                <p className="font-semibold text-slate-700">{relatedGoal.goalTitle}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
