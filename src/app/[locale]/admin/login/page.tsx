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
  const [isFocused, setIsFocused] = useState<'email' | 'password' | null>(null);
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
        setError('Invalid credentials. Access Denied.');
        setIsLoading(false);
      } else {
        router.push('/admin');
      }
    } catch {
      setError('System authentication error. Try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-1000">
      {/* ── Glassmorphic Card ── */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D9A606] to-[#F2B705] rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-white/40 backdrop-blur-[24px] border border-white/40 rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-yellow-900/5">
          
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center mb-0 hover:scale-105 transition-transform duration-500">
              <div className="relative w-40 h-40 drop-shadow-md">
                <Image 
                  src="/logo.png" 
                  alt="Buy from Africa" 
                  fill
                  className="object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                  unoptimized
                  priority
                />
              </div>
            </div>
            
            <div className="-mt-10">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none">
                Admin Gateway
              </h1>
              <p className="mt-1 text-[10px] font-black text-[#D9A606] uppercase tracking-[0.3em]">
                Central Command Center
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-600 p-4 rounded-2xl text-xs font-black flex items-center mb-8 animate-in shake duration-500">
              <AlertCircle size={18} className="mr-3 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative group/input">
                <div className={`absolute -inset-1 bg-gradient-to-r from-[#D9A606] to-[#F2B705] rounded-[22px] blur opacity-0 transition duration-500 ${isFocused === 'email' ? 'opacity-10' : ''}`}></div>
                <div className={`relative flex items-center bg-white/60 backdrop-blur-md border rounded-[22px] transition-all duration-300 ${isFocused === 'email' ? 'border-[#D9A606] shadow-inner-lg' : 'border-white/80'}`}>
                  <span className={`pl-5 pr-3 transition-colors duration-300 ${isFocused === 'email' ? 'text-[#D9A606]' : 'text-gray-400'}`}>
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-5 pr-5 bg-transparent border-none text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none"
                    placeholder="Administrator Email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group/input">
                <div className={`absolute -inset-1 bg-gradient-to-r from-[#D9A606] to-[#F2B705] rounded-[22px] blur opacity-0 transition duration-500 ${isFocused === 'password' ? 'opacity-10' : ''}`}></div>
                <div className={`relative flex items-center bg-white/60 backdrop-blur-md border rounded-[22px] transition-all duration-300 ${isFocused === 'password' ? 'border-[#D9A606] shadow-inner-lg' : 'border-white/80'}`}>
                  <span className={`pl-5 pr-3 transition-colors duration-300 ${isFocused === 'password' ? 'text-[#D9A606]' : 'text-gray-400'}`}>
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-5 pr-5 bg-transparent border-none text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none"
                    placeholder="Secure Password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 bg-white/60 border border-white/80 rounded-lg transition-all peer-checked:bg-[#D9A606] peer-checked:border-[#D9A606]"></div>
                  <ShieldCheck size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="ml-3 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                  Remember Session
                </span>
              </label>
              <button type="button" className="text-[10px] font-black text-[#D9A606] uppercase tracking-widest hover:underline underline-offset-4">
                Help Desk
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-5 px-4 bg-gradient-to-r from-[#D9A606] to-[#F2B705] text-white text-sm font-black rounded-2xl shadow-xl shadow-yellow-600/20 hover:shadow-yellow-600/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 overflow-hidden"
            >
              {/* Button Glare */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>
              
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-3">
                  AUTHENTICATE ACCESS <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-10 pt-8 border-t border-white/40 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                AES-256 Encrypted Connection
              </span>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center max-w-[200px] leading-relaxed">
              Unauthorized access attempts are logged and reported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
