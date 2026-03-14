"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
  Printer,
  MessageSquare,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          bg: 'bg-amber-100/50 backdrop-blur-md border border-amber-200/50', 
          text: 'text-amber-700',
          label: 'Pending'
        };
      case 'processing':
        return { 
          icon: <Package className="w-4 h-4" />, 
          bg: 'bg-blue-100/50 backdrop-blur-md border border-blue-200/50', 
          text: 'text-blue-700',
          label: 'Processing'
        };
      case 'shipped':
        return { 
          icon: <Truck className="w-4 h-4" />, 
          bg: 'bg-purple-100/50 backdrop-blur-md border border-purple-200/50', 
          text: 'text-purple-700',
          label: 'Shipped'
        };
      case 'delivered':
        return { 
          icon: <CheckCircle className="w-4 h-4" />, 
          bg: 'bg-emerald-100/50 backdrop-blur-md border border-emerald-200/50', 
          text: 'text-emerald-700',
          label: 'Delivered'
        };
      case 'cancelled':
        return { 
          icon: <XCircle className="w-4 h-4" />, 
          bg: 'bg-rose-100/50 backdrop-blur-md border border-rose-200/50', 
          text: 'text-rose-700',
          label: 'Cancelled'
        };
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100/40 text-emerald-700 border border-emerald-200/50 backdrop-blur-sm">Paid</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100/40 text-amber-700 border border-amber-200/50 backdrop-blur-sm">Pending</span>;
      case 'refunded':
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-zinc-100/40 text-zinc-600 border border-zinc-200/50 backdrop-blur-sm">Refunded</span>;
    }
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 -z-10 bg-[#f8f9fa]">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-orange-200/10 to-yellow-100/20 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="absolute top-1/4 left-1/3 w-[30%] h-[30%] bg-amber-100/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>

      <div className="relative z-10 space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-yellow-900/5 hover:bg-white/60 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#D9A606]/10 text-[#D9A606] group-hover:bg-[#D9A606] group-hover:text-white group-hover:rotate-12 transition-all duration-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span className="text-[10px] font-bold">+12%</span>
            </div>
          </div>
          <p className="text-3xl font-black text-zinc-900 tracking-tighter">{totalOrders}</p>
          <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mt-1">Total Orders</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-yellow-900/5 hover:bg-white/60 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white group-hover:-rotate-12 transition-all duration-500">
              <Clock className="w-5 h-5" />
            </div>
            {pendingOrders > 0 && <span className="px-2 py-1 rounded-full bg-yellow-100/50 text-yellow-600 text-[10px] font-bold animate-pulse">Action Required</span>}
          </div>
          <p className="text-3xl font-black text-zinc-900 tracking-tighter">{pendingOrders}</p>
          <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mt-1">Pending Orders</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-yellow-900/5 hover:bg-white/60 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-zinc-900 tracking-tighter">{processingOrders}</p>
          <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mt-1">Processing</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-yellow-900/5 hover:bg-white/60 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full">
              <TrendingDown className="w-3 h-3" />
              <span className="text-[10px] font-bold">-2%</span>
            </div>
          </div>
          <p className="text-3xl font-black text-zinc-900 tracking-tighter">${totalRevenue.toLocaleString()}</p>
          <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mt-1">Total Revenue</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* Search */}
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#D9A606] transition-colors" />
          <input
            type="text"
            placeholder="Search by order number, customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl pl-14 pr-4 py-4 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white/60 focus:border-[#D9A606] focus:ring-4 focus:ring-[#D9A606]/10 transition-all placeholder:text-zinc-400 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowDateDropdown(false);
              }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-zinc-700 hover:bg-white/60 hover:border-[#D9A606] transition-all cursor-pointer shadow-sm group"
            >
              <Filter className="w-4 h-4 text-zinc-400 group-hover:text-[#D9A606]" />
              <span className="text-xs font-black uppercase tracking-wider">
                {statusFilter === 'all' ? 'Status' : statusFilter}
              </span>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${showFilterDropdown ? 'rotate-180 text-[#D9A606]' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-3 right-0 w-56 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl z-[100] overflow-hidden p-2 origin-top-right"
                >
                  {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-4 py-3 text-left text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#D9A606] hover:text-white cursor-pointer transition-all ${
                        statusFilter === status ? 'bg-[#D9A606] text-white shadow-lg' : 'text-zinc-600'
                      }`}
                    >
                      {status === 'all' ? 'All Orders' : status}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowFilterDropdown(false);
              }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-zinc-700 hover:bg-white/60 hover:border-[#D9A606] transition-all cursor-pointer shadow-sm group"
            >
              <Calendar className="w-4 h-4 text-zinc-400 group-hover:text-[#D9A606]" />
              <span className="text-xs font-black uppercase tracking-wider">Date</span>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${showDateDropdown ? 'rotate-180 text-[#D9A606]' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showDateDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-3 right-0 w-56 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl z-[100] overflow-hidden p-2 origin-top-right"
                >
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
                      className={`w-full px-4 py-3 text-left text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#D9A606] hover:text-white cursor-pointer transition-all ${
                        dateFilter === option.value ? 'bg-[#D9A606] text-white shadow-lg' : 'text-zinc-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl shadow-yellow-900/5 overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-6 bg-zinc-900/5 border-b border-white/40">
          <div className="col-span-3 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Order Details</div>
          <div className="col-span-3 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Customer</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center">Amount</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center">Status</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center">Actions</div>
        </div>

        {/* Order Rows */}
        <div className="divide-y divide-white/40">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order, idx) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  key={order.id} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 hover:bg-white/40 transition-all duration-300 items-center group/row"
                >
                  {/* Order Info */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900/5 flex items-center justify-center group-hover/row:bg-[#D9A606]/10 transition-colors">
                        <Package className="w-5 h-5 text-zinc-400 group-hover/row:text-[#D9A606]" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900">{order.orderNumber}</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="col-span-3">
                    <p className="text-sm font-bold text-zinc-900">{order.customer.name}</p>
                    <p className="text-xs text-zinc-500 font-medium truncate">{order.customer.email}</p>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-center">
                    <p className="text-sm font-black text-zinc-900">${order.total.toLocaleString()}</p>
                    <div className="mt-1.5">{getPaymentBadge(order.paymentStatus)}</div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => {
                        setOrderToUpdate(order);
                        setShowStatusModal(true);
                      }}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${statusConfig?.bg} ${statusConfig?.text} cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm border border-transparent hover:border-current`}
                    >
                      <span className="shrink-0">{statusConfig?.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider">{statusConfig?.label}</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-center gap-1.5">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2.5 rounded-xl hover:bg-[#D9A606] text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#D9A606]/30"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl hover:bg-blue-600 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-blue-600/30"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <Link 
                      href={`/vendor/dashboard/messages?order=${order.id}`}
                      className="p-2.5 rounded-xl hover:bg-emerald-600 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-emerald-600/30"
                      title="Contact Customer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="px-6 py-24 text-center">
              <div className="inline-flex p-6 rounded-full bg-zinc-900/5 mb-4">
                <ShoppingBag className="w-12 h-12 text-zinc-300" />
              </div>
              <p className="text-zinc-900 font-black text-xl">No orders found</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-xs mx-auto">We couldn&apos;t find any orders matching your current search or filters.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2"
        >
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Showing <span className="text-zinc-900">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="text-zinc-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="text-zinc-900">{filteredOrders.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm ${
                    currentPage === page
                      ? 'bg-[#D9A606] text-white shadow-[#D9A606]/30'
                      : 'bg-white/40 backdrop-blur-md border border-white/60 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-zinc-600 hover:border-[#D9A606] hover:text-[#D9A606] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-8 py-8 flex items-start justify-between bg-zinc-900/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Order Details</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{selectedOrder.orderNumber}</span>
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 tracking-tighter italic">Review <span className="text-[#D9A606]">Shipment.</span></h3>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 rounded-2xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Status and Payment Badges */}
                <div className="flex flex-wrap items-center gap-4">
                  {(() => {
                    const config = getStatusConfig(selectedOrder.status);
                    return (
                      <div className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full ${config?.bg} ${config?.text} shadow-sm`}>
                        {config?.icon}
                        <span className="text-xs font-black uppercase tracking-widest">{config?.label}</span>
                      </div>
                    );
                  })()}
                  <div className="h-4 w-[1px] bg-zinc-200 mx-2 hidden sm:block" />
                  {getPaymentBadge(selectedOrder.paymentStatus)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Customer & Shipping */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-zinc-900/5 group">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Logistics Data</h4>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-2xl bg-white shadow-sm text-[#D9A606]">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Customer</p>
                            <p className="text-sm font-black text-zinc-900">{selectedOrder.customer.name}</p>
                            <p className="text-xs text-zinc-500 font-medium">{selectedOrder.customer.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-2xl bg-white shadow-sm text-[#D9A606]">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Destination</p>
                            <p className="text-sm font-bold text-zinc-800 leading-relaxed">{selectedOrder.customer.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-2xl bg-white shadow-sm text-[#D9A606]">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Shipping Strategy</p>
                            <p className="text-sm font-black text-zinc-900">{selectedOrder.shippingMethod}</p>
                            {selectedOrder.trackingNumber && (
                              <p className="text-xs text-[#D9A606] font-black mt-1">ID: {selectedOrder.trackingNumber}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedOrder.notes && (
                      <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-white shadow-sm text-amber-600">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Internal Note</p>
                          <p className="text-sm text-amber-800 font-medium leading-relaxed">{selectedOrder.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Inventory & Finance */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-zinc-900/5">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Inventory Manifest</h4>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-100/50 shadow-sm group/item">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-zinc-900/5 flex items-center justify-center group-hover/item:bg-[#D9A606]/10 transition-colors">
                                <Package className="w-6 h-6 text-zinc-400 group-hover/item:text-[#D9A606]" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-zinc-900">{item.name}</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm font-black text-zinc-900">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-zinc-900 shadow-2xl shadow-zinc-900/40 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A606]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#D9A606]/20 transition-all duration-700" />
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-2">Financial Total</p>
                          <p className="text-4xl font-black text-white tracking-tighter italic">${selectedOrder.total.toLocaleString()}</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[#D9A606] flex items-center justify-center text-zinc-900 shadow-lg shadow-[#D9A606]/40 rotate-12 group-hover:rotate-0 transition-all duration-500">
                          <DollarSign className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-8 bg-zinc-900/5 border-t border-white/40 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setOrderToUpdate(selectedOrder);
                    setShowStatusModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-[#D9A606] transition-all duration-300 shadow-xl shadow-zinc-900/20 hover:shadow-[#D9A606]/40 cursor-pointer"
                >
                  <Package className="w-5 h-5" />
                  Update Progress
                </button>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => window.print()}
                    className="p-4 rounded-2xl bg-white border border-zinc-200 text-zinc-600 hover:text-[#D9A606] hover:border-[#D9A606] transition-all cursor-pointer shadow-sm"
                  >
                    <Printer className="w-6 h-6" />
                  </button>
                  <Link 
                    href={`/vendor/dashboard/messages?order=${selectedOrder.id}`}
                    className="p-4 rounded-2xl bg-white border border-zinc-200 text-zinc-600 hover:text-emerald-600 hover:border-emerald-600 transition-all cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Status Modal */}
      <AnimatePresence>
        {showStatusModal && orderToUpdate && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
              onClick={() => {
                setShowStatusModal(false);
                setOrderToUpdate(null);
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 overflow-hidden"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Workflow Update</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 tracking-tighter italic">Status <span className="text-zinc-400">Control.</span></h3>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-2">Target: {orderToUpdate.orderNumber}</p>
              </div>
              
              <div className="space-y-3">
                {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => {
                  const config = getStatusConfig(status);
                  const isCurrentStatus = orderToUpdate.status === status;
                  return (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(orderToUpdate.id, status)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isCurrentStatus 
                          ? 'border-[#D9A606] bg-[#D9A606]/5 shadow-inner' 
                          : 'border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-[#D9A606]/30 hover:shadow-lg'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${config?.bg} ${config?.text} shadow-sm`}>
                        {config?.icon}
                      </div>
                      <span className={`text-sm font-black uppercase tracking-wider ${isCurrentStatus ? 'text-[#D9A606]' : 'text-zinc-600'}`}>
                        {config?.label}
                      </span>
                      {isCurrentStatus && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#D9A606] shadow-[0_0_10px_#D9A606]" />
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
                className="w-full mt-8 px-8 py-4 rounded-2xl bg-zinc-100 text-zinc-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-500 cursor-pointer border border-zinc-200 shadow-sm"
              >
                Close Controller
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
