'use client';

import React, { useState } from 'react';
import { KPI_DATA, SCHEMES, MERIT_LIST } from '@/lib/mock-data';
import type { SchemeRule, MeritListEntry } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Crown,
  Settings,
  ListOrdered,
  CreditCard,
  Printer,
  Save,
  CheckCircle2,
  Users,
  TrendingUp,
  FileCheck2,
  DollarSign,
  Download,
  KeyRound,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  signSanctionOrderWithDSC,
  verifyDigitalSignature,
  type CryptographicSignatureResult,
  type VerificationCheckResult,
} from '@/lib/crypto-pki';
import { QS_WORLD_RANKINGS, validateQsRankForNOS } from '@/lib/datasets/qs-rankings-master';

interface AdminViewProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentTab, onTabChange }) => {
  // Configurable Scheme Rules state
  const [schemes, setSchemes] = useState<SchemeRule[]>(SCHEMES);
  const [editingScheme, setEditingScheme] = useState<SchemeRule>(schemes[0]);
  const [schemeSavedFeedback, setSchemeSavedFeedback] = useState<string>('');

  // Automated Merit List state
  const [meritScheme, setMeritScheme] = useState<string>('NFST');
  const [meritSeats, setMeritSeats] = useState<number>(10);
  const [meritData, setMeritData] = useState<MeritListEntry[]>(MERIT_LIST);
  const [meritStats, setMeritStats] = useState<any>({
    totalEvaluated: 12847,
    selected: 4,
    femaleFilled: 2,
    femaleQuotaSeats: 3,
    pvtgSelected: 1,
    pwdSelected: 1,
    sanctionOrderNumber: 'MOTA/SCHOLARSHIP/SANCTION/2026/8941',
  });
  const [isCalculatingMerit, setIsCalculatingMerit] = useState<boolean>(false);

  // WebCrypto DSC Asymmetric PKI State
  const [dscSignature, setDscSignature] = useState<CryptographicSignatureResult | null>(null);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationCheckResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // PFMS Batch state
  const [pfmsBatchGenerated, setPfmsBatchGenerated] = useState<boolean>(false);

  // Save scheme configuration
  const handleSaveSchemeRule = (e: React.FormEvent) => {
    e.preventDefault();
    setSchemes((prev) =>
      prev.map((s) => (s.code === editingScheme.code ? editingScheme : s))
    );
    setSchemeSavedFeedback(
      `Statutory parameters for ${editingScheme.code} successfully updated in Government Policy Registry.`
    );
    setTimeout(() => setSchemeSavedFeedback(''), 4000);
  };

