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
      {/* Navy → dark, no divider — NumberStrip is on navy */}
      <NumberStrip />
      {/* Divider: navy → cream */}
      <div className="section-divider-navy" />
      <HomeIntro />
      {/* Divider: cream → cream */}
      <div className="section-divider-navy" />
      <WhatWeDo />
      {/* WhatWeDo cream → SignatureFeature navy — hard edge is intentional */}
      <SignatureFeature />
      {/* SignatureFeature navy → StoryTeaser panel */}
      <div className="section-divider-gold" />
      <StoryTeaser />
      {/* StoryTeaser → BehindTheBuild full-bleed image */}
      <BehindTheBuild />
      {/* BehindTheBuild image → WhoWeWorkWith panel */}
      <div className="section-divider-gold" />
      <WhoWeWorkWith />
      <RecognitionStrip />
      <div className="section-divider-navy" />
      <PortfolioPreview />
      <div className="section-divider-gold" />
      <ClosingCTA />
    </>
  );
}

