'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Ministry overview and scheme management.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Total Schemes</div>
          <div className="text-3xl font-bold text-slate-900">12</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Applications</div>
          <div className="text-3xl font-bold text-slate-900">4,521</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Sanctioned Funds</div>
          <div className="text-3xl font-bold text-slate-900">₹45.2 Cr</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Active Institutes</div>
          <div className="text-3xl font-bold text-slate-900">892</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Link href="/admin/schemes" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Schemes &rarr;</h3>
           <p className="text-slate-600">Create, edit, or close scholarship schemes.</p>
         </Link>
         <Link href="/admin/users" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Users &rarr;</h3>
           <p className="text-slate-600">Administer officers, institutes, and applicants.</p>
         </Link>
      </div>
    </div>
  );
}
