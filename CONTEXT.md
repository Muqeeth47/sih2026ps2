# SIHPS2 - Project Context

## 1. PROJECT OVERVIEW
- **Problem Statement:** 26239 - "AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes"
- **Ministry:** Ministry of Tribal Affairs (MoTA)
- **Category:** Software
- **Theme:** Smart Education
- **Objective:** To provide a streamlined, AI-enhanced, and user-friendly digital portal for Scheduled Tribe (ST) students to discover, apply for, and manage scholarships and fellowships, while enabling efficient scrutiny and administration for MoTA officials.
- **Target Users:** Scheduled Tribe students, Institute Nodal Officers, MoTA Scrutiny Officers, and Ministry Administrators.
- **Roles Implemented:** Applicant (`APPLICANT`), Scrutiny Officer (`SCRUTINY_OFFICER`), Ministry Admin (`MINISTRY_ADMIN`), and Institute Nodal (`INSTITUTE_NODAL`).

## 2. CURRENT TECH STACK
- **Framework:** Next.js 16.3.6 (App Router)
- **UI/Components:** React 19, Tailwind CSS, Lucide React (Icons), Custom `PdfViewer` Component
- **Language:** TypeScript
- **State Management:** Zustand (with local storage persistence for mock data)
- **Authentication:** Mock/Prototype Role-based Auth (with a planned isolated Firebase architecture)
- **Persistence:** Local Storage via Zustand (No real database connected yet)
- **Cryptography:** WebCrypto API for Digital Signature Certificate (DSC) generation and verification (`crypto-pki.ts`)

## 3. PROJECT STRUCTURE
```
D:\SIHPS2\
├── public/                 # Static assets (including Ministry_of_Tribal_Affairs.svg)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (public)/       # Public routes (Home, Login, Scholarships, Fellowships, Help)
│   │   ├── (applicant)/    # Applicant portal routes (Dashboard, Apply, Tracking, etc.)
│   │   ├── (officer)/      # Scrutiny Officer portal routes (Review, Applications)
│   │   ├── (admin)/        # Ministry Admin portal routes (Merit List, Analytics)
│   │   ├── api/            # Mock API routes (dedup, merit-list, schemes, verify-doc)
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Shared UI components (UniversalHeader, Sidebar, PdfViewer, etc.)
│   ├── lib/
│   │   ├── datasets/       # Statutory Datasets (AISHE, PVTG, ST Order, QS Rankings, OCR Scenarios)
│   │   ├── store.ts        # Zustand global state (Mock DB)
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── utils.ts        # Helper functions
│   │   ├── firebase.ts     # Isolated Firebase Architecture integration
│   │   ├── crypto-pki.ts   # WebCrypto / DSC engine implementation
│   │   └── mock-data.ts    # Seed data for schemes and rules
```

## 4. ROUTING
| Route | Purpose | Role | Status |
|---|---|---|---|
| `/` | Landing Page | Public | Implemented |
| `/login` | Prototype Authentication | Public | Implemented |
| `/scholarships` | Scholarship Discovery | Public | Implemented |
| `/fellowships` | Fellowship Discovery | Public | Implemented |
| `/applicant` | Applicant Dashboard | Applicant | Implemented |
| `/applicant/apply` | Application Wizard (4-step) | Applicant | Implemented |
| `/applicant/applications/[id]` | Application Details & Deficiencies | Applicant | Implemented |
| `/applicant/documents` | Document Vault | Applicant | Implemented |
| `/applicant/tracking` | Status Tracking Pipeline | Applicant | Implemented |
| `/applicant/fellowship-management` | Post-selection Portal | Applicant | Implemented |
| `/officer` | Scrutiny Dashboard | Officer | Implemented |
| `/officer/applications` | Application Queue | Officer | Implemented |
| `/officer/review/[id]` | Document Scrutiny & AI Checks | Officer | Implemented |
| `/admin` | Admin Dashboard | Admin | Implemented |
| `/admin/merit-list` | Selection Algorithm Dashboard | Admin | Implemented |

## 5. USER FLOWS

**Applicant:**
Login → Dashboard → Find Scholarships → Click "Apply Now" → Application Wizard (Eligibility Engine → Academic Info → Document Upload → Submit) → Track Application → Resolve Deficiencies (if any) → Post-Selection Fellowship Management.

**Scrutiny Officer:**
Login → Dashboard → Application Queue → Application Review (Split-Screen AI Document Workbench, Check AI Duplicate Flags & OCR Scenarios) → Action (Verify & Approve / Reject / Request Correction) → Submit Decision.

