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
    if (r === 'APPLICANT') onTabChange('overview');
    else if (r === 'INSTITUTE_NODAL') onTabChange('inbox');
    else if (r === 'SCRUTINY_OFFICER') onTabChange('queue');
    else if (r === 'MINISTRY_ADMIN') onTabChange('kpi');
    setShowRoleModal(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Tricolor National Identity Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

      {/* Primary Top Bar */}
      <div className="flex h-14 w-full items-center justify-between px-3 md:px-6">
        {/* Left: Ministry Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-gray-200 bg-[#0f2a5e] text-white font-bold text-xs tracking-tighter">
            MoTA
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                GOVERNMENT OF INDIA
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-xs uppercase tracking-widest text-green-600 font-semibold">
                SIH-26239
              </span>
            </div>
            <h1 className="text-sm md:text-base font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
              <span>TribalScholar-AI</span>
              <span className="text-xs font-normal text-gray-500 hidden sm:inline">
                — Ministry of Tribal Affairs
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Role Switcher & Autofill Action */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Live Clock Metadata */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
              SECURE GOVERNMENT LINK
            </span>
            <span className="text-xs font-mono text-gray-600">{currentTime || 'SYNCING...'}</span>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden lg:block" />

          {/* Active Persona Badge with Quick Autofill Trigger */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2 border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left hover:border-gray-300 hover:bg-gray-100 transition-colors"
            title="Click to Switch Role & Autofill Credentials"
          >
            <div className="flex h-6 w-6 items-center justify-center bg-[#0f2a5e] text-white text-xs font-mono">
              {currentRole === 'APPLICANT' && 'L1'}
              {currentRole === 'INSTITUTE_NODAL' && 'L2'}
              {currentRole === 'SCRUTINY_OFFICER' && 'L3'}
              {currentRole === 'MINISTRY_ADMIN' && 'L4'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
                <span>{ROLES_META.find((m) => m.role === currentRole)?.label}</span>
                <span className="text-green-500">●</span>
              </span>
              <span className="text-xs text-gray-700 truncate max-w-[120px] md:max-w-[180px]">
                {currentUser?.name || 'Authenticated'}
              </span>
            </div>
            <KeyRound className="h-3.5 w-3.5 text-gray-400 ml-1" />
          </button>

          {/* Quick Legal Links */}
          <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-2">
            <button
              onClick={() => onOpenLegal('terms')}
              className="text-xs text-gray-500 hover:text-gray-800 uppercase tracking-wider font-mono text-[11px]"
            >
              Terms
            </button>
            <span className="text-gray-300">/</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-xs text-gray-500 hover:text-gray-800 uppercase tracking-wider font-mono text-[11px]"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>

      {/* Role Selection & Click-to-Autofill Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-green-600 font-mono font-semibold">
                  RBAC 4-TIER SECURITY CONTROLLER
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  Switch Role / Click-to-Autofill Credentials
                </h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-500 hover:text-gray-800 font-mono text-sm px-2 py-1 border border-gray-200 hover:bg-gray-100"
              >
                ✕ ESC
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-bold text-gray-800">{item.label}</span>
                      </div>
                      {isCurrent ? (
                        <span className="text-[9px] uppercase tracking-wider font-mono text-blue-700 bg-blue-100 border border-blue-300 px-1 py-0.5">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5">
                          AUTOFILL
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 mb-2">{item.sub}</span>

                    <div className="mt-auto border-t border-gray-200 pt-1.5 text-[10px] font-mono text-gray-500 flex flex-col gap-0.5">
                      <div>
                        <span className="text-gray-400">EMAIL:</span> {item.email}
                      </div>
                      <div>
                        <span className="text-gray-400">AUTH ID:</span> {item.idProof}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Statutory Compliance Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[11px] text-gray-500 font-mono">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-green-600" />
                Aadhaar Data Vault (ADV) & NIC Guidelines Compliant
              </span>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  onOpenLegal('terms');
                }}
                className="underline hover:text-gray-800"
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
