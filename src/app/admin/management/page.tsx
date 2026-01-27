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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Worker Management</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Create and control access for platform administrative staff.</p>
        </div>
        <div className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl border border-purple-100 flex items-center text-xs font-black tracking-widest uppercase">
          <ShieldCheck size={16} className="mr-2" />
          Super Admin Mode
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <UserPlus size={20} className="mr-2 text-yellow-600" />
              Register New Admin Worker
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <Users size={18} />
                    </span>
                    <input 
                      type="text" 
                      placeholder="e.g. Ama Mensah"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Work Email</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input 
                      type="email" 
                      placeholder="staff@buyfromafrica.com"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Default Password</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input 
                      type="password" 
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Access Permissions</p>
                 <div className="grid grid-cols-1 gap-2">
                   {PERMISSIONS.map(p => (
                     <button
                        key={p.id}
                        onClick={() => togglePermission(p.id)}
                        className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all text-left ${
                          selectedPermissions.includes(p.id) 
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-900 shadow-sm' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                        }`}
                     >
                       <div className={`${selectedPermissions.includes(p.id) ? 'text-yellow-600' : 'text-gray-300'}`}>
                         {selectedPermissions.includes(p.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                       </div>
                       <div>
                         <p className="text-sm font-bold">{p.label}</p>
                         <p className="text-[10px] opacity-60 font-medium">{p.desc}</p>
                       </div>
                     </button>
                   ))}
                 </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex justify-end">
               <button className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-95 flex items-center">
                 <Plus size={20} className="mr-2" />
                 Create Admin Account
               </button>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -mr-16 -mt-16 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center relative z-10">
              <ShieldAlert size={20} className="mr-2 text-yellow-400" />
              Security Protocol
            </h3>
            <div className="space-y-4 text-sm text-indigo-100 opacity-80 relative z-10 font-medium leading-relaxed">
              <p>Admin workers do not have access to full system logs or legal trade agreements unless explicitly assigned the &quot;System Admin&quot; permission.</p>
              <p>All administrative actions (edits, approvals, deletions) are logged with a timestamp and user ID for audit trails.</p>
            </div>
            <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
              View Audit Logs
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <Users size={18} className="mr-2 text-gray-400" />
              Current Staff
            </h4>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                      JW
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 underline underline-offset-2">Junior Worker {i}</p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">CMS, Products</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-all">
                    <Settings size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
