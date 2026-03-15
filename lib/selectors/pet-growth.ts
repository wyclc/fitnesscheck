import { PetGrowthStage } from '@/types/pet';

/**
 * Maps the current progress of a goal to a pet's growth stage.
 * 
 * Target percentages (approximate):
 * - 0%: egg
 * - >0% to 49%: baby
 * - 50% to 99%: growing
 * - 100%: mature
 */
export function getPetGrowthStage(completedCount: number, targetCount: number): PetGrowthStage {
  if (targetCount <= 0 || completedCount === 0) return 'egg';
  
  const percentage = completedCount / targetCount;
  
  if (percentage >= 1) return 'mature';
  if (percentage >= 0.5) return 'growing';
  return 'baby';
}
