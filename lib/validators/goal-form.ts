export interface GoalFormData {
  goalTitle: string;
  exerciseType: string;
  frequencyPerWeek: number;
  durationPerSession: number;
  startDate: string;
  endDate: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof GoalFormData, string>>;
}

export function validateGoalForm(data: GoalFormData): ValidationResult {
  const errors: Partial<Record<keyof GoalFormData, string>> = {};

  if (!data.goalTitle.trim()) {
    errors.goalTitle = '請輸入目標名稱';
  } else if (data.goalTitle.length > 20) {
    errors.goalTitle = '目標名稱請勿超過 20 字';
  }

  if (!data.exerciseType.trim()) {
    errors.exerciseType = '請選擇或輸入運動類型';
  }

  if (data.frequencyPerWeek < 1 || data.frequencyPerWeek > 7) {
    errors.frequencyPerWeek = '每週頻率需介於 1 到 7 天';
  }

  if (data.durationPerSession < 5) {
    errors.durationPerSession = '單次至少需 5 分鐘';
  }

  if (!data.startDate) {
    errors.startDate = '請選擇開始日期';
  }

  if (!data.endDate) {
    errors.endDate = '請選擇結束日期';
  } else if (data.startDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.endDate = '結束日期不能早於開始日期';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
