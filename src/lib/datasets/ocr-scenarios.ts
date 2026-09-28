/**
 * Document AI / OCR Evaluation Test Scenarios (MoTA Scrutiny Workbench)
 * Pre-seeded sample scenarios representing the 4 statutory outcomes
 */

import type { DocumentType } from '../types';

export interface DocumentAIScenario {
  id: string;
  category: 'VALID_PASS' | 'INCOME_EXCEEDED' | 'EXPIRED_DOCUMENT' | 'DUPLICATE_BENEFIT';
  title: string;
  badgeLabel: string;
  badgeColor: string;
  documentType: DocumentType;
  fileName: string;
  applicantName: string;
  apaarId: string;
  aadhaarMasked: string;
  state: string;
  institution: string;
  aisheCode: string;
  subCaste: string;
  incomeAmount: number;
  issueDate: string;
  validUntil: string;
  confidenceScore: number;
  digitalSignatureValid: boolean;
  expectedOutcome: 'AUTO_APPROVE' | 'FLAG_DEFICIENCY_INCOME' | 'FLAG_DEFICIENCY_EXPIRED' | 'FLAG_DUAL_BENEFIT_FRAUD';
  expectedCitation: string;
  anomalies: string[];
}

export const OCR_EVALUATION_SCENARIOS: DocumentAIScenario[] = [
  {
    id: 'SCENARIO-1-PASS',
    category: 'VALID_PASS',
    title: 'Scenario 1: Valid Pass (100% Statutory Match)',
    badgeLabel: 'AUTO-APPROVE READY',
    badgeColor: 'border-emerald-700 bg-emerald-950/60 text-emerald-300',
    documentType: 'CASTE_CERTIFICATE',
    fileName: 'meeseva_ap_caste_chenchu.pdf',
    applicantName: 'Raju Chenchu',
    apaarId: 'APAAR-2024-007711',
    aadhaarMasked: 'XXXX-XXXX-8921',
    state: 'Andhra Pradesh',
    institution: 'Andhra University',
    aisheCode: 'U-0014',
    subCaste: 'Chenchu',
    incomeAmount: 320000,
    issueDate: '2024-02-15',
    validUntil: 'PERMANENT',
    confidenceScore: 98,
    digitalSignatureValid: true,
    expectedOutcome: 'AUTO_APPROVE',
    expectedCitation:
      'VALID ST & PVTG: Chenchu is notified under Constitution (Scheduled Tribes) Order for Andhra Pradesh and recognized among the 75 Central PVTGs. Digital signature hash verified against MeeSeva PKI root. 100% Match.',
    anomalies: [],
  },
  {
    id: 'SCENARIO-2-INCOME',
    category: 'INCOME_EXCEEDED',
    title: 'Scenario 2: Income Exceeded (Deficiency Flag)',
    badgeLabel: 'INCOME CEILING BREACH',
    badgeColor: 'border-rose-700 bg-rose-950/60 text-rose-300',
    documentType: 'INCOME_CERTIFICATE',
    fileName: 'tehsildar_income_high.pdf',
    applicantName: 'Vikram Bhil',
    apaarId: 'APAAR-2024-008822',
    aadhaarMasked: 'XXXX-XXXX-4412',
    state: 'Rajasthan',
    institution: 'University of Rajasthan',
    aisheCode: 'U-0391',
    subCaste: 'Bhil',
    incomeAmount: 850000, // Exceeds 6L cap
    issueDate: '2024-04-10',
    validUntil: '2025-03-31',
    confidenceScore: 94,
    digitalSignatureValid: true,
    expectedOutcome: 'FLAG_DEFICIENCY_INCOME',
    expectedCitation:
      'STATUTORY DEFICIENCY: Verified annual family income of ₹8,50,000 exceeds NFST statutory income ceiling of ₹6,00,000 p.a. (Rule 4.1). Application cannot be approved without cabinet ceiling relaxation.',
    anomalies: ['Annual income ₹8,50,000 exceeds scheme limit ₹6,00,000'],
  },
  {
    id: 'SCENARIO-3-EXPIRED',
    category: 'EXPIRED_DOCUMENT',
    title: 'Scenario 3: Expired Document (7-Day Re-Upload Loop)',
    badgeLabel: 'VALIDITY EXPIRED (7-DAY NOTICE)',
    badgeColor: 'border-amber-700 bg-amber-950/60 text-amber-300',
    documentType: 'INCOME_CERTIFICATE',
    fileName: 'income_fy2022_expired.pdf',
    applicantName: 'Arjun Munda',
    apaarId: 'APAAR-2024-005678',
    aadhaarMasked: 'XXXX-XXXX-9932',
    state: 'Jharkhand',
    institution: 'Birla Institute of Technology, Mesra',
    aisheCode: 'U-0205',
    subCaste: 'Munda',
    incomeAmount: 650000,
    issueDate: '2022-04-01',
    validUntil: '2023-03-31', // Expired
    confidenceScore: 68,
    digitalSignatureValid: true,
    expectedOutcome: 'FLAG_DEFICIENCY_EXPIRED',
    expectedCitation:
      'DEFICIENCY FLAGGED: Income certificate expired on 31-03-2023. Valid certificate for current Assessment Year (FY 2024-25) mandatory under MoTA Rule 14A. 7-Day countdown window opened on applicant portal.',
    anomalies: ['Certificate expired on 31-03-2023', 'Issued for preceding financial assessment year'],
  },
  {
    id: 'SCENARIO-4-DUPLICATE',
    category: 'DUPLICATE_BENEFIT',
    title: 'Scenario 4: Duplicate Benefit (National NSP / SFMP Fraud Flag)',
    badgeLabel: 'DUAL-BENEFIT FRAUD',
    badgeColor: 'border-red-700 bg-red-950/80 text-red-300',
    documentType: 'AADHAAR',
    fileName: 'aadhaar_nsp_duplicate.pdf',
    applicantName: 'Ramu Gond',
    apaarId: 'APAAR-2024-003456',
    aadhaarMasked: 'XXXX-XXXX-1109',
    state: 'Chhattisgarh',
    institution: 'National Institute of Technology (NIT), Raipur',
    aisheCode: 'U-0092',
    subCaste: 'Gond',
    incomeAmount: 450000,
    issueDate: '2024-01-10',
    validUntil: 'PERMANENT',
    confidenceScore: 95,
    digitalSignatureValid: true,
    expectedOutcome: 'FLAG_DUAL_BENEFIT_FRAUD',
    expectedCitation:
      'NATIONAL DEDUPLICATION ALERT: SHA-256 hash match found in Canara Bank SFMP registry (Ref: UGC/SFMP/JRF/2024/4412). Scholar currently drawing UGC Junior Research Fellowship. Dual benefit strictly prohibited. Application frozen.',
    anomalies: ['Active dual disbursement detected on National Scholarship Portal / Canara Bank SFMP'],
  },
];
