"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useState, useEffect, useRef } from "react";

interface ServiceCardProps {
  number: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  href: string;
  className?: string;
  imageClassName?: string;
}

function EditorialCard({
  number,
  title,
  tagline,
  image,
  imageAlt,
  href,
  className = "",
  imageClassName = "",
}: ServiceCardProps) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth < 1024) {
          setInView(entry.isIntersecting);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={href}
      data-inview={inView}
      className={`group block relative overflow-hidden bg-navy-deep rounded-3xl card-gold-border ${className}`}
    >
      {/* Background Image with subtle zoom */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-data-[inview=true]:scale-[1.04] ${imageClassName}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
        {/* Navy Overlay */}
        <div className="absolute inset-0 bg-navy-deep/25 group-hover:bg-navy-deep/65 group-data-[inview=true]:bg-navy-deep/65 transition-colors duration-500" />
      </div>

      {/* Ghost watermark number — Figma pattern */}
      <span className="absolute top-4 right-6 font-display text-[6rem] font-bold text-cream/8 leading-none pointer-events-none select-none z-0">
        {number}
      </span>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between min-h-[420px]">
        <div className="flex items-center gap-4 text-cream/90 overflow-hidden">
          <span className="font-display text-lg font-bold text-gold-light/80">{number}</span>
          <span className="w-8 h-px bg-gold/30" />
          <h3 className="font-sans text-xs tracking-[0.22em] uppercase font-semibold text-cream/80">
            {title}
          </h3>
        </div>

        <div className="flex flex-col gap-4 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-data-[inview=true]:translate-y-0 group-data-[inview=true]:opacity-100 transition-all duration-500 ease-out">
          <p className="font-display text-2xl md:text-3xl font-medium text-cream max-w-lg leading-snug">
            {tagline}
          </p>
          <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light">
            Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 group-data-[inview=true]:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WhatWeDo() {
  const furniture = services.find((s) => s.title.includes("Furniture"))!;
  const lighting = services.find((s) => s.title.includes("Lighting"))!;
  const truss = services.find((s) => s.title.includes("Truss"))!;
  const decor = services.find((s) => s.title.includes("Decor"))!;

  return (
    <section className="section-py bg-bg-panel" aria-label="Services Chapters">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading
          eyebrow="SERVICES"
          heading="The pillars of production."
          subHeading="Book one service or combine them for complete event execution."
        />

        <div className="flex flex-col gap-5">
          {/* Furniture - Full Width */}
          <RevealOnScroll>
            <EditorialCard
              number="01"
              title="FURNITURE"
              tagline="A seat for every occasion. 10,000+ chairs and 60+ sofa designs."
              image={furniture.image}
              imageAlt={furniture.imageAlt}
              href="/services"
              imageClassName="opacity-90"
            />
          </RevealOnScroll>

          {/* Lighting & Truss - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-5">
            <RevealOnScroll delay={0.1}>
              <EditorialCard
                number="02"
                title="LIGHTING & POWER"
                tagline="Light that sets the mood. Power that never blinks."
                image={lighting.image}
                imageAlt={lighting.imageAlt}
                href="/services"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <EditorialCard
                number="03"
                title="TRUSS & STAGING"
                tagline="Structures engineered to hold the moment."
                image={truss.image}
                imageAlt={truss.imageAlt}
                href="/services"
              />
            </RevealOnScroll>
          </div>

          {/* Decor - Full Width */}
          <RevealOnScroll delay={0.1}>
            <EditorialCard
              number="04"
              title="DECOR & ACCESSORIES"
              tagline="The details guests remember."
              image={decor.image}
              imageAlt={decor.imageAlt}
              href="/services"
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
