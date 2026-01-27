"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Printer
} from 'lucide-react';

export default function AdminInvoicesPage() {
  const [activeStatus, setActiveStatus] = useState('ALL');

  const invoices = [
    { id: 'INV-2025-001', customer: 'Lagos Fabrics', amount: 4500.00, currency: 'USD', date: 'Jan 24, 2025', status: 'PAID', dueDate: 'Feb 24, 2025' },
    { id: 'INV-2025-002', customer: 'Nairobi Crafts', amount: 1250.50, currency: 'KES', date: 'Jan 25, 2025', status: 'UNPAID', dueDate: 'Feb 25, 2025' },
    { id: 'INV-2025-003', customer: 'Accra Jewelry', amount: 8900.00, currency: 'GHS', date: 'Jan 15, 2025', status: 'OVERDUE', dueDate: 'Jan 22, 2025' },
    { id: 'INV-2025-004', customer: 'Global Trade Inc', amount: 15200.00, currency: 'USD', date: 'Jan 26, 2025', status: 'UNPAID', dueDate: 'Feb 26, 2025' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Oversight: Platform Invoices</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Monitor vendor-generated invoices and platform-wide revenue status.</p>
        </div>
        <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all hover:bg-gray-50 shadow-sm active:scale-95 text-sm cursor-pointer">
                <Printer size={18} className="text-gray-400 cursor-pointer" />
                <span className="cursor-pointer">Export Financial Report</span>
            </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Invoiced (MTD)</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$145,280.00</p>
          <div className="mt-2 text-[10px] font-bold text-green-600 flex items-center bg-green-50 w-fit px-2 py-0.5 rounded">
            +18% VS LAST MONTH
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Paid</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$98,120.00</p>
          <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center bg-blue-50 w-fit px-2 py-0.5 rounded">
            67.5% COLLECTION RATE
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Outstanding</p>
          <p className="text-2xl font-bold text-red-600 mt-2">$47,160.00</p>
          <div className="mt-2 text-[10px] font-bold text-red-600 flex items-center bg-red-50 w-fit px-2 py-0.5 rounded">
            $8,900.00 OVERDUE
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl w-full md:w-auto">
            {['ALL', 'PAID', 'UNPAID', 'OVERDUE'].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeStatus === s ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"><Filter size={20} className="cursor-pointer" /></button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice / Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{inv.id}</p>
                      <p className="text-xs text-gray-500">{inv.customer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inv.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900 tracking-tight">{inv.amount.toLocaleString()} {inv.currency}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center w-fit px-3 py-1 rounded-full text-[10px] font-bold border ${
                      inv.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-100' : 
                      inv.status === 'OVERDUE' ? 'bg-red-50 text-red-700 border-red-100' : 
                      'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      {inv.status === 'PAID' && <CheckCircle2 size={12} className="mr-1" />}
                      {inv.status === 'UNPAID' && <Clock size={12} className="mr-1" />}
                      {inv.status === 'OVERDUE' && <AlertCircle size={12} className="mr-1" />}
                      {inv.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <div className="flex justify-end space-x-2">
                       <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all cursor-pointer" title="View Detail"><ExternalLink size={18} className="cursor-pointer" /></button>
                       <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer" title="Print/PDF"><Printer size={18} className="cursor-pointer" /></button>
                       <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"><MoreVertical size={20} className="cursor-pointer" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
