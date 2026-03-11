"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  Store
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const user = {
    name: session?.user?.name || "Vendor User",
    email: session?.user?.email || "vendor@testaccount.com",
    avatar: "/images/avatar.jpg",
    role: "vendor",
    notifications: 3,
    messages: 2
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm w-full border-b border-gray-200 relative z-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center lg:hidden">
                <button 
                  type="button" 
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
              
              <div className="flex-shrink-0 flex items-center">
                <Link href="/vendor/dashboard" className="flex items-center">
                  <Image 
                    src="/logo.png" 
                    alt="Buy from Africa" 
                    width={48} 
                    height={48} 
                    className="h-12 w-auto mr-2"
                    priority
                    unoptimized
                  />
                </Link>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:space-x-8 lg:ml-8">
              <Link 
                href="/vendor/dashboard" 
                className="border-yellow-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Vendor Dashboard
              </Link>
              <Link 
                href="/vendor/dashboard/orders" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Orders
              </Link>
              <Link 
                href="/vendor/dashboard/products" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inventory
              </Link>
              <Link 
                href="/vendor/dashboard/storefront" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Storefront
              </Link>
            </nav>
            
            <div className="flex items-center">
              <button type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                {user.notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {user.notifications}
                  </span>
                )}
              </button>
              
              <button type="button" className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                <MessageSquare className="h-6 w-6" />
                {user.messages > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {user.messages}
                  </span>
                )}
              </button>
              
              <div className="ml-3 relative">
                <div>
                  <button 
                    type="button" 
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-1 border border-gray-300">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 mr-1">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <Link href="/vendor/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link href="/vendor/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/vendor/dashboard" className="bg-yellow-50 border-yellow-500 text-yellow-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</Link>
              <Link href="/vendor/dashboard/orders" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Orders</Link>
              <Link href="/vendor/dashboard/products" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Products</Link>
              <Link href="/vendor/dashboard/storefront" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Storefront</Link>
            </div>
          </div>
        )}
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <nav className="hidden lg:flex lg:flex-shrink-0 bg-white border-r border-gray-200">
          <div className="w-64 flex flex-col">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="py-4 pl-4 pr-6">
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Vendor Command Center</p>
              </div>
              <div className="flex-1 space-y-1 pl-2 pr-6">
                <Link href="/vendor/dashboard" className="text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md bg-yellow-50">
                  <LayoutDashboard className="text-yellow-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Overview</span>
                </Link>
                
                <Link href="/vendor/dashboard/orders" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <ShoppingBag className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Orders</span>
                </Link>
                
                <Link href="/vendor/dashboard/products" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <Package className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Products</span>
                </Link>
                
                <Link href="/vendor/dashboard/storefront" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <Store className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">My Storefront</span>
                </Link>
                
                <Link href="/vendor/dashboard/customers" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <Users className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Customers</span>
                </Link>
                
                <Link href="/vendor/dashboard/messages" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <MessageSquare className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Messages</span>
                  {user.messages > 0 && (
                    <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{user.messages}</span>
                  )}
                </Link>
                
                <Link href="/vendor/dashboard/settings" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md">
                  <Settings className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Settings</span>
                </Link>
                
                <div className="pt-8">
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                  >
                    <LogOut className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                    <span className="truncate">Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
