'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';

export default function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/now', label: t('now') },
    { href: '/collection', label: t('collection') },
    { href: '/license-art', label: t('licenseArt') },
    { href: 'https://denisverdier.substack.com/', label: t('newsletter'), external: true },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    // Exact match or pathname starts with href followed by /
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav 
        className="mx-4 sm:mx-6 lg:mx-auto mt-4 sm:mt-5 rounded-[3px] max-w-5xl"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '0.5px solid rgba(200, 190, 170, 0.18)',
          boxShadow: '0 2px 8px rgba(42, 37, 32, 0.04)',
        }}
      >
        <div className="px-5 sm:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/images/logo.png"
                alt="Denis Verdier"
                width={44}
                height={44}
                className="h-11 w-auto sm:h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 ml-8">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-tab text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 flex items-center gap-0.5"
                  >
                    {item.label}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-tab text-sm font-medium transition-colors duration-300",
                      isActive(item.href) 
                        ? "text-accent" 
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-5 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-0.5 py-2.5 px-3 text-base font-medium rounded-sm text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                        >
                          {item.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block py-2.5 px-3 text-base font-medium rounded-sm transition-all duration-300",
                            isActive(item.href)
                              ? "text-accent"
                              : "text-text-secondary hover:bg-accent hover:text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
