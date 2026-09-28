# Database Architecture Proposal for SIHPS2

## 1. Recommendation
For this Next.js prototype, **PostgreSQL** via **Supabase** or **Prisma + Neon** is the recommended database architecture.
*Why?*
- Relational integrity is strictly required for Schemes -> Rules -> Applications -> Documents.
- JSONB columns in Postgres allow for flexible `rules` configurations.
- Next.js integrates seamlessly with Prisma ORM.

## 2. Schema Proposal (Prisma)
```prisma
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
```

## 3. Data Access Layer Pattern
Currently, all components directly use `useAppStore()`. 
Before DB migration, the architecture should be abstracted:
1. `src/services/applicationService.ts` (Currently calls Zustand, later calls Prisma).
2. UI components only call `applicationService.getApplications()`.
