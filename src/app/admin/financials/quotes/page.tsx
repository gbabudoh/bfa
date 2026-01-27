"use client";

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronRight,
  User,
  Package,
  ArrowRightLeft,
  ShieldCheck
} from 'lucide-react';

interface QuoteItem {
  name: string;
  qty: number;
  target: string;
  suggested: string;
}

interface Quote {
  id: string;
  customer: string;
  products: string;
  status: string;
  date: string;
  value: string;
  items?: QuoteItem[];
}

export default function AdminQuotesPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const quotes: Quote[] = [
    { 
      id: 'RFQ-001', 
      customer: 'Cape Town Logistics', 
      products: 'Handwoven Baskets (500 units)', 
      status: 'REQUESTED', 
      date: '2 hours ago', 
      value: 'Pending',
      items: [
        { name: 'Zulu Heritage Basket (Medium)', qty: 300, target: '$12.00', suggested: '$15.00' },
        { name: 'Zulu Heritage Basket (Large)', qty: 200, target: '$18.00', suggested: '$22.00' }
      ]
    },
    { id: 'RFQ-002', customer: 'Lagos Import Group', products: 'Raw Cocoa Beans (10 Tons)', status: 'RESPONDED', date: '1 day ago', value: '$12,400' },
    { id: 'RFQ-003', customer: 'Casablanca Tech hub', products: 'Custom Leather Cases (200 units)', status: 'ACCEPTED', date: '3 days ago', value: '$3,200' },
    { id: 'RFQ-004', customer: 'Accra Retailers', products: 'Shea Butter - Bulk (50kg)', status: 'REJECTED', date: '5 days ago', value: '$850' },
  ];

  if (selectedQuote) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedQuote(null)}
            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-600 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
          >
            <ChevronRight size={20} className="rotate-180 cursor-pointer" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Oversight: B2B RFQs</h1>
            <p className="text-gray-500 font-medium italic text-sm">Monitoring B2B negotiations between vendors and buyers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Negotiation Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Requested Items & Target Pricing</h3>
              </div>
              <div className="p-6 space-y-6">
                {selectedQuote.items?.map((item: QuoteItem, idx: number) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-yellow-600">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Quantity: {item.qty} units</p>
                      </div>
                    </div>
                    <div className="flex space-x-8">
                       <div className="text-right">
                         <p className="text-[10px] font-bold text-gray-400 uppercase">Target</p>
                         <p className="font-bold text-gray-900">{item.target}</p>
                       </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-yellow-600 uppercase">Vendor Response</p>
                          <p className="font-bold text-gray-900">{item.suggested}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-400">Projected Quote Value</p>
                  <p className="text-2xl font-black text-gray-900">$8,900.00 <span className="text-xs font-bold opacity-60">USD</span></p>
                </div>
                <div className="flex space-x-3">
                   <p className="text-xs font-bold text-gray-400 italic">Oversight Only - Action required by vendor</p>
                </div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
               <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                 <MessageSquare size={18} className="mr-2 text-blue-500" />
                 Negotiation Chat
               </h3>
               <div className="space-y-4 h-48 overflow-y-auto mb-6 pr-2 scrollbar-hide">
                  <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none mr-12 border border-gray-100">
                    <p className="text-sm text-gray-700">Hi, we are looking for a long-term supply of these baskets. Can we get a discount for the first 500 units?</p>
                    <p className="text-[9px] font-black text-gray-400 mt-2 uppercase tracking-widest">Customer • 09:24 AM</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-2xl rounded-tr-none ml-12 border border-yellow-100">
                    <p className="text-sm text-yellow-900">We appreciate the interest. I am reviewing the logistics costs for Cape Town and will get back to you with our best B2B price.</p>
                    <p className="text-[9px] font-black text-yellow-600 mt-2 uppercase tracking-widest">Vendor • 10:15 AM</p>
                  </div>
               </div>
               <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-4 justify-center">
                 <p className="text-xs font-bold text-gray-400 italic">This chat is read-only for monitoring purposes.</p>
               </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h4 className="font-bold text-gray-900 mb-4 tracking-tight">Customer Profile</h4>
              <div className="flex items-center space-x-3 mb-6">
                 <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-black">CT</div>
                 <div>
                   <p className="text-sm font-bold text-gray-900">Cape Town Logistics</p>
                   <p className="text-xs text-gray-500">Verified B2B Buyer</p>
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                   <span className="text-gray-400 font-bold uppercase tracking-widest">Trust Score</span>
                   <span className="text-green-600 font-bold">98%</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{width: '98%'}}></div>
                 </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-white shadow-xl">
               <h4 className="font-bold text-yellow-500 mb-4 flex items-center">
                 <ShieldCheck size={18} className="mr-2" />
                 Trade Document Guide
               </h4>
               <p className="text-xs text-gray-400 leading-relaxed mb-6">
                 Remember that B2B quotes for international trade should include incoterms and shipping estimates for best conversion.
               </p>
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
                 View Trade Rules
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Oversight: RFQs</h1>
        <p className="text-gray-500 mt-1 font-medium italic text-sm">Monitoring high-volume B2B requests and vendor-driven custom pricing negotiations.</p>
      </div>

      {/* Quote Pipeline Stats */}
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { label: 'New Requests', count: 12, color: 'bg-blue-500' },
          { label: 'Pending Response', count: 8, color: 'bg-yellow-500' },
          { label: 'Negotiations', count: 5, color: 'bg-purple-500' },
          { label: 'Accepted', count: 24, color: 'bg-green-500' },
        ].map((stat) => (
          <div key={stat.label} className="flex-shrink-0 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm min-w-[180px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl">
             {['ALL', 'REQUESTED', 'RESPONDED', 'ACCEPTED'].map((t) => (
               <button
                 key={t}
                 onClick={() => setActiveTab(t)}
                 className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                   activeTab === t ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                 }`}
               >
                 {t}
               </button>
             ))}
           </div>
           <div className="flex items-center space-x-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input type="text" placeholder="Search RFQs..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
             </div>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"><Filter size={20} /></button>
           </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-50">
          {quotes.map((q) => (
            <div key={q.id} className="p-6 hover:bg-gray-50 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100 shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-gray-900">{q.id}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      q.status === 'REQUESTED' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      q.status === 'ACCEPTED' ? 'bg-green-50 text-green-600 border border-green-100' :
                      q.status === 'RESPONDED' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                      'bg-gray-50 text-gray-400 border border-gray-100'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                    <User size={12} className="mr-1" /> {q.customer}
                    <span className="mx-2 text-gray-300">•</span>
                    <Package size={12} className="mr-1" /> {q.products}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto gap-8">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{q.value}</p>
                  <p className="text-[10px] text-gray-400 font-bold">{q.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedQuote(q)}
                  className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronRight size={20} className="cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center text-sm font-bold text-yellow-600 hover:text-yellow-700 cursor-pointer">
          View Negotiation History
        </div>
      </div>

      {/* RFQ Tools Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
         <div className="flex items-center space-x-4">
           <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
             <ArrowRightLeft size={24} />
           </div>
           <div>
             <h4 className="font-bold text-gray-900">Automated Negotiation Assistant</h4>
             <p className="text-xs text-gray-500 font-medium">AI-powered suggestions based on historical procurement data.</p>
           </div>
         </div>
         <button className="text-xs font-bold text-purple-600 hover:underline cursor-pointer">ENABLE TOOL</button>
      </div>
    </div>
  );
}
