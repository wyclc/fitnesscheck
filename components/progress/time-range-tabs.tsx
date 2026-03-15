'use client';

type TimeRange = 'week' | 'month' | 'all';

interface TimeRangeTabsProps {
  activeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeTabs({ activeRange, onChange }: TimeRangeTabsProps) {
  const tabs: { id: TimeRange; label: string }[] = [
    { id: 'week', label: '本週' },
    { id: 'month', label: '本月' },
    { id: 'all', label: '全部' },
  ];

  return (
    <div className="flex bg-slate-100 rounded-full p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 text-sm font-semibold py-2 px-4 rounded-full transition-all ${
            activeRange === tab.id
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
