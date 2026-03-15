import Link from 'next/link';
import React from 'react';

export default function WelcomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center h-full overflow-y-auto">
      <div className="w-24 h-24 bg-blue-100 rounded-3xl mb-6 flex items-center justify-center text-4xl shadow-sm">🐕</div>
      <h1 className="text-3xl font-bold mb-3 tracking-tight">YOMOO</h1>
      <p className="text-slate-500 mb-10 leading-relaxed text-sm">
        建立習慣不再是痛苦的事。
        <br />先給承諾，養成寵物，見證改變。
      </p>

      <div className="space-y-4 mb-12 w-full text-left">
        <div className="flex items-start bg-slate-50 p-4 rounded-xl">
          <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 shrink-0 mt-0.5">1</div>
          <p className="text-sm font-medium text-slate-700">選擇你想承諾的押金金額</p>
        </div>
        <div className="flex items-start bg-slate-50 p-4 rounded-xl">
          <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 shrink-0 mt-0.5">2</div>
          <p className="text-sm font-medium text-slate-700">建立目標，打卡讓專屬寵物成長</p>
        </div>
        <div className="flex items-start bg-slate-50 p-4 rounded-xl">
          <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 shrink-0 mt-0.5">3</div>
          <p className="text-sm font-medium text-slate-700">達成目標拿回押金，並將寵物收入圖鑑</p>
        </div>
      </div>

      <div className="mt-auto w-full space-y-3 pt-4">
        <Link href="/deposit" className="block w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-transform active:scale-95 text-center">
          開始設定押金
        </Link>
        <Link href="/" className="block w-full py-3.5 px-4 bg-transparent text-slate-500 hover:text-slate-800 rounded-xl font-medium text-sm transition-colors text-center">
          略過導覽
        </Link>
      </div>
    </div>
  );
}