**Administrator:**
Login → Dashboard → Configurable Scheme Rules Engine → Merit List Engine (Run Selection Algorithm) → PFMS DBT Batch Sanctions & WebCrypto DSC Signing.

## 6. SCHOLARSHIP/FELLOWSHIP FUNCTIONALITY
- **NFST (National Fellowship for Scheduled Tribe):** Implemented. Requires Post-Graduation marks, specific income limits, and fellowship-specific documents.
- **NOS (National Overseas Scholarship):** Implemented. High income threshold, requires specific visa and admission documents (Validated against QS World Rankings).
- **Application Workflow:** Dynamic multi-step wizard adapting document requirements based on the scheme type.
- **Fellowship Management:** Portal for submitting quarterly progress reports and tracking disbursement schedules.

## 7. AI / INTELLIGENT FEATURES & STATUTORY CHECKS
**IMPLEMENTED (Algorithms & Master Datasets):**
- **Eligibility Engine:** Client-side rule engine validating age, income, and marks in real-time during the application wizard.
- **Statutory Master Checks (via `lib/datasets`):** Cross-referencing against Central ST Presidential Order, PVTG Master, AISHE Accreditation, and QS World Rankings.
- **Duplicate Detection (NSP / SFMP Registry):** Cryptographic hash deduplication flagging applicants with similar details/documents.
- **AI Document Scrutiny:** Split-screen PdfViewer workbench leveraging OCR Evaluation Scenarios to simulate validation, document anomaly detection, and data extraction.
- **Merit/Selection Assistance:** Algorithmic ranking dashboard for Admins based on PG Marks, Female Quota, and PVTG Priority.
- **Cryptographic Security:** Built-in WebCrypto API logic to securely issue and mathematically verify Digital Signature Certificates (DSC) on Official Gazette Orders.

**PLANNED:**
- Real OCR/Document verification.
- Advanced ML-based anomaly detection models.

## 8. DATA MODEL
- **User:** Prototype identities (Applicant, Officer, Admin).
- **Application:** Core entity tracking `schemeCode`, `status`, `personalData`, `academicData`, `documents`, and `deficiencies`.
- **Scheme:** Config entity defining `minMarks`, `maxIncome`, and `requiredDocs`.
- **Deficiency:** Sub-entity of Application detailing reasons for document rejection and current status (`OPEN` / `RESOLVED`).

## 9. API ROUTES
- `/api/dedup` (POST): Checks for duplicate applications based on Aadhaar/APAAR. Mocked logic.
- `/api/verify-doc` (POST): Simulates AI document verification using predefined OCR scenarios. Returns confidence scores.
- `/api/merit-list` (POST): Executes ranking algorithm.
- `/api/schemes` (GET): Returns available schemes.

## 10. UI / DESIGN SYSTEM
- **Branding:** Official Ministry of Tribal Affairs SVG integrated into UniversalHeader and alternative Headers.
- **Layouts:** Distinct Applicant, Officer, and Admin sidebars and navigation.
- **Design:** Clean, modern, accessible (A- / A / A+ text sizing), responsive tailwind classes, Government of India styling cues (Blue/Slate color palette for Applicants, Dark pro-theme for Officer Workbench).

## 11. DEMO / PROTOTYPE LOGIN
Fully interactive mock login at `/login`. Users can one-click authenticate as `Applicant`, `Scrutiny Officer`, or `Administrator`. Firebase isolated authentication architecture is set up in `firebase.ts` for future production integration.

## 12. CURRENT LIMITATIONS
- **Data Persistence:** Uses LocalStorage (Zustand). Data resets if browser cache is cleared.
- **Authentication:** Completely mocked client-side. No real JWTs/Sessions.
- **File Uploads:** Simulated. No actual files are stored on a server/S3.
- **AI Verification:** Simulated using pre-defined scenario sets (`ocr-scenarios.ts`).

## 13. DATABASE PLAN (FUTURE)
Proposed Architecture: PostgreSQL + Prisma ORM.
Intended Entities: `User`, `Scheme`, `Application`, `Document`, `Deficiency`, `Notification`.
Details documented in `DATABASE_PROPOSAL.md`.

## 14. DEVELOPMENT WORKFLOW
- **Install:** `npm install`
- **Run Locally:** `npm run dev`
- **Build:** `npm run build`
- **Branch:** `ui-redesign`

## 15. FUTURE DEVELOPMENT PRIORITIES
1. **Database Integration:** Move from Zustand to Prisma + PostgreSQL.
2. **Real Authentication:** Implement NextAuth (Auth.js) / Firebase with Aadhaar/OAuth.
3. **File Storage:** Integrate AWS S3 or Supabase Storage for actual document uploads.
4. **Production AI:** Integrate real ML models to replace dataset scenarios.
