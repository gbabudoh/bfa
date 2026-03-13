"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  UserPlus,
  Mail,
  Trash2,
  Edit2,
  Calendar,
  User,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface UserTableRowProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    isVerified: boolean;
  };
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50/80 transition-all group cursor-pointer border-b border-gray-50 last:border-0">
      <td className="px-8 py-5 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="relative group/avatar">
            <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-yellow-100 to-orange-50 rounded-2xl flex items-center justify-center text-yellow-700 font-black border border-yellow-200/50 shadow-inner group-hover/avatar:scale-110 transition-transform duration-300">
              {user.name.charAt(0)}
            </div>
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                <ShieldCheck size={10} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1.5">{user.name}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded tracking-tighter uppercase">{user.id}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-bold text-gray-700 mb-0.5">
            <Mail size={12} className="mr-2 text-gray-400" />
            {user.email}
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-5">Direct Contact</span>
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <span className={`px-3 py-1.5 inline-flex text-[10px] leading-none font-black rounded-xl tracking-[0.1em] uppercase ${
          user.role === 'VENDOR' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
          user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
          user.role === 'SUPER_ADMIN' ? 'bg-slate-900 text-white border border-slate-900' :
          'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-bold text-gray-700 mb-0.5">
            <Calendar size={12} className="mr-2 text-gray-400" />
            {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-5">Registration Date</span>
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center">
          {user.isVerified ? (
            <div className="flex items-center text-green-600 text-[10px] font-black tracking-widest bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
              <ShieldCheck size={14} className="mr-2 shadow-inner" />
              AUTHENTICATED
            </div>
          ) : (
            <div className="flex items-center text-gray-500 text-[10px] font-black tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              <ShieldAlert size={14} className="mr-2" />
              PENDING
            </div>
          )}
        </div>
      </td>
      <td className="px-8 py-5 whitespace-nowrap text-right relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="text-gray-400 hover:text-gray-900 p-2.5 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer group"
        >
          <MoreVertical size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute right-8 mt-2 w-48 bg-white border border-gray-100 rounded-[1.5rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 border-b border-gray-50 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Management</p>
              </div>
              <button className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors group/item">
                <Edit2 size={16} className="mr-3 text-gray-400 group-hover/item:text-yellow-600 transition-colors" /> 
                <span>Edit Profile</span>
              </button>
              <button className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors group/item">
                <ShieldCheck size={16} className="mr-3 text-gray-400 group-hover/item:text-green-600 transition-colors" /> 
                <span>Mark Verified</span>
              </button>
              <hr className="my-2 border-gray-50" />
              <button className="flex items-center w-full px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 cursor-pointer transition-colors group/item">
                <Trash2 size={16} className="mr-3 group-hover/item:-translate-y-0.5 transition-transform" /> 
                <span>Revoke Access</span>
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const mockUsers = [
    { id: 'USR-654321', name: 'John Doe', email: 'john@example.com', role: 'VENDOR', createdAt: '2025-01-20', isVerified: true },
    { id: 'USR-654322', name: 'Alice Smith', email: 'alice@textiles.co', role: 'VENDOR', createdAt: '2025-01-22', isVerified: false },
    { id: 'USR-654323', name: 'Robert Okoro', email: 'admin@bfa.com', role: 'ADMIN', createdAt: '2024-12-15', isVerified: true },
    { id: 'USR-654324', name: 'Sarah Wilson', email: 'sarah@buyer.net', role: 'BUYER', createdAt: '2025-01-25', isVerified: false },
  ];

  const stats = [
    { label: 'Platform Users', value: '45,892', change: '+12%', isPositive: true, icon: <User size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Vendors', value: '1,248', change: '+5%', isPositive: true, icon: <ArrowUpRight size={20} />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Pending Access', value: '24', change: '-2%', isPositive: false, icon: <ShieldAlert size={20} />, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-6 border border-yellow-10 Regular border-yellow-100/50">
            System Identity Registry
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            Member <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-[#D9A606] to-orange-600 uppercase">Management</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base font-medium leading-relaxed max-w-xl">
            Audit and manage the digital identities powering the Buy from Africa ecosystem. Ensure integrity through manual verification cycles.
          </p>
        </div>
        
        <div className="relative z-10 w-full lg:w-auto">
          <button className="w-full lg:w-auto flex items-center justify-center space-x-3 bg-gray-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer group">
            <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Onboard Member</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-center mb-6">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters & Actions Container */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-3 rounded-[2rem] shadow-sm flex flex-col xl:flex-row justify-between items-stretch gap-4 sticky top-24 z-30">
        <div className="flex p-1 bg-gray-100/50 backdrop-blur-md rounded-[1.5rem] overflow-x-auto no-scrollbar">
          {['ALL', 'VENDORS', 'BUYERS', 'ADMINS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-8 py-3.5 text-[10px] font-black tracking-[0.2em] rounded-2xl transition-all cursor-pointer uppercase ${
                activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-lg shadow-gray-200/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Query ecosystem by name, email or ID..."
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/60 rounded-2xl text-[13px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:bg-white focus:border-yellow-500/20 transition-all placeholder:text-gray-400 placeholder:font-medium placeholder:italic"
            />
          </div>
          <button className="p-4 text-gray-500 bg-white/50 border border-white/60 hover:bg-white rounded-2xl transition-all cursor-pointer shadow-sm group">
            <Filter size={20} className="group-hover:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Digital Identity</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Point of Contact</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Role</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lifecycle</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockUsers.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-10 py-8 bg-gray-50/30 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Total platform reach: <span className="text-gray-900 font-black">45,892</span> identities
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-gray-100 rounded-[1.25rem] shadow-sm">
            <button className="px-5 py-2.5 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Prev
            </button>
            <div className="w-8 h-8 flex items-center justify-center text-[10px] font-black bg-yellow-500 text-white rounded-lg shadow-lg shadow-yellow-500/20">1</div>
            <div className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">2</div>
            <div className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">3</div>
            <span className="px-2 text-gray-300">...</span>
            <div className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">124</div>
            <button className="px-5 py-2.5 text-[10px] font-black text-yellow-600 uppercase tracking-widest rounded-xl hover:bg-yellow-50 transition-all cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
