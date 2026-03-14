"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  ShoppingBag,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  X,
  Download,
  RefreshCw
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive' | 'new';
  joinedDate: string;
}

// Mock data - in production this would come from API
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 234 567 8901',
    location: 'New York, USA',
    totalOrders: 12,
    totalSpent: 2450.00,
    lastOrderDate: '2026-03-10',
    status: 'active',
    joinedDate: '2025-08-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '+44 20 7123 4567',
    location: 'London, UK',
    totalOrders: 8,
    totalSpent: 1890.50,
    lastOrderDate: '2026-03-08',
    status: 'active',
    joinedDate: '2025-10-22'
  },
  {
    id: '3',
    name: 'Amara Okonkwo',
    email: 'amara.o@example.com',
    location: 'Lagos, Nigeria',
    totalOrders: 5,
    totalSpent: 780.00,
    lastOrderDate: '2026-02-28',
    status: 'active',
    joinedDate: '2025-12-01'
  },
  {
    id: '4',
    name: 'Jean-Pierre Dubois',
    email: 'jp.dubois@example.com',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    totalOrders: 3,
    totalSpent: 520.00,
    lastOrderDate: '2026-03-05',
    status: 'new',
    joinedDate: '2026-02-15'
  },
  {
    id: '5',
    name: 'Fatima Al-Hassan',
    email: 'fatima.h@example.com',
    location: 'Dubai, UAE',
    totalOrders: 15,
    totalSpent: 4200.00,
    lastOrderDate: '2026-03-11',
    status: 'active',
    joinedDate: '2025-06-10'
  },
  {
    id: '6',
    name: 'David Kimani',
    email: 'd.kimani@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    totalOrders: 2,
    totalSpent: 180.00,
    lastOrderDate: '2026-01-20',
    status: 'inactive',
    joinedDate: '2025-11-30'
  }
];

