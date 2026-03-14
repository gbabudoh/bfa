"use client";

import React from 'react';
import { 
  LogIn, 
  X, 
  Video, 
  Phone, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'voice' | 'video' | null;
  onSignIn: () => void;
}

const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ isOpen, onClose, mode, onSignIn }) => {
  const t = useTranslations('VendorStorefront');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg glass-card rounded-[3rem] overflow-hidden border-white/60 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in-95 slide-in-from-bottom-12 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl translate-y-16 -translate-x-16 pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-900 transition-all active:scale-90 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-10 md:p-14 text-center">
          {/* Icon Header */}
          <div className="relative inline-flex mb-10">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-[2.5rem] blur-2xl animate-pulse"></div>
            <div className="relative h-24 w-24 bg-white rounded-[2.5rem] shadow-xl border border-yellow-50 flex items-center justify-center">
              {mode === 'video' ? (
                <Video className="h-10 w-10 text-yellow-600" />
              ) : (
                <Phone className="h-10 w-10 text-yellow-600" />
              )}
              <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-gray-900 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                <Lock className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4 uppercase">
            {t('authModalTitle')}
          </h3>
          <p className="text-gray-500 text-lg font-bold leading-relaxed mb-12 max-w-sm mx-auto">
            {t('authModalDescription', { mode: mode === 'video' ? t('videoCallLabel') : t('voiceCallLabel') })}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={onSignIn}
              className="w-full bg-[#D9A606] hover:bg-yellow-600 text-white py-6 rounded-3xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-yellow-200/50 flex items-center justify-center gap-3 active:scale-95 group"
            >
              <LogIn className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              {t('signInToStart')}
              <ArrowRight className="h-4 w-4 opacity-40" />
            </button>
            <button 
              onClick={onClose}
              className="w-full py-5 rounded-3xl text-xs font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all"
            >
              {t('maybeLater')}
            </button>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-900 to-blue-400"></div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
