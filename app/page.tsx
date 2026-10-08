import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NumberStrip } from "@/components/home/NumberStrip";

import { HomeIntro } from "@/components/home/HomeIntro";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SignatureFeature } from "@/components/home/SignatureFeature";
import { BehindTheBuild } from "@/components/home/BehindTheBuild";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { RecognitionStrip } from "@/components/home/RecognitionStrip";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";

import { ClosingCTA } from "@/components/home/ClosingCTA";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("home", "/");

export default function HomePage() {
  return (
    <>
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

