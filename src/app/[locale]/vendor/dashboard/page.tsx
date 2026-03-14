"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  ShoppingBag, 
  TrendingUp,
  Plus,
  Truck,
  CheckCircle,
  Package,
  Heart,
  ChevronRight,
  ExternalLink,
  LucideIcon
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  color: string;
  delay: string;
}

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color, delay }: StatCardProps) => (
  <div 
    className={`group relative overflow-hidden p-6 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-2xl transition-all duration-700 hover:scale-[1.02] hover:bg-white/60 hover:border-[#D9A606]/30 shadow-xl animate-in fade-in slide-in-from-bottom-5 ${delay}`}
  >
    <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${color.replace('text-', 'bg-')}/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000`}></div>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-8">
        <div className={`p-4 rounded-2xl ${color.replace('text-', 'bg-')}/10 ${color} backdrop-blur-md border border-white/50 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-white lg:backdrop-blur-md shadow-sm">
          <TrendingUp className={`w-3 h-3 ${trendUp ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
          <span className="text-[10px] font-black tracking-tighter text-zinc-600">{trend}</span>
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1">{title}</h3>
        <p className="text-4xl font-black text-zinc-900 tracking-tighter relative">
          {value}
          <span className={`absolute -right-4 top-0 text-[40px] opacity-[0.03] font-black uppercase pointer-events-none`}>{title[0]}</span>
        </p>
      </div>
    </div>
  </div>
);

export default function VendorDashboardPage() {
  const { data: session } = useSession();
  const t = useTranslations('VendorDashboard');
  
  const recentOrders = [
    { id: 'ORD-123456', product: 'African Textiles & Crafts', date: '21/03/2025', customer: 'Global Imports Co.', amount: 345.00, status: 'processing' },
    { id: 'ORD-123455', product: 'Premium Ankara Print', date: '20/03/2025', customer: 'European Ltd.', amount: 125.50, status: 'shipped' },
    { id: 'ORD-123454', product: 'Handmade Beaded Jewelry', date: '19/03/2025', customer: 'Fashion Retail', amount: 89.25, status: 'delivered' },
    { id: 'ORD-123453', product: 'Organic Shea Butter', date: '18/03/2025', customer: 'Boutique Stores', amount: 210.75, status: 'delivered' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* ── Premium Welcome Banner (Buyer Pattern) ── */}
      <section className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9A606] via-[#F2B705] to-[#D9A606] rounded-[3rem] shadow-2xl shadow-[#D9A606]/20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-full bg-white/10 skew-x-[-20deg] translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
        
        <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                {t('dashboard.liveStatus')}
             </div>
             <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                {t('dashboard.hello', { name: session?.user?.name?.split(' ')[0] || t('dashboard.storeOwner') })}
             </h1>
             <p className="text-lg font-bold text-white/90 leading-relaxed tracking-tight max-w-md">
                {t('dashboard.welcomeMessage', { count: 12 })}
             </p>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/vendor/dashboard/products" 
              className="bg-white text-[#D9A606] px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {t('dashboard.manageProducts')}
            </Link>
            <button className="p-5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all group/settings">
               <Plus className="w-6 h-6 group-hover/settings:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Grid (Buyer Pattern) ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('stats.orders')} 
          value="12" 
          trend="+20%" 
          trendUp={true} 
          icon={ShoppingBag} 
          color="text-blue-500" 
          delay="duration-700" 
        />
        <StatCard 
          title={t('stats.pending')} 
          value="03" 
          trend="-5%" 
          trendUp={false} 
          icon={Truck} 
          color="text-amber-500" 
          delay="duration-700 delay-100" 
        />
        <StatCard 
          title={t('stats.delivered')} 
          value="08" 
          trend="+12%" 
          trendUp={true} 
          icon={CheckCircle} 
          color="text-emerald-500" 
          delay="duration-700 delay-200" 
        />
        <StatCard 
          title={t('stats.inventory')} 
          value="45" 
          trend="+4" 
          trendUp={true} 
          icon={Package} 
          color="text-purple-500" 
          delay="duration-700 delay-300" 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Transactions (Buyer Table Pattern) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-10 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-3xl shadow-xl overflow-hidden relative group">
             <div className="flex items-center justify-between mb-10">
                <div>
                   <h3 className="text-xl font-black text-zinc-900 tracking-tight">{t('transactions.title')}</h3>
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('transactions.subtitle')}</span>
                </div>
                <button className="p-3 rounded-2xl bg-gray-100 hover:bg-white border border-gray-200 transition-all">
                   <ExternalLink className="w-4 h-4 text-zinc-400" />
                </button>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-left border-b border-gray-200/50">
                     <th className="pb-6">{t('transactions.product')}</th>
                     <th className="pb-6 text-center">{t('transactions.id')}</th>
                     <th className="pb-6 text-center">{t('transactions.amount')}</th>
                     <th className="pb-6 text-right">{t('transactions.status')}</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100/50">
                   {recentOrders.map((order) => (
                     <tr key={order.id} className="group/row hover:bg-white/20 transition-colors">
                       <td className="py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-zinc-400 group-hover/row:bg-white transition-all">
                               <Package className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-zinc-900 line-clamp-1">{order.product}</p>
                               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{order.date}</p>
                            </div>
                         </div>
                       </td>
                       <td className="py-6 text-center font-mono text-[11px] font-bold text-zinc-400 group-hover/row:text-[#D9A606] transition-colors">#{order.id.split('-')[1]}</td>
                       <td className="py-6 text-center">
                          <span className="text-sm font-black text-zinc-900">${order.amount.toFixed(2)}</span>
                          <span className="text-[9px] font-black text-zinc-400 ml-1">USD</span>
                       </td>
                       <td className="py-6 text-right">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                            order.status === 'processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            order.status === 'shipped' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-green-50 text-green-600 border-green-100'
                          }`}>
                            {t(`transactions.statuses.${order.status}`)}
                          </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Intelligence Side Card (Buyer Wishlist Pattern) */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-10 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-3xl shadow-xl overflow-hidden relative group">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 shadow-sm border border-red-50">
                    <Heart className="w-6 h-6 fill-current" />
                 </div>
                 <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('inventory.health')}</span>
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">{t('inventory.lowStockTitle')}</h3>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed mb-8">
                 <span className="text-red-500 font-extrabold text-lg">04</span> {t('inventory.lowStockMessage')}
              </p>
              
              <div className="space-y-4">
                 {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-3xl bg-white/60 border border-gray-100 group/item hover:border-[#D9A606]/30 transition-all flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                             <TrendingUp className="w-4 h-4 text-zinc-400 group-hover/item:text-red-500 transition-colors" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-tight text-zinc-700">{t('inventory.stockAlert', { number: i })}</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
