"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Printer,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  AlertOctagon,
  FileText,
  Activity,
  LucideIcon
} from 'lucide-react';

const InvoiceStatCard = ({ label, value, subtext, icon: Icon, color, bg }: { label: string, value: string, subtext: string, icon: LucideIcon, color: string, bg: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 ${bg.replace('bg-', 'bg-')}/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
    <div className="flex justify-between items-center mb-6 relative z-10">
      <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner cursor-pointer`}>
        <Icon size={22} className="cursor-pointer" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
        <ArrowUpRight size={14} className={color} />
        <span className="text-gray-900">{subtext}</span>
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none relative z-10">{label}</p>
    <h3 className="text-3xl font-black mt-2 tracking-tight text-gray-900 relative z-10">{value}</h3>
    <div className="w-12 h-1 bg-gray-50 group-hover:w-full transition-all duration-1000 mt-4 rounded-full overflow-hidden relative z-10">
       <div className={`h-full ${bg.replace('bg-', 'bg-')} w-2/3`}></div>
    </div>
  </div>
);

export default function AdminInvoicesPage() {
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  const invoices = [
    { id: 'INV-2025-001', customer: 'Lagos Fabrics', amount: 4500.00, currency: 'USD', date: 'JAN 24, 2025', status: 'PAID', dueDate: 'FEB 24, 2025', risk: 'LOW' },
    { id: 'INV-2025-002', customer: 'Nairobi Crafts', amount: 1250.50, currency: 'KES', date: 'JAN 25, 2025', status: 'UNPAID', dueDate: 'FEB 25, 2025', risk: 'MEDIUM' },
    { id: 'INV-2025-003', customer: 'Accra Jewelry', amount: 8900.00, currency: 'GHS', date: 'JAN 15, 2025', status: 'OVERDUE', dueDate: 'JAN 22, 2025', risk: 'CRITICAL' },
    { id: 'INV-2025-004', customer: 'Global Trade Inc', amount: 15200.00, currency: 'USD', date: 'JAN 26, 2025', status: 'UNPAID', dueDate: 'FEB 26, 2025', risk: 'LOW' },
  ];

  const filteredInvoices = activeStatus === 'ALL' 
    ? invoices 
    : invoices.filter(inv => inv.status === activeStatus);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Financial Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-emerald-200/50">
            <ShieldCheck size={14} className="animate-pulse" />
            Audit-Verified Transactions
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
            Financial <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 tracking-tighter">Ledger</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed italic">
            Monitoring the ecosystem fiscal velocity and auditing multi-currency invoice streams via real-time trade.
          </p>
        </div>
        
        <div className="relative z-10 flex gap-3 w-full lg:w-auto">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-8 py-4.5 rounded-2xl font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
          >
            <Printer size={18} className={`${isExporting ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
            <span>{isExporting ? 'Collating...' : 'Export Fiscal Report'}</span>
          </button>
        </div>
      </div>

      {/* Fiscal Matrix (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InvoiceStatCard 
          label="Total Invoiced (MTD)" 
          value="$145.2K" 
          subtext="+18% VS PM" 
          icon={DollarSign} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <InvoiceStatCard 
          label="Total Collection" 
          value="$98.1K" 
          subtext="67.5% RATE" 
          icon={CheckCircle2} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <InvoiceStatCard 
          label="Outstanding Risk" 
          value="$47.1K" 
          subtext="$8.9K OVERDUE" 
          icon={AlertOctagon} 
          color="text-rose-600" 
          bg="bg-rose-50" 
        />
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Glassmorphic Nav Controls */}
        <div className="p-6 lg:p-8 border-b border-gray-50 flex flex-col xl:flex-row justify-between items-center gap-6 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex space-x-1 p-1.5 bg-gray-50 rounded-2xl w-full xl:w-auto border border-gray-100 shadow-inner">
            {['ALL', 'PAID', 'UNPAID', 'OVERDUE'].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`flex-1 xl:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                  activeStatus === s 
                    ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-500/10 border border-emerald-100' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" size={18} />
              <input 
                type="text" 
                placeholder="Search Financial IDs..." 
                className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner" 
              />
            </div>
            <button className="p-3.5 text-gray-400 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer border border-gray-50 shadow-sm active:scale-95">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* High-Fidelity Invoice Ledger */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fiscal Identity</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Issue Node</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Asset Value</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Maturity</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Risk Status</th>
                <th className="relative px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black text-[10px] group-hover:scale-110 transition-transform">
                        TX
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{inv.id}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{inv.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {inv.date}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <p className="text-sm font-black text-gray-900 tracking-tight">{inv.amount.toLocaleString()} <span className="text-indigo-600 ml-1">{inv.currency}</span></p>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {inv.dueDate}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest border transition-all ${
                      inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white' : 
                      inv.status === 'OVERDUE' ? 'bg-rose-50 text-rose-700 border-rose-100 group-hover:bg-rose-500 group-hover:text-white' : 
                      'bg-indigo-50 text-indigo-700 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white'
                    }`}>
                      {inv.status === 'PAID' && <CheckCircle2 size={12} />}
                      {inv.status === 'UNPAID' && <Clock size={12} />}
                      {inv.status === 'OVERDUE' && <AlertOctagon size={12} />}
                      {inv.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right cursor-pointer">
                    <div className="flex justify-end gap-2">
                       <button className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer shadow-sm border border-transparent hover:border-emerald-100" title="View Forensics">
                         <ExternalLink size={16} className="cursor-pointer" />
                       </button>
                       <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all cursor-pointer shadow-sm border border-transparent hover:border-gray-200" title="Download Report">
                         <FileText size={16} className="cursor-pointer" />
                       </button>
                       <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl cursor-pointer">
                         <MoreVertical size={16} className="cursor-pointer" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Synchronicity */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center animate-pulse cursor-pointer`}>
                <Activity size={14} className="cursor-pointer" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Asset Sync: <span className="text-gray-900">ACTIVE</span></p>
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Buy From Africa Financial Intelligence v1.05-AUDIT</p>
        </div>
      </div>
    </div>
  );
}
