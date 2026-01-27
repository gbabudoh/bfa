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
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 space-y-6">
    <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
      <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, description, children }: { label: string, description: string, children: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="space-y-1">
      <p className="text-sm font-bold text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 font-medium">{description}</p>
    </div>
    <div className="w-full md:w-64">
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Configure core system parameters and administrative preferences.</p>
        </div>
        <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 cursor-pointer">
          <Save size={18} className="cursor-pointer" />
          <span className="cursor-pointer">Save Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all duration-200 font-bold text-sm cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-100 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span className="cursor-pointer">{tab.icon}</span>
              <span className="cursor-pointer">{tab.label}</span>
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-gray-100">
            <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                <Database size={12} className="text-blue-500" />
                <span>System Status</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-600">Sync Pipeline</span>
                <span className="flex items-center text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Live</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-600">Security Core</span>
                <span className="flex items-center text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Active</span>
              </div>
              <button className="w-full flex items-center justify-center space-x-2 py-2 mt-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-wider hover:bg-gray-100 transition-colors cursor-pointer">
                <RefreshCw size={12} className="cursor-pointer" />
                <span className="cursor-pointer">Reset Cache</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'GENERAL' && (
            <>
              <SettingsSection title="General Platform configuration" icon={Monitor}>
                <SettingItem 
                  label="Platform Name" 
                  description="The primary name of your marketplace instance."
                >
                  <input 
                    type="text" 
                    defaultValue="Buy from Africa"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                  />
                </SettingItem>
                <SettingItem 
                  label="Administrator Email" 
                  description="Used for system-critical alerts and password recovery."
                >
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      defaultValue="admin@buyfromafrica.com"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </SettingItem>
                <SettingItem 
                  label="Maintenance Mode" 
                  description="Disable public access while performing system updates."
                >
                  <div className="flex items-center">
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                        <div className="absolute left-1 top-1 w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full"></div>
                    </div>
                  </div>
                </SettingItem>
              </SettingsSection>
            </>
          )}

          {activeTab === 'SECURITY' && (
            <>
              <SettingsSection title="Security & Authentication" icon={Shield}>
                <SettingItem 
                  label="Super Admin Password" 
                  description="Update the master access key for this account."
                >
                  <button className="flex items-center justify-center space-x-2 w-full py-3 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all cursor-pointer">
                    <Lock size={16} className="cursor-pointer" />
                    <span className="cursor-pointer">Change Master Password</span>
                  </button>
                </SettingItem>
                <SettingItem 
                  label="Session Timeout" 
                  description="Automatically sign out inactive administrators."
                >
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none appearance-none cursor-pointer">
                    <option>15 Minutes</option>
                    <option selected>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>End of Browser Session</option>
                  </select>
                </SettingItem>
                <SettingItem 
                  label="IP Lockdown" 
                  description="Restricts admin login to specifically whitelisted IP addresses."
                >
                  <div className="flex items-center cursor-not-allowed opacity-50">
                    <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </SettingItem>
              </SettingsSection>
            </>
          )}

          {activeTab === 'REGIONAL' && (
            <>
              <SettingsSection title="Regional & Market Localization" icon={Globe}>
                <SettingItem 
                  label="Default Platform Currency" 
                  description="The primary currency displayed across the global catalog."
                >
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none appearance-none cursor-pointer">
                    <option selected>United States Dollar (USD)</option>
                    <option>Nigerian Naira (NGN)</option>
                    <option>Kenyan Shilling (KES)</option>
                    <option>South African Rand (ZAR)</option>
                    <option>Euro (EUR)</option>
                  </select>
                </SettingItem>
                <SettingItem 
                  label="Primary timezone" 
                  description="Used for all transaction logging and scheduling."
                >
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none appearance-none cursor-pointer">
                    <option selected>UTC (Coordinated Universal Time)</option>
                    <option>Lagos/London (UTC+1)</option>
                    <option>Nairobi (UTC+3)</option>
                    <option>Johannesburg (UTC+2)</option>
                  </select>
                </SettingItem>
              </SettingsSection>
            </>
          )}

          {activeTab === 'APPEARANCE' && (
            <>
              <SettingsSection title="Visual Brand Identity" icon={Palette}>
                <SettingItem 
                  label="Primary Admin Theme" 
                  description="Choose between light, dark, or system-adaptive interface."
                >
                   <div className="flex space-x-2">
                     <button className="flex-1 py-3 bg-white border-2 border-yellow-600 rounded-2xl text-xs font-bold text-gray-900 cursor-pointer">Light</button>
                     <button className="flex-1 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 cursor-pointer">Dark</button>
                     <button className="flex-1 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 cursor-pointer">System</button>
                   </div>
                </SettingItem>
                <SettingItem 
                  label="Accent Color Strategy" 
                  description="Defines the primary color used for buttons and active states."
                >
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#f2c01a] ring-2 ring-offset-2 ring-yellow-500 cursor-pointer shadow-sm"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 cursor-pointer shadow-sm"></div>
                    <div className="w-8 h-8 rounded-full bg-black cursor-pointer shadow-sm"></div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 cursor-pointer shadow-sm"></div>
                  </div>
                </SettingItem>
              </SettingsSection>
            </>
          )}

          <div className="flex justify-end pt-4">
            <button className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer">Restore Factory Defaults</button>
          </div>
        </div>
      </div>
    </div>
  );
}
