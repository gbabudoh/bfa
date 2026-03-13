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
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  MessageCircle,
  Activity,
  LucideIcon
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

const QuoteStatCard = ({ label, value, subtext, icon: Icon, color, bg }: { label: string, value: string, subtext: string, icon: LucideIcon, color: string, bg: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 ${bg.replace('bg-', 'bg-')}/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
    <div className="flex justify-between items-center mb-6 relative z-10">
      <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner cursor-pointer`}>
        <Icon size={22} className="cursor-pointer" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
        <TrendingUp size={14} className={color} />
        <span className="text-gray-900">{subtext}</span>
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none relative z-10">{label}</p>
    <h3 className="text-3xl font-black mt-2 tracking-tight text-gray-900 relative z-10">{value}</h3>
    <div className="w-12 h-1 bg-gray-50 group-hover:w-full transition-all duration-1000 mt-4 rounded-full overflow-hidden relative z-10">
       <div className={`h-full ${bg.replace('bg-', 'bg-')} w-2/3`}></div>
    </div>
  </div>
);

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

  const filteredQuotes = activeTab === 'ALL' 
    ? quotes 
    : quotes.filter(q => q.status === activeTab);

  if (selectedQuote) {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700 pb-12">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setSelectedQuote(null)}
            className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl text-gray-400 hover:text-indigo-600 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-110 transition-all cursor-pointer group"
          >
            <ChevronRight size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform cursor-pointer" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg uppercase tracking-widest">{selectedQuote.id}</span>
              <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                selectedQuote.status === 'REQUESTED' ? 'bg-blue-50 text-blue-600' :
                selectedQuote.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' :
                'bg-amber-50 text-amber-600'
              }`}>{selectedQuote.status}</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Negotiation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Forensics</span></h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Negotiation Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="p-10 border-b border-gray-50 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                  Asset Matrix & Target Parameters
                </h3>
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 cursor-pointer">
                  <Package size={20} />
                </div>
              </div>
              <div className="p-10 space-y-6">
                {selectedQuote.items?.map((item: QuoteItem, idx: number) => (
                  <div key={idx} className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 gap-6 group-hover:border-amber-200 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                          <Package size={28} />
                        </div>
                        <div>
                          <p className="text-lg font-black text-gray-900 group-hover:text-amber-600 transition-colors">{item.name}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1 italic">Vetted Supply Line • {item.qty} UNITS</p>
                        </div>
                      </div>
                      <div className="flex space-x-12">
                         <div className="text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Target Point</p>
                           <p className="text-xl font-black text-gray-900 tracking-tight">{item.target}</p>
                         </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1.5">Vendor Node</p>
                            <p className="text-xl font-black text-gray-900 tracking-tight">{item.suggested}</p>
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 bg-gray-900 flex justify-between items-center text-white relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent)] pointer-events-none"></div>
                <div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Aggregate Negotiation Value</p>
                  <p className="text-4xl font-black tracking-tighter">$8,900.00 <span className="text-xs font-black text-gray-500 ml-1">USD</span></p>
                </div>
                <div className="hidden md:flex flex-col items-end">
                   <div className="flex items-center gap-2 mb-2">
                     <Clock size={14} className="text-amber-500 animate-pulse" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response Window: <span className="text-white">ACTIVE</span></p>
                   </div>
                   <p className="text-[9px] font-black text-gray-500 italic uppercase">Oversight Only - Action required by vendor node</p>
                </div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
               <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                   Negotiation Frequency
                 </h3>
                 <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    <Activity size={12} className="animate-pulse" />
                    LIVE SIGNAL
                 </div>
               </div>
               
               <div className="flex-1 p-10 space-y-8 overflow-y-auto scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                  <div className="flex items-start gap-4 mr-16">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center font-black text-xs text-gray-500">CL</div>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-6 rounded-[2rem] rounded-tl-none border border-gray-100 shadow-sm relative group cursor-pointer hover:border-gray-200 transition-all">
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">Hi, we are looking for a long-term supply of these baskets. Can we get a discount for the first 500 units?</p>
                        <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Clock size={12} className="text-gray-300" />
                        </div>
                      </div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2 font-black italic">Customer Node • 09:24 AM</p>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse items-start gap-4 ml-16">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center font-black text-xs text-amber-700">VN</div>
                    <div className="space-y-2 flex flex-col items-end">
                      <div className="bg-amber-900 p-6 rounded-[2rem] rounded-tr-none text-amber-50 shadow-xl shadow-amber-900/10 relative group cursor-pointer hover:scale-[1.02] transition-all">
                        <p className="text-sm leading-relaxed font-medium">We appreciate the interest. I am reviewing the logistics costs for Cape Town and will get back to you with our best B2B price.</p>
                      </div>
                      <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest pr-2 font-black italic">Vendor Node • 10:15 AM</p>
                    </div>
                  </div>
               </div>

               <div className="p-8 bg-gray-50 border-t border-gray-100 backdrop-blur-sm">
                  <div className="flex items-center bg-white rounded-2xl border border-gray-200 px-6 py-4 justify-between group cursor-not-allowed">
                    <div className="flex items-center gap-4 text-gray-400">
                      <MessageCircle size={18} />
                      <p className="text-xs font-black uppercase tracking-widest italic">Monitoring Terminal: Read-Only Oversight Access</p>
                    </div>
                    <ShieldCheck size={18} className="text-emerald-500" />
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Counterparty IQ</h4>
              <div className="flex items-center space-x-5 mb-10">
                 <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-black text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">CT</div>
                 <div>
                   <p className="text-lg font-black text-gray-900">{selectedQuote.customer}</p>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1 flex items-center gap-2">
                     <ShieldCheck size={12} />
                     Verified B2B Entity
                   </p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Network Reliability Score</span>
                   <span className="text-2xl font-black text-emerald-600 tracking-tighter">98.4%</span>
                 </div>
                 <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 shadow-sm" style={{width: '98%'}}></div>
                 </div>
                 <div className="flex items-center gap-2 pt-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Performance is above network average</p>
                 </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group cursor-pointer border border-gray-800">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.2),transparent)] opacity-50"></div>
               <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10">
                 <ShieldCheck size={16} />
                 Trade Protocol Guide
               </h4>
               <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8 relative z-10 italic">
                 Ensure all cross-border B2B quotes incorporate standardized Incoterms and multi-point shipping estimates to maintain audit-compliance.
               </p>
               <button className="w-full py-5 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 hover:border-transparent active:scale-95 cursor-pointer relative z-10">
                 View Trade Schema
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-16">
      {/* Negotiation Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] -mr-80 -mt-80"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 border border-amber-200/50">
            <MessageSquare size={14} className="animate-pulse" />
            Active Negotiation Pulse
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
            Negotiation <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 tracking-tighter italic">Oversight</span>
          </h1>
          <p className="mt-8 text-gray-500 text-base font-medium leading-relaxed italic max-w-xl">
            Monitoring high-velocity B2B communication threads and auditing vendor-buyer custom pricing bridges across the ecosystem.
          </p>
        </div>
        
        <div className="relative z-10 flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-slate-900/20 active:scale-95 cursor-pointer group">
            <TrendingUp size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Yield Analysis</span>
          </button>
        </div>
      </div>

      {/* Negotiation Pulse Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuoteStatCard 
          label="New Requests" 
          value="12" 
          subtext="+4 today" 
          icon={Clock} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <QuoteStatCard 
          label="Pending Node" 
          value="08" 
          subtext="-2h avg" 
          icon={ArrowRightLeft} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <QuoteStatCard 
          label="Negotiations" 
          value="05" 
          subtext="High Frequency" 
          icon={MessageSquare} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <QuoteStatCard 
          label="Finalized" 
          value="24" 
          subtext="84% Rate" 
          icon={CheckCircle2} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Navigation Bar */}
        <div className="p-8 lg:p-10 border-b border-gray-50 flex flex-col xl:flex-row justify-between items-center gap-8 bg-white/80 backdrop-blur-2xl sticky top-0 z-20">
          <div className="flex space-x-2 p-2 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner w-full xl:w-auto">
            {['ALL', 'REQUESTED', 'RESPONDED', 'ACCEPTED'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 xl:flex-none px-8 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all cursor-pointer ${
                  activeTab === t 
                    ? 'bg-white text-amber-600 shadow-xl shadow-amber-500/10 border border-amber-100' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" size={20} />
              <input 
                type="text" 
                placeholder="Search Negotiation Pulse..." 
                className="w-full pl-14 pr-8 py-4.5 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-bold outline-none focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition-all shadow-inner" 
              />
            </div>
            <button className="p-4.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all cursor-pointer border border-gray-100 shadow-sm active:scale-95">
              <Filter size={22} />
            </button>
          </div>
        </div>

        {/* Observation Ledger */}
        <div className="divide-y divide-gray-50">
          {filteredQuotes.map((q) => (
            <div key={q.id} className="p-10 hover:bg-gray-50/50 transition-all group flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 cursor-pointer border-l-4 border-transparent hover:border-amber-500">
              <div className="flex items-start space-x-8 flex-1">
                <div className={`h-20 w-20 rounded-[2.5rem] ${
                  q.status === 'REQUESTED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  q.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  q.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                } flex items-center justify-center border shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <MessageSquare size={32} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{q.id}</h3>
                    <div className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] border transition-all ${
                       q.status === 'REQUESTED' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                       q.status === 'ACCEPTED' ? 'bg-emerald-600 text-white border-transparent shadow-lg shadow-emerald-500/20' :
                       q.status === 'RESPONDED' ? 'bg-amber-500 text-white border-transparent shadow-lg shadow-amber-500/20' :
                       'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {q.status}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center text-xs font-black text-gray-400 gap-4 uppercase tracking-widest italic">
                    <div className="flex items-center">
                      <User size={14} className="mr-2 text-indigo-500" /> 
                      <span className="text-gray-900">{q.customer}</span>
                    </div>
                    <span className="hidden md:inline text-gray-200">/</span>
                    <div className="flex items-center">
                      <Package size={14} className="mr-2 text-amber-600" /> 
                      <span className="max-w-[300px] truncate">{q.products}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full xl:w-auto gap-12 border-t xl:border-t-0 pt-6 xl:pt-0">
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-900 tracking-tighter">{q.value}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <Clock size={12} className="text-gray-300" />
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">{q.date}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedQuote(q)}
                  className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl text-gray-300 hover:text-amber-600 border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-110 transition-all cursor-pointer group/btn"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Ledger Footer */}
        <button className="w-full p-8 bg-gray-50/50 hover:bg-amber-50 border-t border-gray-50 flex justify-center items-center gap-3 text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] transition-all cursor-pointer group">
          <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
          Access Negotiation Archive
        </button>
      </div>

      {/* Oversight Intelligence Banner */}
      <div className="bg-gray-900 overflow-hidden rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl relative border border-gray-800">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
         <div className="flex items-center space-x-8 relative z-10 text-center md:text-left">
           <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2.5rem] text-indigo-400 shadow-2xl border border-white/5 animate-pulse">
             <ArrowRightLeft size={36} />
           </div>
           <div>
             <h4 className="text-xl font-black text-white tracking-tight uppercase mb-2">Automated Procurement <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Assistant</span></h4>
             <p className="text-sm text-gray-500 font-medium italic">Generating AI-powered pricing bridge suggestions based on ecosystem yield data.</p>
           </div>
         </div>
         <button className="relative z-10 bg-white text-gray-900 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer">
           Synchronize Logic
         </button>
      </div>
    </div>
  );
}
