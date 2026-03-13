"use client";

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  vendor: string;
  total: number;
  items: number;
  status: string;
}

const OrderTableRow = ({ order }: { order: Order }) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-all group border-b border-gray-100/50">
            <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600' :
                    order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600' :
                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  } shadow-inner`}>
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1.5">{order.id}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <Calendar size={10} />
                      {order.date}
                    </div>
                  </div>
                </div>
            </td>
            <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-black text-xs border border-gray-200 shadow-sm">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900 leading-none mb-1">{order.customer}</div>
                    <div className="text-[10px] text-gray-400 font-bold tracking-tight">{order.email}</div>
                  </div>
                </div>
            </td>
            <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50">{order.vendor}</span>
                </div>
            </td>
            <td className="px-8 py-6 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-black text-gray-900 flex items-center leading-none mb-1">
                    <DollarSign size={14} className="text-emerald-500 -ml-0.5" />
                    {order.total.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.items} Units Registry</div>
                </div>
            </td>
            <td className="px-8 py-6 whitespace-nowrap">
                <div className={`flex items-center gap-2 text-[9px] font-black tracking-[0.15em] px-3 py-1.5 rounded-xl border uppercase inline-flex transition-all ${
                    order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100/50' :
                    order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-100/50' :
                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100 shadow-sm shadow-red-100/50' :
                    'bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-100/50 animate-pulse'
                }`}>
                    {order.status === 'DELIVERED' && <CheckCircle2 size={12} />}
                    {order.status === 'PROCESSING' && <Truck size={12} />}
                    {order.status === 'CANCELLED' && <XCircle size={12} />}
                    {order.status === 'PENDING' && <Clock size={12} />}
                    {order.status}
                </div>
            </td>
            <td className="px-8 py-6 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all cursor-pointer group/eye shadow-sm hover:shadow-md border border-transparent hover:border-indigo-100">
                      <Eye size={18} className="group-hover/eye:scale-110 transition-transform" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer">
                      <MoreVertical size={18} />
                  </button>
                </div>
            </td>
        </tr>
    );
};

export default function AdminOrdersPage() {
    const [activeTab, setActiveTab ] = useState('ALL');

    const mockOrders = [
        { id: 'ORD-5542', date: 'JAN 26, 2025', customer: 'David Olatunji', email: 'david@example.com', vendor: 'Lagos Textiles', total: 145.00, items: 3, status: 'PROCESSING' },
        { id: 'ORD-5541', date: 'JAN 25, 2025', customer: 'Sarah Mensah', email: 'sarah@test.net', vendor: 'Accra Arts', total: 85.50, items: 1, status: 'DELIVERED' },
        { id: 'ORD-5540', date: 'JAN 25, 2025', customer: 'Kofi Annan', email: 'kofi@mail.gh', vendor: 'Lagos Textiles', total: 210.00, items: 5, status: 'PENDING' },
        { id: 'ORD-5539', date: 'JAN 24, 2025', customer: 'Mary Njoku', email: 'mary@domain.ng', vendor: 'Cape Town Leathers', total: 1240.00, items: 2, status: 'CANCELLED' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-12">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-blue-100/50">
                    Transaction Oversight Hub
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
                    Order <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-700 tracking-tighter">Registry</span>
                  </h1>
                  <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed max-w-xl">
                    Monitor global commerce flow, audit fulfillment progress, and adjudicate transaction status across the entire ecosystem.
                  </p>
                </div>
                
                <div className="relative z-10 w-full lg:w-auto">
                    <button className="flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-8 py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer group">
                        <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                        <span>Export Ledger</span>
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Circulating Orders', value: '142', sub: '+12% Velocity', color: 'text-blue-600', icon: Clock, bg: 'bg-blue-50' },
                    { label: 'Escrow Volume', value: '$12,450', sub: '24 Pending Clearance', color: 'text-amber-600', icon: DollarSign, bg: 'bg-amber-50' },
                    { label: 'Success Quotient', value: '98.5%', sub: 'Exceeding Baseline', color: 'text-emerald-600', icon: CheckCircle2, bg: 'bg-emerald-50' },
                    { label: 'Deflection Rate', value: '2.1%', sub: 'Last 7 Days Audit', color: 'text-rose-600', icon: AlertCircle, bg: 'bg-rose-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                        <div className="flex justify-between items-center mb-6">
                          <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                            <stat.icon size={22} />
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-gray-50 text-gray-400">
                            <TrendingUp size={14} className="text-emerald-500" />
                            Live
                          </div>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        <h3 className={`text-3xl font-black mt-2 tracking-tight ${stat.color}`}>{stat.value}</h3>
                        <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Sticky Filters & Search */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-3 rounded-[2rem] shadow-sm flex flex-col xl:flex-row justify-between items-stretch gap-4 sticky top-24 z-30">
                <div className="flex p-1 bg-gray-100/50 backdrop-blur-md rounded-[1.5rem] overflow-x-auto no-scrollbar">
                    {['ALL', 'PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap px-8 py-4 text-[10px] font-black tracking-[0.3em] rounded-2xl transition-all cursor-pointer uppercase ${
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
                    <div className="relative flex-1 min-w-[350px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Query by Order ID, Customer Entity or Vendor Name..."
                            className="w-full pl-14 pr-6 py-4.5 bg-white/50 border border-white/60 rounded-2xl text-[13px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all placeholder:text-gray-400 placeholder:font-medium placeholder:italic shadow-inner"
                        />
                    </div>
                    <button className="p-4.5 text-gray-500 bg-white/50 border border-white/60 hover:bg-white rounded-2xl transition-all cursor-pointer shadow-sm group">
                        <Filter size={20} className="group-hover:scale-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Order Reference</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Client Identity</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Vendor Node</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Audit Total</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Fulfillment Status</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockOrders.map((order) => (
                                <OrderTableRow key={order.id} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination / Footer */}
                <div className="p-8 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-50">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                      Showing results from <span className="text-gray-900 font-black tracking-tight">JAN 24</span> to <span className="text-gray-900 font-black tracking-tight">JAN 26</span>
                    </p>
                    <button className="flex items-center gap-2 px-10 py-4.5 bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer group/history">
                      Access Archival Data (1,248 Records)
                      <ArrowUpRight size={14} className="group-hover/history:translate-x-0.5 group-hover/history:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
