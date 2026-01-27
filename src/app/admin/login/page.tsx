"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      } else {
        router.push('/admin');
      }
    } catch {
      setError('An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-yellow-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-yellow-600 opacity-10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm">
               <Image 
                src="/logo.png" 
                alt="Buy from Africa" 
                width={48} 
                height={48} 
                className="h-12 w-auto"
                unoptimized
              />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Gateway</h2>
          <p className="mt-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
            Buy from Africa Command Center
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center animate-in shake duration-300">
            <AlertCircle size={18} className="mr-3 shrink-0" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-yellow-600 transition-colors">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                placeholder="Email address"
              />
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-yellow-600 transition-colors">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
                Remember session
              </label>
            </div>
            <div className="text-xs">
              <a href="#" className="font-bold text-yellow-600 hover:text-yellow-700">
                Contact Support
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 bg-[#f2c01a] hover:bg-[#d9ac17] text-white text-sm font-black rounded-2xl shadow-lg hover:shadow-yellow-200 hover:-translate-y-0.5 transition-all focus:outline-none disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="flex items-center">
                  Secure Sign In <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-green-500" />
          <span>Encrypted Enterprise Access</span>
        </div>
      </div>
      
      <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
        Unauthorized access is strictly monitored and recorded.
      </p>
    </div>
  );
}
