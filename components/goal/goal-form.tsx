'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/demo-session/session';
import { GoalFormData, validateGoalForm } from '@/lib/validators/goal-form';

export function GoalForm() {
  const router = useRouter();
  const { updateSession } = useDemoSession();
  
  const [formData, setFormData] = useState<GoalFormData>(() => ({
    goalTitle: '',
    exerciseType: '',
    frequencyPerWeek: 3,
    durationPerSession: 30,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days later
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof GoalFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateGoalForm(formData);
    setErrors(validation.errors);
    
    if (!validation.isValid) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockGoalId = `g-[mock]-${Date.now()}`;
    
    // Construct goal record
    const newGoal: import('@/types/goal').GoalRecord = {
      goalId: mockGoalId,
      goalTitle: formData.goalTitle,
      exerciseType: formData.exerciseType,
      frequencyPerWeek: formData.frequencyPerWeek,
      durationPerSession: formData.durationPerSession,
      startDate: formData.startDate,
      endDate: formData.endDate,
      completedCount: 0,
      targetCount: formData.frequencyPerWeek * 4, // Approx 4 weeks
      status: 'in_progress',
      linkedDepositAmount: 100, // Or whatever the active deposit is, we'll just mock 100
      linkedPetId: `p-${Date.now()}`
    };
    
    updateSession({ activeGoalId: mockGoalId, activeGoal: newGoal });
    
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof GoalFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-left">
      <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">目標名稱</label>
          <input
            type="text"
            name="goalTitle"
            value={formData.goalTitle}
            onChange={handleChange}
            placeholder="例如：每週慢跑、核心訓練"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
          />
          {errors.goalTitle && <p className="mt-1 text-xs text-red-500">{errors.goalTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">運動類型</label>
          <select
            name="exerciseType"
            value={formData.exerciseType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-700"
          >
            <option value="">請選擇</option>
            <option value="跑步">跑步</option>
            <option value="健身房">健身房 / 重訓</option>
            <option value="瑜伽">瑜伽</option>
            <option value="游泳">游泳</option>
            <option value="其他">其他</option>
          </select>
          {errors.exerciseType && <p className="mt-1 text-xs text-red-500">{errors.exerciseType}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">每週幾天</label>
            <input
              type="number"
              name="frequencyPerWeek"
              value={formData.frequencyPerWeek}
              onChange={handleChange}
              min={1}
              max={7}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
            />
            {errors.frequencyPerWeek && <p className="mt-1 text-xs text-red-500">{errors.frequencyPerWeek}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">單次分鐘數</label>
            <input
              type="number"
              name="durationPerSession"
              value={formData.durationPerSession}
              onChange={handleChange}
              min={5}
              step={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
            />
            {errors.durationPerSession && <p className="mt-1 text-xs text-red-500">{errors.durationPerSession}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">開始日期</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-sm"
            />
            {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">結束日期</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-sm"
            />
            {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex items-center gap-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s'}}>
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-400 shrink-0 relative">
          <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-1">神祕的蛋將被孵化</h4>
          <p className="text-xs text-slate-500 leading-relaxed">建立目標後你將獲得專屬寵物，陪伴你挑戰！</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${
          isSubmitting ? 'bg-indigo-400 text-white cursor-not-allowed transform-none' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? '建立中...' : '建立我的目標'}
      </button>
    </form>
  );
}
