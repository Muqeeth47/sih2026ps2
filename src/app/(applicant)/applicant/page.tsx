'use client';
import React from 'react';
import Link from 'next/link';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { getSchemeColor, getStatusColor, getStatusLabel, formatCurrency } from '@/lib/utils';
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ApplicantDashboard() {
  const activeApp = MOCK_APPLICATIONS[0]; // Priya Meena
  const deficientApp = MOCK_APPLICATIONS[1]; // Arjun Munda

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Priya!</h1>
          <p className="text-slate-500 mt-1">Here is the status of your scholarship applications.</p>
        </div>
      </div>

      {/* Alert if deficiency exists */}
      {deficientApp && deficientApp.deficiencies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex gap-4 w-full">
          <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-900 text-base">Action Required: Document Deficiency</h3>
            <p className="text-sm text-red-700 mt-1">
              Your application for {deficientApp.schemeName} requires your attention. 
              Please resolve the flagged issues within 7 days.
            </p>
            <Link href={`/applicant/applications/${deficientApp.id}`} className="inline-block mt-3 text-sm font-bold text-red-700 hover:underline">
              Resolve Issue &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Active Application Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Active Application</div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{activeApp.schemeName}</h2>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getSchemeColor(activeApp.schemeCode)}`}>
                {activeApp.schemeCode}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Status:</span>
            <span className={`text-sm font-bold px-3 py-1.5 rounded-full border ${getStatusColor(activeApp.status)}`}>
              {getStatusLabel(activeApp.status)}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Progress Timeline */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-slate-900">Application Progress</span>
              <span className="text-sm font-medium text-slate-500">Step 3 of 5</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              <div className="text-xs font-semibold text-blue-700">Submitted</div>
              <div className="text-xs font-semibold text-blue-700">Verified</div>
              <div className="text-xs font-bold text-blue-700">Scrutiny</div>
              <div className="text-xs font-medium text-slate-400">Sanction</div>
              <div className="text-xs font-medium text-slate-400">Disbursal</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Application ID</div>
              <div className="font-mono text-base font-bold text-slate-900">{activeApp.id}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Family Income</div>
              <div className="text-base font-bold text-slate-900">{formatCurrency(activeApp.annualIncome)}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Academic Score</div>
              <div className="text-base font-bold text-slate-900">{activeApp.pgMarksPercent}%</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Submitted On</div>
              <div className="text-base font-bold text-slate-900">12 Oct 2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Link href="/applicant/tracking" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors text-lg">Track Application</h3>
            <p className="text-sm text-slate-500 line-clamp-2">View detailed status updates and tracking history.</p>
          </div>
        </Link>
        <Link href="/scholarships" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors text-lg">Find Scholarships</h3>
            <p className="text-sm text-slate-500 line-clamp-2">Check eligibility for other MoTA schemes.</p>
          </div>
        </Link>
        <Link href="/applicant/documents" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors text-lg">Document Vault</h3>
            <p className="text-sm text-slate-500 line-clamp-2">Manage your verified digital certificates.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
