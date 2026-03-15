export type DepositAmount = 100 | 200 | 300;
export type DepositStatus = 'confirmed' | 'pending';
export type RefundStatus = 'unrefunded' | 'refunded' | 'not_refunded';

export interface DepositRecord {
  depositId: string;
  amount: DepositAmount;
  createdAt: string;
  depositStatus: DepositStatus;
  linkedGoalId?: string;
  refundStatus: RefundStatus;
}
