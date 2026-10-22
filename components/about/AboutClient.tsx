"use client";

import { asset } from "@/lib/assets";

import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { 
  aboutHero, 
  founder, 
  values, 
  aboutPeople, 
  aboutCTA 
} from "@/lib/content";
import Image from "next/image";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";

// ─── 01. ABOUT HERO (DARK CINEMATIC) ──────────────────────────────
function AboutHeroSection() {
  return (
    <Section tone="stage" id="hero" className="pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32 overflow-hidden relative">
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_55%)]" 
        aria-hidden="true" 
      />
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6 max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              {aboutHero.eyebrow}
            </span>
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
          </div>
        </Reveal>
        
        <Reveal delay={0.05}>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-cream leading-[1.08]">
            {aboutHero.title1}
            <br />
            <span className="font-display italic text-gold-light font-medium">{aboutHero.title2}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-1 sm:my-2" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-base sm:text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed">
            {aboutHero.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── 02. IT BEGAN AT HOME (LIGHT EDITORIAL UNIT) ───────────────────
function ItBeganAtHomeSection() {
  return (
    <Section tone="base" id="it-began-at-home" className="py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-navy-deep/10">
      <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Eyebrow, Year, Title, Story */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                CHAPTER 01 · 2006
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-gold-dark/25 select-none leading-none">
                2006
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
                It Began at Home.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-12 h-[1px] bg-gold-dark/40 my-1" />
          </Reveal>

          {/* Mobile Image: Inserted here so photo + story form one storytelling unit on mobile */}
          <div className="block lg:hidden my-2">
            {aboutHero.image ? (
              <div className="relative overflow-hidden rounded-sm aspect-[1.12/1] sm:aspect-[4/3] w-full shadow-md border border-navy-deep/10 bg-navy-deep flex items-center justify-center">
                <Image
                  src={aboutHero.image}
                  alt={aboutHero.imageAlt || "Warehouse & office established in Kothanur · 2006"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <EditorialPlaceholder
                aspectRatio="aspect-[1.12/1] sm:aspect-[4/3]"
                tone="light"
                contextLabel="ARCHIVAL PHOTOGRAPH"
                caption="Warehouse & office established in Kothanur · 2006"
                subline="Ramesh V · The First Facility"
              />
            )}
          </div>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4 text-text-slate text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                Ramesh V started Hamsalekha from his home in 2006 with lighting equipment and a small, loyal team. The name came first — a word that carried weight, a name that felt like a promise. Within the year, we had a proper office and a warehouse in Kothanur.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-navy-deep/10 mt-1">
              <div>
                <p className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-text-slate font-bold">Founded</p>
                <p className="font-display text-xl sm:text-2xl font-bold text-navy-deep mt-1">Ramesh V</p>
                <p className="font-sans text-xs sm:text-sm text-text-slate mt-0.5">Lighting & small crew</p>
              </div>
              <div>
                <p className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-text-slate font-bold">First Facility</p>
                <p className="font-display text-xl sm:text-2xl font-bold text-navy-deep mt-1">Kothanur</p>
                <p className="font-sans text-xs sm:text-sm text-text-slate mt-0.5">Warehouse in year one</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Desktop Image: Side-by-side on desktop */}
        <div className="hidden lg:block lg:col-span-5">
          <Reveal delay={0.1}>
            {aboutHero.image ? (
              <div className="relative overflow-hidden rounded-sm aspect-[1.12/1] w-full shadow-md border border-navy-deep/10 bg-navy-deep flex items-center justify-center">
                <Image
                  src={aboutHero.image}
                  alt={aboutHero.imageAlt || "Warehouse & office established in Kothanur · 2006"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <EditorialPlaceholder
                aspectRatio="aspect-[1.12/1]"
                tone="light"
                contextLabel="ARCHIVAL PHOTOGRAPH"
                caption="Warehouse & office established in Kothanur · 2006"
                subline="Ramesh V · The First Facility"
              />
            )}
          </Reveal>
        </div>

      </div>
    </Section>
  );
}

// ─── 03. LIGHTING BECAME LIGHTING AND POWER (DARK CAPABILITY) ─────
function LightingAndPowerSection() {
  return (
    <Section tone="stage" id="lighting-power" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-b border-gold/10">
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_65%)]" 
        aria-hidden="true" 
      />
      
      <div className="container-site relative z-10 flex flex-col gap-12 sm:gap-16">
        <div className="max-w-3xl flex flex-col gap-5 sm:gap-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
                CHAPTER 02 · 2007 — 2009
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-gold/20 select-none leading-none">
                2007 — 2009
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
                Lighting Became Lighting and Power.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-12 h-[1px] bg-gold/40 my-1" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed">
              The early years moved quickly. Gensets came in 2007 so we could offer lighting and power together. By 2008 and 2009 we were in convention centres and at large-scale events across Bengaluru, including the grounds at Eden Gardens, Palace Grounds.
            </p>
          </Reveal>
        </div>

        {/* Capability Progression Tiles */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <Reveal delay={0.1}>
            <div className="p-6 sm:p-8 lg:p-10 rounded-sm bg-navy-mid/60 border border-gold/20 flex flex-col gap-3 sm:gap-4 relative">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-gold-light font-bold">
                  2007 · POWER
                </span>
                <span className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-cream">
                Gensets Added
              </h3>
              <p className="font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
                Silent gensets from 40 to 125 KVA entered our inventory. By providing power and lighting together, our clients had one dependable point of contact that ensured the celebration never went dark.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="p-6 sm:p-8 lg:p-10 rounded-sm bg-navy-mid/60 border border-gold/20 flex flex-col gap-3 sm:gap-4 relative">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-gold-light font-bold">
                  2008–09 · EXPANSION
                </span>
                <span className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-cream">
                Eden Gardens, Palace Grounds
              </h3>
              <p className="font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
                Productions expanded into convention centres and open grounds across Bengaluru. Milestone full-scale events at Eden Gardens proved the reliability of our integrated lighting, gensets, and crew.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// ─── 04. STRUCTURES, THEN FURNITURE (LIGHT PROGRESSION) ───────────
function StructuresThenFurnitureSection() {
  const milestones = [
    {
      year: "2010",
      label: "STRUCTURES",
      title: "Truss entered the story",
      desc: "Truss and structures followed in 2010, giving us the engineering capacity to build stages, grids, and rigging overhead.",
    },
    {
      year: "2013",
      label: "FURNITURE",
      title: "Hamsalekha Furniture launched",
      desc: "Furniture launched in 2013 as clients began asking for more. We brought seating and staging directly into our inventory.",
    },
    {
      year: "2017",
      label: "NEXT GENERATION",
      title: "Family leadership expands",
      desc: "In 2017, the next generation of the family joined — bringing new thinking to a business that had already been built on getting it right.",
    },
  ];

  return (
    <Section tone="base" id="structures-furniture" className="py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-navy-deep/10">
      <div className="container-site flex flex-col gap-12 sm:gap-16">
        <div className="max-w-3xl flex flex-col gap-5 sm:gap-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                CHAPTER 03 · 2010 — 2017
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-gold-dark/25 select-none leading-none">
                2010 — 2017
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
                Structures, Then Furniture.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-12 h-[1px] bg-gold-dark/40 my-1" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-text-slate leading-relaxed">
              Truss and structures followed in 2010. Furniture launched in 2013 as clients began asking for more. In 2017, the next generation of the family joined — bringing new thinking to a business that had already been built on getting it right.
            </p>
          </Reveal>
        </div>

        {/* 3-Column Progression Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {milestones.map((item, idx) => (
            <Reveal key={item.year} delay={0.05 * idx}>
              <div className="p-6 sm:p-8 rounded-sm bg-panel-warm border border-navy-deep/10 flex flex-col gap-3 sm:gap-4 h-full">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-deep">
                  {item.year}
                </span>
                <span className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest font-bold text-gold-dark">
                  {item.label}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-deep">
                  {item.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── 05. THE PAUSE THAT BECAME A TURNING POINT (DARK SIGNATURE) ───
function ThePauseTurningPointSection() {
  return (
    <Section tone="stage" id="pause-turning-point" className="py-20 sm:py-28 lg:py-40 relative overflow-hidden border-b border-gold/15">
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_65%)]" 
        aria-hidden="true" 
      />
      
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-8 sm:gap-10 max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              CHAPTER 04 · 2020
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gold/20 select-none leading-none tracking-tight">
              2020
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-cream leading-tight">
              The Pause That Became a Turning Point.
            </h2>
          </div>
        </Reveal>

        {/* Prominent Centerpiece Pull Quote */}
        <Reveal delay={0.1} className="w-full">
          <div className="relative py-8 sm:py-10 px-4 sm:px-8 md:px-12 my-2 sm:my-4 border-y border-gold/30 bg-navy-mid/40">
            <p className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-light italic leading-snug sm:leading-tight max-w-3xl mx-auto">
              &ldquo;What could have been the most difficult chapter in our history became a turning point.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="max-w-2xl mx-auto flex flex-col gap-4 text-cream/80 text-base sm:text-lg md:text-xl leading-relaxed">
            <p>
              In 2020 events stopped. Hamsalekha used the pause to study what premium events would demand next. We used the time to think harder about quality and presentation, and opened the door to premium and imported furniture.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── 06. RAISING THE BAR (LIGHT CULMINATION UNIT) ──────────────────
function RaisingTheBarSection() {
  return (
    <Section tone="base" id="raising-the-bar" className="py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-navy-deep/10">
      <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                CHAPTER 05 · 2022 — 2026
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-gold-dark/25 select-none leading-none">
                2022 — 2026
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
                Raising the Bar.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-12 h-[1px] bg-gold-dark/40 my-1" />
          </Reveal>

          {/* Mobile Image: Positioned inline so Image + Heading + Body + CTA read as ONE complete storytelling unit */}
          <div className="block lg:hidden my-2">
            <div className="relative overflow-hidden rounded-sm aspect-[3/2] w-full shadow-md border border-navy-deep/10 bg-navy-deep flex items-center justify-center">
              <Image
                src={asset("/images/signature-sets/glass-house.jpg")}
                alt="The Glass House · 2026 Culmination"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
              />
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4 text-text-slate text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                {/* TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set */}
                From 2022 onwards, Hamsalekha kept raising the bar across furniture, truss, lighting, gensets and props. In 2026, as we celebrate twenty years, we unveiled The Glass House — South India&apos;s first-of-its-kind glass theme set, and a sign of where Hamsalekha is going next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="pt-2">
              <Link 
                href="/signature-sets"
                className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm uppercase tracking-widest font-bold text-gold-dark hover:text-navy-deep transition-colors"
              >
                Discover The Glass House
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Desktop Image: Side-by-side on desktop */}
        <div className="hidden lg:block lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-sm aspect-[3/2] w-full shadow-md border border-navy-deep/10 bg-navy-deep flex items-center justify-center">
              <Image
                src={asset("/images/signature-sets/glass-house.jpg")}
                alt="The Glass House · 2026 Culmination"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>

      </div>
    </Section>
  );
}

// ─── 07. FOUNDER PORTRAIT (IMAGE WITH EDITORIAL FALLBACK) ──────
function FounderPortraitPlaceholder() {
  if (founder.image) {
    return (
      <div className="relative overflow-hidden rounded-sm aspect-[3/2] w-full max-w-[460px] mx-auto lg:max-w-none shadow-md border border-gold-dark/20 bg-base-warm flex items-center justify-center">
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <EditorialPlaceholder
      aspectRatio="aspect-[3/2]"
      tone="light"
      contextLabel="FOUNDER PORTRAIT"
      caption="Ramesh V"
      subline="Founder & Managing Director · Guiding since 2006"
      className="max-w-[460px] mx-auto lg:max-w-none"
    />
  );
}

// ─── 07. FOUNDER (PREMIUM EDITORIAL SECTION) ──────────────────────
function FounderSection() {
  return (
    <Section tone="panel" id="founder" className="py-16 sm:py-24 lg:py-32 border-b border-navy-deep/10">
      <div className="container-site max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center p-6 sm:p-10 lg:p-16 rounded-sm bg-base-warm border border-gold-dark/20 shadow-sm relative">
          
          {/* Left Column (Desktop) / Top Area (Mobile): Founder Photo Placeholder */}
          <div className="lg:col-span-5 order-first lg:order-none w-full">
            <Reveal>
              <FounderPortraitPlaceholder />
            </Reveal>
          </div>

          {/* Right Column (Desktop) / Bottom Content (Mobile): Identity & Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 border-t lg:border-t-0 lg:border-l border-gold-dark/20 pt-6 lg:pt-0 lg:pl-10">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 sm:w-8 bg-gold-dark/40" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                  LEADERSHIP
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
                  {founder.name}
                </h2>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-dark font-bold">
                  {founder.title}
                </p>
                <p className="font-display italic text-xs sm:text-sm text-text-slate/70 mt-0.5">
                  Guiding Hamsalekha since 2006
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full my-0.5" />
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="font-sans text-base sm:text-lg lg:text-xl text-text-slate leading-relaxed">
                {founder.bio}
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-navy-deep/10 mt-1">
                <span className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-bold text-navy-deep">
                  TWENTY YEARS OF BACKSTAGE CRAFTSMANSHIP
                </span>
                <span className="h-px w-10 sm:w-16 bg-gold-dark/40" />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </Section>
  );
}

// ─── 08. WHAT WE BELIEVE (LIGHT FOUR-PART VALUES) ─────────────────
function WhatWeBelieveSection() {
  return (
    <Section tone="base" id="what-we-believe" className="py-16 sm:py-24 lg:py-32 border-b border-navy-deep/10">
      <div className="container-site flex flex-col gap-12 sm:gap-16">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 sm:w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                OUR PHILOSOPHY
              </span>
              <span className="h-px w-6 sm:w-8 bg-gold-dark/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-deep">
              What We Believe
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {values.map((val, i) => (
            <Reveal key={val.title} delay={0.05 * i} className="flex flex-col gap-3 sm:gap-4 p-6 sm:p-8 bg-panel-warm rounded-sm border border-navy-deep/10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-gold-dark">0{i + 1}</span>
                <span className="h-px w-6 bg-gold-dark/30" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-deep">
                {val.title}
              </h3>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-text-slate leading-relaxed">
                {val.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── 09. OUR PEOPLE (DARK HUMAN CREW TRIBUTE) ─────────────────────
function OurPeopleSection() {
  return (
    <Section tone="charcoal" id="our-people" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-b border-gold/10">
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.05),transparent_60%)]" 
        aria-hidden="true" 
      />

      <div className="container-site relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              OUR PEOPLE
            </span>
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-cream leading-tight">
            {aboutPeople.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-12 h-[1px] bg-gold/40" />
        </Reveal>

        {/* Authentic Crew / Backstage Image */}
        <Reveal delay={0.12} className="w-full">
          {aboutPeople.image ? (
            <div className="relative w-full max-w-4xl mx-auto my-2 aspect-[3/2] rounded-sm overflow-hidden shadow-sm bg-navy-deep flex items-center justify-center border border-gold/15">
              <Image
                src={aboutPeople.image}
                alt={aboutPeople.imageAlt || "Riggers, carpenters, and technicians behind every build"}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          ) : (
            <EditorialPlaceholder
              aspectRatio="aspect-[3/2]"
              tone="dark"
              contextLabel="CREW / BACKSTAGE"
              caption="Riggers, carpenters, and technicians behind every build"
              subline="Authentic backstage crew photography"
              className="w-full max-w-4xl mx-auto my-2 shadow-sm"
            />
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4 sm:gap-6 text-cream/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl">
            {aboutPeople.body.split("\n\n").map((para, j) => (
              <p key={j}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── 10. CLOSING (DARK CINEMATIC ENDING) ──────────────────────────
function AboutClosingSection() {
  return (
    <Section tone="stage" id="closing" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-stage-glow)" }} />
      <div className="container-site relative z-10 flex flex-col items-center gap-6 sm:gap-8 max-w-3xl mx-auto">
        <Reveal>
          <p className="font-display text-xl sm:text-2xl md:text-4xl text-cream leading-relaxed italic">
            &quot;{aboutCTA.quote}&quot;
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-12 sm:w-16 h-[2px] bg-gold rounded-full mx-auto" />
        </Reveal>

        <Reveal delay={0.15}>
          <Button href={aboutCTA.ctaHref} variant="primary" size="lg" className="mt-2 sm:mt-4">
            {aboutCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── MASTER ABOUT CLIENT CONTAINER ────────────────────────────────
export function AboutClient() {
  return (
    <>
      {/* 01 HERO */}
      <AboutHeroSection />
      
      {/* 02 IT BEGAN AT HOME */}
      <ItBeganAtHomeSection />
      
      {/* 03 LIGHTING BECAME LIGHTING AND POWER */}
      <LightingAndPowerSection />
      
      {/* 04 STRUCTURES, THEN FURNITURE */}
      <StructuresThenFurnitureSection />
      
      {/* 05 THE PAUSE THAT BECAME A TURNING POINT */}
      <ThePauseTurningPointSection />
      
      {/* 06 RAISING THE BAR */}
      <RaisingTheBarSection />
      
      {/* 07 FOUNDER */}
      <FounderSection />
      
      {/* 08 WHAT WE BELIEVE */}
      <WhatWeBelieveSection />
      
      {/* 09 OUR PEOPLE */}
      <OurPeopleSection />
      
      {/* 10 CLOSING */}
      <AboutClosingSection />
    </>
  );
}
