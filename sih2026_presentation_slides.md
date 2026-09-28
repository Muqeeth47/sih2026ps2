# SIH 2026 — PS-239 Presentation Slides
**TribalScholar-AI** | Ministry of Tribal Affairs (MoTA) | Team: Abdul Muqeeth

---

## Slide 1: Title & Problem Overview
### Core Problem Statement & National Challenges
- **7 crore+ ST scholars** face manual, fraud-prone scholarship disbursal delays across 5 MoTA statutory schemes.
- **Zero cross-scheme deduplication** — the same beneficiary draws concurrent benefits from NFST and Post-Matric simultaneously without detection.
- **No machine-readable ST certificate validation**; human physical scrutiny takes 6–8 weeks per batch, creating systemic disbursal backlogs.

**Recommended Slide Visual:**  
`presentation-assets/slide1_landing_overview.png`  
*(MoTA Landing Matrix, Live DBT Ticker, and 4-Tier RBAC Persona Switcher)*

---

## Slide 2: Proposed Solution & Uniqueness
### Unified National Platform & Automated Eligibility Matching
- **Unified 4-Tier RBAC Architecture** seamlessly connecting ST Scholar → College INO → Scrutiny Officer → Ministry Admin.
- **Dynamic Smart-Match Wizard** automatically evaluates demographic, income, and academic parameters across all 5 statutory schemes in real time.
- **7-Day Statutory Deficiency Resolver** featuring a live countdown clock and automated SMS/WhatsApp multichannel alerts so no deserving student is dropped.

**Recommended Slide Visual:**  
`presentation-assets/slide2_applicant_dashboard.png`  
*(ST Scholar Console, 5-Stage Statutory Disbursal Timeline, and Dynamic Eligibility Engine)*

---

## Slide 3: Technical Approach & Methodology
### AI Document Intelligence, Deduplication & Cryptographic Verification
- **Gemini 1.5 Flash Multimodal OCR** extracts, inspects, and cross-validates certificates against the Constitution Article 342 Presidential Order & 75 PVTG Master.
- **Dual SHA-256 Deduplication Engine** cryptographically hashes Aadhaar and APAAR IDs against NSP 2.0 and Canara Bank SFMP registries.
- **W3C WebCrypto ECDSA P-256 DSC Signing** generates digitally signed Gazette Sanction Orders mathematically auditable in-browser.

**Recommended Slide Visual:**  
`presentation-assets/slide3_ai_scrutiny_workbench.png`  
*(AI Scrutiny Workbench, Split-Screen Multi-Page Vector PDF Viewer, and Statutory Article 342 Verification)*

---

## Slide 4: Feasibility and Viability
### Serverless Architecture, Merit Allocation & Database Isolation
- **100% Serverless Edge Stack** on Next.js 16 App Router & Vercel — zero idle infrastructure costs at prototype stage, Kubernetes-ready for national scale.
- **Objective Composite Merit Scoring** formula (`0.7 × PG Marks + 0.3 × QS Rank Score`) eliminates discretionary bias in overseas & national fellowships.
- **Isolated Named Firebase Instance** (`mota-scholar-db`) guarantees zero schema collision or cross-contamination with existing government databases.

**Recommended Slide Visual:**  
`presentation-assets/slide4_merit_list_dsc.png`  
*(Automated Merit Quota Engine, Composite Scoring Matrix, and WebCrypto Digital Signature Verification)*

---

## Slide 5: Impact and Benefits
### Disbursal Velocity, Quota Compliance & Middleman Elimination
- **~40% Reduction in Processing Cycle** by replacing weeks of manual verification with sub-minute AI anomaly and rule verdicts.
- **Constitutional Quota Automation** (30% Female + 5% PwD + PVTG Priority) enforced directly in the algorithmic allocation engine.
- **PFMS ISO 20022 Direct Benefit Transfer (DBT)** outputs batch payment orders directly to verified scholar bank accounts, eliminating leakage and middlemen.

**Recommended Slide Visual:**  
`presentation-assets/slide5_kpi_dashboard.png`  
*(Apex Ministry KPI Analytics Dashboard, Gender Distribution Ratios, and State-wise DBT Sanction Totals)*

---

## Slide 6: Research and References
### Official Government Reference Datasets & Legal Frameworks
- **Official Datasets Integrated**: `tribal.nic.in` ST Presidential Order, `dbttribal.gov.in` PFMS guidelines, AISHE Institution Codes, and QS World Top 500 Rankings.
- **Statutory & Legal Compliance**: Constitution of India (Article 342), DPDP Act 2023 (Aadhaar Data Vault ADV), and MoTA Gazette Notification SO 2470(E).
- **Inter-Agency Harmonization**: Synthesizes NSP 2.0 (NIC), Canara Bank SFMP, and the Central DBT Mission into a unified automated pipeline.

**Recommended Slide Visual:**  
`presentation-assets/slide6_scheme_rules.png`  
*(Configurable Statutory Scheme Rules Engine & Policy Registry for all 5 MoTA Schemes)*

---

## Presentation Slide Image Mapping Summary

| Slide # | Slide Title | Image Filename | Relative Path |
|---|---|---|---|
| **Slide 1** | Title & Problem Overview | `slide1_landing_overview.png` | `presentation-assets/slide1_landing_overview.png` |
| **Slide 2** | Proposed Solution & Uniqueness | `slide2_applicant_dashboard.png` | `presentation-assets/slide2_applicant_dashboard.png` |
| **Slide 3** | Technical Approach & Methodology | `slide3_ai_scrutiny_workbench.png` | `presentation-assets/slide3_ai_scrutiny_workbench.png` |
| **Slide 4** | Feasibility and Viability | `slide4_merit_list_dsc.png` | `presentation-assets/slide4_merit_list_dsc.png` |
| **Slide 5** | Impact and Benefits | `slide5_kpi_dashboard.png` | `presentation-assets/slide5_kpi_dashboard.png` |
| **Slide 6** | Research and References | `slide6_scheme_rules.png` | `presentation-assets/slide6_scheme_rules.png` |

---

## System Architecture Diagram Flow (For Slide Deck / Gemini Diagram)

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
  • Google Gemini 1.5 Flash              • Central ST Presidential Order      • Firebase Firestore
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
