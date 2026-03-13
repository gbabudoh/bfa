import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
  
  // This ensures that the default locale does not have a prefix (e.g., /en)
  // while other locales still do (e.g., /fr, /ar)
  localePrefix
});

export const config = {
  // Match all pathnames except for
  // - API routes (/api)
  // - Next.js internals (_next)
  // - Static assets (favicon.ico, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
