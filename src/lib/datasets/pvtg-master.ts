/**
 * Master List of 75 Particularly Vulnerable Tribal Groups (PVTGs)
 * Source: Ministry of Tribal Affairs (tribal.nic.in/pvtg.aspx) & PIB Government of India
 */

export interface PVTGEntry {
  state: string;
  pvtgName: string;
}

export const PVTG_MASTER_LIST: PVTGEntry[] = [
  // Andhra Pradesh & Telangana (12)
  { state: 'Andhra Pradesh', pvtgName: 'Chenchu' },
  { state: 'Andhra Pradesh', pvtgName: 'Bodo Gadaba' },
  { state: 'Andhra Pradesh', pvtgName: 'Bondo Poroja' },
  { state: 'Andhra Pradesh', pvtgName: 'Dongria Kondh' },
  { state: 'Andhra Pradesh', pvtgName: 'Gutob Gadaba' },
  { state: 'Andhra Pradesh', pvtgName: 'Khond Poroja' },
  { state: 'Andhra Pradesh', pvtgName: 'Kolam' },
  { state: 'Andhra Pradesh', pvtgName: 'Konda Reddis' },
  { state: 'Andhra Pradesh', pvtgName: 'Konda Savaras' },
  { state: 'Andhra Pradesh', pvtgName: 'Kuttiya Kondh' },
  { state: 'Andhra Pradesh', pvtgName: 'Parangiperja' },
  { state: 'Andhra Pradesh', pvtgName: 'Thoti' },

  // Bihar & Jharkhand (9)
  { state: 'Jharkhand', pvtgName: 'Asur' },
  { state: 'Jharkhand', pvtgName: 'Birhor' },
  { state: 'Jharkhand', pvtgName: 'Birjia' },
  { state: 'Jharkhand', pvtgName: 'Hill Kharia' },
  { state: 'Jharkhand', pvtgName: 'Korwa' },
  { state: 'Jharkhand', pvtgName: 'Mal Paharia' },
  { state: 'Jharkhand', pvtgName: 'Parhaiya' },
  { state: 'Jharkhand', pvtgName: 'Sauria Paharia' },
  { state: 'Jharkhand', pvtgName: 'Savar' },

  // Gujarat (5)
  { state: 'Gujarat', pvtgName: 'Kathodi' },
  { state: 'Gujarat', pvtgName: 'Kotwalia' },
  { state: 'Gujarat', pvtgName: 'Kolgha' },
  { state: 'Gujarat', pvtgName: 'Padhar' },
  { state: 'Gujarat', pvtgName: 'Siddi' },

  // Karnataka (2)
  { state: 'Karnataka', pvtgName: 'Jenu Kuruba' },
  { state: 'Karnataka', pvtgName: 'Koraga' },

  // Kerala (5)
  { state: 'Kerala', pvtgName: 'Cholanaickan' },
  { state: 'Kerala', pvtgName: 'Kadar' },
  { state: 'Kerala', pvtgName: 'Kattunayakan' },
  { state: 'Kerala', pvtgName: 'Kurumbas' },
  { state: 'Kerala', pvtgName: 'Koraga' },

  // Madhya Pradesh & Chhattisgarh (7)
  { state: 'Madhya Pradesh', pvtgName: 'Abujh Maria' },
  { state: 'Madhya Pradesh', pvtgName: 'Baiga' },
  { state: 'Madhya Pradesh', pvtgName: 'Bharia' },
  { state: 'Madhya Pradesh', pvtgName: 'Birhor' },
  { state: 'Madhya Pradesh', pvtgName: 'Hill Korwa' },
  { state: 'Madhya Pradesh', pvtgName: 'Kamar' },
  { state: 'Madhya Pradesh', pvtgName: 'Saharia' },

  // Maharashtra (3)
  { state: 'Maharashtra', pvtgName: 'Katkari' },
  { state: 'Maharashtra', pvtgName: 'Kolam' },
  { state: 'Maharashtra', pvtgName: 'Maria Gond' },

  // Manipur (1)
  { state: 'Manipur', pvtgName: 'Maram' },

  // Odisha (13)
  { state: 'Odisha', pvtgName: 'Birhor' },
  { state: 'Odisha', pvtgName: 'Bondo' },
  { state: 'Odisha', pvtgName: 'Chuktia Bhunjia' },
  { state: 'Odisha', pvtgName: 'Didayi' },
  { state: 'Odisha', pvtgName: 'Dongria Kondh' },
  { state: 'Odisha', pvtgName: 'Juang' },
  { state: 'Odisha', pvtgName: 'Kharia' },
  { state: 'Odisha', pvtgName: 'Kutia Kandha' },
  { state: 'Odisha', pvtgName: 'Lanjia Saora' },
  { state: 'Odisha', pvtgName: 'Lodha' },
  { state: 'Odisha', pvtgName: 'Mankidia' },
  { state: 'Odisha', pvtgName: 'Paudi Bhuyans' },
  { state: 'Odisha', pvtgName: 'Saura' },

  // Rajasthan (1)
  { state: 'Rajasthan', pvtgName: 'Sahariya' },
  { state: 'Rajasthan', pvtgName: 'Seharia' },

  // Tamil Nadu (6)
  { state: 'Tamil Nadu', pvtgName: 'Irular' },
  { state: 'Tamil Nadu', pvtgName: 'Kattunayakan' },
  { state: 'Tamil Nadu', pvtgName: 'Kota' },
  { state: 'Tamil Nadu', pvtgName: 'Kurumbas' },
  { state: 'Tamil Nadu', pvtgName: 'Paniyan' },
  { state: 'Tamil Nadu', pvtgName: 'Toda' },

  // Tripura (1)
  { state: 'Tripura', pvtgName: 'Riang' },

  // Uttar Pradesh & Uttarakhand (2)
  { state: 'Uttar Pradesh', pvtgName: 'Buksa' },
  { state: 'Uttar Pradesh', pvtgName: 'Raji' },

  // West Bengal (3)
  { state: 'West Bengal', pvtgName: 'Birhor' },
  { state: 'West Bengal', pvtgName: 'Lodha' },
  { state: 'West Bengal', pvtgName: 'Toto' },

  // Andaman & Nicobar Islands (5)
  { state: 'Andaman & Nicobar Islands', pvtgName: 'Great Andamanese' },
  { state: 'Andaman & Nicobar Islands', pvtgName: 'Jarawa' },
  { state: 'Andaman & Nicobar Islands', pvtgName: 'Onge' },
  { state: 'Andaman & Nicobar Islands', pvtgName: 'Sentinelese' },
  { state: 'Andaman & Nicobar Islands', pvtgName: 'Shompen' },
];

/**
 * Checks whether a candidate belongs to a notified Particularly Vulnerable Tribal Group
 */
export function checkIsPVTG(
  tribe: string,
  state?: string
): { isPVTG: boolean; pvtgName?: string; notificationDetails: string } {
  const normalized = tribe.trim().toLowerCase();

  const match = PVTG_MASTER_LIST.find((p) => {
    const pvtgNorm = p.pvtgName.toLowerCase();
    const stateMatches = !state || p.state.toLowerCase() === state.trim().toLowerCase();
    return (pvtgNorm === normalized || normalized.includes(pvtgNorm) || pvtgNorm.includes(normalized)) && stateMatches;
  });

  if (match) {
    return {
      isPVTG: true,
      pvtgName: match.pvtgName,
      notificationDetails: `NOTIFIED PVTG: ${match.pvtgName} (${match.state}). Eligible for Direct First-Priority Fellowship Shortlisting as per MoTA Gazette Mandates.`,
    };
  }

  return {
    isPVTG: false,
    notificationDetails: `Standard ST Classification (Not listed among 75 notified PVTGs).`,
  };
}
