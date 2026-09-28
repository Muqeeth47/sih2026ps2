# CONTEXT.md — TribalScholar-AI Architecture & System Blueprint
**Ministry of Tribal Affairs (MoTA) — Government of India**  
**Problem Statement ID:** SIH26239  
**Platform Name:** TribalScholar-AI (AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes)

---

## 1. System Overview & Core Objective
TribalScholar-AI is an enterprise-grade government portal designed to eliminate manual paper scrutiny for tribal fellowships and scholarships. It unifies 5 statutory schemes:
1. **National Fellowship for ST (NFST)** — M.Phil / PhD research scholars (JRF/SRF)
2. **National Overseas Scholarship (NOS)** — ST students studying abroad in top QS-ranked universities
3. **Top Class Education Scheme** — ST students admitted to premier institutions (IITs, IIMs, AIIMS, NITs, NLUs)
4. **Post-Matric Scholarship for ST Students** — Class 11 through post-graduation
5. **Pre-Matric Scholarship for ST Students** — Classes 9 and 10

---

## 2. 4-Tier RBAC Architecture & Click-to-Autofill Credentials
The system enforces strict role-based access control with one-click credential autofill directly from the top bar and single-frame landing console:

| Level | Persona Role | Demo Credential | Auth Mechanism | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | **ST Scholar / Applicant** | `priya.meena@student.ac.in` (APAAR-2024-001234) | Aadhaar OTP / DigiLocker / APAAR ID | Smart Match eligibility wizard, encrypted document vault, live statutory timeline, 7-day deficiency resolver, quarterly PhD milestone & contingency claims. |
| **Level 2** | **Institute Nodal Officer (INO)** | `kavita.soren@bitmesra.ac.in` (BIT Mesra) | Verified `.ac.in` institutional domain + 2FA | 1-click bonafide student admission verification, PhD research milestone digital sign-off, NOS foreign tuition forex converter. |
| **Level 3** | **MoTA Scrutiny Officer** | `rajesh.kumar@nic.in` (NIC-MOTA-DESK-42) | NIC SSO / `@nic.in` Government credentials | Split-Screen AI Document Scrutiny Workbench, confidence score badges, Constitution ST order verification, national deduplication engine checks, legal deficiency citation dispatch. |
| **Level 4** | **Ministry Admin / Joint Secretary** | `js.tribal@mota.gov.in` (MoTA New Delhi) | PKI Token / Digital Signature Certificate (DSC) | Real-time national KPI dashboard, dynamic scheme rules editor (zero hardcoding), automated merit list & quota engine, printable Gazette Sanction Orders, PFMS DBT batch generator. |

---

## 3. UI Architecture Guardrails (Anti-Slop & High Density Specification)
1. **Dark UI / Enterprise Gov Aesthetic**: Hard dark mode primary (`#070b12` background, `#0b1120` cards, `#1e293b` crisp borders, slate/zinc text hierarchy). Zero light mode.
2. **Anti-Pill Enforcement**: Absolutely NO rounded pill shapes (`rounded-full`). Replaced with left-aligned typographic eyebrows (`tracking-wider text-xs font-semibold`) or 1px bordered sharp square badges.
3. **Anti-Cardocalypse**: No nested bordered containers. Layout uses structural grid lines, subtle slate tint shifts, and alternating row zebra striping.
4. **Viewport Security**: All flex containers handling inline metadata declare explicit `flex-wrap`. Heavy tables wrapped in `overflow-x: auto w-full` to prevent mobile clipping.
5. **Compact Density**: Section margins and cell paddings capped (`p-2.5` to `p-4`, `gap-2` to `gap-3`), displaying labels inline or adjacent.
6. **Print Engine**: Dedicated print stylesheet `@media print` formatting official Ministry Gazette Sanction Orders for physical paper archiving.

---

