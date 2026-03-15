import { DepositRecord } from '../types';

export const mockDeposits: DepositRecord[] = [
  // 100元: 7筆
  { depositId: 'd-101', amount: 100, createdAt: '2026-01-01T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-101', refundStatus: 'refunded' },
  { depositId: 'd-102', amount: 100, createdAt: '2026-01-15T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-102', refundStatus: 'refunded' },
  { depositId: 'd-103', amount: 100, createdAt: '2026-02-01T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-103', refundStatus: 'unrefunded' },
  { depositId: 'd-104', amount: 100, createdAt: '2026-02-15T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-104', refundStatus: 'unrefunded' },
  { depositId: 'd-105', amount: 100, createdAt: '2026-03-01T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-105', refundStatus: 'not_refunded' },
  { depositId: 'd-106', amount: 100, createdAt: '2026-03-05T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-106', refundStatus: 'not_refunded' },
  { depositId: 'd-107', amount: 100, createdAt: '2026-03-10T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-107', refundStatus: 'unrefunded' },

  // 200元: 7筆
  { depositId: 'd-201', amount: 200, createdAt: '2026-01-05T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-201', refundStatus: 'refunded' },
  { depositId: 'd-202', amount: 200, createdAt: '2026-01-20T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-202', refundStatus: 'refunded' },
  { depositId: 'd-203', amount: 200, createdAt: '2026-02-05T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-203', refundStatus: 'refunded' },
  { depositId: 'd-204', amount: 200, createdAt: '2026-02-20T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-204', refundStatus: 'unrefunded' },
  { depositId: 'd-205', amount: 200, createdAt: '2026-03-02T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-205', refundStatus: 'unrefunded' },
  { depositId: 'd-206', amount: 200, createdAt: '2026-03-08T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-206', refundStatus: 'not_refunded' },
  { depositId: 'd-207', amount: 200, createdAt: '2026-03-12T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-207', refundStatus: 'unrefunded' },

  // 300元: 6筆
  { depositId: 'd-301', amount: 300, createdAt: '2026-01-10T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-301', refundStatus: 'refunded' },
  { depositId: 'd-302', amount: 300, createdAt: '2026-01-25T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-302', refundStatus: 'refunded' },
  { depositId: 'd-303', amount: 300, createdAt: '2026-02-10T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-303', refundStatus: 'refunded' },
  { depositId: 'd-304', amount: 300, createdAt: '2026-02-25T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-304', refundStatus: 'unrefunded' },
  { depositId: 'd-305', amount: 300, createdAt: '2026-03-05T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-305', refundStatus: 'unrefunded' },
  { depositId: 'd-306', amount: 300, createdAt: '2026-03-11T10:00:00Z', depositStatus: 'confirmed', linkedGoalId: 'g-306', refundStatus: 'not_refunded' }
];
