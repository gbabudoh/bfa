export const locales = ['en', 'fr', 'pt', 'ar', 'sw', 'pidgin'] as const;
export const defaultLocale = 'en' as const;
export const localePrefix = 'as-needed';

export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'sw', name: 'Kiswahili', dir: 'ltr' },
  { code: 'pidgin', name: 'Pidgin', dir: 'ltr' },
] as const;
