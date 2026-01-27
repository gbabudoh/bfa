"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  Store,
  ExternalLink,
  Trash2,
  Edit2,
  MapPin,
  Star
} from 'lucide-react';

interface VendorTableRowProps {
  vendor: {
    id: string;
    storeName: string;
    owner: string;
    location: string;
    rating: number;
    isVerified: boolean;
    createdAt: string;
  };
}

const VendorTableRow = ({ vendor }: VendorTableRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-sm">
            <Store size={20} className="cursor-pointer" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-gray-900">{vendor.storeName}</div>
            <div className="text-xs text-gray-500">ID: {vendor.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">{vendor.owner}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-xs text-gray-600 font-medium">
          <MapPin size={14} className="mr-1 text-gray-400 cursor-pointer" />
          {vendor.location}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-xs font-bold text-yellow-600">
          <Star size={14} className="mr-1 fill-yellow-600 cursor-pointer" />
          {vendor.rating.toFixed(1)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {vendor.isVerified ? (
            <div className="flex items-center text-green-600 text-[10px] font-black tracking-widest bg-green-50 px-2 py-1 rounded-md border border-green-100 uppercase">
              <ShieldCheck size={12} className="mr-1" />
              Verified
            </div>
          ) : (
            <div className="flex items-center text-amber-600 text-[10px] font-black tracking-widest bg-amber-50 px-2 py-1 rounded-md border border-amber-100 uppercase">
              <ShieldAlert size={12} className="mr-1" />
              Pending
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
          <div className="absolute right-6 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors cursor-pointer">
              <ExternalLink size={14} className="mr-2 text-blue-500 cursor-pointer" /> View Store
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors cursor-pointer">
              <Edit2 size={14} className="mr-2 text-amber-500 cursor-pointer" /> Manage
            </button>
            <div className="h-px bg-gray-100 my-1"></div>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors cursor-pointer">
              <Trash2 size={14} className="mr-2 cursor-pointer" /> Deactivate
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const mockVendors = [
    { id: 'VND-201', storeName: 'Lagos Textiles Ltd.', owner: 'Ama Mensah', location: 'Lagos, Nigeria', rating: 4.8, isVerified: true, createdAt: '2025-01-20' },
    { id: 'VND-305', storeName: 'Nairobi Coffee Co.', owner: 'Samuel Ruto', location: 'Nairobi, Kenya', rating: 4.5, isVerified: true, createdAt: '2025-01-22' },
    { id: 'VND-412', storeName: 'Cape Town Leathers', owner: 'Robert Smith', location: 'Cape Town, SA', rating: 3.2, isVerified: false, createdAt: '2025-01-15' },
    { id: 'VND-109', storeName: 'Accra Arts & Design', owner: 'Kwame Nkrumah', location: 'Accra, Ghana', rating: 4.9, isVerified: true, createdAt: '2025-01-25' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Vendor Management</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Control and verify business accounts on the platform.</p>
        </div>
        <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all hover:bg-gray-50 shadow-sm active:scale-95 cursor-pointer">
                <span className="cursor-pointer">Verification Requests</span>
                <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full cursor-pointer">12</span>
            </button>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl w-full lg:w-auto overflow-x-auto">
          {['ALL', 'VERIFIED', 'PENDING', 'SUSPENDED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-black tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-yellow-600 shadow-sm border border-yellow-100' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 w-full lg:w-auto px-4">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" size={18} />
            <input 
              type="text" 
              placeholder="Search by store name or owner..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200 cursor-pointer">
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
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Entity</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Region</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Compliance</th>
                <th className="relative px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {mockVendors.map((vendor) => (
                <VendorTableRow key={vendor.id} vendor={vendor} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center px-8">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Displaying 4 active vendors</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-300 bg-white border border-gray-100 rounded-lg cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-4 py-2 text-xs font-bold text-yellow-600 bg-white border border-yellow-100 rounded-lg hover:bg-yellow-50 transition-colors uppercase tracking-wider cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
