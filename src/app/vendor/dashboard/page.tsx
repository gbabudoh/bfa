"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Truck, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  Users,
  ArrowUpRight,
  ChevronRight,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function VendorDashboardPage() {
  // Reuse mock data from original dashboard
  const recentOrders = [
    {
      id: 'ORD-123456',
      date: '2025-03-22',
      customer: 'Global Imports Co.',
      amount: 1250.00,
      status: 'processing',
      items: 3,
      country: 'United States'
    },
    {
      id: 'ORD-123455',
      date: '2025-03-20',
      customer: 'European Textiles Ltd.',
      amount: 2340.50,
      status: 'shipped',
      items: 5,
      country: 'Germany'
    },
    {
      id: 'ORD-123454',
      date: '2025-03-18',
      customer: 'Fashion Retailers Inc.',
      amount: 890.25,
      status: 'delivered',
      items: 2,
      country: 'Canada'
    },
    {
      id: 'ORD-123453',
      date: '2025-03-15',
      customer: 'Boutique Stores Ltd.',
      amount: 1120.75,
      status: 'delivered',
      items: 4,
      country: 'United Kingdom'
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'New order received (ORD-123456)',
      time: '12 minutes ago'
    },
    {
      id: 2,
      type: 'stock',
      message: 'Low stock alert: Premium Ankara Fabric (2 units left)',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from Global Imports Co.',
      time: '5 hours ago'
    }
  ];

  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Command Center</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Here&apos;s an overview of your business performance.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/vendor/dashboard/products/new" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-yellow-100">
            Add New Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-xl p-3">
                <ShoppingBag className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="text-lg font-bold text-gray-900">248</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm flex items-center">
              <span className="text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                12.5%
              </span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-xl p-3">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                  <dd className="text-lg font-bold text-gray-900">$9,850.20</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm flex items-center">
              <span className="text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                18.2%
              </span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-xl p-3">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Products</dt>
                  <dd className="text-lg font-bold text-gray-900">36</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/vendor/dashboard/products" className="font-medium text-yellow-600 hover:text-yellow-500 flex items-center">
                Manage Inventory <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-xl p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd className="text-lg font-bold text-gray-900">124</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/vendor/dashboard/customers" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                View Audience <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-xl border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900">Recent Vendor Orders</h3>
                <Link href="/vendor/dashboard/orders" className="text-sm font-bold text-yellow-600 hover:text-yellow-700 flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-yellow-600 uppercase tracking-tighter">
                        <Link href={`/vendor/dashboard/orders/${order.id}`}>{order.id}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-black">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{renderStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-xl border border-gray-100 h-full">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Activity Feed</h3>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-6">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex space-x-3 group">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      notification.type === 'order' ? 'bg-blue-50 text-blue-600' : 
                      notification.type === 'stock' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {notification.type === 'order' ? <ShoppingBag className="h-5 w-5" /> : 
                       notification.type === 'stock' ? <AlertCircle className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">{notification.message}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{notification.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-6 py-6 bg-gray-50/50 rounded-b-xl border-t border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Management</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/vendor/dashboard/products/new" className="bg-white rounded-xl py-3 px-3 text-xs font-black text-gray-700 hover:bg-yellow-500 hover:text-white transition-all border border-gray-200 text-center shadow-sm">
                  NEW PRODUCT
                </Link>
                <Link href="/vendor/dashboard/orders" className="bg-white rounded-xl py-3 px-3 text-xs font-black text-gray-700 hover:bg-yellow-500 hover:text-white transition-all border border-gray-200 text-center shadow-sm">
                  VIEW ORDERS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
