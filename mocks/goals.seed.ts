import { GoalRecord } from '../types';

export const mockGoals: GoalRecord[] = [
  // 已完成: 8筆
  { goalId: 'g-101', goalTitle: 'Morning Jog', exerciseType: 'Running', frequencyPerWeek: 3, durationPerSession: 30, startDate: '2026-01-01', endDate: '2026-01-14', completedCount: 6, targetCount: 6, status: 'completed', linkedDepositAmount: 100, linkedPetId: 'p-101' },
  { goalId: 'g-102', goalTitle: 'Yoga Flow', exerciseType: 'Yoga', frequencyPerWeek: 2, durationPerSession: 45, startDate: '2026-01-15', endDate: '2026-01-28', completedCount: 4, targetCount: 4, status: 'completed', linkedDepositAmount: 100, linkedPetId: 'p-102' },
  { goalId: 'g-201', goalTitle: 'Weightlifting Base', exerciseType: 'Strength', frequencyPerWeek: 4, durationPerSession: 60, startDate: '2026-01-05', endDate: '2026-01-18', completedCount: 8, targetCount: 8, status: 'completed', linkedDepositAmount: 200, linkedPetId: 'p-201' },
  { goalId: 'g-202', goalTitle: 'Swimming', exerciseType: 'Swimming', frequencyPerWeek: 2, durationPerSession: 60, startDate: '2026-01-20', endDate: '2026-02-02', completedCount: 4, targetCount: 4, status: 'completed', linkedDepositAmount: 200, linkedPetId: 'p-202' },
  { goalId: 'g-203', goalTitle: 'Cycling 10k', exerciseType: 'Cycling', frequencyPerWeek: 3, durationPerSession: 40, startDate: '2026-02-05', endDate: '2026-02-18', completedCount: 6, targetCount: 6, status: 'completed', linkedDepositAmount: 200, linkedPetId: 'p-203' },
  { goalId: 'g-301', goalTitle: 'HIIT Cardio', exerciseType: 'HIIT', frequencyPerWeek: 3, durationPerSession: 25, startDate: '2026-01-10', endDate: '2026-01-23', completedCount: 6, targetCount: 6, status: 'completed', linkedDepositAmount: 300, linkedPetId: 'p-301' },
  { goalId: 'g-302', goalTitle: 'Core Strength', exerciseType: 'Strength', frequencyPerWeek: 4, durationPerSession: 30, startDate: '2026-01-25', endDate: '2026-02-07', completedCount: 8, targetCount: 8, status: 'completed', linkedDepositAmount: 300, linkedPetId: 'p-302' },
  { goalId: 'g-303', goalTitle: 'Marathon Prep', exerciseType: 'Running', frequencyPerWeek: 4, durationPerSession: 90, startDate: '2026-02-10', endDate: '2026-02-23', completedCount: 8, targetCount: 8, status: 'completed', linkedDepositAmount: 300, linkedPetId: 'p-303' },

  // 進行中: 8筆
  { goalId: 'g-103', goalTitle: 'Evening Walk', exerciseType: 'Walking', frequencyPerWeek: 5, durationPerSession: 45, startDate: '2026-02-01', endDate: '2026-03-31', completedCount: 20, targetCount: 40, status: 'in_progress', linkedDepositAmount: 100, linkedPetId: 'p-103' },
  { goalId: 'g-104', goalTitle: 'Pilates Basics', exerciseType: 'Pilates', frequencyPerWeek: 2, durationPerSession: 50, startDate: '2026-02-15', endDate: '2026-03-31', completedCount: 8, targetCount: 12, status: 'in_progress', linkedDepositAmount: 100, linkedPetId: 'p-104' },
  { goalId: 'g-107', goalTitle: 'Stretching Daily', exerciseType: 'Flexibility', frequencyPerWeek: 7, durationPerSession: 15, startDate: '2026-03-10', endDate: '2026-03-23', completedCount: 3, targetCount: 14, status: 'in_progress', linkedDepositAmount: 100, linkedPetId: 'p-107' },
  { goalId: 'g-204', goalTitle: 'Tennis Practice', exerciseType: 'Sports', frequencyPerWeek: 2, durationPerSession: 120, startDate: '2026-02-20', endDate: '2026-03-31', completedCount: 6, targetCount: 12, status: 'in_progress', linkedDepositAmount: 200, linkedPetId: 'p-204' },
  { goalId: 'g-205', goalTitle: 'Boxing Class', exerciseType: 'Cardio', frequencyPerWeek: 3, durationPerSession: 60, startDate: '2026-03-02', endDate: '2026-03-31', completedCount: 6, targetCount: 12, status: 'in_progress', linkedDepositAmount: 200, linkedPetId: 'p-205' },
  { goalId: 'g-207', goalTitle: 'Jump Rope', exerciseType: 'Cardio', frequencyPerWeek: 5, durationPerSession: 20, startDate: '2026-03-12', endDate: '2026-03-25', completedCount: 2, targetCount: 10, status: 'in_progress', linkedDepositAmount: 200, linkedPetId: 'p-207' },
  { goalId: 'g-304', goalTitle: 'Powerlifting P', exerciseType: 'Strength', frequencyPerWeek: 3, durationPerSession: 90, startDate: '2026-02-25', endDate: '2026-04-05', completedCount: 8, targetCount: 18, status: 'in_progress', linkedDepositAmount: 300, linkedPetId: 'p-304' },
  { goalId: 'g-305', goalTitle: 'Crossfit WOD', exerciseType: 'Crossfit', frequencyPerWeek: 4, durationPerSession: 60, startDate: '2026-03-05', endDate: '2026-04-01', completedCount: 5, targetCount: 16, status: 'in_progress', linkedDepositAmount: 300, linkedPetId: 'p-305' },

  // 失敗: 4筆
  { goalId: 'g-105', goalTitle: 'Lazy January', exerciseType: 'Running', frequencyPerWeek: 3, durationPerSession: 30, startDate: '2026-03-01', endDate: '2026-03-10', completedCount: 1, targetCount: 4, status: 'failed', linkedDepositAmount: 100 },
  { goalId: 'g-106', goalTitle: 'Quick Abs', exerciseType: 'Strength', frequencyPerWeek: 5, durationPerSession: 10, startDate: '2026-03-05', endDate: '2026-03-12', completedCount: 2, targetCount: 5, status: 'failed', linkedDepositAmount: 100 },
  { goalId: 'g-206', goalTitle: 'Gym Intro', exerciseType: 'Gym', frequencyPerWeek: 3, durationPerSession: 45, startDate: '2026-03-08', endDate: '2026-03-15', completedCount: 0, targetCount: 3, status: 'failed', linkedDepositAmount: 200 },
  { goalId: 'g-306', goalTitle: 'Climbing', exerciseType: 'Bouldering', frequencyPerWeek: 2, durationPerSession: 120, startDate: '2026-03-11', endDate: '2026-03-20', completedCount: 0, targetCount: 2, status: 'failed', linkedDepositAmount: 300 }
];
