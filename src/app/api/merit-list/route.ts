import { NextResponse } from 'next/server';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { computeCompositeScore } from '@/lib/utils';
import type { MeritListEntry } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { schemeCode = 'NFST', totalSeats = 10 } = await req.json();

    // Filter relevant eligible applications
    const candidates = MOCK_APPLICATIONS.filter(
      (a) => a.schemeCode === schemeCode || schemeCode === 'ALL'
    );

    // Compute composite scores
    const scoredCandidates = candidates.map((c) => {
      // Find QS rank if available in documents
      const offerDoc = c.documents.find((d) => d.type === 'OFFER_LETTER');
      const qsRankStr = offerDoc?.aiExtraction?.extractedFields?.qsRank;
      const qsRank = qsRankStr ? parseInt(qsRankStr, 10) : undefined;
      const composite = computeCompositeScore(c.pgMarksPercent, qsRank);

      return {
        ...c,
        compositeScore: composite,
      };
    });

    // Sort descending by composite score
    scoredCandidates.sort((a, b) => b.compositeScore - a.compositeScore);

    const meritList: MeritListEntry[] = [];
    const femaleQuotaSeats = Math.ceil(totalSeats * 0.3);
    const pwdQuotaSeats = Math.ceil(totalSeats * 0.05);

    let femaleFilled = 0;
    let pwdFilled = 0;

    // 1. PVTG Priority Shortlisting
    scoredCandidates
      .filter((c) => c.isPVTG)
      .forEach((c) => {
        if (meritList.length < totalSeats) {
          meritList.push({
            rank: meritList.length + 1,
            applicationId: c.id,
            applicantName: c.applicantName,
            apaarId: c.apaarId,
            state: c.state,
            institution: c.institution,
            pgMarksPercent: c.pgMarksPercent,
            compositeScore: c.compositeScore,
            gender: c.gender,
            isPwD: c.isPwD,
            isPVTG: true,
            category: 'PVTG_PRIORITY',
            status: 'SELECTED',
          });
          if (c.gender === 'FEMALE') femaleFilled++;
          if (c.isPwD) pwdFilled++;
        }
      });

    // 2. PwD Quota (5%)
    scoredCandidates
      .filter((c) => c.isPwD && !meritList.some((m) => m.applicationId === c.id))
      .forEach((c) => {
        if (pwdFilled < pwdQuotaSeats && meritList.length < totalSeats) {
          meritList.push({
            rank: meritList.length + 1,
            applicationId: c.id,
            applicantName: c.applicantName,
            apaarId: c.apaarId,
            state: c.state,
            institution: c.institution,
            pgMarksPercent: c.pgMarksPercent,
            compositeScore: c.compositeScore,
            gender: c.gender,
            isPwD: true,
            isPVTG: c.isPVTG,
            category: 'PWD_QUOTA',
            status: 'SELECTED',
          });
          pwdFilled++;
          if (c.gender === 'FEMALE') femaleFilled++;
        }
      });

    // 3. Female Quota (30%)
    scoredCandidates
      .filter((c) => c.gender === 'FEMALE' && !meritList.some((m) => m.applicationId === c.id))
      .forEach((c) => {
        if (femaleFilled < femaleQuotaSeats && meritList.length < totalSeats) {
          meritList.push({
            rank: meritList.length + 1,
            applicationId: c.id,
            applicantName: c.applicantName,
            apaarId: c.apaarId,
            state: c.state,
            institution: c.institution,
            pgMarksPercent: c.pgMarksPercent,
            compositeScore: c.compositeScore,
            gender: 'FEMALE',
            isPwD: c.isPwD,
            isPVTG: c.isPVTG,
            category: 'FEMALE_QUOTA',
            status: 'SELECTED',
          });
          femaleFilled++;
        }
      });

    // 4. Open General ST Merit (Remaining Seats, including unfulfilled quota rollover)
    scoredCandidates
      .filter((c) => !meritList.some((m) => m.applicationId === c.id))
      .forEach((c) => {
        if (meritList.length < totalSeats) {
          meritList.push({
            rank: meritList.length + 1,
            applicationId: c.id,
            applicantName: c.applicantName,
            apaarId: c.apaarId,
            state: c.state,
            institution: c.institution,
            pgMarksPercent: c.pgMarksPercent,
            compositeScore: c.compositeScore,
            gender: c.gender,
            isPwD: c.isPwD,
            isPVTG: c.isPVTG,
            category: 'GENERAL_ST',
            status: 'SELECTED',
          });
        } else {
          meritList.push({
            rank: meritList.length + 1,
            applicationId: c.id,
            applicantName: c.applicantName,
            apaarId: c.apaarId,
            state: c.state,
            institution: c.institution,
            pgMarksPercent: c.pgMarksPercent,
            compositeScore: c.compositeScore,
            gender: c.gender,
            isPwD: c.isPwD,
            isPVTG: c.isPVTG,
            category: 'GENERAL_ST',
            status: 'WAITLISTED',
          });
        }
      });

    return NextResponse.json({
      success: true,
      schemeCode,
      totalSeats,
      stats: {
        totalEvaluated: scoredCandidates.length,
        selected: meritList.filter((m) => m.status === 'SELECTED').length,
        femaleFilled,
        femaleQuotaSeats,
        pvtgSelected: meritList.filter((m) => m.category === 'PVTG_PRIORITY').length,
        pwdSelected: meritList.filter((m) => m.category === 'PWD_QUOTA').length,
        sanctionOrderNumber: `MOTA/SCHOLARSHIP/SANCTION/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
        generatedAt: new Date().toISOString(),
        eSignHash: 'SHA256:7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C',
      },
      meritList,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Merit calculation failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
