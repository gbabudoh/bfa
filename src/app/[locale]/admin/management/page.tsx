"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  CheckSquare, 
  Square,
  Users,
  Settings,
  Mail,
  Lock,
  Plus
} from 'lucide-react';

const PERMISSIONS = [
  { id: 'USERS', label: 'User Management', desc: 'Can manage buyers and vendor verification.' },
  { id: 'VENDORS', label: 'Vendor Settings', desc: 'Can manage vendor profiles and business data.' },
  { id: 'PRODUCTS', label: 'Catalog Control', desc: 'Can review, approve, or delete shop products.' },
  { id: 'FINANCE', label: 'Financial Tools', desc: 'Can manage invoices, quotes, and currencies.' },
  { id: 'CMS', label: 'CMS & Content', desc: 'Can edit homepage banners and featured content.' },
  { id: 'MANAGEMENT', label: 'System Admin', desc: 'Access to system-wide settings (Super Admin Only).' },
];

export default function SuperAdminManagementPage() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (id: string) => {
    setSelectedPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* System ARCHITECTURE Header */}
      <div className="relative bg-slate-900 rounded-[3rem] p-10 xl:p-16 overflow-hidden shadow-3xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-emerald-600/10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-emerald-500/10 transition-all duration-1000"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center text-white border border-white/10 shadow-2xl">
                 <Settings size={32} className="animate-spin-slow" />
               </div>
               <div>
                  <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                    System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">ARCHITECTURE</span>
                  </h1>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-2 pl-1">Global Governance & Provisioning Hub</p>
               </div>
            </div>
            <p className="text-lg text-white/60 font-medium italic max-w-2xl leading-relaxed pl-1">
              Commanding the core logic layers and authorizing elite personnel nodes for the global trade ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-6 py-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center gap-4 shadow-2xl">
              <div className="relative">
                <ShieldCheck size={24} className="text-emerald-400" />
                <div className="absolute inset-0 bg-emerald-400/20 blur-lg rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Access Level</span>
                <span className="text-xs font-black text-white uppercase italic tracking-tighter">Super Admin Override</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Authority Node Provisioner */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border border-white shadow-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-60"></div>
            
            <div className="p-10 xl:p-16 space-y-12">
              <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-900/20 group/icon">
                      <UserPlus size={24} className="group-hover/icon:scale-110 transition-transform" />
                    </div>
                    Provision Authority Entity
                  </h2>
                  <p className="text-gray-500 text-sm font-medium italic pl-16">Initializing administrative identity and sub-system permissions.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Personnel Full Name</label>
                    <div className="relative group">
                      <Users size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="text" 
                        placeholder="e.g. Ama Mensah"
                        className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all outline-none italic"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Authorized Email ID</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="email" 
                        placeholder="staff@buyfromafrica.com"
                        className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all outline-none italic"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Initialize Access PWD</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="password" 
                        placeholder="••••••••••••"
                        className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all outline-none italic"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1 text-center block">Access Protocol Matrix</label>
                  <div className="grid grid-cols-1 gap-4">
                    {PERMISSIONS.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePermission(p.id)}
                        className={`flex items-center gap-6 p-5 rounded-[2rem] border transition-all text-left cursor-pointer group/perm ${
                          selectedPermissions.includes(p.id) 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-200 translate-y-[-2px]' 
                            : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-white hover:border-indigo-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPermissions.includes(p.id) ? 'bg-white/20' : 'bg-white border border-gray-100'}`}>
                          {selectedPermissions.includes(p.id) ? <CheckSquare size={18} className="text-white" /> : <Square size={18} className="text-gray-300" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[11px] font-black uppercase tracking-widest ${selectedPermissions.includes(p.id) ? 'text-white' : 'text-gray-900'}`}>{p.label}</p>
                          <p className={`text-[9px] mt-1 font-medium leading-relaxed ${selectedPermissions.includes(p.id) ? 'text-white/70' : 'text-gray-400'}`}>{p.desc}</p>
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedPermissions.includes(p.id) ? 'bg-white animate-pulse' : 'bg-gray-200'}`}></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-gray-100 flex justify-end">
                <button 
                  className="flex items-center gap-4 bg-gray-900 hover:bg-slate-800 text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 group/save overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-600 opacity-0 group-hover/save:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <Plus size={20} className="text-indigo-400 group-hover/save:text-white transition-colors" />
                    <span>Establish Authority Node</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-12">
          {/* Elite Security Protocol Card */}
          <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-white/5 backdrop-blur-3xl rounded-[2rem] flex items-center justify-center text-yellow-400 border border-white/10 shadow-2xl">
                  <ShieldAlert size={32} className="animate-pulse" />
                </div>
                <div className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
                  <span className="text-[8px] font-black text-yellow-400 uppercase tracking-widest leading-none">High Command</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Security <span className="text-indigo-400">PROTOCOLS</span></h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Operational Guidelines</p>
              </div>

              <div className="space-y-6 text-sm text-white/60 font-medium italic leading-relaxed">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                  <p>Authority nodes are restricted from deep-system logs without explicit <span className="text-white font-bold italic">System Admin</span> authorization.</p>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                  <p>Every structural mutation is cryptographically logged and bound to the originating user ID for forensic audit trails.</p>
                </div>
              </div>

              <button className="w-full py-5 bg-white text-gray-900 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-400 hover:text-white hover:shadow-2xl hover:shadow-indigo-500/20 transition-all cursor-pointer">
                Access Audit Archives
              </button>
            </div>
          </div>

          {/* Operational Nodes Feed */}
          <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-3xl p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h4 className="text-lg font-black text-gray-900 flex items-center uppercase tracking-tighter">
                <Users size={20} className="mr-3 text-indigo-500" />
                Operational Nodes
              </h4>
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Live 02</span>
            </div>

            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="group flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-sm font-black text-indigo-600 transition-transform group-hover:rotate-6 duration-500">
                      JW
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-gray-900 uppercase">Field Worker {i}</p>
                      <p className="text-[8px] text-indigo-500 font-bold uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded shadow-sm border border-indigo-100 inline-block">CMS ACCESS</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                    <Settings size={16} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] italic">Scanning Active Personnel Nodes...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
