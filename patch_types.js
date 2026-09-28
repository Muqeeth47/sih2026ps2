const fs = require('fs');

// Update types.ts
const typesPath = 'D:\\SIHPS2\\src\\lib\\types.ts';
let typesContent = fs.readFileSync(typesPath, 'utf8');
if (!typesContent.includes("type?: 'scholarship' | 'fellowship';")) {
  typesContent = typesContent.replace('active: boolean;', "active: boolean;\n  type?: 'scholarship' | 'fellowship';");
}
fs.writeFileSync(typesPath, typesContent, 'utf8');

// Update store.ts
const storePath = 'D:\\SIHPS2\\src\\lib\\store.ts';
let storeContent = fs.readFileSync(storePath, 'utf8');
storeContent = storeContent.replace(/'DEFECTIVE'/g, "'DEFICIENCY_RAISED'");
storeContent = storeContent.replace(/field: 'General'/g, "id: '1', applicationId: id, documentType: 'CASTE_CERTIFICATE', status: 'OPEN', raisedAt: new Date().toISOString()");
storeContent = storeContent.replace(/message/g, "reason");
storeContent = storeContent.replace(/isResolved: false/g, "");
fs.writeFileSync(storePath, storeContent, 'utf8');

// Update applicant/[id]/page.tsx
const appDetailPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\applications\\[id]\\page.tsx';
let appDetailContent = fs.readFileSync(appDetailPath, 'utf8');
appDetailContent = appDetailContent.replace(/'DEFECTIVE'/g, "'DEFICIENCY_RAISED'");
appDetailContent = appDetailContent.replace(/def\.field/g, "def.documentType");
appDetailContent = appDetailContent.replace(/def\.message/g, "def.reason");
appDetailContent = appDetailContent.replace(/!def\.isResolved/g, "def.status === 'OPEN'");
appDetailContent = appDetailContent.replace(/'VERIFIED'/g, "'INO_VERIFIED'");
fs.writeFileSync(appDetailPath, appDetailContent, 'utf8');

// Update applicant/page.tsx
const applicantPage = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\applications\\page.tsx';
let applicantPageContent = fs.readFileSync(applicantPage, 'utf8');
applicantPageContent = applicantPageContent.replace(/'DEFECTIVE'/g, "'DEFICIENCY_RAISED'");
fs.writeFileSync(applicantPage, applicantPageContent, 'utf8');

const trackingPage = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\tracking\\page.tsx';
let trackingContent = fs.readFileSync(trackingPage, 'utf8');
trackingContent = trackingContent.replace(/'DEFECTIVE'/g, "'DEFICIENCY_RAISED'");
trackingContent = trackingContent.replace(/'VERIFIED'/g, "'INO_VERIFIED'");
fs.writeFileSync(trackingPage, trackingContent, 'utf8');

const reviewPage = 'D:\\SIHPS2\\src\\app\\(officer)\\officer\\review\\[id]\\page.tsx';
let reviewContent = fs.readFileSync(reviewPage, 'utf8');
reviewContent = reviewContent.replace(/'VERIFIED'/g, "'INO_VERIFIED'");
fs.writeFileSync(reviewPage, reviewContent, 'utf8');
