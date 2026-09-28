const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\components\\layout\\UniversalHeader.tsx': `'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { ShieldCheck, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const UniversalHeader: React.FC = () => {
  const { currentRole, setRole } = useAppStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const isLoggedIn = currentRole !== 'GUEST';

  const handleLogout = () => {
    setRole('GUEST');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <div>Government of India</div>
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-300 transition-colors">A-</button>
          <button className="hover:text-blue-300 transition-colors">A</button>
          <button className="hover:text-blue-300 transition-colors">A+</button>
          <div className="h-3 w-px bg-slate-600"></div>
          <button className="hover:text-blue-300 transition-colors">English</button>
          <button className="hover:text-blue-300 transition-colors">हिन्दी</button>
        </div>
      </div>

      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto justify-between">
        {/* Left: Branding */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-700 text-white shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold leading-none text-slate-900">Ministry of Tribal Affairs</span>
            <span className="text-xs text-slate-500 font-medium hidden sm:block">Scholarship & Fellowship Portal</span>
          </div>
        </Link>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/schemes" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Scholarships</Link>
          <Link href="/schemes?type=fellowship" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Fellowships</Link>
          <Link href="/how-it-works" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">How It Works</Link>
          <Link href="/help" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Help</Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
              >
                Login <ChevronDown className="h-4 w-4" />
              </button>
              
              {isLoginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden py-2">
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Sign in to Portal</span>
                  </div>
                  <Link href="/login?role=applicant" onClick={() => setIsLoginDropdownOpen(false)} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Applicant</div>
                      <div className="text-xs text-slate-500">Apply and track scholarships</div>
                    </div>
                  </Link>
                  <Link href="/login?role=officer" onClick={() => setIsLoginDropdownOpen(false)} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Scrutiny Officer</div>
                      <div className="text-xs text-slate-500">Review applications</div>
                    </div>
                  </Link>
                  <Link href="/login?role=admin" onClick={() => setIsLoginDropdownOpen(false)} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Administrator</div>
                      <div className="text-xs text-slate-500">Manage schemes</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href={currentRole === 'APPLICANT' ? '/applicant' : currentRole === 'SCRUTINY_OFFICER' ? '/officer' : '/admin'}
                className="text-sm font-bold text-slate-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {currentRole.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-700">{currentRole.replace('_', ' ')}</span>
              </div>
              <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 transition-colors" title="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-4 shadow-lg absolute w-full left-0">
           <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm font-semibold text-slate-700">Home</Link>
              <Link href="/schemes" className="text-sm font-semibold text-slate-700">Scholarships</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-700">How It Works</Link>
              {!isLoggedIn ? (
                <div className="pt-4 border-t border-slate-100 grid gap-2">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">Login As</div>
                  <Link href="/login?role=applicant" className="text-sm font-semibold text-blue-600">Applicant</Link>
                  <Link href="/login?role=officer" className="text-sm font-semibold text-orange-600">Scrutiny Officer</Link>
                  <Link href="/login?role=admin" className="text-sm font-semibold text-red-600">Administrator</Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link href={currentRole === 'APPLICANT' ? '/applicant' : '/officer'} className="text-sm font-semibold text-slate-700">Dashboard</Link>
                  <button onClick={handleLogout} className="text-left text-sm font-semibold text-red-600">Logout</button>
                </div>
              )}
           </nav>
        </div>
      )}
    </header>
  );
};
`,
  'D:\\SIHPS2\\src\\app\\layout.tsx': `import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { UniversalHeader } from '@/components/layout/UniversalHeader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Ministry of Tribal Affairs | Scholarship Portal',
  description: 'AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
        <UniversalHeader />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
`,
  'D:\\SIHPS2\\src\\components\\layout\\Sidebar.tsx': `'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export const Sidebar: React.FC<{ items: SidebarItem[] }> = ({ items }) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white hidden md:block py-6 min-h-[calc(100vh-6.5rem)]">
      <nav className="flex flex-col gap-1 px-4">
        {items.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/applicant' && item.href !== '/officer' && item.href !== '/admin');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={\`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors \${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }\`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\layout.tsx': `import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function ApplicantLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/applicant' },
    { name: 'Find Scholarships', href: '/applicant/schemes' },
    { name: 'My Applications', href: '/applicant/applications' },
    { name: 'Documents', href: '/applicant/documents' },
    { name: 'Track Application', href: '/applicant/tracking' },
    { name: 'Notifications', href: '/applicant/notifications' },
    { name: 'Profile', href: '/applicant/profile' },
    { name: 'Help', href: '/applicant/help' },
  ];

  return (
    <div className="flex flex-1 max-w-[1600px] w-full mx-auto bg-slate-50">
      <Sidebar items={navItems} />
      {/* 
        This is the main content container. 
        It uses flex-1 to fill the remaining width.
        min-w-0 prevents flex items from overflowing.
      */}
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(officer)\\layout.tsx': `import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/officer' },
    { name: 'Applications', href: '/officer/applications' },
    { name: 'Deficiencies', href: '/officer/deficiencies' },
    { name: 'Profile', href: '/officer/profile' },
  ];

  return (
    <div className="flex flex-1 max-w-[1600px] w-full mx-auto bg-slate-50">
      <Sidebar items={navItems} />
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(admin)\\layout.tsx': `import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Schemes', href: '/admin/schemes' },
    { name: 'Applications', href: '/admin/applications' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    <div className="flex flex-1 max-w-[1600px] w-full mx-auto bg-slate-50">
      <Sidebar items={navItems} />
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(public)\\login\\page.tsx': `'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ShieldCheck, User, FileCheck2, Crown } from 'lucide-react';

export default function LoginPage() {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'applicant') {
      setRole('APPLICANT');
      router.push('/applicant');
    } else if (selectedRole === 'officer') {
      setRole('SCRUTINY_OFFICER');
      router.push('/officer');
    } else if (selectedRole === 'admin') {
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
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-blue-100">
              <div className="h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center shrink-0">✓</div>
              <span>End-to-end digital application processing</span>
            </li>
            <li className="flex items-center gap-3 text-blue-100">
              <div className="h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center shrink-0">✓</div>
              <span>Direct Benefit Transfer (DBT) integration</span>
            </li>
            <li className="flex items-center gap-3 text-blue-100">
              <div className="h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center shrink-0">✓</div>
              <span>Automated scheme eligibility matching</span>
            </li>
          </ul>
        </div>
        <div className="mt-12 text-sm text-blue-300">
          A Government of India Initiative
        </div>
      </div>

      {/* Right Column: Login Actions */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
        {!selectedRole ? (
          <>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h3>
            <p className="text-slate-500 mb-8">Select your role to access the portal</p>
            <div className="space-y-4 flex-1">
              <button 
                onClick={() => setSelectedRole('applicant')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Student / Applicant</div>
                  <div className="text-xs text-slate-500">Login with Aadhaar OTP or DigiLocker</div>
                </div>
              </button>
              <button 
                onClick={() => setSelectedRole('officer')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Scrutiny Officer</div>
                  <div className="text-xs text-slate-500">Login with NIC SSO (@nic.in)</div>
                </div>
              </button>
              <button 
                onClick={() => setSelectedRole('admin')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Ministry Administrator</div>
                  <div className="text-xs text-slate-500">Login with PKI Token / DSC</div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-6">
              <button 
                onClick={() => setSelectedRole(null)} 
                className="text-sm text-blue-600 hover:underline font-semibold"
              >
                &larr; Back to roles
              </button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {selectedRole === 'applicant' ? 'Applicant Login' : 
               selectedRole === 'officer' ? 'Officer Login' : 'Admin Login'}
            </h3>
            <p className="text-slate-500 mb-8">Enter your credentials to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {selectedRole === 'applicant' ? 'Aadhaar / Mobile Number' : 'User ID'}
                </label>
                <input type="text" required className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter ID" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password / OTP</label>
                <input type="password" required className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg mt-4 transition-colors">
                Sign In securely
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\page.tsx': `'use client';
import React from 'react';
import Link from 'next/link';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { getSchemeColor, getStatusColor, getStatusLabel, formatCurrency } from '@/lib/utils';
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ApplicantDashboard() {
  const activeApp = MOCK_APPLICATIONS[0]; // Priya Meena
  const deficientApp = MOCK_APPLICATIONS[1]; // Arjun Munda

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Priya!</h1>
          <p className="text-slate-500 mt-1">Here is the status of your scholarship applications.</p>
        </div>
      </div>

      {/* Alert if deficiency exists */}
      {deficientApp && deficientApp.deficiencies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex gap-4 w-full">
          <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-900 text-base">Action Required: Document Deficiency</h3>
            <p className="text-sm text-red-700 mt-1">
              Your application for {deficientApp.schemeName} requires your attention. 
              Please resolve the flagged issues within 7 days.
            </p>
            <Link href={\`/applicant/tracking/\${deficientApp.id}\`} className="inline-block mt-3 text-sm font-bold text-red-700 hover:underline">
              Resolve Issue &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Active Application Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Active Application</div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{activeApp.schemeName}</h2>
              <span className={\`text-xs font-mono px-2 py-0.5 rounded border \${getSchemeColor(activeApp.schemeCode)}\`}>
                {activeApp.schemeCode}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Status:</span>
            <span className={\`text-sm font-bold px-3 py-1.5 rounded-full border \${getStatusColor(activeApp.status)}\`}>
              {getStatusLabel(activeApp.status)}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Progress Timeline */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-slate-900">Application Progress</span>
              <span className="text-sm font-medium text-slate-500">Step 3 of 5</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              <div className="text-xs font-semibold text-blue-700">Submitted</div>
              <div className="text-xs font-semibold text-blue-700">Verified</div>
              <div className="text-xs font-bold text-blue-700">Scrutiny</div>
              <div className="text-xs font-medium text-slate-400">Sanction</div>
              <div className="text-xs font-medium text-slate-400">Disbursal</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Application ID</div>
              <div className="font-mono text-base font-bold text-slate-900">{activeApp.id}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Family Income</div>
              <div className="text-base font-bold text-slate-900">{formatCurrency(activeApp.annualIncome)}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Academic Score</div>
              <div className="text-base font-bold text-slate-900">{activeApp.pgMarksPercent}%</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Submitted On</div>
              <div className="text-base font-bold text-slate-900">12 Oct 2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Link href="/applicant/tracking" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors text-lg">Track Application</h3>
            <p className="text-sm text-slate-500 line-clamp-2">View detailed status updates and tracking history.</p>
          </div>
        </Link>
        <Link href="/applicant/schemes" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors text-lg">Find Scholarships</h3>
            <p className="text-sm text-slate-500 line-clamp-2">Check eligibility for other MoTA schemes.</p>
          </div>
        </Link>
        <Link href="/applicant/documents" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-4">
          <div className="h-12 w-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors text-lg">Document Vault</h3>
            <p className="text-sm text-slate-500 line-clamp-2">Manage your verified digital certificates.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\documents\\page.tsx': `'use client';
import React from 'react';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { getDocumentLabel } from '@/lib/utils';
import { FileText, CheckCircle, Upload, Eye } from 'lucide-react';

export default function DocumentsPage() {
  const activeApp = MOCK_APPLICATIONS[0];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Document Vault</h1>
        <p className="text-slate-500 mt-1">Manage your verified digital certificates and affidavits securely.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">Uploaded Documents</h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold w-1/3">Document Name</th>
                <th className="px-6 py-4 font-semibold w-1/4">Type</th>
                <th className="px-6 py-4 font-semibold w-1/6">Status</th>
                <th className="px-6 py-4 font-semibold w-1/6">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right w-1/6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activeApp.documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3 font-medium text-slate-900 whitespace-nowrap">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-slate-500" />
                    </div>
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getDocumentLabel(doc.type)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold border border-green-200">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                    12 Oct 2024
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer w-full group">
        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
          <Upload className="h-7 w-7 text-blue-600" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-1">Upload Additional Documents</h3>
        <p className="text-sm text-slate-500 mb-6">Supports PDF, JPG, PNG up to 10MB.</p>
        <button className="bg-white border border-slate-300 text-slate-700 shadow-sm px-6 py-2.5 rounded-lg font-bold hover:border-slate-400 transition-colors">
          Browse Files
        </button>
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
console.log('Setup complete.');
