"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";
import { ease } from "@/lib/motion";
import { projects } from "@/lib/projects";

const EXPO = ease.expo;

export function PortfolioPreview() {
  const preview = projects.slice(0, 4);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const rm = useReducedMotion();

  const getProjectHref = (slug: string) => {
    if (slug === "glass-house" || slug === "moongate") {
      return `/signature-sets#${slug}`;
    }
    return `/portfolio#${slug}`;
  };

  const getProjectTag = (slug: string, category: string) => {
    if (slug === "glass-house") return "SIGNATURE SET · 2026";
    if (slug === "moongate") return "SIGNATURE SET";
    if (slug === "bwf-meet-up-4") return "TRADE PARTNERSHIP";
    if (slug === "eden-gardens-palace-grounds") return "ARCHIVAL CHAPTER";
    return category.toUpperCase();
  };

  return (
    <Section tone="base" aria-label="Portfolio Preview">
      <div className="container-site flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="PORTFOLIO PREVIEW"
            heading="Recent stages."
            subHeading="Weddings, celebrations and corporate events, built by Hamsalekha."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-text hover:text-navy-deep transition-colors shrink-0 group uppercase tracking-wider"
          >
            VIEW PORTFOLIO
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial mixed grid */}
        <div ref={ref} className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(220px,auto)] md:auto-rows-[minmax(260px,auto)]">
          {preview.map((project, i) => {
            const delay = rm ? 0 : Math.min(i * 0.08, 0.45);
            
            // Grid cell classes based on index (4 projects layout)
            let gridClass = "col-span-12 md:col-span-6";
            let sizes = "(max-width: 768px) 100vw, 50vw";
            
            if (i === 0) { // The Glass House
              gridClass = "col-span-12 md:col-span-7 row-span-2";
              sizes = "(max-width: 768px) 100vw, 60vw";
            } else if (i === 1) { // MoonGate
              gridClass = "col-span-12 md:col-span-5 row-span-1";
              sizes = "(max-width: 768px) 100vw, 40vw";
            } else if (i === 2) { // BWF Meet Up
              gridClass = "col-span-12 sm:col-span-6 md:col-span-5 row-span-1";
              sizes = "(max-width: 768px) 100vw, 40vw";
            } else if (i === 3) { // Eden Gardens
              gridClass = "col-span-12 md:col-span-12 row-span-1";
              sizes = "100vw";
            }

            const hasRealImage = project.slug === "glass-house" || project.slug === "moongate";
            const tag = getProjectTag(project.slug, project.category);
            const targetHref = getProjectHref(project.slug);

            return (
              <motion.div
                key={project.slug}
                initial={rm ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay, ease: EXPO }}
                className={`relative overflow-hidden bg-navy-deep rounded-sm border border-gold/15 group ${gridClass} min-h-[220px]`}
              >
                <Link href={targetHref} className="block w-full h-full relative">
                  {hasRealImage ? (
                    <>
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        sizes={sizes}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <EditorialPlaceholder
                      aspectRatio="aspect-auto"
                      tone="dark"
                      contextLabel={project.slug.includes("eden") ? "ARCHIVAL PHOTOGRAPH" : "EVENT PHOTOGRAPH"}
                      caption={project.title}
                      subline={project.summary}
                      className="w-full h-full"
                    />
                  )}

                  {/* Editorial Tag & Title: Always distinct semantic nodes */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end bg-gradient-to-t from-navy-deep/95 via-navy-deep/60 to-transparent pointer-events-none">
                    <span className="block font-sans text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-gold-light font-semibold mb-1.5">
                      {tag}
                    </span>
                    <h3 className="block font-display text-lg md:text-xl font-bold text-cream leading-tight drop-shadow-md group-hover:text-gold-light transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
