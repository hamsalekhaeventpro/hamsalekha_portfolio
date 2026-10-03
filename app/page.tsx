import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NumberStrip } from "@/components/home/NumberStrip";
import { HomeIntro } from "@/components/home/HomeIntro";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SignatureFeature } from "@/components/home/SignatureFeature";
import { HowWeWork } from "@/components/home/HowWeWork";
import { TheVault } from "@/components/home/BehindTheBuild";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { CatalogueBridge } from "@/components/home/CatalogueBridge";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { seoMap } from "@/lib/content";

export const metadata: Metadata = {
  title: seoMap.home.title,
  description: seoMap.home.description,
  openGraph: { images: [{ url: seoMap.home.ogImage }] },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NumberStrip />
      <HomeIntro />
      <WhatWeDo />
      <SignatureFeature />
      <HowWeWork />
      <TheVault />
      <WhoWeWorkWith />
      <PortfolioPreview />
      <CatalogueBridge />
      <ClosingCTA />
    </>
  );
}
