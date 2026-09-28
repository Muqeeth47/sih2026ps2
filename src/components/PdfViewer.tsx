'use client';

import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Upload,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';
import type { DocumentAIScenario } from '@/lib/datasets/ocr-scenarios';

interface PdfViewerProps {
  scenario?: DocumentAIScenario;
  applicantName?: string;
  state?: string;
  documentType?: string;
  fileName?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  scenario,
  applicantName = 'Priya Meena',
  state = 'Rajasthan',
  documentType = 'CASTE_CERTIFICATE',
  fileName = 'certificate.pdf',
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [customFileLoaded, setCustomFileLoaded] = useState<string | null>(null);

  // When scenario changes, reset view
  useEffect(() => {
    setCurrentPage(1);
    setRotation(0);
    setCustomFileLoaded(null);
  }, [scenario]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomFileLoaded(event.target?.result as string);
        setTotalPages(3);
      };
      reader.readAsDataURL(file);
    }
  };

  const name = scenario?.applicantName || applicantName;
  const docState = scenario?.state || state;
  const caste = scenario?.subCaste || 'Meena';
  const income = scenario?.incomeAmount || 480000;
  const isExpired = scenario?.category === 'EXPIRED_DOCUMENT';
  const isHighIncome = scenario?.category === 'INCOME_EXCEEDED';
  const isDuplicate = scenario?.category === 'DUPLICATE_BENEFIT';

  return (
    <div className="flex flex-col h-full border border-slate-800 bg-[#060a14] overflow-hidden select-none">
      {/* Top PDF Controls Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-cyan-400" />
          <span className="font-mono text-slate-200 text-xs font-semibold truncate max-w-[200px]">
            {scenario?.fileName || fileName}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 border border-slate-800 bg-slate-950">
            PDF/A-1b
          </span>
        </div>

        {/* Page Navigation & Zoom Controls */}
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex items-center gap-1 border border-slate-800 bg-slate-950 px-2 py-0.5 font-mono text-[11px]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="hover:text-slate-100 disabled:text-slate-600"
              title="Previous Page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="hover:text-slate-100 disabled:text-slate-600"
              title="Next Page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono text-[10px] w-9 text-center text-slate-400">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
              title="Rotate Page"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <label className="p-1 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer flex items-center gap-1 text-[10px] font-mono">
            <Upload className="h-3 w-3" />
            <span>Load Real PDF</span>
            <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Main Vector Rendering Canvas */}
      <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-[#03060c]">
        {customFileLoaded ? (
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-lg border-2 border-slate-700 bg-white text-black p-4 shadow-2xl"
          >
            <div className="p-2 border-b border-gray-300 text-xs font-mono font-bold text-gray-700">
              CUSTOM LOADED DOCUMENT: {fileName} (Page {currentPage})
            </div>
            <iframe
              src={customFileLoaded}
              className="w-full h-[450px] border-0"
              title="PDF Vector Canvas"
            />
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-md border-2 border-slate-700 bg-[#0d1526] p-6 text-slate-100 shadow-2xl relative font-serif"
          >
            {/* National & State Emblem Header */}
            <div className="text-center border-b border-slate-700/80 pb-3 mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                GOVERNMENT OF {docState.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-slate-100 block tracking-tight">
                {documentType.includes('CASTE')
                  ? 'REVENUE DEPARTMENT — SCHEDULED TRIBE CERTIFICATE'
                  : documentType.includes('INCOME')
                  ? 'OFFICE OF THE TEHSILDAR / SDO — ANNUAL INCOME CERTIFICATE'
                  : 'OFFICIAL ACADEMIC CREDENTIAL RECORD'}
              </span>
              <div className="text-[9px] font-mono text-emerald-400 mt-1 flex justify-center gap-3">
                <span>PORTAL: e-DISTRICT / MEESEVA</span>
                <span>•</span>
                <span>DOC REF: {scenario?.id || 'DOC-2024-9841'}</span>
              </div>
            </div>

            {/* Document Body depending on page */}
            {currentPage === 1 ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-200">
                {documentType.includes('CASTE') ? (
                  <>
                    <p>
                      This is to certify that Kum./Shri{' '}
                      <strong className="text-slate-50 underline decoration-slate-600">
                        {name}
                      </strong>
                      , son/daughter of Shri Ramkishan, residing at District {docState}, belongs to
                      the <strong className="text-emerald-300 font-bold">{caste}</strong> Community,
                      which is recognized as a Scheduled Tribe under Article 342 of the Constitution of
                      India.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      The applicant and their family ordinarily reside in the declared district. This
                      certificate is issued based on Revenue verification and Central Gazette Notification.
                    </p>
                  </>
                ) : documentType.includes('INCOME') ? (
                  <>
                    <p>
                      This is to certify that the annual family income from all sources (agricultural,
                      salary, business) of Shri/Kum.{' '}
                      <strong className="text-slate-50 underline decoration-slate-600">
                        {name}
                      </strong>{' '}
                      is verified to be:
                    </p>
                    <div className="p-2 border border-slate-700 bg-slate-900 text-center my-2">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        ASSESSED ANNUAL INCOME
                      </span>
                      <span
                        className={`text-base font-bold font-mono ${
                          isHighIncome ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        ₹{income.toLocaleString('en-IN')} / annum
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Valid for the Assessment Year: {isExpired ? '2022-2023 (EXPIRED)' : '2024-2025'}.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Official Statement of Academic Record / Examination Attestation for{' '}
                      <strong>{name}</strong>. Institution: {scenario?.institution || 'Recognized University'}.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      All educational credits and degree requirements verified as complete.
                    </p>
                  </>
                )}

                {/* Digital Signature Cryptographic Seal */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <div>
                    <div>Date of Issue: {scenario?.issueDate || '2024-02-15'}</div>
                    <div>Validity: {scenario?.validUntil || 'PERMANENT'}</div>
                  </div>
                  <div
                    className={`border p-1.5 text-center font-bold ${
                      isExpired
                        ? 'border-amber-700 bg-amber-950/40 text-amber-300'
                        : 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      <span>DIGITALLY SIGNED</span>
                    </div>
                    <div className="text-[8px] text-slate-400">CCA INDIA CERTIFIED</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-200">
                <div className="p-2 border border-slate-700 bg-slate-900/60">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    PAGE 2: STATUTORY REVENUE INQUIRY REPORT &amp; GENEALOGY CHART
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Field verification conducted by Revenue Inspector and Patwari on site. Traditional
                    habitation confirmed in notified Scheduled Area under Fifth Schedule.
                  </p>
                </div>
                <div className="p-2 border border-slate-800 bg-slate-950 font-mono text-[10px] text-slate-400 space-y-1">
                  <div>• Land Record Khatiyan No: 142/B</div>
                  <div>• Residential Certificate Link: Verified</div>
                  <div>• Circle Officer Audit Stamp: Cleared</div>
                </div>
              </div>
            )}

            {/* Micro Watermark */}
            <div className="mt-4 pt-2 border-t border-slate-800/80 flex justify-between text-[8px] font-mono text-slate-600">
              <span>MoTA NATIONAL VERIFICATION ENGINE (SIH26239)</span>
              <span>SHA256: 8A9B2C4D...</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="border-t border-slate-800 bg-slate-950 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>RENDERER: HTML5 VECTOR ENGINE (PDF.JS COMPATIBLE)</span>
        <span>SECURITY: ENCRYPTED AT REST</span>
      </div>
    </div>
  );
};
