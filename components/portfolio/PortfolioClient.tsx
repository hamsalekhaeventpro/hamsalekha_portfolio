"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { portfolioHero, featuredStories, galleryImages, portfolioCTA } from "@/lib/content";
import type { GalleryCategory } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";
const filters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Celebrations", value: "celebrations" },
  { label: "Corporate", value: "corporate" },
  { label: "Signature Sets", value: "signature-sets" },
];

// ── 1. HERO ────────────────────────────────────────────────────────
function PortfolioHeroSection() {
  return (
    <Section tone="stage" className="pt-40 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              {portfolioHero.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-cream leading-[1.05]">
            {portfolioHero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-2" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {portfolioHero.subline}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── 2 - 4. THREE FEATURED STORIES ─────────────────────────────────
function FeaturedStoriesSection() {
  return (
    <Section tone="base" className="py-24 lg:py-32 overflow-hidden border-b border-navy-deep/10">
      <div className="container-site flex flex-col gap-24">
        
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
              FEATURED STORIES
            </span>
            <span className="h-px w-8 bg-gold-dark/40" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-24 lg:gap-32">
          {featuredStories.map((story, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article 
                key={story.title} 
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image: Mobile first, desktop alternating */}
                <div className={`lg:col-span-7 order-first ${isReversed ? "lg:order-last" : "lg:order-first"}`}>
                  <Reveal delay={0.1}>
                    {story.image ? (
                      <div className="relative overflow-hidden rounded-sm aspect-[3/2] w-full shadow-md bg-navy-deep flex items-center justify-center border border-navy-deep/10">
                        <Image
                          src={story.image}
                          alt={story.imageAlt || story.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <EditorialPlaceholder
                        aspectRatio="aspect-[3/2]"
                        tone="light"
                        contextLabel={story.tag.includes("EARLY") ? "ARCHIVAL PHOTOGRAPH" : "EVENT PHOTOGRAPH"}
                        caption={story.title}
                        subline={`${story.tag} · ${story.subtitle}`}
                        className="w-full shadow-md"
                      />
                    )}
                  </Reveal>
                </div>

                {/* Narrative */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <Reveal delay={0.1}>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[0.65rem] uppercase tracking-widest font-bold text-gold-dark">
                        {story.tag}
                      </span>
                      <span className="text-xs text-text-slate/40">·</span>
                      <span className="font-sans text-xs text-text-slate font-medium">
                        {story.subtitle}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-deep leading-tight">
                      {story.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <div className="w-12 h-[1px] bg-gold-dark/40 my-1" />
                  </Reveal>

                  <Reveal delay={0.4}>
                    <p className="font-sans text-base lg:text-lg text-text-slate leading-relaxed">
                      {story.body}
                    </p>
                  </Reveal>

                  <Reveal delay={0.5}>
                    <Link
                      href={story.ctaHref}
                      className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest font-bold text-gold-dark hover:text-navy-deep transition-colors mt-2 group"
                    >
                      <span>{story.ctaLabel.replace(/→|\u2192/g, '').trim()}</span>
                      <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </Section>
  );
}

// ── 5. MASONRY GALLERY & LIGHTBOX ────────────────────────────────
function GallerySection() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const rm = useReducedMotion();

  const filtered = active === "all" ? galleryImages : galleryImages.filter((img) => img.category === active);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
  };
  
  const closeLightbox = () => {
    setLightboxIdx(null);
  };

  const prev = useCallback(() => setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const next = useCallback(() => setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null)), [filtered.length]);

  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx, prev, next]);

  return (
    <Section tone="base" className="py-20 lg:py-32 min-h-screen">
      <div className="container-site flex flex-col gap-12 sm:gap-16">
        
        {/* Editorial Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10" role="tablist" aria-label="Filter gallery">
          {filters.map((f) => {
            const isActive = active === f.value;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.value)}
                className={`relative font-sans text-xs sm:text-sm uppercase tracking-widest transition-colors duration-300 py-2 ${
                  isActive ? "text-navy-deep font-bold" : "text-text-slate hover:text-navy-deep"
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-dark"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Gallery Container: Mobile Swipe + Desktop Editorial Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 gap-4 lg:gap-6 md:grid-cols-12 md:auto-rows-[280px] lg:auto-rows-[320px]"
          >
            {filtered.map((img, idx) => {
              let spanClasses = "md:col-span-4 row-span-1";
              if (idx % 7 === 0) spanClasses = "md:col-span-8 row-span-2";
              else if (idx % 7 === 3) spanClasses = "md:col-span-12 row-span-2";
              else if (idx % 7 === 5 || idx % 7 === 6) spanClasses = "md:col-span-6 row-span-2";
              else spanClasses = "md:col-span-4 row-span-1";

              if (img.span === "tall") spanClasses = "md:col-span-4 row-span-2";

              return (
                <div
                  key={img.id}
                  className={`group relative overflow-hidden cursor-pointer bg-navy-deep rounded-sm min-w-[85vw] sm:min-w-[65vw] md:min-w-0 snap-center shrink-0 md:shrink h-[380px] sm:h-[420px] md:h-auto ${spanClasses}`}
                  onClick={() => openLightbox(idx)}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <EditorialPlaceholder
                      aspectRatio="aspect-auto"
                      tone="dark"
                      contextLabel={img.category === "signature-sets" ? "SIGNATURE SET" : "EVENT PHOTOGRAPH"}
                      caption={img.caption || "From our archive"}
                      subline={`${img.eventType}${img.venue ? ` · ${img.venue}` : ""}${img.year ? ` · ${img.year}` : ""}`}
                      className="h-full w-full"
                    />
                  )}
                  
                  {/* Subtle Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Caption & Interaction */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-navy-deep/40 md:bg-navy-deep/0 md:group-hover:bg-navy-deep/70 transition-all duration-300">
                    <div className="md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-cream mb-1">
                        {img.caption || "From our archive"}
                      </h3>
                      <p className="font-sans text-[0.7rem] sm:text-xs tracking-widest text-cream/80 uppercase mb-3">
                        {img.eventType}{img.venue ? ` · ${img.venue}` : ""}{img.year ? ` · ${img.year}` : ""}
                      </p>
                      
                      {img.caseStudySlug ? (
                        <Link 
                          href={`/portfolio/${img.caseStudySlug}`}
                          onClick={(e) => e.stopPropagation()} 
                          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-light hover:text-gold transition-colors"
                        >
                          <span>View Case Study</span>
                          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      ) : img.enquireHref ? (
                        <a 
                          href={img.enquireHref} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()} 
                          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-light hover:text-gold transition-colors"
                        >
                          <span>Enquire about this setup</span>
                          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 text-text-slate/60 text-xs font-sans tracking-widest uppercase">
          <span>← Swipe to explore archive →</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-navy-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button 
              className="absolute top-6 right-6 text-cream/50 hover:text-cream transition-colors z-10 p-2" 
              onClick={closeLightbox} 
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2" 
              onClick={(e) => { e.stopPropagation(); prev(); }} 
              aria-label="Previous image"
            >
              <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            {/* Image Wrapper */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered[lightboxIdx].src ? (
                <div className="relative w-full h-full rounded-sm overflow-hidden shadow-2xl">
                  <Image
                    src={filtered[lightboxIdx].src}
                    alt={filtered[lightboxIdx].alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <EditorialPlaceholder
                  aspectRatio="aspect-[16/10]"
                  tone="dark"
                  contextLabel={filtered[lightboxIdx].category === "signature-sets" ? "SIGNATURE SET" : "EVENT PHOTOGRAPH"}
                  caption={filtered[lightboxIdx].caption || "From our archive"}
                  subline={`${filtered[lightboxIdx].eventType}${filtered[lightboxIdx].venue ? ` · ${filtered[lightboxIdx].venue}` : ""}${filtered[lightboxIdx].year ? ` · ${filtered[lightboxIdx].year}` : ""}`}
                  className="w-full shadow-2xl"
                />
              )}
            </motion.div>

            {/* Caption & Actions in Lightbox */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4 flex flex-col items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <h4 className="font-display text-base md:text-xl font-bold text-cream">
                {filtered[lightboxIdx].caption || "From our archive"}
              </h4>
              <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-cream/70 font-medium">
                {filtered[lightboxIdx].eventType}{filtered[lightboxIdx].venue ? ` · ${filtered[lightboxIdx].venue}` : ""}{filtered[lightboxIdx].year ? ` · ${filtered[lightboxIdx].year}` : ""}
              </p>
              {filtered[lightboxIdx].caseStudySlug ? (
                <Link
                  href={`/portfolio/${filtered[lightboxIdx].caseStudySlug}`}
                  className="mt-1 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-light hover:text-gold bg-navy-deep/80 px-4 py-2 rounded-sm border border-gold/30 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              ) : filtered[lightboxIdx].enquireHref ? (
                <a
                  href={filtered[lightboxIdx].enquireHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-light hover:text-gold bg-navy-deep/80 px-4 py-2 rounded-sm border border-gold/30 transition-colors"
                >
                  <span>Enquire about this setup</span>
                  <ArrowRight size={13} />
                </a>
              ) : null}
            </div>

            {/* Next */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2" 
              onClick={(e) => { e.stopPropagation(); next(); }} 
              aria-label="Next image"
            >
              <ChevronRight size={40} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// ── 6. CLOSING CTA ───────────────────────────────────────────────
function PortfolioCTASection() {
  return (
    <Section tone="stage" className="py-24 relative overflow-hidden text-center border-t border-gold/15">
      <div className="container-site relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        <Reveal>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
            {portfolioCTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button href={portfolioCTA.ctaHref} variant="primary" size="lg">
              {portfolioCTA.ctaLabel}
            </Button>
            <Button href={portfolioCTA.instagramHref} variant="outline" size="lg" external>
              {portfolioCTA.instagramLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function PortfolioClient() {
  return (
    <>
      <PortfolioHeroSection />
      <FeaturedStoriesSection />
      <GallerySection />
      <PortfolioCTASection />
    </>
  );
}
