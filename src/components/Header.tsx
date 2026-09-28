'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import type { Role } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mock-data';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Crown,
  KeyRound,
  FileText,
  Lock,
  ExternalLink,
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
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectRole = (r: Role) => {
    setRole(r);
    // Switch default tab depending on role
    if (r === 'APPLICANT') onTabChange('overview');
    else if (r === 'INSTITUTE_NODAL') onTabChange('inbox');
    else if (r === 'SCRUTINY_OFFICER') onTabChange('queue');
    else if (r === 'MINISTRY_ADMIN') onTabChange('kpi');
    setShowRoleModal(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#070b12]/95 backdrop-blur-md">
      {/* Tricolor National Identity Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

      {/* Primary Top Bar */}
      <div className="flex h-14 w-full items-center justify-between px-3 md:px-6">
        {/* Left: Ministry Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-slate-700 bg-slate-900 text-slate-100 font-bold text-xs tracking-tighter">
            MoTA
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                GOVERNMENT OF INDIA
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                SIH-26239
              </span>
            </div>
            <h1 className="text-sm md:text-base font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
              <span>TribalScholar-AI</span>
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                — Ministry of Tribal Affairs
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Role Switcher & Autofill Action */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Live Clock Metadata */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
              SECURE GOVERNMENT LINK
            </span>
            <span className="text-xs font-mono text-slate-300">{currentTime || 'SYNCING...'}</span>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden lg:block" />

          {/* Active Persona Badge with Quick Autofill Trigger */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2 border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-left hover:border-slate-500 transition-colors"
            title="Click to Switch Role & Autofill Credentials"
          >
            <div className="flex h-6 w-6 items-center justify-center bg-slate-800 text-emerald-400 text-xs font-mono">
              {currentRole === 'APPLICANT' && 'L1'}
              {currentRole === 'INSTITUTE_NODAL' && 'L2'}
              {currentRole === 'SCRUTINY_OFFICER' && 'L3'}
              {currentRole === 'MINISTRY_ADMIN' && 'L4'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
                <span>{ROLES_META.find((m) => m.role === currentRole)?.label}</span>
                <span className="text-emerald-400">●</span>
              </span>
              <span className="text-xs text-slate-200 truncate max-w-[120px] md:max-w-[180px]">
                {currentUser?.name || 'Authenticated'}
              </span>
            </div>
            <KeyRound className="h-3.5 w-3.5 text-slate-400 ml-1" />
          </button>

          {/* Quick Legal Links */}
          <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-2">
            <button
              onClick={() => onOpenLegal('terms')}
              className="text-xs text-slate-400 hover:text-slate-200 uppercase tracking-wider font-mono text-[11px]"
            >
              Terms
            </button>
            <span className="text-slate-700">/</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-xs text-slate-400 hover:text-slate-200 uppercase tracking-wider font-mono text-[11px]"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>

      {/* Role Selection & Click-to-Autofill Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl border border-slate-700 bg-[#0b1120] p-4 md:p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
                  RBAC 4-TIER SECURITY CONTROLLER
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Switch Role / Click-to-Autofill Credentials
                </h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-100 font-mono text-sm px-2 py-1 border border-slate-700 hover:bg-slate-800"
              >
                ✕ ESC
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Select any role to automatically simulate NIC SSO / Aadhaar OTP / DSC PKI
              authentication with pre-seeded MoTA production profiles.
            </p>

            {/* 4 Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {ROLES_META.map((item) => {
                const Icon = item.icon;
                const isCurrent = item.role === currentRole;
                return (
                  <button
                    key={item.role}
                    onClick={() => handleSelectRole(item.role)}
                    className={`flex flex-col text-left p-3 border transition-all ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold text-slate-200">{item.label}</span>
                      </div>
                      {isCurrent ? (
                        <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-800 px-1 py-0.5">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 bg-slate-800 px-1 py-0.5">
                          AUTOFILL
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mb-2">{item.sub}</span>

                    <div className="mt-auto border-t border-slate-800/80 pt-1.5 text-[10px] font-mono text-slate-500 flex flex-col gap-0.5">
                      <div>
                        <span className="text-slate-400">EMAIL:</span> {item.email}
                      </div>
                      <div>
                        <span className="text-slate-400">AUTH ID:</span> {item.idProof}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Statutory Compliance Footer */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-emerald-500" />
                Aadhaar Data Vault (ADV) & NIC Guidelines Compliant
              </span>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  onOpenLegal('terms');
                }}
                className="underline hover:text-slate-300"
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
