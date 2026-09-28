import { NextResponse } from 'next/server';
import type { AIExtractionResult, DocumentType } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { docType, fileName, applicantName } = body as {
      docType: DocumentType;
      fileName?: string;
      applicantName?: string;
    };

    // Simulate AI document extraction latency
    await new Promise((resolve) => setTimeout(resolve, 350));

    let extraction: AIExtractionResult;

    if (docType === 'CASTE_CERTIFICATE') {
      const isSuspect = fileName?.toLowerCase().includes('blur') || fileName?.toLowerCase().includes('fake');
      extraction = {
        applicantName: applicantName || 'Priya Meena',
        fatherName: 'Ramkishan Meena',
        certificateNumber: isSuspect ? 'TEMP/REV/INVALID/000' : 'RJ/ST/2024/98412',
        issuingAuthority: 'Tehsildar & Sub-Divisional Magistrate, Jaipur West',
        subCaste: 'Meena',
        issueDate: '2023-08-12',
        validUntil: 'PERMANENT_ST_STATUS',
        confidenceScore: isSuspect ? 54 : 96,
        confidenceLevel: isSuspect ? 'LOW' : 'HIGH',
        anomalies: isSuspect
          ? ['Digital signature stamp hash unverified', 'Pixel irregularities detected in District Seal']
          : [],
        extractedFields: {
          state: 'Rajasthan',
          district: 'Jaipur',
          presidentialOrderMatch: 'TRUE (Schedule 1, Part XIII)',
          officerCadre: 'State Administrative Service',
        },
      };
    } else if (docType === 'INCOME_CERTIFICATE') {
      const isExpired = fileName?.toLowerCase().includes('old') || fileName?.toLowerCase().includes('expired');
      extraction = {
        applicantName: applicantName || 'Arjun Munda',
        fatherName: 'Mangal Munda',
        certificateNumber: 'JH/INC/2023/55410',
        issuingAuthority: 'Revenue Officer & Circle Officer, Ranchi Sadar',
        incomeAmount: isExpired ? 650000 : 480000,
        issueDate: isExpired ? '2023-03-20' : '2024-04-10',
        validUntil: isExpired ? '2024-03-31' : '2025-03-31',
        confidenceScore: isExpired ? 65 : 92,
        confidenceLevel: isExpired ? 'LOW' : 'HIGH',
        anomalies: isExpired
          ? ['Certificate validity expired on 31-03-2024', 'Issued for preceding financial assessment year']
          : [],
        extractedFields: {
          financialYear: isExpired ? '2022-2023' : '2023-2024',
          taxableStatus: 'Below Exemption Threshold',
          issuingCircle: 'Ranchi Sadar',
        },
      };
    } else if (docType === 'MARKSHEET') {
      extraction = {
        applicantName: applicantName || 'Priya Meena',
        certificateNumber: 'UOR/CONV/2023/8912',
        issuingAuthority: 'Controller of Examinations, University of Rajasthan',
        issueDate: '2023-07-15',
        validUntil: 'PERMANENT',
        confidenceScore: 94,
        confidenceLevel: 'HIGH',
        anomalies: [],
        extractedFields: {
          degree: 'Master of Science (Biotechnology)',
          division: 'First Class with Distinction',
          percentage: '72.50%',
          cgpa: '8.4 / 10.0',
        },
      };
    } else if (docType === 'OFFER_LETTER') {
      extraction = {
        applicantName: applicantName || 'Arjun Munda',
        certificateNumber: 'OXF/ADM/DPHIL/2024/77',
        issuingAuthority: 'Admissions Directorate, University of Oxford, UK',
        issueDate: '2024-08-01',
        validUntil: '2025-10-01',
        confidenceScore: 95,
        confidenceLevel: 'HIGH',
        anomalies: [],
        extractedFields: {
          institution: 'University of Oxford',
          qsWorldRank: '3',
          program: 'DPhil in Computer Science',
          annualTuitionGBP: '£31,480',
        },
      };
    } else {
      extraction = {
        applicantName: applicantName || 'Scholar Name',
        certificateNumber: 'DOC/VERIFIED/2024/110',
        issuingAuthority: 'Competent Authority',
        issueDate: '2024-01-01',
        confidenceScore: 89,
        confidenceLevel: 'MEDIUM',
        anomalies: [],
        extractedFields: {
          status: 'Authenticated',
        },
      };
    }

    return NextResponse.json({ success: true, extraction });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Extraction failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
