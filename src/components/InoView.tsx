'use client';

import React, { useState } from 'react';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import type { Application } from '@/lib/types';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
  getSchemeColor,
} from '@/lib/utils';
import {
  Building2,
  CheckCircle,
  Clock,
  FileCheck,
  Globe2,
  DollarSign,
  Upload,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface InoViewProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const InoView: React.FC<InoViewProps> = ({ currentTab, onTabChange }) => {
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<Application>(apps[0]);
  const [verificationFeedback, setVerificationFeedback] = useState<string>('');

  // Currency Converter state for NOS Foreign Invoices
  const [currencyAmount, setCurrencyAmount] = useState<number>(31480);
  const [selectedCurrency, setSelectedCurrency] = useState<'GBP' | 'USD' | 'EUR'>('GBP');
  const exchangeRates = { GBP: 110.45, USD: 87.2, EUR: 94.6 };

  // 1-Click Bonafide Verification
  const handleVerifyBonafide = (appId: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === appId ? { ...a, status: 'INO_VERIFIED', updatedAt: new Date().toISOString() } : a
      )
    );
    setVerificationFeedback(`Application ${appId} attested with Institutional Digital Seal.`);
    setTimeout(() => setVerificationFeedback(''), 4000);
  };

  // 1-Click Milestone Sign-off
  const handleSignMilestone = (appId: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === appId ? { ...a, status: 'AI_SCRUTINY', updatedAt: new Date().toISOString() } : a
      )
    );
    setVerificationFeedback(`Quarterly research milestone digitally signed for ${appId}. PFMS stipend triggered.`);
    setTimeout(() => setVerificationFeedback(''), 4000);
  };

  const convertedINR = Math.round(currencyAmount * exchangeRates[selectedCurrency]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sub-Navigation Header with Tab Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1120] p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mr-2">
            INO CONSOLE /
          </span>
          {[
            { id: 'inbox', label: 'Institutional Verification Inbox' },
            { id: 'milestones', label: 'PhD Fellowship Milestone Sign-Off' },
            { id: 'nos_liaison', label: 'NOS Foreign Tuition Liaison & Forex' },
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

        {/* Nodal Officer Credentials Metadata */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <div>
            INSTITUTION: <span className="text-slate-200">BIT MESRA (RANCHI)</span>
          </div>
          <span>•</span>
          <div>
            NODAL OFFICER: <span className="text-slate-200">DR. KAVITA SOREN</span>
          </div>
        </div>
      </div>

      {verificationFeedback && (
        <div className="p-3 border border-emerald-800 bg-emerald-950/40 text-emerald-300 text-xs font-mono">
          ✓ {verificationFeedback}
        </div>
      )}

      {/* TAB 1: INSTITUTIONAL INBOX & BONAFIDE VERIFICATION */}
      {currentTab === 'inbox' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              INSTITUTIONAL SCRUTINY &amp; BONAFIDE ATTESTATION
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Pending Student Enrolments Awaiting Nodal Confirmation
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verify student admission validity, hostel accommodation status, and course fee structures
              before routing dossiers to the Ministry of Tribal Affairs (MoTA).
            </p>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Application ID</th>
                  <th className="p-2.5">Scholar Name</th>
                  <th className="p-2.5">Scheme</th>
                  <th className="p-2.5">APAAR ID</th>
                  <th className="p-2.5">PG Score</th>
                  <th className="p-2.5">Current Status</th>
                  <th className="p-2.5 text-right">Bonafide Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-normal">
                {apps.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-900/60">
                    <td className="p-2.5 font-mono text-[11px] font-bold text-cyan-400">{a.id}</td>
                    <td className="p-2.5 font-semibold text-slate-100">{a.applicantName}</td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${getSchemeColor(a.schemeCode)}`}>
                        {a.schemeCode}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-400">{a.apaarId}</td>
                    <td className="p-2.5 font-mono text-slate-200">{a.pgMarksPercent}%</td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${getStatusColor(a.status)}`}>
                        {getStatusLabel(a.status)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      {a.status === 'SUBMITTED' ? (
                        <button
                          onClick={() => handleVerifyBonafide(a.id)}
                          className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500"
                        >
                          1-Click Attest Bonafide
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          ATTESTED ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MILESTONE SIGN-OFF */}
      {currentTab === 'milestones' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              SUPERVISOR RESEARCH GOVERNANCE (RULE 11B)
            </span>
            <h3 className="text-base font-bold text-slate-100">
              PhD Fellowship Quarterly Thesis Progress Sign-off
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Review research synopsis updates, lab logs, and thesis milestones before authorizing
              quarterly fellowship disbursement via PFMS DBT.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                PENDING QUARTERLY MILESTONE SUBMISSION
              </span>
              <div className="text-xs font-semibold text-slate-100">
                Scholar: <span className="text-cyan-400">Priya Meena</span> (NFST PhD Scholar, Biochemistry)
              </div>
              <div className="p-2.5 border border-slate-800 bg-slate-950 text-xs text-slate-300 leading-relaxed font-mono">
                &quot;Synthesized crude extracts of endemic tribal medicinal plants from Aravali belt.
                Conducted chromatographic isolation of bioactive flavonoids. Submitted preliminary data
                to Indian Journal of Biotechnology.&quot;
              </div>

              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div>• Enrolment: PhD/BIO/2023/12</div>
                <div>• Approved Stipend Rate: ₹31,000 / month (JRF level)</div>
                <div>• Contingency Claim: ₹18,500 (Consumables verified)</div>
              </div>

              <button
                onClick={() => handleSignMilestone('APP-2024-NFST-001')}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                Digital Sign-Off Milestone &amp; Release Stipend →
              </button>
            </div>

            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  DIGITAL SIGNATURE AUDIT TRAIL
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  All supervisor approvals apply an asymmetric cryptographic signature recorded in the
                  MoTA Public Ledger for CAG audit compliance.
                </p>

                <div className="p-3 bg-slate-950 border border-slate-800/80 mt-3 text-[10px] font-mono text-slate-500 space-y-1">
                  <div>SIGNER_ID: INO-JH-2021-089 (Dr. Kavita Soren)</div>
                  <div>DSC_EXPIRY: 2027-12-31</div>
                  <div>PKI_CHAIN: CCA India National Root CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOS FOREIGN LIAISON & FOREX */}
      {currentTab === 'nos_liaison' && (
        <div className="border border-slate-800 bg-[#0b1120] p-4 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
              NATIONAL OVERSEAS SCHOLARSHIP (NOS) FOREIGN LIAISON &amp; FOREX
            </span>
            <h3 className="text-base font-bold text-slate-100">
              Foreign University Tuition Invoicing &amp; RBI Reference Exchange Calculator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Convert overseas university tuition invoices (USD/GBP/EUR) to INR at official Reserve
              Bank of India (RBI) reference rates for Direct Ministry wire transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Forex Calculator */}
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5" />
                RBI REFERENCE RATE TUITION WIRE CONVERTER
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Invoice Currency
                  </label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2"
                  >
                    <option value="GBP">GBP (£) — United Kingdom (Oxford/Cambridge)</option>
                    <option value="USD">USD ($) — United States (MIT/Harvard)</option>
                    <option value="EUR">EUR (€) — European Union</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Invoice Amount ({selectedCurrency})
                  </label>
                  <input
                    type="number"
                    value={currencyAmount}
                    onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 p-2 font-mono"
                  />
                </div>
              </div>

              {/* Conversion Result Block */}
              <div className="p-3 bg-slate-950 border border-emerald-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">
                    SANCTION DISBURSEMENT IN INDIAN RUPEES (INR)
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    {formatCurrency(convertedINR)}
                  </span>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-400">
                  <div>Rate: 1 {selectedCurrency} = ₹{exchangeRates[selectedCurrency]}</div>
                  <div>RBI Spot Rate 28-Sep-2026</div>
                </div>
              </div>

              <button className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-500">
                Generate Ministry Foreign Wire Sanction Note →
              </button>
            </div>

            {/* University Offer & QS Verification */}
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                LIAISON CASE: UNIVERSITY OF OXFORD (UK)
              </span>
              <div className="text-xs text-slate-200 font-semibold">
                Scholar: <span className="text-cyan-400">Arjun Munda</span> — DPhil in Computer Science
              </div>
              <div className="p-2.5 border border-slate-800 bg-slate-950 text-xs text-slate-300 font-mono space-y-1">
                <div>• QS World University Rank: #3 (Statutory Cut-off: &le; 500) — PASS ✓</div>
                <div>• Department: Department of Computer Science, Parks Rd, Oxford</div>
                <div>• Academic Term: Michaelmas 2024 - Trinity 2027</div>
                <div>• Direct Tuition Transfer: Routed through High Commission of India, London</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
