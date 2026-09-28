'use client';
import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CheckCircle, Trophy, Users } from 'lucide-react';

export default function AdminMeritList() {
  const { applications, updateAppStatus } = useAppStore();
  const [hasRun, setHasRun] = useState(false);
  
  const eligibleApps = applications.filter(a => a.status === 'INO_VERIFIED' || a.status === 'AI_SCRUTINY');

  const runSelection = () => {
    eligibleApps.forEach(app => {
      // Mock merit criteria: pgMarks > 80 gets APPROVED
      if (app.pgMarksPercent >= 80) {
        updateAppStatus(app.id, 'APPROVED');
      } else {
        updateAppStatus(app.id, 'REJECTED');
      }
    });
    setHasRun(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Merit-Based Selection Engine</h1>
          <p className="text-slate-500 mt-1">Screening and final selection oversight.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        {!hasRun ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{eligibleApps.length} Candidates Ready</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              The engine will apply scheme-specific quota rules (PVTG, Female, PwD) and rank candidates based on academic marks.
            </p>
            <button 
              onClick={runSelection}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Run Selection Algorithm
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-900 flex items-start gap-4 mb-8">
              <CheckCircle className="h-6 w-6 shrink-0 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg">Selection Complete</h3>
                <p className="text-sm mt-1">All verified candidates have been screened and processed. The final list is ready for sanctioning.</p>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-4">Generated Merit List (NFST)</h3>
            <table className="w-full text-left text-sm text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Rank</th>
                  <th className="px-4 py-3 font-semibold">App ID</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {eligibleApps.map((app, i) => (
                  <tr key={app.id}>
                    <td className="px-4 py-3 font-bold">#{i + 1}</td>
                    <td className="px-4 py-3 font-mono">{app.id}</td>
                    <td className="px-4 py-3">{app.pgMarksPercent}%</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${app.pgMarksPercent >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                        {app.pgMarksPercent >= 80 ? 'SELECTED' : 'WAITLISTED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
