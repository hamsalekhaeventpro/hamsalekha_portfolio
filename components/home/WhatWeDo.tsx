"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { services } from "@/lib/content";
import Image from "next/image";

export function WhatWeDo() {
  return (
    <Section tone="base" aria-label="Services Chapters">
      <div className="container-site flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="SERVICES"
            heading="The pillars of production."
            subHeading="Book one service or combine them for complete event execution."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors shrink-0 group uppercase tracking-wider"
          >
            View all services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-20 md:gap-32 mt-8">
          {services.map((s, i) => (
            <div key={s.title} className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image with clip reveal */}
              <div className="relative w-full lg:w-[55%] shrink-0">
                <Reveal delay={0.2} y={0} className="absolute -top-10 -left-6 lg:-top-16 lg:-left-12 font-display text-[10rem] lg:text-[14rem] leading-none font-bold text-navy-deep/[0.06] select-none z-0 pointer-events-none">
                  0{i + 1}
                </Reveal>
                <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-panel-warm shadow-xl">
                  <ClipReveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1} className="w-full h-full">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </ClipReveal>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-5 w-full lg:w-[45%]">
                <Reveal delay={0.3}>
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-gold-dark/50" />
                    <span className="font-sans text-eyebrow text-gold-dark uppercase tracking-[0.2em]">{s.eyebrow}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <h3 className="font-display text-4xl lg:text-5xl font-bold text-navy-deep leading-tight">
                    {s.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.5}>
                  <p className="font-sans text-lg text-text-slate leading-relaxed">
                    {s.description}
                  </p>
                </Reveal>
                <Reveal delay={0.6}>
                  <Link
                    href={s.ctaHref}
                    className="inline-flex items-center gap-2 mt-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors group/link tracking-wider uppercase"
                  >
                    {s.ctaLabel}
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

