'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SCHEMES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter for scholarships (not fellowships)
  const filteredSchemes = SCHEMES.filter(s => 
    s.type !== 'fellowship' &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Scholarships</h1>
        <p className="text-slate-600 max-w-2xl">
          Explore scholarships available to Scheduled Tribe students for school, undergraduate and postgraduate education.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search scholarships..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.code} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900">{scheme.name}</h2>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 font-mono">
                  {scheme.code}
                </span>
              </div>
              <p className="text-slate-600 mb-4">{scheme.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase">Income Ceiling</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(scheme.maxIncome)}/yr</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-4">
                  <span className="text-slate-500 text-xs uppercase">Min Marks</span>
                  <span className="font-semibold text-slate-900">{scheme.minMarksPercent}%</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-4">
                  <span className="text-slate-500 text-xs uppercase">Stipend</span>
                  <span className="font-semibold text-green-600">{formatCurrency(scheme.stipendMonthly)}/mo</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <Link href={`/applicant/apply?scheme=${scheme.code}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-center font-semibold transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No scholarships found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
