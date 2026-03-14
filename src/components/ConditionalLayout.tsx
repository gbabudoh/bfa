"use client";

import { usePathname } from '@/i18n/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes that should NOT have the global Nav and Footer
  const noLayoutPrefixes = ['/admin', '/vendor', '/dashboard', '/buyer'];
  
  // Check if current path matches any of the prefixes
  const shouldHideLayout = noLayoutPrefixes.some(prefix => 
    pathname === prefix || pathname?.startsWith(`${prefix}/`)
  );

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
