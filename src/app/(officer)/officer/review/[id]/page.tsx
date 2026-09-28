'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, formatCurrency, getDocumentLabel } from '@/lib/utils';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function OfficerReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { applications, updateAppStatus, addDeficiency } = useAppStore();
  const app = applications.find(a => a.id === id);
  const [deficiencyMsg, setDeficiencyMsg] = useState('');

  if (!app) return <div>Application not found</div>;

  const handleVerify = () => {
    updateAppStatus(app.id, 'INO_VERIFIED');
    alert('Application Verified Successfully');
    router.push('/officer/applications');
  };

  const handleReject = () => {
    updateAppStatus(app.id, 'REJECTED');
    alert('Application Rejected');
    router.push('/officer/applications');
  };

  const handleDeficiency = () => {
    if (!deficiencyMsg) {
      alert("Please enter a deficiency message.");
      return;
    }
    addDeficiency(app.id, deficiencyMsg);
    alert('Deficiency Marked. Applicant notified.');
    router.push('/officer/applications');
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/officer/applications" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Review</h1>
            <p className="text-slate-500 font-mono text-sm mt-1">{app.id}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-sm ${getStatusColor(app.status)}`}>
          {getStatusLabel(app.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Scheme Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500 block">Name</span><span className="font-bold">{app.schemeName}</span></div>
              <div><span className="text-slate-500 block">Code</span><span className="font-mono">{app.schemeCode}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Academic & Income</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500 block">Marks (%)</span><span className="font-bold">{app.pgMarksPercent}%</span></div>
              <div><span className="text-slate-500 block">Annual Income</span><span className="font-bold">{formatCurrency(app.annualIncome)}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between border-b border-slate-100 pb-3 mb-4"><h3 className="font-bold text-slate-900">Uploaded Documents</h3><span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle className="h-3 w-3" /> AI Verified</span></div>
            <ul className="space-y-3">
              {app.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold text-sm">{getDocumentLabel(doc.type)}</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View File</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 text-sm text-orange-800 mb-6">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div>
              <strong>Potential Duplicate Detected</strong><br/>
              The AI screening engine flagged a 98% match with APAAR ID {app.apaarId} in the "Post Matric" scheme. Please verify manually.
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Scrutiny Actions</h3>
            
            <button onClick={handleVerify} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
              <CheckCircle className="h-5 w-5" /> Verify & Approve
            </button>
            
            <button onClick={handleReject} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              <XCircle className="h-5 w-5" /> Reject Application
            </button>

            <div className="pt-4 border-t border-slate-100 mt-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mark Deficiency</label>
              <textarea 
                rows={3} 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 mb-3"
                placeholder="Reason for deficiency..."
                value={deficiencyMsg}
                onChange={(e) => setDeficiencyMsg(e.target.value)}
              />
              <button onClick={handleDeficiency} className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold py-2.5 rounded-lg transition-colors border border-orange-200">
                <AlertTriangle className="h-4 w-4" /> Request Correction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { FileText } from 'lucide-react';
