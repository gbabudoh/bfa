"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Table as TableIcon,
  Map,
  ShoppingBag,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Calendar,
  Activity,
  Zap,
  ShieldCheck,
  PieChart,
  LucideIcon
} from 'lucide-react';

const AnalyticsCard = ({ title, subtitle, children, footer, icon: Icon }: { title: string, subtitle?: string, children: React.ReactNode, footer?: React.ReactNode, icon?: LucideIcon }) => (
  <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors shadow-inner cursor-pointer">
            <Icon size={18} className="cursor-pointer" />
          </div>
        )}
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">{title}</h3>
          {subtitle && <p className="text-xs text-gray-900 font-black tracking-tight">{subtitle}</p>}
        </div>
      </div>
      <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all cursor-pointer">
        <Filter size={18} />
      </button>
    </div>
    <div className="p-8 flex-1">
      {children}
    </div>
    {footer && (
      <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-50 mt-auto">
        {footer}
      </div>
    )}
  </div>
);

const ProgressBar = ({ label, value, percentage, color }: { label: string, value: string, percentage: number, color: string }) => (
  <div className="space-y-3 group/bar">
    <div className="flex justify-between items-end">
      <div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">{label}</span>
        <span className="text-sm font-black text-gray-900 group-hover/bar:text-indigo-600 transition-colors">{value}</span>
      </div>
      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100/50">{percentage}%</span>
    </div>
    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-sm`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function AdminAnalyticsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    setIsExporting(true);
    console.log(`Generating high-level ${format} intelligence...`);
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-amber-200/50">
              <Zap size={14} className="animate-pulse" />
              Real-time Market Metrics
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
              Market <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 tracking-tighter">Intelligence</span>
            </h1>
            <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed italic">
              Analyzing trade forensics across the African continent and auditing global customer demographics via high-fidelity data nodes.
            </p>
          </div>
          
          <div className="relative z-10 flex gap-3 w-full lg:w-auto">
            <button 
              onClick={() => handleExport('EXCEL')}
              disabled={isExporting}
              className="flex-1 lg:flex-none flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-8 py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
            >
              <TableIcon size={18} className={`${isExporting ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
              <span>{isExporting ? 'Auditing...' : 'Export Ledger'}</span>
            </button>
            <button 
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
              className="p-4.5 bg-white border border-gray-200 text-rose-600 hover:bg-rose-50 hover:border-rose-100 rounded-2xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative group"
            >
              <FileText size={20} className={isExporting ? 'animate-pulse' : ''} />
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest">Generate Dossier</span>
            </button>
          </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Intra-African Trade', value: '$840.4K', change: '+24.5%', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Export Volume', value: '$1.2M', change: '+12.8%', icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Registry Events', value: '18,492', change: '+15.2%', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Network Hubs', value: '42', change: '+4 Active', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-center mb-6">
              <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <kpi.icon size={22} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                <ArrowUpRight size={14} />
                {kpi.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">{kpi.label}</p>
            <h3 className="text-3xl font-black mt-2 tracking-tight text-gray-900">{kpi.value}</h3>
            <div className="w-12 h-1 bg-gray-50 group-hover:w-full transition-all duration-1000 mt-4 rounded-full overflow-hidden">
               <div className={`h-full ${kpi.color.replace('text', 'bg')} w-2/3`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trade Zones Progress */}
        <AnalyticsCard 
          title="African Trade Zones" 
          subtitle="Regional Performance Matrix"
          icon={Map}
          footer={
            <button className="w-full text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-[0.2em] flex items-center justify-center transition-colors group/btn">
              Download Regional Audit Docs 
              <ChevronRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          }
        >
          <div className="space-y-8">
            <ProgressBar label="Nigeria (Western node)" value="$320,000" percentage={85} color="bg-emerald-500" />
            <ProgressBar label="South Africa (Southern node)" value="$245,500" percentage={72} color="bg-amber-500" />
            <ProgressBar label="Kenya (Eastern node)" value="$180,200" percentage={60} color="bg-blue-500" />
            <ProgressBar label="Ghana (Western node)" value="$112,000" percentage={45} color="bg-rose-500" />
            <ProgressBar label="Egypt (Northern node)" value="$82,700" percentage={30} color="bg-indigo-500" />
          </div>
        </AnalyticsCard>

        {/* Demographics Visualization */}
        <AnalyticsCard 
          title="Demographic Audit" 
          subtitle="Global Customer Flow Ratio"
          icon={PieChart}
        >
          <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 py-4">
            <div className="relative w-56 h-56 flex-shrink-0">
               {/* Custom Glassmorphic Donut Chart Effect */}
              <div className="absolute inset-0 rounded-full border-[20px] border-amber-500 shadow-lg shadow-amber-200/50"></div>
              <div className="absolute inset-0 rounded-full border-[20px] border-indigo-500 border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center shadow-inner border border-gray-50">
                 <p className="text-4xl font-black text-gray-900 tracking-tighter">18K</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Entrants</p>
              </div>
            </div>
            
            <div className="w-full space-y-6">
               <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all group/stat">
                 <div className="w-4 h-4 rounded-full bg-amber-500 shadow-md shadow-amber-200"></div>
                 <div className="flex-1">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">African Origin</p>
                   <div className="flex items-end gap-2">
                     <span className="text-xl font-black text-gray-900 leading-none">65.2%</span>
                     <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">+4.1%</span>
                   </div>
                 </div>
                 <ArrowUpRight size={20} className="text-gray-200 group-hover/stat:text-amber-500 transition-colors" />
               </div>
               
               <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all group/stat">
                 <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-md shadow-indigo-200"></div>
                 <div className="flex-1">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Global Presence</p>
                   <div className="flex items-end gap-2">
                     <span className="text-xl font-black text-gray-900 leading-none">34.8%</span>
                     <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">-1.8%</span>
                   </div>
                 </div>
                 <ArrowUpRight size={20} className="text-gray-200 group-hover/stat:text-indigo-500 transition-colors" />
               </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Product Performance Table */}
        <div className="xl:col-span-2">
          <AnalyticsCard 
            title="Catalog Intelligence" 
            subtitle="Top performing African Assets"
            icon={Activity}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="pb-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Asset Entity</th>
                    <th className="pb-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Events</th>
                    <th className="pb-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Velocity</th>
                    <th className="pb-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right uppercase">Audited Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Kente Weave Shawls', origin: 'Ghana', volume: 842, growth: '+12%', revenue: '$42,100' },
                    { name: 'Zulu Heritage Baskets', origin: 'South Africa', volume: 620, growth: '+18.4%', revenue: '$32,450' },
                    { name: 'Ethiopian Sidamo Coffee', origin: 'Ethiopia', volume: 512, growth: '+5.2%', revenue: '$28,120' },
                    { name: 'Moroccan Argan Oil', origin: 'Morocco', volume: 420, growth: '+22.5%', revenue: '$25,200' },
                    { name: 'Nigerian Bronze Sculptures', origin: 'Nigeria', volume: 125, growth: '-2.1%', revenue: '$22,500' },
                  ].map((product, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                      <td className="py-5 cursor-pointer">
                         <div className="flex items-center gap-4 cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 font-black text-[10px] group-hover:bg-white group-hover:shadow-md transition-all uppercase cursor-pointer">
                              {product.origin.substring(0, 2)}
                            </div>
                            <div>
                               <p className="text-sm font-black text-gray-900 leading-none mb-1 cursor-pointer">{product.name}</p>
                               <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest cursor-pointer">{product.origin}</p>
                            </div>
                         </div>
                      </td>
                      <td className="py-5 text-right cursor-pointer">
                         <p className="text-sm font-black text-gray-900 cursor-pointer">{product.volume}</p>
                      </td>
                      <td className="py-5 text-right cursor-pointer">
                         <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border cursor-pointer ${product.growth.startsWith('+') ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'}`}>
                            {product.growth}
                         </span>
                      </td>
                      <td className="py-5 text-right cursor-pointer">
                         <p className="text-sm font-black text-gray-900 group-hover:text-amber-600 transition-colors cursor-pointer">{product.revenue}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnalyticsCard>
        </div>

        {/* Tactical Indicators */}
        <AnalyticsCard 
          title="Tactical Status" 
          subtitle="Real-time Platform Health"
          icon={ShieldCheck}
        >
          <div className="space-y-6">
             <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group/status hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner group-hover/status:scale-110 transition-transform">
                        <Activity size={18} />
                      </div>
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">Registry Health</span>
                   </div>
                   <span className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm animate-pulse">Optimal Flow</span>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-2">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Audit Rate</p>
                      <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">92.4%</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Fulfill Latency</p>
                      <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">2.4<span className="text-xs ml-1">Days</span></p>
                   </div>
                </div>
             </div>

             <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group/status hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner group-hover/status:scale-110 transition-transform">
                        <Calendar size={18} />
                      </div>
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">Peak Cycles</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-black uppercase tracking-widest">Active Corridor</span>
                      <span className="text-gray-900 font-bold bg-white px-2 py-0.5 rounded-lg border border-gray-100 shadow-sm">14:00 - 18:00 WAT</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-black uppercase tracking-widest">Volume Zenith</span>
                      <span className="text-indigo-600 font-black tracking-widest">THURSDAYS</span>
                   </div>
                </div>
             </div>

             <div className="pt-2">
                <button className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer flex items-center justify-center gap-3 group/full">
                   <span>Access Data Forensics</span>
                   <ArrowUpRight size={16} className="group-hover/full:translate-x-1 group-hover/full:-translate-y-1 transition-transform" />
                </button>
             </div>
          </div>
        </AnalyticsCard>
      </div>

      {/* Footer Info Hub */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-xl border border-gray-50 relative group">
             <div className="absolute inset-0 bg-amber-500/10 rounded-2xl animate-ping opacity-20"></div>
             <Globe size={28} className="relative z-10 transition-transform duration-700 group-hover:rotate-180" />
           </div>
           <div>
             <h4 className="text-lg font-black text-gray-900 tracking-tight uppercase leading-none mb-2">Sync Intelligence</h4>
             <p className="text-xs text-gray-500 font-medium italic max-w-sm leading-relaxed">
               Data nodes are synchronized with blockchain-verified trade manifests in real-time across all African jurisdictions.
             </p>
           </div>
         </div>
         <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-[8px] font-black uppercase tracking-widest leading-none">
             <ShieldCheck size={10} className="text-emerald-400" />
             Secured Protocol
           </div>
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Buy From Africa Market Intel v1.02r</p>
         </div>
      </div>
    </div>
  );
}
