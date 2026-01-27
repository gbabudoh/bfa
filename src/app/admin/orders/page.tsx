"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  vendor: string;
  total: number;
  items: number;
  status: string;
}

const OrderTableRow = ({ order }: { order: Order }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors group border-b border-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-black text-gray-900">{order.id}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.date}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">{order.customer}</div>
                <div className="text-[10px] text-gray-400 font-medium">{order.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs font-bold text-gray-600">{order.vendor}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-black text-gray-900">${order.total}</div>
                <div className="text-[10px] text-gray-400 font-medium capitalize">{order.items} Items</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-[10px] font-black tracking-widest px-2 py-1 rounded-md border uppercase inline-flex ${
                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                    order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                    {order.status === 'DELIVERED' && <CheckCircle2 size={12} className="mr-1" />}
                    {order.status === 'PROCESSING' && <Truck size={12} className="mr-1" />}
                    {order.status === 'CANCELLED' && <XCircle size={12} className="mr-1" />}
                    {order.status === 'PENDING' && <Clock size={12} className="mr-1" />}
                    {order.status}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all cursor-pointer">
                    <Eye size={18} className="cursor-pointer" />
                </button>
            </td>
        </tr>
    );
};

export default function AdminOrdersPage() {
    const [activeTab, setActiveTab ] = useState('ALL');

    const mockOrders = [
        { id: 'ORD-5542', date: '2025-01-26', customer: 'David Olatunji', email: 'david@example.com', vendor: 'Lagos Textiles', total: 145.00, items: 3, status: 'PROCESSING' },
        { id: 'ORD-5541', date: '2025-01-25', customer: 'Sarah Mensah', email: 'sarah@test.net', vendor: 'Accra Arts', total: 85.50, items: 1, status: 'DELIVERED' },
        { id: 'ORD-5540', date: '2025-01-25', customer: 'Kofi Annan', email: 'kofi@mail.gh', vendor: 'Lagos Textiles', total: 210.00, items: 5, status: 'PENDING' },
        { id: 'ORD-5539', date: '2025-01-24', customer: 'Mary Njoku', email: 'mary@domain.ng', vendor: 'Cape Town Leathers', total: 1240.00, items: 2, status: 'CANCELLED' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Oversight</h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Track fulfillment and resolve transaction disputes.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all hover:bg-gray-50 shadow-sm active:scale-95 text-sm cursor-pointer">
                        <ShoppingBag size={18} className="text-yellow-600 cursor-pointer" />
                        <span className="cursor-pointer">Export All Orders</span>
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Today Orders', value: '142', sub: '+12% from yesterday', color: 'text-blue-600' },
                    { label: 'Pending Payouts', value: '$12,450', sub: '24 Requests', color: 'text-amber-600' },
                    { label: 'Fulfillment Rate', value: '98.5%', sub: 'Target: 99%', color: 'text-green-600' },
                    { label: 'Cancelled', value: '4', sub: 'Last 7 Days', color: 'text-red-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <p className={`text-xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 italic">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex space-x-1 p-1 bg-gray-50 rounded-xl w-full md:w-auto overflow-x-auto">
                    {['ALL', 'PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                                activeTab === tab 
                                    ? 'bg-white text-yellow-600 shadow-sm border border-yellow-100' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto px-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                            type="text" 
                            placeholder="Order ID / Customer..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                        <Filter size={20} className="cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Reference</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="relative px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {mockOrders.map((order) => (
                                <OrderTableRow key={order.id} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50/30 flex justify-center border-t border-gray-50">
                    <button className="text-[10px] font-black text-gray-400 hover:text-yellow-600 transition-colors uppercase tracking-[0.2em] cursor-pointer">View History (1,248 Records)</button>
                </div>
            </div>
        </div>
    );
}
