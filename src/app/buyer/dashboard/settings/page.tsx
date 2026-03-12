"use client";

import React from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  ArrowLeft,
  ChevronRight,
  Camera,
  Save,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name || "Buyer",
    email: session?.user?.email || "buyer@example.com"
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ── */}
      <div>
        <Link href="/buyer/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors uppercase tracking-widest mb-4">
          <ArrowLeft className="w-3 h-3" /> Back to Overview
        </Link>
        <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Settings</h1>
        <p className="text-slate-500 text-sm mt-3 font-medium">Manage your account preferences and security</p>
      </div>

      {/* ── Settings Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Nav tabs (Sidebar feel) */}
        <div className="space-y-2">
           <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-yellow-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 transition-all">
             <div className="flex items-center gap-3">
               <User className="w-4 h-4" /> Profile Details
             </div>
             <ChevronRight className="w-4 h-4" />
           </button>
           <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-slate-100 text-slate-500 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-left">
             <div className="flex items-center gap-3">
               <Lock className="w-4 h-4" /> Security
             </div>
             <ChevronRight className="w-4 h-4" />
           </button>
           <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-slate-100 text-slate-500 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-left">
             <div className="flex items-center gap-3">
               <Bell className="w-4 h-4" /> Notifications
             </div>
             <ChevronRight className="w-4 h-4" />
           </button>
           <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-slate-100 text-slate-500 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-left">
             <div className="flex items-center gap-3">
               <CreditCard className="w-4 h-4" /> Billing
             </div>
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>

        {/* Form Area */}
        <div className="md:col-span-2 space-y-8">
           {/* Section: Profile */}
           <div className="p-8 rounded-[2.5rem] bg-white/60 border border-white backdrop-blur-xl shadow-xl">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                   <div className="relative group">
                      <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                         <User className="w-10 h-10 text-slate-300" />
                      </div>
                      <button className="absolute bottom-0 right-0 p-2.5 rounded-full bg-yellow-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all">
                         <Camera className="w-4 h-4" />
                      </button>
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Profile Photo</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/5 transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/5 transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bio / Sourcing Preferences</label>
                   <textarea 
                     rows={3} 
                     placeholder="Tell vendors what you're looking for..." 
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/5 transition-all resize-none"
                   ></textarea>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-3">
                 <button className="px-8 py-3 rounded-full bg-slate-100 text-slate-400 font-extrabold text-[10px] uppercase tracking-widest hover:bg-slate-200 hover:text-slate-600 transition-all">
                    Discard Changes
                 </button>
                 <button className="flex items-center gap-2 px-10 py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl active:scale-95 group">
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" /> Save Profile
                 </button>
              </div>
           </div>

           {/* Danger Zone */}
           <div className="p-8 rounded-[2.5rem] bg-rose-50/30 border border-rose-100 backdrop-blur-xl">
              <h2 className="text-lg font-black text-rose-500 uppercase tracking-tight mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Danger Zone
              </h2>
              <p className="text-xs font-medium text-slate-500 mb-6">Permanently delete your account and all associated data. This action is irreversible.</p>
              <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-rose-200 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-95 group">
                 <Trash2 className="w-4 h-4 group-hover:shake" /> Deactivate Account
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
