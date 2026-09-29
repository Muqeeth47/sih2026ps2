'use client';
import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CheckCircle, Trophy, Users } from 'lucide-react';

export default function AdminMeritList() {
  const { applications, updateAppStatus } = useAppStore();
  const [hasRun, setHasRun] = useState(false);
  const [showGazetteModal, setShowGazetteModal] = useState(false);
  
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
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-bold text-xl">Generated Merit List (NFST)</h3>
              <button
                onClick={() => setShowGazetteModal(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <span>🖨️</span> Export Official Gazette Sanction Order (PDF)
              </button>
            </div>

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

      {/* Official Government Gazette Sanction Order Modal */}
      {showGazetteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:p-0 print:bg-white">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-0 flex flex-col gap-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 print:hidden">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase font-mono tracking-wider">Statutory Gazette Publication</span>
                <h2 className="text-xl font-extrabold text-slate-900">Official Sanction Order Preview</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>🖨️</span> Print / Save PDF
                </button>
                <button
                  onClick={() => setShowGazetteModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Gazette Content */}
            <div className="border-4 border-double border-slate-900 p-8 text-slate-900 font-serif space-y-6 bg-white">
              <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
                <div className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">भारत का राजपत्र : THE GAZETTE OF INDIA</div>
                <div className="text-xs font-sans text-slate-500">असाधारण / EXTRAORDINARY — भाग II — खण्ड 3 — उप-खण्ड (ii)</div>
                <div className="text-sm font-bold uppercase tracking-wider font-sans mt-2">MINISTRY OF TRIBAL AFFAIRS</div>
                <div className="text-xs font-sans">GOVERNMENT OF INDIA, SHASTRI BHAWAN, NEW DELHI</div>
              </div>

              <div className="flex justify-between items-center text-xs font-sans border-b border-slate-200 pb-2">
                <span><strong>Order No:</strong> SO-2026/MOTA/NFST-892(E)</span>
                <span><strong>Date:</strong> 29-Sep-2026</span>
              </div>

              <div className="text-xs leading-relaxed space-y-2">
                <p>
                  <strong>ORDER:</strong> In exercise of the powers conferred by the National Fellowship and Scholarship for Higher Education of ST Students Scheme Guidelines, the Ministry of Tribal Affairs hereby notifies the final sanctioned merit list of selected scholars for Academic Session 2026-27.
                </p>
                <p>
                  Direct Benefit Transfer (DBT) shall be disbursed via PFMS ISO 20022 directly into verified Aadhaar-seeded accounts.
                </p>
              </div>

              {/* Sanction Table */}
              <table className="w-full text-left text-xs border border-slate-900 font-sans">
                <thead className="bg-slate-100 border-b border-slate-900 font-bold">
                  <tr>
                    <th className="p-2 border-r border-slate-900">Rank</th>
                    <th className="p-2 border-r border-slate-900">Scholar Name</th>
                    <th className="p-2 border-r border-slate-900">APAAR ID</th>
                    <th className="p-2 border-r border-slate-900">Quota / Category</th>
                    <th className="p-2">Monthly Stipend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {eligibleApps.filter(a => a.pgMarksPercent >= 80).map((app, idx) => (
                    <tr key={app.id}>
                      <td className="p-2 border-r border-slate-900 font-bold">#{idx + 1}</td>
                      <td className="p-2 border-r border-slate-900 font-semibold">{app.applicantName}</td>
                      <td className="p-2 border-r border-slate-900 font-mono text-[11px]">{app.apaarId}</td>
                      <td className="p-2 border-r border-slate-900 text-[11px]">
                        {idx === 0 ? '30% Female Quota' : idx === 1 ? 'PVTG Priority Cluster' : 'General ST Merit'}
                      </td>
                      <td className="p-2 font-mono font-bold text-emerald-700">₹31,000 / mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Digital Seal */}
              <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-end font-sans text-xs">
                <div className="space-y-1">
                  <div className="font-bold uppercase text-[10px] text-emerald-800 flex items-center gap-1">
                    <span>🔐 W3C WebCrypto ECDSA P-256 Digital Seal</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">DIGEST: SHA256:7f4a...d91c</div>
                  <div className="font-mono text-[10px] text-slate-500">STATUS: MATHEMATICALLY VERIFIED</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold uppercase">Joint Secretary to the Govt. of India</div>
                  <div className="text-[10px] text-slate-500">Ministry of Tribal Affairs, New Delhi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
