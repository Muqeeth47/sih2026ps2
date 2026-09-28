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
- **UI/Components:** React 19, Tailwind CSS, Lucide React (Icons)
- **Language:** TypeScript
- **State Management:** Zustand (with local storage persistence for mock data)
- **Authentication:** Mock/Prototype Role-based Auth
- **Persistence:** Local Storage via Zustand (No real database connected yet)

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
│   ├── components/         # Shared UI components (UniversalHeader, Sidebar, etc.)
│   ├── lib/
│   │   ├── store.ts        # Zustand global state (Mock DB)
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── utils.ts        # Helper functions
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
Login → Dashboard → Application Queue → Application Review (View Documents, Check AI Duplicate Flags) → Action (Verify & Approve / Reject / Request Correction) → Submit Decision.

**Administrator:**
Login → Dashboard → Merit List Engine (Run Selection Algorithm) → View Analytics.

## 6. SCHOLARSHIP/FELLOWSHIP FUNCTIONALITY
- **NFST (National Fellowship for Scheduled Tribe):** Implemented. Requires Post-Graduation marks, specific income limits, and fellowship-specific documents.
- **NOS (National Overseas Scholarship):** Implemented. High income threshold, requires specific visa and admission documents.
- **Application Workflow:** Dynamic multi-step wizard adapting document requirements based on the scheme type.
- **Fellowship Management:** Portal for submitting quarterly progress reports and tracking disbursement schedules.

## 7. AI / INTELLIGENT FEATURES
**IMPLEMENTED (Mocked Algorithms):**
- **Eligibility Engine:** Client-side rule engine validating age, income, and marks in real-time during the application wizard.
- **Duplicate Detection:** Flagging applicants with similar details/documents in the Officer Review screen.
- **Merit/Selection Assistance:** Algorithmic ranking dashboard for Admins based on PG Marks and Quotas.

**PLANNED:**
- Real OCR/Document verification.
- Advanced ML-based anomaly detection.

## 8. DATA MODEL
- **User:** Prototype identities (Applicant, Officer, Admin).
- **Application:** Core entity tracking `schemeCode`, `status`, `personalData`, `academicData`, `documents`, and `deficiencies`.
- **Scheme:** Config entity defining `minMarks`, `maxIncome`, and `requiredDocs`.
- **Deficiency:** Sub-entity of Application detailing reasons for document rejection and current status (`OPEN` / `RESOLVED`).

## 9. API ROUTES
- `/api/dedup` (POST): Checks for duplicate applications based on Aadhaar/APAAR. Mocked logic.
- `/api/verify-doc` (POST): Simulates AI document verification. Returns confidence scores.
- `/api/merit-list` (POST): Executes ranking algorithm.
- `/api/schemes` (GET): Returns available schemes.

## 10. UI / DESIGN SYSTEM
- **Branding:** Official Ministry of Tribal Affairs SVG integrated into UniversalHeader and alternative Headers.
- **Layouts:** Distinct Applicant, Officer, and Admin sidebars and navigation.
- **Design:** Clean, modern, accessible (A- / A / A+ text sizing), responsive tailwind classes, Government of India styling cues (Blue/Slate color palette).

## 11. DEMO / PROTOTYPE LOGIN
Fully interactive mock login at `/login`. Users can one-click authenticate as `Applicant`, `Scrutiny Officer`, or `Administrator`.

## 12. CURRENT LIMITATIONS
- **Data Persistence:** Uses LocalStorage (Zustand). Data resets if browser cache is cleared.
- **Authentication:** Completely mocked client-side. No real JWTs/Sessions.
- **File Uploads:** Simulated. No actual files are stored on a server/S3.
- **AI Verification:** Simulated with `setTimeout` and random confidence scores.

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
2. **Real Authentication:** Implement NextAuth (Auth.js) with Aadhaar/OAuth.
3. **File Storage:** Integrate AWS S3 or Supabase Storage for actual document uploads.
4. **Production AI:** Integrate real OCR and deduplication ML models.
