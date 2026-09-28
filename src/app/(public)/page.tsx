'use client';
import React from 'react';
import Link from 'next/link';
import { KPI_DATA, SCHEMES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full bg-blue-800/50 px-3 py-1 text-sm font-medium text-blue-200 ring-1 ring-inset ring-blue-700/50">
              SIH-26239 NATIONAL ARCHITECTURE
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Scholarships & Fellowships for Scheduled Tribe Students
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed max-w-2xl">
              Apply for National Fellowship for ST (NFST), National Overseas Scholarship (NOS), and
              Premier Institute Schemes through a unified, AI-enabled national portal.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/schemes"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-sm hover:bg-slate-100"
              >
                Find Scholarships
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 border border-blue-600"
              >
                Apply Now <ArrowRight className="inline h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-lg border border-slate-100 p-6">
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-blue-600">{KPI_DATA.totalApplicants.toLocaleString('en-IN')}</div>
            <div className="text-xs font-semibold uppercase text-slate-500">Total Applicants</div>
          </div>
          <div className="text-center space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(KPI_DATA.totalFundsSanctioned)}</div>
            <div className="text-xs font-semibold uppercase text-slate-500">DBT Disbursed</div>
          </div>
          <div className="text-center space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0">
            <div className="text-3xl font-bold text-slate-900\">{(KPI_DATA.femaleRatio * 100).toFixed(1)}%</div>
            <div className="text-xs font-semibold uppercase text-slate-500">Female Scholar Ratio</div>
          </div>
          <div className="text-center space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0">
            <div className="text-3xl font-bold text-orange-600">1,287</div>
            <div className="text-xs font-semibold uppercase text-slate-500">PVTG Beneficiaries</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-4 text-slate-600">A streamlined, AI-assisted process to apply and track your scholarship journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative\">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10"></div>
          {[
            { step: '1', title: 'Find a Scheme', desc: 'Browse available scholarships based on your eligibility.' },
            { step: '2', title: 'Check Eligibility', desc: 'Use the Smart Match Wizard to verify your qualifications.' },
            { step: '3', title: 'Submit Application', desc: 'Upload documents securely for automated AI scrutiny.' },
            { step: '4', title: 'Track Application', desc: 'Monitor your status until DBT disbursement.' }
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold mb-4 ring-8 ring-white">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured Schemes */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Scholarships & Fellowships</h2>
          <Link href="/schemes" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHEMES.slice(0, 3).map((scheme) => (
            <div key={scheme.code} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 font-mono">
                  {scheme.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {formatCurrency(scheme.stipendMonthly)}/mo
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{scheme.name}</h3>
              <p className="text-sm text-slate-600 flex-1 mb-6 line-clamp-3">{scheme.description}</p>
              <Link href="/schemes" className="text-blue-600 font-medium text-sm hover:underline mt-auto">
                Check Eligibility &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
