export type SupportedLang = 'en' | 'hi' | 'sat';

export interface TranslationDictionary {
  // Navigation
  govOfIndia: string;
  home: string;
  scholarships: string;
  fellowships: string;
  howItWorks: string;
  help: string;
  signIn: string;
  dashboard: string;
  logout: string;

  // Hero Section
  nationalArchitectureBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  findScholarshipsBtn: string;
  applyNowBtn: string;

  // Key Stats
  totalApplicants: string;
  dbtDisbursed: string;
  femaleScholarRatio: string;
  pvtgBeneficiaries: string;

  // How it works
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Featured schemes
  featuredTitle: string;
  viewAll: string;
  checkEligibility: string;
}

export const TRANSLATIONS: Record<SupportedLang, TranslationDictionary> = {
  en: {
    govOfIndia: 'Government of India',
    home: 'Home',
    scholarships: 'Scholarships',
    fellowships: 'Fellowships',
    howItWorks: 'How it Works',
    help: 'Help & FAQ',
    signIn: 'Sign In',
    dashboard: 'Dashboard',
    logout: 'Log Out',

    nationalArchitectureBadge: 'SIH-26239 NATIONAL ARCHITECTURE',
    heroTitle: 'Scholarships & Fellowships for Scheduled Tribe Students',
    heroSubtitle: 'Apply for National Fellowship for ST (NFST), National Overseas Scholarship (NOS), and Premier Institute Schemes through a unified, AI-enabled national portal.',
    findScholarshipsBtn: 'Find Scholarships',
    applyNowBtn: 'Apply Now',

    totalApplicants: 'Total Applicants',
    dbtDisbursed: 'DBT Disbursed',
    femaleScholarRatio: 'Female Scholar Ratio',
    pvtgBeneficiaries: 'PVTG Beneficiaries',

    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'A streamlined, AI-assisted process to apply and track your scholarship journey.',
    step1Title: 'Find a Scheme',
    step1Desc: 'Browse available scholarships based on your eligibility criteria.',
    step2Title: 'Check Eligibility',
    step2Desc: 'Use the Smart Match Wizard to verify your qualifications.',
    step3Title: 'Submit Application',
    step3Desc: 'Upload documents securely for automated AI scrutiny and DigiLocker verification.',
    step4Title: 'Track Application',
    step4Desc: 'Monitor your status with real-time updates until direct DBT disbursement.',

    featuredTitle: 'Featured Scholarships & Fellowships',
    viewAll: 'View all',
    checkEligibility: 'Check Eligibility →',
  },
  hi: {
    govOfIndia: 'भारत सरकार | जनजातीय कार्य मंत्रालय',
    home: 'मुख्य पृष्ठ',
    scholarships: 'छात्रवृत्तियां',
    fellowships: 'फैलोशिप योजनाएं',
    howItWorks: 'यह कैसे काम करता है',
    help: 'सहायता एवं प्रश्नोत्तर',
    signIn: 'लॉग इन करें',
    dashboard: 'डैशबोर्ड',
    logout: 'लॉग आउट',

    nationalArchitectureBadge: 'एसआईएच-26239 राष्ट्रीय डिजिटल वास्तुकला',
    heroTitle: 'अनुसूचित जनजाति के छात्रों के लिए राष्ट्रीय छात्रवृत्ति एवं फैलोशिप',
    heroSubtitle: 'राष्ट्रीय फैलोशिप (NFST), राष्ट्रीय प्रवासी छात्रवृत्ति (NOS), एवं शीर्ष संस्थानों के लिए एकीकृत, एआई-सक्षम राष्ट्रीय पोर्टल के माध्यम से सीधे आवेदन करें।',
    findScholarshipsBtn: 'छात्रवृत्तियां खोजें',
    applyNowBtn: 'अभी आवेदन करें',

    totalApplicants: 'कुल पंजीकृत आवेदक',
    dbtDisbursed: 'डीबीटी संवितरित राशि',
    femaleScholarRatio: 'महिला छात्र अनुपात',
    pvtgBeneficiaries: 'पीवीटीजी लाभार्थी',

    howItWorksTitle: 'आवेदन प्रक्रिया कैसे कार्य करती है',
    howItWorksSubtitle: 'आपकी छात्रवृत्ति यात्रा को पारदर्शी और सुगम बनाने के लिए 4-चरणीय एआई प्रणाली।',
    step1Title: 'योजना चुनें',
    step1Desc: 'अपनी योग्यता और पाठ्यक्रम के आधार पर केंद्रीय योजनाओं की सूची देखें।',
    step2Title: 'पात्रता जांचें',
    step2Desc: 'स्मार्ट मैच विज़ार्ड का उपयोग करके तुरंत अपनी पात्रता सत्यापित करें।',
    step3Title: 'दस्तावेज़ जमा करें',
    step3Desc: 'डिजिलॉकर से 1-क्लिक में प्रमाणित जाति एवं आय प्रमाण पत्र संलग्न करें।',
    step4Title: 'आवेदन ट्रैक करें',
    step4Desc: 'अधिकारियों द्वारा सत्यापन से लेकर बैंक खाते में डीबीटी भुगतान तक लाइव स्टेटस देखें।',

    featuredTitle: 'प्रमुख छात्रवृत्तियां एवं फैलोशिप',
    viewAll: 'सभी देखें',
    checkEligibility: 'पात्रता जांचें →',
  },
  sat: {
    govOfIndia: 'ᱥᱤᱧᱚᱛ ᱥᱚᱨᱠᱟᱨ | ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱢᱚᱱᱛᱨᱟᱲᱚᱭ',
    home: 'ᱚᱲᱟᱜ',
    scholarships: 'ᱥᱠᱚᱞᱟᱨᱥᱤᱯ',
    fellowships: 'ᱯᱷᱮᱞᱳᱥᱤᱯ',
    howItWorks: 'ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱟᱹᱢᱤᱭᱟ',
    help: 'ᱜᱚᱲᱚ',
    signIn: 'ᱵᱚᱞᱚᱱ ᱢᱮ',
    dashboard: 'ᱰᱮᱥᱵᱳᱨᱰ',
    logout: 'ᱵᱟᱦᱨᱮᱜ ᱢᱮ',

    nationalArchitectureBadge: 'SIH-26239 ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱯᱳᱨᱴᱟᱞ',
    heroTitle: 'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ (ST) ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ',
    heroSubtitle: 'ᱮᱱ.ᱮᱯᱷ.ᱮᱥ.ᱴᱤ (NFST), ᱵᱤᱫᱮᱥ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ (NOS) ᱟᱨ ᱪᱮᱛᱟᱱ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱞᱟᱹᱜᱤᱫ ᱮ.ᱟᱭᱤ. ᱫᱟᱨᱟᱭ ᱛᱮ ᱮᱯᱞᱟᱭ ᱢᱮ᱾',
    findScholarshipsBtn: 'ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ',
    applyNowBtn: 'ᱱᱤᱛ ᱜᱮ ᱮᱯᱞᱟᱭ ᱢᱮ',

    totalApplicants: 'ᱞᱮᱠᱷᱟ ᱟᱨᱡᱤᱭᱟᱹ',
    dbtDisbursed: 'ᱰᱤ.ᱵᱤ.ᱴᱤ ᱴᱟᱠᱟ',
    femaleScholarRatio: 'ᱠᱩᱲᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
    pvtgBeneficiaries: 'PVTG ᱜᱟᱫᱮᱞ',

    howItWorksTitle: 'ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱟᱹᱢᱤᱭᱟ',
    howItWorksSubtitle: 'ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱧᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱔ ᱴᱷᱟᱶ ᱟᱞᱜᱟ ᱰᱟᱦᱟᱨ᱾',
    step1Title: '᱑. ᱡᱚᱡᱚᱱᱟ ᱵᱟᱪᱷᱟᱣ',
    step1Desc: 'ᱟᱢᱟᱜ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱧᱟᱢ ᱢᱮ᱾',
    step2Title: '᱒. ᱞᱟᱹᱠᱛᱤ ᱧᱮᱞ',
    step2Desc: 'ᱥᱢᱟᱨᱴ ᱣᱤᱡᱟᱨᱰ ᱛᱮ ᱞᱟᱹᱠᱛᱤ ᱵᱤᱰᱟᱹᱣ ᱢᱮ᱾',
    step3Title: '᱓. ᱥᱟᱠᱟᱢ ᱮᱢ',
    step3Desc: 'ᱰᱤᱡᱤᱞᱚᱠᱟᱨ ᱠᱷᱚᱱ ᱥᱟᱹᱵᱩᱛ ᱥᱟᱠᱟᱢ ᱞᱟᱫᱮ ᱢᱮ᱾',
    step4Title: '᱔. ᱴᱨᱟᱠ ᱢᱮ',
    step4Desc: 'ᱵᱮᱸᱠ ᱮᱠᱟᱣᱩᱸᱴ ᱨᱮ ᱴᱟᱠᱟ ᱵᱚᱞᱚ ᱦᱟᱹᱵᱤᱡ ᱧᱮᱞ ᱢᱮ᱾',

    featuredTitle: 'ᱢᱩᱬᱩᱛ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱟᱨ ᱯᱷᱮᱞᱳᱥᱤᱯ',
    viewAll: 'ᱡᱚᱛᱚ ᱧᱮᱞ',
    checkEligibility: 'ᱞᱟᱹᱠᱛᱤ ᱧᱮᱞ ᱢᱮ →',
  },
};
