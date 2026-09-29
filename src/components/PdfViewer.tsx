'use client';

import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Printer,
  Download,
  Upload,
  CheckCircle,
  ShieldCheck,
  QrCode,
  Maximize2
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
  fileName = 'caste_certificate_verified.pdf',
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
    <div className="flex flex-col h-full border border-slate-300 bg-slate-100 rounded-xl overflow-hidden shadow-sm select-none">
      {/* Top PDF Controls Toolbar (Acrobat / Chrome Style) */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-2.5 text-xs text-white">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center font-bold text-[10px]">
            PDF
          </div>
          <span className="font-mono text-slate-100 text-xs font-semibold truncate max-w-[220px]">
            {scenario?.fileName || fileName}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            PDF/A-1b Verified
          </span>
        </div>

        {/* Navigation & Zoom Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-2 py-1 font-mono text-[11px]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="hover:text-blue-300 disabled:opacity-40 transition-opacity"
              title="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-1 text-slate-200 font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="hover:text-blue-300 disabled:opacity-40 transition-opacity"
              title="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono text-[10px] w-10 text-center text-slate-300 font-bold">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors border-l border-slate-700 ml-0.5 pl-1.5"
              title="Rotate 90°"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-[11px] font-medium transition-colors"
              title="Print Document"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <label className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded cursor-pointer flex items-center gap-1.5 text-[11px] font-bold shadow-sm transition-colors">
              <Upload className="h-3 w-3" />
              <span className="hidden sm:inline">Upload Real PDF</span>
              <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Main Document Canvas Viewport */}
      <div className="flex-1 p-6 md:p-8 flex items-center justify-center overflow-auto bg-slate-200/90 min-h-[550px]">
        {customFileLoaded ? (
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-2xl bg-white border border-slate-300 p-6 shadow-2xl rounded-sm"
          >
            <div className="p-2 border-b border-gray-200 text-xs font-mono font-bold text-gray-700 flex justify-between items-center mb-4">
              <span>CUSTOM ATTACHMENT: {fileName}</span>
              <span className="text-emerald-600">PAGE {currentPage}</span>
            </div>
            <iframe
              src={customFileLoaded}
              className="w-full h-[520px] border border-slate-200 rounded"
              title="Uploaded Custom PDF"
            />
          </div>
        ) : (
          /* Official Government A4 Document Canvas */
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-xl bg-white border-2 border-slate-800 p-8 text-slate-900 shadow-2xl relative font-serif"
          >
            {/* Guilloche Double Border */}
            <div className="border border-slate-900 p-6 relative">
              {/* Security Watermark Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="text-7xl font-bold uppercase tracking-widest text-slate-900 rotate-[-30deg]">
                  GOVT OF INDIA
                </span>
              </div>

              {/* National & State Emblem Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4 mb-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-left font-mono text-[9px] text-slate-500">
                    <div>FORM NO: ST-2024/REV</div>
                    <div>BARCODE: ||||| | |||| |||</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/Ministry_of_Tribal_Affairs.svg" 
                      alt="State Emblem" 
                      className="h-10 w-auto object-contain mx-auto mb-1" 
                    />
                    <span className="text-[11px] font-sans font-bold tracking-widest text-slate-900 uppercase">
                      GOVERNMENT OF {docState.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-sans text-slate-600 font-semibold">
                      REVENUE &amp; DISASTER MANAGEMENT DEPARTMENT
                    </span>
                  </div>
                  <div className="p-1 border border-slate-300 bg-slate-50">
                    <QrCode className="h-8 w-8 text-slate-800" />
                  </div>
                </div>

                <div className="mt-2 bg-slate-900 text-white font-sans text-xs font-bold py-1 px-4 tracking-wider uppercase inline-block rounded-xs">
                  {documentType.includes('CASTE')
                    ? 'CERTIFICATE OF SCHEDULED TRIBE MEMBERSHIP'
                    : documentType.includes('INCOME')
                    ? 'CERTIFICATE OF ANNUAL FAMILY INCOME'
                    : 'OFFICIAL ACADEMIC CREDENTIAL RECORD'}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-2 px-1">
                  <span>Certificate ID: <strong>{scenario?.id || 'RJ/ST/2024/89410'}</strong></span>
                  <span>Date of Issue: <strong>15-Jan-2024</strong></span>
                </div>
              </div>

              {/* Document Body depending on page */}
              {currentPage === 1 ? (
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 font-serif">
                  {documentType.includes('CASTE') ? (
                    <>
                      <p className="text-justify">
                        This is to officially certify that Kum./Shri{' '}
                        <strong className="text-slate-950 font-bold underline">
                          {name}
                        </strong>
                        , son/daughter of Shri Ramkishan Meena, residing at Village/Town 
                        <strong> Jaipur District</strong>, in the State of <strong>{docState}</strong>, 
                        belongs to the <strong className="text-blue-900 font-bold">{caste}</strong> Community, 
                        which is recognized as a <strong>Scheduled Tribe</strong> under the 
                        <em> Constitution (Scheduled Tribes) Order, 1950 (Part VIII)</em> as amended from time to time.
                      </p>

                      <p className="text-justify text-[11px] text-slate-700">
                        Shri/Kum. {name} and her/his family ordinarily reside in the declared territory. 
                        This certificate is issued on the basis of the verified Land Record Survey Register No. 412/A 
                        and verified by the Circle Revenue Inspector.
                      </p>

                      <div className="my-3 p-3 bg-slate-50 border border-slate-200 text-[11px] font-mono rounded">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>Constitutional Order:</strong> ST Order 1950</div>
                          <div><strong>Sub-Tribe Group:</strong> {caste}</div>
                          <div><strong>Verification Status:</strong> DIGITALLY RECONCILED</div>
                          <div><strong>UIDAI Auth Hash:</strong> SHA256:4b91...881c</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-justify">
                        This is to certify that the annual family income from all sources of Shri/Kum.{' '}
                        <strong className="text-slate-950 underline">{name}</strong>, residing at {docState}, 
                        for the Financial Year 2023-24 has been assessed at{' '}
                        <strong className="text-emerald-800 font-bold font-mono">
                          ₹{income.toLocaleString('en-IN')} (Rupees {income === 480000 ? 'Four Lakh Eighty Thousand' : 'As Declared'} Only)
                        </strong>.
                      </p>
                      <p className="text-[11px] text-slate-700">
                        The income has been calculated including agricultural, salaried, and incidental revenue.
                      </p>
                    </>
                  )}

                  {/* Stamp & Signature Section */}
                  <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-end">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full border-2 border-blue-800 border-dashed flex items-center justify-center p-1 text-center rotate-[-12deg] bg-blue-50/50">
                        <span className="text-[8px] font-sans font-bold text-blue-800 uppercase leading-tight">
                          SEAL OF TEHSILDAR<br/>GOVT OF {docState.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[9px] font-sans text-slate-500 mt-1">Official Seal</span>
                    </div>

                    <div className="text-right space-y-1 font-sans">
                      <div className="border border-blue-600 bg-blue-50/80 p-2 rounded text-left inline-block">
                        <div className="text-[9px] text-blue-900 font-bold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-blue-700" /> Digitally Signed
                        </div>
                        <div className="text-[8px] font-mono text-slate-600">Officer: Rajesh Meena (SDO/Tehsildar)</div>
                        <div className="text-[8px] font-mono text-slate-500">Timestamp: 2024-01-15T10:44:02Z</div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-800">Competent Issuing Authority</div>
                      <div className="text-[9px] text-slate-500">Government of {docState}</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Page 2: Statutory Verification Annexure */
                <div className="space-y-4 text-xs leading-relaxed text-slate-800 font-sans">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-sm uppercase text-slate-900">Annexure - II: Statutory AI Verification Record</h4>
                    <p className="text-[10px] text-slate-500">Cryptographic audit log generated by MoTA National Architecture.</p>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between p-2 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500">Applicant APAAR ID:</span>
                      <span className="font-bold text-slate-900">1234-5678-9012</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500">e-Pramaan / DigiLocker Consent:</span>
                      <span className="font-bold text-emerald-700">AUTHENTICATED (TOKEN #DL-9821)</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500">Central ST Order List Match:</span>
                      <span className="font-bold text-blue-700">VALIDATED (ENTRY #12 - MEENA)</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500">Deduplication Hash:</span>
                      <span className="font-bold text-slate-800">SHA256:e3b0c442...9841</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs mt-4">
                    <strong>✓ Statutory Compliance Guaranteed:</strong> This digital copy is legally valid for all central fellowship and overseas scholarship disbursals under the IT Act 2000.
                  </div>
                </div>
              )}

              {/* Document Footer Bar */}
              <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[9px] font-mono text-slate-400">
                <span>VERIFY AT: https://edistrict.rajasthan.gov.in</span>
                <span>PAGE {currentPage} OF {totalPages}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
