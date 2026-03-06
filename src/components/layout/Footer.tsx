'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tSocial = useTranslations('social');

  return (
    <footer 
      className="mt-auto border-t border-thin"
      style={{
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(200, 190, 170, 0.18)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Location & Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-text-secondary">
              {t('location')}
            </p>
            <p className="font-mono text-xs text-text-muted tracking-wide mt-1.5">
              {t('copyright')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label={tSocial('instagram')}
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label={tSocial('youtube')}
            >
              <Youtube size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label={tSocial('tiktok')}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label={tSocial('newsletter')}
            >
              <Mail size={18} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Credit */}
          <p className="text-xs text-text-muted">
            {t('credit')}
          </p>
        </div>
      </div>
    </footer>
  );
}
