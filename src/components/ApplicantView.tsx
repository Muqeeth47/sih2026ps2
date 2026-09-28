'use client';

import React, { useState, useEffect } from 'react';
import {
  SCHEMES,
  MOCK_APPLICATIONS,
  DEFICIENCY_REMARK_TEMPLATES,
} from '@/lib/mock-data';
import type { Application, DocumentType, SchemeCode } from '@/lib/types';
import {
  formatCurrency,
  formatDate,
  getDocumentLabel,
  getStatusColor,
  getStatusLabel,
  getSchemeColor,
} from '@/lib/utils';
import {
  Sparkles,
  Upload,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
  DollarSign,
  Send,
  Building,
  GraduationCap,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface ApplicantViewProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const ApplicantView: React.FC<ApplicantViewProps> = ({ currentTab, onTabChange }) => {
  // Local application state
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const activeApp = applications[0]; // Priya Meena
  const deficientApp = applications[1]; // Arjun Munda

  // Smart Match Wizard state
  const [matchAge, setMatchAge] = useState<number>(26);
  const [matchIncome, setMatchIncome] = useState<number>(480000);
  const [matchMarks, setMatchMarks] = useState<number>(72);
  const [matchDegree, setMatchDegree] = useState<'PG' | 'UG' | 'HSC' | 'FOREIGN'>('PG');

  // Deficiency resolver timer state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number }>({
    days: 6,
    hours: 21,
    mins: 45,
    secs: 30,
  });

  // Re-upload simulation state
  const [reuploadFile, setReuploadFile] = useState<string>('');
  const [isSubmittingFix, setIsSubmittingFix] = useState<boolean>(false);
  const [resolvedNotice, setResolvedNotice] = useState<boolean>(false);

  // Quarterly progress report state
  const [quarterSummary, setQuarterSummary] = useState<string>('');
  const [contingencyClaim, setContingencyClaim] = useState<number>(18500);
  const [submittedReportNotice, setSubmittedReportNotice] = useState<boolean>(false);

  // 7-day countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFixDeficiency = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFix(true);
    setTimeout(() => {
      setIsSubmittingFix(false);
      setResolvedNotice(true);
      // update state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === deficientApp.id
            ? {
                ...app,
                status: 'AI_SCRUTINY',
                deficiencies: app.deficiencies.map((d) => ({
                  ...d,
                  status: 'RESOLVED',
                  resolvedAt: new Date().toISOString(),
                })),
              }
            : app
        )
      );
    }, 1200);
  };

  const handleSubmitQuarterlyReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReportNotice(true);
    setTimeout(() => setSubmittedReportNotice(false), 5000);
    setQuarterSummary('');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sub-Navigation Header with Tab Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1120] p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mr-2">
            SCHOLAR CONSOLE /
          </span>
          {[
            { id: 'overview', label: 'Dashboard & Timeline' },
            { id: 'eligibility', label: 'Smart Match Wizard' },
            { id: 'vault', label: 'Document Vault' },
            { id: 'deficiency', label: 'Deficiency Resolver (7-Day)', alert: deficientApp.deficiencies.length > 0 },
            { id: 'fellowship', label: 'Post-Selection Portal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                currentTab === tab.id
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.alert && (
                <span className="h-2 w-2 bg-rose-500 rounded-none inline-block animate-none" />
              )}
            </button>
          ))}
        </div>

        {/* Scholar Identification Metadata */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <div>
            APAAR: <span className="text-slate-200">APAAR-2024-001234</span>
          </div>
          <span>•</span>
          <div>
            CASTE: <span className="text-slate-200">MEENA (RAJASTHAN)</span>
          </div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & TIMELINE */}
      {currentTab === 'overview' && (
        <div className="flex flex-col gap-4">
          {/* Active Application Summary Row */}
          <div className="border border-slate-800 bg-[#0b1120] p-3 md:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                  ACTIVE SCHOLARSHIP FILING
                </span>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>{activeApp.schemeName}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border ${getSchemeColor(activeApp.schemeCode)}`}>
                    {activeApp.schemeCode}
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-slate-400">STATUS:</span>
                <span className={`text-xs font-bold font-mono px-2.5 py-1 border ${getStatusColor(activeApp.status)}`}>
                  {getStatusLabel(activeApp.status)}
                </span>
              </div>
            </div>

            {/* 5-Step Gov Scholarship Lifecycle Timeline */}
            <div className="w-full py-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2">
                STATUTORY PROGRESSION STAGES (MoTA STANDARD TIMELINE)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5">
                {[
                  { step: '1. SUBMITTED', sub: 'Applicant Filed', status: 'DONE' },
                  { step: '2. INO ATTESTED', sub: 'College Verified', status: 'DONE' },
                  { step: '3. AI SCRUTINY', sub: 'Tamper & Rule Check', status: 'ACTIVE' },
                  { step: '4. SANCTION ORDER', sub: 'Ministry Merit List', status: 'PENDING' },
                  { step: '5. PFMS DBT', sub: 'Bank Disbursal', status: 'PENDING' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-2 border text-left flex flex-col justify-between ${
                      s.status === 'DONE'
                        ? 'border-emerald-800/80 bg-emerald-950/20 text-emerald-300'
                        : s.status === 'ACTIVE'
                        ? 'border-amber-700 bg-amber-950/30 text-amber-300'
                        : 'border-slate-800 bg-slate-900/50 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold font-mono">{s.step}</span>
                      {s.status === 'DONE' && <CheckCircle className="h-3 w-3 text-emerald-400" />}
                      {s.status === 'ACTIVE' && <Clock className="h-3 w-3 text-amber-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicant Profile Metrics Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="p-2 bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">APPLICATION ID</span>
                <span className="font-mono font-bold text-slate-200">{activeApp.id}</span>
              </div>
              <div className="p-2 bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">ANNUAL FAMILY INCOME</span>
                <span className="font-mono font-bold text-emerald-400">{formatCurrency(activeApp.annualIncome)}</span>
              </div>
              <div className="p-2 bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">POST-GRADUATION MARKS</span>
                <span className="font-mono font-bold text-slate-200">{activeApp.pgMarksPercent}%</span>
              </div>
              <div className="p-2 bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">COMPOSITE SCORE</span>
                <span className="font-mono font-bold text-cyan-400">{activeApp.compositeScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-slate-800 bg-[#0b1120] p-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400">
                  SCHEME MATCHING
                </span>
                <h4 className="text-sm font-bold text-slate-200 mb-1">Check Eligibility for Other 4 Schemes</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Simulate qualifications against NOS, Top Class, Post-Matric, and Pre-Matric rules.
                </p>
              </div>
              <button
                onClick={() => onTabChange('eligibility')}
                className="w-full py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-center"
              >
                Launch Smart Match Wizard →
              </button>
            </div>

            <div className="border border-slate-800 bg-[#0b1120] p-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-amber-400">
                  DIGITAL VAULT
                </span>
                <h4 className="text-sm font-bold text-slate-200 mb-1">3 Mandatory Certificates Verified</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Caste Certificate, Income Certificate, and PG Marksheet cryptographically logged.
                </p>
              </div>
              <button
                onClick={() => onTabChange('vault')}
                className="w-full py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-center"
              >
                Inspect Document Vault →
              </button>
            </div>

            <div className="border border-slate-800 bg-[#0b1120] p-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-rose-400">
                  DEFICIENCY ALERTS
                </span>
                <h4 className="text-sm font-bold text-slate-200 mb-1">Peer Case Notice (NOS Fellowship)</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Arjun Munda’s application has an expired income certificate flagged by AI scrutiny.
                </p>
              </div>
              <button
                onClick={() => onTabChange('deficiency')}
                className="w-full py-1.5 text-xs font-semibold uppercase tracking-wider bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800 text-center"
              >
                Open Deficiency Resolver (6d remaining) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART MATCH ELIGIBILITY WIZARD */}
      {currentTab === 'eligibility' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              DYNAMIC ELIGIBILITY ENGINE (MoTA SCHEME RULE MATCHER)
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Interactive Profile Qualification Checker
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Adjust demographic, income, and educational parameters to evaluate real-time eligibility
              across all 5 Scheduled Tribe statutory scholarship schemes.
            </p>
          </div>

          {/* Interactive Parameters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 p-3">
            <div>
              <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Candidate Age: <span className="text-slate-100 font-bold">{matchAge} Yrs</span>
              </label>
              <input
                type="range"
                min={14}
                max={45}
                value={matchAge}
                onChange={(e) => setMatchAge(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Family Annual Income: <span className="text-slate-100 font-bold">{formatCurrency(matchIncome)}</span>
              </label>
              <input
                type="range"
                min={100000}
                max={1200000}
                step={50000}
                value={matchIncome}
                onChange={(e) => setMatchIncome(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Academic Marks: <span className="text-slate-100 font-bold">{matchMarks}%</span>
              </label>
              <input
                type="range"
                min={35}
                max={99}
                value={matchMarks}
                onChange={(e) => setMatchMarks(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Qualification Level
              </label>
              <select
                value={matchDegree}
                onChange={(e) => setMatchDegree(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 px-2 py-1.5"
              >
                <option value="PG">Master&apos;s / Post-Graduation (PhD Aspirant)</option>
                <option value="FOREIGN">Foreign University Offer Letter (QS &le; 500)</option>
                <option value="UG">Undergraduate / Premier Institute (IIT/IIM/AIIMS)</option>
                <option value="HSC">Higher Secondary (Class 11-12)</option>
              </select>
            </div>
          </div>

          {/* Real-time Match Results Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCHEMES.map((scheme) => {
              const incomeEligible = matchIncome <= scheme.maxIncome;
              const marksEligible = matchMarks >= scheme.minMarksPercent;
              const ageEligible = matchAge <= scheme.maxAge;
              const isEligible = incomeEligible && marksEligible && ageEligible;

              return (
                <div
                  key={scheme.code}
                  className={`border p-3 flex flex-col justify-between ${
                    isEligible
                      ? 'border-emerald-800/80 bg-[#08121f]'
                      : 'border-slate-800/80 bg-slate-900/40 opacity-75'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-100">{scheme.name}</span>
                      <span
                        className={`text-[9px] uppercase font-mono px-1.5 py-0.5 border ${
                          isEligible
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border-rose-800'
                        }`}
                      >
                        {isEligible ? 'QUALIFIED' : 'NOT ELIGIBLE'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                      {scheme.description}
                    </p>

                    <div className="space-y-1 text-[10px] font-mono border-t border-slate-800 pt-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">INCOME CEILING:</span>
                        <span className={incomeEligible ? 'text-slate-300' : 'text-rose-400 font-bold'}>
                          Max {formatCurrency(scheme.maxIncome)} {incomeEligible ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">MINIMUM MARKS:</span>
                        <span className={marksEligible ? 'text-slate-300' : 'text-rose-400 font-bold'}>
                          Min {scheme.minMarksPercent}% {marksEligible ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">MAX AGE:</span>
                        <span className={ageEligible ? 'text-slate-300' : 'text-rose-400 font-bold'}>
                          Max {scheme.maxAge} Yrs {ageEligible ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>STIPEND:</span>
                        <span>{formatCurrency(scheme.stipendMonthly)} / month</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!isEligible}
                    className={`w-full py-1.5 text-xs font-semibold uppercase tracking-wider border ${
                      isEligible
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    {isEligible ? 'Start Application →' : 'Criteria Not Met'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DOCUMENT VAULT */}
      {currentTab === 'vault' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              ENCRYPTED DOCUMENT REPOSITORY (ADV CERTIFIED)
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Scholar Document Vault & Cryptographic Seals
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Documents stored in this vault undergo automated OCR extraction and cross-referencing
              against State Revenue registries and Central Presidential Scheduled Tribe orders.
            </p>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Document Name</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Issuing Authority</th>
                  <th className="p-2.5">Extraction Confidence</th>
                  <th className="p-2.5">Tamper Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-normal">
                {activeApp.documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-medium text-slate-100 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span>{doc.fileName}</span>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-400">
                      {getDocumentLabel(doc.type)}
                    </td>
                    <td className="p-2.5 text-slate-300">
                      {doc.aiExtraction?.issuingAuthority || 'Govt Authority'}
                    </td>
                    <td className="p-2.5">
                      <span className="text-emerald-400 font-mono font-bold">
                        {doc.aiExtraction?.confidenceScore ?? 92}% (HIGH)
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.5">
                        SHA256 VERIFIED
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button className="text-[11px] font-mono text-cyan-400 hover:underline">
                        View Metadata →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Secure Upload Sandbox */}
          <div className="border border-dashed border-slate-700 bg-slate-900/30 p-4 text-center">
            <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-200 block">
              Drag & Drop Additional Supporting Affidavits / Invoices
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Supports scanned PDF, JPG up to 10MB. Encrypted via AES-256 before storage.
            </span>
            <button className="mt-3 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600">
              Browse Local Disk
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: DEFICIENCY RESOLVER (7-DAY WINDOW) */}
      {currentTab === 'deficiency' && (
        <div className="border border-rose-900/60 bg-[#0f0e15] p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-900/50 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-mono font-bold flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                STATUTORY DEFICIENCY RESOLUTION WINDOW (RULE 14A)
              </span>
              <h3 className="text-base font-bold text-slate-100">
                Action Required: Correct Flagged Documents Within 7 Days
              </h3>
            </div>

            {/* Countdown Clock Display */}
            <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-800 px-3 py-1.5 text-rose-200 font-mono text-xs">
              <Clock className="h-4 w-4 text-rose-400" />
              <span>
                TIME REMAINING: {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.mins}m : {timeLeft.secs}s
              </span>
            </div>
          </div>

          {resolvedNotice && (
            <div className="p-3 border border-emerald-800 bg-emerald-950/40 text-emerald-300 text-xs">
              ✓ Document re-uploaded successfully. AI diff inspection triggered and routed to MoTA Desk
              Scrutiny Officer for immediate re-examination. Status updated to AI_SCRUTINY.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Officer Remark & AI Flag Details */}
            <div className="border border-slate-800 bg-slate-900/70 p-3 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                OFFICIAL DEFICIENCY CITATION
              </span>
              <div className="text-xs text-slate-200 font-semibold">
                Application: <span className="font-mono text-cyan-400">{deficientApp.id}</span> ({deficientApp.applicantName})
              </div>
              <div className="text-xs text-slate-200">
                Flagged Document:{' '}
                <span className="font-mono text-amber-300">Income Certificate (income_old.pdf)</span>
              </div>

              <div className="p-2.5 border border-rose-800/80 bg-rose-950/30 text-rose-200 text-xs leading-relaxed">
                <strong>Officer Remark:</strong>{' '}
                {deficientApp.deficiencies[0]?.reason ||
                  'Income certificate expired on 31-03-2024. Please upload fresh certificate for FY 2024-25 issued by competent authority.'}
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 font-mono pt-1">
                <div>• Extracted Validity: 31-03-2024 (EXPIRED)</div>
                <div>• Issuing Authority: SDO, Ranchi Sadar</div>
                <div>• Statutory Rule: NFST/NOS requires validity through active academic year</div>
              </div>
            </div>

            {/* Right: Direct Re-upload Form */}
            <form onSubmit={handleFixDeficiency} className="border border-slate-800 bg-slate-900/70 p-3 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                UPLOAD CORRECTED CERTIFICATE
              </span>
              <p className="text-xs text-slate-400">
                Upload your newly issued Revenue Authority certificate. The system will perform an
                instant AI diff check against the defective submission.
              </p>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Select Valid File (PDF / JPG)
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setReuploadFile(e.target.value)}
                  className="w-full text-xs text-slate-300 bg-slate-800 border border-slate-700 p-2 file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-slate-700 file:text-slate-200 file:text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Applicant Clarification / Legal Remark (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Attached fresh certificate issued on 15-April-2024 by Tehsildar..."
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingFix}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center justify-center gap-2"
              >
                {isSubmittingFix ? 'Running AI Diff Verification...' : 'Submit Corrected Document →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: POST-SELECTION FELLOWSHIP LIFECYCLE */}
      {currentTab === 'fellowship' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              POST-SANCTION FELLOWSHIP MANAGEMENT (NFST &amp; NOS LIFECYCLE)
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Quarterly Research Reports, Contingency Claims &amp; DBT Releases
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Multi-year PhD and Overseas scholars submit quarterly thesis milestones and laboratory
              contingency expense bills for Research Supervisor approval and PFMS DBT credit.
            </p>
          </div>

          {submittedReportNotice && (
            <div className="p-3 border border-emerald-800 bg-emerald-950/40 text-emerald-300 text-xs">
              ✓ Quarterly progress report submitted to Supervisor (Dr. Kavita Soren, INO) for digital
              sign-off. PFMS stipend release of ₹31,000/mo queued.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Form: Quarterly Progress Submission */}
            <form onSubmit={handleSubmitQuarterlyReport} className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">
                SUBMIT QUARTERLY RESEARCH PROGRESS (Q3 - 2024)
              </span>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Research Milestone / Thesis Chapter Summary
                </label>
                <textarea
                  required
                  rows={4}
                  value={quarterSummary}
                  onChange={(e) => setQuarterSummary(e.target.value)}
                  placeholder="Detail your thesis progress, laboratory investigations, published papers, or field work conducted during this quarter..."
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Contingency Grant Claim (Books, Journal Fees, Consumables)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs font-mono">₹</span>
                  <input
                    type="number"
                    value={contingencyClaim}
                    onChange={(e) => setContingencyClaim(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-1.5 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-500 flex items-center justify-center gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                Submit Report to Research Guide →
              </button>
            </form>

            {/* Historical Disbursals Table */}
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                PFMS DIRECT BENEFIT TRANSFER (DBT) LOG
              </span>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-2">Period</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Supervisor</th>
                      <th className="p-2">PFMS Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                    <tr>
                      <td className="p-2 text-slate-200">Q1 2024</td>
                      <td className="p-2 text-emerald-400 font-bold">₹93,000</td>
                      <td className="p-2 text-emerald-400">SIGNED ✓</td>
                      <td className="p-2 text-emerald-300">DISBURSED</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-slate-200">Q2 2024</td>
                      <td className="p-2 text-emerald-400 font-bold">₹93,000</td>
                      <td className="p-2 text-emerald-400">SIGNED ✓</td>
                      <td className="p-2 text-emerald-300">DISBURSED</td>
                    </tr>
                    <tr className="bg-amber-950/20">
                      <td className="p-2 text-slate-200">Q3 2024</td>
                      <td className="p-2 text-amber-300 font-bold">₹93,000</td>
                      <td className="p-2 text-amber-400">PENDING SIGN-OFF</td>
                      <td className="p-2 text-slate-400">QUEUED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
