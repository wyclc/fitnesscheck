'use client';

import { useDemoSession } from '@/lib/demo-session/session';
import { ResultStatusPanel } from '@/components/goal/result-status-panel';
import { MockRepository } from '@/lib/mock-repository';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { PetRecord } from '@/types/pet';
import { DepositRecord } from '@/types/deposit';
import { DemoSession } from '@/types/session';

export default function ResultPage() {
  const { session, isMounted, updateSession } = useDemoSession();
  const router = useRouter();
  const params = useParams();
  const goalId = params.goalId as string;
  
  // Compute data synchronously during render / via useMemo
  const data = useMemo(() => {
    if (!isMounted) return null;
    let targetGoal = session.activeGoalId === goalId ? session.activeGoal : null;
    if (!targetGoal) {
      targetGoal = MockRepository.getGoalById(goalId);
    }

    if (!targetGoal) return null;

    let targetPet: PetRecord | undefined;
    if (targetGoal.linkedPetId) {
      targetPet = MockRepository.getPetById(targetGoal.linkedPetId);
    }

    let targetDeposit: DepositRecord | undefined;
    const depositId = targetGoal.goalId === session.activeGoalId ? session.activeDepositId : undefined;
    if (depositId) {
      targetDeposit = MockRepository.getDepositById(depositId);
    } else {
      const deposits = MockRepository.getDeposits();
      targetDeposit = deposits.find(d => d.linkedGoalId === targetGoal?.goalId);
    }

    return { goal: targetGoal, pet: targetPet, deposit: targetDeposit };
  }, [isMounted, goalId, session.activeGoalId, session.activeGoal, session.activeDepositId]);

  useEffect(() => {
    if (!isMounted) return;

    if (!data) {
      // Not found mock data and not in session
      // For demo, just redirect if we are sure it's mounted and data is null after compute
      // But we wait a bit or just check if it's really missing
      const mockGoalCheck = MockRepository.getGoalById(goalId);
      if (!mockGoalCheck && session.activeGoalId !== goalId) {
         router.push('/404');
         return;
      }
    } else {
       if (data.goal.status === 'in_progress') {
         router.push(`/goal/${goalId}`);
         return;
       }
    }

    // Handle new completion from session
    if (session.activeGoalId === goalId) {
       const updates: Partial<DemoSession> = {};
       if (session.newPetUnseen) {
           updates.newPetUnseen = false;
       }
       if (Object.keys(updates).length > 0) {
         updateSession(updates);
       }
    }
  }, [isMounted, data, goalId, session.activeGoalId, session.newPetUnseen, router, updateSession]);

  if (!isMounted) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-8 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p>載入結果中...</p>
      </div>
    );
  }

  if (!data?.goal) return null;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 min-h-screen pb-24">
      <ResultStatusPanel goal={data.goal} pet={data.pet} deposit={data.deposit} />
    </main>
  );
}
