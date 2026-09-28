const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\app\\(officer)\\officer\\applications\\page.tsx': `'use client';
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, getSchemeColor } from '@/lib/utils';
import { Eye } from 'lucide-react';

export default function OfficerApplicationsPage() {
  const { applications } = useAppStore();
  
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Application Scrutiny</h1>
        <p className="text-slate-500 mt-1">Review and verify student applications.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Application ID</th>
                <th className="px-6 py-4 font-semibold">Scheme</th>
                <th className="px-6 py-4 font-semibold">Applicant</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900 whitespace-nowrap">{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{app.schemeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Priya Meena
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={\`text-xs font-bold px-2.5 py-1 rounded-full border \${getStatusColor(app.status)}\`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href={\`/officer/review/\${app.id}\`} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Eye className="h-3.5 w-3.5" /> Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(officer)\\officer\\review\\[id]\\page.tsx': `'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, formatCurrency, getDocumentLabel } from '@/lib/utils';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function OfficerReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { applications, updateAppStatus, addDeficiency } = useAppStore();
  const app = applications.find(a => a.id === id);
  const [deficiencyMsg, setDeficiencyMsg] = useState('');

  if (!app) return <div>Application not found</div>;

  const handleVerify = () => {
    updateAppStatus(app.id, 'VERIFIED');
    alert('Application Verified Successfully');
    router.push('/officer/applications');
  };

  const handleReject = () => {
    updateAppStatus(app.id, 'REJECTED');
    alert('Application Rejected');
    router.push('/officer/applications');
  };

  const handleDeficiency = () => {
    if (!deficiencyMsg) {
      alert("Please enter a deficiency message.");
      return;
    }
    addDeficiency(app.id, deficiencyMsg);
    alert('Deficiency Marked. Applicant notified.');
    router.push('/officer/applications');
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/officer/applications" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Review</h1>
            <p className="text-slate-500 font-mono text-sm mt-1">{app.id}</p>
          </div>
        </div>
        <div className={\`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-sm \${getStatusColor(app.status)}\`}>
          {getStatusLabel(app.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Scheme Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500 block">Name</span><span className="font-bold">{app.schemeName}</span></div>
              <div><span className="text-slate-500 block">Code</span><span className="font-mono">{app.schemeCode}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Academic & Income</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500 block">Marks (%)</span><span className="font-bold">{app.pgMarksPercent}%</span></div>
              <div><span className="text-slate-500 block">Annual Income</span><span className="font-bold">{formatCurrency(app.annualIncome)}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Uploaded Documents</h3>
            <ul className="space-y-3">
              {app.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold text-sm">{getDocumentLabel(doc.type)}</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View File</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Scrutiny Actions</h3>
            
            <button onClick={handleVerify} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
              <CheckCircle className="h-5 w-5" /> Verify & Approve
            </button>
            
            <button onClick={handleReject} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              <XCircle className="h-5 w-5" /> Reject Application
            </button>

            <div className="pt-4 border-t border-slate-100 mt-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mark Deficiency</label>
              <textarea 
                rows={3} 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 mb-3"
                placeholder="Reason for deficiency..."
                value={deficiencyMsg}
                onChange={(e) => setDeficiencyMsg(e.target.value)}
              />
              <button onClick={handleDeficiency} className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold py-2.5 rounded-lg transition-colors border border-orange-200">
                <AlertTriangle className="h-4 w-4" /> Request Correction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { FileText } from 'lucide-react';
`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\page.tsx': `'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Ministry overview and scheme management.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Total Schemes</div>
          <div className="text-3xl font-bold text-slate-900">12</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Applications</div>
          <div className="text-3xl font-bold text-slate-900">4,521</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Sanctioned Funds</div>
          <div className="text-3xl font-bold text-slate-900">₹45.2 Cr</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Active Institutes</div>
          <div className="text-3xl font-bold text-slate-900">892</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Link href="/admin/schemes" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Schemes &rarr;</h3>
           <p className="text-slate-600">Create, edit, or close scholarship schemes.</p>
         </Link>
         <Link href="/admin/users" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Users &rarr;</h3>
           <p className="text-slate-600">Administer officers, institutes, and applicants.</p>
         </Link>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\schemes\\page.tsx': `import React from 'react';
export default function AdminSchemes() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Manage Schemes</h1><p className="mt-4 text-slate-500">Prototype view.</p></div>;
}`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\applications\\page.tsx': `import React from 'react';
export default function AdminApps() {
  return <div className="p-8"><h1 className="text-2xl font-bold">All Applications</h1><p className="mt-4 text-slate-500">Prototype view.</p></div>;
}`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\users\\page.tsx': `import React from 'react';
export default function AdminUsers() {
  return <div className="p-8"><h1 className="text-2xl font-bold">User Management</h1><p className="mt-4 text-slate-500">Prototype view.</p></div>;
}`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\merit-list\\page.tsx': `import React from 'react';
export default function AdminMerit() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Merit List Generation</h1><p className="mt-4 text-slate-500">Prototype view.</p></div>;
}`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\reports\\page.tsx': `import React from 'react';
export default function AdminReports() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1><p className="mt-4 text-slate-500">Prototype view.</p></div>;
}`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Setup script 4 complete.');
