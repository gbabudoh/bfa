// File: app/dashboard/page.tsx
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
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Box,
  Clock,
  MessageSquare
} from 'lucide-react';

// This would be imported from your components folder
// Simplified version for this example
interface CountryFlagProps {
  country: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CountryFlag = ({ country, className = "" }: CountryFlagProps) => {
  return (
    <span className={`inline-block ${className}`} title={country}>
      {/* This is a simplified placeholder for the actual CountryFlag component */}
      🌍
    </span>
  );
};

export default function DashboardPage() {
  // This would normally be determined from user auth context
  const userRole = "vendor" as "buyer" | "vendor" | "admin"; 
  
  interface Order {
    id: string;
    date: string;
    customer?: string;
    vendor?: string;
    amount: number;
    status: string;
    items: number;
    country: string;
  }
  
  // Mock recent orders (would come from API in a real app)
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

  // salesData mock removed as it was unused

  // Mock notifications (would come from API in a real app)
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

  // For a buyer dashboard
  const buyerRecentOrders = [
    {
      id: 'ORD-654321',
      date: '2025-03-21',
      vendor: 'African Textiles & Crafts',
      amount: 345.00,
      status: 'processing',
      items: 2,
      country: 'Nigeria'
    },
    {
      id: 'ORD-654320',
      date: '2025-03-15',
      vendor: 'Ghana Fabrics',
      amount: 120.75,
      status: 'shipped',
      items: 1,
      country: 'Ghana'
    },
    {
      id: 'ORD-654319',
      date: '2025-03-10',
      vendor: 'Moroccan Artisans',
      amount: 210.50,
      status: 'delivered',
      items: 3,
      country: 'Morocco'
    }
  ];

  // Helper function to render order status badge
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
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Cancelled
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here&apos;s an overview of your {userRole === "vendor" ? "business" : "account"}.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userRole === "vendor" ? (
          // Vendor stats
          <>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <ShoppingBag className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          248
                        </div>
                      </dd>
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

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monthly Revenue
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          $9,850.20
                        </div>
                      </dd>
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

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Products
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          36
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/dashboard/products" className="font-medium text-yellow-600 hover:text-yellow-500 flex items-center">
                    Manage products
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Customers
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          124
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/dashboard/customers" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                    View customers
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Buyer stats
          <>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <ShoppingBag className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          12
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/dashboard/orders" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                    View all orders
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <Truck className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Shipments
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          3
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/dashboard/orders?status=pending" className="font-medium text-yellow-600 hover:text-yellow-500 flex items-center">
                    Track shipments
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <Box className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Delivered Orders
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          8
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm flex items-center">
                  <span className="text-green-600 flex items-center font-medium">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    All deliveries complete
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Member Since
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          205 days
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/dashboard/profile" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                    View profile
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main content area - different based on role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Recent orders */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {userRole === "vendor" ? "Recent Orders" : "Your Orders"}
                </h3>
                <Link href="/dashboard/orders" className="text-sm font-medium text-yellow-600 hover:text-yellow-500 flex items-center">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {userRole === "vendor" ? "Customer" : "Vendor"}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(userRole === "vendor" ? (recentOrders as Order[]) : (buyerRecentOrders as Order[])).map((order: Order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          {userRole !== "vendor" && (
                            <CountryFlag country={order.country} size="sm" className="mr-2" />
                          )}
                          {userRole === "vendor" ? order.customer : order.vendor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {renderStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(userRole === "vendor" ? recentOrders : buyerRecentOrders).length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500 text-sm">No orders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Activity/Notifications */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg h-full">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-5">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex space-x-3">
                    {notification.type === 'order' ? (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      </div>
                    ) : notification.type === 'stock' ? (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {notifications.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-gray-500 text-sm">No recent activity</p>
                </div>
              )}
            </div>
            
            {userRole === "vendor" && (
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/dashboard/products/new" 
                    className="bg-white rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 text-center"
                  >
                    Add Product
                  </Link>
                  <Link 
                    href="/dashboard/orders?status=processing" 
                    className="bg-white rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 text-center"
                  >
                    Pending Orders
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}