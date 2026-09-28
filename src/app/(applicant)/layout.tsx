import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function ApplicantLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/applicant' },
    { name: 'Find Scholarships', href: '/scholarships' },
    { name: 'My Applications', href: '/applicant/applications' },
    { name: 'Documents', href: '/applicant/documents' },
    { name: 'Track Application', href: '/applicant/tracking' },
    { name: 'Notifications', href: '/applicant/notifications' },
    { name: 'Profile', href: '/applicant/profile' },
    { name: 'Help', href: '/applicant/help' },
  ];

  return (
    <div className="flex flex-1 max-w-[1600px] w-full mx-auto bg-slate-50">
      <Sidebar items={navItems} />
      {/* 
        This is the main content container. 
        It uses flex-1 to fill the remaining width.
        min-w-0 prevents flex items from overflowing.
      */}
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
