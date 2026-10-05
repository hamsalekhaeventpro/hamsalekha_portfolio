"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioHero, featuredStories, galleryImages, portfolioCTA } from "@/lib/content";
import type { GalleryCategory } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { staggerDelay } from "@/lib/motion";

import { cn } from "@/lib/utils";

const filters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Celebrations", value: "celebrations" },
  { label: "Corporate", value: "corporate" },
  { label: "Signature Sets", value: "signature-sets" },
];

export default function PortfolioClient() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = active === "all" ? galleryImages : galleryImages.filter((img) => img.category === active);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      {/* Hero */}
      <Section tone="stage" className="pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(92,138,201,0.15), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <Reveal className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                {portfolioHero.eyebrow}
              </span>
            </div>
            <h1 className="font-display font-bold text-hero text-cream leading-[1.03]">
              {portfolioHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70 max-w-xl">
              {portfolioHero.subline}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Featured stories */}
      <Section tone="base">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading eyebrow="FEATURED STORIES" heading="Stages worth remembering." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredStories.map((story, i) => (
              <Reveal key={story.title} delay={staggerDelay(i)} className="bg-card-bg rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition card-gold-border">
                <div className="relative h-56">
                  <Image src={story.image} alt={story.imageAlt} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
                  <span className="absolute top-4 left-4 font-sans text-eyebrow text-gold-light bg-navy-deep/75 px-3 py-1.5 rounded-full border border-gold/20">{story.tag}</span>
                </div>
                <div className="p-7 flex flex-col gap-3">
                  <p className="font-sans text-eyebrow text-gold-dark uppercase">{story.subtitle}</p>
                  <h3 className="font-display text-h4 font-bold text-navy-deep">{story.title}</h3>
                  <div className="w-8 h-[2px] bg-gold/40 rounded-full" />
                  <p className="font-sans text-body text-text-slate line-clamp-3 leading-relaxed">{story.body}</p>
                  <a href={story.ctaHref} className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors mt-2">
                    {story.ctaLabel.endsWith("→") ? story.ctaLabel.slice(0, -1).trim() : story.ctaLabel}
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="panel">
        <div className="container-site flex flex-col gap-8">
          <SectionHeading eyebrow="GALLERY" heading="From our archive." />

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
            {filters.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={active === f.value}
                onClick={() => setActive(f.value)}
                className={cn(
                  "font-sans text-sm font-medium px-5 py-2.5 rounded-full border transition duration-200",
                  active === f.value
                    ? "bg-gold text-navy-deep border-gold"
                    : "bg-transparent text-text-navy border-[var(--border)] hover:border-gold/50"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          {/* Masonry grid */}
          <div
            className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  key={img.id}
                  className={cn("group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid", img.span === "tall" ? "aspect-[2/3]" : "aspect-[4/3]")}
                  onClick={() => openLightbox(idx)}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  {/* Hover overlay — visible by default on touch devices, hover-only on devices with pointer capability */}
                  <div className="absolute inset-0 bg-navy-deep/50 [@media(any-hover:hover)]:bg-navy-deep/0 [@media(any-hover:hover)]:group-hover:bg-navy-deep/50 transition duration-300 flex flex-col justify-end p-5">
                    <div className="translate-y-0 opacity-100 [@media(any-hover:hover)]:translate-y-4 [@media(any-hover:hover)]:opacity-0 [@media(any-hover:hover)]:group-hover:translate-y-0 [@media(any-hover:hover)]:group-hover:opacity-100 transition duration-300">
                      <p className="font-sans text-xs text-cream/80 mb-1">{img.eventType} · {img.venue} · {img.year}</p>
                      {img.catalogueHref && (
                        <a href={img.catalogueHref} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors">
                          Shop this setup <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Gold border ring on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-gold/60 transition duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-deep/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button className="absolute top-5 right-5 text-cream/70 hover:text-cream transition-colors z-10" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={28} />
            </button>
            {/* Prev */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-2" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
              <ChevronLeft size={32} />
            </button>
            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[lightboxIdx].src} alt={filtered[lightboxIdx].alt} fill className="object-contain" />
            </motion.div>
            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="font-sans text-sm text-cream/70">{filtered[lightboxIdx].eventType} · {filtered[lightboxIdx].venue} · {filtered[lightboxIdx].year}</p>
            </div>
            {/* Next */}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-2" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing */}
      <Section tone="stage" className="overflow-hidden" style={{ background: "var(--gradient-navy-band)" }}>
        <div className="container-site flex flex-col items-center text-center gap-6">
          <Reveal className="flex flex-col items-center gap-5">
            <h2 className="font-display text-h2 font-bold text-cream">{portfolioCTA.headline}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={portfolioCTA.ctaHref} variant="primary" size="lg">{portfolioCTA.ctaLabel}</Button>
              <Button href={portfolioCTA.instagramHref} variant="outline" size="lg" external>{portfolioCTA.instagramLabel}</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
