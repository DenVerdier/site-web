'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2, ArrowRight, Check } from 'lucide-react';
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
  { 
    id: '02', 
    images: [
      '/images/collection/02-lage-du-smartphone.jpg',
      '/images/collection/02-lage-du-smartphone-1.jpg',
      '/images/collection/02-lage-du-smartphone-2.jpg',
      '/images/collection/02-lage-du-smartphone-3.jpg',
    ], 
    dimensions: '46 × 55 cm',
    available: true,
    price: '1 010 €'
  },
  { 
    id: '03', 
    images: [
      '/images/collection/03-lage-du-jeu-video.jpg',
      '/images/collection/03-lage-du-jeu-video-1.jpg',
      '/images/collection/03-lage-du-jeu-video-2.jpg',
      '/images/collection/03-lage-du-jeu-video-3.jpg',
    ], 
    dimensions: '73 × 54 cm',
    available: true,
    price: '1 270 €'
  },
  { 
    id: '04', 
    images: [
      '/images/collection/04-lage-de-lordinateur.jpg',
      '/images/collection/04-lage-de-lordinateur-1.jpg',
      '/images/collection/04-lage-de-lordinateur-2.jpg',
      '/images/collection/04-lage-de-lordinateur-3.jpg',
    ], 
    dimensions: '73 × 54 cm',
    available: true,
    price: '1 270 €'
  },
  { 
    id: '05', 
    images: [
      '/images/collection/05-lage-de-lordinateur-portable.jpg',
      '/images/collection/05-lage-de-lordinateur-portable-1.jpg',
      '/images/collection/05-lage-de-lordinateur-portable-2.jpg',
      '/images/collection/05-lage-de-lordinateur-portable-3.jpg',
    ], 
    dimensions: '92 × 65 cm',
    available: true,
    price: '1 570 €'
  },
  { 
    id: '06', 
    images: [
      '/images/collection/06-lage-du-social.jpg',
      '/images/collection/06-lage-du-social-1.jpg',
      '/images/collection/06-lage-du-social-2.jpg',
      '/images/collection/06-lage-du-social-3.jpg',
    ], 
    dimensions: '100 × 65 cm',
    available: true,
    price: '1 650 €'
  },
  { 
    id: '07', 
    images: [
      '/images/collection/07-lage-de-luniformisation.jpg',
      '/images/collection/07-lage-de-luniformisation-1.jpg',
      '/images/collection/07-lage-de-luniformisation-2.jpg',
      '/images/collection/07-lage-de-luniformisation-3.jpg',
    ], 
    dimensions: '100 × 65 cm',
    available: true,
    price: '1 650 €'
  },
  { 
    id: '08', 
    images: [
      '/images/collection/08-loverdose.jpg',
      '/images/collection/08-loverdose-1.jpg',
      '/images/collection/08-loverdose-2.jpg',
      '/images/collection/08-loverdose-3.jpg',
    ], 
    dimensions: '60 × 80 cm',
    available: true,
    price: '1 400 €'
  },
  { 
    id: '09', 
    images: [
      '/images/collection/09-un-equilibre-a-trouver.jpg',
      '/images/collection/09-un-equilibre-a-trouver-1.jpg',
      '/images/collection/09-un-equilibre-a-trouver-2.jpg',
      '/images/collection/09-un-equilibre-a-trouver-3.jpg',
    ], 
    dimensions: '45 × 60 cm',
    available: true,
    price: '1 050 €'
  },
  { 
    id: '10', 
    images: [
      '/images/collection/10-retrouver-la-nature.jpg',
      '/images/collection/10-retrouver-la-nature-1.jpg',
      '/images/collection/10-retrouver-la-nature-2.jpg',
      '/images/collection/10-retrouver-la-nature-3.jpg',
    ], 
    dimensions: '140 × 210 cm',
    available: true,
    price: '3 500 €'
  },
];

export default function CollectionPage() {
  const t = useTranslations('collection');
  const locale = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scrollYRef = useRef(0);

  const currentPainting = paintings[currentIndex];

  // Order form state
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order-painting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderForm,
          paintingId: currentPainting.id,
          paintingTitle: t(`paintings.${currentPainting.id}.title`),
          price: currentPainting.price,
          dimensions: currentPainting.dimensions,
          locale,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setOrderForm({ name: '', email: '', phone: '', address: '', message: '' });
        setTimeout(() => {
          setOrderModalOpen(false);
          setIsSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="flex-1 overflow-y-auto px-8 py-6 lg:py-8 xl:pr-[40%] scrollbar-thin scrollbar-white/20 hover:scrollbar-white/40">
                  <h3 className="font-serif text-lg sm:text-xl text-white mb-2">
                    {currentPainting.id} — {t(`paintings.${currentPainting.id}.title`)}
                  </h3>
                  <p className="text-xs text-white/50 mb-3">
                    {t('painting.medium')} · {t('painting.year')} · {currentPainting.dimensions}
                  </p>
                  {currentPainting.available && (
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-400/60">
                        <span className="text-green-400 text-xs animate-pulse">●</span>
                        <p className="text-xs text-white/70">
                          Toile disponible — Prix : {currentPainting.price}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOrderModalOpen(true);
                        }}
                        className="px-4 py-1.5 rounded-lg border border-white/60 text-white text-xs hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                      >
                        {t('order.button')}
                        <ArrowRight size={14} />
                      </button>
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

      {/* Order Modal */}
      <AnimatePresence>
        {orderModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setOrderModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#f6ead7] rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="font-serif text-lg text-text-primary">
                  {t('order.title')}
                </h3>
                <button
                  onClick={() => setOrderModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Content */}
              {isSubmitted ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check size={24} strokeWidth={1.5} className="text-green-500" />
                  </div>
                  <p className="text-text-primary font-medium">{t('order.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="px-6 pb-6">
                  {/* Painting Info */}
                  <div className="mb-4 p-3 bg-white/50 backdrop-blur-sm rounded-[3px]">
                    <p className="text-sm font-medium text-text-primary">
                      {currentPainting.id} — {t(`paintings.${currentPainting.id}.title`)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {currentPainting.dimensions} · {currentPainting.price}
                    </p>
                  </div>

                  {/* Info Text */}
                  <p className="text-xs text-text-secondary mb-4">
                    {t('order.info')}
                  </p>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        {t('order.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] text-sm transition-all duration-300 focus:outline-none"
                        placeholder={t('order.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        {t('order.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] text-sm transition-all duration-300 focus:outline-none"
                        placeholder={t('order.emailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        {t('order.phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] text-sm transition-all duration-300 focus:outline-none"
                        placeholder={t('order.phonePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        {t('order.address')} *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] text-sm transition-all duration-300 resize-none focus:outline-none"
                        placeholder={t('order.addressPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        {t('order.message')}
                      </label>
                      <textarea
                        rows={2}
                        value={orderForm.message}
                        onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] text-sm transition-all duration-300 resize-none focus:outline-none"
                        placeholder={t('order.messagePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-4 py-3 bg-accent text-white rounded-[3px] font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t('order.sending')}
                      </>
                    ) : (
                      <>
                        {t('order.submit')}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
