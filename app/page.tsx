import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NumberStrip } from "@/components/home/NumberStrip";

import { HomeIntro } from "@/components/home/HomeIntro";
import dynamic from "next/dynamic";
const WhatWeDo = dynamic(() => import("@/components/home/WhatWeDo").then(mod => mod.WhatWeDo));
const SignatureFeature = dynamic(() => import("@/components/home/SignatureFeature").then(mod => mod.SignatureFeature));
const BehindTheBuild = dynamic(() => import("@/components/home/BehindTheBuild").then(mod => mod.BehindTheBuild));
const WhoWeWorkWith = dynamic(() => import("@/components/home/WhoWeWorkWith").then(mod => mod.WhoWeWorkWith));
const RecognitionStrip = dynamic(() => import("@/components/home/RecognitionStrip").then(mod => mod.RecognitionStrip));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview").then(mod => mod.PortfolioPreview));

const ClosingCTA = dynamic(() => import("@/components/home/ClosingCTA").then(mod => mod.ClosingCTA));
import { getPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/config";
import { microcopy, seoMap } from "@/lib/content";

export const metadata: Metadata = getPageMetadata("home", "/");

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Hamsalekha Event Production Pvt. Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/images/hamsalekha-logo-v4.png`,
      email: microcopy.email,
      telephone: microcopy.phone,
      foundingDate: "2006",
      sameAs: [microcopy.instagramUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kothanur, Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Hamsalekha Event Production Pvt. Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/images/hamsalekha-logo-v4.png`,
      image: `${SITE_URL}${seoMap.home.ogImage}`,
      description: seoMap.home.description,
      email: microcopy.email,
      telephone: microcopy.phone,
      priceRange: "₹₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kothanur, Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      parentOrganization: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <NumberStrip />
      
      {/* NumberStrip (ivory) → HomeIntro (ivory) */}
      <div className="section-divider-gold" />
      <HomeIntro />
      
      {/* HomeIntro (ivory) → WhatWeDo (ivory) */}
      <div className="section-divider-gold" />
      <WhatWeDo />
      
      {/* WhatWeDo (ivory) → SignatureFeature (navy) — cinematic edge */}
      <SignatureFeature />
      
      {/* SignatureFeature (navy) -> BehindTheBuild (dark) */}
      <BehindTheBuild />
      
      {/* BehindTheBuild (dark) → WhoWeWorkWith (panel) */}
      <WhoWeWorkWith />
      
      <RecognitionStrip />
      
      {/* RecognitionStrip (panel) → PortfolioPreview (panel) */}
      <PortfolioPreview />
      
      {/* PortfolioPreview (panel) → ClosingCTA (navy) */}
      <div className="section-divider-gold" />
      <ClosingCTA />
    </>
  );
}

