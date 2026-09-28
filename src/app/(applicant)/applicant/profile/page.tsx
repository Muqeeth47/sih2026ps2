'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const { currentUser } = useAppStore();

  if (!currentUser) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal and academic details.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Profile saved (Prototype)"); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" defaultValue={currentUser.name} className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input type="email" defaultValue={currentUser.email} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile</label>
              <input type="text" defaultValue="+91 9876543210" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
              <input type="text" defaultValue="Scheduled Tribe (ST)" className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
              <input type="text" defaultValue="Jharkhand" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Institution</label>
              <input type="text" defaultValue="NIT Jamshedpur" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
