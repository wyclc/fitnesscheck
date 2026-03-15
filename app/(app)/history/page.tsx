import { MockRepository } from '@/lib/mock-repository';
import { HistoryRecordList } from '@/components/history/history-record-list';
import Link from 'next/link';

export default function HistoryPage() {
  const goals = MockRepository.getGoals();
  const deposits = MockRepository.getDeposits();
  
  // 篩選出歷史紀錄 (已完成或失敗)
  const historyGoals = goals.filter(g => g.status === 'completed' || g.status === 'failed');
  
  // 依建立或結束日期排序，新到舊 (這裡用 endDate)
  historyGoals.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50 min-h-screen pb-24">
      <header className="mb-6 flex items-center justify-between mt-2">
        <h1 className="text-2xl font-extrabold text-slate-800">歷史紀錄</h1>
        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          回首頁
        </Link>
      </header>

      <div className="mb-6 text-slate-500 text-sm">
        <p>你的過往運動目標與押金結果與退還紀錄。</p>
      </div>
        
      <HistoryRecordList goals={historyGoals} deposits={deposits} />
    </main>
  );
}
