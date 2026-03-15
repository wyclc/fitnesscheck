import { GoalRecord } from './goal';

export interface DemoSession {
  hasSeenWelcome: boolean;
  activeDepositId?: string;
  activeGoalId?: string;
  activeGoal?: GoalRecord;
  newPetUnseen: boolean;
}
