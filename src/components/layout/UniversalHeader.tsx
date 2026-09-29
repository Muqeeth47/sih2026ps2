'use client';
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

  const [isOnline, setIsOnline] = useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const on = () => setIsOnline(true);
      const off = () => setIsOnline(false);
      window.addEventListener('online', on);
      window.addEventListener('offline', off);
      return () => {
        window.removeEventListener('online', on);
        window.removeEventListener('offline', off);
      };
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span>Government of India</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono">
            <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className={isOnline ? 'text-emerald-400' : 'text-amber-400'}>
              {isOnline ? 'PWA Synced (Online)' : 'Offline Cache (Auto-Sync)'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-300 transition-colors">A-</button>
          <button className="hover:text-blue-300 transition-colors">A</button>
          <button className="hover:text-blue-300 transition-colors">A+</button>
          <div className="h-3 w-px bg-slate-600"></div>
          <button className="hover:text-blue-300 transition-colors">English</button>
          <button className="hover:text-blue-300 transition-colors">हिन्दी</button>
          <button className="hover:text-blue-300 transition-colors">ᱥᱟᱱᱛᱟᱲᱤ</button>
        </div>
      </div>

      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-blue-700 text-white shadow-sm">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm md:text-base font-bold leading-none text-slate-900">Ministry of Tribal Affairs</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block">Scholarship & Fellowship Portal</span>
            </div>
          </Link>
          
          <div className="h-6 sm:h-8 w-px bg-slate-200 shrink-0"></div>
          
          <img 
            src="/Ministry_of_Tribal_Affairs.svg" 
            alt="Ministry of Tribal Affairs" 
            className="h-8 sm:h-10 w-auto object-contain shrink-0"
          />
        </div>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/scholarships" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Scholarships</Link>
          <Link href="/fellowships" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Fellowships</Link>
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
              <Link href="/scholarships" className="text-sm font-semibold text-slate-700">Scholarships</Link>
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
