"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  Store,
  ExternalLink,
  Trash2,
  Edit2,
  MapPin,
  Star,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Package,
  Clock
} from 'lucide-react';

interface VendorTableRowProps {
  vendor: {
    id: string;
    storeName: string;
    owner: string;
    location: string;
    rating: number;
    isVerified: boolean;
    createdAt: string;
  };
}

const VendorTableRow = ({ vendor }: VendorTableRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50/80 transition-all group cursor-pointer border-b border-gray-50 last:border-0">
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="relative group/avatar">
            <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-[1.25rem] flex items-center justify-center text-blue-700 font-black text-xl border border-blue-200/50 shadow-inner group-hover/avatar:scale-110 transition-transform duration-500">
              <Store size={24} className="group-hover/avatar:rotate-12 transition-transform duration-300" />
            </div>
            {vendor.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 border-2 border-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck size={12} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1.5">{vendor.storeName}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded tracking-tighter uppercase">{vendor.id}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="text-sm font-bold text-gray-700 mb-1">{vendor.owner}</div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Business Owner</span>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-bold text-gray-700 mb-1">
            <MapPin size={12} className="mr-2 text-blue-500" />
            {vendor.location}
          </div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-5">Operational Region</span>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-black text-yellow-600 mb-1">
            <Star size={14} className="mr-1.5 fill-yellow-500 text-yellow-500" />
            {vendor.rating.toFixed(1)}
          </div>
          <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 rounded-full" 
              style={{ width: `${(vendor.rating / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center">
          {vendor.isVerified ? (
            <div className="flex items-center text-blue-600 text-[10px] font-black tracking-[0.15em] bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 shadow-sm">
              <ShieldCheck size={14} className="mr-2.5" />
              VERIFIED
            </div>
          ) : (
            <div className="flex items-center text-amber-600 text-[10px] font-black tracking-[0.15em] bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 italic">
              <Clock size={14} className="mr-2.5 animate-pulse" />
              PENDING AUDIT
            </div>
          )}
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap text-right relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="text-gray-300 hover:text-gray-900 p-3 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer group/btn"
        >
          <MoreVertical size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
        </button>
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute right-8 mt-2 w-56 bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-left">
              <div className="px-5 py-2 border-b border-gray-50 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enterprise Control</p>
              </div>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest text-left group/item">
                <ExternalLink size={16} className="mr-3 text-blue-400 group-hover/item:text-blue-600 transition-colors" /> Visit Storefront
              </button>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest text-left group/item">
                <Edit2 size={16} className="mr-3 text-yellow-400 group-hover/item:text-yellow-600 transition-colors" /> Modify Assets
              </button>
              <div className="h-px bg-gray-100/50 mx-5 my-2"></div>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest text-left group/item">
                <Trash2 size={16} className="mr-3 group-hover/item:scale-110 transition-transform" /> Suspend Entity
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const mockVendors = [
    { id: 'VND-201', storeName: 'Lagos Textiles Ltd.', owner: 'Ama Mensah', location: 'Lagos, Nigeria', rating: 4.8, isVerified: true, createdAt: '2025-01-20' },
    { id: 'VND-305', storeName: 'Nairobi Coffee Co.', owner: 'Samuel Ruto', location: 'Nairobi, Kenya', rating: 4.5, isVerified: true, createdAt: '2025-01-22' },
    { id: 'VND-412', storeName: 'Cape Town Leathers', owner: 'Robert Smith', location: 'Cape Town, SA', rating: 3.2, isVerified: false, createdAt: '2025-01-15' },
    { id: 'VND-109', storeName: 'Accra Arts & Design', owner: 'Kwame Nkrumah', location: 'Accra, Ghana', rating: 4.9, isVerified: true, createdAt: '2025-01-25' },
  ];

  const stats = [
    { label: 'Validated Partners', value: '1,248', change: '+12%', isPositive: true, icon: <Building2 size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Asset Throughput', value: '45.2k', change: '+8%', isPositive: true, icon: <Package size={20} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Audit Queue', value: '12', change: '-4%', isPositive: false, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-blue-100/50">
            System Asset Registry
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            Vendor <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 uppercase tracking-tighter">Architecture</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed max-w-xl">
            Maintain and audit the commercial entities feeding the platform supply chain. Ensure operational compliance and store integrity.
          </p>
        </div>
        
        <div className="relative z-10 w-full lg:w-auto">
          <button className="w-full lg:w-auto flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer group">
            <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
            <span>Verification Requests</span>
            <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-lg ml-2">12</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-center mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters & Tabs Bar */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-3 rounded-[2rem] shadow-sm flex flex-col xl:flex-row justify-between items-stretch gap-4 sticky top-24 z-30">
        <div className="flex p-1 bg-gray-100/50 backdrop-blur-md rounded-[1.5rem] overflow-x-auto no-scrollbar">
          {['ALL', 'VERIFIED', 'PENDING', 'SUSPENDED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-10 py-4 text-[10px] font-black tracking-[0.3em] rounded-2xl transition-all cursor-pointer uppercase ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-200/50 border border-blue-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="relative flex-1 min-w-[340px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Query ecosystem by store name or owner..."
              className="w-full pl-14 pr-6 py-4.5 bg-white/50 border border-white/60 rounded-2xl text-[13px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all placeholder:text-gray-400 placeholder:font-medium placeholder:italic shadow-inner"
            />
          </div>
          <button className="p-4.5 text-gray-500 bg-white/50 border border-white/60 hover:bg-white rounded-2xl transition-all cursor-pointer shadow-sm group">
            <Filter size={20} className="group-hover:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Store Entity</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ownership</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Geographic Hub</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Consumer Trust</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Compliance</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockVendors.map((vendor) => (
                <VendorTableRow key={vendor.id} vendor={vendor} />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-12 py-10 bg-gray-50/30 border-t border-gray-50 flex flex-col xl:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
              Operational Registry Status: <span className="text-gray-900">Active</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm">
            <button className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Previous Page
            </button>
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">1</div>
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">2</div>
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors text-xs font-serif italic tracking-widest">...</div>
            </div>
            <button className="px-6 py-3 text-[10px] font-black text-blue-600 uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all cursor-pointer group">
              Next Stage <ChevronRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
