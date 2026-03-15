import { DepositAmount } from '@/types/deposit';

type DepositOptionCardProps = {
  amount: DepositAmount;
  selected: boolean;
  onSelect: (amount: DepositAmount) => void;
};

export function DepositOptionCard({ amount, selected, onSelect }: DepositOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(amount)}
      className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 relative ${
        selected 
          ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-105' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
      }`}
    >
      <span className="text-2xl sm:text-3xl font-bold text-slate-800">${amount}</span>
      <span className="text-xs sm:text-sm font-medium text-slate-500">押金</span>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}
