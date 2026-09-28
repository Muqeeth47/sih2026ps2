const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'D:\\SIHPS2\\src\\app\\(public)\\how-it-works\\page.tsx': `import React from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    { num: '1', title: 'Find a Scheme', desc: 'Browse available scholarships and fellowships.' },
    { num: '2', title: 'Check Eligibility', desc: 'Review the eligibility criteria for the scheme.' },
    { num: '3', title: 'Create/Login', desc: 'Login via Aadhaar or create a new profile.' },
    { num: '4', title: 'Complete Application', desc: 'Fill out academic and personal details.' },
    { num: '5', title: 'Upload Documents', desc: 'Provide necessary certificates (income, caste, etc).' },
    { num: '6', title: 'Review & Submit', desc: 'Review your application carefully before submission.' },
    { num: '7', title: 'Track Application', desc: 'Check the real-time status of your application.' },
    { num: '8', title: 'Selection & Sanction', desc: 'Your application is verified, scrutinized, and sanctioned.' },
    { num: '9', title: 'Disbursement', desc: 'Funds are disbursed directly to your bank account via DBT.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">How It Works</h1>
      <p className="text-slate-600 mb-12 text-center text-lg">Follow these steps to apply for a scholarship on the MoTA portal.</p>
      
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="w-16 bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-2xl font-bold">{step.num}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
      </div>
    </div>
  );
}
`,
  'D:\\SIHPS2\\src\\app\\(public)\\help\\page.tsx': `'use client';
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
`,
  'D:\\SIHPS2\\src\\app\\(public)\\feedback\\page.tsx': `'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 min-h-screen text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Feedback Submitted</h1>
        <p className="text-slate-600 mb-8 text-lg">Thank you. Your feedback has been recorded and will help us improve the portal.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Feedback</h1>
      <p className="text-slate-600 mb-8">We value your input. Please share your experience or report an issue.</p>
      
      <form 
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
            <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input required type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white">
              <option>Applicant</option>
              <option>Officer</option>
              <option>Administrator</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Feedback Type</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white">
              <option>Website experience</option>
              <option>Application process</option>
              <option>Scholarship information</option>
              <option>Technical issue</option>
              <option>Suggestion</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
          <textarea required rows={5} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Setup script 2 complete.');
