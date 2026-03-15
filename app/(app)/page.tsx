import { HomeStatePanel } from '@/components/home/home-state-panel';

export default function HomePage() {
  return (
    <main className="p-6 flex flex-col items-stretch h-full overflow-y-auto pb-24">
      <header className="mb-10 mt-6 px-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">首頁</h1>
        <p className="text-base text-slate-500 font-medium">今天想做點什麼？</p>
      </header>
      
      <HomeStatePanel />
    </main>
  );
}
