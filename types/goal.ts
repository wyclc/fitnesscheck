export type GoalStatus = 'in_progress' | 'completed' | 'failed';

export interface GoalRecord {
  goalId: string;
  goalTitle: string;
  exerciseType: string;
  frequencyPerWeek: number;
  durationPerSession: number;
  startDate: string;
  endDate: string;
  completedCount: number;
  targetCount: number;
  status: GoalStatus;
  linkedDepositAmount: 100 | 200 | 300;
  linkedPetId?: string;
}
