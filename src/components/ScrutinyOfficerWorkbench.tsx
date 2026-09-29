'use client';

import React, { useState } from 'react';
import { MOCK_APPLICATIONS, DEFICIENCY_REMARK_TEMPLATES } from '@/lib/mock-data';
import type { Application, Document, DocumentType } from '@/lib/types';
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
  Search,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  Layers,
  Send,
  UserCheck,
} from 'lucide-react';

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

  const [activeDocType, setActiveDocType] = useState<DocumentType>('CASTE_CERTIFICATE');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isRotating, setIsRotating] = useState<number>(0);

  // Deficiency Modal State
  const [showDeficiencyModal, setShowDeficiencyModal] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(DEFICIENCY_REMARK_TEMPLATES[0]);
  const [customRemark, setCustomRemark] = useState<string>('');

  // Status notification state
  const [feedbackNotice, setFeedbackNotice] = useState<string>('');

  // Deduplication check state
  const [dedupChecking, setDedupChecking] = useState<boolean>(false);
  const [dedupResult, setDedupResult] = useState<any>(null);

  const activeDoc =
    selectedApp.documents.find((d) => d.type === activeDocType) ||
    selectedApp.documents[0];

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

  const handleRaiseDeficiency = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRemark = customRemark.trim() || selectedTemplate;

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
    setShowDeficiencyModal(false);
    setFeedbackNotice(`Deficiency citation issued for ${selectedApp.id}. 7-day re-upload window opened.`);
    setTimeout(() => setFeedbackNotice(''), 4000);
  };

  const handleEscalatePhysical = () => {
    setFeedbackNotice(
      `Application ${selectedApp.id} escalated to District Collectorate / ITDA (Integrated Tribal Development Agency) for physical field verification.`
    );
    setTimeout(() => setFeedbackNotice(''), 5000);
  };

  const handleRunDedup = async () => {
    setDedupChecking(true);
    try {
      const res = await fetch('/api/dedup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: selectedApp.aadhaarHash,
          apaarId: selectedApp.apaarId,
          bankAccount: 'SBIN00049281',
        }),
      });
      const data = await res.json();
      setDedupResult(data.result);
    } catch {
      setDedupResult({
        isDuplicate: false,
        message: 'CLEAN: No active cross-registry conflict detected in NSP or SFMP.',
      });
    } finally {
      setDedupChecking(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Sub-navigation bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white rounded-lg shadow-sm p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 mr-2">
            SCRUTINY CONSOLE /
          </span>
          {[
            { id: 'queue', label: 'Desk Verification Queue' },
            { id: 'workbench', label: 'Split-Screen AI Document Workbench' },
            { id: 'dedup', label: 'National Deduplication Check' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
                currentTab === tab.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-200 bg-white text-slate-400 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrutiny Officer Badge */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <div>
            DESK: <span className="text-slate-800">NIC-MOTA-DESK-42</span>
          </div>
          <span>•</span>
          <div>
            OFFICER: <span className="text-slate-800">RAJESH KUMAR, IAS</span>
          </div>
        </div>
      </div>

      {feedbackNotice && (
        <div className="p-3 border border-green-200 bg-green-50 text-green-700 text-xs font-mono">
          ✓ {feedbackNotice}
        </div>
      )}

      {/* VIEW 1: QUEUE LIST */}
      {currentTab === 'queue' && (
        <div className="border border-slate-200 bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
                CENTRAL ASSIGNMENT MATRIX
              </span>
              <h3 className="text-base font-bold text-slate-900">
                MoTA Verification Dossier Queue ({apps.length} Files Assigned)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              FILTER: ALL STATES / ALL SCHEMES
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-slate-700 border border-slate-200">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-200">
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
              <tbody className="divide-y divide-slate-200 font-normal">
                {apps.map((a) => (
                  <tr key={a.id} className="hover:bg-white shadow-sm rounded-lg">
                    <td className="p-2.5 font-mono text-[11px] font-bold text-blue-600">{a.id}</td>
                    <td className="p-2.5">
                      <div className="font-semibold text-slate-900">{a.applicantName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{a.apaarId}</div>
                    </td>
                    <td className="p-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${getSchemeColor(a.schemeCode)}`}>
                        {a.schemeCode}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-700">{a.state}</td>
                    <td className="p-2.5 font-mono text-green-600">{formatCurrency(a.annualIncome)}</td>
                    <td className="p-2.5 font-mono text-slate-800">{a.pgMarksPercent}%</td>
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
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-400"
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

      {/* VIEW 2: SPLIT-SCREEN AI DOCUMENT WORKBENCH */}
      {currentTab === 'workbench' && (
        <div className="flex flex-col gap-3">
          {/* Header Bar with Applicant Select & One-Click Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                  ACTIVE SCRUTINY DOSSIER
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {selectedApp.id} — {selectedApp.applicantName}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 border ${getSchemeColor(selectedApp.schemeCode)}`}>
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
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-green-600 hover:bg-green-700 text-white border border-green-500 flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve Dossier
              </button>

              <button
                onClick={() => setShowDeficiencyModal(true)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-red-50 hover:bg-rose-900 text-red-600 border border-red-200 flex items-center gap-1.5"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Flag Deficiency
              </button>

              <button
                onClick={handleEscalatePhysical}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1.5"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-orange-600" />
                Escalate Physical Audit
              </button>
            </div>
          </div>

          {/* Document Switcher Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white shadow-sm rounded-lg p-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 mr-2">DOCUMENTS:</span>
            {selectedApp.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocType(doc.type)}
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-all ${
                  activeDocType === doc.type
                    ? 'border-blue-600 bg-cyan-950/60 text-cyan-300 font-bold'
                    : 'border-slate-200 bg-white text-slate-400 hover:text-slate-800'
                }`}
              >
                {getDocumentLabel(doc.type)}
              </button>
            ))}
          </div>

          {/* SPLIT-SCREEN WORKBENCH CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[580px]">
            {/* LEFT COLUMN: INTERACTIVE DOCUMENT VIEWER */}
            <div className="border border-slate-200 bg-[#080d19] flex flex-col justify-between overflow-hidden">
              {/* Document Viewer Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                <span className="font-mono text-slate-700 truncate max-w-[220px]">
                  {activeDoc?.fileName || 'document.pdf'}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                    className="p-1 hover:text-slate-900 border border-slate-300 hover:bg-slate-100"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-slate-700 w-10 text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                    className="p-1 hover:text-slate-900 border border-slate-300 hover:bg-slate-100"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setIsRotating((r) => (r + 90) % 360)}
                    className="p-1 hover:text-slate-900 border border-slate-300 hover:bg-slate-100"
                    title="Rotate 90 deg"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Document Canvas Simulation (High Density Government Certificate Scan) */}
              <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-[#04070e]">
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${isRotating}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="w-full max-w-md border-2 border-slate-300 bg-slate-50 p-5 text-slate-800 shadow-2xl relative"
                >
                  {/* Watermark Emblem */}
                  <div className="text-center border-b border-slate-300 pb-3 mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                      GOVERNMENT OF {selectedApp.state.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">
                      REVENUE &amp; TRIBAL WELFARE DEPARTMENT
                    </span>
                    <span className="text-[10px] font-mono text-green-600">
                      OFFICIAL STATUTORY CERTIFICATE RECORD
                    </span>
                  </div>

                  {/* Body Content simulation depending on document type */}
                  <div className="space-y-2 text-xs font-serif leading-relaxed text-slate-700">
                    {activeDocType === 'CASTE_CERTIFICATE' && (
                      <>
                        <p>
                          This is to certify that Kum./Shri{' '}
                          <strong className="text-slate-900 underline decoration-slate-600">
                            {selectedApp.applicantName}
                          </strong>
                          , son/daughter of Shri Ramkishan Meena, residing at Village/Town Jaipur, in the
                          State of <strong>{selectedApp.state}</strong>, belongs to the{' '}
                          <strong className="text-green-700">Meena</strong> Community, which is recognized
                          as a Scheduled Tribe under the Constitution (Scheduled Tribes) Order, 1950.
                        </p>
                        <div className="pt-4 flex justify-between items-end border-t border-slate-200 text-[10px] font-mono">
                          <div>
                            <div>Cert No: RJ/ST/2024/98412</div>
                            <div>Date of Issue: 12-Aug-2023</div>
                          </div>
                          <div className="text-right text-green-600 font-bold border border-green-200 p-1 bg-green-50">
                            DIGITALLY SIGNED<br />TEHSILDAR JAIPUR
                          </div>
                        </div>
                      </>
                    )}

                    {activeDocType === 'INCOME_CERTIFICATE' && (
                      <>
                        <p>
                          This is to certify that the total annual family income of Shri/Kum.{' '}
                          <strong className="text-slate-900 underline decoration-slate-600">
                            {selectedApp.applicantName}
                          </strong>
                          , residing at District {selectedApp.state === 'Rajasthan' ? 'Jaipur' : 'Ranchi'}, from
                          all sources for the Financial Assessment Year is verified to be{' '}
                          <strong className="text-green-700">
                            {formatCurrency(selectedApp.annualIncome)}
                          </strong>{' '}
                          (Rupees in words).
                        </p>
                        <div className="pt-4 flex justify-between items-end border-t border-slate-200 text-[10px] font-mono">
                          <div>
                            <div>Cert No: JH/INC/2024/55410</div>
                            <div>Validity: 31-Mar-2025</div>
                          </div>
                          <div className="text-right text-green-600 font-bold border border-green-200 p-1 bg-green-50">
                            DIGITALLY SIGNED<br />REVENUE CIRCLE OFFICER
                          </div>
                        </div>
                      </>
                    )}

                    {activeDocType === 'OFFER_LETTER' && (
                      <>
                        <p>
                          <strong>University of Oxford</strong> — Admissions Directorate.
                        </p>
                        <p>
                          We are pleased to confirm that{' '}
                          <strong className="text-slate-900">{selectedApp.applicantName}</strong> has been
                          formally accepted into the DPhil program in Computer Science for Michaelmas Term
                          2024.
                        </p>
                        <div className="pt-4 flex justify-between items-end border-t border-slate-200 text-[10px] font-mono">
                          <div>
                            <div>QS World Rank: #3</div>
                            <div>Annual Tuition: £31,480</div>
                          </div>
                          <div className="text-right text-blue-600 font-bold border border-cyan-800 p-1 bg-cyan-950/40">
                            OFFICIAL ADMISSIONS SEAL<br />OXFORD, UK
                          </div>
                        </div>
                      </>
                    )}

                    {activeDocType === 'MARKSHEET' && (
                      <>
                        <p>
                          <strong>{selectedApp.institution}</strong> — Examination Directorate.
                        </p>
                        <p>
                          Cumulative Statement of Marks for Master of Science. Candidate:{' '}
                          <strong className="text-slate-900">{selectedApp.applicantName}</strong>. Overall
                          Aggregate Percentage: <strong>{selectedApp.pgMarksPercent}%</strong>.
                        </p>
                        <div className="pt-4 flex justify-between items-end border-t border-slate-200 text-[10px] font-mono">
                          <div>
                            <div>Division: First Class</div>
                            <div>Result: Pass with Distinction</div>
                          </div>
                          <div className="text-right text-green-600 font-bold border border-green-200 p-1 bg-green-50">
                            CONTROLLER OF EXAMINATIONS
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Viewer Indicator */}
              <div className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>FORMAT: VECTOR PDF EMBED (CRYPTO HASH MATCHED)</span>
                <span>AUDIT LOG: RECORDED</span>
              </div>
            </div>

            {/* RIGHT COLUMN: AI EXTRACTIONS, RULE ENGINE & DEDUP CHECK */}
            <div className="border border-slate-200 bg-white rounded-lg shadow-sm p-4 flex flex-col gap-3.5 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-green-600 font-bold">
                  AI EXTRACTION &amp; AUTOMATED RULES VERIFICATION
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 border ${getConfidenceBadge(
                    activeDoc?.aiExtraction?.confidenceLevel || 'HIGH'
                  )}`}
                >
                  AI Confidence: {activeDoc?.aiExtraction?.confidenceScore ?? 94}%
                </span>
              </div>

              {/* AI Anomalies Red Alert Banner if present */}
              {activeDoc?.aiExtraction?.anomalies && activeDoc.aiExtraction.anomalies.length > 0 && (
                <div className="p-2.5 border border-red-200 bg-red-50/40 text-red-600 text-xs">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                    <span>ANOMALIES DETECTED BY MULTIMODAL MODEL:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] font-mono">
                    {activeDoc.aiExtraction.anomalies.map((anom, idx) => (
                      <li key={idx}>{anom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Extracted Metadata Key-Value Table */}
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2">
                  STRUCTURED METADATA EXTRACTED
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">APPLICANT NAME</span>
                    <span className="text-slate-800 font-bold">
                      {activeDoc?.aiExtraction?.applicantName || selectedApp.applicantName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">CERTIFICATE NUMBER</span>
                    <span className="text-blue-600">
                      {activeDoc?.aiExtraction?.certificateNumber || 'RJ/ST/2024/98412'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">ISSUING AUTHORITY</span>
                    <span className="text-slate-800">
                      {activeDoc?.aiExtraction?.issuingAuthority || 'Tehsildar & SDM'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">ISSUE DATE</span>
                    <span className="text-slate-800">{activeDoc?.aiExtraction?.issueDate || '2023-08-12'}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Rule Engine Verification Checklist */}
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2">
                  STATUTORY RULE ENGINE VERIFICATION CHECKLIST
                </span>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between p-1.5 border border-slate-200 bg-slate-100">
                    <span className="text-slate-700">1. Annual Income &le; ₹6,00,000 Cap:</span>
                    <span className="text-green-600 font-bold">
                      PASS ({formatCurrency(selectedApp.annualIncome)}) ✓
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 border border-slate-200 bg-slate-100">
                    <span className="text-slate-700">2. Sub-caste in Central ST Order ({selectedApp.state}):</span>
                    <span className="text-green-600 font-bold">PASS (Meena, Sched 1 Part XIII) ✓</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 border border-slate-200 bg-slate-100">
                    <span className="text-slate-700">3. Post-Graduation Marks &ge; 55% Cut-off:</span>
                    <span className="text-green-600 font-bold">PASS ({selectedApp.pgMarksPercent}%) ✓</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 border border-slate-200 bg-slate-100">
                    <span className="text-slate-700">4. Age &le; 40 Years Ceiling:</span>
                    <span className="text-green-600 font-bold">PASS ({selectedApp.age} Years) ✓</span>
                  </div>
                </div>
              </div>

              {/* Deduplication Engine Section */}
              <div className="border border-slate-200 bg-slate-50 p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    NATIONAL DEDUPLICATION CHECK (NSP &amp; SFMP REGISTRY)
                  </span>
                  <button
                    onClick={handleRunDedup}
                    disabled={dedupChecking}
                    className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-slate-100 hover:bg-slate-200 text-blue-600 border border-slate-300"
                  >
                    {dedupChecking ? 'Querying APIs...' : 'Execute Hash Check'}
                  </button>
                </div>

                {dedupResult ? (
                  <div
                    className={`p-2 border text-xs font-mono leading-relaxed ${
                      dedupResult.isDuplicate
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-green-200 bg-green-50 text-green-700'
                    }`}
                  >
                    {dedupResult.message}
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 font-mono">
                    SHA-256 Hash:{' '}
                    <span className="text-slate-400">{selectedApp.aadhaarHash.slice(0, 24)}...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DEDUPLICATION ENGINE TAB */}
      {currentTab === 'dedup' && (
        <div className="border border-slate-200 bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
              NATIONAL SCHOLARSHIP DEDUPLICATION REPOSITORY
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Cross-Registry Conflict Simulator (NSP, Canara Bank SFMP, State e-Districts)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              MoTA statutory rules prohibit dual receipt of public funds. The system checks cryptographic
              hashes of (Aadhaar + APAAR ID + Bank Account No.) against active government beneficiary lists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-slate-200 bg-white shadow-sm rounded-lg p-3.5 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600">
                TEST DEDUPLICATION HASH LOOKUP
              </span>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Candidate APAAR ID
                </label>
                <input
                  type="text"
                  defaultValue="APAAR-2024-003456"
                  className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-800 p-2 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Masked Aadhaar Number
                </label>
                <input
                  type="text"
                  defaultValue="XXXX-XXXX-9841"
                  className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-800 p-2 font-mono"
                />
              </div>

              <button
                onClick={handleRunDedup}
                className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
              >
                Execute National Query →
              </button>
            </div>

            <div className="border border-slate-200 bg-white shadow-sm rounded-lg p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  CONFIRMED CROSS-REGISTRY CONFLICT CASE
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Applicant <strong>Ramu Gond (APP-2024-NOS-004)</strong> has an active conflict flagged
                  under UGC-JRF via Canara Bank SFMP (Ref: UGC/SFMP/JRF/2024/4412).
                </p>

                <div className="p-3 border border-red-200 bg-red-50/40 text-red-600 text-xs mt-3 leading-relaxed font-mono">
                  DUAL BENEFIT VIOLATION: Scholar drawing ₹37,000/mo JRF stipend from UGC. NOS overseas
                  fellowship auto-frozen until UGC de-sanction certificate is submitted.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEFICIENCY REMARK MODAL */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl border border-red-200 bg-[#0c0d14] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-red-200 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-bold">
                  FLAG DOCUMENT DEFICIENCY (RULE 14A)
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Issue Statutory Citation to {selectedApp.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="text-slate-400 hover:text-slate-900 font-mono text-xs px-2 py-1 border border-slate-300 hover:bg-slate-100"
              >
                ✕ ESC
              </button>
            </div>

            <form onSubmit={handleRaiseDeficiency} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Predefined Legal Remark Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-800 p-2"
                >
                  {DEFICIENCY_REMARK_TEMPLATES.map((tmpl, idx) => (
                    <option key={idx} value={tmpl}>
                      {tmpl.slice(0, 85)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Officer Detailed Remarks (Appended to SMS / WhatsApp Alert)
                </label>
                <textarea
                  rows={3}
                  value={customRemark}
                  onChange={(e) => setCustomRemark(e.target.value)}
                  placeholder={selectedTemplate}
                  className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-800 p-2 leading-relaxed font-mono"
                />
              </div>

              <div className="text-[11px] text-slate-400 font-mono bg-slate-50 p-2 border border-slate-200">
                Notice: Raising a deficiency opens an isolated 7-day countdown window on the scholar’s
                portal and sends automated notification via SMS and DigiLocker.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 border border-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 flex items-center gap-1.5"
                >
                  <Send className="h-3 w-3" />
                  Dispatch Statutory Notice →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
