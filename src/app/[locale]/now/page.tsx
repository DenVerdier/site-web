'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function NowPage() {
  const t = useTranslations('now');

  const sections = [
    { key: 'production', content: t('production.content') },
    { key: 'learning', content: t('learning.content') },
    { key: 'upcoming', content: t('upcoming.content') },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-[4.5rem]">
      {/* Main Content */}
      <article className="max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-text-secondary leading-relaxed mb-10"
        >
          {t.rich('intro', {
            link: (chunks) => (
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors duration-300"
              >
                {chunks}
              </a>
            )
          })}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-headline text-accent mb-6 whitespace-pre-line leading-tight"
        >
          {t('title')}
        </motion.h1>

        {/* Metadata - Timestamp & Weather */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 leading-tight"
        >
          <p className="text-body text-text-secondary italic">
            {t('updated')}
          </p>
          <p className="text-body text-text-secondary italic">
            {t('weather')}
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, index) => (
          <motion.section
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="font-serif text-title text-text-primary mb-3">
              {t(`${section.key}.title`)}
            </h2>
            <p className="text-body-large text-text-primary leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </article>
    </div>
  );
}
