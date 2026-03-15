'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DepositAmount } from '@/types/deposit';
import { DepositOptionCard } from './deposit-option-card';
import { useDemoSession } from '@/lib/demo-session/session';

export function DepositSelectionForm() {
  const [selectedAmount, setSelectedAmount] = useState<DepositAmount | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { updateSession } = useDemoSession();

  const amounts: DepositAmount[] = [100, 200, 300];

  const handleSubmit = async () => {
    if (!selectedAmount) return;
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockDepositId = `d-[mock]-${selectedAmount}-${Date.now()}`;
    updateSession({ activeDepositId: mockDepositId });
    
    router.push(`/deposit/success?amount=${selectedAmount}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-3 gap-3">
        {amounts.map((amount) => (
          <DepositOptionCard
            key={amount}
            amount={amount}
            selected={selectedAmount === amount}
            onSelect={setSelectedAmount}
          />
        ))}
      </div>
      
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-amber-800 text-sm text-left shadow-sm">
        <p className="font-semibold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Demo 注意事項
        </p>
        <p className="mb-1">這是一個功能原型。點擊下方按鈕將模擬付款成功，並不會產生真正的金流扣款。</p>
        <p>完成運動目標後，此系統會展示模擬的押金及虛擬寵物返還與解鎖流程。</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAmount || isSubmitting}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
          selectedAmount && !isSubmitting
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? '處理中...' : '確認押金'}
      </button>
    </div>
  );
}
