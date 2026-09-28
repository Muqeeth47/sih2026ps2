# CONTEXT.md — TribalScholar-AI Architecture & System Blueprint
**Ministry of Tribal Affairs (MoTA) — Government of India**  
**Problem Statement ID:** SIH26239  
**Platform Name:** TribalScholar-AI (AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes)  
**Live Production URL:** [https://sih239.vercel.app](https://sih239.vercel.app)  
**GitHub Repository:** [https://github.com/Muqeeth47/sih2026ps2](https://github.com/Muqeeth47/sih2026ps2)

---

## 1. System Overview & Statutory Mandate
TribalScholar-AI is an enterprise-grade government portal designed to eliminate manual paper scrutiny for tribal fellowships and scholarships. It integrates statutory references from:
- [https://tribal.nic.in/ScholarshiP.aspx](https://tribal.nic.in/ScholarshiP.aspx) (MoTA fellowship guidelines, income ceilings, and slot distribution)
- [https://dbttribal.gov.in/AllScheme.aspx](https://dbttribal.gov.in/AllScheme.aspx) (Direct Benefit Transfer guidelines, state quotas, and PFMS payment rules)

The portal unifies 5 statutory schemes:
1. **National Fellowship for ST (NFST)** — M.Phil / PhD research scholars (JRF/SRF)
2. **National Overseas Scholarship (NOS)** — ST students studying abroad in Top 500 QS-ranked universities
3. **Top Class Education Scheme** — ST students admitted to premier institutions (IITs, IIMs, AIIMS, NITs, NLUs)
4. **Post-Matric Scholarship for ST Students** — Class 11 through post-graduation
5. **Pre-Matric Scholarship for ST Students** — Classes 9 and 10

---

## 2. The 4 Official Government Reference Datasets (Public & Verifiable)

### Dataset A: Central Scheduled Tribes (ST) Presidential Order Master List
- **File:** `src/lib/datasets/central-st-order.ts`
- **Legal Authority:** Constitution (Scheduled Tribes) Order, 1950 (Article 342)
- **Role:** When AI extracts an applicant's sub-caste (e.g. *Chenchu*, *Meena*, *Munda*, *Gond*, *Bhil*), the system checks against this database. If the community is not notified for the declared state, the system flags an **Invalid ST Claim** immediately.

### Dataset B: Particularly Vulnerable Tribal Groups (PVTG) Master Dataset
- **File:** `src/lib/datasets/pvtg-master.ts`
- **Legal Authority:** Ministry of Tribal Affairs 75 Notified PVTG Registry across 18 States and UTs (`tribal.nic.in/pvtg.aspx`)
- **Role:** Applicants from the 75 notified PVTGs (e.g., *Birhor*, *Chenchu*, *Maria Gond*, *Sentinelese*, *Toda*, *Sahariya*) receive automated first-priority shortlisting in the Scrutiny Queue and Merit Allocation Engine.

### Dataset C: AISHE (All India Survey on Higher Education) Code Master
- **File:** `src/lib/datasets/aishe-master.ts`
- **Legal Authority:** Ministry of Education AISHE Directory (`aishe.gov.in`)
- **Role:** Validates applicant institution codes (e.g., `U-0205` for BIT Mesra, `U-0391` for Univ of Rajasthan, `U-0273` for IISER Bhopal, `U-0092` for NIT Raipur) to prevent unaccredited/bogus colleges from claiming scholarship funds.

### Dataset D: QS World University Rankings Dataset (For NOS Scheme)
- **File:** `src/lib/datasets/qs-rankings-master.ts`
- **Role:** Enforces the statutory NOS rule that foreign universities must be ranked within the Top 500 in QS World Rankings (e.g., Oxford #3, Cambridge #2, Imperial #6, MIT #1, Harvard #4). Universities outside the threshold (Rank > 500) are automatically flagged as ineligibile.

---

## 3. The 4 Document AI / OCR Evaluation Scenarios

Pre-seeded in `src/lib/datasets/ocr-scenarios.ts` and directly selectable in the Scrutiny Workbench:

| Category | Sample Document | What the AI Extracts & Validates | Statutory Outcome |
| :--- | :--- | :--- | :--- |
| **Scenario 1: Valid Pass** | Digital e-District Caste Certificate (AP MeeSeva / Odisha e-District) | Name matches Aadhaar, Sub-caste (*Chenchu*) is in Presidential Order &amp; 75 PVTG list, Digital Signature valid. | **AUTO-APPROVE** (100% Match) |
| **Scenario 2: Income Exceeded** | Tehsildar Income Certificate showing ₹8,50,000/yr | Income extracted at ₹8,50,000 exceeds ₹6,00,000 statutory cap. | **AUTO-FLAG DEFICIENCY** |
| **Scenario 3: Expired Document** | Income certificate issued in FY 2022-23 | Expired validity date (31-03-2023); current FY 2024-25 mandatory. | **PROMPT RE-UPLOAD IN 7 DAYS** |
| **Scenario 4: Duplicate Benefit** | Masked Aadhaar / APAAR active on NSP / Canara Bank SFMP | SHA-256 hash matches active UGC-JRF disbursement in external registry. | **FLAG DUAL-BENEFIT FRAUD** |

---

## 4. Isolated Firebase Architecture (Zero Cross-Talk Guarantee)
- **File:** `src/lib/firebase.ts`
- **Isolation Mechanism:** Explicit named app instance: `initializeApp(firebaseConfig, "mota-scholar-db")`.
- **Environment Namespace:** Dedicated `NEXT_PUBLIC_MOTA_FIREBASE_*` variables prevent any collision, merge, or cross-talk with your other Firebase websites.
- **Resilient Fallback:** Automatically switches to the in-memory/local storage store if external Firebase credentials are omitted or offline.

---

## 5. Browser-Native Web-Crypto Digital Signature Certificate (DSC) Engine
- **File:** `src/lib/crypto-pki.ts`
- **Standard:** W3C WebCrypto API (`crypto.subtle`)
- **Key Algorithm:** ECDSA P-256 with SHA-256 Digest
- **Capabilities:**
  - Generates authentic asymmetric keypairs in the browser.
  - Digitally signs official MoTA Gazette Sanction Orders.
  - Produces real cryptographic signature hex + public verification JWK.
  - **1-Click Verification:** Anyone can mathematically verify the signature against the payload in real-time.

---

## 6. Multi-Page Vector PDF Viewer
- **File:** `src/components/PdfViewer.tsx`
- **Features:** Page navigation (Page X of Y), zoom (75% - 150%), 90-degree page rotation, official watermark & digital signature seal rendering, and drag-and-drop support for real user `.pdf` uploads.

---

## 7. 4-Tier RBAC Architecture & Click-to-Autofill Credentials

| Level | Persona Role | Demo Credential | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Level 1** | **ST Scholar / Applicant** | `priya.meena@student.ac.in` (APAAR-2024-001234) | Smart Match wizard, encrypted vault, 7-day deficiency resolver, quarterly PhD milestone & contingency claims. |
| **Level 2** | **Institute Nodal (INO)** | `kavita.soren@bitmesra.ac.in` (BIT Mesra) | 1-click bonafide admission attestation, supervisor milestone sign-off, NOS foreign tuition forex converter. |
| **Level 3** | **MoTA Scrutiny Officer** | `rajesh.kumar@nic.in` (NIC-MOTA-DESK-42) | Split-Screen AI Document Workbench, 4 OCR test scenarios, Central ST Order & PVTG cross-checks, SMS/WhatsApp notice dispatch. |
| **Level 4** | **Ministry Admin / Joint Secretary** | `js.tribal@mota.gov.in` (MoTA New Delhi) | KPI analytics, dynamic rules editor, composite merit calculation with quotas, WebCrypto DSC digital signing, PFMS DBT batch generator. |
