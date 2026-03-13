"use client";

import {
  ShoppingBag,
  Truck,
  CheckCircle,
  Settings,
  Heart,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Clock,
  ExternalLink,
  Package,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const recentOrders = [
  {
    id: "ORD-654321",
    date: "2025-03-21",
    vendor: "African Textiles & Crafts",
    amount: 345.0,
    status: "processing",
    items: 2,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "ORD-654320",
    date: "2025-03-15",
    vendor: "Ghana Fabrics",
    amount: 120.75,
    status: "shipped",
    items: 1,
    image: "https://images.unsplash.com/photo-1582142306909-195724d339d4?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "ORD-654319",
    date: "2025-03-10",
    vendor: "Moroccan Artisans",
    amount: 210.5,
    status: "delivered",
    items: 3,
    image: "https://images.unsplash.com/photo-1621319011735-993bc522e038?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "processing":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
          <Clock className="mr-1.5 h-3 w-3" /> Processing
        </span>
      );
    case "shipped":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-50 text-yellow-700 border border-yellow-100 shadow-sm">
          <Truck className="mr-1.5 h-3 w-3" /> Shipped
        </span>
      );
    case "delivered":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
          <CheckCircle className="mr-1.5 h-3 w-3" /> Delivered
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-100">
          {status}
        </span>
      );
  }
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: "yellow" | "blue" | "emerald" | "violet";
  href: string;
  actionLabel: string;
}

function StatCard({ label, value, icon: Icon, trend, color, href, actionLabel }: StatCardProps) {
  const colorMap = {
    yellow: "bg-gradient-to-br from-yellow-50/80 to-amber-50/40 border-yellow-200/50 text-yellow-700 shadow-yellow-500/5",
    blue: "bg-gradient-to-br from-blue-50/80 to-indigo-50/40 border-blue-200/50 text-blue-700 shadow-blue-500/5",
    emerald: "bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border-emerald-200/50 text-emerald-700 shadow-emerald-500/5",
    violet: "bg-gradient-to-br from-violet-50/80 to-purple-50/40 border-violet-200/50 text-violet-700 shadow-violet-500/5",
  };

  const iconBgMap = {
    yellow: "bg-yellow-100/50",
    blue: "bg-blue-100/50",
    emerald: "bg-emerald-100/50",
    violet: "bg-violet-100/50",
  };

  return (
    <div className={`group relative p-6 rounded-[2.5rem] ${colorMap[color]} border backdrop-blur-xl shadow-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${iconBgMap[color]} border border-white shadow-sm group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700">
            <TrendingUp className="w-3 h-3" /> {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1">{label}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
      </div>
      <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={href} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-yellow-600 flex items-center gap-2 transition-colors">
          {actionLabel} <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="absolute bottom-4 right-4 text-slate-200/40 font-black text-6xl pointer-events-none select-none italic group-hover:opacity-10 transition-opacity">
        {label.charAt(0)}
      </div>
    </div>
  );
}

export default function BuyerDashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name || "there";

  return (
    <div className="max-w-[1400px] mx-auto space-y-12">
      {/* ── Welcome Header (Light Mode) ── */}
      <section className="relative overflow-hidden p-10 rounded-[3rem] bg-gradient-to-r from-yellow-500 to-amber-600 shadow-[0_30px_60px_rgba(217,166,6,0.15)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-[10px] font-black text-white uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              Live Account Status: Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tightest leading-none mb-3">
               Hello, {name.split(' ')[0]}!
            </h1>
            <p className="text-amber-50/90 font-medium text-sm md:text-base max-w-lg leading-relaxed">
              Your gateway to authentic African imports is ready. You have <span className="text-white font-black underline decoration-2 underline-offset-4">3 pending shipments</span> arriving this week.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/products" className="px-8 py-4 rounded-full bg-white text-slate-900 font-black text-sm tracking-tight shadow-xl hover:scale-105 active:scale-95 transition-all">
                Continue Shopping
             </Link>
             <button className="p-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
      </section>

      {/* ── Stats Grid ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Orders"
          value="12"
          icon={ShoppingBag}
          trend="+20%"
          color="blue"
          href="/buyer/dashboard/orders"
          actionLabel="View History"
        />
        <StatCard
          label="Pending"
          value="03"
          icon={Truck}
          color="yellow"
          href="/buyer/dashboard/orders?status=pending"
          actionLabel="Track All"
        />
        <StatCard
          label="Delivered"
          value="08"
          icon={CheckCircle}
          trend="+12%"
          color="emerald"
          href="/buyer/dashboard/orders?status=delivered"
          actionLabel="View Reciepts"
        />
        <StatCard
          label="Saved Items"
          value="45"
          icon={Heart}
          color="violet"
          href="/buyer/dashboard/saved"
          actionLabel="Browse List"
        />
      </section>

      {/* ── Recent Activity & Orders ── */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Table (Light Glass) */}
        <div className="xl:col-span-2 p-8 rounded-[3rem] bg-white/60 border border-white backdrop-blur-2xl shadow-xl">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Transactions</h2>
              <p className="text-slate-400 text-xs font-medium">Monitoring your latest inventory flows</p>
            </div>
            <Link href="/buyer/dashboard/orders" className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 transition-all group">
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-2 text-left">Product</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-2">ID</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-2 text-right">Amount</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-2">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                             <Package className="w-5 h-5 text-slate-300" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 group-hover:text-yellow-600 transition-colors uppercase tracking-tight">{order.vendor}</p>
                          <p className="text-[10px] font-bold text-slate-400 italic uppercase">2 items • {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-2">
                       <span className="font-mono text-[11px] text-slate-400 tracking-wider">#{order.id.split('-')[1]}</span>
                    </td>
                    <td className="py-5 px-2 text-right">
                       <p className="text-sm font-black text-slate-900 tracking-tighter">${order.amount.toFixed(2)}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">USD</p>
                    </td>
                    <td className="py-5 px-2 text-right">
                       <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Mini-Widgets */}
        <div className="space-y-8">
           {/* Wishlist Highlight */}
           <div className="p-8 rounded-[3rem] bg-gradient-to-br from-white to-slate-50 border border-white/60 relative overflow-hidden group shadow-xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                   <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 shadow-sm">
                      <Heart className="w-5 h-5 fill-rose-500" />
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Favorites</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2 uppercase">Your Wishlist</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 italic">12 items in your list are currently on sale. Don&apos;t miss out!</p>
                <Link href="/buyer/dashboard/wishlist" className="inline-flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                   Browse Wishlist <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
           </div>

           {/* Quick Support */}
           <div className="p-8 rounded-[3rem] bg-white/60 border border-white backdrop-blur-2xl shadow-xl text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-4 shadow-sm">
                <MessageSquare className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2 uppercase italic">Need Help?</h3>
              <p className="text-xs text-slate-500 px-4 leading-relaxed mb-6 font-medium">Our dedicated import experts are available 24/7 to assist with your procurement.</p>
              <button className="w-full py-4 rounded-full bg-yellow-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all">
                 Live Chat Session
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
