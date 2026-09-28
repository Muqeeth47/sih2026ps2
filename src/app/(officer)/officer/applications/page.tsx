'use client';
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, getSchemeColor } from '@/lib/utils';
import { Eye } from 'lucide-react';

export default function OfficerApplicationsPage() {
  const { applications } = useAppStore();
  
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Application Scrutiny</h1>
        <p className="text-slate-500 mt-1">Review and verify student applications.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Application ID</th>
                <th className="px-6 py-4 font-semibold">Scheme</th>
                <th className="px-6 py-4 font-semibold">Applicant</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900 whitespace-nowrap">{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{app.schemeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Priya Meena
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href={`/officer/review/${app.id}`} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Eye className="h-3.5 w-3.5" /> Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
