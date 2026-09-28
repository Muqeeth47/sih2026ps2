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
    <html lang="en" className="h-full antialiased" style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
