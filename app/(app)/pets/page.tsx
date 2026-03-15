import { PetCollectionGrid } from '@/components/pets/pet-collection-grid';
import { MockRepository } from '@/lib/mock-repository';
import Link from 'next/link';

export default function PetsPage() {
  const allPets = MockRepository.getPets();
  
  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50 min-h-screen pb-24">
      <header className="mb-6 flex items-center justify-between mt-2">
        <h1 className="text-2xl font-extrabold text-slate-800">寵物收藏圖鑑</h1>
        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          回首頁
        </Link>
      </header>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex-1">
        <div className="mb-6 text-slate-500 text-sm">
          <p>完成運動目標，解鎖更多可愛的運動夥伴！</p>
        </div>
        
        <PetCollectionGrid pets={allPets} />
      </section>
    </main>
  );
}
