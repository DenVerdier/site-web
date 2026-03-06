'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Painting data with dimensions and multiple images
const paintings = [
  { 
    id: '01', 
    images: [
      '/images/collection/01-lage-du-mp3.jpg',
      '/images/collection/01-lage-du-mp3-2.jpg',
      '/images/collection/01-lage-du-mp3-3.jpg',
      '/images/collection/01-lage-du-mp3-4.jpg',
    ], 
    dimensions: '73 × 54 cm',
    available: true,
    price: '1 270 €'
  },
  { id: '02', images: ['/images/collection/02-lage-du-smartphone.jpg'], dimensions: '46 × 55 cm', available: false, price: '' },
  { id: '03', images: ['/images/collection/03-lage-du-jeu-video.jpg'], dimensions: '73 × 54 cm', available: false, price: '' },
  { id: '04', images: ['/images/collection/04-lage-de-lordinateur.jpg'], dimensions: '73 × 54 cm', available: false, price: '' },
  { id: '05', images: ['/images/collection/05-lage-de-lordinateur-portable.jpg'], dimensions: '92 × 65 cm', available: false, price: '' },
  { id: '06', images: ['/images/collection/06-lage-du-social.jpg'], dimensions: '100 × 65 cm', available: false, price: '' },
  { id: '07', images: ['/images/collection/07-lage-de-luniformisation.jpg'], dimensions: '100 × 65 cm', available: false, price: '' },
  { id: '08', images: ['/images/collection/08-loverdose.jpg'], dimensions: '60 × 80 cm', available: false, price: '' },
  { id: '09', images: ['/images/collection/09-un-equilibre-a-trouver.jpg'], dimensions: '45 × 60 cm', available: false, price: '' },
  { id: '10', images: ['/images/collection/10-retrouver-la-nature.jpg'], dimensions: '140 × 210 cm', available: false, price: '' },
];

export default function CollectionPage() {
  const t = useTranslations('collection');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollYRef = useRef(0);

  const currentPainting = paintings[currentIndex];

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Preload all images of current painting when lightbox opens
  useEffect(() => {
    if (lightboxOpen && currentPainting.images.length > 1) {
      currentPainting.images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [lightboxOpen, currentPainting.images]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev === 0 ? paintings.length - 1 : prev - 1));
    if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev === paintings.length - 1 ? 0 : prev + 1));
  }, [lightboxOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    scrollYRef.current = window.scrollY;
    setCurrentIndex(index);
    setSelectedImageIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-[4.5rem]">
      {/* Collection Statement */}
      <section className="pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display text-text-primary mb-5"
          >
            {t('title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-large text-text-secondary mb-6"
          >
            {t('subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-body text-text-primary leading-relaxed"
          >
            {t('description')}
          </motion.p>
        </div>
      </section>

      {/* Paintings Gallery - 3 Column Grid */}
      <section className="pb-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {paintings.map((painting, index) => (
              <motion.article
                key={painting.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Card with image + info attached */}
                <div className="bg-white rounded-[3px] overflow-hidden shadow-soft">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={painting.images[0]}
                      alt={t(`paintings.${painting.id}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Hover Overlay - Technique & Collection */}
                    <div className="absolute inset-0 bg-black/50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="p-5 w-full">
                        <p className="text-white/80 text-sm">
                          {t('painting.medium')} — {t('title')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info below image - Name, Year & Dimensions */}
                  <div className="px-4 py-3">
                    <p className="font-serif text-base text-text-primary mb-0.5">
                      {painting.id} — {t(`paintings.${painting.id}.title`)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {painting.dimensions} — {t('painting.year')}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <p className="font-mono text-xs text-white/40 tracking-wider">
                {t('painting.number', { number: currentPainting.id })}
              </p>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 text-white/40 hover:text-white/80 transition-colors duration-300"
                aria-label={t('lightbox.close')}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Main Content */}
            <div 
              className="flex-1 flex flex-col lg:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left - Image Section */}
              <div className="flex-1 lg:w-1/2 flex flex-col min-h-0">
                {/* Main Image */}
                <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8 min-h-0">
                  <div className="relative w-full h-full max-w-2xl mx-auto">
                    <Image
                      key={selectedImageIndex}
                      src={currentPainting.images[selectedImageIndex]}
                      alt={t(`paintings.${currentPainting.id}.title`)}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
                
                {/* Thumbnails */}
                {currentPainting.images.length > 1 && (
                  <div className="flex-shrink-0 flex justify-center gap-2 px-4 pb-4 lg:pb-6">
                    {currentPainting.images.map((img, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(imgIndex);
                        }}
                        className={`relative w-14 h-18 sm:w-16 sm:h-20 flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                          selectedImageIndex === imgIndex 
                            ? 'ring-2 ring-accent' 
                            : 'opacity-40 hover:opacity-70'
                        }`}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Text Section */}
              <div className="lg:w-1/2 flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">
                {/* Navigation on desktop */}
                <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => (prev === 0 ? paintings.length - 1 : prev - 1));
                      setSelectedImageIndex(0);
                    }}
                    className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                    <span className="text-xs uppercase tracking-wider">{t('lightbox.previous')}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => (prev === paintings.length - 1 ? 0 : prev + 1));
                      setSelectedImageIndex(0);
                    }}
                    className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
                  >
                    <span className="text-xs uppercase tracking-wider">{t('lightbox.next')}</span>
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Scrollable Text Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6 lg:py-8 scrollbar-thin scrollbar-white/20 hover:scrollbar-white/40">
                  <h3 className="font-serif text-lg sm:text-xl text-white mb-2">
                    {currentPainting.id} — {t(`paintings.${currentPainting.id}.title`)}
                  </h3>
                  <p className="text-xs text-white/50 mb-3">
                    {t('painting.medium')} · {t('painting.year')} · {currentPainting.dimensions}
                  </p>
                  {currentPainting.available && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-400/60 mb-5">
                      <span className="text-green-400 text-xs animate-pulse">●</span>
                      <p className="text-xs text-white/70">
                        Toile disponible — Prix : {currentPainting.price}
                      </p>
                    </div>
                  )}
                  <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line pr-4">
                    {t(`paintings.${currentPainting.id}.caption`)}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-white/10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev === 0 ? paintings.length - 1 : prev - 1));
                  setSelectedImageIndex(0);
                }}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-wider">{t('lightbox.previous')}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev === paintings.length - 1 ? 0 : prev + 1));
                  setSelectedImageIndex(0);
                }}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
              >
                <span className="text-xs uppercase tracking-wider">{t('lightbox.next')}</span>
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
