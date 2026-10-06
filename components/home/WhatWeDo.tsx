"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-4">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={0.1 + i * 0.1}
              className="group flex flex-col bg-white border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all duration-400"
            >
              {/* Image Header */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle gradient overlay to separate image from card */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Card Body */}
              <div className="flex flex-col flex-grow p-6 lg:p-8 gap-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-deep">
                    {s.title}
                  </h3>
                  <span className="font-sans text-[0.65rem] font-bold text-gold-dark tracking-widest uppercase">
                    0{i + 1}
                  </span>
                </div>
                
                <p className="font-sans text-text-slate leading-relaxed flex-grow">
                  {s.description}
                </p>
                
                <div className="pt-4 mt-2 border-t border-gold/10">
                  <Link
                    href={s.ctaHref}
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark group-hover:text-gold transition-colors tracking-wider uppercase"
                  >
                    {s.ctaLabel}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

