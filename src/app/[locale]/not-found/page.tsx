import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic">404</h1>
      <p className="text-xl font-medium text-gray-500 italic uppercase tracking-widest">{t('title')}</p>
      <Link href="/" className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl">
        {t('goHome')}
      </Link>
    </div>
  );
}
