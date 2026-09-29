'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Ministry overview and scheme management.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Total Schemes</div>
          <div className="text-3xl font-bold text-slate-900">12</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Applications</div>
          <div className="text-3xl font-bold text-slate-900">4,521</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Sanctioned Funds</div>
          <div className="text-3xl font-bold text-slate-900">₹45.2 Cr</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-2">Active Institutes</div>
          <div className="text-3xl font-bold text-slate-900">892</div>
        </div>
      </div>

      {/* Interactive GIS Tribal Scholarship Saturation Heatmap */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>🗺️ Interactive GIS Tribal Scholarship Saturation Heatmap</span>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">Article 244 (Fifth & Sixth Schedule)</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">Real-time scheme penetration and DBT saturation across high-density ST states and notified PVTG clusters.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><span className="h-3 w-3 bg-emerald-500 rounded"></span> &gt;80% High</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 bg-blue-500 rounded"></span> 60-80% Moderate</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 bg-amber-500 rounded"></span> &lt;60% Priority</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top States Saturation Table */}
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">State / UT</th>
                  <th className="py-3 px-4">ST Pop. Share</th>
                  <th className="py-3 px-4">Beneficiaries</th>
                  <th className="py-3 px-4">Saturation</th>
                  <th className="py-3 px-4">PVTG Cluster</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { state: 'Madhya Pradesh', share: '21.1%', count: '2,340', pct: 86, color: 'bg-emerald-500', pvtg: 'Baiga, Bharia, Sahariya' },
                  { state: 'Jharkhand', share: '26.2%', count: '1,654', pct: 82, color: 'bg-emerald-500', pvtg: 'Birhor, Mal Paharia, Asur' },
                  { state: 'Odisha', share: '22.8%', count: '1,432', pct: 78, color: 'bg-blue-500', pvtg: 'Bondo, Chuktia Bhunjia, Dongria' },
                  { state: 'Rajasthan', share: '13.5%', count: '1,876', pct: 74, color: 'bg-blue-500', pvtg: 'Saharuiya (Bara)' },
                  { state: 'Chhattisgarh', share: '30.6%', count: '1,287', pct: 71, color: 'bg-blue-500', pvtg: 'Abujh Maria, Kamar, Baiga' },
                  { state: 'Gujarat', share: '14.8%', count: '987', pct: 65, color: 'bg-blue-500', pvtg: 'Kolgha, Kathodi, Padhar' },
                  { state: 'Andhra Pradesh', share: '5.3%', count: '654', pct: 54, color: 'bg-amber-500', pvtg: 'Chenchu, Gadaba, Porja' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{row.state}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">{row.share}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.count}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-700">{row.pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 truncate max-w-[180px]" title={row.pvtg}>{row.pvtg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fifth / Sixth Schedule District Drilldown Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-slate-500 font-mono">Fifth Schedule Priority Zone</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">DIRECT DBT</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Bastar & Mayurbhanj Region</h3>
              <p className="text-xs text-slate-600 mb-4">High-priority forest clusters receiving 100% Aadhaar-seeded pre-matric and NFST fellowship allocations.</p>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500">Notified PVTG Beneficiaries:</span>
                  <span className="font-bold text-slate-900">1,287 scholars</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500">PFMS Success Rate:</span>
                  <span className="font-bold text-emerald-600">99.4% Direct Transfer</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500">Pending Deficiencies:</span>
                  <span className="font-bold text-amber-600">42 (Under 7-day cure)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Census of India ST Reference</span>
              <span className="font-semibold text-blue-600">Sync: Live</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Link href="/admin/schemes" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Schemes &rarr;</h3>
           <p className="text-slate-600">Create, edit, or close scholarship schemes.</p>
         </Link>
         <Link href="/admin/users" className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Users &rarr;</h3>
           <p className="text-slate-600">Administer officers, institutes, and applicants.</p>
         </Link>
      </div>
    </div>
  );
}
