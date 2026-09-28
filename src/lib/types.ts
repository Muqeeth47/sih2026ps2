export type Role = 'GUEST' | 'APPLICANT' | 'INSTITUTE_NODAL' | 'SCRUTINY_OFFICER' | 'MINISTRY_ADMIN';

export type SchemeCode = 'NFST' | 'NOS' | 'TOP_CLASS' | 'POST_MATRIC' | 'PRE_MATRIC';

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'INO_VERIFIED'
  | 'AI_SCRUTINY'
  | 'DEFICIENCY_RAISED'
  | 'APPROVED'
  | 'REJECTED'
  | 'SANCTIONED'
  | 'DBT_DISBURSED';

export type DocumentType =
  | 'CASTE_CERTIFICATE'
  | 'INCOME_CERTIFICATE'
  | 'MARKSHEET'
  | 'RESEARCH_SYNOPSIS'
  | 'OFFER_LETTER'
  | 'BANK_PASSBOOK'
  | 'AADHAAR'
  | 'PASSPORT_PHOTO';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  aadhaarHash?: string;
  apaarId?: string;
  institution?: string;
  state?: string;
}

export interface SchemeRule {
  code: SchemeCode;
  name: string;
  description: string;
  maxIncome: number;
  minMarksPercent: number;
  maxAge: number;
  stipendMonthly: number;
  foreignUniversityQSRank?: number;
  requiredDocs: DocumentType[];
  seats: number;
  pvtgPriority: boolean;
  femaleQuotaPercent: number;
  pwdQuotaPercent: number;
  active: boolean;
  type?: 'scholarship' | 'fellowship';
}

export interface Document {
  id: string;
  applicationId: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;
  status: 'PENDING' | 'VERIFIED' | 'DEFICIENT' | 'REJECTED';
  deficiencyReason?: string;
  aiExtraction?: AIExtractionResult;
}

export interface AIExtractionResult {
  applicantName?: string;
  fatherName?: string;
  certificateNumber?: string;
  issuingAuthority?: string;
  incomeAmount?: number;
  subCaste?: string;
  issueDate?: string;
  validUntil?: string;
  confidenceScore: number;
  confidenceLevel: ConfidenceLevel;
  anomalies: string[];
  extractedFields: Record<string, string>;
}

export interface RuleCheckResult {
  label: string;
  value: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  detail?: string;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  source?: string;
  activeScheme?: string;
  message: string;
}

export interface Application {
  id: string;
  applicantId: string;
  applicantName: string;
  apaarId: string;
  aadhaarHash: string;
  schemeCode: SchemeCode;
  schemeName: string;
  state: string;
  institution: string;
  annualIncome: number;
  pgMarksPercent: number;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isPwD: boolean;
  isPVTG: boolean;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  documents: Document[];
  compositeScore?: number;
  deficiencies: Deficiency[];
  quarterlyReports?: QuarterlyReport[];
  assignedOfficerId?: string;
}

export interface Deficiency {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  reason: string;
  raisedAt: string;
  resolvedAt?: string;
  status: 'OPEN' | 'RESOLVED';
}

export interface QuarterlyReport {
  id: string;
  applicationId: string;
  quarter: number;
  year: number;
  summary: string;
  uploadedAt: string;
  supervisorApproved: boolean;
  supervisorApprovedAt?: string;
  stipendReleased: boolean;
  stipendReleasedAt?: string;
}

export interface MeritListEntry {
  rank: number;
  applicationId: string;
  applicantName: string;
  apaarId: string;
  state: string;
  institution: string;
  pgMarksPercent: number;
  compositeScore: number;
  gender: string;
  isPwD: boolean;
  isPVTG: boolean;
  category: 'GENERAL_ST' | 'FEMALE_QUOTA' | 'PWD_QUOTA' | 'PVTG_PRIORITY';
  status: 'SELECTED' | 'WAITLISTED' | 'REJECTED';
}

export interface KPIData {
  totalApplicants: number;
  approvedCount: number;
  pendingCount: number;
  deficiencyCount: number;
  totalFundsSanctioned: number;
  femaleRatio: number;
  stateWiseDistribution: Array<{ state: string; count: number }>;
  schemeWiseDistribution: Array<{ scheme: string; count: number }>;
  monthlyTrend: Array<{ month: string; applications: number; approvals: number }>;
}
