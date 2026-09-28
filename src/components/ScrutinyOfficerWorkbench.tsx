'use client';

import React, { useState } from 'react';
import { MOCK_APPLICATIONS, DEFICIENCY_REMARK_TEMPLATES } from '@/lib/mock-data';
import type { Application, DocumentType } from '@/lib/types';
import {
  formatCurrency,
  formatDate,
  getDocumentLabel,
  getStatusColor,
  getStatusLabel,
  getConfidenceBadge,
  getSchemeColor,
} from '@/lib/utils';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Send,
  MessageSquare,
  Smartphone,
  Sparkles,
  Building,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { PdfViewer } from './PdfViewer';
import {
  OCR_EVALUATION_SCENARIOS,
  type DocumentAIScenario,
} from '@/lib/datasets/ocr-scenarios';
import { validateSubCasteAgainstOrder } from '@/lib/datasets/central-st-order';
import { checkIsPVTG } from '@/lib/datasets/pvtg-master';
import { validateAisheCode } from '@/lib/datasets/aishe-master';

interface ScrutinyOfficerWorkbenchProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  appId?: string;
  onSelectAppId?: (id: string) => void;
}

export const ScrutinyOfficerWorkbench: React.FC<ScrutinyOfficerWorkbenchProps> = ({
  currentTab,
  onTabChange,
  appId,
  onSelectAppId,
}) => {
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);

  // Active selection
  const selectedApp =
    apps.find((a) => a.id === appId) ||
    apps.find((a) => a.status === 'AI_SCRUTINY') ||
    apps[0];

  // Active Document AI Scenario (Defaulting to Scenario 1: Valid Pass)
  const [activeScenario, setActiveScenario] = useState<DocumentAIScenario>(
    OCR_EVALUATION_SCENARIOS[0]
  );

  const [activeDocType, setActiveDocType] = useState<DocumentType>('CASTE_CERTIFICATE');

  // Deficiency Modal State
  const [showDeficiencyModal, setShowDeficiencyModal] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(DEFICIENCY_REMARK_TEMPLATES[0]);
  const [customRemark, setCustomRemark] = useState<string>('');

  // Notification Dispatch Preview
  const [showDispatchPreview, setShowDispatchPreview] = useState<boolean>(false);
  const [dispatchData, setDispatchData] = useState<{ smsText: string; whatsAppText: string } | null>(null);

  // Status notification state
  const [feedbackNotice, setFeedbackNotice] = useState<string>('');

  // Real Dataset checks on active scenario / app
  const currentSubCaste = activeScenario?.subCaste || 'Meena';
  const currentState = activeScenario?.state || selectedApp.state;
  const currentInstitution = activeScenario?.institution || selectedApp.institution;
  const currentIncome = activeScenario?.incomeAmount || selectedApp.annualIncome;

  const stOrderCheck = validateSubCasteAgainstOrder(currentState, currentSubCaste);
  const pvtgCheck = checkIsPVTG(currentSubCaste, currentState);
  const aisheCheck = validateAisheCode(currentInstitution);
  const incomeCheck = currentIncome <= 600000;

  const handleSelectScenario = (scenario: DocumentAIScenario) => {
    setActiveScenario(scenario);
    setActiveDocType(scenario.documentType);
    setFeedbackNotice(`Loaded ${scenario.title} into Document Scrutiny Workbench.`);
    setTimeout(() => setFeedbackNotice(''), 3500);
  };

  const handleApprove = () => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id
          ? { ...a, status: 'APPROVED', updatedAt: new Date().toISOString() }
          : a
      )
    );
    setFeedbackNotice(`Application ${selectedApp.id} APPROVED by MoTA Desk Scrutiny Officer.`);
    setTimeout(() => setFeedbackNotice(''), 4000);
  };

  const handleOpenDeficiencyModal = () => {
    if (activeScenario.category === 'INCOME_EXCEEDED') {
      setSelectedTemplate(DEFICIENCY_REMARK_TEMPLATES[7]);
    } else if (activeScenario.category === 'EXPIRED_DOCUMENT') {
      setSelectedTemplate(DEFICIENCY_REMARK_TEMPLATES[0]);
    } else {
      setSelectedTemplate(DEFICIENCY_REMARK_TEMPLATES[1]);
    }
    setShowDeficiencyModal(true);
  };

  const handleRaiseDeficiency = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRemark = customRemark.trim() || selectedTemplate;

    // Build automated SMS and WhatsApp notification text
    const sms = `[Govt of India - MoTA] Action Required: Deficiency flagged in your scholarship application (${selectedApp.id}). Reason: ${finalRemark.slice(0, 100)}... Re-upload within 7 days at: https://sih239.vercel.app?tab=deficiency`;
    const whatsapp = `🏛️ *MINISTRY OF TRIBAL AFFAIRS (MoTA)*\n*Scholarship Deficiency Notice (Rule 14A)*\n\nDear ${activeScenario.applicantName},\nYour uploaded ${getDocumentLabel(activeDocType)} requires correction.\n\n*Officer Remark:*\n"${finalRemark}"\n\n⏳ *Resolution Window:* 7 Days\n🔗 *Re-upload Portal:* https://sih239.vercel.app?tab=deficiency\n\n_Helpdesk: 1800-11-7788_`;

    setDispatchData({ smsText: sms, whatsAppText: whatsapp });
    setShowDeficiencyModal(false);
    setShowDispatchPreview(true);

    setApps((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id
          ? {
              ...a,
              status: 'DEFICIENCY_RAISED',
              deficiencies: [
                ...a.deficiencies,
                {
                  id: `def-${Date.now()}`,
                  applicationId: a.id,
                  documentType: activeDocType,
                  reason: finalRemark,
                  raisedAt: new Date().toISOString(),
                  status: 'OPEN',
                },
              ],
            }
          : a
      )
    );
  };

  const handleEscalatePhysical = () => {
    setFeedbackNotice(
      `Application ${selectedApp.id} escalated to District Collectorate / ITDA (Integrated Tribal Development Agency) for physical field verification.`
    );
    setTimeout(() => setFeedbackNotice(''), 5000);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Sub-navigation bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-gray-500 mr-2">
            SCRUTINY CONSOLE /
          </span>
          {[
            { id: 'workbench', label: 'Split-Screen AI Document Workbench' },
            { id: 'queue', label: 'Desk Verification Queue' },
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

        {/* Scrutiny Officer Badge */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-gray-500">
          <div>
            DESK: <span className="text-gray-900">NIC-MOTA-DESK-42</span>
          </div>
          <span>•</span>
          <div>
            OFFICER: <span className="text-gray-900">RAJESH KUMAR, IAS</span>
          </div>
        </div>
      </div>

      {feedbackNotice && (
        <div className="p-3 border border-green-200 bg-green-50 text-green-700 text-xs font-mono">
          ✓ {feedbackNotice}
        </div>
      )}

      {/* 4 OFFICIAL OCR TEST SCENARIOS SELECTOR STRIP */}
      <div className="border border-gray-200 bg-gray-50 p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-widest text-green-600 font-bold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-green-600" />
            OFFICIAL DOCUMENT AI TEST DATASETS (4 STATUTORY VERIFICATION SCENARIOS)
          </span>
          <span className="text-[10px] font-mono text-gray-500">
            CLICK ANY SCENARIO TO TEST REAL-TIME EXTRACTION &amp; CHECKS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {OCR_EVALUATION_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen)}
              className={`p-2 text-left border transition-all flex flex-col justify-between ${
                activeScenario.id === scen.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-gray-900">
                  {scen.category.replace('_', ' ')}
                </span>
                <span className={`text-[8px] font-mono px-1 py-0.5 border ${scen.badgeColor}`}>
                  {scen.badgeLabel}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-900 truncate">{scen.title}</span>
              <span className="text-[10px] font-mono text-gray-500 mt-1">
                {scen.applicantName} ({scen.subCaste}, {scen.state})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: SPLIT-SCREEN AI DOCUMENT WORKBENCH */}
      {currentTab === 'workbench' && (
        <div className="flex flex-col gap-3">
          {/* Header Bar with Active Candidate Metadata & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 bg-white p-3">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
                  ACTIVE SCRUTINY DOSSIER
                </span>
                <span className="text-sm font-bold text-gray-900 font-mono">
                  {activeScenario.applicantName} (APAAR: {activeScenario.apaarId})
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-blue-200 bg-blue-50 text-blue-700">
                {selectedApp.schemeCode}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 border ${getStatusColor(selectedApp.status)}`}>
                {getStatusLabel(selectedApp.status)}
              </span>
            </div>

            {/* Decision Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleApprove}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-green-700 hover:bg-green-600 text-white border border-green-700 flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve Dossier
              </button>

              <button
                onClick={handleOpenDeficiencyModal}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 flex items-center gap-1.5"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Flag Deficiency
              </button>

              <button
                onClick={handleEscalatePhysical}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1.5"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                Escalate Physical Audit
              </button>
            </div>
          </div>

          {/* SPLIT-SCREEN WORKBENCH CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[620px]">
            {/* LEFT COLUMN: REAL MULTI-PAGE VECTOR PDF VIEWER */}
            <div className="h-full min-h-[580px]">
              <PdfViewer
                scenario={activeScenario}
                applicantName={activeScenario.applicantName}
                state={activeScenario.state}
                documentType={activeDocType}
                fileName={activeScenario.fileName}
              />
            </div>

            {/* RIGHT COLUMN: AI EXTRACTIONS & 4 STATUTORY MASTER CHECKS */}
            <div className="border border-gray-200 bg-white p-4 flex flex-col gap-3.5 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-green-600 font-bold">
                  AI EXTRACTION &amp; STATUTORY MASTER VALIDATION
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 border ${getConfidenceBadge(
                    activeScenario.confidenceScore >= 90 ? 'HIGH' : 'LOW'
                  )}`}
                >
                  AI Confidence: {activeScenario.confidenceScore}%
                </span>
              </div>

              {/* Red Alert Banner if Scenario has Anomalies */}
              {activeScenario.anomalies.length > 0 && (
                <div className="p-2.5 border border-red-200 bg-red-50 text-red-600 text-xs">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                    <span>SYSTEM FRAUD &amp; DEFICIENCY FLAGS:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] font-mono">
                    {activeScenario.anomalies.map((anom, idx) => (
                      <li key={idx}>{anom}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-[10px] font-mono text-red-500 border-t border-red-200 pt-1">
                    Expected Action: {activeScenario.expectedCitation}
                  </div>
                </div>
              )}

              {/* AI Extracted Structured Fields Table */}
              <div className="border border-gray-200 bg-gray-50 p-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-2">
                  STRUCTURED METADATA EXTRACTED
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 text-[10px] block">APPLICANT NAME</span>
                    <span className="text-gray-900 font-bold">{activeScenario.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">SUB-CASTE EXTRACTED</span>
                    <span className="text-blue-600 font-bold">{currentSubCaste}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">ANNUAL INCOME EXTRACTED</span>
                    <span className={incomeCheck ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {formatCurrency(currentIncome)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">VALIDITY DATE</span>
                    <span className={activeScenario.category === 'EXPIRED_DOCUMENT' ? 'text-amber-600 font-bold' : 'text-gray-900'}>
                      {activeScenario.validUntil}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 STATUTORY MASTER CHECKS TABLE */}
              <div className="border border-gray-200 bg-gray-50 p-2.5 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">
                  STATUTORY REPOSITORY CROSS-CHECKS (4 MASTER TABLES)
                </span>

                {/* Check 1: Central Presidential ST Order (Dataset A) */}
                <div className="p-2 border border-gray-200 bg-white text-xs font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-bold">1. Article 342 Presidential ST Order:</span>
                    <span className={stOrderCheck.isValid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {stOrderCheck.isValid ? 'MATCHED ✓' : 'UNLISTED ✗'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{stOrderCheck.legalCitation}</p>
                </div>

                {/* Check 2: PVTG Master Dataset (Dataset B) */}
                <div className="p-2 border border-gray-200 bg-white text-xs font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-bold">2. PVTG Priority Master Registry:</span>
                    <span className={pvtgCheck.isPVTG ? 'text-amber-600 font-bold' : 'text-gray-500'}>
                      {pvtgCheck.isPVTG ? 'PVTG PRIORITY 1 ✓' : 'STANDARD ST'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{pvtgCheck.notificationDetails}</p>
                </div>

                {/* Check 3: AISHE Code Master (Dataset C) */}
                <div className="p-2 border border-gray-200 bg-white text-xs font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-bold">3. AISHE Institution Accreditation:</span>
                    <span className={aisheCheck.isValid ? 'text-green-600 font-bold' : 'text-amber-600'}>
                      {aisheCheck.isValid ? `ACCREDITED (${aisheCheck.institution?.aisheCode}) ✓` : 'PENDING ✗'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{aisheCheck.validationNotice}</p>
                </div>

                {/* Check 4: Income Ceiling & National Deduplication */}
                <div className="p-2 border border-gray-200 bg-white text-xs font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-bold">4. Income Ceiling &amp; NSP Deduplication:</span>
                    <span
                      className={
                        activeScenario.category === 'DUPLICATE_BENEFIT'
                          ? 'text-red-600 font-bold'
                          : incomeCheck
                          ? 'text-green-600 font-bold'
                          : 'text-red-600 font-bold'
                      }
                    >
                      {activeScenario.category === 'DUPLICATE_BENEFIT'
                        ? 'DUAL-BENEFIT FRAUD ✗'
                        : incomeCheck
                        ? 'PASS (Within Cap) ✓'
                        : 'CAP EXCEEDED ✗'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    {activeScenario.category === 'DUPLICATE_BENEFIT'
                      ? 'Matched active UGC-JRF disbursement on Canara Bank SFMP. Automated freeze triggered.'
                      : `Income: ${formatCurrency(currentIncome)} (Ceiling: ₹6,00,000 p.a.)`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CENTRAL QUEUE */}
      {currentTab === 'queue' && (
        <div className="border border-gray-200 bg-white p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
                CENTRAL ASSIGNMENT MATRIX
              </span>
              <h3 className="text-base font-bold text-gray-900">
                MoTA Verification Dossier Queue ({apps.length} Files Assigned)
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-gray-700 border border-gray-200">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-mono border-b border-gray-200">
                <tr>
                  <th className="p-2.5">Application ID</th>
                  <th className="p-2.5">Applicant / APAAR</th>
                  <th className="p-2.5">Scheme</th>
                  <th className="p-2.5">State</th>
                  <th className="p-2.5">Family Income</th>
                  <th className="p-2.5">Score</th>
                  <th className="p-2.5">Current Status</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-normal">
                {apps.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="p-2.5 font-mono text-[11px] font-bold text-blue-600">{a.id}</td>
                    <td className="p-2.5">
                      <div className="font-semibold text-gray-900">{a.applicantName}</div>
                      <div className="text-[10px] font-mono text-gray-500">{a.apaarId}</div>
                    </td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${getSchemeColor(a.schemeCode)}`}>
                        {a.schemeCode}
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600">{a.state}</td>
                    <td className="p-2.5 font-mono text-green-600">{formatCurrency(a.annualIncome)}</td>
                    <td className="p-2.5 font-mono text-gray-900">{a.pgMarksPercent}%</td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${getStatusColor(a.status)}`}>
                        {getStatusLabel(a.status)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => {
                          if (onSelectAppId) onSelectAppId(a.id);
                          onTabChange('workbench');
                        }}
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                      >
                        Open AI Workbench →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEFICIENCY REMARK MODAL */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl border border-red-200 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-red-200 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-red-600 font-bold">
                  FLAG DOCUMENT DEFICIENCY (RULE 14A)
                </span>
                <h3 className="text-sm font-bold text-gray-900">
                  Issue Statutory Citation to {activeScenario.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="text-gray-500 hover:text-gray-900 font-mono text-xs px-2 py-1 border border-gray-300 hover:bg-gray-100"
              >
                ✕ ESC
              </button>
            </div>

            <form onSubmit={handleRaiseDeficiency} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                  Predefined Legal Remark Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 focus:ring-1 focus:ring-blue-500"
                >
                  {DEFICIENCY_REMARK_TEMPLATES.map((tmpl, idx) => (
                    <option key={idx} value={tmpl}>
                      {tmpl.slice(0, 85)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">
                  Officer Detailed Remarks
                </label>
                <textarea
                  rows={3}
                  value={customRemark}
                  onChange={(e) => setCustomRemark(e.target.value)}
                  placeholder={selectedTemplate}
                  className="w-full bg-white border border-gray-300 text-xs text-gray-900 p-2 leading-relaxed font-mono focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="text-[11px] text-gray-600 font-mono bg-gray-50 p-2 border border-gray-200">
                Notice: Raising a deficiency opens an isolated 7-day countdown window on the scholar's
                portal and dispatches automated notifications via SMS, WhatsApp, and DigiLocker.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white border border-red-500 flex items-center gap-1.5"
                >
                  <Send className="h-3 w-3" />
                  Dispatch Statutory Notice →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SMS & WHATSAPP NOTIFICATION DISPATCH PREVIEW MODAL */}
      {showDispatchPreview && dispatchData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl border border-gray-200 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-green-600 font-bold">
                  AUTOMATED DEFICIENCY DISPATCH LOOP (TELECOM GATEWAY)
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  Instant Notifications Dispatched to Scholar
                </h3>
              </div>
              <button
                onClick={() => setShowDispatchPreview(false)}
                className="text-gray-500 hover:text-gray-900 font-mono text-xs px-2 py-1 border border-gray-300 hover:bg-gray-100"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {/* SMS Notification Card */}
              <div className="border border-gray-200 bg-gray-50 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs mb-2">
                    <Smartphone className="h-4 w-4" />
                    <span>NIC DLT National SMS Gateway (Sent)</span>
                  </div>
                  <div className="p-2.5 bg-white border border-gray-200 text-xs font-mono text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {dispatchData.smsText}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-gray-500 flex justify-between">
                  <span>DLT Header: GOVMOT</span>
                  <span className="text-green-600">DELIVERED ✓</span>
                </div>
              </div>

              {/* WhatsApp Notification Card */}
              <div className="border border-gray-200 bg-gray-50 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-600 font-bold text-xs mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Official MoTA Business API</span>
                  </div>
                  <div className="p-2.5 bg-green-50 border border-green-200 text-xs font-mono text-green-700 leading-relaxed whitespace-pre-wrap">
                    {dispatchData.whatsAppText}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-gray-500 flex justify-between">
                  <span>Template: mota_deficiency_alert</span>
                  <span className="text-green-600">READ ✓✓</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-200">
              <button
                onClick={() => setShowDispatchPreview(false)}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              >
                Acknowledge &amp; Return to Desk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
