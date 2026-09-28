'use client';

import React from 'react';
import { ShieldCheck, Phone, Mail, ExternalLink, Scale, Lock, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (view: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-600 text-xs">
      {/* Upper Footer Links & Ministry Metadata */}
      <div className="w-full px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-100">
        {/* Col 1: Ministry Identification */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 tracking-wider uppercase text-[11px]">
              MINISTRY OF TRIBAL AFFAIRS
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-500">
            Government of India, Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi — 110001.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-green-600 pt-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ISO 27001 & CERT-In Security Compliant</span>
          </div>

          {/* Legal Policies */}
          <nav aria-label="Government Policies Navigation">
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem 1.75rem',
            }}>
                <li>
                  <button
                    onClick={() => onOpenLegal('terms')}
                    style={{
                      color: '#334155',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'color 0.15s',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0f5ca8')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('privacy')}
                    style={{
                      color: '#334155',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'color 0.15s',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0f5ca8')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a
                    href="https://india.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#334155',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'color 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0f5ca8')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
                  >
                    <ExternalLink size={14} />
                    <span>india.gov.in</span>
                  </a>
                </li>
            </ul>
          </nav>
        </div>

        {/* Col 2: Schemes Covered */}
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">
            Statutory Schemes
          </span>
          <ul className="space-y-1 text-[11px] text-gray-500">
            <li>• National Fellowship for ST (NFST - PhD)</li>
            <li>• National Overseas Scholarship (NOS Abroad)</li>
            <li>• Top Class Education Scheme (Premier Institutes)</li>
            <li>• Post-Matric Scholarship for ST Students</li>
            <li>• Pre-Matric Scholarship (Classes IX & X)</li>
          </ul>
        </div>

        {/* Col 3: Helpdesk & Grievance Redressal */}
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">
            Direct MoTA Helpdesk
          </span>
          <div className="flex items-center gap-2 text-[11px] text-gray-700">
            <Phone className="h-3.5 w-3.5 text-green-600" />
            <span>Toll-Free: 1800-11-7788 (9:30 AM - 6:00 PM)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-700">
            <Mail className="h-3.5 w-3.5 text-green-600" />
            <span>scholarship-support@mota.gov.in</span>
          </div>
          <span className="text-[10px] text-gray-400 pt-1">
            Grievances mapped to CPGRAMS & MoTA Grievance Cell.
          </span>
        </div>

        {/* Col 4: Statutory & Legal */}
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">
            Statutory Governance
          </span>
          <div className="flex flex-col gap-1 text-[11px]">
            <button
              onClick={() => onOpenLegal('terms')}
              className="text-left text-gray-500 hover:text-green-600 flex items-center gap-1.5 transition-colors"
            >
              <Scale className="h-3 w-3" />
              <span>Terms & Conditions / Guidelines</span>
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-left text-gray-500 hover:text-green-600 flex items-center gap-1.5 transition-colors"
            >
              <Lock className="h-3 w-3" />
              <span>Privacy Policy (DPDP Act 2023)</span>
            </button>
            <a
              href="https://india.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left text-gray-500 hover:text-green-600 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>National Portal of India (india.gov.in)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer */}
      <div className="w-full px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-gray-400 font-mono bg-gray-50">
        <div>
          © {new Date().getFullYear()} Ministry of Tribal Affairs (MoTA). Designed & Developed for Smart India Hackathon (SIH26239).
        </div>
        <div className="flex items-center gap-3">
          <span>Hosted by NIC Cloud Meghraj</span>
          <span>•</span>
          <span>Last Updated: 28-Sep-2026</span>
        </div>
      </div>
    </footer>
  );
};
