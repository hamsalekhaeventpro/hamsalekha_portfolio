"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { portfolioHero, featuredStories, galleryImages, portfolioCTA } from "@/lib/content";
import type { GalleryCategory } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

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
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              {portfolioHero.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-cream leading-[1.05]">
            {portfolioHero.headline}
          </h1>
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-2" />
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {portfolioHero.subline}
          </p>
        </div>
      </div>
    </Section>
  );
}

// ── 2 - 4. THREE FEATURED STORIES ─────────────────────────────────
function FeaturedStoriesSection() {
  return (
    <Section tone="base" className="py-24 lg:py-32 overflow-hidden border-b border-navy-deep/10">
      <div className="container-site flex flex-col gap-24">
        
        <div className="opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
              FEATURED STORIES
            </span>
            <span className="h-px w-8 bg-gold-dark/40" />
          </div>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {featuredStories.map((story, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article 
                key={story.title} 
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image Placeholder: Mobile first, desktop alternating */}
                <div className={`lg:col-span-7 order-first ${isReversed ? "lg:order-last" : "lg:order-first"}`}>
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <EditorialPlaceholder
                      aspectRatio="aspect-[16/10]"
                      tone="light"
                      contextLabel={story.tag.includes("EARLY") ? "ARCHIVAL PHOTOGRAPH" : "EVENT PHOTOGRAPH"}
                      caption={story.title}
                      subline={`${story.tag} · ${story.subtitle}`}
                      className="w-full shadow-md"
                    />
                  </div>
                </div>

                {/* Narrative */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[0.65rem] uppercase tracking-widest font-bold text-gold-dark">
                        {story.tag}
                      </span>
                      <span className="text-xs text-text-slate/40">·</span>
                      <span className="font-sans text-xs text-text-slate font-medium">
                        {story.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-deep leading-tight">
                      {story.title}
                    </h2>
                  </div>

                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="w-12 h-[1px] bg-gold-dark/40 my-1" />
                  </div>

                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <p className="font-sans text-base lg:text-lg text-text-slate leading-relaxed">
                      {story.body}
                    </p>
                  </div>

                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <Link
                      href={story.ctaHref}
                      className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest font-bold text-gold-dark hover:text-navy-deep transition-colors mt-2 group"
                    >
                      <span>{story.ctaLabel.replace(/→|\u2192/g, '').trim()}</span>
                      <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </Link>
                  </div>
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
      <div className="container-site flex flex-col gap-16">
        
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
                    transition={{ duration: 0.5, ease: EXPO }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[280px] sm:auto-rows-[320px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => {
              let spanClasses = "md:col-span-4 row-span-1";
              if (idx % 7 === 0) spanClasses = "md:col-span-8 row-span-2";
              else if (idx % 7 === 3) spanClasses = "md:col-span-12 row-span-2";
              else if (idx % 7 === 5 || idx % 7 === 6) spanClasses = "md:col-span-6 row-span-2";
              else spanClasses = "md:col-span-4 row-span-1";

              if (img.span === "tall") spanClasses = "md:col-span-4 row-span-2";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, clipPath: rm ? "none" : "inset(10% 10% 10% 10%)" }}
                  whileInView={{ opacity: 1, clipPath: rm ? "none" : "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  exit={{ opacity: 0, scale: rm ? 1 : 0.95 }}
                  transition={{ duration: 0.8, ease: EXPO }}
                  key={img.id}
                  className={`group relative overflow-hidden cursor-pointer bg-navy-deep rounded-sm ${spanClasses}`}
                  onClick={() => openLightbox(idx)}
                >
                  <EditorialPlaceholder
                    aspectRatio="aspect-auto"
                    tone="dark"
                    contextLabel={img.category === "signature-sets" ? "SIGNATURE SET" : "EVENT PHOTOGRAPH"}
                    caption={img.alt.split("by Hamsalekha")[0].replace(/at an? Indian wedding.*|at a.*|staged by.*/i, '').trim()}
                    subline={`${img.eventType} · ${img.venue}${img.year ? ` · ${img.year}` : ""}`}
                    className="h-full w-full"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/60 transition duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 ease-out">
                      <p className="font-sans text-xs md:text-sm font-semibold tracking-widest text-cream/90 uppercase mb-2">
                        {img.eventType} · {img.venue} {img.year ? `· ${img.year}` : ""}
                      </p>
                      {img.catalogueHref && (
                        <a 
                          href={img.catalogueHref} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()} 
                          className="inline-flex items-center gap-2 font-display italic text-base text-gold-light hover:text-gold transition-colors"
                        >
                          Shop this setup <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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

            {/* Image Placeholder Wrapper */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: 0.5, ease: EXPO }}
              className="relative w-full max-w-4xl max-h-[82vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <EditorialPlaceholder
                aspectRatio="aspect-[16/10]"
                tone="dark"
                contextLabel={filtered[lightboxIdx].category === "signature-sets" ? "SIGNATURE SET" : "EVENT PHOTOGRAPH"}
                caption={filtered[lightboxIdx].alt}
                subline={`${filtered[lightboxIdx].eventType} · ${filtered[lightboxIdx].venue}${filtered[lightboxIdx].year ? ` · ${filtered[lightboxIdx].year}` : ""}`}
                className="w-full shadow-2xl"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
              <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-cream/80 font-medium">
                {filtered[lightboxIdx].eventType} · {filtered[lightboxIdx].venue} {filtered[lightboxIdx].year ? `· ${filtered[lightboxIdx].year}` : ""}
              </p>
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
        <div className="opacity-0 animate-fade-in-up">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
            {portfolioCTA.headline}
          </h2>
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button href={portfolioCTA.ctaHref} variant="primary" size="lg">
              {portfolioCTA.ctaLabel}
            </Button>
            <Button href={portfolioCTA.instagramHref} variant="outline" size="lg" external>
              {portfolioCTA.instagramLabel}
            </Button>
          </div>
        </div>
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