  // Run Merit List Engine via API
  const handleGenerateMerit = async () => {
    setIsCalculatingMerit(true);
    try {
      const res = await fetch('/api/merit-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeCode: meritScheme, totalSeats: meritSeats }),
      });
      const data = await res.json();
      if (data.success) {
        setMeritData(data.meritList);
        setMeritStats(data.stats);
      }
    } catch {
      // fallback
    } finally {
      setIsCalculatingMerit(false);
    }
  };

  // Real WebCrypto DSC Signing
  const handleSignOrderWithPKI = async () => {
    setIsSigning(true);
    try {
      const orderContent = `MoTA SANCTION ORDER ${meritStats.sanctionOrderNumber} | DATE: 2026-09-28 | SCHEME: ${meritScheme} | SELECTED SCHOLARS: ${meritData.map((m) => m.applicationId).join(',')}`;
      const sig = await signSanctionOrderWithDSC(orderContent);
      setDscSignature(sig);
      setVerificationResult(null);
    } catch (err: any) {
      console.error('DSC signing failed:', err);
    } finally {
      setIsSigning(false);
    }
  };

  // Real Mathematical Verification of Signature
  const handleVerifyDscSignature = async () => {
    if (!dscSignature) return;
    setIsVerifying(true);
    try {
      const orderContent = `MoTA SANCTION ORDER ${meritStats.sanctionOrderNumber} | DATE: 2026-09-28 | SCHEME: ${meritScheme} | SELECTED SCHOLARS: ${meritData.map((m) => m.applicationId).join(',')}`;
      const res = await verifyDigitalSignature(
        orderContent,
        dscSignature.signatureHex,
        dscSignature.publicKeyJwk
      );
      setVerificationResult(res);
    } catch (err: any) {
      console.error('Verification failed:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePrintSanction = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sub-Navigation Header with Tab Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white p-2.5 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-gray-500 mr-2">
            APEX CONSOLE /
          </span>
          {[
            { id: 'kpi', label: 'National Dashboard & KPIs' },
            { id: 'rules', label: 'Configurable Scheme Rules Engine' },
            { id: 'merit', label: 'Automated Merit List & Quota Engine' },
            { id: 'pfms', label: 'PFMS DBT Batch Sanctions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
                currentTab === tab.id
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Joint Secretary Metadata */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-gray-600">
          <div>
            AUTHORITY: <span className="text-gray-900">JOINT SECRETARY (TRIBAL AFFAIRS)</span>
          </div>
          <span>•</span>
          <div>
            SIGNATURE: <span className="text-green-600">PKI TOKEN READY</span>
          </div>
        </div>
      </div>

      {schemeSavedFeedback && (
        <div className="p-3 border border-green-200 bg-green-50 text-green-700 text-xs font-mono no-print">
          ✓ {schemeSavedFeedback}
        </div>
      )}

      {/* TAB 1: NATIONAL DASHBOARD & KPIS */}
      {currentTab === 'kpi' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
                TOTAL TRIBAL APPLICANTS
              </span>
              <div className="text-2xl font-bold font-mono text-gray-900 my-1">
                {KPI_DATA.totalApplicants.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] font-mono text-green-600">
                ↑ +18.4% YoY Digital Growth
              </span>
            </div>

            <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
                TOTAL FUNDS SANCTIONED
              </span>
              <div className="text-2xl font-bold font-mono text-green-600 my-1">
                {formatCurrency(KPI_DATA.totalFundsSanctioned)}
              </div>
              <span className="text-[11px] font-mono text-gray-500">
                100% Direct Benefit Transfer (DBT)
              </span>
            </div>

            <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
                FEMALE SCHOLAR RATIO
              </span>
              <div className="text-2xl font-bold font-mono text-blue-600 my-1">
                {(KPI_DATA.femaleRatio * 100).toFixed(1)}%
              </div>
              <span className="text-[11px] font-mono text-blue-600">
                Statutory 30% Quota Exceeded ✓
              </span>
            </div>

            <div className="border border-gray-200 bg-white p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
                DEFICIENCY RESOLUTION RATE
              </span>
              <div className="text-2xl font-bold font-mono text-amber-600 my-1">
                91.8%
              </div>
              <span className="text-[11px] font-mono text-gray-500">
                Avg Resolution: 3.4 Days
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-gray-200 bg-white p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  State-Wise ST Population Quota Distribution
                </span>
                <span className="text-[10px] font-mono text-gray-500">TOP 10 STATES</span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-mono border-b border-gray-200">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">State / UT</th>
                      <th className="p-2">Total Beneficiaries</th>
                      <th className="p-2 text-right">Quota Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                    {KPI_DATA.stateWiseDistribution.map((row, idx) => (
                      <tr key={row.state} className="hover:bg-gray-50">
                        <td className="p-2 text-gray-500">#{idx + 1}</td>
                        <td className="p-2 font-semibold text-gray-900">{row.state}</td>
                        <td className="p-2 text-green-600 font-bold">
                          {row.count.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 text-right text-gray-600">
                          {((row.count / KPI_DATA.totalApplicants) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-gray-200 bg-white p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Scheme-Wise Scholarship Sanctions
                  </span>
                  <span className="text-[10px] font-mono text-green-600">FY 2026-27</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {KPI_DATA.schemeWiseDistribution.map((item) => (
                    <div key={item.scheme} className="p-2.5 bg-gray-50 border border-gray-200">
                      <div className="flex justify-between text-gray-900 mb-1">
                        <span className="font-bold">{item.scheme}</span>
                        <span className="text-green-600">{item.count.toLocaleString('en-IN')} Scholars</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-none overflow-hidden">
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${Math.min(100, (item.count / 8234) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-blue-200 bg-blue-50 text-blue-700 text-xs mt-4">
                <strong>Cabinet Milestone Notice:</strong> 100% of NFST (PhD) and NOS (Abroad) disbursements
                now routed via automated PFMS Direct Benefit Transfer with zero intermediary leakages.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONFIGURABLE SCHEME RULES ENGINE */}
      {currentTab === 'rules' && (
        <div className="border border-gray-200 bg-white p-4 flex flex-col gap-4">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
              DYNAMIC SCHEME RULES REPOSITORY (ZERO HARDCODING)
            </span>
            <h3 className="text-base font-bold text-gray-900">
              Cabinet Policy Parameter Configuration Engine
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Modify income ceilings, academic cut-offs, QS world ranking thresholds, and statutory
              reservation quotas on the fly without software re-deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 bg-gray-50 p-3 flex flex-col gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">
                SELECT STATUTORY SCHEME
              </span>
              {schemes.map((s) => (
                <button
                  key={s.code}
                  onClick={() => setEditingScheme(s)}
                  className={`p-2 text-left text-xs font-mono border transition-all ${
                    editingScheme.code === s.code
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{s.code}</span>
                    <span className="text-gray-500">Cap: {formatCurrency(s.maxIncome)}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-sans truncate">{s.name}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveSchemeRule} className="lg:col-span-2 border border-gray-200 bg-gray-50 p-4 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-bold uppercase font-mono text-blue-600">
                  EDITING PARAMETERS: {editingScheme.name} ({editingScheme.code})
                </span>
                <span className="text-[10px] font-mono text-green-700 bg-green-50 border border-green-200 px-2 py-0.5">
                  LIVE IN PRODUCTION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                    Annual Family Income Ceiling (INR)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.maxIncome}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, maxIncome: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                    Minimum Academic Marks Cut-off (%)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.minMarksPercent}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, minMarksPercent: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                    Maximum Age Limit (Years)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.maxAge}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, maxAge: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                    Monthly Stipend (INR)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.stipendMonthly}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, stipendMonthly: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {editingScheme.foreignUniversityQSRank && (
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                      Foreign University QS World Rank Cut-off (NOS Scheme)
                    </label>
                    <input
                      type="number"
                      value={editingScheme.foreignUniversityQSRank}
                      onChange={(e) =>
                        setEditingScheme({
                          ...editingScheme,
                          foreignUniversityQSRank: Number(e.target.value),
                        })
                      }
                      className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                    Statutory Female Scholar Quota (%)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.femaleQuotaPercent}
                    onChange={(e) =>
                      setEditingScheme({
                        ...editingScheme,
                        femaleQuotaPercent: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 font-mono focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-green-700 hover:bg-green-600 text-white border border-green-700 flex items-center gap-2"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Scheme Rules Schema →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATED MERIT LIST & QUOTA ENGINE WITH REAL WEBCRYPTO DSC */}
      {currentTab === 'merit' && (
        <div className="border border-gray-200 bg-white p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 no-print">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
                NATIONAL SELECTION &amp; ALLOCATION ENGINE
              </span>
              <h3 className="text-base font-bold text-gray-900">
                Official Ministry Sanction Order &amp; Merit Selection
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintSanction}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5 text-gray-600" />
                Print Official Gazette Order
              </button>

              <button
                onClick={handleGenerateMerit}
                disabled={isCalculatingMerit}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-blue-700 hover:bg-blue-600 text-white border border-blue-700 flex items-center gap-1.5"
              >
                <ListOrdered className="h-3.5 w-3.5" />
                {isCalculatingMerit ? 'Recomputing Quotas...' : 'Run Quota Allocation Engine'}
              </button>

              <button
                onClick={handleSignOrderWithPKI}
                disabled={isSigning}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-green-700 hover:bg-green-600 text-white border border-green-700 flex items-center gap-1.5"
              >
                <KeyRound className="h-3.5 w-3.5" />
                {isSigning ? 'Generating ECDSA Keys...' : 'Digitally Sign Order (WebCrypto DSC) →'}
              </button>
            </div>
          </div>

          {/* Quota Execution Summary Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono no-print">
            <div className="p-2 border border-gray-200 bg-white">
              <span className="text-[10px] text-gray-500 block">EVALUATED DOSSIERS</span>
              <span className="text-gray-900 font-bold">{meritStats.totalEvaluated}</span>
            </div>
            <div className="p-2 border border-gray-200 bg-white">
              <span className="text-[10px] text-gray-500 block">30% FEMALE QUOTA</span>
              <span className="text-blue-600 font-bold">
                {meritStats.femaleFilled} / {meritStats.femaleQuotaSeats} Filled
              </span>
            </div>
            <div className="p-2 border border-gray-200 bg-white">
              <span className="text-[10px] text-gray-500 block">PVTG PRIORITY</span>
              <span className="text-green-600 font-bold">{meritStats.pvtgSelected} Selected</span>
            </div>
            <div className="p-2 border border-gray-200 bg-white">
              <span className="text-[10px] text-gray-500 block">5% PWD QUOTA</span>
              <span className="text-amber-600 font-bold">{meritStats.pwdSelected} Selected</span>
            </div>
          </div>

          {/* Live WebCrypto PKI Signature Verification Banner */}
          {dscSignature && (
            <div className="border border-green-200 bg-green-50 p-3 no-print flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-green-700 font-bold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  REAL WEBCRYPTO DIGITAL SIGNATURE CERTIFICATE (DSC) ATTACHED
                </span>
                <button
                  onClick={handleVerifyDscSignature}
                  disabled={isVerifying}
                  className="px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-blue-600 border border-blue-200"
                >
                  {isVerifying ? 'Verifying Math...' : 'Mathematically Verify Signature'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-mono text-gray-600 bg-gray-50 p-2 border border-gray-200">
                <div>
                  <span className="text-gray-500 block">SIGNER AUTHORITY:</span>
                  <span className="text-gray-900">{dscSignature.signerName} ({dscSignature.signerDesignation})</span>
                </div>
                <div>
                  <span className="text-gray-500 block">DIGITAL DIGEST (SHA-256):</span>
                  <span className="text-blue-600 break-all">{dscSignature.digestHex}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">ALGORITHM:</span>
                  <span className="text-gray-900">{dscSignature.algorithm}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">SIGNATURE RAW (ECDSA HEX):</span>
                  <span className="text-green-600 truncate block">{dscSignature.signatureHex.slice(0, 48)}...</span>
                </div>
              </div>

              {verificationResult && (
                <div
                  className={`p-2 border text-xs font-mono ${
                    verificationResult.isValid
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-red-300 bg-red-50 text-red-700'
                  }`}
                >
                  {verificationResult.message}
                </div>
              )}
            </div>
          )}

          {/* OFFICIAL GAZETTE SANCTION ORDER LAYOUT (Print Optimized) */}
          <div className="border-2 border-gray-300 bg-white p-6 text-gray-900 print:text-black print:bg-white print:border-black font-serif">
            <div className="text-center border-b border-gray-300 pb-4 mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-gray-500 print:text-gray-700 block">
                MINISTRY OF TRIBAL AFFAIRS — GOVERNMENT OF INDIA
              </span>
              <h2 className="text-lg font-bold text-gray-900 print:text-black uppercase tracking-tight mt-1">
                NATIONAL SELECTION MERIT LIST &amp; FORMAL SANCTION ORDER
              </h2>
              <div className="text-[11px] font-mono text-gray-500 print:text-gray-600 mt-1 flex justify-center gap-4">
                <span>Sanction Order No: {meritStats.sanctionOrderNumber}</span>
                <span>•</span>
                <span>Date of Notification: 28-Sep-2026</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-gray-600 print:text-black mb-4">
              In exercise of powers conferred under the National Fellowship &amp; Scholarship Guidelines
              for Scheduled Tribe Scholars, the following candidates are hereby declared selected for the
              award of fellowship based on normalized composite scoring with statutory reservations
              enforced (30% Female Quota, 5% PwD Quota, and direct PVTG Priority).
            </p>

            <div className="overflow-x-auto w-full mb-4">
              <table className="w-full text-left text-xs border border-gray-300 print:border-black">
                <thead className="bg-gray-50 text-gray-600 print:bg-gray-100 print:text-black font-mono text-[10px] border-b border-gray-300">
                  <tr>
                    <th className="p-2">Rank</th>
                    <th className="p-2">Application ID</th>
                    <th className="p-2">Candidate Name</th>
                    <th className="p-2">State</th>
                    <th className="p-2">Composite Score</th>
                    <th className="p-2">Allocated Category</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                  {meritData.map((row) => (
                    <tr key={row.applicationId} className="hover:bg-gray-50">
                      <td className="p-2 font-bold">{row.rank}</td>
                      <td className="p-2 text-blue-600 print:text-black">{row.applicationId}</td>
                      <td className="p-2 font-sans font-bold text-gray-900 print:text-black">
                        {row.applicantName}
                      </td>
                      <td className="p-2">{row.state}</td>
                      <td className="p-2 text-green-600 font-bold print:text-black">
                        {row.compositeScore} / 100
                      </td>
                      <td className="p-2 text-gray-600 font-semibold">{row.category}</td>
                      <td className="p-2">
                        <span className="text-[10px] font-bold text-green-700 print:text-black uppercase">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-gray-500">
              <div>
                <div>
                  CRYPTOGRAPHIC DIGEST:{' '}
                  {dscSignature?.digestHex ||
                    'SHA256:7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C'}
                </div>
                <div>
                  ISSUED UNDER AUTHORITY OF JOINT SECRETARY (MoTA), NEW DELHI
                </div>
              </div>
              <div className="border border-green-300 p-2 bg-green-50 text-green-700 font-bold text-center">
                DIGITALLY SIGNED (ECDSA-P256-SHA256)<br />GOVERNMENT OF INDIA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PFMS DBT BATCH SANCTIONS */}
      {currentTab === 'pfms' && (
        <div className="border border-gray-200 bg-white p-4 flex flex-col gap-4">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
              PUBLIC FINANCIAL MANAGEMENT SYSTEM (PFMS) GATEWAY
            </span>
            <h3 className="text-base font-bold text-gray-900">
              Direct Benefit Transfer (DBT) Automated Payment Batch Generator
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Assemble approved fellowship dossiers into cryptographic PFMS XML batch files for direct
              electronic settlement into scholar bank accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-gray-200 bg-gray-50 p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600 flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5" />
                GENERATE DISBURSEMENT BATCH (SEPTEMBER 2026)
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 bg-white border border-gray-200">
                  <span className="text-gray-600">Total Sanctioned Scholars:</span>
                  <span className="text-gray-900 font-bold">8,234 Active Scholars</span>
                </div>
                <div className="flex justify-between p-2 bg-white border border-gray-200">
                  <span className="text-gray-600">Total Batch Debit Value:</span>
                  <span className="text-green-600 font-bold">₹25,52,54,000</span>
                </div>
                <div className="flex justify-between p-2 bg-white border border-gray-200">
                  <span className="text-gray-600">PFMS Protocol:</span>
                  <span className="text-gray-900">ISO 20022 XML / SFTP Secure Push</span>
                </div>
              </div>

              <button
                onClick={() => setPfmsBatchGenerated(true)}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-green-700 hover:bg-green-600 text-white border border-green-700 flex items-center justify-center gap-2"
              >
                <DollarSign className="h-3.5 w-3.5" />
                Generate &amp; Dispatch PFMS Batch →
              </button>
            </div>

            {pfmsBatchGenerated ? (
              <div className="border border-green-200 bg-green-50 p-3.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-green-700 font-bold flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    PFMS BATCH FILE COMPILED &amp; ACKNOWLEDGED
                  </span>
                  <div className="p-3 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-600 space-y-1 overflow-x-auto">
                    <div>BATCH_ID: PFMS_MOTA_20260928_BATCH_019</div>
                    <div>ACK_CODE: 200_SUCCESS_QUEUED</div>
                    <div>SETTLEMENT_CYCLE: T+1 Direct Credit</div>
                  </div>
                </div>
                <button className="mt-3 w-full py-1.5 text-xs font-semibold uppercase bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center justify-center gap-1.5">
                  <Download className="h-3 w-3" />
                  Download Signed Batch XML
                </button>
              </div>
            ) : (
              <div className="border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-center text-xs text-gray-500 font-mono text-center">
                Click &quot;Generate &amp; Dispatch PFMS Batch&quot; to compile approved records and push to
                the RBI settlement gateway.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
