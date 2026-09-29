'use client';

import React from 'react';
import { ShieldCheck, Phone, Mail, ExternalLink, Scale, Lock, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (view: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      color: '#475569',
      fontSize: '0.8rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 1.25rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          paddingBottom: '1.5rem',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 bg-slate-900 rounded-md">
                 <span className="text-white font-bold text-sm">MoTA</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>TribalScholar-AI</span>
              </div>
              <div style={{ fontSize: '0.66rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Ministry of Tribal Affairs · Government of India
              </div>
            </div>
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

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.74rem',
          color: '#64748b',
        }}>
          <span>
            Content owned by <strong style={{ color: '#0f172a' }}>Ministry of Tribal Affairs, GoI</strong>
            {' '}| Designed &amp; Developed for <strong style={{ color: '#0f172a' }}>SIH 26239</strong>
          </span>
          <span>© {year} Ministry of Tribal Affairs · TribalScholar-AI</span>
        </div>
      </div>
    </footer>
  );
};
