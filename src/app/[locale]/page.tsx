'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');
  const tSocial = useTranslations('social');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const socialLinks = [
    { label: tSocial('instagram'), href: 'https://instagram.com' },
    { label: tSocial('youtube'), href: 'https://youtube.com' },
    { label: tSocial('tiktok'), href: 'https://tiktok.com' },
    { label: tSocial('newsletter'), href: '/contact' },
  ];

  return (
    <>
      {/* Hero Section - Full-bleed Image extending under navigation */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] sm:min-h-screen overflow-hidden"
      >
        {/* Background Image */}
        <motion.div 
          style={{ y: imageY }}
          className="absolute inset-0"
        >
          <img
            src="/images/home_header.png"
            alt="Denis Verdier - Artiste peintre aux cactus bleus"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content - Left Side */}
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 min-h-[90vh] sm:min-h-screen flex flex-col justify-center"
        >
          {/* Welcome Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.25em] text-white/60 mb-5"
          >
            {t('welcome')}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display text-white leading-tight max-w-xl whitespace-pre-line drop-shadow-lg"
          >
            {t('headline')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-body-large text-white/80 max-w-md drop-shadow-md"
          >
            {t('subtitle')}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {socialLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-3 sm:gap-4">
                {link.href.startsWith('http') ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                )}
                {index < socialLinks.length - 1 && (
                  <span className="text-white/25">/</span>
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* À propos Section */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[3px] border border-warm-gray/20">
                <img
                  src="/images/about.png"
                  alt="Denis Verdier - Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-headline text-accent mb-10"
              >
                {t('aboutTitle')}
              </motion.h2>

              <div className="space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <motion.p
                    key={num}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: num * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-body-large text-text-primary leading-relaxed"
                  >
                    {t(`aboutParagraph${num}` as any)}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
