const fs = require('fs');

const headerPath = 'D:\\SIHPS2\\src\\components\\layout\\UniversalHeader.tsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');

headerContent = headerContent.replace(
  /<Link href="\/schemes" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Scholarships<\/Link>/g,
  '<Link href="/scholarships" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Scholarships</Link>'
);

headerContent = headerContent.replace(
  /<Link href="\/schemes\?type=fellowship" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Fellowships<\/Link>/g,
  '<Link href="/fellowships" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Fellowships</Link>'
);

headerContent = headerContent.replace(
  /<Link href="\/schemes" className="text-sm font-semibold text-slate-700">Scholarships<\/Link>/g,
  '<Link href="/scholarships" className="text-sm font-semibold text-slate-700">Scholarships</Link>'
);

fs.writeFileSync(headerPath, headerContent, 'utf8');

const footerPath = 'D:\\SIHPS2\\src\\components\\layout\\PublicFooter.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace(/\/schemes\?type=fellowship/g, '/fellowships');
footerContent = footerContent.replace(/\/schemes/g, '/scholarships');
fs.writeFileSync(footerPath, footerContent, 'utf8');

const appLayoutPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\layout.tsx';
let appLayoutContent = fs.readFileSync(appLayoutPath, 'utf8');
appLayoutContent = appLayoutContent.replace(/\/applicant\/schemes/g, '/scholarships');
fs.writeFileSync(appLayoutPath, appLayoutContent, 'utf8');

const applicantPagePath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\page.tsx';
let applicantPageContent = fs.readFileSync(applicantPagePath, 'utf8');
applicantPageContent = applicantPageContent.replace(/\/applicant\/schemes/g, '/scholarships');
fs.writeFileSync(applicantPagePath, applicantPageContent, 'utf8');

console.log('Setup script 6 complete.');
