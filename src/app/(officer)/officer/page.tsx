'use client';
import React from 'react';
import Link from 'next/link';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

export default function OfficerDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Scrutiny Workbench</h1>
        <p className="text-slate-500 text-sm">Review pending applications and manage deficiencies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Pending Review</div>
          <div className="text-3xl font-bold text-blue-600">24</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Verified Today</div>
          <div className="text-3xl font-bold text-green-600">12</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Deficiency Cases</div>
          <div className="text-3xl font-bold text-orange-600">8</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Rejected</div>
          <div className="text-3xl font-bold text-red-600">3</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-slate-900">
          Applications Requiring Scrutiny
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">App ID</th>
              <th className="p-4 font-semibold">Applicant</th>
              <th className="p-4 font-semibold">Scheme</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {MOCK_APPLICATIONS.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-medium text-slate-900">{app.id}</td>
                <td className="p-4">{app.applicantName}</td>
                <td className="p-4">{app.schemeCode}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/officer/review/${app.id}`} className="text-blue-600 hover:underline font-semibold">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
