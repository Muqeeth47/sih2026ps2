'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';

export default function FellowshipManagement() {
  const { applications, currentUser } = useAppStore();
  const activeFellowship = applications.find(a => a.applicantId === currentUser?.id && a.status === 'APPROVED');

  if (!activeFellowship) {
    return (
      <div className="p-8 text-center text-slate-500">
        You do not have any active post-selection fellowships.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Post-Selection Management</h1>
        <p className="text-slate-500 mt-1">Manage quarterly reports and stipend tracking.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold">{activeFellowship.schemeName}</h2>
            <p className="text-sm text-slate-500 mt-1">ID: {activeFellowship.id}</p>
          </div>
          <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
            Active Fellowship
          </div>
        </div>

        <h3 className="font-bold text-lg mb-4">Quarterly Progress Reports</h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Quarter</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Disbursement</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-bold">Q1 (Jan-Mar)</td>
                <td className="px-4 py-3 text-green-600 font-semibold">Verified by Guide</td>
                <td className="px-4 py-3">₹31,000 via DBT</td>
                <td className="px-4 py-3"><button className="text-blue-600 font-semibold">View</button></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold">Q2 (Apr-Jun)</td>
                <td className="px-4 py-3 text-orange-600 font-semibold">Pending Upload</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3"><button className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-semibold text-xs">Upload Report</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
