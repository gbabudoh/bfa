"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Package, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Globe,
  DollarSign,
  FileEdit,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ href, icon, label, active }: SidebarItemProps) => (
  <Link 
    href={href}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
      active 
        ? 'bg-yellow-500 text-white shadow-md' 
        : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
    }`}
  >
    <span className={`${active ? 'text-white' : ''} cursor-pointer`}>{icon}</span>
    <span className="font-medium cursor-pointer">{label}</span>
  </Link>
);

import { useSession } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigation = [
    { label: 'Overview', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Vendors', href: '/admin/vendors', icon: <Store size={20} /> },
    { label: 'Products', href: '/admin/products', icon: <Package size={20} /> },
    { label: 'Orders', href: '/admin/orders', icon: <BarChart3 size={20} /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <TrendingUp size={20} /> },
    { label: 'Invoices', href: '/admin/financials/invoices', icon: <FileText size={20} /> },
    { label: 'Quotes', href: '/admin/financials/quotes', icon: <MessageSquare size={20} /> },
    { label: 'Currencies', href: '/admin/financials/currencies', icon: <DollarSign size={20} /> },
    { label: 'CMS Manager', href: '/admin/cms', icon: <FileEdit size={20} /> },
    { label: 'Administration', href: '/admin/management', icon: <ShieldCheck size={20} />, superOnly: true },
    { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="Buy from Africa" 
                width={40} 
                height={40} 
                className="h-10 w-auto"
                unoptimized
              />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                Admin Center
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} className="cursor-pointer" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => {
              if (item.superOnly && session?.user?.role !== 'SUPER_ADMIN') return null;
              return (
                <SidebarItem 
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname === item.href}
                />
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer">
              <LogOut size={20} className="cursor-pointer" />
              <span className="font-medium cursor-pointer">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Menu size={24} className="cursor-pointer" />
            </button>
            <div className="relative hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search everything..."
                className="block w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <Globe size={20} className="cursor-pointer" />
            </button>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <Bell size={20} className="cursor-pointer" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white cursor-pointer"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                id="user-menu-button"
              >
                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm cursor-pointer">
                  A
                </div>
                <div className="hidden sm:block text-left cursor-pointer">
                  <p className="text-sm font-semibold text-gray-900 leading-none cursor-pointer">Admin User</p>
                  <p className="text-xs text-gray-500 mt-1 cursor-pointer">Super Admin</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform cursor-pointer ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Your Profile</Link>
                  <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Settings</Link>
                  <hr className="my-1 border-gray-100" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