export default function VendorCustomersPage() {
  const t = useTranslations('VendorDashboard.customers');
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 5;

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) || 0;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Location', 'Total Orders', 'Total Spent', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredCustomers.map(c => 
        [c.name, c.email, c.location, c.totalOrders, c.totalSpent, c.status].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">{t('filters.statuses.active')}</span>;
      case 'inactive':
        return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-600">{t('filters.statuses.inactive')}</span>;
      case 'new':
        return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">{t('filters.statuses.new')}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">{t('subtitle')}</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">{t('title').split(' ')[0]} <span className="text-zinc-400">{t('title').split(' ').slice(1).join(' ')}.</span></h1>
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
            <span className="text-xs font-bold uppercase tracking-wider">{t('export')}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#D9A606]/30 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#D9A606]/10 text-[#D9A606] group-hover:bg-[#D9A606] group-hover:text-white transition-all">
              <Users className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900">{totalCustomers}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">{t('stats.total')}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#D9A606]/30 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600">+12%</span>
          </div>
          <p className="text-2xl font-black text-zinc-900">{activeCustomers}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">{t('stats.active')}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#D9A606]/30 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-zinc-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">{t('stats.revenue')}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#D9A606]/30 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-zinc-900">${avgOrderValue.toFixed(2)}</p>
          <p className="text-xs text-zinc-500 font-medium mt-1">{t('stats.avgValue')}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder={t('filters.searchPlaceholder')}
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
              setShowSortDropdown(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-700 hover:border-[#D9A606] transition-all cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {statusFilter === 'all' ? t('filters.status') : t(`filters.statuses.${statusFilter}`)}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
              {['all', 'active', 'inactive', 'new'].map((status) => (
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
                  {status === 'all' ? t('filters.statuses.all') : t(`filters.statuses.${status}`)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSortDropdown(!showSortDropdown);
              setShowFilterDropdown(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-zinc-700 hover:border-[#D9A606] transition-all cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-wider">{t('filters.sortBy')}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showSortDropdown && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
              {[
                { value: 'recent', label: 'Recent Activity' },
                { value: 'spent', label: 'Total Spent' },
                { value: 'orders', label: 'Order Count' },
                { value: 'name', label: 'Name A-Z' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:bg-gray-50 cursor-pointer transition-colors ${
                    sortBy === option.value ? 'bg-[#D9A606]/10 text-[#D9A606]' : 'text-zinc-600'
                  }`}
                >
                  {t(`filters.sortOptions.${option.value}`)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="col-span-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('table.customer')}</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('table.location')}</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">{t('table.orders')}</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">{t('table.spent')}</div>
          <div className="col-span-1 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">{t('table.status')}</div>
          <div className="col-span-1 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">{t('table.actions')}</div>
        </div>

        {/* Customer Rows */}
        {paginatedCustomers.length > 0 ? (
          paginatedCustomers.map((customer) => (
            <div 
              key={customer.id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors items-center"
            >
              {/* Customer Info */}
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D9A606] to-[#F2B705] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-900 truncate">{customer.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{customer.email}</p>
                </div>
              </div>

              {/* Location */}
              <div className="col-span-2 flex items-center gap-2 text-zinc-600">
                <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span className="text-sm truncate">{customer.location}</span>
              </div>

              {/* Orders */}
              <div className="col-span-2 text-center">
                <span className="text-sm font-bold text-zinc-900">{customer.totalOrders}</span>
                <span className="text-xs text-zinc-400 ml-1">{t('table.ordersCount')}</span>
              </div>

              {/* Total Spent */}
              <div className="col-span-2 text-center">
                <span className="text-sm font-bold text-zinc-900">${customer.totalSpent.toLocaleString()}</span>
              </div>

              {/* Status */}
              <div className="col-span-1 flex justify-center">
                {getStatusBadge(customer.status)}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-center gap-2">
                <button 
                  onClick={() => setSelectedCustomer(customer)}
                  className="p-2 rounded-lg hover:bg-[#D9A606]/10 text-zinc-400 hover:text-[#D9A606] transition-all cursor-pointer"
                  title={t('table.viewDetails')}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <Link 
                  href={`/vendor/dashboard/messages?customer=${customer.id}`}
                  className="p-2 rounded-lg hover:bg-blue-50 text-zinc-400 hover:text-blue-600 transition-all cursor-pointer"
                  title={t('table.sendMessage')}
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>
                <a 
                  href={`mailto:${customer.email}`}
                  className="p-2 rounded-lg hover:bg-green-50 text-zinc-400 hover:text-green-600 transition-all cursor-pointer"
                  title={t('table.sendEmail')}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-16 text-center">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-900 font-black text-xl">{t('table.noCustomers')}</p>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs mx-auto">{t('table.noCustomersDesc')}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {t('table.showing', { 
              start: ((currentPage - 1) * itemsPerPage) + 1, 
              end: Math.min(currentPage * itemsPerPage, filteredCustomers.length), 
              total: filteredCustomers.length 
            })}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCustomer(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 text-zinc-400 hover:text-zinc-600 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D9A606] to-[#F2B705] flex items-center justify-center text-white font-black text-xl">
                {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-900">{selectedCustomer.name}</h3>
                {getStatusBadge(selectedCustomer.status)}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                <Mail className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.email')}</p>
                  <a href={`mailto:${selectedCustomer.email}`} className="text-sm font-medium text-zinc-900 hover:text-[#D9A606] cursor-pointer">
                    {selectedCustomer.email}
                  </a>
                </div>
              </div>

              {selectedCustomer.phone && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Phone className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.phone')}</p>
                    <a href={`tel:${selectedCustomer.phone}`} className="text-sm font-medium text-zinc-900 hover:text-[#D9A606] cursor-pointer">
                      {selectedCustomer.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                <MapPin className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.location')}</p>
                  <p className="text-sm font-medium text-zinc-900">{selectedCustomer.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#D9A606]/10">
                  <p className="text-[10px] font-bold text-[#D9A606] uppercase tracking-wider">{t('modal.orders')}</p>
                  <p className="text-2xl font-black text-zinc-900 mt-1">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-50">
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{t('modal.spent')}</p>
                  <p className="text-2xl font-black text-zinc-900 mt-1">${selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                <Calendar className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.since')}</p>
                  <p className="text-sm font-medium text-zinc-900">
                    {new Date(selectedCustomer.joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link 
                href={`/vendor/dashboard/messages?customer=${selectedCustomer.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D9A606] text-white font-bold text-sm hover:bg-[#C49505] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                {t('modal.message')}
              </Link>
              <a 
                href={`mailto:${selectedCustomer.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-zinc-700 font-bold text-sm hover:border-[#D9A606] hover:text-[#D9A606] transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                {t('table.sendEmail').split(' ').pop()}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showFilterDropdown || showSortDropdown) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowFilterDropdown(false);
            setShowSortDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
}
