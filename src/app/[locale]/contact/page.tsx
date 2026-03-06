'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, MapPin, Clock, Instagram, Youtube } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link } from '@/i18n/navigation';

interface ContactDraft {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
}

export default function ContactPage() {
  const t = useTranslations('contact');
  const tSocial = useTranslations('social');
  const { toast } = useToast();
  const [lastDraft, setLastDraft] = useState<ContactDraft | null>(null);

  // Load last draft from localStorage
  useEffect(() => {
    const drafts = localStorage.getItem('contactDrafts');
    if (drafts) {
      const parsed = JSON.parse(drafts) as ContactDraft[];
      if (parsed.length > 0) {
        setLastDraft(parsed[parsed.length - 1]);
      }
    }
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, t('form.nameRequired')),
    email: z.string().min(1, t('form.emailRequired')).email(t('form.emailInvalid')),
    subject: z.string().min(1, t('form.subjectRequired')),
    message: z.string().min(20, t('form.messageMin')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Save to localStorage
    const drafts = localStorage.getItem('contactDrafts');
    const parsed = drafts ? JSON.parse(drafts) : [];
    const newDraft = {
      ...values,
      timestamp: Date.now(),
    };
    parsed.push(newDraft);
    localStorage.setItem('contactDrafts', JSON.stringify(parsed));
    setLastDraft(newDraft);
    
    setIsSubmitting(false);
    form.reset();
    
    toast({
      title: t('form.success'),
      description: (
        <div className="glass p-3 mt-2 rounded-sm">
          <p className="text-sm text-text-primary">{t('form.success')}</p>
        </div>
      ),
    });
  };

  const subjects = [
    { value: 'original', label: t('form.subjects.original') },
    { value: 'print', label: t('form.subjects.print') },
    { value: 'license', label: t('form.subjects.license') },
    { value: 'collaboration', label: t('form.subjects.collaboration') },
    { value: 'question', label: t('form.subjects.question') },
    { value: 'other', label: t('form.subjects.other') },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-[4.5rem]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-display text-text-primary mb-10"
        >
          {t('title')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-text-secondary">{t('form.name')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('form.namePlaceholder')}
                            className="bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] h-11 transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-text-secondary">{t('form.email')}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('form.emailPlaceholder')}
                            className="bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] h-11 transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-text-secondary">{t('form.subject')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] h-11 transition-all duration-300">
                            <SelectValue placeholder={t('form.subjectPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3px]">
                          {subjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value} className="rounded-sm">
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-text-secondary">{t('form.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          className="bg-white/35 backdrop-blur-sm border border-white/40 focus:border-accent focus:bg-white/50 rounded-[3px] min-h-[140px] resize-none transition-all duration-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-hover text-white px-7 rounded-sm"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </Button>
              </form>
            </Form>

            {/* Last Request */}
            {lastDraft && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 p-4 glass rounded-sm"
              >
                <p className="font-mono text-xs text-text-muted mb-1.5">{t('lastRequest')}</p>
                <p className="text-sm text-text-primary">
                  {subjects.find(s => s.value === lastDraft.subject)?.label} — {new Date(lastDraft.timestamp).toLocaleDateString()}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Info Panel - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="glass p-6 sm:p-7 sticky top-24 rounded-[3px]">
              {/* Location */}
              <div className="mb-8">
                <div className="flex items-start gap-2.5 mb-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm text-text-primary">{t('info.location')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-accent mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary">{t('info.responseTime')}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <p className="font-mono text-xs text-text-muted mb-4">Suivez-moi</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-300"
                    aria-label={tSocial('instagram')}
                  >
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-300"
                    aria-label={tSocial('youtube')}
                  >
                    <Youtube size={20} strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-300"
                    aria-label={tSocial('tiktok')}
                  >
                    <svg
                      width="20"
                      height="20"
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
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
