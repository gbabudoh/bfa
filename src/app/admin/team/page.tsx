"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, 
  ShieldCheck, 
  UserPlus,
  Mail,
  Lock,
  Trash2,
  Users,
  CheckSquare,
  Square,
  Plus,
  Loader2,
  Check,
  AlertCircle,
  RefreshCcw,
  Crown,
  Settings
} from 'lucide-react';

const PERMISSIONS = [
  { id: 'USERS', label: 'User Management', desc: 'Can manage buyers and vendor verification.' },
  { id: 'VENDORS', label: 'Vendor Settings', desc: 'Can manage vendor profiles and business data.' },
  { id: 'PRODUCTS', label: 'Catalog Control', desc: 'Can review, approve, or delete shop products.' },
  { id: 'FINANCE', label: 'Financial Tools', desc: 'Can manage invoices, quotes, and currencies.' },
  { id: 'CMS', label: 'CMS & Content', desc: 'Can edit homepage banners and featured content.' },
  { id: 'ADMIN_ACCESS', label: 'Admin Access', desc: 'Full access to the admin dashboard.' },
];

interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  permissions: string[];
}

export default function AdminTeamPage() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === 'SUPER_ADMIN';

  const [members, setMembers] = useState<AdminMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Failed to fetch team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePermission = (id: string) => {
    setSelectedPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleCreateAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      setSubmitStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAdmin,
          permissions: selectedPermissions,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create admin');
      }

      setSubmitStatus('success');
      setNewAdmin({ name: '', email: '', password: '' });
      setSelectedPermissions([]);
      fetchMembers();

      setTimeout(() => {
        setShowCreateForm(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmitStatus('error');
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data fallback
  const displayMembers = members.length > 0 ? members : [
    { id: 'ADM-001', name: 'Super Admin', email: 'superadmin1@buyfromafrica.com', role: 'SUPER_ADMIN', createdAt: '2024-12-01', permissions: ['CMS', 'FINANCE', 'USERS', 'ADMIN_ACCESS'] },
    { id: 'ADM-002', name: 'Content Manager', email: 'content@buyfromafrica.com', role: 'ADMIN', createdAt: '2025-01-10', permissions: ['CMS', 'PRODUCTS'] },
  ];

  const filteredMembers = displayMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Intelligence Command Header */}
      <div className="relative bg-gray-900 rounded-[3rem] p-10 xl:p-16 overflow-hidden shadow-3xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-yellow-600/10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-1000"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] group-hover:bg-yellow-500/10 transition-all duration-1000"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center text-white border border-white/10 shadow-2xl">
                 <ShieldCheck size={32} />
               </div>
               <div>
                  <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tighter uppercase italic">
                    Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">REGISTRY</span>
                  </h1>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.4em] mt-1 pl-1">Command & Personnel Matrix</p>
               </div>
            </div>
            <p className="text-lg text-white/60 font-medium italic max-w-2xl leading-relaxed pl-1">
              Calibrating administrative access protocols and auditing the global staff hierarchy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={fetchMembers}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all border border-white/10 active:scale-95 group/btn cursor-pointer"
            >
              <RefreshCcw size={16} className={`group-hover/btn:rotate-180 transition-transform duration-700 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Syncing...' : 'Sync Registry'}</span>
            </button>
            {isSuperAdmin && (
              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] active:scale-95 group/btn cursor-pointer"
              >
                <UserPlus size={20} className="group-hover/btn:scale-110 transition-transform" />
                <span>{showCreateForm ? 'Abort Entry' : 'Provision Admin'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Glassmorphic Stats Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Personnel', val: displayMembers.length, icon: Users, color: 'zinc', trend: 'Global Matrix' },
          { label: 'Super Admins', val: displayMembers.filter(m => m.role === 'SUPER_ADMIN').length, icon: Crown, color: 'purple', trend: 'High Command' },
          { label: 'Field Admins', val: displayMembers.filter(m => m.role === 'ADMIN').length, icon: Settings, color: 'yellow', trend: 'Audit Nodes' }
        ].map((stat, idx) => (
          <div key={idx} className="group relative bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-${stat.color}-500/10 transition-all duration-700`}></div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-4">
                <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 group-hover:bg-${stat.color}-500 transition-all duration-500 group-hover:text-white`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">{stat.val}</p>
                </div>
              </div>
              <div className={`px-3 py-1 bg-${stat.color}-50 rounded-lg border border-${stat.color}-100 text-${stat.color}-600 text-[8px] font-black uppercase tracking-widest italic`}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Access Provisioning Matrix (Add Admin Form) */}
      {showCreateForm && isSuperAdmin && (
        <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border border-white shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-yellow-500"></div>
          
          <div className="p-10 xl:p-16 space-y-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-4 uppercase tracking-tighter">
                  <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-900/20">
                    <UserPlus size={24} />
                  </div>
                  Provision New Authority Node
                </h2>
                <p className="text-gray-500 text-sm font-medium italic pl-16">Initializing administrative credentials and access protocols.</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pending Protocol</span>
              </div>
            </div>

            {submitStatus === 'error' && (
              <div className="p-6 bg-red-50/50 backdrop-blur-xl border border-red-100 rounded-[2rem] flex items-center gap-4 text-red-600 animate-in slide-in-from-top-2">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle size={20} />
                </div>
                <p className="text-sm font-black uppercase tracking-tight">{errorMessage}</p>
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="p-6 bg-emerald-50/50 backdrop-blur-xl border border-emerald-100 rounded-[2rem] flex items-center gap-4 text-emerald-600 animate-in slide-in-from-top-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Check size={20} />
                </div>
                <p className="text-sm font-black uppercase tracking-tight">Personnel entity successfully established in the matrix.</p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Personnel Full Name</label>
                  <div className="relative group">
                    <Users size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    <input 
                      type="text" 
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      placeholder="e.g. Ama Mensah"
                      className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-500/50 transition-all outline-none italic"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Authorized Email Identity</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    <input 
                      type="email" 
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      placeholder="staff@buyfromafrica.com"
                      className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-500/50 transition-all outline-none italic"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Initialize Access Password</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    <input 
                      type="password" 
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-16 pr-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-900 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-500/50 transition-all outline-none italic"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1 text-center block">Sub-System Access Matrix</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERMISSIONS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePermission(p.id)}
                      className={`flex flex-col p-6 rounded-[2rem] border transition-all text-left cursor-pointer group/perm ${
                        selectedPermissions.includes(p.id) 
                          ? 'bg-purple-600 border-purple-500 text-white shadow-2xl shadow-purple-200 translate-y-[-4px]' 
                          : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-white hover:border-purple-200'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPermissions.includes(p.id) ? 'bg-white/20' : 'bg-white border border-gray-100'}`}>
                          {selectedPermissions.includes(p.id) ? <CheckSquare size={18} className="text-white" /> : <Square size={18} className="text-gray-300" />}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${selectedPermissions.includes(p.id) ? 'bg-white animate-pulse' : 'bg-gray-200'}`}></div>
                      </div>
                      <p className={`text-[11px] font-black uppercase tracking-widest ${selectedPermissions.includes(p.id) ? 'text-white' : 'text-gray-900'}`}>{p.label}</p>
                      <p className={`text-[9px] mt-1 font-medium leading-relaxed ${selectedPermissions.includes(p.id) ? 'text-white/70' : 'text-gray-400'}`}>{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handleCreateAdmin}
                disabled={isSubmitting}
                className="flex items-center gap-4 bg-gray-900 hover:bg-slate-800 text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-slate-900/40 active:scale-95 disabled:opacity-50 group/save overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/save:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center gap-4">
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin text-purple-400" />
                  ) : (
                    <Plus size={20} className="text-purple-400 group-hover/save:text-white transition-colors" />
                  )}
                  <span>{isSubmitting ? 'Establishing Node...' : 'Establish Authority Entity'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistence Search & Filter Ledger */}
      <div className="bg-white/80 backdrop-blur-3xl p-4 rounded-[2.5rem] shadow-2xl border border-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative flex-1 w-full px-4 group">
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search personnel ledger by name or signature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:bg-white focus:border-purple-500/50 transition-all placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <Users size={14} className="text-purple-500" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Global Personnel Feed</span>
        </div>
      </div>

      {/* Personnel Intelligence Ledger */}
      <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-white shadow-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-50"></div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-10 py-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Personnel Node</th>
                <th className="px-10 py-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Identity Signature</th>
                <th className="px-10 py-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Authority Rank</th>
                <th className="px-10 py-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Access Matrix</th>
                <th className="relative px-10 py-8"></th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 size={40} className="text-gray-200 animate-spin" />
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Scanning Staff Matrix...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                      <Users size={40} className="text-gray-300" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">No personnel entities detected in the current query.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="group hover:bg-white transition-all duration-500 cursor-pointer">
                    <td className="px-10 py-10 whitespace-nowrap">
                      <div className="flex items-center gap-6">
                        <div className={`flex-shrink-0 h-16 w-16 rounded-[1.5rem] flex items-center justify-center font-black text-xl shadow-2xl border-2 border-white transition-transform group-hover:scale-110 duration-500 ${
                          member.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700 shadow-purple-500/20' : 'bg-yellow-100 text-yellow-700 shadow-yellow-500/20'
                        }`}>
                          {member.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-black text-gray-900 flex items-center gap-3 uppercase tracking-tighter">
                            {member.name}
                            {member.role === 'SUPER_ADMIN' && <Crown size={16} className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />}
                          </div>
                          <div className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md inline-block border border-gray-100">UID: {member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-10 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-xs font-bold text-gray-600 group-hover:text-purple-600 transition-colors">
                          <Mail size={14} className="mr-3 text-gray-300" />
                          {member.email}
                        </div>
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-6">Verified Staff Point</div>
                      </div>
                    </td>
                    <td className="px-10 py-10 whitespace-nowrap">
                      <div className={`px-4 py-2 inline-flex text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border ${
                        member.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100 shadow-sm shadow-purple-500/10' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                      }`}>
                        {member.role === 'SUPER_ADMIN' ? 'High Command' : 'Field Operator'}
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {member.permissions.slice(0, 3).map(p => (
                          <span key={p} className="px-3 py-1 text-[8px] font-black uppercase tracking-widest bg-gray-50 text-gray-500 rounded-lg border border-gray-100 group-hover:border-purple-200 group-hover:bg-purple-50 transition-colors">{p}</span>
                        ))}
                        {member.permissions.length > 3 && (
                          <span className="px-3 py-1 text-[8px] font-black uppercase tracking-widest bg-purple-50 text-purple-600 rounded-lg border border-purple-100">+{member.permissions.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-10 whitespace-nowrap text-right">
                      {isSuperAdmin && member.role !== 'SUPER_ADMIN' && (
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:shadow-xl transition-all cursor-pointer">
                            <Settings size={20} />
                          </button>
                          <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:shadow-xl transition-all cursor-pointer">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authority Shield Notification */}
      {!isSuperAdmin && (
        <div className="p-10 bg-yellow-400 group relative rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:shadow-yellow-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-gray-900 rounded-[2rem] flex items-center justify-center text-yellow-400 shadow-2xl">
              <ShieldCheck size={40} />
            </div>
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">View-Only Protocol Active</h3>
              <p className="text-gray-900/60 text-sm font-bold max-w-xl italic">
                Your credentials grant read-only access to the Registry. Personnel entry, decommissioning, and matrix adjustments require <span className="text-gray-900">Super Admin Override</span>.
              </p>
            </div>
            <div className="ml-auto flex items-center gap-4 bg-gray-900/5 px-6 py-3 rounded-2xl border border-gray-900/10">
               <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Active Audit Mode</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
