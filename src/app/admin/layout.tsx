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
  DollarSign,
  FileEdit,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UsersRound,
  Headphones
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  superOnly?: boolean;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigation: NavItem[] = [
    { label: 'Overview', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Buyers', href: '/admin/buyers', icon: <UserCheck size={20} /> },
    { label: 'Vendors', href: '/admin/vendors', icon: <Store size={20} /> },
    { label: 'Products', href: '/admin/products', icon: <Package size={20} /> },
    { label: 'Orders', href: '/admin/orders', icon: <BarChart3 size={20} /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <TrendingUp size={20} /> },
    { label: 'Invoices', href: '/admin/financials/invoices', icon: <FileText size={20} /> },
    { label: 'Quotes', href: '/admin/financials/quotes', icon: <MessageSquare size={20} /> },
    { label: 'Currencies', href: '/admin/financials/currencies', icon: <DollarSign size={20} /> },
    { label: 'CMS Manager', href: '/admin/cms', icon: <FileEdit size={20} /> },
    { label: 'Admin Team', href: '/admin/team', icon: <UsersRound size={20} /> },
    { label: 'Administration', href: '/admin/management', icon: <ShieldCheck size={20} />, superOnly: true },
    { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#FDF8EE] flex flex-col relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-gradient-to-br from-[#D9A606]/10 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-gradient-to-tr from-[#F2B705]/10 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#D9A606 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          {children}
        </main>
      </div>
    );
  }
  const userName = session?.user?.name || 'Admin';
  const userRole = session?.user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Staff';

  return (
    <div className="min-h-screen bg-[#FDF8EE] font-sans text-gray-900 selection:bg-yellow-200 selection:text-yellow-900">
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between h-20 px-4 lg:px-8 max-w-[1800px] mx-auto">
          {/* Left: Logo + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="relative w-[112px] h-[112px] -my-6 drop-shadow-md">
                <Image src="/logo.png" alt="Buy from Africa" fill className="object-contain" style={{ imageRendering: 'crisp-edges' }} unoptimized priority />
              </div>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search your orders, messages..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:bg-white focus:border-[#D9A606]/40 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
              <MessageSquare size={20} />
            </button>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
              >
                <div className="hidden sm:flex flex-col items-end leading-tight">
                  <span className="text-sm font-bold text-gray-900">{userName}</span>
                  <span className="text-[10px] font-bold text-[#D9A606] uppercase tracking-wider">{userRole}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9A606] to-[#F2B705] flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
                  {userName[0]}
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <Link href="/admin/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      Your Profile
                    </Link>
                    <Link href="/admin/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button 
                      onClick={() => { 
                        setIsProfileOpen(false); 
                        signOut({ callbackUrl: '/admin/login' }); 
                      }}
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 cursor-pointer group/signout transition-colors"
                    >
                      <LogOut size={16} className="mr-3 group-hover/signout:-translate-x-1 transition-transform" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex max-w-[1800px] mx-auto">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex w-72 flex-col flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] bg-white/40 backdrop-blur-xl border-r border-white/20 overflow-y-auto">
          <div className="flex flex-col h-full p-6">
            {/* MAIN MENU Label */}
            <p className="px-4 pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Main Menu</p>
            
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                if (item.superOnly && session?.user?.role !== 'SUPER_ADMIN') return null;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#D9A606] to-[#F2B705] text-white shadow-md shadow-[#D9A606]/20' 
                        : 'text-gray-600 hover:bg-[#FDF6E3] hover:text-gray-900'
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#D9A606]'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Pro Support Card */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50/50 border border-yellow-100 relative overflow-hidden group/support">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-200/20 rounded-full blur-2xl group-hover/support:scale-150 transition-transform duration-700"></div>
              <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2 opacity-60">Pro Support</p>
              <p className="text-xs text-gray-700 font-bold leading-relaxed">Need help with imports? Chat with an agent now.</p>
              <button className="mt-5 flex items-center gap-2 text-[10px] font-black text-yellow-600 uppercase tracking-widest hover:text-yellow-700 cursor-pointer group/btn">
                <Headphones size={14} className="group-hover/btn:rotate-12 transition-transform" /> 
                <span className="underline underline-offset-4">Open Support Chat</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
                <Image src="/logo.png" alt="Buy from Africa" width={36} height={36} unoptimized />
                <span className="text-lg font-black text-gray-900">Admin</span>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl bg-gray-100 cursor-pointer">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navigation.map((item) => {
                if (item.superOnly && session?.user?.role !== 'SUPER_ADMIN') return null;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#D9A606] to-[#F2B705] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-[#FDF6E3]'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => { setIsSidebarOpen(false); signOut(); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={20} />
                <span className="text-sm font-semibold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
