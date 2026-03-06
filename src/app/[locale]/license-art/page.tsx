'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

// Mockup images - artwork applied to products
const mockups = [
  { id: 'facelover', image: '/images/mockups/facelover.jpg', label: 'Packaging cosmétique' },
  { id: 'beer-bottle', image: '/images/mockups/beer-bottle.jpg', label: 'Bouteille de bière' },
  { id: 'cans', image: '/images/mockups/cans.jpg', label: 'Cosmétique' },
  { id: 'matte-can', image: '/images/mockups/matte-can.jpg', label: 'Canette mate' },
  { id: 'bureau', image: '/images/mockups/bureau.jpg', label: 'Habillage de bureau avec Kqueo' },
];

export default function LicenseArtPage() {
  const t = useTranslations('licenseArt');
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-[4.5rem]">
      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display text-text-primary mb-6"
          >
            {t('title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-large text-text-primary leading-relaxed"
          >
            {t('intro')}
          </motion.p>
        </div>
      </section>

      {/* What it is */}
      <section className="pb-16 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass p-8 sm:p-10 rounded-[3px]"
          >
            <h2 className="font-serif text-title text-accent mb-4">{t('what.title')}</h2>
            <p className="text-body text-text-primary leading-relaxed">
              {t('what.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-headline text-text-primary text-center mb-8">
            {t('gallery.title')}
          </h2>

          {/* Carousel */}
          <div className="flex flex-col items-center">
            {/* Images Row */}
            <div className="flex items-center justify-center gap-4 h-[280px] sm:h-[340px]">
              {/* Previous Image Preview */}
              <div
                className="w-28 sm:w-36 opacity-40 cursor-pointer hover:opacity-60 transition-opacity flex-shrink-0"
                onClick={() => goToSlide(currentIndex === 0 ? mockups.length - 1 : currentIndex - 1)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={mockups[currentIndex === 0 ? mockups.length - 1 : currentIndex - 1].image}
                    alt="Previous"
                    width={144}
                    height={216}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Current Image */}
              <div className="relative w-[320px] sm:w-[400px] rounded-lg overflow-hidden shadow-xl bg-white flex-shrink-0">
                <Image
                  src={mockups[currentIndex].image}
                  alt={mockups[currentIndex].label}
                  width={400}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="400px"
                  priority
                />
              </div>

              {/* Next Image Preview */}
              <div
                className="w-28 sm:w-36 opacity-40 cursor-pointer hover:opacity-60 transition-opacity flex-shrink-0"
                onClick={() => goToSlide(currentIndex === mockups.length - 1 ? 0 : currentIndex + 1)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={mockups[currentIndex === mockups.length - 1 ? 0 : currentIndex + 1].image}
                    alt="Next"
                    width={144}
                    height={216}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Label */}
            <p className="mt-6 text-sm font-medium text-text-primary">
              {mockups[currentIndex].label}
            </p>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-6">
              {mockups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-accent w-6' : 'bg-warm-gray hover:bg-warm-gray-light'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it may interest you */}
      <section className="pb-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-headline text-text-primary mb-8 text-center"
          >
            {t('why.title')}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {['point1', 'point2', 'point3'].map((point, index) => (
              <div key={point} className="flex items-start gap-4">
                <span className="font-mono text-xs text-accent mt-1.5">0{index + 1}</span>
                <p className="text-body text-text-primary leading-relaxed">
                  {t(`why.${point}`)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-headline text-text-primary mb-8">
              {t('cta.title')}
            </h2>
            <Button
              asChild
              className="bg-accent hover:bg-accent-hover text-white px-8 py-6 rounded-[3px] text-base"
            >
              <Link href="/contact">
                {t('cta.button')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
