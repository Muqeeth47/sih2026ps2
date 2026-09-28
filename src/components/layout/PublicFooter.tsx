import React from 'react';
import Link from 'next/link';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 md:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">Ministry of Tribal Affairs</h3>
          <p className="text-xs text-slate-500">Government of India</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Scholarships</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link href="/scholarships">Find Scholarships</Link></li>
            <li><Link href="/fellowships">Fellowships</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Help & Support</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link href="/help">FAQ</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Legal</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
        &copy; 2026 Ministry of Tribal Affairs. All rights reserved.
      </div>
    </footer>
  );
};
