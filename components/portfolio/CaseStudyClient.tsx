"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";
import { microcopy } from "@/lib/content";

const EXPO = ease.expo;

interface CaseStudyClientProps {
  project: Project;
  nextProject: { slug: string; title: string };
}

export function CaseStudyClient({ project, nextProject }: CaseStudyClientProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const rm = useReducedMotion();

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const prev = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i - 1 + project.images.length) % project.images.length : null)),
    [project.images.length]
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i + 1) % project.images.length : null)),
    [project.images.length]
  );

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

  // Production Sheet Data Filter (renders ONLY fields with actual data)
  const productionEntries: { label: string; value: string }[] = [];
  if (project.production) {
    if (project.production.eventType) productionEntries.push({ label: "Event Type", value: project.production.eventType });
    if (project.production.venue) productionEntries.push({ label: "Venue", value: project.production.venue });
    if (project.production.date) productionEntries.push({ label: "Date", value: project.production.date });
    if (project.production.guestScale) productionEntries.push({ label: "Guest Scale", value: project.production.guestScale });
    if (project.production.structures) productionEntries.push({ label: "Structures", value: project.production.structures });
    if (project.production.furniture) productionEntries.push({ label: "Furniture", value: project.production.furniture });
    if (project.production.lighting) productionEntries.push({ label: "Lighting", value: project.production.lighting });
    if (project.production.power) productionEntries.push({ label: "Power", value: project.production.power });
    if (project.production.crew) productionEntries.push({ label: "Crew", value: project.production.crew });
    if (project.production.buildTime) productionEntries.push({ label: "Build Time", value: project.production.buildTime });
  }

  const whatsappHref = `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(
    `Hi Hamsalekha, I would like to enquire about ${project.title} (${project.slug}) for an upcoming event.`
  )}`;

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <Section tone="stage" className="pt-36 pb-20 overflow-hidden relative border-b border-gold/15">
        <div className="container-site relative z-10 flex flex-col gap-8 max-w-5xl mx-auto">
          {/* Back Link */}
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-light hover:text-cream transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Portfolio</span>
            </Link>
          </Reveal>

          {/* Eyebrow & Title */}
          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold/50" />
                <span className="font-sans text-[0.7rem] uppercase font-bold tracking-[0.22em] text-gold-light">
                  {project.category.toUpperCase()}{project.year ? ` · ${project.year}` : ""}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-cream leading-[1.08]">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-sans text-lg sm:text-xl text-cream/75 max-w-3xl leading-relaxed mt-2">
                {project.summary}
              </p>
            </Reveal>
          </div>

          {/* Hero Image */}
          {project.images?.[0] && (
            <Reveal delay={0.4}>
              <div 
                className="relative overflow-hidden rounded-sm aspect-[16/10] sm:aspect-[21/9] w-full shadow-2xl border border-gold/15 bg-navy-deep mt-4 cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 bg-navy-deep/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-gold/20 text-cream/80 font-sans text-xs tracking-wider uppercase">
                  Click to expand
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      {/* ── 2. NARRATIVE & PRODUCTION SHEET ──────────────────── */}
      <Section tone="base" className="py-20 lg:py-28 border-b border-navy-deep/10">
        <div className="container-site grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Story */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold-dark/40" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                  ABOUT THIS STAGE
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep leading-snug">
                Execution, craftsmanship & scale.
              </h2>
            </Reveal>

            <div className="flex flex-col gap-5 text-text-slate font-sans text-base sm:text-lg leading-relaxed mt-2">
              {project.story.map((paragraph, idx) => (
                <Reveal key={idx} delay={0.15 + idx * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Production Sheet */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="bg-panel-warm rounded-sm border border-navy-deep/15 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <div>
                  <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark block mb-1">
                    SPECIFICATION
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-deep">
                    Production Sheet
                  </h3>
                  <p className="font-sans text-xs text-text-slate/70 mt-1">
                    Verified technical specifications delivered by Hamsalekha.
                  </p>
                </div>

                <div className="w-full h-px bg-navy-deep/10" />

                {productionEntries.length > 0 ? (
                  <dl className="flex flex-col gap-4 font-sans text-sm">
                    {productionEntries.map((item) => (
                      <div key={item.label} className="grid grid-cols-12 gap-2 py-2 border-b border-navy-deep/5 last:border-b-0">
                        <dt className="col-span-4 font-semibold text-navy-deep text-xs uppercase tracking-wider">
                          {item.label}
                        </dt>
                        <dd className="col-span-8 text-text-slate tabular-nums font-medium text-right sm:text-left">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="font-sans text-xs italic text-text-slate/70">
                    Production specifications confirmed upon site survey.
                  </p>
                )}

                <div className="pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy-deep text-cream hover:bg-gold-dark hover:text-navy-deep transition-colors py-3 px-4 rounded-sm font-sans text-xs font-bold uppercase tracking-widest"
                  >
                    <MessageCircle size={15} />
                    <span>Enquire about this setup</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </Section>

      {/* ── 3. ADDITIONAL IMAGES GALLERY ─────────────────────── */}
      {project.images.length > 1 && (
        <Section tone="base" className="py-20 border-b border-navy-deep/10">
          <div className="container-site flex flex-col gap-10">
            <Reveal>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark block mb-1">
                    GALLERY
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
                    Additional Perspectives
                  </h3>
                </div>
              </div>
            </Reveal>

            {/* Mobile Swipe / Desktop Grid */}
            <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-sm aspect-[4/3] bg-navy-deep min-w-[80vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0 md:shrink cursor-pointer group shadow-sm border border-navy-deep/10"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/40 transition-colors duration-300 flex items-end p-4">
                    <span className="font-sans text-xs text-cream/90 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View photo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. CLOSING CTA & NEXT PROJECT ─────────────────────── */}
      <Section tone="stage" className="py-24 border-t border-gold/15 relative overflow-hidden">
        <div className="container-site flex flex-col items-center text-center gap-8 max-w-3xl mx-auto relative z-10">
          <Reveal>
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.22em] text-gold-light block">
              NEXT STEPS
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-cream leading-tight">
              Plan a setup like this.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-cream/70 max-w-xl mx-auto">
              Every venue has distinct load limits, power requirements and spatial dimensions. Speak with our production supervisors about your date and location.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Button href={whatsappHref} variant="primary" size="lg" external>
                Enquire on WhatsApp
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Plan Your Event
              </Button>
            </div>
          </Reveal>

          {/* Next Project Footer */}
          <div className="w-full pt-16 mt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/portfolio"
              className="font-sans text-xs uppercase tracking-widest text-cream/60 hover:text-cream transition-colors"
            >
              ← All Portfolio Projects
            </Link>
            
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-light hover:text-cream transition-colors group"
            >
              <span>Next Project: {nextProject.title}</span>
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Section>

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
            <button
              className="absolute top-6 right-6 text-cream/50 hover:text-cream transition-colors z-10 p-2"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: rm ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: EXPO }}
              className="relative w-full max-w-5xl h-[72vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src={project.images[lightboxIdx].src}
                  alt={project.images[lightboxIdx].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4" onClick={(e) => e.stopPropagation()}>
              <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-cream/80 font-medium">
                {project.images[lightboxIdx].alt}
              </p>
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={40} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
