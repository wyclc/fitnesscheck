import { GoalStatus, GoalRecord } from '@/types/goal';

/**
 * Determines the status of a given goal record.
 * @param goal The goal record
 * @param checkingInNow If true, calculates as if one check-in is currently being submitted
 * @returns 'in_progress' | 'completed' | 'failed'
 */
export function determineGoalStatus(goal: GoalRecord, checkingInNow: boolean = false): GoalStatus {
  if (goal.status === 'completed' || goal.status === 'failed') {
    return goal.status;
  }
  
  const completed = goal.completedCount + (checkingInNow ? 1 : 0);
  
  if (completed >= goal.targetCount) {
    return 'completed';
  }
  
  // Date-based failure check
  // Note: Only comparing dates without time component for simplicity
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const end = new Date(goal.endDate);
  end.setHours(0, 0, 0, 0);
  
  if (today > end) {
    return 'failed';
  }
  
  return 'in_progress';
}
