import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Schemes', href: '/admin/schemes' },
    { name: 'Applications', href: '/admin/applications' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    <div className="flex flex-1 max-w-[1600px] w-full mx-auto bg-slate-50">
      <Sidebar items={navItems} />
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
