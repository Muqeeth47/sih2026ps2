const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\applications\\page.tsx': `'use client';
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, getSchemeColor } from '@/lib/utils';
import { FileText, Eye, Navigation } from 'lucide-react';

export default function MyApplicationsPage() {
  const { applications, currentUser } = useAppStore();
  const myApps = applications.filter(app => app.applicantId === currentUser?.id);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Applications</h1>
        <p className="text-slate-500 mt-1">View and manage all your scholarship applications.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Application ID</th>
                <th className="px-6 py-4 font-semibold">Scheme</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Submitted</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {myApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900 whitespace-nowrap">{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{app.schemeName}</div>
                    <div className={\`mt-1 inline-block text-xs px-2 py-0.5 rounded border font-mono \${getSchemeColor(app.schemeCode)}\`}>
                      {app.schemeCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={\`text-xs font-bold px-2.5 py-1 rounded-full border \${getStatusColor(app.status)}\`}>
                      {getStatusLabel(app.status)}
                    </span>
                    {app.status === 'DEFECTIVE' && (
                      <div className="text-red-600 text-xs mt-1 font-semibold">Action Required</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                    12 Oct 2024
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Link href={\`/applicant/applications/\${app.id}\`} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                        <Eye className="h-3.5 w-3.5" /> View
                      </Link>
                      <Link href="/applicant/tracking" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                        <Navigation className="h-3.5 w-3.5" /> Track
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {myApps.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              You haven't applied for any schemes yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\applications\\[id]\\page.tsx': `'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getStatusColor, getStatusLabel, formatCurrency, getDocumentLabel } from '@/lib/utils';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { applications } = useAppStore();
  const app = applications.find(a => a.id === id);

  if (!app) {
    return <div>Application not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <Link href="/applicant/applications" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Details</h1>
          <p className="text-slate-500 font-mono text-sm mt-1">{app.id}</p>
        </div>
      </div>

      {app.status === 'DEFECTIVE' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
            <div>
              <h3 className="font-bold text-red-900">Deficiency Detected</h3>
              <ul className="mt-2 space-y-2">
                {app.deficiencies.map((def, i) => (
                  <li key={i} className="text-sm text-red-700 bg-red-100/50 p-3 rounded-md border border-red-200">
                    <span className="font-bold">{def.field}:</span> {def.message}
                    {!def.isResolved && (
                      <button className="mt-2 block bg-white border border-red-300 px-3 py-1.5 rounded text-red-700 font-bold hover:bg-red-50 text-xs">
                        Resolve Now
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

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
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Academic Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-slate-500 block">Marks (%)</span><span className="font-bold">{app.pgMarksPercent}%</span></div>
              <div><span className="text-slate-500 block">Annual Income</span><span className="font-bold">{formatCurrency(app.annualIncome)}</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Submitted Documents</h3>
            <ul className="space-y-3">
              {app.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-sm">{getDocumentLabel(doc.type)}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{doc.fileName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Current Status</h3>
            <div className={\`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-sm \${getStatusColor(app.status)}\`}>
              {getStatusLabel(app.status)}
            </div>
            
            <div className="mt-8 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
              <ul className="space-y-6 relative z-10">
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"><CheckCircle className="h-3 w-3 text-white" /></div>
                  <div><div className="text-sm font-bold text-slate-900">Submitted</div><div className="text-xs text-slate-500">12 Oct 2024</div></div>
                </li>
                <li className="flex gap-4">
                  <div className={\`h-6 w-6 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm \${app.status === 'VERIFIED' || app.status === 'APPROVED' ? 'bg-blue-600' : 'bg-slate-200'}\`}></div>
                  <div><div className="text-sm font-bold text-slate-900">Document Verification</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Under Scrutiny</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Sanction</div></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border-4 border-white shadow-sm"></div>
                  <div><div className="text-sm font-bold text-slate-900">Disbursement</div></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\profile\\page.tsx': `'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const { currentUser } = useAppStore();

  if (!currentUser) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal and academic details.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Profile saved (Prototype)"); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" defaultValue={currentUser.name} className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input type="email" defaultValue={currentUser.email} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile</label>
              <input type="text" defaultValue="+91 9876543210" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
              <input type="text" defaultValue="Scheduled Tribe (ST)" className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
              <input type="text" defaultValue="Jharkhand" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Institution</label>
              <input type="text" defaultValue="NIT Jamshedpur" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\notifications\\page.tsx': `'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications } = useAppStore();

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
        <p className="text-slate-500 mt-1">Updates on your applications and account.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {notifications.map((note, i) => (
              <li key={i} className="p-6 hover:bg-slate-50 transition-colors flex gap-4 items-start">
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{note}</h4>
                  <span className="text-xs text-slate-500">Just now</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-12 text-center text-slate-500">No notifications.</div>
        )}
      </div>
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Setup script 3 complete.');
