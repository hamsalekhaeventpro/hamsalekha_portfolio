import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NumberStrip } from "@/components/home/NumberStrip";

import { HomeIntro } from "@/components/home/HomeIntro";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SignatureFeature } from "@/components/home/SignatureFeature";
import { StoryTeaser } from "@/components/home/StoryTeaser";
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
      
      {/* Divider: navy → cream */}
      <div className="section-divider-navy" />
      <HomeIntro />
      
      {/* HomeIntro (cream) → WhatWeDo (navy) — hard edge */}
      <WhatWeDo />
      
      {/* WhatWeDo (navy) → SignatureFeature (navy) — continuous */}
      <SignatureFeature />
      
      {/* SignatureFeature navy → StoryTeaser panel */}
      <div className="section-divider-gold" />
      <StoryTeaser />
      
      {/* StoryTeaser (panel) → BehindTheBuild (navy) */}
      <BehindTheBuild />
      
      {/* BehindTheBuild (navy) → WhoWeWorkWith (panel) — hard edge */}
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

