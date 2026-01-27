// File: app/login/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate form
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your authentication endpoint
      // For demo purposes, we'll just simulate a login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for demo credentials (in a real app, this would be handled by your backend)
      if (email === 'demo@buyfromafrica.com' && password === 'demo123') {
        // Successful login, redirect to dashboard
        router.push('/dashboard');
      } else {
        // Show error for invalid credentials
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-yellow-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 cursor-pointer" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700 cursor-pointer">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 cursor-pointer" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Remember me
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition cursor-pointer ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2 cursor-pointer" />
                    Sign in
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="text-yellow-600 hover:text-yellow-700 font-medium cursor-pointer">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          {/* Login Options */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <h3 className="text-gray-700 font-medium mb-4">Or continue as</h3>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Link 
                    href="/register?type=buyer" 
                    className="flex-1 border border-gray-300 hover:border-yellow-500 text-gray-700 font-medium rounded-lg py-2 px-3 flex items-center justify-center transition cursor-pointer"
                  >
                    <span className="cursor-pointer">Buyer</span>
                    <ArrowRight className="h-4 w-4 ml-2 cursor-pointer" />
                  </Link>
                  <Link 
                    href="/register?type=vendor" 
                    className="flex-1 border border-gray-300 hover:border-yellow-500 text-gray-700 font-medium rounded-lg py-2 px-3 flex items-center justify-center transition cursor-pointer"
                  >
                    <span className="cursor-pointer">Vendor</span>
                    <ArrowRight className="h-4 w-4 ml-2 cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Demo Credentials Notice */}
          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>For demo purposes, use: <br />
              <strong>Email:</strong> demo@buyfromafrica.com <br />
              <strong>Password:</strong> demo123
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}