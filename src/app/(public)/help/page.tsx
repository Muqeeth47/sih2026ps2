'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How do I apply for a scholarship?', a: 'First, navigate to the Scholarships page, find a scheme you are eligible for, and click "Apply Now". You will be prompted to log in and fill out the application form.' },
    { q: 'What documents do I need?', a: 'Typically, you need an Aadhaar card, caste certificate, income certificate, bank passbook, and previous year marksheets.' },
    { q: 'How can I check my application status?', a: 'Log in as an Applicant and navigate to "Track Application" on your dashboard sidebar.' },
    { q: 'What happens if my document is rejected?', a: 'Your application status will change to "Deficiency". You will need to re-upload the correct document within the given timeframe.' },
    { q: 'How do I contact support?', a: 'You can use the "Give Feedback" button below or email support@mota.gov.in.' },
  ];
  
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">Help & Support</h1>
      <p className="text-slate-600 mb-8 text-center text-lg">Find answers to your questions or get in touch with us.</p>
      
      <div className="relative mb-12">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for help..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm"
        />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-12">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button 
              className="w-full px-6 py-4 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {faq.q}
              {openIdx === idx ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
            </button>
            {openIdx === idx && (
              <div className="px-6 py-4 border-t border-slate-100 text-slate-600 bg-slate-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Still need help?</h3>
        <p className="text-slate-600 mb-6">Our support team is ready to assist you.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
          <Link href="/feedback" className="bg-white text-blue-600 border border-blue-200 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors">
            Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
