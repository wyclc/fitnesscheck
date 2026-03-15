import { mockDeposits } from '../../mocks/deposits.seed';
import { mockGoals } from '../../mocks/goals.seed';
import { mockPets } from '../../mocks/pets.seed';
import { mockBodyProgress } from '../../mocks/body-progress.seed';
import { DepositRecord, GoalRecord, PetRecord, BodyProgressRecord } from '../../types';

export const MockRepository = {
  getDeposits: (): DepositRecord[] => [...mockDeposits],
  getDepositById: (id: string): DepositRecord | undefined => mockDeposits.find(d => d.depositId === id),
  
  getGoals: (): GoalRecord[] => [...mockGoals],
  getGoalById: (id: string): GoalRecord | undefined => mockGoals.find(g => g.goalId === id),
  
  getPets: (): PetRecord[] => [...mockPets],
  getPetById: (id: string): PetRecord | undefined => mockPets.find(p => p.petId === id),
  
  getBodyProgresses: (): BodyProgressRecord[] => [...mockBodyProgress],
  getBodyProgressByGoalId: (goalId: string): BodyProgressRecord | undefined => mockBodyProgress.find(b => b.goalId === goalId),
};
