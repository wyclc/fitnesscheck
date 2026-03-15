export type PetGrowthStage = 'egg' | 'baby' | 'growing' | 'mature';

export interface PetRecord {
  petId: string;
  petName: string;
  species: string;
  growthStage: PetGrowthStage;
  isUnlocked: boolean;
  linkedGoalId?: string;
  obtainedDate?: string;
}
