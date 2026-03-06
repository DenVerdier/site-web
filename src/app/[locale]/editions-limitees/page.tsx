'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Available prints (2 paintings from the collection)
const availablePrints = ['01', '04'];

// Mockup images for gallery in modal
const mockupImages = [
  '/images/mockups/bureau.jpg',
  '/images/mockups/facelover.jpg',
  '/images/mockups/cans.jpg',
];

// Fixed format: 30x40cm for 50€
const FIXED_FORMAT = { size: '30x40cm', price: 50 };

export default function LicensePage() {
  const t = useTranslations('license');
  const tCollection = useTranslations('collection');
  
  const [selectedPrint, setSelectedPrint] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Images for gallery: painting + mockups
  const galleryImages = selectedPrint 
    ? [
        `/images/overdose/painting-${selectedPrint}.jpg`,
        ...mockupImages
      ]
    : [];

  const openOrderModal = (printId: string) => {
    setSelectedPrint(printId);
    setCurrentImageIndex(0);
    setFormData({ name: '', email: '', message: '' });
    setSubmitSuccess(false);
    setModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPrint) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/editions-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          printId: selectedPrint,
          printName: tCollection(`paintings.${selectedPrint}.title`),
          name: formData.name,
          email: formData.email,
          message: formData.message || null,
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setModalOpen(false);
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-[4.5rem]">
      {/* Hero Intro - Two columns */}
      <section className="pt-12 pb-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Text */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-display text-text-primary mb-5"
              >
                {t('title')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-body-large text-text-primary leading-relaxed"
              >
                {t('intro')}
              </motion.p>
            </div>

            {/* Right - Info Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="glass p-6 sm:p-8 rounded-[3px]"
            >
              <h3 className="font-serif text-title text-accent mb-4">{t('info.title')}</h3>
              <ul className="space-y-2.5">
                {['paper', 'numbered', 'certificate', 'shipping', 'delay'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-body text-text-primary">{t(`info.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Print Catalog */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Prints Grid - 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
            {availablePrints.map((printId, index) => (
              <motion.article
                key={printId}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-pointer"
                onClick={() => openOrderModal(printId)}
              >
                {/* Card with image + info attached */}
                <div className="bg-white rounded-[3px] overflow-hidden shadow-soft">
                  {/* Print Image - No hover effect */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={`/images/overdose/painting-${printId}.jpg`}
                      alt={tCollection(`paintings.${printId}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>

                  {/* Print Info */}
                  <div className="p-4">
                    <h3 className="font-serif text-title text-text-primary">
                      {tCollection(`paintings.${printId}.title`)}
                    </h3>
                    <p className="text-sm text-text-muted mb-1">{t('printTitle')}</p>
                    <p className="text-sm text-text-muted">{t('edition')}</p>

                    {/* Fixed Format Display */}
                    <div className="mt-4 mb-4">
                      <span className="inline-block px-3 py-1.5 text-sm font-medium bg-warm-gray-light text-text-secondary rounded-sm">
                        {FIXED_FORMAT.size}
                      </span>
                    </div>

                    {/* Price & Order */}
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-lg text-text-primary">
                        {FIXED_FORMAT.price} €
                      </p>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openOrderModal(printId);
                        }}
                        variant="ghost"
                        className="text-sm text-accent hover:text-accent-hover hover:bg-transparent"
                      >
                        {t('orderButton')} →
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <AnimatePresence>
        {modalOpen && selectedPrint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => !isSubmitting && setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="bg-cream w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto relative
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-warm-gray/40
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb:hover]:bg-warm-gray/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-3xl text-accent">{t('modal.title')}</h2>
                <button
                  onClick={() => !isSubmitting && setModalOpen(false)}
                  disabled={isSubmitting}
                  className="p-2 text-text-muted hover:text-text-primary transition-colors duration-300 disabled:opacity-50"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="relative aspect-[2/1] rounded-[3px] overflow-hidden mb-4 bg-warm-gray-light">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentImageIndex]}
                      alt={`${tCollection(`paintings.${selectedPrint}.title`)} - ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 448px) 100vw, 448px"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                    >
                      <ChevronLeft size={20} className="text-text-primary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                    >
                      <ChevronRight size={20} className="text-text-primary" />
                    </button>
                  </>
                )}
                
                {/* Dots Indicator */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          idx === currentImageIndex ? 'bg-accent' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Print Info with Price */}
              <div className="flex items-center justify-between p-3 bg-warm-gray-light/50 rounded-[3px] mb-4">
                <div>
                  <p className="text-xs text-text-muted mb-0.5">{t('modal.selectedPrint')}</p>
                  <h3 className="font-serif text-base text-text-primary">
                    {tCollection(`paintings.${selectedPrint}.title`)}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {t('edition')} · {FIXED_FORMAT.size}
                  </p>
                </div>
                <span className="font-serif text-lg bg-accent text-white px-3 py-1 rounded-[3px]">
                  {FIXED_FORMAT.price} €
                </span>
              </div>

              {/* Contact Form */}
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    {t('modal.name')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('modal.namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] focus:outline-none transition-all duration-300 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    {t('modal.email')}
                  </label>
                  <input
                    type="email"
                    placeholder={t('modal.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] focus:outline-none transition-all duration-300 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    {t('modal.message')}
                  </label>
                  <textarea
                    placeholder={t('modal.messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] focus:outline-none transition-all duration-300 text-sm resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 text-text-secondary"
                    disabled={isSubmitting}
                  >
                    {t('modal.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent-hover text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('modal.submitting') || 'Envoi...'}
                      </span>
                    ) : submitSuccess ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {t('modal.success') || 'Envoyé !'}
                      </span>
                    ) : (
                      t('modal.submit')
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
