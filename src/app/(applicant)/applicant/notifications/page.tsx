'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications } = useAppStore();

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
        <p className="text-slate-500 mt-1">Updates on your applications and account.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {notifications.map((note, i) => (
              <li key={i} className="p-6 hover:bg-slate-50 transition-colors flex gap-4 items-start">
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{note}</h4>
                  <span className="text-xs text-slate-500">Just now</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-12 text-center text-slate-500">No notifications.</div>
        )}
      </div>
    </div>
  );
}
