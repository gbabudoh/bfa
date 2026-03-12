"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Settings,
  Bell,
  MessageSquare,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  Heart,
  BookmarkIcon,
  Search,
  LucideIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest">BFA</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const user = {
    name: session?.user?.name || "Buyer",
    email: session?.user?.email || "",
    notifications: 3,
    messages: 2,
  };

  interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
  }

  const navItems: NavItem[] = [
    { label: "Overview", href: "/buyer/dashboard", icon: LayoutDashboard },
    { label: "Orders", href: "/buyer/dashboard/orders", icon: ShoppingBag },
    { label: "Saved Items", href: "/buyer/dashboard/saved", icon: Heart },
    { label: "Messages", href: "/buyer/dashboard/messages", icon: MessageSquare },
    { label: "Wishlist", href: "/buyer/dashboard/wishlist", icon: BookmarkIcon },
    { label: "Settings", href: "/buyer/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-yellow-500/30 font-sans overflow-x-hidden">
      {/* ── Soft Animated Mesh Gradient Background (Light Mode) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px] animation-delay-4000"></div>
        <div className="absolute inset-0 bg-white/40 pointer-events-none backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── Top Nav Header ── */}
        <header 
          className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
            scrolled 
              ? "bg-white/70 backdrop-blur-xl border-slate-200 py-3 shadow-sm" 
              : "bg-transparent border-transparent py-5"
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12">
              <div className="flex items-center gap-8">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all active:scale-95"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <Link href="/buyer/dashboard" className="flex items-center group">
                  <Image
                    src="/logo.png"
                    alt="Buy from Africa"
                    width={48}
                    height={48}
                    className="h-12 w-auto transition-transform duration-500 group-hover:scale-110"
                    priority
                    unoptimized
                  />
                </Link>

                {/* Search Bar - Premium Light UI */}
                <div className="hidden xl:flex items-center relative">
                  <Search className="absolute left-4 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search your orders, messages..." 
                    className="bg-slate-100/50 border border-slate-200 rounded-full py-2.5 pl-11 pr-6 w-[350px] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                {/* Actions Icons */}
                <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                  <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all active:scale-90 group">
                    <Bell className="w-5 h-5" />
                    {user.notifications > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(217,166,6,0.3)]"></span>
                    )}
                  </button>
                  <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all active:scale-90 group">
                    <MessageSquare className="w-5 h-5" />
                    {user.messages > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]"></span>
                    )}
                  </button>
                </div>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-700 group border border-slate-200"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-200 flex items-center justify-center p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <User className="w-4 h-4 text-yellow-600" />
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-start leading-none gap-1 text-left">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-yellow-600 transition-colors uppercase tracking-tight">{user.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium tracking-tight">Verified Buyer</span>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-4 w-56 p-2 rounded-2xl bg-white backdrop-blur-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-top-4 z-50">
                      <Link 
                        href="/buyer/dashboard/settings" 
                        className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm group"
                      >
                        <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        Account Settings
                      </Link>
                      <div className="h-[1px] bg-slate-100 my-2 mx-2"></div>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 transition-all text-sm group text-left"
                      >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Layout Body ── */}
        <div className="flex-1 flex max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
          {/* ── Sidebar Navigation (Glass Panel) ── */}
          <aside className="hidden lg:flex w-72 flex-col gap-6">
            <div className="sticky top-28 flex flex-col p-4 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-xl shadow-xl">
              <div className="px-5 py-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Main Menu</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? "bg-yellow-500 text-white shadow-[0_10px_20px_rgba(234,179,8,0.25)] font-black" 
                          : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                      }`}
                    >
                      <div className={`transition-transform duration-500 ${isActive ? "" : "group-hover:scale-110"}`}>
                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-yellow-600"}`} />
                      </div>
                      <span className="text-sm tracking-tight">{item.label}</span>
                      {isActive && (
                        <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-yellow-500 rounded-r-full shadow-[0_0_15px_rgba(234,179,8,0.4)]"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-12 p-5 text-left">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 overflow-hidden relative group cursor-pointer shadow-sm">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <p className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-2 italic">Pro Support</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Need help with imports? Chat with an agent now.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Content Area (Fluid) ── */}
          <main className="flex-1 min-w-0">
             {/* Mobile Sidebar Overlay */}
             {mobileMenuOpen && (
               <div className="fixed inset-0 z-[60] lg:hidden animate-in fade-in duration-300">
                  <div 
                    className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  ></div>
                  <div className="absolute top-0 left-0 w-[280px] h-full bg-white/90 backdrop-blur-2xl border-r border-slate-200 p-6 flex flex-col gap-8 slide-in-from-left duration-500">
                    <div className="flex items-center justify-between">
                       <Image
                         src="/logo.png"
                         alt="Buy from Africa"
                         width={40}
                         height={40}
                         className="h-10 w-auto"
                         unoptimized
                       />
                       <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100 border border-slate-200">
                          <X className="w-5 h-5 text-slate-500" />
                       </button>
                    </div>
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link 
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-4 px-5 py-4 rounded-xl text-sm ${pathname === item.href ? "bg-yellow-500 text-white font-bold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
                        >
                           <item.icon className="w-5 h-5" />
                           {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
               </div>
             )}

             <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
               {children}
             </div>
          </main>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: rgba(0, 0, 0, 0.05); 
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.1); }
      `}</style>
    </div>
  );
}
