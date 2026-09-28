const fs = require('fs');
const path = require('path');

// 1. Fix Apply Now in Scholarships
const sPath = 'D:\\SIHPS2\\src\\app\\(public)\\scholarships\\page.tsx';
let sContent = fs.readFileSync(sPath, 'utf8');
sContent = sContent.replace(
  'href="/login?role=applicant"',
  'href={`/applicant/apply?scheme=${scheme.code}`}'
);
fs.writeFileSync(sPath, sContent, 'utf8');

// 2. Fix Apply Now in Fellowships 
const fPath = 'D:\\SIHPS2\\src\\app\\(public)\\fellowships\\page.tsx';
let fContent = fs.readFileSync(fPath, 'utf8');
fContent = fContent.replace(
  'href="/login?role=applicant"',
  'href={`/applicant/apply?scheme=${scheme.code}`}'
);
fs.writeFileSync(fPath, fContent, 'utf8');

// 3. Fix Applicant Dashboard Deficiency Box
const aPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\page.tsx';
let aContent = fs.readFileSync(aPath, 'utf8');
aContent = aContent.replace(
  'href={`/applicant/tracking/${deficientApp.id}`}',
  'href={`/applicant/applications/${deficientApp.id}`}'
);
fs.writeFileSync(aPath, aContent, 'utf8');

// 4. Update [id]/page.tsx to resolve deficiency
const detailPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\applications\\[id]\\page.tsx';
let dContent = fs.readFileSync(detailPath, 'utf8');
if (!dContent.includes('resolveDeficiency')) {
  dContent = dContent.replace(
    'export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {',
    `export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [isResolving, setIsResolving] = React.useState(false);
  const resolveDeficiency = () => {
    setIsResolving(true);
    setTimeout(() => {
      useAppStore.setState(state => ({
        applications: state.applications.map(a => a.id === id ? { ...a, status: 'SUBMITTED', deficiencies: a.deficiencies.map(d => ({ ...d, status: 'RESOLVED' })) } : a)
      }));
      setIsResolving(false);
      alert('Document replaced successfully. Application resubmitted.');
    }, 1000);
  };`
  );
  dContent = dContent.replace(
    '<button className="mt-2 block bg-white border border-red-300 px-3 py-1.5 rounded text-red-700 font-bold hover:bg-red-50 text-xs">',
    '<button onClick={resolveDeficiency} disabled={isResolving} className="mt-2 block bg-white border border-red-300 px-3 py-1.5 rounded text-red-700 font-bold hover:bg-red-50 text-xs">'
  );
  dContent = dContent.replace('Resolve Now', '{isResolving ? "Uploading..." : "Replace Document & Resubmit"}');
  fs.writeFileSync(detailPath, dContent, 'utf8');
}

// 5. Add global 404
const notFoundPath = 'D:\\SIHPS2\\src\\app\\not-found.tsx';
const notFoundContent = `import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Page not found</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Return Home
        </Link>
      </div>
    </div>
  );
}`;
fs.writeFileSync(notFoundPath, notFoundContent, 'utf8');

// 6. DB Architecture Proposal
const dbProposalPath = 'D:\\SIHPS2\\DATABASE_PROPOSAL.md';
const dbContent = `# Database Architecture Proposal for SIHPS2

## 1. Recommendation
For this Next.js prototype, **PostgreSQL** via **Supabase** or **Prisma + Neon** is the recommended database architecture.
*Why?*
- Relational integrity is strictly required for Schemes -> Rules -> Applications -> Documents.
- JSONB columns in Postgres allow for flexible \`rules\` configurations.
- Next.js integrates seamlessly with Prisma ORM.

## 2. Schema Proposal (Prisma)
\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      Role     // APPLICANT, OFFICER, ADMIN
  name      String
  apaarId   String?  @unique
  applications Application[]
}

model Scheme {
  code          String   @id
  name          String
  type          String   // SCHOLARSHIP | FELLOWSHIP
  active        Boolean
  rules         Json     // Stores minMarks, maxIncome, categoryReq
  requiredDocs  Json     // Array of required document types
  applications  Application[]
}

model Application {
  id            String   @id
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  schemeCode    String
  scheme        Scheme   @relation(fields: [schemeCode], references: [code])
  status        String   // SUBMITTED, INO_VERIFIED, DEFICIENCY_RAISED, APPROVED
  personalData  Json
  academicData  Json
  documents     Document[]
  deficiencies  Deficiency[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Document {
  id            String   @id @default(uuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id])
  type          String
  fileUrl       String
  aiVerified    Boolean  @default(false)
}

model Deficiency {
  id            String   @id @default(uuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id])
  reason        String
  status        String   // OPEN, RESOLVED
}
\`\`\`

## 3. Data Access Layer Pattern
Currently, all components directly use \`useAppStore()\`. 
Before DB migration, the architecture should be abstracted:
1. \`src/services/applicationService.ts\` (Currently calls Zustand, later calls Prisma).
2. UI components only call \`applicationService.getApplications()\`.
`;
fs.writeFileSync(dbProposalPath, dbContent, 'utf8');

console.log('Phase fixes applied');
