"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  Store, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  ClipboardList, 
  CheckCircle2, 
  Heart, 
  ExternalLink,
  UserCheck,
  Package,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(' ')[0] || 'Admin';

  const stats = [
    {
      label: 'VENDORS',
      value: '1,248',
      change: '+20%',
      isPositive: true,
      icon: <Store size={22} />,
      gradient: 'from-amber-400 via-yellow-400 to-orange-300',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-700',
      letter: 'V',
      letterColor: 'text-amber-300/30',
    },
    {
      label: 'PENDING',
      value: '24',
      change: '',
      isPositive: false,
      icon: <ClipboardList size={22} />,
      gradient: 'from-orange-400 via-orange-300 to-amber-200',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-700',
      letter: 'P',
      letterColor: 'text-orange-300/30',
    },
    {
      label: 'DELIVERED',
      value: '3,892',
      change: '+12%',
      isPositive: true,
      icon: <CheckCircle2 size={22} />,
      gradient: 'from-emerald-400 via-green-300 to-teal-200',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-700',
      letter: 'D',
      letterColor: 'text-emerald-300/30',
    },
    {
      label: 'TOTAL REVENUE',
      value: '$1.2M',
      change: '+24%',
      isPositive: true,
      icon: <DollarSign size={22} />,
      gradient: 'from-violet-400 via-purple-300 to-fuchsia-200',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-700',
      letter: '$',
      letterColor: 'text-violet-300/30',
    },
  ];

  const recentActivity = [
    { product: 'AFRICAN TEXTILES & CRAFTS', items: '2 ITEMS', date: '21/03/2025', id: '#654321', amount: '$345.00', currency: 'USD', status: 'PROCESSING', statusColor: 'text-orange-500' },
    { product: 'SHEA BUTTER COLLECTION', items: '1 ITEM', date: '20/03/2025', id: '#654320', amount: '$120.00', currency: 'USD', status: 'DELIVERED', statusColor: 'text-green-500' },
    { product: 'KENTE WOVEN FABRIC', items: '3 ITEMS', date: '19/03/2025', id: '#654319', amount: '$780.00', currency: 'USD', status: 'SHIPPED', statusColor: 'text-blue-500' },
    { product: 'COCOA BEAN PREMIUM', items: '5 ITEMS', date: '18/03/2025', id: '#654318', amount: '$1,250.00', currency: 'USD', status: 'PROCESSING', statusColor: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-[2.5rem] bg-slate-900 p-8 lg:p-12 overflow-hidden shadow-2xl shadow-yellow-900/10 min-h-[320px] flex items-center">
        {/* Animated Mesh Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D9A606]/30 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] -ml-24 -mb-24"></div>
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#F2C41A]/10 rounded-full blur-[80px]"></div>

        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] rounded-full backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)] animate-pulse"></span>
              Central Command Active
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
              Welcome back, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-[#D9A606]">{userName}</span>
            </h1>
            <p className="mt-6 text-white/50 text-base font-medium leading-relaxed">
              Your ecosystem is thriving. Today there are <span className="text-white font-bold border-b border-yellow-500/40 pb-0.5">24 pending verifications</span> and <span className="text-white font-bold border-b border-yellow-500/40 pb-0.5">12 regional alerts</span> across the platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-4 w-full lg:w-auto">
            <Link 
              href="/admin/vendors"
              className="flex-1 lg:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#D9A606] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-yellow-600 shadow-xl shadow-yellow-900/20 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Verify Vendors
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href="/admin/cms"
              className="flex-1 lg:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/10 backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Manage CMS
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="group relative rounded-[2rem] bg-white border border-gray-100 p-7 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-default hover:-translate-y-1"
          >
            {/* Background Accent Gradients */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center ${stat.iconColor} shadow-inner`}>
                  {stat.icon}
                </div>
                {stat.change && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
              </div>

              {/* Individual Glass Progress Bar/Indicator (Mock) */}
              <div className="mt-6 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.gradient} w-[70%] rounded-full`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 flex justify-between items-center border-b border-gray-50">
            <div>
              <h2 className="font-black text-gray-900 text-xl tracking-tight">Financial Overview</h2>
              <p className="text-sm text-gray-400 font-medium mt-1">Real-time platform transactional data</p>
            </div>
            <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-all cursor-pointer group/link">
              <span className="text-[10px] font-black uppercase tracking-widest group-hover/link:mr-1 transition-all">Review Ledger</span>
              <ExternalLink size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Flow</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Asset ID</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Volume</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentActivity.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50/80 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                          <ShoppingBag size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1.5">{tx.product}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{tx.items} • {tx.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <span className="text-xs font-mono font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg tracking-tighter">{tx.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900">{tx.amount}</span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest">{tx.currency}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${tx.statusColor.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`}></span>
                        <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${tx.statusColor}`}>{tx.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Cards */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 group/quick">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Heart size={16} className="text-orange-400" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shortcuts</span>
            </div>
            <h3 className="font-black text-gray-900 text-xl tracking-tight">Active Pulse</h3>
            <p className="text-sm text-gray-400 font-medium mt-2 leading-relaxed">
              Real-time shortcuts for high-frequency operations.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: 'Vendors', href: '/admin/vendors', color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-600', icon: <Store size={14} /> },
                { label: 'Buyers', href: '/admin/buyers', color: 'bg-green-50 text-green-600 hover:bg-green-600', icon: <UserCheck size={14} /> },
                { label: 'Inventory', href: '/admin/products', color: 'bg-blue-50 text-blue-600 hover:bg-blue-600', icon: <Package size={14} /> },
                { label: 'Flow', href: '/admin/analytics', color: 'bg-purple-50 text-purple-600 hover:bg-purple-600', icon: <TrendingUp size={14} /> },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`flex flex-col items-center justify-center p-4 ${link.color} rounded-2xl text-center hover:text-white transition-all cursor-pointer group/item hover:-translate-y-1 shadow-sm hover:shadow-lg`}
                >
                  <div className="mb-2 transition-transform group-hover/item:scale-110">{link.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Regional Reach */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 relative overflow-hidden group/reach">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
            <h3 className="font-black text-gray-900 text-lg tracking-tight mb-8">Regional Ecosystem</h3>
            <div className="space-y-6">
              {[
                { region: 'West Africa', count: '450 Vendors', percentage: 75, color: 'bg-[#D9A606]' },
                { region: 'East Africa', count: '320 Vendors', percentage: 60, color: 'bg-blue-500' },
                { region: 'South Africa', count: '280 Vendors', percentage: 45, color: 'bg-green-500' },
                { region: 'North Africa', count: '120 Vendors', percentage: 25, color: 'bg-purple-500' },
              ].map((reg) => (
                <div key={reg.region} className="space-y-2.5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{reg.region}</span>
                    <span className="text-xs font-bold text-gray-700">{reg.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${reg.color} rounded-full transition-all duration-[1.5s] ease-out shadow-[0_0_8px_currentColor]`}
                      style={{ width: `${reg.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/analytics" className="mt-10 flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all active:scale-95 cursor-pointer">
              Analytical Insight
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
