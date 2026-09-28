'use client';

import React from 'react';
import { ShieldCheck, Scale, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface TermsPrivacyModalProps {
  view: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({ view, onClose }) => {
  if (!view) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl border border-slate-300 bg-white rounded-lg shadow-sm p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            {view === 'terms' ? (
              <Scale className="h-5 w-5 text-green-600" />
            ) : (
              <Lock className="h-5 w-5 text-green-600" />
            )}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                STATUTORY COMPLIANCE DOCUMENTATION
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {view === 'terms'
                  ? 'Terms & Conditions — MoTA Scholarship & Fellowship Regulations'
                  : 'Privacy Policy & Data Protection (DPDP Act 2023 Compliance)'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 font-mono text-xs px-2.5 py-1 border border-slate-300 hover:bg-slate-100"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 text-xs text-slate-700 space-y-4 font-normal leading-relaxed">
          {view === 'terms' ? (
            <>
              <div className="p-3 border border-emerald-900/60 bg-green-50 text-green-700">
                <strong>Statutory Notice:</strong> These regulations govern applications submitted under
                the National Fellowship for ST (NFST), National Overseas Scholarship (NOS), Top Class
                Education Scheme, and Post/Pre-Matric Schemes managed by the Ministry of Tribal Affairs
                (MoTA), Government of India.
              </div>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">1. Eligibility & Authenticity of ST Status</h3>
                <p>
                  Applicants must strictly belong to a Scheduled Tribe notified under Article 342 of the
                  Constitution of India for their respective State/Union Territory. Submission of forged,
                  tampered, or unverified caste certificates will lead to immediate cancellation of the
                  fellowship, blacklisting from all Central Government portals, and prosecution under the
                  Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">2. Non-Duplication Covenant (Zero Dual Benefit Rule)</h3>
                <p>
                  As per Ministry directives, no scholar is permitted to draw fellowship, scholarship, or
                  financial stipend simultaneously from any other Central Government agency (e.g., UGC,
                  CSIR, ICSSR, NSP) or State Government scheme. All applications are subject to mandatory
                  cryptographic hash checks against the National Scholarship Portal (NSP) and Canara Bank
                  SFMP deduplication engine. Any breach results in instant de-sanctioning and recovery with
                  penal interest.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">3. Income Ceiling Verification</h3>
                <p>
                  Total family income from all sources must not exceed the ceiling set under the respective
                  scheme (₹6,00,000 p.a. for NFST; ₹8,00,000 p.a. for NOS). Income certificates must be
                  issued by an officer not below the rank of Tehsildar or Sub-Divisional Magistrate (SDM)
                  and must be valid for the current financial assessment year.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">4. Milestone & Disbursement Obligations</h3>
                <p>
                  NFST PhD scholars must submit quarterly progress reports digitally endorsed by their
                  Research Supervisor and Institute Nodal Officer (INO). Failure to submit two consecutive
                  quarterly reports will suspend Direct Benefit Transfer (DBT) stipends via PFMS until
                  formal inquiry.
                </p>
              </section>
            </>
          ) : (
            <>
              <div className="p-3 border border-cyan-900/60 bg-cyan-950/20 text-cyan-300">
                <strong>Data Protection Standard:</strong> In compliance with the Digital Personal Data
                Protection (DPDP) Act 2023 and the Aadhaar (Targeted Delivery of Financial and Other
                Subsidies, Benefits and Services) Act, 2016.
              </div>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">1. Purpose of Data Processing</h3>
                <p>
                  MoTA collects and processes demographic information (Name, DOB, APAAR ID, Gender,
                  Category), educational qualifications, socioeconomic income proofs, and bank details
                  solely for verification of statutory fellowship eligibility, quota allocation (including
                  PVTG priority and 30% female reservation), and Direct Benefit Transfer (DBT) execution.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">2. Aadhaar Data Vault (ADV) Architecture</h3>
                <p>
                  In accordance with UIDAI Circulars, full Aadhaar numbers are never stored in plaintext
                  on any MoTA server. The system generates an irreversible SHA-256 cryptographic hash
                  paired with an encrypted Reference Key stored inside a hardware-isolated Aadhaar Data
                  Vault located on the NIC Meghraj National Cloud.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">3. AI Document Scrutiny Safeguards</h3>
                <p>
                  Uploaded caste certificates and marksheets are evaluated by the AI Document Intelligence
                  Engine for text extraction and pixel tamper detection. AI extraction results serve as an
                  advisory aid; final approval or deficiency rejection is exclusively exercised by a designated
                  MoTA Desk Scrutiny Officer with an audit-logged digital sign-off.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">4. Data Subject Rights & Retention</h3>
                <p>
                  Under the DPDP Act 2023, scholars possess the right to grievance redressal regarding
                  erroneously extracted metadata and may file correction petitions via the Deficiency
                  Resolution Window. Data of sanctioned scholars is preserved for statutory audit under CAG
                  mandates for a minimum period of 7 years.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-4 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Notified under MoTA Gazette Resolution No. 11015/01/2024-Scholarship</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
