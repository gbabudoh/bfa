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
  Edit2
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
    <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold border-2 border-white shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500">{user.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-600">
          <Mail size={14} className="mr-2 text-gray-400 cursor-pointer" />
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
          user.role === 'VENDOR' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
          user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
          'bg-gray-50 text-gray-700 border border-gray-100'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {user.isVerified ? (
            <div className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md">
              <ShieldCheck size={14} className="mr-1" />
              VERIFIED
            </div>
          ) : (
            <div className="flex items-center text-gray-400 text-xs font-bold bg-gray-50 px-2 py-1 rounded-md">
              <ShieldAlert size={14} className="mr-1" />
              UNVERIFIED
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
        >
          <MoreVertical size={20} className="cursor-pointer" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-6 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Edit2 size={14} className="mr-2 cursor-pointer" /> <span className="cursor-pointer">Edit</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
              <Trash2 size={14} className="mr-2 cursor-pointer" /> <span className="cursor-pointer">Delete</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const mockUsers = [
    { id: 'USR-001', name: 'John Doe', email: 'john@example.com', role: 'VENDOR', createdAt: '2025-01-20', isVerified: true },
    { id: 'USR-002', name: 'Alice Smith', email: 'alice@textiles.co', role: 'VENDOR', createdAt: '2025-01-22', isVerified: false },
    { id: 'USR-003', name: 'Robert Okoro', email: 'admin@bfa.com', role: 'ADMIN', createdAt: '2024-12-15', isVerified: true },
    { id: 'USR-004', name: 'Sarah Wilson', email: 'sarah@buyer.net', role: 'BUYER', createdAt: '2025-01-25', isVerified: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage, verify, and monitor all platform members.</p>
        </div>
        <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer">
          <UserPlus size={20} className="cursor-pointer" />
          <span className="cursor-pointer">Add New User</span>
        </button>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl w-full md:w-auto">
          {['ALL', 'VENDORS', 'BUYERS', 'ADMINS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-yellow-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto px-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
            <input 
              type="text" 
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <Filter size={20} className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {mockUsers.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center px-8">
          <p className="text-sm text-gray-500 font-medium">Showing 4 of 45,892 users</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 text-sm font-bold text-yellow-600 bg-white border border-yellow-100 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
