/**
 * AISHE (All India Survey on Higher Education) Code Master Dataset
 * Validates accredited Universities, Premier Institutes, and Colleges
 * Source: Ministry of Education (aishe.gov.in)
 */

export interface AISHEInstitution {
  aisheCode: string;
  name: string;
  type: 'CENTRAL_UNIVERSITY' | 'STATE_UNIVERSITY' | 'IIT' | 'IIM' | 'NIT' | 'IISER' | 'AIIMS' | 'COLLEGE';
  state: string;
  district: string;
  isPremierTopClass: boolean; // Eligible for Top Class Education Scheme
}

export const AISHE_MASTER_DATASET: AISHEInstitution[] = [
  {
    aisheCode: 'U-0205',
    name: 'Birla Institute of Technology, Mesra',
    type: 'STATE_UNIVERSITY',
    state: 'Jharkhand',
    district: 'Ranchi',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0391',
    name: 'University of Rajasthan',
    type: 'STATE_UNIVERSITY',
    state: 'Rajasthan',
    district: 'Jaipur',
    isPremierTopClass: false,
  },
  {
    aisheCode: 'U-0273',
    name: 'Indian Institute of Science Education and Research (IISER), Bhopal',
    type: 'IISER',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0092',
    name: 'National Institute of Technology (NIT), Raipur',
    type: 'NIT',
    state: 'Chhattisgarh',
    district: 'Raipur',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0120',
    name: 'Indian Institute of Technology (IIT), Delhi',
    type: 'IIT',
    state: 'Delhi',
    district: 'New Delhi',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0053',
    name: 'Indian Institute of Technology (IIT), Bombay',
    type: 'IIT',
    state: 'Maharashtra',
    district: 'Mumbai',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0109',
    name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    type: 'AIIMS',
    state: 'Delhi',
    district: 'New Delhi',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0220',
    name: 'Indian Institute of Management (IIM), Ahmedabad',
    type: 'IIM',
    state: 'Gujarat',
    district: 'Ahmedabad',
    isPremierTopClass: true,
  },
  {
    aisheCode: 'U-0355',
    name: 'Utkal University',
    type: 'STATE_UNIVERSITY',
    state: 'Odisha',
    district: 'Bhubaneswar',
    isPremierTopClass: false,
  },
  {
    aisheCode: 'U-0014',
    name: 'Andhra University',
    type: 'STATE_UNIVERSITY',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    isPremierTopClass: false,
  },
];

/**
 * Validates an institution against the AISHE Directory
 */
export function validateAisheCode(
  identifier: string
): { isValid: boolean; institution?: AISHEInstitution; validationNotice: string } {
  const norm = identifier.trim().toLowerCase();

  const found = AISHE_MASTER_DATASET.find(
    (inst) =>
      inst.aisheCode.toLowerCase() === norm ||
      inst.name.toLowerCase().includes(norm) ||
      norm.includes(inst.name.toLowerCase())
  );

  if (found) {
    return {
      isValid: true,
      institution: found,
      validationNotice: `ACCREDITED: ${found.name} (AISHE Code: ${found.aisheCode}). Eligible for MoTA Statutory Scheme disbursals.`,
    };
  }

  return {
    isValid: false,
    validationNotice: `UNVERIFIED INSTITUTION: "${identifier}" not found in MoE AISHE Master Database. Requires physical verification of affiliation seal.`,
  };
}
