'use client';

import { useState } from 'react';
import { PetRecord } from '@/types/pet';
import { PetDetailSheet } from './pet-detail-sheet';
import { useDemoSession } from '@/lib/demo-session/session';

interface PetCollectionGridProps {
  pets: PetRecord[];
}

export function PetCollectionGrid({ pets }: PetCollectionGridProps) {
  const [selectedPet, setSelectedPet] = useState<PetRecord | null>(null);
  const { session } = useDemoSession();

  const newlyUnlockedPetId = session.activeGoal?.status === 'completed' ? session.activeGoal.linkedPetId : null;

  const mergedPets = pets.map(p => 
    p.petId === newlyUnlockedPetId ? { ...p, isUnlocked: true } : p
  );

  // You might want to sort them: unlocked first, then locked
  const sortedPets = [...mergedPets].sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) return -1;
    if (!a.isUnlocked && b.isUnlocked) return 1;
    return 0;
  });

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {sortedPets.map(pet => (
          <button
            key={pet.petId}
            onClick={() => {
               // Demo: Only show details for unlocked pets or show limited for locked
               setSelectedPet(pet);
            }}
            disabled={!pet.isUnlocked}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all shadow-sm border ${
              pet.isUnlocked 
                ? 'bg-gradient-to-b from-white to-purple-50 hover:-translate-y-1 hover:shadow-md border-purple-100 cursor-pointer' 
                : 'bg-slate-50 border-dashed border-slate-200 opacity-60 cursor-not-allowed'
            }`}
          >
            <div className={`text-4xl mb-2 ${!pet.isUnlocked && 'grayscale'}`}>
              {pet.isUnlocked ? '🐾' : '🥚'}
            </div>
            <span className={`text-xs font-bold truncate w-full text-center ${pet.isUnlocked ? 'text-purple-900' : 'text-slate-400'}`}>
              {pet.isUnlocked ? pet.petName : '未解鎖'}
            </span>
          </button>
        ))}
      </div>

      {selectedPet && (
        <PetDetailSheet pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  );
}
