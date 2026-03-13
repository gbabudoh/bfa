"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  Mail,
  Trash2,
  Edit2,
  ShoppingCart,
  MapPin,
  Eye,
  Ban,
  RefreshCcw,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Globe,
  User
} from 'lucide-react';

interface Buyer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
  ordersCount: number;
  totalSpent: number;
  location: string;
}

const BuyerTableRow = ({ buyer }: { buyer: Buyer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50/80 transition-all group cursor-pointer border-b border-gray-50 last:border-0">
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="relative group/avatar">
            <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-yellow-100 to-amber-50 rounded-[1.25rem] flex items-center justify-center text-yellow-700 font-black text-xl border border-yellow-200/50 shadow-inner group-hover/avatar:scale-110 transition-transform duration-500">
              {buyer.name.charAt(0)}
            </div>
            {buyer.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck size={12} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1.5">{buyer.name}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded tracking-tighter uppercase">{buyer.id}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-bold text-gray-700 mb-1">
            <Mail size={12} className="mr-2 text-[#D9A606]" />
            {buyer.email}
          </div>
          <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-5">
            <MapPin size={10} className="mr-1.5" />
            {buyer.location}
          </div>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-900 group-hover:scale-105 transition-transform duration-300">
          <ShoppingCart size={14} className="mr-2 text-yellow-500" />
          <span className="text-xs font-black tracking-widest">{buyer.ordersCount}</span>
          <span className="text-[9px] text-gray-400 font-bold ml-1.5 uppercase tracking-tighter">Orders</span>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="text-sm font-black text-gray-900 flex items-center">
            <DollarSign size={14} className="mr-0.5 text-emerald-500" />
            {buyer.totalSpent.toLocaleString()}
          </div>
          <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Total Acquisition</span>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center">
          {buyer.isVerified ? (
            <div className="flex items-center text-emerald-600 text-[10px] font-black tracking-[0.15em] bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2.5 animate-pulse"></div>
              TRUSTED
            </div>
          ) : (
            <div className="flex items-center text-gray-500 text-[10px] font-black tracking-[0.15em] bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
              <ShieldAlert size={14} className="mr-2.5" />
              IDENTIFIED
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
            <div className="absolute right-8 mt-2 w-56 bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="px-5 py-2 border-b border-gray-50 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Consumer Control</p>
              </div>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest text-left group/item">
                <Eye size={16} className="mr-3 text-gray-400 group-hover/item:text-blue-500 transition-colors" /> View Dossier
              </button>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors uppercase tracking-widest text-left group/item">
                <Edit2 size={16} className="mr-3 text-gray-400 group-hover/item:text-yellow-600 transition-colors" /> Adjust Details
              </button>
              <div className="h-px bg-gray-100/50 mx-5 my-2"></div>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-orange-600 hover:bg-orange-50 transition-colors uppercase tracking-widest text-left group/item">
                <Ban size={16} className="mr-3 group-hover/item:rotate-12 transition-transform" /> Suspend Account
              </button>
              <button className="flex items-center w-full px-5 py-3 text-xs font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest text-left group/item">
                <Trash2 size={16} className="mr-3 group-hover/item:-translate-y-0.5 transition-transform" /> Excise Member
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'UNVERIFIED'>('ALL');

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/buyers');
      if (res.ok) {
        const data = await res.json();
        setBuyers(data);
      }
    } catch (error) {
      console.error('Failed to fetch buyers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayBuyers = buyers.length > 0 ? buyers : [
    { id: 'BYR-001', name: 'Amara Kone', email: 'amara@example.com', createdAt: '2025-02-10', isVerified: true, ordersCount: 12, totalSpent: 4250, location: 'Abidjan, CI' },
    { id: 'BYR-002', name: 'David Chen', email: 'david.c@buyer.net', createdAt: '2025-01-15', isVerified: true, ordersCount: 8, totalSpent: 2100, location: 'London, UK' },
    { id: 'BYR-003', name: 'Fatima Al-Rashid', email: 'fatima@trade.co', createdAt: '2025-03-01', isVerified: false, ordersCount: 2, totalSpent: 380, location: 'Dubai, UAE' },
    { id: 'BYR-004', name: 'Sophie Mbeki', email: 'sophie.m@gmail.com', createdAt: '2025-02-28', isVerified: false, ordersCount: 0, totalSpent: 0, location: 'Johannesburg, SA' },
    { id: 'BYR-005', name: 'James Okafor', email: 'james.o@outlook.com', createdAt: '2025-01-05', isVerified: true, ordersCount: 23, totalSpent: 8900, location: 'Lagos, NG' },
  ];

  const filteredBuyers = displayBuyers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'VERIFIED' && b.isVerified) || (statusFilter === 'UNVERIFIED' && !b.isVerified);
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Consumers', value: displayBuyers.length.toString(), change: '+8%', isPositive: true, icon: <Globe size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Verified Integrity', value: displayBuyers.filter(b => b.isVerified).length.toString(), change: '+15%', isPositive: true, icon: <ShieldCheck size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Purchase Volume', value: displayBuyers.reduce((sum, b) => sum + b.ordersCount, 0).toString(), change: '+12%', isPositive: true, icon: <ShoppingCart size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Gross Lifetime Value', value: `$${displayBuyers.reduce((sum, b) => sum + b.totalSpent, 0).toLocaleString()}`, change: '+24%', isPositive: true, icon: <DollarSign size={20} />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-emerald-100/50">
            Consumer Ecosystem Ledger
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            Buyer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-yellow-500 uppercase tracking-tighter">Engagement</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed max-w-xl">
            Monitor acquisition metrics, manage buyer demographics, and audit transaction volumes across the global platform.
          </p>
        </div>
        
        <div className="relative z-10 w-full lg:w-auto">
          <button 
            onClick={fetchBuyers}
            className="w-full lg:w-auto flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer group"
          >
            <RefreshCcw size={20} className={`group-hover:rotate-180 transition-transform duration-700 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Ledger</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-center mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive ? <TrendingUp size={14} /> : <ArrowDownRight size={14} />}
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
          {(['ALL', 'VERIFIED', 'UNVERIFIED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`whitespace-nowrap px-10 py-4 text-[10px] font-black tracking-[0.3em] rounded-2xl transition-all cursor-pointer uppercase ${
                statusFilter === tab 
                  ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-200/50 border border-emerald-50/50' 
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
              placeholder="Query ecosystem by name, email or geography..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4.5 bg-white/50 border border-white/60 rounded-2xl text-[13px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/20 transition-all placeholder:text-gray-400 placeholder:font-medium placeholder:italic shadow-inner"
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
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Consumer Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact Vector</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Purchase Count</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Lifetime Value</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Audit Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && buyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Hydrating Ledger...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBuyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No matching records found in ecosystem</p>
                  </td>
                </tr>
              ) : (
                filteredBuyers.map((buyer) => (
                  <BuyerTableRow key={buyer.id} buyer={buyer} />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Advanced Pagination */}
        <div className="px-12 py-10 bg-gray-50/30 border-t border-gray-50 flex flex-col xl:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-xl border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 shadow-sm">
                  {i === 4 ? '+99' : <User size={14} />}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.05em]">
              Auditing <span className="text-gray-900 font-black tracking-tight">{filteredBuyers.length}</span> of <span className="text-gray-900 font-black tracking-tight">{displayBuyers.length}</span> members
            </p>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm">
            <button className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Previous Page
            </button>
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20">1</div>
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">2</div>
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors text-xs font-serif italic tracking-widest">...</div>
              <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">84</div>
            </div>
            <button className="px-6 py-3 text-[10px] font-black text-emerald-600 uppercase tracking-widest rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group">
              Next Stage <ChevronRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
