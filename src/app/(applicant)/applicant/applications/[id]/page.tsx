'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, formatCurrency, getDocumentLabel } from '@/lib/utils';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [isResolving, setIsResolving] = React.useState(false);
  const resolveDeficiency = () => {
    setIsResolving(true);
    setTimeout(() => {
      useAppStore.setState(state => ({
        applications: state.applications.map(a => a.id === id ? { ...a, status: 'SUBMITTED', deficiencies: a.deficiencies.map(d => ({ ...d, status: 'RESOLVED' })) } : a)
      }));
      setIsResolving(false);
      alert('Document replaced successfully. Application resubmitted.');
    }, 1000);
  };
  const { id } = use(params);
  const { applications } = useAppStore();
  const app = applications.find(a => a.id === id);

  if (!app) {
    return <div>Application not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <Link href="/applicant/applications" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Details</h1>
          <p className="text-slate-500 font-mono text-sm mt-1">{app.id}</p>
        </div>
      </div>

      {app.status === 'DEFICIENCY_RAISED' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
            <div>
              <h3 className="font-bold text-red-900">Deficiency Detected</h3>
              <ul className="mt-2 space-y-2">
                {app.deficiencies.map((def, i) => (
                  <li key={i} className="text-sm text-red-700 bg-red-100/50 p-3 rounded-md border border-red-200">
                    <span className="font-bold">{def.documentType}:</span> {def.reason}
                    {def.status === 'OPEN' && (
                      <button onClick={resolveDeficiency} disabled={isResolving} className="mt-2 block bg-white border border-red-300 px-3 py-1.5 rounded text-red-700 font-bold hover:bg-red-50 text-xs">
                        {isResolving ? "Uploading..." : "Replace Document & Resubmit"}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

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
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Academic Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-slate-500 block">Marks (%)</span><span className="font-bold">{app.pgMarksPercent}%</span></div>
              <div><span className="text-slate-500 block">Annual Income</span><span className="font-bold">{formatCurrency(app.annualIncome)}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Submitted Documents</h3>
            <ul className="space-y-3">
              {app.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-sm">{getDocumentLabel(doc.type)}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{doc.fileName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Current Status</h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-sm ${getStatusColor(app.status)}`}>
              {getStatusLabel(app.status)}
            </div>
            
            <div className="mt-8 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
              <ul className="space-y-6 relative z-10">
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"><CheckCircle className="h-3 w-3 text-white" /></div>
                  <div><div className="text-sm font-bold text-slate-900">Submitted</div><div className="text-xs text-slate-500">12 Oct 2024</div></div>
                </li>
                <li className="flex gap-4">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${app.status === 'INO_VERIFIED' || app.status === 'APPROVED' ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  <div><div className="text-sm font-bold text-slate-900">Document Verification</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Under Scrutiny</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Sanction</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Disbursement</div></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
