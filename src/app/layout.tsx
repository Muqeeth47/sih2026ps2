import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TribalScholar-AI | Ministry of Tribal Affairs (MoTA)',
  description:
    'AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes (SIH26239) — NFST, NOS, Top Class, Post-Matric & Pre-Matric Schemes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased" style={{ colorScheme: 'dark' }}>
      <body className="min-h-full flex flex-col bg-[#070b12] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
