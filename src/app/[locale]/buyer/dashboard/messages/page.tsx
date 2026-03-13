"use client";

import React from "react";
import { 
  Search, 
  User, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  CheckCheck,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const conversations = [
  {
    id: 1,
    name: "Kofi Mensah",
    role: "Vendor • African Textiles",
    lastMsg: "Your custom kente order is ready for shipment.",
    time: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Amina Okoro",
    role: "Support Expert",
    lastMsg: "I've updated your shipment tracking details.",
    time: "1h ago",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Zainab Diallo",
    role: "Vendor • Mali Arts",
    lastMsg: "Thank you for the prompt payment!",
    time: "Yesterday",
    unread: 0,
    online: true
  }
];

export default function MessagesPage() {
  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-200px)] min-h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <Link href="/buyer/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors uppercase tracking-widest mb-4">
          <ArrowLeft className="w-3 h-3" /> Back to Overview
        </Link>
        <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Messages</h1>
      </div>

      {/* ── Chat Container ── */}
      <div className="flex-1 flex gap-8 min-h-0">
        {/* Sidebar: Conv List */}
        <div className="w-96 flex flex-col p-6 rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {conversations.map((conv) => (
              <div key={conv.id} className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 flex items-center gap-4 border ${conv.id === 1 ? 'bg-yellow-500 border-yellow-600 shadow-lg shadow-yellow-500/20' : 'bg-transparent border-transparent hover:bg-slate-50/80 hover:border-slate-100'}`}>
                <div className="relative h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <User className={`w-6 h-6 ${conv.id === 1 ? 'text-yellow-600' : 'text-slate-300'}`} />
                  {conv.online && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`text-sm font-black uppercase tracking-tight truncate ${conv.id === 1 ? 'text-white' : 'text-slate-900'}`}>{conv.name}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${conv.id === 1 ? 'text-white/60' : 'text-slate-400'}`}>{conv.time}</span>
                  </div>
                  <p className={`text-[10px] truncate font-medium ${conv.id === 1 ? 'text-white/80' : 'text-slate-500'}`}>{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && conv.id !== 1 && (
                  <div className="h-5 w-5 rounded-lg bg-yellow-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area: Placeholder Window */}
        <div className="flex-1 flex flex-col rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl overflow-hidden">
           {/* Chat Header */}
           <div className="p-6 border-b border-white flex justify-between items-center bg-white/40">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-200 p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                       <User className="w-6 h-6 text-yellow-600" />
                    </div>
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Kofi Mensah</h2>
                    <div className="flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Online • African Textiles</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"><Phone className="w-4 h-4" /></button>
                 <button className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"><Video className="w-4 h-4" /></button>
                 <button className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"><MoreVertical className="w-4 h-4" /></button>
              </div>
           </div>

           {/* Msg area */}
           <div className="flex-1 p-8 overflow-y-auto space-y-6 flex flex-col bg-slate-50/10">
              <div className="self-center py-1 px-4 rounded-full bg-white/60 border border-white/40 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Today, March 12</div>
              
              <div className="max-w-[70%] self-start space-y-2">
                <div className="px-5 py-4 rounded-3xl rounded-tl-lg bg-white border border-slate-100 shadow-sm text-sm text-slate-700 leading-relaxed">
                  Hi Kofi, checking on the status of my order #ORD-765432.
                </div>
                <div className="flex items-center gap-2 pl-1">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">10:15 AM</span>
                </div>
              </div>

              <div className="max-w-[70%] self-end space-y-2">
                 <div className="px-5 py-4 rounded-3xl rounded-tr-lg bg-yellow-500 shadow-lg shadow-yellow-500/10 text-sm text-white font-medium leading-relaxed">
                    Hello! Yes, the custom weave is looking beautiful. We are finishing the final touches today.
                 </div>
                 <div className="flex items-center justify-end gap-2 pr-1">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">10:20 AM</span>
                    <CheckCheck className="w-3 h-3 text-emerald-500" />
                 </div>
              </div>
           </div>

           {/* Input footer */}
           <div className="p-6 bg-white/40 border-t border-white">
              <div className="flex items-center gap-4">
                 <button className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-900 transition-all"><Info className="w-5 h-5" /></button>
                 <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="w-full bg-white border border-slate-200 rounded-3xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/5 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-yellow-500 text-white shadow-lg shadow-yellow-500/20 hover:scale-110 active:scale-95 transition-all">
                       <Send className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
