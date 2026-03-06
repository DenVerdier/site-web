import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono, Noto_Sans_SC, Noto_Sans_KR, Noto_Sans_JP } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

// Serif display font - Instrument Serif
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Sans body font
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace for numbers, dates, codes
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

// CJK fallback fonts
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["400", "500", "700"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  weight: ["400", "500", "700"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Denis Verdier — Artiste peintre aux cactus bleus",
  description: "Le travail de Denis Verdier met en lumière une nature qui persiste là où la technologie déborde. Découvrez la collection Overdose et les prints en édition limitée.",
  keywords: ["Denis Verdier", "peintre", "artiste", "cactus bleus", "huile sur toile", "Overdose", "art contemporain", "fine art prints"],
  authors: [{ name: "Denis Verdier" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Denis Verdier — Artiste peintre",
    description: "Le travail de Denis Verdier met en lumière une nature qui persiste là où la technologie déborde.",
    type: "website",
    locale: "fr_FR",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${manrope.variable} ${ibmPlexMono.variable} ${notoSansSC.variable} ${notoSansKR.variable} ${notoSansJP.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col paper-texture">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
