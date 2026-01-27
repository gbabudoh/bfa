"use client";

import React from 'react';
import { 
  Users, 
  Store, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, change, isPositive, icon, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 shadow-inner ${color.replace('bg-', 'text-')}`}>
        {icon}
      </div>
      <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {change}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here&apos;s a high-level view of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Vendors" 
          value="1,248" 
          change="+12%" 
          isPositive={true} 
          icon={<Store size={22} />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Active Buyers" 
          value="45,892" 
          change="+18.5%" 
          isPositive={true} 
          icon={<Users size={22} />} 
          color="bg-yellow-500"
        />
        <StatCard 
          title="Total Revenue (USD)" 
          value="$1.2M" 
          change="+24%" 
          isPositive={true} 
          icon={<DollarSign size={22} />} 
          color="bg-green-500"
        />
        <StatCard 
          title="Pending Verifications" 
          value="24" 
          change="-5%" 
          isPositive={false} 
          icon={<Briefcase size={22} />} 
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Recent Platform Activity</h2>
            <button className="text-sm text-yellow-600 font-medium hover:text-yellow-700 transition-colors cursor-pointer">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4 cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold cursor-pointer">
                    U
                  </div>
                  <div className="cursor-pointer">
                    <p className="text-sm font-semibold text-gray-900 cursor-pointer">New Vendor: Lagos Textiles Ltd.</p>
                    <p className="text-xs text-gray-500 cursor-pointer">24 minutes ago • Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full cursor-pointer">
                  PENDING
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Reach */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Regional Reach</h2>
            <Globe className="text-gray-400" size={20} />
          </div>
          <div className="space-y-6">
            {[
              { region: 'West Africa', count: '450 Vendors', percentage: 75, color: 'bg-yellow-500' },
              { region: 'East Africa', count: '320 Vendors', percentage: 60, color: 'bg-blue-500' },
              { region: 'South Africa', count: '280 Vendors', percentage: 45, color: 'bg-green-500' },
              { region: 'North Africa', count: '120 Vendors', percentage: 25, color: 'bg-purple-500' },
            ].map((reg) => (
              <div key={reg.region} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{reg.region}</span>
                  <span className="text-gray-500">{reg.count}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full ${reg.color} rounded-full shadow-sm`}
                    style={{ width: `${reg.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm cursor-pointer">
            View Analytics Report
          </button>
        </div>
      </div>
    </div>
  );
}
