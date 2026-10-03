import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { seoMap } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hamsalekha Event Production Pvt. Ltd.",
  description:
    "Premium event production company in Bengaluru — lighting, gensets, truss, furniture, décor and full production management since 2006.",
  telephone: "+91-99725-44316",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kothanur",
    addressRegion: "Bengaluru",
    addressCountry: "IN",
  },
  foundingDate: "2006",
  sameAs: ["https://www.instagram.com/hamsalekha.event.production"],
  url: "https://hamsalekha.com",
};

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
      </head>
      <body className="font-sans bg-bg-base text-text-navy antialiased">
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
        <FloatingContact />
        <StickyMobileBar />
        <CookieNotice />
      </body>
    </html>
  );
}
