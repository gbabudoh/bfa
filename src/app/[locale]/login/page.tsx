"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LogIn, Mail, Lock, EyeOff, Eye, ShieldCheck, UserCircle, Store } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('Login');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(t('errorFields'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('errorLogin'));
        setIsLoading(false);
      } else {
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        
        if (session?.user?.role === 'VENDOR') {
          router.push('/vendor/dashboard');
        } else if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/buyer/dashboard');
        }
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError(t('errorGeneric'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Visual Brand Column */}
        <div className="hidden lg:flex flex-col justify-center space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="space-y-6">
            <div className="h-16 w-16 bg-[#D9A606] rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-200/50">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
              {t('welcomeTitle')} <span className="text-gradient-gold">{t('globalHub')}</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              {t('welcomeDesc')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-surface p-8 rounded-[2rem] border-white/60">
              <div className="text-3xl font-black text-gray-900 mb-1">2.4k+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('verifiedVendors')}</div>
            </div>
            <div className="glass-surface p-8 rounded-[2rem] border-white/60">
              <div className="text-3xl font-black text-gray-900 mb-1">54</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('tradeRegions')}</div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="glass-card rounded-[3rem] p-10 md:p-14 border-white/40 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)]">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3 uppercase">{t('signIn')}</h2>
              <p className="text-gray-500 font-bold">{t('accessDashboard')}</p>
            </div>

            {error && (
              <div className="bg-red-50/50 backdrop-blur-md text-red-700 px-6 py-4 rounded-2xl mb-8 border border-red-100 animate-in shake duration-500 flex items-center gap-3">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-4">
                  {t('emailLabel')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#D9A606] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50/50 border-2 border-gray-200 focus:border-yellow-200 focus:bg-white rounded-[1.5rem] py-5 pl-16 pr-6 text-gray-900 font-bold transition-all outline-none shadow-sm"
                    placeholder={t('emailPlaceholder')}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-4">
                  <label htmlFor="password" className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                    {t('passwordLabel')}
                  </label>
                  <Link href="/forgot-password" title={t('forgotPassword')} className="text-xs font-black text-yellow-600 hover:text-yellow-700 uppercase tracking-widest">
                    {t('forgotPassword')}
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#D9A606] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50/50 border-2 border-gray-200 focus:border-yellow-200 focus:bg-white rounded-[1.5rem] py-5 pl-16 pr-14 text-gray-900 font-bold transition-all outline-none shadow-sm"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center ml-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="hidden"
                  />
                  <div className={`h-6 w-6 rounded-lg border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-yellow-500 border-yellow-500 shadow-lg shadow-yellow-200' : 'border-gray-200 bg-white'}`}>
                    {rememberMe && <div className="h-2 w-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">{t('rememberMe')}</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gray-900 hover:bg-black text-white py-6 rounded-3xl text-sm font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    {t('authenticating')}
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    {t('signInButton')}
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 space-y-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs font-black uppercase tracking-widest">
                  <span className="bg-[#FDFCF7] px-4 text-gray-400 whitespace-nowrap">{t('joinEcosystem')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/register?type=buyer" 
                  className="glass-surface hover:bg-white hover:shadow-xl hover:shadow-yellow-100/50 p-5 rounded-2xl flex flex-col items-center gap-2 border-white/60 transition-all group"
                  title={t('buyerRole')}
                >
                  <UserCircle className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t('buyerRole')}</span>
                </Link>
                <Link 
                  href="/register?type=vendor" 
                  className="glass-surface hover:bg-white hover:shadow-xl hover:shadow-yellow-100/50 p-5 rounded-2xl flex flex-col items-center gap-2 border-white/60 transition-all group"
                  title={t('vendorRole')}
                >
                  <Store className="h-6 w-6 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t('vendorRole')}</span>
                </Link>
              </div>

              <p className="text-center text-xs font-bold text-gray-400">
                {t('noAccount')}{' '}
                <Link href="/register" className="text-yellow-600 hover:text-yellow-800 font-black">
                  {t('signUpFree')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}