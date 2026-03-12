"use client";

import React from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "ORD-765432",
    date: "2024-03-11",
    total: 1250.00,
    status: "processing",
    items: [
      { name: "Handwoven Kente Fabric", qty: 2, price: 450.00 },
      { name: "Beaded Zulu Necklace", qty: 1, price: 350.00 }
    ]
  },
  {
    id: "ORD-987654",
    date: "2024-02-28",
    total: 850.50,
    status: "shipped",
    items: [
      { name: "Ethiopian Coffee Beans (5kg)", qty: 3, price: 283.50 }
    ]
  },
  {
    id: "ORD-112233",
    date: "2024-02-15",
    total: 2100.00,
    status: "delivered",
    items: [
      { name: "Bronze Ife Head Replica", qty: 1, price: 2100.00 }
    ]
  }
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

export default function OrdersPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/buyer/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors uppercase tracking-widest mb-4">
            <ArrowLeft className="w-3 h-3" /> Back to Overview
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Your Orders</h1>
          <p className="text-slate-500 text-sm mt-3 font-medium">Track, manage and view your purchase history</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="bg-white/60 border border-slate-200 rounded-full py-3 pl-11 pr-6 w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
          <button className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Orders List ── */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="group p-8 rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Order Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 shadow-sm group-hover:rotate-12 transition-transform duration-500">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Order #{order.id}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group-hover:bg-white transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                        <Package className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.qty} • ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="lg:w-64 flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                <div className="text-center lg:text-right mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tightest">${order.total.toFixed(2)}</p>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                    Track Shipment
                  </button>
                  <button className="w-full py-3 rounded-full bg-white text-slate-900 border border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                    Order Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Empty State Placeholder (commented out) ── */}
      {/* 
      <div className="p-20 rounded-[3rem] bg-white/40 border-2 border-dashed border-slate-200 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No orders found</h3>
        <p className="text-slate-500 text-sm mt-2 font-medium">Items you purchase will appear here</p>
        <Link href="/products" className="inline-block mt-8 px-8 py-4 rounded-full bg-yellow-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all">
          Start Shopping
        </Link>
      </div>
      */}
    </div>
  );
}
