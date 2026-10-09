import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";
const FloatingContact = dynamic(() => import("@/components/layout/FloatingContact").then(mod => mod.FloatingContact));
const CookieNotice = dynamic(() => import("@/components/layout/CookieNotice").then(mod => mod.CookieNotice));
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { seoMap } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hamsalekha-event-production.netlify.app"
  ),
  title: {
    default: seoMap.home.title,
    template: "%s",
  },
  description: seoMap.home.description,
  authors: [{ name: "Hamsalekha Event Production" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Hamsalekha Event Production",
    title: seoMap.home.title,
    description: seoMap.home.description,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}${seoMap.home.ogImage}`, width: 1200, height: 630, alt: seoMap.home.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoMap.home.title,
    description: seoMap.home.description,
    images: [`${SITE_URL}${seoMap.home.ogImage}`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <noscript>
          <style>{`
            [data-reveal] { opacity: 1 !important; transform: none !important; }
            [data-lightsup] { opacity: 0 !important; }
          `}</style>
        </noscript>
      </head>
      <body className="font-sans bg-bg-base text-text-navy antialiased">
        <LenisProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white text-navy-deep px-4 py-2 font-sans font-medium rounded-lg">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
        <FloatingContact />
        <StickyMobileBar />
        <CookieNotice />
      </body>
    </html>
  );
}
