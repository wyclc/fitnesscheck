'use client';

import React from 'react';
import { clearSession } from '@/lib/demo-session/storage';

type DemoBannerProps = {
  variant?: 'default' | 'warning';
  compact?: boolean;
};

export const DemoBanner: React.FC<DemoBannerProps> = ({ variant = 'default', compact = false }) => {
  const bgColor = variant === 'warning' ? 'bg-orange-500' : 'bg-blue-600';
  
  const handleReset = () => {
    if (window.confirm('確定要重設全部 Demo 資料並回到起點嗎？')) {
      clearSession();
      window.location.href = '/welcome';
    }
  };

  return (
    <div className={`w-full text-white flex items-center justify-between ${compact ? 'py-1 text-xs' : 'py-2 text-sm'} ${bgColor} px-4 font-medium`}>
      <div className="flex items-center">
        <span className="mr-2 border shrink-0 border-white/50 rounded px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wider">Demo</span>
        <span className="truncate text-xs sm:text-sm">金流、退款與數據皆為模擬展示</span>
      </div>
      <button 
        onClick={handleReset}
        className="ml-2 shrink-0 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition-colors whitespace-nowrap active:scale-95"
      >
        重設狀態
      </button>
    </div>
  );
};
