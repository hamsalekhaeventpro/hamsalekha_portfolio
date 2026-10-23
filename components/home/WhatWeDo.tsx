"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ServiceTicker } from "./ServiceTicker";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";

const reorderedServices = [
  { ...services[5], sectionHref: "/services#production", num: "01", origIdx: 5 },
  { ...services[0], sectionHref: "/services#lighting", num: "02", origIdx: 0 },
  { ...services[1], sectionHref: "/services#power", num: "03", origIdx: 1 },
  { ...services[2], sectionHref: "/services#truss", num: "04", origIdx: 2 },
  { ...services[3], sectionHref: "/services#furniture", num: "05", origIdx: 3 },
  { ...services[4], sectionHref: "/services#decor", num: "06", origIdx: 4 },
];


export function WhatWeDo() {
  const rm = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mobile: no scroll-jacking needed — vertical card layout uses simple fade-up reveals

  // Desktop & Tablet intersection observer
  const initObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isTablet || window.innerWidth < 768) return;

    const vh = window.innerHeight;
    const marginY = Math.floor(vh * 0.30);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) {
              setActiveIndex((prev) => (prev !== idx ? idx : prev));
            }
          }
        });
      },
      {
        rootMargin: `-${marginY}px 0px -${marginY}px 0px`,
        threshold: 0,
      }
    );

    const targetClass = isDesktop ? ".desktop-navigator-item" : ".mobile-service-item";
    document.querySelectorAll(targetClass).forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, []);

  useEffect(() => {
    initObserver();
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(initObserver, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, [initObserver]);



  return (
    <Section id="services" tone="stage" className="py-0 border-b border-navy-deep/10">

      {/* =========================================================================
          1. MOBILE EXPERIENCE (< 768px): VERTICAL EDITORIAL CARD SEQUENCE
          ========================================================================= */}
      <div className="block md:hidden bg-navy-deep py-16 px-5">
        {/* Section Header */}
        <motion.div
          initial={rm ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="mb-8"
        >
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-bold text-gold block mb-2">
            SERVICES
          </span>
          <h2 className="font-display text-2xl font-bold text-cream leading-tight">
            The pillars of production.
          </h2>
          <p className="font-sans text-sm text-cream/70 mt-2 leading-relaxed">
            Book one service or combine them for complete execution.
          </p>
        </motion.div>

        {/* Vertical Card Stack */}
        <div className="flex flex-col gap-4">
          {reorderedServices.map((s, i) => {
            const cleanCtaLabel = s.ctaLabel.replace(/\u2192/g, "").trim();
            const delay = rm ? 0 : Math.min(i * 0.08, 0.4);

            return (
              <motion.div
                key={`mob-service-${s.title}`}
                initial={rm ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={s.sectionHref}
                  className="block rounded-sm overflow-hidden relative aspect-[16/10] border border-white/10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {/* Background Image & Bottom Scrim */}
                  <div className="absolute inset-0 z-0 bg-navy-deep">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="92vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <EditorialPlaceholder
                        aspectRatio="aspect-auto"
                        tone="dark"
                        contextLabel="SERVICE"
                        className="w-full h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col">
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] font-bold text-gold uppercase mb-1">
                      {s.num}
                    </span>
                    <h3 className="font-display text-xl font-bold text-cream mb-1.5 leading-tight">
                      {s.title}
                    </h3>
                    <p className="font-sans text-xs text-cream/80 line-clamp-2 leading-relaxed mb-3">
                      {s.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-bold text-gold-light uppercase tracking-wider group-hover:text-gold transition-colors duration-300">
                      {cleanCtaLabel}
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. TABLET & DESKTOP (>= 768px): FULL PRESERVATION OF EXISTING LAYOUT
          ========================================================================= */}
      <div className="hidden md:block py-24 lg:py-32">
        <div className="container-site flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between relative z-10">
            <SectionHeading
              eyebrow="SERVICES"
              heading="The pillars of production."
              subHeading="Book one service or combine them for complete event execution."
              className="max-w-xl"
            />
            <ServiceTicker />
          </div>

          <div className="relative flex flex-col lg:flex-row w-full lg:items-start lg:gap-16">

            {/* LEFT COLUMN: Semantic Content (Tablet) & Cinematic Image (Desktop) */}
            <div className="relative w-full lg:w-1/2 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:rounded-sm lg:overflow-hidden lg:bg-navy-deep lg:border lg:border-white/5">

              {/* DESKTOP-ONLY CROSSFADE IMAGE STAGE */}
              <div className="
                hidden lg:block shrink-0
                lg:absolute lg:inset-0
                lg:w-full lg:h-full
                rounded-sm overflow-hidden z-0
                bg-navy-deep isolate
              ">
                {reorderedServices.map((s, i) => (
                  <div
                    key={`stage-img-${s.title}`}
                    className={cn(
                      "absolute inset-0 transition-opacity w-full h-full",
                      rm ? (activeIndex === i ? "opacity-100" : "opacity-0") : (activeIndex === i ? "opacity-100 duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]" : "opacity-0 duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]")
                    )}
                    style={{ pointerEvents: activeIndex === i ? 'auto' : 'none' }}
                    aria-hidden={activeIndex !== i}
                  >
                    {s.image ? (
                      <Image src={s.image} alt={s.imageAlt} fill sizes="50vw" className="object-cover" />
                    ) : (
                      <EditorialPlaceholder aspectRatio="aspect-auto" tone="dark" contextLabel="SERVICE" className="w-full h-full" />
                    )}
                    <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                  </div>
                ))}
              </div>

              {/* SEMANTIC CONTENT LIST (Tablet Grid, Desktop Stack) */}
              <div className="grid md:grid-cols-2 lg:block relative z-10 w-full lg:h-full gap-4 lg:gap-0">
                {reorderedServices.map((s, i) => {
                  const cleanCtaLabel = s.ctaLabel.replace(/\u2192/g, '').trim();
                  const isItemActive = activeIndex === i;

                  return (
                    <Link
                      key={`content-${s.title}`}
                      href={s.sectionHref}
                      data-index={i}
                      className={cn(
                        "mobile-service-item block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold group",

                        // Tablet Base Styling
                        "bg-navy-deep rounded-sm border border-white/5 overflow-hidden flex flex-col",

                        // Tablet Grid Span
                        s.origIdx === 5 ? "md:col-span-2" : "md:col-span-1",

                        // Desktop Absolute Stack Styling
                        "lg:bg-transparent lg:border-none lg:rounded-none",
                        "lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-end lg:p-12 lg:pointer-events-none",
                        "lg:transition-[opacity,transform] lg:duration-500 lg:ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                        activeIndex === i ? "lg:opacity-100 lg:translate-y-0 lg:z-10" : "lg:opacity-0 lg:translate-y-8 lg:z-0"
                      )}
                    >
                      {/* TABLET-ONLY STATIC IMAGE */}
                      <div className={cn(
                        "block lg:hidden relative w-full shrink-0",
                        s.origIdx === 5 ? "aspect-[21/9]" : "aspect-[4/3]"
                      )}>
                        {s.image ? (
                          <Image src={s.image} alt={s.imageAlt} fill sizes="50vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" />
                        ) : (
                          <EditorialPlaceholder aspectRatio="aspect-auto" tone="dark" contextLabel="SERVICE" className="w-full h-full" />
                        )}
                      </div>

                      {/* TEXT CONTENT */}
                      <div className="p-6 md:p-8 lg:p-0 flex flex-col flex-1 justify-center md:justify-between lg:justify-end lg:pointer-events-auto">

                         {/* Title Row */}
                         <div className="flex justify-between items-center w-full">
                           <div className="flex flex-col">
                             <span className={cn(
                               "font-sans text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-1 md:mb-3 block transition-colors duration-500",
                               isItemActive ? "text-gold" : "text-gold"
                             )}>
                               {s.num}
                             </span>
                             <h3 className={cn(
                               "font-display font-bold leading-tight transition-colors duration-500 text-cream",
                               s.origIdx === 5 ? "text-2xl md:text-4xl lg:text-3xl" : "text-xl md:text-3xl lg:text-4xl"
                             )}>
                               {s.title}
                             </h3>
                           </div>
                         </div>

                         {/* Description */}
                         <div className="grid grid-rows-[1fr] opacity-100 mt-4 lg:mt-0 lg:block">
                           <div className="overflow-hidden flex flex-col">
                             <p className="font-sans text-sm md:text-base text-cream/70 leading-relaxed mb-6 lg:mb-8 lg:max-w-md">
                               {s.description}
                             </p>
                             <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light group-hover:text-gold transition-colors duration-300 tracking-wider uppercase mt-2 lg:mt-0 w-max group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm pb-1 md:pb-0">
                               {cleanCtaLabel}
                               <ArrowRight size={15} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                             </span>
                           </div>
                         </div>

                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Desktop Vertical Navigator */}
            <div className="hidden lg:flex lg:flex-col lg:w-1/2 lg:py-[40vh] lg:pl-16 relative z-0">
              {reorderedServices.map((s, i) => {
                 const isActive = activeIndex === i;
                 return (
                   <button
                     key={`nav-${s.title}`}
                     data-index={i}
                     onClick={() => {
                       const el = document.querySelector(`.desktop-navigator-item[data-index="${i}"]`);
                       if (el) {
                         el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                       }
                     }}
                     className={cn(
                       "desktop-navigator-item group text-left flex items-center gap-8 py-8 border-b border-white/5 last:border-none transition-[opacity,transform] duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                       isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                     )}
                     aria-current={isActive ? "true" : undefined}
                     aria-label={`Scroll to ${s.title}`}
                   >
                     <div className={cn(
                       "relative overflow-hidden rounded-sm transition-[width,border-color,box-shadow] duration-500 shrink-0 bg-navy-deep",
                       isActive ? "w-24 aspect-[4/3] border border-gold/30 shadow-lg shadow-gold/10" : "w-12 aspect-[4/3] border border-white/10"
                     )}>
                       {s.image ? (
                         <Image src={s.image} alt={s.imageAlt} fill sizes="10vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]" />
                       ) : (
                         <EditorialPlaceholder aspectRatio="aspect-auto" tone="dark" contextLabel="IMG" className="w-full h-full" />
                       )}
                     </div>

                     <div className="flex flex-col gap-1">
                       <span className={cn(
                         "font-sans text-[0.65rem] tracking-[0.2em] uppercase font-bold transition-colors duration-500",
                         isActive ? "text-gold" : "text-white/50"
                       )}>
                         {s.num}
                       </span>
                       <h4 className={cn(
                         "font-display transition-[font-size,color,font-weight] duration-500",
                         isActive ? "text-3xl text-cream font-bold" : "text-xl text-cream/70"
                       )}>
                         {s.title}
                       </h4>
                     </div>
                   </button>
                 );
              })}
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
}
