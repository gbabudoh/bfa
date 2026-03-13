import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { locales, defaultLocale } from './src/i18n/config';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
  }

  // First, handle locale routing
  const response = intlMiddleware(req);
  
  // Extract locale from pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  const locale = pathnameLocale || defaultLocale;
  const pathnameWithoutLocale = pathnameLocale 
    ? pathname.replace(`/${pathnameLocale}`, '') || '/'
    : pathname;

  // Auth-protected routes check
  const isAdminRoute = pathnameWithoutLocale.startsWith('/admin');
  const isVendorRoute = pathnameWithoutLocale.startsWith('/vendor/dashboard');
  const isBuyerRoute = pathnameWithoutLocale.startsWith('/buyer/dashboard');
  const isLoginPage = pathnameWithoutLocale.startsWith('/login') || pathnameWithoutLocale.startsWith('/admin/login');
  const isDashboardRoute = pathnameWithoutLocale.startsWith('/dashboard') || isVendorRoute || isBuyerRoute;
  const isSuperAdminOnly = pathnameWithoutLocale.startsWith('/admin/management');

  // Get auth token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  // Redirect authenticated users away from login pages
  if (isLoginPage && isAuth) {
    const userRole = token.role as string;
    if (userRole === 'BUYER') {
      return NextResponse.redirect(new URL(`/${locale}/buyer/dashboard`, req.url));
    }
    if (userRole === 'VENDOR') {
      return NextResponse.redirect(new URL(`/${locale}/vendor/dashboard`, req.url));
    }
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
    }
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Require auth for protected routes
  if ((isAdminRoute || isDashboardRoute) && !isAuth) {
    const loginUrl = isAdminRoute ? `/${locale}/admin/login` : `/${locale}/login`;
    return NextResponse.redirect(new URL(loginUrl, req.url));
  }

  // Role-based access control
  if (isAuth && token) {
    const userRole = token.role as string;

    // Admin routes - only ADMIN and SUPER_ADMIN
    if (isAdminRoute && !isLoginPage && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    // Super admin only routes
    if (isSuperAdminOnly && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
    }

    // Vendor routes - only VENDOR
    if (isVendorRoute && userRole !== 'VENDOR') {
      const redirectUrl = userRole === 'BUYER' ? `/${locale}/buyer/dashboard` : `/${locale}`;
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Buyer routes - only BUYER
    if (isBuyerRoute && userRole !== 'BUYER') {
      const redirectUrl = userRole === 'VENDOR' ? `/${locale}/vendor/dashboard` : `/${locale}`;
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|fr|pt|ar|sw|pcm)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
