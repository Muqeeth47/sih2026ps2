# TribalScholar-AI 🇮🇳
> **AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes**  
> **Problem Statement ID:** SIH-26239 | **Ministry:** Ministry of Tribal Affairs (MoTA) | **Theme:** Smart Education  
> **Live Production Portal:** [https://sih239.vercel.app](https://sih239.vercel.app) | **Team:** Abdul Muqeeth

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI_Engine-Gemini_3.6_Flash-4285F4?style=flat&logo=google)](https://ai.google.dev/)
[![WebCrypto PKI](https://img.shields.io/badge/Security-W3C_WebCrypto_ECDSA-10b981?style=flat)](https://www.w3.org/TR/WebCryptoAPI/)
[![Vercel Status](https://img.shields.io/badge/Deployment-Vercel_Production-success?style=flat&logo=vercel)](https://sih239.vercel.app)

---

## 📌 1. The Challenge (Problem Statement SIH-26239)

Over **7 crore Scheduled Tribe (ST) scholars** across India face severe bottlenecks in accessing higher education scholarships under 5 statutory Ministry of Tribal Affairs schemes:
1. **6–8 Week Scrutiny Delays:** Manual physical inspection of paper certificates causes severe semester backlog.
2. **Zero Cross-Scheme Deduplication:** Inability to cross-verify beneficiaries drawing concurrent scholarships across National Fellowship (NFST), Post-Matric, and State portals.
3. **Complex Statutory Verification:** Checking sub-castes against Constitution Article 342 Presidential Orders across different States and identifying Particularly Vulnerable Tribal Groups (PVTGs) is error-prone.
4. **Middlemen & Audit Gaps:** Absence of digital cryptographic sanction orders and automated Direct Benefit Transfer (DBT) pipelines leads to administrative leakage.

---

## 💡 2. The Solution: TribalScholar-AI

**TribalScholar-AI** is a production-grade, end-to-end digital governance platform that replaces weeks of manual scrutiny with sub-minute multimodal AI verification, constitutional quota automation, cryptographic digital signing, and PFMS DBT batch disbursals.

### 🌟 Key Architectural Innovations

* 🏛️ **Government Enterprise Light Design:** Engineered with a clean, high-density light mode layout (`#FFFFFF` cards, `#F8FAFC` background, deep navy `#0F2A5E` headers, and forest green accents) matching Government of India design directives.
* 🤖 **Live Multimodal Document AI (Gemini 3.6 / Flash):** Processes uploaded certificates (caste, income, marksheet, foreign offer letter), extracting structured data while flagging blur, digital tampering, pixel anomalies, and validity expiry. Features an offline deterministic sandbox fallback.
* 📜 **4 Official Statutory Reference Masters (`src/lib/datasets/`):**
  - **Article 342 Central ST Presidential Order:** Statutory gazette listings for Rajasthan, Jharkhand, Madhya Pradesh, Odisha, Chhattisgarh, Andhra Pradesh, Gujarat, Maharashtra.
  - **75 Notified PVTG Master:** Automated priority shortlisting for Birhor, Chenchu, Maria Gond, Sahariya, Baiga, etc.
  - **AISHE University Code Registry:** Validates institutional bonafides (NIRF / MoE AISHE codes).
  - **QS World University Top-500 Master:** Automatic scoring for National Overseas Scholarship (NOS) applicants.
* 🔐 **W3C WebCrypto ECDSA P-256 Digital Signature Certificates (DSC):** Browser-native asymmetric cryptography allowing Ministry Administrators to mathematically sign Gazette Sanction Orders with tamper-proof digital seals.
* 🔍 **Dual SHA-256 National Deduplication Engine:** Hashes Aadhaar and APAAR IDs against NSP 2.0 and Canara Bank SFMP registries to instantly catch duplicate claims.
* ⏳ **7-Day Statutory Deficiency Resolver (Rule 14A):** Live countdown ticker giving applicants exactly 7 days to cure deficient documents with SMS and WhatsApp alert simulations.
* 💸 **PFMS ISO 20022 DBT Disbursals:** Automated batch XML generator for direct credit into verified scholar bank accounts.
* 📄 **Multi-Page Vector PDF Canvas Viewer:** In-browser document inspection tool with multi-page navigation, zoom, and orientation controls.

---

## 👥 3. Four-Tier Role-Based Access Control (RBAC)

The portal features a **Single-Frame Landing Matrix** with **1-Click Click-to-Autofill Credentials** for all 4 administrative tiers:

| Tier | Role | Simulated Persona | Key Capabilities |
|---|---|---|---|
| **Level 1** | **ST Scholar / Applicant** | Priya Meena (*Univ of Rajasthan*) | Dynamic Smart-Match Wizard, Encrypted Vault, 7-Day Deficiency Resolver, Quarterly Fellowship Tracker |
| **Level 2** | **Institute Nodal (INO)** | Dr. Kavita Soren (*BIT Mesra*) | 1-Click Bonafide Attestation, Research Guide Milestone Sign-Off, NOS Foreign Tuition Forex Converter |
| **Level 3** | **MoTA Scrutiny Officer** | Rajesh Kumar, IAS (*NIC Desk 42*) | Split-Screen AI Workbench, Multi-Page Vector PDF Viewer, Article 342 ST Validator, SMS/WhatsApp Dispatch |
| **Level 4** | **Joint Secretary (Admin)** | Apex Policy Administrator | National KPI Dashboard, Statutory Rule Configurator, Quota Engine (30% Female + 5% PwD + PVTG), WebCrypto DSC Signing |

---

## 📚 4. Five Statutory MoTA Schemes Supported

| Scheme Code | Scheme Name | Income Ceiling | Academic Cutoff | Monthly Support | Quota Enforcements |
|---|---|---|---|---|---|
| **NFST** | National Fellowship for Scheduled Tribes | ₹6,00,000 / yr | 55% Marks | ₹31,000 / mo | 30% Female, 5% PwD, PVTG Priority |
| **NOS** | National Overseas Scholarship | ₹8,00,000 / yr | 60% Marks | ₹1,50,000 / mo | Top 500 QS Foreign Universities |
| **TOP_CLASS** | Top Class Education Scheme (IITs/IIMs/AIIMS) | ₹6,00,000 / yr | 60% Marks | ₹75,000 / mo | Premier AISHE Institutions |
| **POST_MATRIC**| Post-Matric Scholarship for ST Students | ₹2,50,000 / yr | 45% Marks | ₹8,000 / mo | Universal Post-Secondary Coverage |
| **PRE_MATRIC** | Pre-Matric Scholarship (Classes 9–10) | ₹2,50,000 / yr | 40% Marks | ₹3,500 / mo | Direct DBT to Legal Guardian |

---

## 🏗️ 5. Technical Architecture Flow

```
[ FRONTEND LAYER ]
  • Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5
  • Tailwind CSS v4 (Light Enterprise Theme: White #FFFFFF, Navy #0F2A5E, Forest Green #16A34A)
  • Zustand State Engine with bidirectional URL query persistence (?role=&tab=&appId=)
  • Multi-page vector PDF canvas renderer + real-time form validation
         │
         ▼  (HTTPS / REST Route Handlers)
[ BACKEND API LAYER (Next.js Serverless Edge) ]
  • /api/verify-doc  ──► Multimodal Document AI & OCR Extraction
  • /api/dedup       ──► Dual SHA-256 National Deduplication Engine
  • /api/merit-list  ──► Automated Statutory Quota & Composite Merit Allocator
  • /api/schemes     ──► Real-time Configurable Policy Rules Registry
         │
         ├────────────────────────────────────────┬────────────────────────────────────────┐
         ▼                                        ▼                                        ▼
[ AI & SCRUTINY ENGINE ]               [ STATUTORY DATASETS ]               [ DATABASE & STORAGE ]
  • Google Gemini 3.6 / Flash            • Central ST Presidential Order      • Firebase Firestore
    (OCR & Anomaly Detection)              (Article 342 Gazette Master)         (Isolated "mota-scholar-db")
  • Deterministic Gov Rule Validator     • 75-PVTG Master Registry            • Firebase Storage
  • Multi-Page PDF Document Parser       • AISHE Code Master (NIRF/MoE)         (AES-256 Encrypted Vault)
                                         • QS World Top-500 Master            • Digilocker / ADV API Mock
         │                                        │                                        │
         └────────────────────────────────────────┼────────────────────────────────────────┘
                                                  ▼
[ CRYPTOGRAPHIC SECURITY & GOVERNMENT INTEGRATION LAYER ]
  • W3C WebCrypto API: ECDSA P-256 SHA-256 In-Browser Digital Signature Certificates (DSC)
  • Gazette Sanction Order PDF Generation (Tamper-Proof Digital Seal)
  • PFMS ISO 20022 XML Batch Dispatcher (Direct Benefit Transfer to Beneficiary Bank Accounts)
  • SMS / WhatsApp Deficiency Notification Gateway
```

---

## 📁 6. Repository Structure

```
├── presentation-assets/                    # High-resolution (2880x1800) light-mode screenshots
│   ├── slide1_landing_overview.png
│   ├── slide2_applicant_dashboard.png
│   ├── slide3_ai_scrutiny_workbench.png
│   ├── slide4_merit_list_dsc.png
│   ├── slide5_kpi_dashboard.png
│   └── slide6_scheme_rules.png
├── scripts/
│   └── screenshot-slides.js                # Puppeteer script for automated slide screenshots
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dedup/route.ts              # National deduplication endpoint
│   │   │   ├── merit-list/route.ts         # Automated quota & merit ranking engine
│   │   │   ├── schemes/route.ts            # Configurable statutory scheme rules
│   │   │   └── verify-doc/route.ts         # Gemini 3.6 / Flash Document AI endpoint
│   │   ├── globals.css                     # Light mode enterprise CSS & print stylesheet
│   │   ├── layout.tsx                      # Root layout with MoTA metadata
│   │   └── page.tsx                        # Unified single-portal matrix & RBAC router
│   ├── components/
│   │   ├── AdminView.tsx                   # Apex KPI, Rule Editor, Merit & DSC Engine
│   │   ├── ApplicantView.tsx               # Scholar Console, Smart Match & 7-Day Resolver
│   │   ├── InoView.tsx                     # College INO Attestation & Forex Liaison
│   │   ├── ScrutinyOfficerWorkbench.tsx    # Split-Screen AI Workbench & PDF Viewer
│   │   ├── PdfViewer.tsx                   # Multi-page vector PDF viewer component
│   │   ├── Header.tsx                      # MoTA light navbar & RBAC switcher
│   │   ├── Footer.tsx                      # Government footer & statutory compliance
│   │   └── TermsPrivacyModal.tsx           # DPDP Act 2023 & ADV compliance modal
│   └── lib/
│       ├── datasets/
│       │   ├── central-st-order.ts         # Article 342 Presidential ST Order master
│       │   ├── pvtg-master.ts              # 75 Notified PVTG communities
│       │   ├── aishe-master.ts             # AISHE University Code master
│       │   ├── qs-rankings-master.ts       # Top 500 QS World University rankings
│       │   └── ocr-scenarios.ts            # 4 official Document AI test cases
│       ├── crypto-pki.ts                   # W3C WebCrypto ECDSA P-256 DSC engine
│       ├── firebase.ts                     # Isolated named Firebase app configuration
│       ├── mock-data.ts                    # Realistic MoTA production datasets
│       ├── store.ts                        # Zustand store with URL param sync
│       ├── types.ts                        # TypeScript domain model interfaces
│       └── utils.ts                        # Formatter utilities & theme tokens
├── sih2026_presentation_slides.md          # 6-Slide presentation deck specification
├── CONTEXT.md                              # Complete technical documentation
├── .env.example                            # Environment template
└── vercel.json
```

---

## 🚀 7. Getting Started

### Prerequisites
* Node.js v20+ 
* npm v10+

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/Muqeeth47/sih2026ps2.git
cd sih2026ps2

# Install dependencies
npm install

# Configure environment variables (optional for live Gemini API)
cp .env.example .env.local

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### Environment Configuration (`.env.local`)
```env
# Google Gemini API Key for Live Multimodal Document OCR (Optional)
# If omitted, the system seamlessly falls back to the deterministic sandbox engine.
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Isolated Firebase Instance (Optional)
NEXT_PUBLIC_MOTA_FIREBASE_API_KEY=
NEXT_PUBLIC_MOTA_FIREBASE_PROJECT_ID=
```

### Production Build Validation
```bash
npm run build
```

### Capturing Presentation Screenshots
```bash
node scripts/screenshot-slides.js
```

---

## 📊 8. Presentation Deck

The repository includes a ready-to-present 6-slide deck formatted in [`sih2026_presentation_slides.md`](./sih2026_presentation_slides.md) paired with 2x-resolution light mode screenshots located in [`presentation-assets/`](./presentation-assets/).

---

## ⚖️ 9. Statutory & Legal Governance
* **Constitution of India:** Article 342 (Scheduled Tribes Presidential Order)
* **DPDP Act 2023:** Digital Personal Data Protection Act compliance & Aadhaar Data Vault (ADV) masking
* **MoTA Gazette Order:** SO 2470(E) fellowship allocation rules
* **PFMS & DBT Mission:** Direct Benefit Transfer guidelines and ISO 20022 XML standards

---

## 👥 Team
* **Lead / Developer:** Abdul Muqeeth ([@Muqeeth47](https://github.com/Muqeeth47))
* **Initiative:** Smart India Hackathon (SIH 2026) | Problem Statement 26239
