# TribalScholar-AI — Architectural Context & Technical Specification
**Ministry of Tribal Affairs (MoTA) | Smart India Hackathon (SIH-26239)**  
**Production URL:** [https://sih239.vercel.app](https://sih239.vercel.app)  
**Repository:** [https://github.com/Muqeeth47/sih2026ps2](https://github.com/Muqeeth47/sih2026ps2) (`main` branch)

---

## 1. Executive Summary & Problem Overview
* **Problem Statement:** SIH-26239 — *"AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes"*
* **Target Ministry:** Ministry of Tribal Affairs (MoTA), Government of India
* **Primary Challenge:** Over 7 crore Scheduled Tribe (ST) scholars experience prolonged scholarship disbursal delays across 5 major central statutory schemes (NFST, NOS, Top Class, Post-Matric, Pre-Matric). Key bottlenecks include:
  1. **Physical, Manual Scrutiny:** Paper-heavy verification takes 6–8 weeks per institutional batch.
  2. **Zero Cross-Scheme Deduplication:** Students fraudulently or mistakenly draw multiple overlapping benefits across schemes.
  3. **Complex Statutory Orders:** Caste certificates require manual lookup against State-specific Constitution Article 342 Presidential Orders and 75 notified Particularly Vulnerable Tribal Groups (PVTGs).
  4. **Middlemen & Non-Direct Disbursals:** Absence of cryptographic digital sanction orders and instant Direct Benefit Transfer (DBT) integration.

---

## 2. Core Architectural Pillars

### A. Light Enterprise User Interface (MoTA Design System)
* **Design Philosophy:** Inspired by official Government of India enterprise platforms (such as the Ministry of Home Affairs SAKSHYA AI system).
* **Color Palette:** Pure white (`#FFFFFF`) cards, subtle off-white canvas (`#F8FAFC`), deep navy blue branding accents (`#0F2A5E`), royal blue interactive controls (`#1D4ED8`), and emerald statutory badges (`#16A34A`).
* **Accessibility & Anti-Pill Standard:** High-contrast typography, crisp geometric borders, zero frivolous pill-shaped buttons, compact data density, and full `@media print` support for official Gazette orders.

### B. Live Multimodal Document AI Engine (Google Gemini 3.6 / Flash)
* **SDK:** `@google/genai` official Node.js / TypeScript SDK.
* **Active Model:** Google Gemini 3.6 / Flash (`gemini-2.5-flash` / `gemini-3-flash` configurable via `GEMINI_MODEL`).
* **Route:** `/api/verify-doc`
* **Capabilities:** Multimodal base64 document ingestion, automated OCR key-value field extraction (Name, Father's Name, Certificate Number, Issuing Authority, Sub-caste, Issue Date, Validity Date, Income Amount), pixel-level anomaly/blur detection, and expiry validation.
* **Deterministic Sandbox Fallback:** Built-in offline Gov Document AI sandbox guarantees 100% demo uptime even when external API quotas or networks are unavailable.

### C. Official Government Master Datasets (`src/lib/datasets/`)
1. **Central Scheduled Tribes (ST) Presidential Order (`central-st-order.ts`):** Article 342 statutory gazette listings for Rajasthan (Meena, Bhil, Damor), Jharkhand (Santhal, Munda, Oraon, Ho), Madhya Pradesh (Gond, Bhil, Baiga, Kol), Odisha, Chhattisgarh, Andhra Pradesh, Gujarat, and Maharashtra. Validates declared sub-castes against official state orders.
2. **75 Notified PVTG Master Registry (`pvtg-master.ts`):** Complete statutory list of all 75 Particularly Vulnerable Tribal Groups across 18 States and UTs (Birhor, Chenchu, Maria Gond, Sahariya, Baiga, etc.) providing instant priority shortlisting.
3. **AISHE Institutional Master (`aishe-master.ts`):** Official All India Survey on Higher Education codes for universities (e.g., BIT Mesra `U-0202`, University of Rajasthan `U-0385`, IISER Bhopal `U-0272`, NIT Raipur `U-0089`, IIT Delhi, AIIMS, IIM Ahmedabad) to verify genuine institutional affiliations.
4. **QS World University Rankings Master (`qs-rankings-master.ts`):** Top 500 QS World University master for National Overseas Scholarship (NOS) compliance (Oxford, Cambridge, Stanford, Harvard, MIT, etc.). Automatically computes composite scores:
   $$\text{Composite Score} = (0.7 \times \text{PG Marks}) + (0.3 \times \text{QS Score})$$
5. **Document AI Scenarios (`ocr-scenarios.ts`):** 4 realistic test cases (Valid Pass, Income Exceeded, Expired Document, Duplicate Benefit Detected) for instant auditor demonstration.

### D. Cryptographic Security & Digital Signature Certificates (DSC)
* **Engine:** Native W3C WebCrypto API (`src/lib/crypto-pki.ts`).
* **Algorithm:** Asymmetric ECDSA P-256 with SHA-256 message digests.
* **Implementation:** 
  - Ministry Administrators digitally sign sanction batches in-browser using ECDSA cryptographic keys.
  - Generates verifiable Gazette Sanction Orders with tamper-proof digital seals.
  - Includes a 1-click in-browser mathematical signature verification tool comparing public keys, digests, and signatures.

### E. National Deduplication Engine (`/api/dedup`)
* Computes dual SHA-256 cryptographic hashes from Aadhaar, APAAR (Automated Permanent Academic Account Registry), and Bank Account numbers.
* Cross-checks simultaneously against National Scholarship Portal (NSP 2.0) and Canara Bank Scholarship Fellowship Management Portal (SFMP) records to eliminate ghost or duplicate beneficiaries.

### F. Isolated Firebase Architecture (`src/lib/firebase.ts`)
* Uses a dedicated named app instance (`"mota-scholar-db"`) with custom environment variables (`NEXT_PUBLIC_MOTA_FIREBASE_*`).
* Guarantees zero namespace pollution or database collisions with other Firebase applications running in the developer's environment.

---

## 3. Technology Stack Summary

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 16.3.6 (App Router, Turbopack), React 19, TypeScript 5 |
| **Styling & Design System** | Tailwind CSS v4, Lucide React, Custom High-Density Print Stylesheets |
| **State Management** | Zustand (with local storage persistence & dynamic URL query synchronization: `?role=&tab=&appId=`) |
| **AI / Multimodal OCR** | Google Gemini 3.6 / Flash via `@google/genai` + Deterministic Sandbox Fallback |
| **Document Rendering** | Custom Multi-Page Vector PDF Canvas Component (`PdfViewer.tsx`) |
| **Cryptography / PKI** | W3C WebCrypto API (ECDSA P-256 SHA-256 Digital Signatures), SHA-256 Hashing |
| **Database & Cloud** | Isolated Named Firebase App (`"mota-scholar-db"`), Next.js Serverless Edge Routes |
| **Deployment & CI/CD** | Vercel Serverless Edge (Production: `https://sih239.vercel.app`), GitHub (`main`) |

---

## 4. Four-Tier Role-Based Access Control (RBAC)

The application provides a unified single-portal landing page with 1-click credential autofill for all 4 statutory personas:

1. **Level 1 — ST Scholar (`APPLICANT`):**
   * *Persona:* Priya Meena (University of Rajasthan)
   * *Features:* Dynamic Smart-Match eligibility wizard across 5 schemes, encrypted document vault, 7-day statutory deficiency resolver with live countdown clock, quarterly research milestones & contingency claims tracker.
2. **Level 2 — Institute Nodal Officer (`INSTITUTE_NODAL`):**
   * *Persona:* Dr. Kavita Soren (BIT Mesra)
   * *Features:* 1-click institutional bonafide admission attestation, supervisor milestone sign-offs, and NOS foreign tuition forex currency conversion (GBP/USD/EUR to INR).
3. **Level 3 — MoTA Scrutiny Officer (`SCRUTINY_OFFICER`):**
   * *Persona:* Rajesh Kumar, IAS (NIC MoTA Desk 42)
   * *Features:* Split-screen AI scrutiny workbench, multi-page vector PDF viewer, Article 342 Presidential ST Order cross-check, PVTG detection, and SMS/WhatsApp alert dispatch simulator.
4. **Level 4 — Joint Secretary / Admin (`MINISTRY_ADMIN`):**
   * *Persona:* Joint Secretary (Tribal Affairs)
   * *Features:* Apex national KPI dashboard, configurable statutory scheme rules registry, automated quota allocation engine (30% Female + 5% PwD + PVTG Priority), W3C WebCrypto DSC sanction order signing, and PFMS ISO 20022 DBT batch generation.

---

## 5. Five Statutory MoTA Schemes Supported

| Scheme Code | Scheme Name | Income Ceiling | Academic Cutoff | Monthly Stipend | Statutory Quotas |
|---|---|---|---|---|---|
| **NFST** | National Fellowship for Scheduled Tribes | ₹6,00,000 / yr | 55% Marks | ₹31,000 / mo | 30% Female, 5% PwD, PVTG |
| **NOS** | National Overseas Scholarship | ₹8,00,000 / yr | 60% Marks | ₹1,50,000 / mo | Top 500 QS Univ, PVTG Priority |
| **TOP_CLASS** | Top Class Education Scheme (IIT/IIM/AIIMS) | ₹6,00,000 / yr | 60% Marks | ₹75,000 / mo | Premier AISHE Institutions |
| **POST_MATRIC**| Post-Matric Scholarship for ST Students | ₹2,50,000 / yr | 45% Marks | ₹8,000 / mo | Universal ST Coverage |
| **PRE_MATRIC** | Pre-Matric Scholarship (Classes 9–10) | ₹2,50,000 / yr | 40% Marks | ₹3,50,000 / mo | Direct DBT to Guardian |

---

## 6. Directory Structure & Key Files

```
239/
├── public/                                 # SVG logos and static assets
├── presentation-assets/                    # High-res (2880x1800) light-mode screenshots
│   ├── slide1_landing_overview.png
│   ├── slide2_applicant_dashboard.png
│   ├── slide3_ai_scrutiny_workbench.png
│   ├── slide4_merit_list_dsc.png
│   ├── slide5_kpi_dashboard.png
│   └── slide6_scheme_rules.png
├── scripts/
│   └── screenshot-slides.js                # Automated Puppeteer screenshot capture script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dedup/route.ts              # Dual SHA-256 deduplication endpoint
│   │   │   ├── merit-list/route.ts         # Automated merit & quota allocation engine
│   │   │   ├── schemes/route.ts            # Dynamic statutory scheme rules endpoint
│   │   │   └── verify-doc/route.ts         # Live Gemini 3.6 / Flash OCR & anomaly detector
│   │   ├── globals.css                     # Light-mode enterprise theme & print styles
│   │   ├── layout.tsx                      # Root layout with MoTA metadata
│   │   └── page.tsx                        # Single-frame landing matrix & role router
│   ├── components/
│   │   ├── AdminView.tsx                   # Apex KPI, Rule Editor, Merit & DSC Engine
│   │   ├── ApplicantView.tsx               # Scholar Console, Smart Match & 7-Day Resolver
│   │   ├── InoView.tsx                     # College INO Attestation & Forex Liaison
│   │   ├── ScrutinyOfficerWorkbench.tsx    # Split-Screen AI Workbench & PDF Viewer
│   │   ├── PdfViewer.tsx                   # Multi-page vector PDF canvas component
│   │   ├── Header.tsx                      # Light government navbar & RBAC switcher
│   │   ├── Footer.tsx                      # Official MoTA footer & statutory links
│   │   └── TermsPrivacyModal.tsx           # DPDP Act 2023 & ADV compliance modal
│   └── lib/
│       ├── datasets/
│       │   ├── central-st-order.ts         # Article 342 Presidential ST Order master
│       │   ├── pvtg-master.ts              # 75 Notified PVTG communities
│       │   ├── aishe-master.ts             # AISHE University Code directory
│       │   ├── qs-rankings-master.ts       # Top 500 QS World University rankings
│       │   └── ocr-scenarios.ts            # 4 official Document AI evaluation cases
│       ├── crypto-pki.ts                   # W3C WebCrypto ECDSA P-256 signing engine
│       ├── firebase.ts                     # Isolated named Firebase app configuration
│       ├── mock-data.ts                    # Realistic MoTA production datasets
│       ├── store.ts                        # Zustand store with URL param sync
│       ├── types.ts                        # TypeScript domain model interfaces
│       └── utils.ts                        # Formatter utilities and color tokens
├── sih2026_presentation_slides.md          # 6-slide presentation deck specifications
├── .env.example                            # Configuration template
├── package.json
└── vercel.json
```

---

## 7. Verification & Deployment Instructions

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build validation
npm run build
```

### Production Deployment (Vercel)
```bash
# Deploy to Vercel production
npx vercel --prod
```

### Generating Presentation Screenshots
```bash
# Capture fresh 2880x1800 light-mode screenshots from live production
node scripts/screenshot-slides.js
```
