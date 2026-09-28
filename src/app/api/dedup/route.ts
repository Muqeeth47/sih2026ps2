import { NextResponse } from 'next/server';
import { hashIdentifier } from '@/lib/utils';
import type { DuplicateCheckResult } from '@/lib/types';

// Mock external registries of active scholarship disbursements
const MOCK_ACTIVE_NSP_BENEFICIARIES = [
  {
    aadhaarHash: 'sha256:7a9f8b2c1d3e4f5a6b7c8d9e0f1a2b3c',
    apaarId: 'APAAR-2023-999888',
    portal: 'National Scholarship Portal (NSP)',
    scheme: 'Post Matric Scholarship for Minorities (MoMA)',
    disbursedDate: '2024-02-15',
    sanctionRef: 'NSP/DISB/2023-24/09841',
  },
  {
    aadhaarHash: 'sha256:d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1',
    apaarId: 'APAAR-2024-003456',
    portal: 'Canara Bank SFMP (Scholarship Fellowship Management Portal)',
    scheme: 'UGC Junior Research Fellowship (JRF)',
    disbursedDate: '2024-08-20',
    sanctionRef: 'UGC/SFMP/JRF/2024/4412',
  },
];

export async function POST(req: Request) {
  try {
    const { aadhaar, apaarId, bankAccount } = await req.json();

    const computedHash = hashIdentifier(
      aadhaar || '9999-0000-1111',
      apaarId || 'APAAR-DEFAULT',
      bankAccount || 'SBIN0001234'
    );

    // Simulate registry lookup
    await new Promise((resolve) => setTimeout(resolve, 300));

    const matched = MOCK_ACTIVE_NSP_BENEFICIARIES.find(
      (b) =>
        b.apaarId.toLowerCase() === (apaarId || '').toLowerCase() ||
        b.aadhaarHash === computedHash
    );

    let result: DuplicateCheckResult;

    if (matched) {
      result = {
        isDuplicate: true,
        source: matched.portal,
        activeScheme: matched.scheme,
        message: `DUAL BENEFIT CONFLICT: Applicant active on ${matched.portal} under "${matched.scheme}" (Ref: ${matched.sanctionRef}). As per MoTA Rules, duplicate stipends are prohibited. Application frozen.`,
      };
    } else {
      result = {
        isDuplicate: false,
        message: 'CLEAN: No active disbursements detected in NSP, Canara Bank SFMP, or State e-District registries. Deduplication check PASSED.',
      };
    }

    return NextResponse.json({
      success: true,
      computedHash,
      result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Deduplication check failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
