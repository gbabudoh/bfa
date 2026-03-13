"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Palette, 
  Save, 
  RefreshCw,
  Lock,
  Mail,
  Monitor,
  Database,
  LucideIcon
} from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }: { title: string, icon: LucideIcon, children: React.ReactNode }) => (
  <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-3xl overflow-hidden relative group/section transition-all duration-700 hover:shadow-indigo-500/10 active:scale-[0.995]">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-50 group-hover/section:opacity-100 group-hover/section:from-indigo-400 group-hover/section:to-emerald-400 transition-all duration-700"></div>
    <div className="p-10 xl:p-14 space-y-10">
      <div className="flex items-center gap-6 border-b border-gray-100 pb-8">
        <div className="w-14 h-14 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-400 group-hover/section:text-indigo-600 group-hover/section:bg-indigo-50 transition-all duration-500 shadow-sm border border-gray-100 group-hover/section:border-indigo-100">
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{title}</h2>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Operational Configuration Node</p>
        </div>
      </div>
      <div className="space-y-10">
        {children}
      </div>
    </div>
  </div>
);

const SettingItem = ({ label, description, children }: { label: string, description: string, children: React.ReactNode }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center group/item p-6 rounded-[2rem] hover:bg-gray-50/50 transition-all duration-500">
    <div className="space-y-2">
      <p className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover/item:text-indigo-600 transition-colors">{label}</p>
      <p className="text-xs text-gray-500 font-medium italic leading-relaxed max-w-sm">{description}</p>
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
);

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('GENERAL');

  const tabs = [
    { id: 'GENERAL', label: 'General', icon: <Settings size={18} /> },
    { id: 'SECURITY', label: 'Security', icon: <Shield size={18} /> },
    { id: 'NOTIFICATIONS', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'REGIONAL', label: 'Regional', icon: <Globe size={18} /> },
    { id: 'APPEARANCE', label: 'Appearance', icon: <Palette size={18} /> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Global CONFIGURATION Header */}
      <div className="relative bg-slate-900 rounded-[3rem] p-10 xl:p-16 overflow-hidden shadow-3xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-rose-600/10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center text-white border border-white/10 shadow-3xl">
                 <Database size={40} className="text-indigo-400" />
               </div>
               <div>
                  <h1 className="text-4xl xl:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">CONFIGURATION</span>
                  </h1>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-3 pl-1">Structural Parameter Management</p>
               </div>
            </div>
            <p className="text-xl text-white/60 font-medium italic max-w-2xl leading-relaxed pl-1">
              Calibrating the global infrastructure nodes and fine-tuning the architectural defaults of the marketplace ecosystem.
            </p>
          </div>

          <button className="flex items-center gap-4 bg-white hover:bg-indigo-400 text-gray-900 hover:text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 group/save overflow-hidden relative">
            <Save size={20} className="group-hover/save:scale-110 transition-transform" />
            <span>Apply Global Mutation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Settings Navigation Nodes */}
        <div className="lg:col-span-1 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-5 px-8 py-6 rounded-[2rem] transition-all duration-500 font-black text-[10px] uppercase tracking-widest cursor-pointer group/tab relative overflow-hidden ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-2xl border border-white' 
                  : 'text-gray-400 hover:bg-white/50 hover:text-gray-600'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
              )}
              <span className={`transition-transform duration-500 ${activeTab === tab.id ? 'scale-125' : 'group-hover/tab:scale-110'}`}>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute right-6 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              )}
            </button>
          ))}
          
          <div className="pt-10 mt-10 border-t border-gray-100">
            <div className="p-8 bg-gray-900 rounded-[2.5rem] space-y-6 shadow-3xl relative overflow-hidden group/status">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover/status:bg-emerald-500/20 transition-all duration-700"></div>
              
              <div className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                <Database size={16} className="text-indigo-400 shrink-0" />
                <span>Integrity Matrix</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group-hover/status:border-indigo-500/30 transition-all">
                  <span className="text-[10px] font-bold text-white/60 uppercase italic">Pipeline</span>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">LIVE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group-hover/status:border-indigo-500/30 transition-all">
                  <span className="text-[10px] font-bold text-white/60 uppercase italic">Security Core</span>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">STABLE</span>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/10 hover:bg-white text-white hover:text-gray-900 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer group/reset">
                <RefreshCw size={14} className="group-hover/reset:rotate-180 transition-transform duration-700" />
                <span>Pulse Core Sync</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Configuration Sections */}
        <div className="lg:col-span-3 space-y-12 pb-20">
          {activeTab === 'GENERAL' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <SettingsSection title="Platform Identity" icon={Monitor}>
                <SettingItem 
                  label="Global Instance Name" 
                  description="The primary identification signature of your global marketplace infrastructure."
                >
                  <input 
                    type="text" 
                    defaultValue="Buy from Africa"
                    className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all outline-none italic shadow-inner"
                  />
                </SettingItem>
                <SettingItem 
                  label="Command Authority Email" 
                  description="Target node for system-critical telemetry and cryptographic recovery protocols."
                >
                  <div className="relative group">
                    <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                      type="email" 
                      defaultValue="admin@buyfromafrica.com"
                      className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all outline-none italic shadow-inner"
                    />
                  </div>
                </SettingItem>
                <SettingItem 
                  label="Architectural Hibernation" 
                  description="Suspend public interface access while updating core structural nodes."
                >
                  <div className="flex items-center">
                    <button className="relative w-16 h-8 bg-gray-200 rounded-full transition-all duration-500 hover:bg-gray-300 group/toggle">
                      <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-500 shadow-lg border border-gray-100 group-hover/toggle:scale-110"></div>
                    </button>
                  </div>
                </SettingItem>
              </SettingsSection>
            </div>
          )}

          {activeTab === 'SECURITY' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <SettingsSection title="Structural Cryptography" icon={Shield}>
                <SettingItem 
                  label="Master Access Key" 
                  description="Re-calibrate the high-command encryption key for this administrative node."
                >
                  <button className="flex items-center justify-center gap-4 w-full py-6 bg-gray-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-3xl shadow-slate-900/40 active:scale-[0.98] group/key">
                    <Lock size={18} className="text-indigo-400 group-hover/key:text-white transition-colors" />
                    <span>Generate New Access Key</span>
                  </button>
                </SettingItem>
                <SettingItem 
                  label="Authorization Lifecycle" 
                  description="Operational duration for administrative session persistence."
                >
                  <div className="relative group">
                    <select defaultValue="30 Minute Window" className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all shadow-inner">
                      <option>15 Minute Window</option>
                      <option>30 Minute Window</option>
                      <option>01 Hour Lifecycle</option>
                      <option>Continuous Node Feed</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">
                       <RefreshCw size={16} />
                    </div>
                  </div>
                </SettingItem>
                <SettingItem 
                  label="IP Signature Lockdown" 
                  description="Restricts administrative uplink to specifically authorized structural IP nodes."
                >
                   <div className="flex items-center gap-4 px-6 py-3 bg-red-50 rounded-2xl border border-red-100 opacity-60">
                     <Lock size={14} className="text-red-400 shrink-0" />
                     <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Layer 2 Override Required</span>
                   </div>
                </SettingItem>
              </SettingsSection>
            </div>
          )}

          {activeTab === 'REGIONAL' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <SettingsSection title="Global Localization Node" icon={Globe}>
                <SettingItem 
                  label="Master Catalog Currency" 
                  description="The primary value-metric displayed across the global trade infrastructure."
                >
                  <select defaultValue="United States Dollar (USD)" className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all shadow-inner">
                    <option>United States Dollar (USD)</option>
                    <option>Nigerian Naira (NGN)</option>
                    <option>Kenyan Shilling (KES)</option>
                    <option>South African Rand (ZAR)</option>
                    <option>Euro (EUR)</option>
                  </select>
                </SettingItem>
                <SettingItem 
                  label="Temporal Coordinate Base" 
                  description="Operational time-base for all global transaction pulses and scheduling."
                >
                  <select defaultValue="UTC (Coordinated Universal Time)" className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/50 transition-all shadow-inner">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>West African Time (UTC+1)</option>
                    <option>East African Time (UTC+3)</option>
                    <option>South African Time (UTC+2)</option>
                  </select>
                </SettingItem>
              </SettingsSection>
            </div>
          )}

          {activeTab === 'APPEARANCE' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <SettingsSection title="Aesthetic Brand Matrix" icon={Palette}>
                <SettingItem 
                  label="Interface Mode Strategy" 
                  description="Calibrate the visual spectrum for the administrative command deck."
                >
                   <div className="flex gap-4 p-2 bg-gray-50 border border-gray-100 rounded-[2.5rem] shadow-inner">
                     <button className="flex-1 py-4 bg-white border border-gray-100 shadow-xl rounded-[2rem] text-[10px] font-black text-gray-900 uppercase tracking-widest cursor-pointer transition-all hover:scale-105 active:scale-95">Light Spectrum</button>
                     <button className="flex-1 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer transition-all hover:text-gray-600">Deep Space</button>
                     <button className="flex-1 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer transition-all hover:text-gray-600">Auto Sync</button>
                   </div>
                </SettingItem>
                <SettingItem 
                  label="Achromatic Accent Focus" 
                  description="Defines the primary chromatic highlight for interactive command nodes."
                >
                  <div className="flex gap-6 p-4 justify-center">
                    {[
                      { color: '#6366f1', label: 'Indigo' },
                      { color: '#f2c01a', label: 'Amber' },
                      { color: '#2563eb', label: 'Royal' },
                      { color: '#10b881', label: 'Emerald' },
                    ].map(c => (
                      <div key={c.label} className="group/color flex flex-col items-center gap-3 cursor-pointer">
                        <div 
                          className={`w-12 h-12 rounded-2xl transition-all duration-500 group-hover/color:rotate-12 group-hover/color:scale-110 shadow-2xl border-4 ${c.label === 'Indigo' ? 'border-indigo-200 ring-4 ring-indigo-500/20' : 'border-white'}`}
                          style={{ backgroundColor: c.color }}
                        ></div>
                        <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${c.label === 'Indigo' ? 'text-indigo-600' : 'text-gray-400'}`}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </SettingItem>
              </SettingsSection>
            </div>
          )}

          <div className="flex justify-center xl:justify-end pt-12 animate-in fade-in duration-1000">
            <button className="flex items-center gap-3 text-[10px] font-black text-gray-300 hover:text-red-500 transition-all duration-500 uppercase tracking-[0.4em] italic group/reset cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/reset:bg-red-50 group-hover/reset:rotate-180 transition-all duration-700">
                <RefreshCw size={14} />
              </div>
              Structural Factory Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
