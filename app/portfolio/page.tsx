"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioHero, galleryImages, portfolioCTA } from "@/lib/content";
import type { GalleryCategory } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

const filters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Celebrations", value: "celebrations" },
  { label: "Corporate", value: "corporate" },
  { label: "Signature Sets", value: "signature-sets" },
];

export default function PortfolioPage() {
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

  // Keyboard navigation for lightbox
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
    <>
      {/* Hero */}
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

      {/* Gallery Section */}
      <Section tone="base" className="py-20 lg:py-32 min-h-screen">
        <div className="container-site flex flex-col gap-16">
          
          {/* Editorial Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12" role="tablist" aria-label="Filter gallery">
            {filters.map((f) => {
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.value)}
                  className={`relative font-sans text-sm md:text-base uppercase tracking-widest transition-colors duration-300 py-2 ${
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
            className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => {
                // Determine asymmetric layout span based on index/sequence
                // 1 large dominant (col-span-8 row-span-2)
                // 2 supporting (col-span-4 row-span-1 each)
                // 1 wide cinematic (col-span-12 row-span-2)
                // smaller images (col-span-4 row-span-1, col-span-6 row-span-2)
                let spanClasses = "md:col-span-4 row-span-1";
                if (idx % 7 === 0) spanClasses = "md:col-span-8 row-span-2"; // Dominant
                else if (idx % 7 === 3) spanClasses = "md:col-span-12 row-span-2"; // Wide Cinematic
                else if (idx % 7 === 5 || idx % 7 === 6) spanClasses = "md:col-span-6 row-span-2"; // Medium blocks
                else spanClasses = "md:col-span-4 row-span-1"; // Supporting

                // Override with explicit 'span' property if available in data
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
                    className={`group relative overflow-hidden cursor-pointer bg-navy-deep ${spanClasses}`}
                    onClick={() => openLightbox(idx)}
                  >
                    <Image 
                      src={img.src} 
                      alt={img.alt} 
                      fill 
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/40 transition duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-700 ease-out">
                        <p className="font-sans text-xs md:text-sm font-semibold tracking-widest text-cream/90 uppercase mb-2">
                          {img.eventType} · {img.venue} {img.year ? `· ${img.year}` : ""}
                        </p>
                        {img.catalogueHref && (
                          <a 
                            href={img.catalogueHref} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()} 
                            className="inline-flex items-center gap-2 font-display italic text-lg text-gold-light hover:text-gold transition-colors"
                          >
                            Shop this setup <ExternalLink size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
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
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-navy-deep flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button 
              className="absolute top-6 right-6 text-cream/50 hover:text-cream transition-colors z-10" 
              onClick={closeLightbox} 
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream transition-colors z-10 p-2" 
              onClick={(e) => { e.stopPropagation(); prev(); }} 
              aria-label="Previous image"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Image Wrapper */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: 0.6, ease: EXPO }}
              className="relative w-full h-full max-h-[85vh] max-w-6xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={filtered[lightboxIdx].src} 
                alt={filtered[lightboxIdx].alt} 
                fill 
                className="object-contain" 
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4">
              <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-cream/70">
                {filtered[lightboxIdx].eventType} · {filtered[lightboxIdx].venue} {filtered[lightboxIdx].year ? `· ${filtered[lightboxIdx].year}` : ""}
              </p>
            </div>

            {/* Next */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream transition-colors z-10 p-2" 
              onClick={(e) => { e.stopPropagation(); next(); }} 
              aria-label="Next image"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <Section tone="stage" className="py-24 relative overflow-hidden text-center border-t border-gold/10">
        <div className="container-site relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
              {portfolioCTA.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto" />
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
    </>
  );
}
