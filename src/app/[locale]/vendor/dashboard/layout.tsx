"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Store,
  ExternalLink,
  Settings,
  ChevronDown,
  LucideIcon
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/vendor/dashboard/orders', icon: ShoppingBag },
  { name: 'Inventory', href: '/vendor/dashboard/products', icon: Package },
  { name: 'Customers', href: '/vendor/dashboard/customers', icon: Users },
  { name: 'Messages', href: '/vendor/dashboard/messages', icon: MessageSquare },
  { name: 'Storefront', href: '/vendor/dashboard/storefront', icon: Store },
];

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-zinc-900 selection:bg-[#D9A606] selection:text-white font-sans overflow-x-hidden">
      {/* ── Animated Mesh Gradients (Light Core) ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-[#D9A606]/20 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-to-bl from-[#F2B705]/15 to-transparent rounded-full blur-[100px] animate-bounce duration-[10s]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── High-Fidelity Header ── */}
        <header 
          className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
            scrolled 
              ? "bg-white/70 backdrop-blur-xl border-gray-200 py-3 shadow-sm" 
              : "bg-transparent border-transparent py-5"
          }`}
        >
          <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12">
              <div className="flex items-center gap-8">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-zinc-500 hover:text-zinc-900 transition-all active:scale-95"
                >
                  {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <Link href="/vendor/dashboard" className="flex items-center group gap-3">
                  <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                    <Image src="/logo.png" alt="Buy from Africa" fill className="object-contain" priority unoptimized />
                  </div>
                </Link>

                {/* Search Bar - Centered Pattern */}
                <div className="hidden xl:flex items-center relative ml-4">
                  <Search className="absolute left-4 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Scan Network..." 
                    className="bg-gray-100/50 border border-gray-200 rounded-full py-2.5 pl-11 pr-6 w-[350px] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D9A606]/30 focus:bg-white transition-all placeholder:text-zinc-400 uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                  <button className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-white text-zinc-500 hover:text-[#D9A606] border border-gray-200/50 transition-all active:scale-90 shadow-sm">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <button className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-white text-zinc-500 hover:text-[#D9A606] border border-gray-200/50 transition-all active:scale-90 shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <div 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 pl-2 group cursor-pointer hover:bg-white/50 p-1 rounded-2xl transition-all"
                  >
                    <div className="hidden md:flex flex-col items-end leading-none gap-1">
                      <span className="text-xs font-black text-zinc-900 group-hover:text-[#D9A606] transition-colors uppercase tracking-widest">{session?.user?.name || 'Authorized Ops'}</span>
                      <span className="text-[9px] font-black text-[#D9A606] uppercase tracking-widest opacity-70">Privileged Access</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9A606] to-[#F2B705] border-2 border-white shadow-lg overflow-hidden flex items-center justify-center text-white font-black text-sm relative">
                      {session?.user?.name?.[0] || 'A'}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* ── User Dropdown Menu ── */}
                  {isUserMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-0" 
                        onClick={() => setIsUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-3 w-64 bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-2xl p-3 z-10 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="space-y-1">
                          <Link 
                            href="/vendor/dashboard/settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-4 rounded-2xl text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-all group"
                          >
                            <Settings className="w-5 h-5 text-zinc-400 group-hover:text-[#D9A606] transition-colors" />
                            <span className="text-sm font-bold tracking-tight">Account Settings</span>
                          </Link>
                          
                          <div className="h-[1px] bg-gray-100/50 mx-4 my-2"></div>

                          <button 
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut({ callbackUrl: '/' });
                            }}
                            className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50/50 transition-all group"
                          >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold tracking-tight">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Layout Body ── */}
        <div className="flex-1 flex max-w-[1700px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-10">
          {/* ── Sidebar Navigation (Glass Panel) ── */}
          <aside className="hidden lg:flex w-72 flex-col gap-6">
            <div className="sticky top-28 flex flex-col p-4 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-3xl shadow-xl overflow-hidden relative group">
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-[#D9A606]/5 rounded-full blur-3xl group-hover:bg-[#D9A606]/10 transition-colors duration-1000"></div>
              
              <div className="px-5 py-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Main Menu</span>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${
                        isActive 
                          ? "bg-[#D9A606] text-white shadow-[0_10px_25px_rgba(217,166,6,0.3)] font-black" 
                          : "text-zinc-500 hover:text-zinc-900 hover:bg-white/60 border border-transparent hover:border-gray-200/50"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-[#D9A606]"}`} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
                      {isActive && (
                        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Sidebar Support Card Pattern */}
              <div className="mt-12 p-2">
                <div className="p-6 rounded-[2rem] bg-white/60 border border-gray-200/50 relative overflow-hidden group/card shadow-sm cursor-pointer hover:border-[#D9A606]/30 transition-all">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D9A606]/5 rounded-full blur-2xl group-hover/card:scale-150 transition-transform duration-700"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-[#D9A606]/10 text-[#D9A606]">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Store Health</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-bold mb-4">Vendors Pro Support Active. Reach out for export assistance.</p>
                  <button className="text-[9px] font-black text-[#D9A606] uppercase tracking-[0.2em] hover:underline underline-offset-4 decoration-[#D9A606]/30">Open Terminal</button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100/50">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full group flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black text-red-600 transition-all hover:bg-red-50 hover:shadow-[0_10px_20px_rgba(220,38,38,0.1)] border border-transparent hover:border-red-100"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="uppercase tracking-widest">Terminate Session</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main Content Area (Fluid) ── */}
          <main className="flex-1 min-w-0">
             <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
               {children}
             </div>
          </main>
        </div>

        {/* ── Footer ── */}
        <footer className="py-12 px-8 border-t border-gray-100 mt-20 max-w-[1700px] mx-auto w-full">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#D9A606]"></div>
                 <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Buy From Africa Global Ecosystem</span>
              </div>
              <div className="flex gap-8">
                 <Link href="#" className="text-[10px] font-black text-zinc-500 hover:text-[#D9A606] uppercase tracking-widest transition-colors">Compliance</Link>
                 <Link href="#" className="text-[10px] font-black text-zinc-500 hover:text-[#D9A606] uppercase tracking-widest transition-colors">Architecture</Link>
                 <Link href="#" className="text-[10px] font-black text-zinc-500 hover:text-[#D9A606] uppercase tracking-widest transition-colors">Support</Link>
              </div>
           </div>
        </footer>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-10">
              <Image src="/logo.png" alt="Buy from Africa" width={40} height={40} unoptimized />
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl bg-gray-100">
                <X className="w-6 h-6 text-zinc-900" />
              </button>
            </div>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black transition-all ${
                      isActive ? 'bg-[#D9A606] text-white shadow-lg' : 'text-zinc-500 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="uppercase tracking-widest">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="uppercase tracking-widest">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Custom Scrollbar (Light) ── */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F8F9FB;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(217, 166, 6, 0.1);
          border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 166, 6, 0.2);
        }
      `}</style>
    </div>
  );
}
