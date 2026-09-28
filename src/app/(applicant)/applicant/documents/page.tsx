'use client';
import React from 'react';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { getDocumentLabel } from '@/lib/utils';
import { FileText, CheckCircle, Upload, Eye } from 'lucide-react';

export default function DocumentsPage() {
  const activeApp = MOCK_APPLICATIONS[0];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Document Vault</h1>
        <p className="text-slate-500 mt-1">Manage your verified digital certificates and affidavits securely.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">Uploaded Documents</h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold w-1/3">Document Name</th>
                <th className="px-6 py-4 font-semibold w-1/4">Type</th>
                <th className="px-6 py-4 font-semibold w-1/6">Status</th>
                <th className="px-6 py-4 font-semibold w-1/6">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right w-1/6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activeApp.documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3 font-medium text-slate-900 whitespace-nowrap">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-slate-500" />
                    </div>
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getDocumentLabel(doc.type)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold border border-green-200">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                    12 Oct 2024
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer w-full group">
        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
          <Upload className="h-7 w-7 text-blue-600" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-1">Upload Additional Documents</h3>
        <p className="text-sm text-slate-500 mb-6">Supports PDF, JPG, PNG up to 10MB.</p>
        <button className="bg-white border border-slate-300 text-slate-700 shadow-sm px-6 py-2.5 rounded-lg font-bold hover:border-slate-400 transition-colors">
          Browse Files
        </button>
      </div>
    </div>
  );
}
