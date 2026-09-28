'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import type { Role } from '@/lib/types';
import { SCHEMES, KPI_DATA } from '@/lib/mock-data';
import { formatCurrency, getSchemeColor } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TermsPrivacyModal } from '@/components/TermsPrivacyModal';
import { ApplicantView } from '@/components/ApplicantView';
import { InoView } from '@/components/InoView';
import { ScrutinyOfficerWorkbench } from '@/components/ScrutinyOfficerWorkbench';
import { AdminView } from '@/components/AdminView';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Crown,
  KeyRound,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  TrendingUp,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';

function TribalScholarApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentRole, setRole, currentUser } = useAppStore();

  // Read initial query params
  const initialRole = (searchParams.get('role') as Role) || currentRole || 'APPLICANT';
  const initialTab = searchParams.get('tab') || 'overview';
  const initialAppId = searchParams.get('appId') || 'APP-2024-NFST-001';
  const initialView = (searchParams.get('view') as 'terms' | 'privacy' | null) || null;

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedAppId, setSelectedAppId] = useState<string>(initialAppId);
  const [legalView, setLegalView] = useState<'terms' | 'privacy' | null>(initialView);
  const [showLandingFrame, setShowLandingFrame] = useState<boolean>(!searchParams.get('tab'));

  // Sync state to URL with pushState on every change
  const updateUrlParams = useCallback(
    (role: Role, tab: string, appId?: string, view?: 'terms' | 'privacy' | null) => {
      const params = new URLSearchParams();
      params.set('role', role);
      params.set('tab', tab);
      if (appId) params.set('appId', appId);
      if (view) params.set('view', view);

      const newUrl = `?${params.toString()}`;
      window.history.pushState(null, '', newUrl);
    },
    []
  );

  // Sync role and tab whenever URL params change
  useEffect(() => {
    const r = (searchParams.get('role') as Role) || 'APPLICANT';
    const t = searchParams.get('tab');
    const aid = searchParams.get('appId');
    const v = searchParams.get('view') as 'terms' | 'privacy' | null;

    if (r) setRole(r);
    if (t) {
      setActiveTab(t);
      setShowLandingFrame(false);
    }
    if (aid) setSelectedAppId(aid);
    if (v) setLegalView(v);
  }, [searchParams, setRole]);

  // Handle tab switch
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setShowLandingFrame(false);
    updateUrlParams(currentRole, newTab, selectedAppId, legalView);
  };

  // Handle role switch with 1-click autofill credentials
  const handleRoleAutofill = (role: Role, defaultTab?: string) => {
    setRole(role);
    const tabToSet =
      defaultTab ||
      (role === 'APPLICANT'
        ? 'overview'
        : role === 'INSTITUTE_NODAL'
        ? 'inbox'
        : role === 'SCRUTINY_OFFICER'
        ? 'workbench'
        : 'kpi');

    setActiveTab(tabToSet);
    setShowLandingFrame(false);
    updateUrlParams(role, tabToSet, selectedAppId, legalView);
  };

  const handleOpenLegal = (view: 'terms' | 'privacy') => {
    setLegalView(view);
    updateUrlParams(currentRole, activeTab, selectedAppId, view);
  };

  const handleCloseLegal = () => {
    setLegalView(null);
    updateUrlParams(currentRole, activeTab, selectedAppId, null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-blue-500/20 selection:text-blue-800">
      {/* Top Header */}
      <Header
        currentTab={activeTab}
        onTabChange={handleTabChange}
        onOpenLegal={handleOpenLegal}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Navigation Breadcrumb / Frame Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2 text-xs">
          <div className="flex items-center gap-2 font-mono text-[11px] text-gray-500">
            <button
              onClick={() => {
                setShowLandingFrame(true);
                updateUrlParams(currentRole, 'landing');
              }}
              className="hover:text-green-600 font-bold uppercase tracking-wider transition-colors"
            >
              MoTA Portal Home
            </button>
            <span>/</span>
            <span className="text-gray-700 uppercase font-semibold">
              {currentRole.replace('_', ' ')}
            </span>
            <span>/</span>
            <span className="text-green-600 font-mono uppercase font-bold">
              {showLandingFrame ? 'Single-Frame Landing Matrix' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!showLandingFrame && (
              <button
                onClick={() => {
                  setShowLandingFrame(true);
                  updateUrlParams(currentRole, 'landing');
                }}
                className="text-[11px] font-mono text-gray-500 hover:text-gray-800 px-2 py-0.5 border border-gray-200 bg-white"
              >
                ← Return to Landing Overview
              </button>
            )}
            <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
              URL DEEP-LINK SYNC: ACTIVE
            </span>
          </div>
        </div>

        {/* SINGLE FRAME LANDING PAGE (HERO + ROLES CLICK-TO-AUTOFILL + SCHEME MATRIX) */}
        {showLandingFrame && (
          <div className="flex flex-col gap-4">
            {/* National Mission Banner */}
            <div className="border border-gray-200 bg-white p-4 md:p-6 relative overflow-hidden shadow-sm">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-green-700 font-bold border border-green-300 bg-green-50 px-2 py-0.5">
                    SIH-26239 NATIONAL ARCHITECTURE
                  </span>
                  <span className="text-gray-300 font-mono">•</span>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500">
                    DIRECT BENEFIT TRANSFER (DBT) READY
                  </span>
                </div>

                <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes
                </h2>

                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  Eliminating manual paper scrutiny across the National Fellowship for ST (NFST),
                  National Overseas Scholarship (NOS), and Premier Institute Schemes. Featuring
                  multimodal AI document intelligence, tamper detection, Constitution Article 342
                  sub-caste validation, and national deduplication.
                </p>
              </div>

              {/* Live DBT Metric Ticker Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-200 text-xs font-mono">
                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[10px] uppercase text-gray-500 block">TOTAL APPLICANTS</span>
                  <span className="text-base md:text-lg font-bold text-gray-900">
                    {KPI_DATA.totalApplicants.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[10px] uppercase text-gray-500 block">DBT DISBURSED</span>
                  <span className="text-base md:text-lg font-bold text-green-600">
                    {formatCurrency(KPI_DATA.totalFundsSanctioned)}
                  </span>
                </div>
                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[10px] uppercase text-gray-500 block">FEMALE SCHOLAR RATIO</span>
                  <span className="text-base md:text-lg font-bold text-blue-600">
                    {(KPI_DATA.femaleRatio * 100).toFixed(1)}% (Quota Exceeded)
                  </span>
                </div>
                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[10px] uppercase text-gray-500 block">PVTG PRIORITY BENEFICIARIES</span>
                  <span className="text-base md:text-lg font-bold text-amber-600">
                    1,287 Direct Shortlists
                  </span>
                </div>
              </div>
            </div>

            {/* 4-TIER RBAC: CLICK TO AUTOFILL CREDENTIALS */}
            <div className="border border-gray-200 bg-white p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-bold">
                    4-TIER RBAC ARCHITECTURE
                  </span>
                  <h3 className="text-base font-bold text-gray-900">
                    Select Persona to Click-to-Autofill Credentials &amp; Launch Console
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-gray-400">
                  SIMULATED NIC SSO / AADHAAR OTP / PKI TOKEN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Level 1: ST Scholar */}
                <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:border-gray-300 hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-green-600 font-bold">
                        LEVEL 1 PERSONA
                      </span>
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">ST Scholar / Applicant</h4>
                    <p className="text-[11px] text-gray-500 mt-1 mb-2 leading-relaxed">
                      Dynamic eligibility checker, document vault, 7-day deficiency resolver, and
                      quarterly fellowship tracker.
                    </p>

                    <div className="p-2 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-500 mb-3 space-y-0.5">
                      <div>Name: Priya Meena</div>
                      <div>APAAR: APAAR-2024-001234</div>
                      <div>Auth: Aadhaar OTP / DigiLocker</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleAutofill('APPLICANT', 'overview')}
                    className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-green-700 hover:bg-green-600 text-white border border-green-700 flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Click to Autofill &amp; Login →
                  </button>
                </div>

                {/* Level 2: Institute Nodal Officer */}
                <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:border-gray-300 hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-blue-600 font-bold">
                        LEVEL 2 PERSONA
                      </span>
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">Institute Nodal (INO)</h4>
                    <p className="text-[11px] text-gray-500 mt-1 mb-2 leading-relaxed">
                      One-click bonafide admission attestation, supervisor milestone sign-offs, and NOS
                      foreign tuition forex conversion.
                    </p>

                    <div className="p-2 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-500 mb-3 space-y-0.5">
                      <div>Name: Dr. Kavita Soren</div>
                      <div>Institute: BIT Mesra (.ac.in)</div>
                      <div>Auth: Verified Domain + 2FA</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleAutofill('INSTITUTE_NODAL', 'inbox')}
                    className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-blue-700 hover:bg-blue-600 text-white border border-blue-700 flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Click to Autofill &amp; Login →
                  </button>
                </div>

                {/* Level 3: MoTA Scrutiny Officer */}
                <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:border-gray-300 hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-amber-600 font-bold">
                        LEVEL 3 PERSONA
                      </span>
                      <FileCheck2 className="h-4 w-4 text-amber-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">MoTA Scrutiny Officer</h4>
                    <p className="text-[11px] text-gray-500 mt-1 mb-2 leading-relaxed">
                      Split-screen AI document scrutiny workbench, confidence badges, sub-caste order
                      matcher, and deduplication alerts.
                    </p>

                    <div className="p-2 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-500 mb-3 space-y-0.5">
                      <div>Name: Rajesh Kumar, IAS</div>
                      <div>Desk: NIC-MOTA-DESK-42</div>
                      <div>Auth: NIC SSO (@nic.in)</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleAutofill('SCRUTINY_OFFICER', 'workbench')}
                    className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white border border-amber-600 flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Click to Autofill &amp; Login →
                  </button>
                </div>

                {/* Level 4: Joint Secretary / Admin */}
                <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:border-gray-300 hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-red-600 font-bold">
                        LEVEL 4 PERSONA
                      </span>
                      <Crown className="h-4 w-4 text-red-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">Joint Secretary (Admin)</h4>
                    <p className="text-[11px] text-gray-500 mt-1 mb-2 leading-relaxed">
                      Configurable scheme rules engine, automated merit calculation with quotas, and PFMS
                      batch sanction orders.
                    </p>

                    <div className="p-2 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-500 mb-3 space-y-0.5">
                      <div>Authority: Ministry Admin</div>
                      <div>Scope: Apex Policy &amp; DBT</div>
                      <div>Auth: PKI Token / DSC Certificate</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleAutofill('MINISTRY_ADMIN', 'kpi')}
                    className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white border border-red-600 flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Click to Autofill &amp; Login →
                  </button>
                </div>
              </div>
            </div>

            {/* STATUTORY SCHEME REPOSITORY MATRIX */}
            <div className="border border-gray-200 bg-white p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  MoTA Statutory Fellowship &amp; Scholarship Schemes Under Management
                </span>
                <span className="text-[10px] font-mono text-gray-400">5 ACTIVE NATIONAL PROGRAMS</span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs text-gray-700 border border-gray-200">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-mono border-b border-gray-200">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Scheme Name &amp; Purpose</th>
                      <th className="p-2.5">Income Ceiling</th>
                      <th className="p-2.5">Academic Cut-off</th>
                      <th className="p-2.5">Monthly Financial Support</th>
                      <th className="p-2.5">Statutory Quotas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-normal">
                    {SCHEMES.map((scheme) => (
                      <tr key={scheme.code} className="hover:bg-gray-50">
                        <td className="p-2.5">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${getSchemeColor(scheme.code)}`}>
                            {scheme.code}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <div className="font-semibold text-gray-900">{scheme.name}</div>
                          <div className="text-[11px] text-gray-500">{scheme.description}</div>
                        </td>
                        <td className="p-2.5 font-mono text-green-600">
                          {formatCurrency(scheme.maxIncome)} / yr
                        </td>
                        <td className="p-2.5 font-mono text-gray-700">
                          {scheme.minMarksPercent}% Marks
                        </td>
                        <td className="p-2.5 font-mono font-bold text-gray-900">
                          {formatCurrency(scheme.stipendMonthly)} / mo
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-gray-500">
                          30% Female / 5% PwD / PVTG
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE ROLE SPECIFIC DASHBOARDS (WHEN LAUNCHED FROM HEADER OR LANDING) */}
        {!showLandingFrame && currentRole === 'APPLICANT' && (
          <ApplicantView currentTab={activeTab} onTabChange={handleTabChange} />
        )}

        {!showLandingFrame && currentRole === 'INSTITUTE_NODAL' && (
          <InoView currentTab={activeTab} onTabChange={handleTabChange} />
        )}

        {!showLandingFrame && currentRole === 'SCRUTINY_OFFICER' && (
          <ScrutinyOfficerWorkbench
            currentTab={activeTab}
            onTabChange={handleTabChange}
            appId={selectedAppId}
            onSelectAppId={(id) => {
              setSelectedAppId(id);
              updateUrlParams(currentRole, activeTab, id, legalView);
            }}
          />
        )}

        {!showLandingFrame && currentRole === 'MINISTRY_ADMIN' && (
          <AdminView currentTab={activeTab} onTabChange={handleTabChange} />
        )}
      </main>

      {/* Official Government Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Terms & Privacy Modal View */}
      <TermsPrivacyModal view={legalView} onClose={handleCloseLegal} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-mono text-xs">
          INITIALIZING MoTA TRIBAL-SCHOLAR ARCHITECTURE...
        </div>
      }
    >
      <TribalScholarApp />
    </Suspense>
  );
}