## 4. Dynamic URL State Architecture (Single-Frame & Deep-Linking)
Every single tab switch, role change, and modal view immediately synchronizes with browser URL query parameters:
- `?role=APPLICANT&tab=overview` — Scholar Dashboard & Statutory Timeline
- `?role=APPLICANT&tab=eligibility` — Dynamic Smart Match Wizard (Age, Income, Marks)
- `?role=APPLICANT&tab=vault` — Encrypted Document Vault & Cryptographic Seals
- `?role=APPLICANT&tab=deficiency` — 7-Day Deficiency Resolution Window with countdown timer
- `?role=APPLICANT&tab=fellowship` — Post-Selection Portal (Quarterly reports & DBT tracker)
- `?role=INSTITUTE_NODAL&tab=inbox` — Institutional Verification Inbox & Bonafide confirmation
- `?role=INSTITUTE_NODAL&tab=milestones` — PhD Supervisor Milestone Digital Sign-off
- `?role=INSTITUTE_NODAL&tab=nos_liaison` — Foreign Tuition Forex Calculator (RBI Reference Rates)
- `?role=SCRUTINY_OFFICER&tab=queue` — Central Dossier Queue
- `?role=SCRUTINY_OFFICER&tab=workbench&appId=APP-2024-NOS-002` — Split-Screen AI Document Workbench
- `?role=SCRUTINY_OFFICER&tab=dedup` — National Deduplication Cross-Registry Check
- `?role=MINISTRY_ADMIN&tab=kpi` — National KPI Analytics & Population Quota Matrix
- `?role=MINISTRY_ADMIN&tab=rules` — Configurable Scheme Rules Engine Editor (Zero Hardcoding)
- `?role=MINISTRY_ADMIN&tab=merit` — Automated Merit List & Quota Engine (Gazette Order)
- `?role=MINISTRY_ADMIN&tab=pfms` — PFMS Direct Benefit Transfer (DBT) Batch Gateway
- `?view=terms` — Statutory Terms & Conditions Modal
- `?view=privacy` — Digital Personal Data Protection (DPDP Act 2023) & Aadhaar Vault Modal

---

## 5. Core Engines & API Route Specifications

### 1. AI Document Intelligence API (`POST /api/verify-doc`)
- **Simulates**: Gemini 2.5 Flash Multimodal OCR extraction & forgery detection.
- **Payload**: `{ docType: DocumentType, fileName: string, applicantName: string }`
- **Output**: Structured JSON containing extracted names, issuing officers, validity dates, confidence score badges (Green $\ge 90\%$, Amber $70-89\%$, Red $< 70\%$), and tamper anomalies.

### 2. National Deduplication Engine API (`POST /api/dedup`)
- **Objective**: Enforce MoTA's zero dual-benefit rule across central and state portals.
- **Payload**: `{ aadhaar: string, apaarId: string, bankAccount: string }`
- **Algorithm**: Generates SHA-256 hash of `(Aadhaar + APAAR + Bank Account)` and queries mock registries of National Scholarship Portal (NSP) and Canara Bank SFMP.
- **Output**: Returns `isDuplicate: boolean`, conflict source, and auto-freezes conflicting dossiers.

### 3. Configurable Scheme Rules Engine API (`GET / POST /api/schemes`)
- **Objective**: Zero hardcoding of scheme parameters.
- **Capabilities**: Dynamically update income ceilings (e.g. ₹6L to ₹8L), minimum academic marks, age ceilings, and QS foreign university rank thresholds on the fly.

### 4. Automated Merit List & Quota Engine API (`POST /api/merit-list`)
- **Composite Score Formula**:
  $$\text{Composite Score} = (0.70 \times \text{PG Marks}) + (0.30 \times \text{QS Rank Weightage})$$
- **Statutory Quota Filters Applied**:
  - **PVTG Priority**: Direct shortlisting for Particularly Vulnerable Tribal Groups.
  - **5% PwD (Divyangjan) Quota**: Reserved for candidates with benchmark disabilities.
  - **30% Female Scholar Quota**: Mandated reservation with unfulfilled rollover into general ST quota.
  - **Open ST Merit**: Highest scoring candidates fill remaining seats.

---

## 6. Deployment Guide via Vercel CLI
The project is configured for Vercel deployment:
1. Ensure Vercel CLI is installed: `npm install -g vercel`
2. Authenticate: `vercel login`
3. Deploy to Preview: `vercel`
4. Deploy to Production: `vercel --prod`
Configuration is captured in `vercel.json` with Next.js App Router optimization.
