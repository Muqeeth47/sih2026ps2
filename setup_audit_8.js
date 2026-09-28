const fs = require('fs');

const sidebarPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\layout.tsx';
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

if (!sidebarContent.includes('fellowship-management')) {
  sidebarContent = sidebarContent.replace(
    '<Link href="/applicant/tracking"',
    '<Link href="/applicant/fellowship-management" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-100"><Trophy className="h-5 w-5" /> Manage Fellowship</Link>\n              <Link href="/applicant/tracking"'
  );
  sidebarContent = sidebarContent.replace(
    'import { FileText, Map, User, Bell, LayoutDashboard } from \'lucide-react\';',
    'import { FileText, Map, User, Bell, LayoutDashboard, Trophy } from \'lucide-react\';'
  );
  fs.writeFileSync(sidebarPath, sidebarContent, 'utf8');
}

const officerReviewPath = 'D:\\SIHPS2\\src\\app\\(officer)\\officer\\review\\[id]\\page.tsx';
let reviewContent = fs.readFileSync(officerReviewPath, 'utf8');
if (!reviewContent.includes('Document Intelligence')) {
  reviewContent = reviewContent.replace(
    '<h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Uploaded Documents</h3>',
    '<div className="flex justify-between border-b border-slate-100 pb-3 mb-4"><h3 className="font-bold text-slate-900">Uploaded Documents</h3><span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle className="h-3 w-3" /> AI Verified</span></div>'
  );
  
  reviewContent = reviewContent.replace(
    '<div className="space-y-6">',
    '<div className="space-y-6">\n          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 text-sm text-orange-800 mb-6">\n            <AlertTriangle className="h-5 w-5 shrink-0" />\n            <div>\n              <strong>Potential Duplicate Detected</strong><br/>\n              The AI screening engine flagged a 98% match with APAAR ID {app.apaarId} in the "Post Matric" scheme. Please verify manually.\n            </div>\n          </div>'
  );

  fs.writeFileSync(officerReviewPath, reviewContent, 'utf8');
}

console.log('Setup script 8 complete.');
