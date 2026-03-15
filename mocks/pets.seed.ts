import { PetRecord } from '../types';

export const mockPets: PetRecord[] = [
  // Completed goals (8 pets) - all mature and unlocked
  { petId: 'p-101', petName: 'Sparky', species: 'Dog', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-101', obtainedDate: '2026-01-14T10:00:00Z' },
  { petId: 'p-102', petName: 'Luna', species: 'Cat', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-102', obtainedDate: '2026-01-28T10:00:00Z' },
  { petId: 'p-201', petName: 'Max', species: 'Lion', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-201', obtainedDate: '2026-01-18T10:00:00Z' },
  { petId: 'p-202', petName: 'Bella', species: 'Dolphin', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-202', obtainedDate: '2026-02-02T10:00:00Z' },
  { petId: 'p-203', petName: 'Rocky', species: 'Bear', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-203', obtainedDate: '2026-02-18T10:00:00Z' },
  { petId: 'p-301', petName: 'Buddy', species: 'Eagle', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-301', obtainedDate: '2026-01-23T10:00:00Z' },
  { petId: 'p-302', petName: 'Daisy', species: 'Tiger', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-302', obtainedDate: '2026-02-07T10:00:00Z' },
  { petId: 'p-303', petName: 'Charlie', species: 'Horse', growthStage: 'mature', isUnlocked: true, linkedGoalId: 'g-303', obtainedDate: '2026-02-23T10:00:00Z' },

  // In_progress goals (8 pets) - still growing, not unlocked yet
  { petId: 'p-103', petName: 'Gizmo', species: 'Fox', growthStage: 'growing', isUnlocked: false, linkedGoalId: 'g-103' },
  { petId: 'p-104', petName: 'Milo', species: 'Rabbit', growthStage: 'growing', isUnlocked: false, linkedGoalId: 'g-104' },
  { petId: 'p-107', petName: 'Oliver', species: 'Turtle', growthStage: 'egg', isUnlocked: false, linkedGoalId: 'g-107' },
  { petId: 'p-204', petName: 'Leo', species: 'Wolf', growthStage: 'growing', isUnlocked: false, linkedGoalId: 'g-204' },
  { petId: 'p-205', petName: 'Chloe', species: 'Panda', growthStage: 'growing', isUnlocked: false, linkedGoalId: 'g-205' },
  { petId: 'p-207', petName: 'Loki', species: 'Owl', growthStage: 'egg', isUnlocked: false, linkedGoalId: 'g-207' },
  { petId: 'p-304', petName: 'Zeus', species: 'Dragon', growthStage: 'growing', isUnlocked: false, linkedGoalId: 'g-304' },
  { petId: 'p-305', petName: 'Bailey', species: 'Phoenix', growthStage: 'baby', isUnlocked: false, linkedGoalId: 'g-305' }
];
