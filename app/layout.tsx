import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DemoBanner } from '@/components/common/demo-banner';
import { SessionProvider } from '@/lib/demo-session/session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YOMOO - 運動押金養成 App',
  description: '運動押金養成 App Prototype',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-slate-100 flex justify-center text-slate-900`}>
        <div className="w-full max-w-md min-h-screen bg-white relative shadow-2xl flex flex-col overflow-x-hidden">
          <DemoBanner />
          <SessionProvider>
            <div className="flex-1 flex flex-col relative w-full overflow-hidden">
              {children}
            </div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
