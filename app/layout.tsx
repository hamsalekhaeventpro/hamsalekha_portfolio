import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { seoMap, microcopy } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-cormorant-src",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hamsalekha-event-production.netlify.app"),
  title: {
    default: seoMap.home.title,
    template: "%s | Hamsalekha Event Production",
  },
  description: seoMap.home.description,
  keywords: [
    "event production company Bengaluru",
    "event lighting Bangalore",
    "genset rental for events Bangalore",
    "truss and staging Bengaluru",
    "wedding furniture rental Bangalore",
    "luxury event furniture",
    "glass house wedding set",
  ],
  authors: [{ name: "Hamsalekha Event Production" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Hamsalekha Event Production",
    title: seoMap.home.title,
    description: seoMap.home.description,
    images: [{ url: seoMap.home.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoMap.home.title,
    description: seoMap.home.description,
    images: [seoMap.home.ogImage],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hamsalekha Event Production",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hamsalekha-event-production.netlify.app",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hamsalekha-event-production.netlify.app"}/images/hero.jpg`,
    sameAs: [microcopy.instagramUrl],
    foundingDate: "2006",
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hamsalekha Event Production",
    description: seoMap.home.description,
    telephone: microcopy.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hamsalekha-event-production.netlify.app",
  }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`
            [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
            }
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
