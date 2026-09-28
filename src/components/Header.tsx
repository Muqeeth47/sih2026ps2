'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import type { Role } from '@/lib/types';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Crown,
  KeyRound,
  LogOut,
  Menu,
  X,
  FileText,
  Lock,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenLegal: (view: 'terms' | 'privacy') => void;
}

const ROLES_META: Array<{
  role: Role;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  email: string;
  idProof: string;
}> = [
  {
    role: 'APPLICANT',
    label: 'ST Scholar',
    sub: 'Level 1: Applicant Portal',
    icon: ShieldCheck,
    email: 'priya.meena@student.ac.in',
    idProof: 'APAAR-2024-001234',
  },
  {
    role: 'INSTITUTE_NODAL',
    label: 'Institute Nodal (INO)',
    sub: 'Level 2: BIT Mesra Liaison',
    icon: Building2,
    email: 'kavita.soren@bitmesra.ac.in',
    idProof: 'INO-JH-2021-089',
  },
  {
    role: 'SCRUTINY_OFFICER',
    label: 'MoTA Scrutiny Officer',
    sub: 'Level 3: NIC AI Workbench',
    icon: FileCheck2,
    email: 'rajesh.kumar@nic.in',
    idProof: 'NIC-DESK-42',
  },
  {
    role: 'MINISTRY_ADMIN',
    label: 'Joint Secretary (Admin)',
    sub: 'Level 4: Apex Policy & DBT',
    icon: Crown,
    email: 'js.tribal@mota.gov.in',
    idProof: 'DSC-MOTA-PKI-001',
  },
];

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange, onOpenLegal }) => {
  const { currentRole, setRole, currentUser } = useAppStore();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSelectRole = (r: Role) => {
    setRole(r);
    if (r === 'APPLICANT') onTabChange('overview');
    else if (r === 'INSTITUTE_NODAL') onTabChange('inbox');
    else if (r === 'SCRUTINY_OFFICER') onTabChange('queue');
    else if (r === 'MINISTRY_ADMIN') onTabChange('kpi');
    setShowRoleModal(false);
  };

  return (
    <header className="sticky top-0 z-50 h-14 sm:h-16 bg-white border-b border-slate-200 flex items-center px-2.5 sm:px-5 gap-1.5 sm:gap-3 shadow-sm">
      
      {/* Logo & Identity */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-md shrink-0">
           <span className="text-white font-bold text-xs">MoTA</span>
        </div>
        <div className="min-w-0">
          <div className="text-[0.86rem] font-black text-slate-900 leading-tight tracking-tight flex items-center gap-1.5">
            <span className="truncate">TribalScholar-AI</span>
          </div>
          <div className="hidden md:block text-[9.5px] text-slate-500 font-bold tracking-wider uppercase">
            Ministry of Tribal Affairs · Govt of India
          </div>
        </div>
        <div className="hidden sm:block w-[1px] h-[18px] bg-slate-300 mx-1 shrink-0" />
        <img 
          src="/Ministry_of_Tribal_Affairs.svg" 
          alt="Ministry of Tribal Affairs" 
          className="h-6 sm:h-8 w-auto object-contain shrink-0"
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Right Controls Container */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Online Status (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: isOnline ? '#15803d' : '#d97706' }} />
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider" style={{ color: isOnline ? '#15803d' : '#d97706' }}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {mounted && (
          <>
            <button
              onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold transition-colors hover:bg-blue-100"
              title="Click to Switch Role"
            >
               <span>Switch Role</span>
               <KeyRound size={12} />
            </button>

            {/* Compact Role Badge */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[0.68rem] font-extrabold"
              style={{
                background: currentRole === 'APPLICANT' ? '#e0f2fe' : currentRole === 'INSTITUTE_NODAL' ? '#ede9fe' : currentRole === 'SCRUTINY_OFFICER' ? '#fef9ec' : '#f0fdf4',
                color: currentRole === 'APPLICANT' ? '#0f5ca8' : currentRole === 'INSTITUTE_NODAL' ? '#7c3aed' : currentRole === 'SCRUTINY_OFFICER' ? '#b45309' : '#065f46',
                border: `1px solid ${currentRole === 'APPLICANT' ? '#bae6fd' : currentRole === 'INSTITUTE_NODAL' ? '#ddd6fe' : currentRole === 'SCRUTINY_OFFICER' ? '#fde68a' : '#bbf7d0'}`
              }}
            >
               <span>
                  {currentRole === 'APPLICANT' ? 'L1' :
                   currentRole === 'INSTITUTE_NODAL' ? 'L2' :
                   currentRole === 'SCRUTINY_OFFICER' ? 'L3' : 'L4'}
               </span>
            </div>

            {/* User Badge - desktop only */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-[#0f5ca8] flex items-center justify-center text-[0.68rem] font-extrabold text-white shrink-0">
                {currentUser?.name?.charAt(0) ?? 'U'}
              </div>
              <div>
                <div className="text-[0.72rem] font-bold text-slate-900 leading-tight">
                  {currentUser?.name}
                </div>
                <div className="text-[0.62rem] text-slate-500 font-mono">
                  {ROLES_META.find(r => r.role === currentRole)?.label}
                </div>
              </div>
            </div>

            {/* Quick Legal Links */}
            <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-2 ml-1">
              <button onClick={() => onOpenLegal('terms')} className="text-[10px] uppercase font-bold text-slate-500 hover:text-slate-800 tracking-wider">
                Terms
              </button>
              <button onClick={() => onOpenLegal('privacy')} className="text-[10px] uppercase font-bold text-slate-500 hover:text-slate-800 tracking-wider">
                Privacy
              </button>
            </div>
          </>
        )}
      </div>

      {/* Role Selection & Click-to-Autofill Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#0f5ca8] font-black">
                  RBAC 4-TIER SECURITY CONTROLLER
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Switch Role / Autofill Credentials
                </h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-700 bg-white border border-slate-200 p-1.5 rounded-md hover:bg-slate-50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
               <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
                 Select any role to automatically simulate NIC SSO / Aadhaar OTP / DSC PKI
                 authentication with pre-seeded MoTA production profiles.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                 {ROLES_META.map((item) => {
                   const Icon = item.icon;
                   const isCurrent = item.role === currentRole;
                   return (
                     <button
                       key={item.role}
                       onClick={() => handleSelectRole(item.role)}
                       className={`flex flex-col text-left p-4 rounded-lg border transition-all ${
                         isCurrent
                           ? 'border-[#0f5ca8] bg-blue-50'
                           : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                       }`}
                     >
                       <div className="flex items-center justify-between w-full mb-1.5">
                         <div className="flex items-center gap-2">
                           <Icon className={`h-4 w-4 ${isCurrent ? 'text-[#0f5ca8]' : 'text-slate-500'}`} />
                           <span className="text-sm font-bold text-slate-900">{item.label}</span>
                         </div>
                         {isCurrent ? (
                           <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 border border-blue-200 px-1.5 py-0.5 rounded">
                             ACTIVE
                           </span>
                         ) : (
                           <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                             AUTOFILL
                           </span>
                         )}
                       </div>
                       <span className="text-xs font-medium text-slate-500 mb-3">{item.sub}</span>

                       <div className="mt-auto border-t border-slate-100 pt-2 text-[10px] font-mono text-slate-500 flex flex-col gap-1">
                         <div className="flex items-center gap-1">
                           <span className="font-bold text-slate-700">EMAIL:</span> {item.email}
                         </div>
                         <div className="flex items-center gap-1">
                           <span className="font-bold text-slate-700">AUTH ID:</span> {item.idProof}
                         </div>
                       </div>
                     </button>
                   );
                 })}
               </div>
            </div>

            {/* Statutory Compliance Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Lock className="h-3 w-3 text-[#15803d]" />
                Aadhaar Data Vault (ADV) & NIC Guidelines Compliant
              </span>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  onOpenLegal('terms');
                }}
                className="underline hover:text-slate-700 font-bold"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
