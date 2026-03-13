"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Download,
  RefreshCw,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Printer,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
  updatedAt: string;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'BFA-2026-0312-001',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 234 567 8901',
      address: '123 Main St, New York, NY 10001, USA'
    },
    items: [
      { id: '1', name: 'Handwoven Kente Cloth', quantity: 2, price: 150.00 },
      { id: '2', name: 'African Print Dress', quantity: 1, price: 85.00 }
    ],
    total: 385.00,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2026-03-12T10:30:00Z',
    updatedAt: '2026-03-12T11:00:00Z',
    shippingMethod: 'Express International'
  },
  {
    id: '2',
    orderNumber: 'BFA-2026-0311-003',
    customer: {
      name: 'Michael Chen',
      email: 'mchen@example.com',
      address: '45 Oxford Street, London W1D 2DZ, UK'
    },
    items: [
      { id: '3', name: 'Carved Wooden Mask', quantity: 1, price: 220.00 }
    ],
    total: 220.00,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2026-03-11T14:20:00Z',
    updatedAt: '2026-03-12T09:00:00Z',
    shippingMethod: 'Standard International',
    trackingNumber: 'TRK-9876543210'
  },
  {
    id: '3',
    orderNumber: 'BFA-2026-0310-007',
    customer: {
      name: 'Amara Okonkwo',
      email: 'amara.o@example.com',
      phone: '+234 801 234 5678',
      address: '15 Victoria Island, Lagos, Nigeria'
    },
    items: [
      { id: '4', name: 'Beaded Jewelry Set', quantity: 3, price: 45.00 },
      { id: '5', name: 'Shea Butter Collection', quantity: 2, price: 35.00 }
    ],
    total: 205.00,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2026-03-10T08:15:00Z',
    updatedAt: '2026-03-12T16:30:00Z',
    shippingMethod: 'Local Delivery',
    trackingNumber: 'TRK-1234567890'
  },
  {
    id: '4',
    orderNumber: 'BFA-2026-0312-002',
    customer: {
      name: 'Jean-Pierre Dubois',
      email: 'jp.dubois@example.com',
      address: '8 Rue de Rivoli, 75001 Paris, France'
    },
    items: [
      { id: '6', name: 'Ethiopian Coffee Beans (5kg)', quantity: 1, price: 120.00 }
    ],
    total: 120.00,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2026-03-12T15:45:00Z',
    updatedAt: '2026-03-12T15:45:00Z',
    shippingMethod: 'Express International'
  },
  {
    id: '5',
    orderNumber: 'BFA-2026-0309-012',
    customer: {
      name: 'Fatima Al-Hassan',
      email: 'fatima.h@example.com',
      address: 'Dubai Marina, Dubai, UAE'
    },
    items: [
      { id: '7', name: 'Moroccan Leather Bag', quantity: 2, price: 180.00 }
    ],
    total: 360.00,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2026-03-09T11:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
    shippingMethod: 'Express International',
    notes: 'Customer requested cancellation - changed mind'
  }
];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
  const itemsPerPage = 5;

  // Filter orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    const headers = ['Order #', 'Customer', 'Email', 'Total', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(o => 
        [o.orderNumber, o.customer.name, o.customer.email, o.total, o.status, new Date(o.createdAt).toLocaleDateString()].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
    setShowStatusModal(false);
    setOrderToUpdate(null);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { 
          icon: <Clock className="w-4 h-4" />, 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-700',
          label: 'Pending'
        };
      case 'processing':
        return { 
          icon: <Package className="w-4 h-4" />, 
          bg: 'bg-blue-100', 
          text: 'text-blue-700',
          label: 'Processing'
        };
      case 'shipped':
        return { 
          icon: <Truck className="w-4 h-4" />, 
          bg: 'bg-purple-100', 
          text: 'text-purple-700',
          label: 'Shipped'
        };
      case 'delivered':
        return { 
          icon: <CheckCircle className="w-4 h-4" />, 
          bg: 'bg-green-100', 
          text: 'text-green-700',
          label: 'Delivered'
        };
      case 'cancelled':
        return { 
          icon: <XCircle className="w-4 h-4" />, 
          bg: 'bg-red-100', 
          text: 'text-red-700',
          label: 'Cancelled'
        };
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-yellow-100 text-yellow-700">Pending</span>;
      case 'refunded':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-600">Refunded</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Operations Logs</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Manage <span className="text-zinc-400">Orders.</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={`p-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] transition-all cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-700 hover:border-[#D9A606] hover:text-[#D9A606] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#D9A606]/30 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#D9A606]/10 text-[#D9A606] group-hover:bg-[#D9A606] group-hover:text-white transition-all">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900">{totalOrders}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">Total Orders</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-yellow-300 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-all">
              <Clock className="w-5 h-5" />
            </div>
            {pendingOrders > 0 && <span className="text-xs font-bold text-yellow-600">Action needed</span>}
          </div>
          <p className="text-2xl font-black text-zinc-900">{pendingOrders}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">Pending Orders</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-zinc-900">{processingOrders}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">Processing</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-green-300 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-zinc-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">Total Revenue</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by order number, customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:border-[#D9A606] transition-all placeholder:text-zinc-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterDropdown(!showFilterDropdown);
              setShowDateDropdown(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-700 hover:border-[#D9A606] transition-all cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {statusFilter === 'all' ? 'All Status' : statusFilter}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setShowFilterDropdown(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:bg-gray-50 cursor-pointer transition-colors ${
                    statusFilter === status ? 'bg-[#D9A606]/10 text-[#D9A606]' : 'text-zinc-600'
                  }`}
                >
                  {status === 'all' ? 'All Status' : status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowFilterDropdown(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-700 hover:border-[#D9A606] transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Date</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDateDropdown && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
              {[
                { value: 'all', label: 'All Time' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDateFilter(option.value);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:bg-gray-50 cursor-pointer transition-colors ${
                    dateFilter === option.value ? 'bg-[#D9A606]/10 text-[#D9A606]' : 'text-zinc-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="col-span-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Order</div>
          <div className="col-span-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Customer</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Total</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Status</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Actions</div>
        </div>

        {/* Order Rows */}
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <div 
                key={order.id} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors items-center"
              >
                {/* Order Info */}
                <div className="col-span-3">
                  <p className="text-sm font-bold text-zinc-900">{order.orderNumber}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">{order.items.length} item(s)</p>
                </div>

                {/* Customer */}
                <div className="col-span-3">
                  <p className="text-sm font-medium text-zinc-900">{order.customer.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{order.customer.email}</p>
                </div>

                {/* Total */}
                <div className="col-span-2 text-center">
                  <p className="text-sm font-bold text-zinc-900">${order.total.toLocaleString()}</p>
                  <div className="mt-1">{getPaymentBadge(order.paymentStatus)}</div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => {
                      setOrderToUpdate(order);
                      setShowStatusModal(true);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {statusConfig.icon}
                    <span className="text-[10px] font-bold uppercase">{statusConfig.label}</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-center gap-2">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 rounded-lg hover:bg-[#D9A606]/10 text-zinc-400 hover:text-[#D9A606] transition-all cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="p-2 rounded-lg hover:bg-blue-50 text-zinc-400 hover:text-blue-600 transition-all cursor-pointer"
                    title="Print Invoice"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <Link 
                    href={`/vendor/dashboard/messages?order=${order.id}`}
                    className="p-2 rounded-lg hover:bg-green-50 text-zinc-400 hover:text-green-600 transition-all cursor-pointer"
                    title="Contact Customer"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-6 py-16 text-center">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 font-medium">No orders found</p>
            <p className="text-zinc-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border-2 border-gray-200 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#D9A606] text-white'
                    : 'border-2 border-gray-200 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border-2 border-gray-200 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-zinc-900">{selectedOrder.orderNumber}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-zinc-400 hover:text-zinc-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Status and Payment */}
              <div className="flex items-center gap-4">
                {(() => {
                  const config = getStatusConfig(selectedOrder.status);
                  return (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text}`}>
                      {config.icon}
                      <span className="text-sm font-bold">{config.label}</span>
                    </div>
                  );
                })()}
                {getPaymentBadge(selectedOrder.paymentStatus)}
              </div>

              {/* Customer Info */}
              <div className="p-6 rounded-2xl bg-gray-50 space-y-4">
                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Customer Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Name</p>
                      <p className="text-sm font-medium text-zinc-900">{selectedOrder.customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Email</p>
                      <a href={`mailto:${selectedOrder.customer.email}`} className="text-sm font-medium text-zinc-900 hover:text-[#D9A606] cursor-pointer">
                        {selectedOrder.customer.email}
                      </a>
                    </div>
                  </div>
                  {selectedOrder.customer.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-zinc-400" />
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase">Phone</p>
                        <a href={`tel:${selectedOrder.customer.phone}`} className="text-sm font-medium text-zinc-900 hover:text-[#D9A606] cursor-pointer">
                          {selectedOrder.customer.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="w-5 h-5 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Shipping Address</p>
                      <p className="text-sm font-medium text-zinc-900">{selectedOrder.customer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wider mb-4">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#D9A606]/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-[#D9A606]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                          <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-zinc-900">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="p-6 rounded-2xl bg-gray-50 space-y-3">
                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Shipping Details</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Method</span>
                  <span className="text-sm font-bold text-zinc-900">{selectedOrder.shippingMethod}</span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600">Tracking Number</span>
                    <span className="text-sm font-bold text-[#D9A606]">{selectedOrder.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Order Total */}
              <div className="p-6 rounded-2xl bg-[#D9A606]/10 flex items-center justify-between">
                <span className="text-lg font-black text-zinc-900">Order Total</span>
                <span className="text-2xl font-black text-[#D9A606]">${selectedOrder.total.toLocaleString()}</span>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-yellow-700 uppercase">Note</p>
                    <p className="text-sm text-yellow-800">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setOrderToUpdate(selectedOrder);
                    setShowStatusModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D9A606] text-white font-bold text-sm hover:bg-[#C49505] transition-all cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  Update Status
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-zinc-700 font-bold text-sm hover:border-[#D9A606] hover:text-[#D9A606] transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <Link 
                  href={`/vendor/dashboard/messages?order=${selectedOrder.id}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-zinc-700 font-bold text-sm hover:border-[#D9A606] hover:text-[#D9A606] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && orderToUpdate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowStatusModal(false);
              setOrderToUpdate(null);
            }}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-zinc-900 mb-2">Update Order Status</h3>
            <p className="text-sm text-zinc-500 mb-6">Order: {orderToUpdate.orderNumber}</p>
            
            <div className="space-y-3">
              {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => {
                const config = getStatusConfig(status);
                const isCurrentStatus = orderToUpdate.status === status;
                return (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(orderToUpdate.id, status)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isCurrentStatus 
                        ? 'border-[#D9A606] bg-[#D9A606]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${config.bg} ${config.text}`}>
                      {config.icon}
                    </div>
                    <span className="text-sm font-bold text-zinc-900">{config.label}</span>
                    {isCurrentStatus && (
                      <span className="ml-auto text-xs font-bold text-[#D9A606]">Current</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowStatusModal(false);
                setOrderToUpdate(null);
              }}
              className="w-full mt-6 px-6 py-3 rounded-xl border-2 border-gray-200 text-zinc-600 font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showFilterDropdown || showDateDropdown) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowFilterDropdown(false);
            setShowDateDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
}
