const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\apply\\page.tsx': `'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { SCHEMES } from '@/lib/mock-data';
import { CheckCircle, AlertTriangle, ArrowRight, Upload } from 'lucide-react';

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const schemeCode = searchParams.get('scheme') || 'NFST';
  const scheme = SCHEMES.find(s => s.code === schemeCode) || SCHEMES[0];
  const { currentUser, applications } = useAppStore();
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleCheckEligibility = () => {
    setIsEligible(true); // Mocking positive eligibility for prototype
    setTimeout(() => setStep(2), 1500);
  };

  const handleSubmit = () => {
    // Generate a mock application
    const newApp = {
      id: \`APP-\${Math.floor(Math.random() * 100000)}\`,
      applicantId: currentUser?.id || 'USR-1',
      applicantName: currentUser?.name || 'Applicant',
      apaarId: currentUser?.apaarId || '123456789012',
      aadhaarHash: 'hash',
      schemeCode: scheme.code,
      schemeName: scheme.name,
      state: 'Jharkhand',
      institution: 'NIT Jamshedpur',
      annualIncome: 250000,
      pgMarksPercent: 85,
      age: 24,
      gender: 'MALE' as any,
      isPwD: false,
      isPVTG: false,
      status: 'SUBMITTED' as any,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: [
        { id: 'd1', applicationId: '', type: 'AADHAAR' as any, fileName: 'aadhaar.pdf', uploadedAt: new Date().toISOString(), status: 'PENDING' as any }
      ],
      deficiencies: []
    };
    
    useAppStore.setState(state => ({
      applications: [newApp, ...state.applications],
      notifications: [\`Application submitted for \${scheme.name}\`, ...state.notifications]
    }));
    
    router.push(\`/applicant/applications/\${newApp.id}\`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Application Wizard</h1>
        <p className="text-slate-500 mt-1">Applying for: <span className="font-semibold text-slate-900">{scheme.name}</span></p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="flex gap-2 mb-10">
          {['Eligibility', 'Personal Info', 'Documents', 'Review'].map((label, i) => (
            <div key={i} className="flex-1 flex flex-col gap-2">
              <div className={\`h-2 rounded-full \${i + 1 <= step ? 'bg-blue-600' : 'bg-slate-100'}\`}></div>
              <span className={\`text-xs font-bold \${i + 1 <= step ? 'text-blue-600' : 'text-slate-400'}\`}>{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Eligibility Engine Evaluation</h2>
            <p className="text-slate-500">The system will verify your profile against the active scheme criteria.</p>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Scheme:</span>
                <span className="font-bold text-slate-900">{scheme.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Category Requirement:</span>
                <span className="font-bold text-slate-900">Scheduled Tribe (ST)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Income Limit:</span>
                <span className="font-bold text-slate-900">≤ ₹{scheme.maxIncome.toLocaleString()}/yr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Min. Marks:</span>
                <span className="font-bold text-slate-900">{scheme.minMarksPercent}%</span>
              </div>
            </div>

            {isEligible === null ? (
              <button onClick={handleCheckEligibility} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                Run Eligibility Check
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 items-center text-green-800">
                <CheckCircle className="h-6 w-6 shrink-0" />
                <div>
                  <div className="font-bold">You are eligible to apply!</div>
                  <div className="text-sm mt-1">All scheme constraints satisfied. Proceeding to application...</div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal & Academic Details</h2>
            <p className="text-slate-500">Auto-filled from your profile and DigiLocker.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name (via Aadhaar)</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" defaultValue={currentUser?.name || "Applicant"} readOnly />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">APAAR ID</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" defaultValue={currentUser?.apaarId || "1234567890"} readOnly />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Current Institution</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2" defaultValue="NIT Jamshedpur" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">PG Marks (%)</label>
                <input type="number" className="w-full border border-slate-300 rounded-lg px-4 py-2" defaultValue="85" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Document Upload & AI Verification</h2>
            <p className="text-slate-500">Please upload the required scheme-specific documents.</p>
            
            <div className="space-y-4">
              {scheme.requiredDocs.map(doc => (
                <div key={doc} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="font-semibold text-slate-700">{doc.replace('_', ' ')}</div>
                  <button className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 mt-3 md:mt-0">
                    <Upload className="h-4 w-4" /> Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Final Review</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-blue-900">
              <h3 className="font-bold text-lg mb-2">Declaration</h3>
              <p className="text-sm leading-relaxed">
                I hereby declare that all information provided is true and correct to the best of my knowledge. 
                I understand that any false information may lead to the rejection of my application and legal action.
              </p>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" required />
              <span className="font-semibold text-slate-700">I agree to the terms and conditions.</span>
            </label>
          </div>
        )}

        {step > 1 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
            <button 
              onClick={() => setStep(s => s - 1)}
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => {
                if (step < 4) setStep(s => s + 1);
                else handleSubmit();
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              {step === 4 ? 'Submit Application' : 'Continue'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApplicationWizard() {
  return (
    <Suspense fallback={<div>Loading application...</div>}>
      <ApplyContent />
    </Suspense>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(admin)\\admin\\merit-list\\page.tsx': `'use client';
import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CheckCircle, Trophy, Users } from 'lucide-react';

export default function AdminMeritList() {
  const { applications, updateAppStatus } = useAppStore();
  const [hasRun, setHasRun] = useState(false);
  
  const eligibleApps = applications.filter(a => a.status === 'INO_VERIFIED' || a.status === 'AI_SCRUTINY');

  const runSelection = () => {
    eligibleApps.forEach(app => {
      // Mock merit criteria: pgMarks > 80 gets APPROVED
      if (app.pgMarksPercent >= 80) {
        updateAppStatus(app.id, 'APPROVED');
      } else {
        updateAppStatus(app.id, 'REJECTED');
      }
    });
    setHasRun(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Merit-Based Selection Engine</h1>
          <p className="text-slate-500 mt-1">Screening and final selection oversight.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        {!hasRun ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{eligibleApps.length} Candidates Ready</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              The engine will apply scheme-specific quota rules (PVTG, Female, PwD) and rank candidates based on academic marks.
            </p>
            <button 
              onClick={runSelection}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Run Selection Algorithm
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-900 flex items-start gap-4 mb-8">
              <CheckCircle className="h-6 w-6 shrink-0 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg">Selection Complete</h3>
                <p className="text-sm mt-1">All verified candidates have been screened and processed. The final list is ready for sanctioning.</p>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-4">Generated Merit List (NFST)</h3>
            <table className="w-full text-left text-sm text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Rank</th>
                  <th className="px-4 py-3 font-semibold">App ID</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {eligibleApps.map((app, i) => (
                  <tr key={app.id}>
                    <td className="px-4 py-3 font-bold">#{i + 1}</td>
                    <td className="px-4 py-3 font-mono">{app.id}</td>
                    <td className="px-4 py-3">{app.pgMarksPercent}%</td>
                    <td className="px-4 py-3">
                      <span className={\`font-bold \${app.pgMarksPercent >= 80 ? 'text-green-600' : 'text-red-600'}\`}>
                        {app.pgMarksPercent >= 80 ? 'SELECTED' : 'WAITLISTED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\fellowship-management\\page.tsx': `'use client';
import React from 'react';
import { useAppStore } from '@/lib/store';

export default function FellowshipManagement() {
  const { applications, currentUser } = useAppStore();
  const activeFellowship = applications.find(a => a.applicantId === currentUser?.id && a.status === 'APPROVED');

  if (!activeFellowship) {
    return (
      <div className="p-8 text-center text-slate-500">
        You do not have any active post-selection fellowships.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Post-Selection Management</h1>
        <p className="text-slate-500 mt-1">Manage quarterly reports and stipend tracking.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold">{activeFellowship.schemeName}</h2>
            <p className="text-sm text-slate-500 mt-1">ID: {activeFellowship.id}</p>
          </div>
          <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
            Active Fellowship
          </div>
        </div>

        <h3 className="font-bold text-lg mb-4">Quarterly Progress Reports</h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Quarter</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Disbursement</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-bold">Q1 (Jan-Mar)</td>
                <td className="px-4 py-3 text-green-600 font-semibold">Verified by Guide</td>
                <td className="px-4 py-3">₹31,000 via DBT</td>
                <td className="px-4 py-3"><button className="text-blue-600 font-semibold">View</button></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold">Q2 (Apr-Jun)</td>
                <td className="px-4 py-3 text-orange-600 font-semibold">Pending Upload</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3"><button className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-semibold text-xs">Upload Report</button></td>
              </tr>
            </tbody>
          </table>
        </div>
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
console.log('Setup script 7 complete.');
