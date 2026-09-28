import React from 'react';
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
