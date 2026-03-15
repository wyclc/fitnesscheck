import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <main className="flex-1 overflow-y-auto w-full h-full relative">
        {children}
      </main>
    </div>
  );
}
