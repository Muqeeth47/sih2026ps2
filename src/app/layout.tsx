import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { UniversalHeader } from '@/components/layout/UniversalHeader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Ministry of Tribal Affairs | Scholarship Portal',
  description: 'AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
        <UniversalHeader />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
