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
} from 'lucide-react';

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
    eSignHash: 'SHA256:7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C',
  });
  const [isCalculatingMerit, setIsCalculatingMerit] = useState<boolean>(false);

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

  const handlePrintSanction = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sub-Navigation Header with Tab Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1120] p-2.5 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mr-2">
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
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Joint Secretary Metadata */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <div>
            AUTHORITY: <span className="text-slate-200">JOINT SECRETARY (TRIBAL AFFAIRS)</span>
          </div>
          <span>•</span>
          <div>
            SIGNATURE: <span className="text-emerald-400">PKI TOKEN VALID</span>
          </div>
        </div>
      </div>

      {schemeSavedFeedback && (
        <div className="p-3 border border-emerald-800 bg-emerald-950/40 text-emerald-300 text-xs font-mono no-print">
          ✓ {schemeSavedFeedback}
        </div>
      )}

      {/* TAB 1: NATIONAL DASHBOARD & KPIS */}
      {currentTab === 'kpi' && (
        <div className="flex flex-col gap-4">
          {/* 4 High-Density KPI Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border border-slate-800 bg-[#0b1120] p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                TOTAL TRIBAL APPLICANTS
              </span>
              <div className="text-2xl font-bold font-mono text-slate-100 my-1">
                {KPI_DATA.totalApplicants.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                ↑ +18.4% YoY Digital Growth
              </span>
            </div>

            <div className="border border-slate-800 bg-[#0b1120] p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                TOTAL FUNDS SANCTIONED
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 my-1">
                {formatCurrency(KPI_DATA.totalFundsSanctioned)}
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                100% Direct Benefit Transfer (DBT)
              </span>
            </div>

            <div className="border border-slate-800 bg-[#0b1120] p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                FEMALE SCHOLAR RATIO
              </span>
              <div className="text-2xl font-bold font-mono text-cyan-400 my-1">
                {(KPI_DATA.femaleRatio * 100).toFixed(1)}%
              </div>
              <span className="text-[11px] font-mono text-cyan-300">
                Statutory 30% Quota Exceeded ✓
              </span>
            </div>

            <div className="border border-slate-800 bg-[#0b1120] p-3.5 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                DEFICIENCY RESOLUTION RATE
              </span>
              <div className="text-2xl font-bold font-mono text-amber-400 my-1">
                91.8%
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Avg Resolution: 3.4 Days
              </span>
            </div>
          </div>

          {/* State-Wise & Scheme-Wise Allocation Matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* State-Wise Distribution Table */}
            <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  State-Wise ST Population Quota Distribution
                </span>
                <span className="text-[10px] font-mono text-slate-500">TOP 10 STATES</span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">State / UT</th>
                      <th className="p-2">Total Beneficiaries</th>
                      <th className="p-2 text-right">Quota Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                    {KPI_DATA.stateWiseDistribution.map((row, idx) => (
                      <tr key={row.state} className="hover:bg-slate-900/40">
                        <td className="p-2 text-slate-500">#{idx + 1}</td>
                        <td className="p-2 font-semibold text-slate-200">{row.state}</td>
                        <td className="p-2 text-emerald-400 font-bold">
                          {row.count.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 text-right text-slate-400">
                          {((row.count / KPI_DATA.totalApplicants) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scheme-Wise Distribution & Trends */}
            <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Scheme-Wise Scholarship Sanctions
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">FY 2026-27</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {KPI_DATA.schemeWiseDistribution.map((item) => (
                    <div key={item.scheme} className="p-2.5 bg-slate-900/70 border border-slate-800">
                      <div className="flex justify-between text-slate-200 mb-1">
                        <span className="font-bold">{item.scheme}</span>
                        <span className="text-emerald-400">{item.count.toLocaleString('en-IN')} Scholars</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-none overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full"
                          style={{
                            width: `${Math.min(100, (item.count / 8234) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-cyan-900/60 bg-cyan-950/20 text-cyan-300 text-xs mt-4">
                <strong>Cabinet Milestone Notice:</strong> 100% of NFST (PhD) and NOS (Abroad) disbursements
                now routed via automated PFMS Direct Benefit Transfer with zero intermediary leakages.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONFIGURABLE SCHEME RULES ENGINE (ZERO HARDCODING) */}
      {currentTab === 'rules' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              DYNAMIC SCHEME RULES REPOSITORY (ZERO HARDCODING)
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Cabinet Policy Parameter Configuration Engine
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Modify income ceilings, post-graduation academic cut-offs, QS world ranking thresholds,
              and statutory reservation quotas on the fly without software re-deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Scheme Selector List */}
            <div className="border border-slate-800 bg-slate-900/60 p-3 flex flex-col gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
                SELECT STATUTORY SCHEME
              </span>
              {schemes.map((s) => (
                <button
                  key={s.code}
                  onClick={() => setEditingScheme(s)}
                  className={`p-2 text-left text-xs font-mono border transition-all ${
                    editingScheme.code === s.code
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{s.code}</span>
                    <span className="text-slate-500">Cap: {formatCurrency(s.maxIncome)}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans truncate">{s.name}</div>
                </button>
              ))}
            </div>

            {/* Configurable Form Editor */}
            <form onSubmit={handleSaveSchemeRule} className="lg:col-span-2 border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase font-mono text-cyan-400">
                  EDITING PARAMETERS: {editingScheme.name} ({editingScheme.code})
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5">
                  LIVE IN PRODUCTION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Annual Family Income Ceiling (INR)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.maxIncome}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, maxIncome: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Minimum Academic Marks Cut-off (%)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.minMarksPercent}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, minMarksPercent: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Maximum Age Limit (Years)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.maxAge}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, maxAge: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Monthly Stipend (INR)
                  </label>
                  <input
                    type="number"
                    value={editingScheme.stipendMonthly}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, stipendMonthly: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>

                {editingScheme.foreignUniversityQSRank && (
                  <div>
                    <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                      Foreign University QS World Rank Cut-off
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
                      className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
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
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center gap-2"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Scheme Rules Schema →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATED MERIT LIST & QUOTA ENGINE */}
      {currentTab === 'merit' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 no-print">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
                NATIONAL SELECTION &amp; ALLOCATION ENGINE
              </span>
              <h3 className="text-base font-bold text-slate-100">
                Official Ministry Sanction Order &amp; Merit Selection
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintSanction}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5 text-slate-300" />
                Print Official Gazette Order
              </button>

              <button
                onClick={handleGenerateMerit}
                disabled={isCalculatingMerit}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center gap-1.5"
              >
                <ListOrdered className="h-3.5 w-3.5" />
                {isCalculatingMerit ? 'Recomputing Quotas...' : 'Run Quota Allocation Engine'}
              </button>
            </div>
          </div>

          {/* Quota Execution Summary Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono no-print">
            <div className="p-2 border border-slate-800 bg-slate-900/80">
              <span className="text-[10px] text-slate-500 block">EVALUATED DOSSIERS</span>
              <span className="text-slate-200 font-bold">{meritStats.totalEvaluated}</span>
            </div>
            <div className="p-2 border border-slate-800 bg-slate-900/80">
              <span className="text-[10px] text-slate-500 block">30% FEMALE QUOTA</span>
              <span className="text-cyan-400 font-bold">
                {meritStats.femaleFilled} / {meritStats.femaleQuotaSeats} Filled
              </span>
            </div>
            <div className="p-2 border border-slate-800 bg-slate-900/80">
              <span className="text-[10px] text-slate-500 block">PVTG PRIORITY</span>
              <span className="text-emerald-400 font-bold">{meritStats.pvtgSelected} Selected</span>
            </div>
            <div className="p-2 border border-slate-800 bg-slate-900/80">
              <span className="text-[10px] text-slate-500 block">5% PWD QUOTA</span>
              <span className="text-amber-400 font-bold">{meritStats.pwdSelected} Selected</span>
            </div>
          </div>

          {/* OFFICIAL GAZETTE SANCTION ORDER LAYOUT (Print Optimized) */}
          <div className="border-2 border-slate-700 bg-slate-950 p-6 text-slate-200 print:text-black print:bg-white print:border-black font-serif">
            {/* National Emblem & Header */}
            <div className="text-center border-b border-slate-700 pb-4 mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 print:text-gray-700 block">
                MINISTRY OF TRIBAL AFFAIRS — GOVERNMENT OF INDIA
              </span>
              <h2 className="text-lg font-bold text-slate-100 print:text-black uppercase tracking-tight mt-1">
                NATIONAL SELECTION MERIT LIST &amp; FORMAL SANCTION ORDER
              </h2>
              <div className="text-[11px] font-mono text-slate-400 print:text-gray-600 mt-1 flex justify-center gap-4">
                <span>Sanction Order No: {meritStats.sanctionOrderNumber}</span>
                <span>•</span>
                <span>Date of Notification: 28-Sep-2026</span>
              </div>
            </div>

            {/* Official Order Preamble */}
            <p className="text-xs leading-relaxed text-slate-300 print:text-black mb-4">
              In exercise of powers conferred under the National Fellowship &amp; Scholarship Guidelines
              for Scheduled Tribe Scholars, the following candidates are hereby declared selected for the
              award of fellowship based on normalized composite scoring with statutory reservations
              enforced (30% Female Quota, 5% PwD Quota, and direct PVTG Priority).
            </p>

            {/* Merit Table */}
            <div className="overflow-x-auto w-full mb-4">
              <table className="w-full text-left text-xs border border-slate-700 print:border-black">
                <thead className="bg-slate-900 text-slate-300 print:bg-gray-100 print:text-black font-mono text-[10px] border-b border-slate-700">
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
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {meritData.map((row) => (
                    <tr key={row.applicationId}>
                      <td className="p-2 font-bold">{row.rank}</td>
                      <td className="p-2 text-cyan-400 print:text-black">{row.applicationId}</td>
                      <td className="p-2 font-sans font-bold text-slate-100 print:text-black">
                        {row.applicantName}
                      </td>
                      <td className="p-2">{row.state}</td>
                      <td className="p-2 text-emerald-400 font-bold print:text-black">
                        {row.compositeScore} / 100
                      </td>
                      <td className="p-2 text-slate-300 font-semibold">{row.category}</td>
                      <td className="p-2">
                        <span className="text-[10px] font-bold text-emerald-400 print:text-black uppercase">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Digital PKI Cryptographic Stamp */}
            <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-slate-400">
              <div>
                <div>CRYPTOGRAPHIC DIGEST: {meritStats.eSignHash}</div>
                <div>ISSUED UNDER AUTHORITY OF JOINT SECRETARY (MoTA), NEW DELHI</div>
              </div>
              <div className="border border-emerald-800 p-2 bg-emerald-950/30 text-emerald-300 font-bold text-center">
                DIGITALLY SIGNED &amp; SEALED<br />GOVERNMENT OF INDIA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PFMS DBT BATCH SANCTIONS */}
      {currentTab === 'pfms' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              PUBLIC FINANCIAL MANAGEMENT SYSTEM (PFMS) GATEWAY
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Direct Benefit Transfer (DBT) Automated Payment Batch Generator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Assemble approved fellowship dossiers into cryptographic PFMS XML batch files for direct
              electronic settlement into scholar bank accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5" />
                GENERATE DISBURSEMENT BATCH (SEPTEMBER 2026)
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Total Sanctioned Scholars:</span>
                  <span className="text-slate-100 font-bold">8,234 Active Scholars</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Total Batch Debit Value:</span>
                  <span className="text-emerald-400 font-bold">₹25,52,54,000</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">PFMS Protocol:</span>
                  <span className="text-slate-200">ISO 20022 XML / SFTP Secure Push</span>
                </div>
              </div>

              <button
                onClick={() => setPfmsBatchGenerated(true)}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center justify-center gap-2"
              >
                <DollarSign className="h-3.5 w-3.5" />
                Generate &amp; Dispatch PFMS Batch →
              </button>
            </div>

            {pfmsBatchGenerated ? (
              <div className="border border-emerald-800 bg-emerald-950/30 p-3.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300 font-bold flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    PFMS BATCH FILE COMPILED &amp; ACKNOWLEDGED
                  </span>
                  <div className="p-3 bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1 overflow-x-auto">
                    <div>BATCH_ID: PFMS_MOTA_20260928_BATCH_019</div>
                    <div>ACK_CODE: 200_SUCCESS_QUEUED</div>
                    <div>SETTLEMENT_CYCLE: T+1 Direct Credit</div>
                  </div>
                </div>
                <button className="mt-3 w-full py-1.5 text-xs font-semibold uppercase bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5">
                  <Download className="h-3 w-3" />
                  Download Signed Batch XML
                </button>
              </div>
            ) : (
              <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex items-center justify-center text-xs text-slate-500 font-mono text-center">
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
