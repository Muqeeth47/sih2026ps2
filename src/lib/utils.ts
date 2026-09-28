import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ApplicationStatus, ConfidenceLevel, DocumentType, SchemeCode } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getStatusColor(status: ApplicationStatus): string {
  const colors: Record<ApplicationStatus, string> = {
    DRAFT: 'bg-slate-50 text-slate-700 border-slate-300',
    SUBMITTED: 'bg-sky-950/70 text-sky-300 border-sky-800/70',
    INO_VERIFIED: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/70',
    AI_SCRUTINY: 'bg-amber-950/70 text-orange-700 border-orange-300/80',
    DEFICIENCY_RAISED: 'bg-red-50 text-red-600 border-rose-700/80',
    APPROVED: 'bg-green-100/70 text-green-700 border-emerald-700/80',
    REJECTED: 'bg-red-950/80 text-red-300 border-red-700/80',
    SANCTIONED: 'bg-teal-950/70 text-teal-300 border-teal-700/80',
    DBT_DISBURSED: 'bg-emerald-900/80 text-emerald-200 border-emerald-600',
  };
  return colors[status] ?? 'bg-white text-slate-400 border-slate-300';
}

export function getStatusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    DRAFT: 'Draft Application',
    SUBMITTED: 'Submitted to INO',
    INO_VERIFIED: 'INO Attested',
    AI_SCRUTINY: 'MoTA AI Scrutiny',
    DEFICIENCY_RAISED: 'Deficiency Flagged',
    APPROVED: 'Officer Approved',
    REJECTED: 'Scrutiny Rejected',
    SANCTIONED: 'Batch Sanctioned',
    DBT_DISBURSED: 'PFMS DBT Disbursed',
  };
  return labels[status] ?? status;
}

export function getConfidenceBadge(level: ConfidenceLevel): string {
  const badges: Record<ConfidenceLevel, string> = {
    HIGH: 'bg-green-100 text-green-700 border-emerald-700/70',
    MEDIUM: 'bg-amber-950/80 text-orange-700 border-orange-300/70',
    LOW: 'bg-red-50/90 text-red-600 border-rose-700/80',
  };
  return badges[level];
}

export function getDocumentLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    CASTE_CERTIFICATE: 'Scheduled Tribe Caste Certificate',
    INCOME_CERTIFICATE: 'Competent Authority Income Certificate',
    MARKSHEET: 'Post-Graduation Degree Marksheet',
    RESEARCH_SYNOPSIS: 'PhD Research Synopsis / Protocol',
    OFFER_LETTER: 'Foreign University Offer Letter (QS Rank)',
    BANK_PASSBOOK: 'Aadhaar-Seeded Bank Passbook',
    AADHAAR: 'Masked Aadhaar / APAAR Verification Proof',
    PASSPORT_PHOTO: 'Official Identity Photograph',
  };
  return labels[type] ?? type;
}

export function getSchemeColor(code: SchemeCode): string {
  const colors: Record<SchemeCode, string> = {
    NFST: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/80',
    NOS: 'bg-sky-950/60 text-sky-300 border-sky-800/80',
    TOP_CLASS: 'bg-amber-950/60 text-orange-700 border-amber-800/80',
    POST_MATRIC: 'bg-teal-950/60 text-teal-300 border-teal-800/80',
    PRE_MATRIC: 'bg-white text-slate-700 border-slate-300',
  };
  return colors[code] ?? 'bg-white text-slate-400 border-slate-300';
}

export function computeCompositeScore(pgMarks: number, qsRank?: number): number {
  if (qsRank && qsRank > 0) {
    const qsWeightage = Math.max(0, (500 - qsRank) / 500) * 100;
    return Math.round((0.7 * pgMarks + 0.3 * qsWeightage) * 10) / 10;
  }
  return Math.round(pgMarks * 10) / 10;
}

export function hashIdentifier(aadhaar: string, apaar: string, bank: string): string {
  const combined = `${aadhaar.trim().toUpperCase()}-${apaar.trim().toUpperCase()}-${bank.trim()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `sha256:${Math.abs(hash).toString(16).padStart(32, '0')}`;
}

export function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}
