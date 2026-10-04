import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Origin } from "@/components/about/Origin";
import { AboutBrandStatement } from "@/components/about/AboutBrandStatement";
import { TheCraft } from "@/components/about/TheCraft";
import { Evolution } from "@/components/about/Evolution";
import { AboutTheVault } from "@/components/about/AboutTheVault";
import { AboutPeople } from "@/components/about/AboutPeople";
import { CatalogueBridge } from "@/components/home/CatalogueBridge";
import { ClosingCTA } from "@/components/home/ClosingCTA";

import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("about", "/about");

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Origin />
      <AboutBrandStatement />
      <TheCraft />
      <Evolution />
      <AboutTheVault />
      <AboutPeople />
      <CatalogueBridge />
      <ClosingCTA />
    </>
  );
}
