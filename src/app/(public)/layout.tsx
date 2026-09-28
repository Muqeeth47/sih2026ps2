import React from 'react';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
