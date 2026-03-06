'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'fr' as const, label: 'FR' },
  { code: 'en' as const, label: 'EN' },
  { code: 'zh' as const, label: '中' },
  { code: 'ko' as const, label: '한' },
  { code: 'ja' as const, label: '日' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: typeof languages[number]['code']) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center text-xs font-mono tracking-wide">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(lang.code)}
            className={cn(
              "px-1 py-0.5 transition-colors duration-300",
              locale === lang.code
                ? "text-accent font-medium"
                : "text-text-secondary hover:text-text-primary"
            )}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-border mx-0.5">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
