// File: app/dashboard/layout.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
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
  Heart,
  BookmarkIcon
} from 'lucide-react';

// Make the layout component a client component so we can use useState
// In a real app, you would fetch the user and role from a context or auth service
type UserRole = 'buyer' | 'vendor' | 'admin';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  notifications: number;
  messages: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // This would normally be determined from user auth context
  const userRole = "vendor" as UserRole;
  
  // This would normally come from a user profile in a real app
  const user: UserProfile = {
    name: "John Smith",
    email: "john@example.com",
    avatar: "/images/avatar.jpg", // This would be a real image in production
    role: userRole,
    notifications: 3,
    messages: 2
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm w-full border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex">
              {/* Mobile Menu Button */}
              <div className="flex items-center lg:hidden">
                <button 
                  type="button" 
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
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
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
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
            
            {/* Nav Links - Desktop */}
            <nav className="hidden lg:flex lg:space-x-8 lg:ml-8">
              <Link 
                href="/dashboard" 
                className="border-yellow-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/orders" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Orders
              </Link>
              {/* Vendor-specific nav items */}
              {userRole === "vendor" && (
                <>
                  <Link 
                    href="/dashboard/products" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Products
                  </Link>
                  <Link 
                    href="/dashboard/customers" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Customers
                  </Link>
                </>
              )}
              {/* Buyer-specific nav items */}
              {userRole === "buyer" && (
                <>
                  <Link 
                    href="/dashboard/favorites" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Favorites
                  </Link>
                  <Link 
                    href="/dashboard/wishlist" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Wishlist
                  </Link>
                </>
              )}
              {/* Admin-specific nav items */}
              {userRole === "admin" && (
                <Link 
                  href="/dashboard/vendors" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Vendors
                </Link>
              )}
            </nav>
            
            {/* Right Side Actions */}
            <div className="flex items-center">
              {/* Notifications */}
              <button 
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                {user.notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {user.notifications}
                  </span>
                )}
              </button>
              
              {/* Messages */}
              <button 
                type="button"
                className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
              >
                <span className="sr-only">View messages</span>
                <MessageSquare className="h-6 w-6" />
                {user.messages > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {user.messages}
                  </span>
                )}
              </button>
              
              {/* Profile Dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button 
                    type="button" 
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" 
                    id="user-menu-button" 
                    aria-expanded="false" 
                    aria-haspopup="true"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-1 border border-gray-300">
                      {/* This would be an actual image in production */}
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 mr-1">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="user-menu-button" 
                    tabIndex={-1}
                  >
                    <Link 
                      href="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link 
                      href="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link 
                      href="/logout" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                href="/dashboard" 
                className="bg-yellow-50 border-yellow-500 text-yellow-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/orders" 
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Orders
              </Link>
              {/* Vendor-specific mobile nav items */}
              {userRole === "vendor" && (
                <>
                  <Link 
                    href="/dashboard/products" 
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Products
                  </Link>
                  <Link 
                    href="/dashboard/customers" 
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Customers
                  </Link>
                </>
              )}
              {/* Buyer-specific mobile nav items */}
              {userRole === "buyer" && (
                <>
                  <Link 
                    href="/dashboard/favorites" 
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Favorites
                  </Link>
                  <Link 
                    href="/dashboard/wishlist" 
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Wishlist
                  </Link>
                </>
              )}
              {/* Admin-specific mobile nav items */}
              {userRole === "admin" && (
                <Link 
                  href="/dashboard/vendors" 
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Vendors
                </Link>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* This would be an actual image in production */}
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link 
                  href="/dashboard/profile" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link 
                  href="/logout" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:flex lg:flex-shrink-0 bg-white border-r border-gray-200">
          <div className="w-64 flex flex-col">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="py-4 pl-4 pr-6">
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider">
                  {userRole === "vendor" ? "Vendor Dashboard" : userRole === "admin" ? "Admin Dashboard" : "Buyer Dashboard"}
                </p>
              </div>
              <div className="flex-1 space-y-1 pl-2 pr-6">
                <Link 
                  href="/dashboard" 
                  className="text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md bg-yellow-50"
                >
                  <Home className="text-yellow-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Overview</span>
                </Link>
                
                <Link 
                  href="/dashboard/orders" 
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                >
                  <ShoppingBag className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Orders</span>
                </Link>
                
                {/* Vendor-specific sidebar items */}
                {userRole === "vendor" && (
                  <>
                    <Link 
                      href="/dashboard/products" 
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                    >
                      <Package className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                      <span className="truncate">Products</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard/customers" 
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                    >
                      <Users className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                      <span className="truncate">Customers</span>
                    </Link>
                  </>
                )}
                
                {/* Buyer-specific sidebar items */}
                {userRole === "buyer" && (
                  <>
                    <Link 
                      href="/dashboard/favorites" 
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                    >
                      <Heart className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                      <span className="truncate">Favorites</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard/wishlist" 
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                    >
                      <BookmarkIcon className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                      <span className="truncate">Wishlist</span>
                    </Link>
                  </>
                )}
                
                {/* Admin-specific sidebar items */}
                {userRole === "admin" && (
                  <Link 
                    href="/dashboard/vendors" 
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                  >
                    <Users className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                    <span className="truncate">Vendors</span>
                  </Link>
                )}
                
                {/* Common items for all roles */}
                <Link 
                  href="/dashboard/messages" 
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                >
                  <MessageSquare className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Messages</span>
                  {user.messages > 0 && (
                    <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
                      {user.messages}
                    </span>
                  )}
                </Link>
                
                <Link 
                  href="/dashboard/settings" 
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                >
                  <Settings className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                  <span className="truncate">Settings</span>
                </Link>
                
                <div className="pt-8">
                  <Link 
                    href="/logout" 
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                  >
                    <LogOut className="text-gray-500 group-hover:text-gray-600 mr-3 flex-shrink-0 h-5 w-5" />
                    <span className="truncate">Log out</span>
                  </Link>
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