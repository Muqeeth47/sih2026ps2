'use client';
import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel } from '@/lib/utils';
import { CheckCircle, Clock } from 'lucide-react';

export default function TrackingPage() {
  const { applications, currentUser } = useAppStore();
  const myApps = applications.filter(a => a.applicantId === currentUser?.id);
  const [selectedAppId, setSelectedAppId] = useState(myApps[0]?.id || '');
  
  const selectedApp = myApps.find(a => a.id === selectedAppId);

  if (!selectedApp) {
    return <div className="p-8 text-center text-slate-500">No applications found to track.</div>;
  }

  const steps = [
    { label: 'Application Submitted', active: true, completed: true, date: '12 Oct 2024' },
    { label: 'Document Verification', active: selectedApp.status === 'INO_VERIFIED' || selectedApp.status === 'APPROVED', completed: selectedApp.status === 'INO_VERIFIED' || selectedApp.status === 'APPROVED', date: selectedApp.status === 'INO_VERIFIED' ? 'Today' : '' },
    { label: 'Under Scrutiny', active: selectedApp.status === 'APPROVED', completed: selectedApp.status === 'APPROVED', date: '' },
    { label: 'Selection & Sanction', active: false, completed: false, date: '' },
    { label: 'Disbursement', active: false, completed: false, date: '' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Track Application</h1>
          <p className="text-slate-500 mt-1">Real-time status of your submitted applications.</p>
        </div>
        <select 
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white font-medium text-slate-700 shadow-sm"
          value={selectedAppId}
          onChange={(e) => setSelectedAppId(e.target.value)}
        >
          {myApps.map(app => (
            <option key={app.id} value={app.id}>{app.schemeName}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-xl text-slate-900">{selectedApp.schemeName}</h2>
            <p className="font-mono text-slate-500 text-sm mt-1">{selectedApp.id}</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${getStatusColor(selectedApp.status)}`}>
            {getStatusLabel(selectedApp.status)}
          </div>
        </div>

        {selectedApp.status === 'DEFICIENCY_RAISED' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-8 font-semibold">
            Action Required: Your application has deficiencies. Please visit the application details page to resolve them.
          </div>
        )}

        <div className="relative pl-4 md:pl-0">
          <div className="absolute left-[1.375rem] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-slate-100 rounded"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex items-start md:items-center flex-col md:flex-row gap-6 ${step.completed ? '' : 'opacity-60'}`}>
                <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block">
                  <div className="font-bold text-slate-900">{step.label}</div>
                  <div className="text-sm text-slate-500">{step.date}</div>
                </div>
                
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10 ${step.completed ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {step.completed ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-5 w-5" />}
                </div>

                <div className="md:w-1/2 md:pl-12 block md:hidden">
                  <div className="font-bold text-slate-900">{step.label}</div>
                  <div className="text-sm text-slate-500">{step.date}</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  {step.active && !step.completed && <div className="text-sm font-semibold text-blue-600">In Progress</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
