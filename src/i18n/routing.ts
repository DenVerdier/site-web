import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'zh', 'ko', 'ja'],
  defaultLocale: 'fr',
  localePrefix: 'always'
});
