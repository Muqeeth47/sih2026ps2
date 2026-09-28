const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\lib\\store.ts': `import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, User, Application } from './types';
import { MOCK_USERS, MOCK_APPLICATIONS as INITIAL_APPS } from './mock-data';

interface AppStore {
  currentRole: Role;
  currentUser: User | null;
  setRole: (role: Role) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Prototype State
  applications: Application[];
  updateAppStatus: (id: string, status: Application['status']) => void;
  addDeficiency: (id: string, message: string) => void;
  addNotification: (message: string) => void;
  notifications: string[];
}

const ROLE_TO_USER: Record<Role, User | null> = {
  GUEST: null,
  APPLICANT: MOCK_USERS[0],
  INSTITUTE_NODAL: MOCK_USERS[2],
  SCRUTINY_OFFICER: MOCK_USERS[3],
  MINISTRY_ADMIN: MOCK_USERS[4],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentRole: 'GUEST',
      currentUser: null,
      darkMode: false,
      setRole: (role: Role) =>
        set({ currentRole: role, currentUser: ROLE_TO_USER[role] }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      
      applications: INITIAL_APPS,
      updateAppStatus: (id, status) => set((s) => ({
        applications: s.applications.map(app => app.id === id ? { ...app, status } : app)
      })),
      addDeficiency: (id, message) => set((s) => ({
        applications: s.applications.map(app => app.id === id ? { 
          ...app, 
          status: 'DEFECTIVE', 
          deficiencies: [...app.deficiencies, { field: 'General', message, isResolved: false }] 
        } : app)
      })),
      notifications: ['Welcome to the MoTA Scholarship Portal.'],
      addNotification: (message) => set((s) => ({
        notifications: [message, ...s.notifications]
      }))
    }),
    { name: 'tribal-scholar-store-v2' }
  )
);
`,
  'D:\\SIHPS2\\src\\app\\(public)\\scholarships\\page.tsx': `'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SCHEMES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter for scholarships (not fellowships)
  const filteredSchemes = SCHEMES.filter(s => 
    s.type !== 'fellowship' &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Scholarships</h1>
        <p className="text-slate-600 max-w-2xl">
          Explore scholarships available to Scheduled Tribe students for school, undergraduate and postgraduate education.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search scholarships..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.code} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900">{scheme.name}</h2>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 font-mono">
                  {scheme.code}
                </span>
              </div>
              <p className="text-slate-600 mb-4">{scheme.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase">Income Ceiling</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(scheme.maxIncome)}/yr</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-4">
                  <span className="text-slate-500 text-xs uppercase">Min Marks</span>
                  <span className="font-semibold text-slate-900">{scheme.minMarksPercent}%</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-4">
                  <span className="text-slate-500 text-xs uppercase">Stipend</span>
                  <span className="font-semibold text-green-600">{formatCurrency(scheme.stipendMonthly)}/mo</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <Link href="/login?role=applicant" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-center font-semibold transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No scholarships found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(public)\\fellowships\\page.tsx': `'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SCHEMES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Search } from 'lucide-react';

export default function FellowshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter for fellowships
  const filteredSchemes = SCHEMES.filter(s => 
    s.type === 'fellowship' &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Fellowships</h1>
        <p className="text-slate-600 max-w-2xl">
          Explore fellowship opportunities supporting higher education and research for Scheduled Tribe students and scholars.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search fellowships..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.code} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900">{scheme.name}</h2>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 font-mono">
                  {scheme.code}
                </span>
              </div>
              <p className="text-slate-600 mb-4">{scheme.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex flex-col border-r border-slate-200 pr-4">
                  <span className="text-slate-500 text-xs uppercase">Stipend</span>
                  <span className="font-semibold text-green-600">{formatCurrency(scheme.stipendMonthly)}/mo</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase">Target Level</span>
                  <span className="font-semibold text-slate-900">MPhil / PhD</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <Link href="/login?role=applicant" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-center font-semibold transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No fellowships found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(public)\\login\\page.tsx': `'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ShieldCheck, User, FileCheck2, Crown } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setRole } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'applicant' || roleParam === 'officer' || roleParam === 'admin') {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent, directRole?: string) => {
    if (e) e.preventDefault();
    const role = directRole || selectedRole;
    if (role === 'applicant') {
      setRole('APPLICANT');
      router.push('/applicant');
    } else if (role === 'officer') {
      setRole('SCRUTINY_OFFICER');
      router.push('/officer');
    } else if (role === 'admin') {
      setRole('MINISTRY_ADMIN');
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col md:flex-row bg-white max-w-6xl mx-auto my-8 md:my-16 rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Left Column: Info */}
      <div className="w-full md:w-1/2 bg-blue-900 text-white p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800 text-white mb-8">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to MoTA Portal</h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Access the national scholarship and fellowship management system for Scheduled Tribe students.
          </p>
        </div>
        <div className="mt-12 text-sm text-blue-300">
          A Government of India Initiative
        </div>
      </div>

      {/* Right Column: Login Actions */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
        {!selectedRole ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Prototype Login</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">SIH Demonstration</h3>
            <p className="text-slate-500 mb-8">Click a role below to instantly authenticate.</p>
            <div className="space-y-4 flex-1">
              <button 
                onClick={(e) => handleLogin(e, 'applicant')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Applicant</div>
                    <div className="text-xs text-slate-500">applicant@demo.gov.in</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-600 group-hover:underline">Login &rarr;</div>
              </button>
              
              <button 
                onClick={(e) => handleLogin(e, 'officer')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Scrutiny Officer</div>
                    <div className="text-xs text-slate-500">officer@demo.gov.in</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-orange-600 group-hover:underline">Login &rarr;</div>
              </button>

              <button 
                onClick={(e) => handleLogin(e, 'admin')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Administrator</div>
                    <div className="text-xs text-slate-500">admin@demo.gov.in</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-red-600 group-hover:underline">Login &rarr;</div>
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Prototype Login</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {selectedRole === 'applicant' ? 'Applicant Login' : 
               selectedRole === 'officer' ? 'Officer Login' : 'Admin Login'}
            </h3>
            <p className="text-slate-500 mb-6">Demo credentials have been auto-filled.</p>
            
            <form onSubmit={(e) => handleLogin(e)} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email / ID</label>
                <input type="text" readOnly className="w-full border border-slate-300 rounded-lg px-4 py-2.5 bg-slate-100 text-slate-600" value={\`\${selectedRole}@demo.gov.in\`} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <input type="password" readOnly className="w-full border border-slate-300 rounded-lg px-4 py-2.5 bg-slate-100 text-slate-600" value="Demo@123" />
              </div>
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg mt-4 transition-colors">
                Login as {selectedRole === 'applicant' ? 'Applicant' : selectedRole === 'officer' ? 'Officer' : 'Administrator'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button 
                onClick={() => setSelectedRole(null)} 
                className="text-sm text-blue-600 hover:underline font-semibold"
              >
                &larr; Switch Role
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Setup script 1 complete.');
