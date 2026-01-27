"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Globe, 
  FileText, 
  Table as TableIcon,
  Map,
  ShoppingBag,
  Users,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Calendar
} from 'lucide-react';

const AnalyticsCard = ({ title, subtitle, children, footer }: { title: string, subtitle?: string, children: React.ReactNode, footer?: React.ReactNode }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
      <div>
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 font-medium mt-0.5">{subtitle}</p>}
      </div>
      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
        <Filter size={16} className="cursor-pointer" />
      </button>
    </div>
    <div className="p-6 flex-1">
      {children}
    </div>
    {footer && (
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 mt-auto cursor-pointer">
        {footer}
      </div>
    )}
  </div>
);

const ProgressBar = ({ label, value, percentage, color }: { label: string, value: string, percentage: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function AdminAnalyticsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    setIsExporting(true);
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      alert(`Exporting high-level report in ${format} format...`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with Export Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center">
            <TrendingUp className="mr-3 text-yellow-600" size={32} />
            Market Intelligence
          </h1>
          <p className="text-gray-500 mt-2 font-medium italic text-lg max-w-2xl">
            Real-time trade forensics across the African continent and global customer demographics.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white rounded-2xl p-1 border border-gray-200 shadow-sm">
             <button className="px-4 py-2 text-xs font-black text-yellow-600 bg-yellow-50 rounded-xl uppercase tracking-wider cursor-pointer">Overall</button>
             <button className="px-4 py-2 text-xs font-black text-gray-400 hover:text-gray-600 rounded-xl uppercase tracking-wider cursor-pointer">Regional</button>
             <button className="px-4 py-2 text-xs font-black text-gray-400 hover:text-gray-600 rounded-xl uppercase tracking-wider cursor-pointer">Product</button>
          </div>
          <button 
            onClick={() => handleExport('EXCEL')}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest cursor-pointer"
          >
            <TableIcon size={16} className="cursor-pointer" />
            <span className="cursor-pointer">Excel Export</span>
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest cursor-pointer"
          >
            <FileText size={16} className="cursor-pointer" />
            <span className="cursor-pointer">PDF Intelligence</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total Intra-African Trade', value: '$840.4K', change: '+24.5%', icon: <Map className="text-blue-600" />, color: 'bg-blue-50' },
          { label: 'Global Export Volume', value: '$1.2M', change: '+12.8%', icon: <Globe className="text-yellow-600" />, color: 'bg-yellow-50' },
          { label: 'Total Transactions', value: '18,492', change: '+15.2%', icon: <ShoppingBag className="text-green-600" />, color: 'bg-green-50' },
          { label: 'Active Trade Hubs', value: '42', change: '+4 Hubs', icon: <Users className="text-purple-600" />, color: 'bg-purple-50' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${kpi.color}`}>{kpi.icon}</div>
              <div className="flex items-center text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} className="mr-1" />
                {kpi.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-2xl font-black text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highest Trade Zones (Africa) */}
        <AnalyticsCard 
          title="African Trade Zones" 
          subtitle="Top performing countries by transaction volume."
          footer={<button className="text-xs font-black text-yellow-600 hover:underline uppercase tracking-widest flex items-center">Download Localized Data <ChevronRight size={14} className="ml-1" /></button>}
        >
          <div className="space-y-6">
            <ProgressBar label="Nigeria (West Africa)" value="$320,000" percentage={85} color="bg-green-500" />
            <ProgressBar label="South Africa (Southern Region)" value="$245,500" percentage={72} color="bg-yellow-500" />
            <ProgressBar label="Kenya (East Africa)" value="$180,200" percentage={60} color="bg-blue-500" />
            <ProgressBar label="Ghana (West Africa)" value="$112,000" percentage={45} color="bg-red-500" />
            <ProgressBar label="Egypt (North Africa)" value="$82,700" percentage={30} color="bg-purple-500" />
          </div>
        </AnalyticsCard>

        {/* Global vs African Demographics */}
        <AnalyticsCard 
          title="Customer Demographics" 
          subtitle="Global vs. Continental Purchase Ratios."
        >
          <div className="flex items-center justify-around h-full py-8">
            <div className="relative w-48 h-48">
              {/* Circular visualization placeholder */}
              <div className="absolute inset-0 rounded-full border-[16px] border-yellow-500 border-t-blue-500 transform rotate-45 shadow-inner"></div>
              <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                 <p className="text-2xl font-black text-gray-900">18K</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">TOTAL BUYERS</p>
              </div>
            </div>
            <div className="space-y-4">
               <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
                 <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">African Customers</p>
                   <p className="text-sm font-black text-gray-900 leading-none">65% <span className="text-[10px] text-green-500 font-bold ml-1">+4%</span></p>
                 </div>
               </div>
               <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
                 <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Global Customers</p>
                   <p className="text-sm font-black text-gray-900 leading-none">35% <span className="text-[10px] text-blue-400 font-bold ml-1">-2%</span></p>
                 </div>
               </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Best Performing African Products */}
        <div className="xl:col-span-2">
          <AnalyticsCard 
            title="Best Performing African Products" 
            subtitle="Catalog top movers and revenue drivers."
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Entity</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Transactions</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Growth</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Revenue (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Kente Weave Shawls', origin: 'Ghana', volume: 842, growth: '+12%', revenue: '$42,100' },
                    { name: 'Zulu Heritage Baskets', origin: 'S. Africa', volume: 620, growth: '+18.4%', revenue: '$32,450' },
                    { name: 'Ethiopian Sidamo Coffee', origin: 'Ethiopia', volume: 512, growth: '+5.2%', revenue: '$28,120' },
                    { name: 'Moroccan Argan Oil', origin: 'Morocco', volume: 420, growth: '+22.5%', revenue: '$25,200' },
                    { name: 'Nigerian Bronze Sculptures', origin: 'Nigeria', volume: 125, growth: '-2.1%', revenue: '$22,500' },
                  ].map((product) => (
                    <tr key={product.name} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="py-4 cursor-pointer">
                         <p className="text-sm font-black text-gray-900 leading-none mb-1 cursor-pointer">{product.name}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase cursor-pointer">{product.origin}</p>
                      </td>
                      <td className="py-4 text-right cursor-pointer">
                         <p className="text-sm font-bold text-gray-900 cursor-pointer">{product.volume}</p>
                      </td>
                      <td className="py-4 text-right cursor-pointer">
                         <p className={`text-xs font-bold cursor-pointer ${product.growth.startsWith('+') ? 'text-green-600' : 'text-rose-600'}`}>{product.growth}</p>
                      </td>
                      <td className="py-4 text-right cursor-pointer">
                         <p className="text-sm font-black text-gray-900 cursor-pointer">{product.revenue}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnalyticsCard>
        </div>

        {/* Product Statistics */}
        <AnalyticsCard 
          title="Performance Indicators" 
          subtitle="Real-time status of African catalog."
        >
          <div className="space-y-4">
             <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center space-x-2">
                      <BarChart3 size={16} className="text-yellow-600" />
                      <span className="text-xs font-black text-gray-700 uppercase">Catalog Health</span>
                   </div>
                   <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded">Optimal</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Verification Rate</p>
                      <p className="text-lg font-black text-gray-900">92.4%</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Fulfillment Speed</p>
                      <p className="text-lg font-black text-gray-900">2.4 Days</p>
                   </div>
                </div>
             </div>

             <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-xs font-black text-gray-700 uppercase">Peak Trade periods</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Daily Peak</span>
                      <span className="text-gray-900 font-bold">14:00 - 18:00 WAT</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Busiest Day</span>
                      <span className="text-gray-900 font-bold">Thursdays</span>
                   </div>
                </div>
             </div>

             <div className="pt-2">
                <button className="w-full py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 cursor-pointer">
                   Access Full Log Forensics
                </button>
             </div>
          </div>
        </AnalyticsCard>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
         <div className="flex items-center space-x-4">
           <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600 shadow-inner">
             <Globe size={20} />
           </div>
           <div>
             <h4 className="font-bold text-gray-900 tracking-tight">Data Synchronicity</h4>
             <p className="text-xs text-gray-500 font-medium italic">Reports are synchronized with blockchain-verified trade manifests every 15 minutes.</p>
           </div>
         </div>
         <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Buy From Africa Market Intel v1.02</p>
      </div>
    </div>
  );
}
