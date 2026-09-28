/**
 * QS World University Rankings Master Dataset (For National Overseas Scholarship - NOS)
 * Source: TopUniversities QS World University Rankings
 */

export interface QSUniversity {
  rank: number;
  name: string;
  country: string;
  isEligibleTop500: boolean;
}

export const QS_WORLD_RANKINGS: QSUniversity[] = [
  { rank: 1, name: 'Massachusetts Institute of Technology (MIT)', country: 'United States', isEligibleTop500: true },
  { rank: 2, name: 'Imperial College London', country: 'United Kingdom', isEligibleTop500: true },
  { rank: 3, name: 'University of Oxford', country: 'United Kingdom', isEligibleTop500: true },
  { rank: 4, name: 'Harvard University', country: 'United States', isEligibleTop500: true },
  { rank: 5, name: 'University of Cambridge', country: 'United Kingdom', isEligibleTop500: true },
  { rank: 6, name: 'Stanford University', country: 'United States', isEligibleTop500: true },
  { rank: 7, name: 'ETH Zurich', country: 'Switzerland', isEligibleTop500: true },
  { rank: 8, name: 'National University of Singapore (NUS)', country: 'Singapore', isEligibleTop500: true },
  { rank: 9, name: 'University College London (UCL)', country: 'United Kingdom', isEligibleTop500: true },
  { rank: 10, name: 'California Institute of Technology (Caltech)', country: 'United States', isEligibleTop500: true },
  { rank: 13, name: 'The University of Melbourne', country: 'Australia', isEligibleTop500: true },
  { rank: 25, name: 'University of Toronto', country: 'Canada', isEligibleTop500: true },
  { rank: 42, name: 'The University of Tokyo', country: 'Japan', isEligibleTop500: true },
  { rank: 78, name: 'University of Zurich', country: 'Switzerland', isEligibleTop500: true },
  { rank: 154, name: 'University of Bern', country: 'Switzerland', isEligibleTop500: true },
  { rank: 489, name: 'University of South Australia', country: 'Australia', isEligibleTop500: true },
  { rank: 650, name: 'Non-Eligible Overseas College', country: 'Unknown', isEligibleTop500: false },
];

/**
 * Validates whether a foreign university satisfies the statutory QS Ranking ceiling (<= 500)
 */
export function validateQsRankForNOS(
  universityName: string
): { isEligible: boolean; rank?: number; citation: string } {
  const norm = universityName.trim().toLowerCase();

  const found = QS_WORLD_RANKINGS.find(
    (u) =>
      u.name.toLowerCase() === norm ||
      u.name.toLowerCase().includes(norm) ||
      norm.includes(u.name.toLowerCase())
  );

  if (found) {
    if (found.rank <= 500) {
      return {
        isEligible: true,
        rank: found.rank,
        citation: `ELIGIBLE FOR NOS: ${found.name} is ranked #${found.rank} in QS World University Rankings (Statutory Cut-off: Rank <= 500). PASS.`,
      };
    }
    return {
      isEligible: false,
      rank: found.rank,
      citation: `INELIGIBLE FOR NOS: ${found.name} is ranked #${found.rank} in QS Rankings, exceeding the statutory Top 500 cut-off. REJECT.`,
    };
  }

  return {
    isEligible: false,
    citation: `UNVERIFIED QS RANKING: "${universityName}" was not found in QS Top 500 Master Registry. Verification required from Indian Embassy / Mission abroad.`,
  };
}
