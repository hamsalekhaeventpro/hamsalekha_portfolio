"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { signatureSets } from "@/lib/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/** Left-to-centre navy scrim — protects text without darkening the whole image */
const LEFT_SCRIM =
  "linear-gradient(90deg, rgba(15,38,71,0.82) 0%, rgba(15,38,71,0.60) 25%, rgba(15,38,71,0.25) 48%, transparent 65%)";

export function SignatureFeature() {
  const glassHouse = signatureSets[0];
  const moongate = signatureSets[1];

  const glassHouseRef = useRef<HTMLDivElement>(null);
  const moongateRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollY1 } = useScroll({
    target: glassHouseRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollY1, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: scrollY2 } = useScroll({
    target: moongateRef,
    offset: ["start end", "end start"],
  });
  const y2 = useTransform(scrollY2, [0, 1], ["-12%", "12%"]);

  return (
    <section className="bg-navy-deep py-24 md:py-32" aria-label="Signature Sets">
      <div className="container-site flex flex-col gap-8 md:gap-20">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center gap-5">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <h2 className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                Signature Sets
              </h2>
              <span className="h-px w-10 bg-gold/50" />
            </div>
            <h3 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold text-cream max-w-2xl">
              Sets that define the space.
            </h3>
          </div>
        </RevealOnScroll>

        {/* 1. Glass House — Full viewport height */}
        <div
          ref={glassHouseRef}
          className="relative rounded-3xl overflow-hidden min-h-[75vh] md:min-h-[88vh] flex flex-col justify-end group card-gold-border"
        >
          <motion.div style={{ y: y1 }} className="absolute inset-[-15%] z-0">
            <Image
              src={glassHouse.image}
              alt={glassHouse.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Bottom-up gradient — base text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
          {/* Left-side localized scrim — protects badge + CTA from bright image areas */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: LEFT_SCRIM }}
          />

          <div className="relative z-20 p-8 md:p-16 flex flex-col items-start gap-5 max-w-3xl">
            <RevealOnScroll>
              {/* Badge */}
              <span
                className="inline-flex px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold-light mb-2"
                style={{ textShadow: "0 1px 4px rgba(15,38,71,0.7)" }}
              >
                South India&apos;s First · Launched 2026
              </span>
              {/* Title */}
              <h4 className="font-display text-[clamp(3rem,7vw,7rem)] font-bold text-cream leading-[0.95]">
                {glassHouse.title}
              </h4>
              {/* Gold hairline rule */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light my-4" />
              <p className="font-sans text-lg md:text-xl text-cream/80 mb-6 max-w-lg">
                {glassHouse.headline}
              </p>
              <Link
                href={glassHouse.ctaHref}
                className="inline-flex items-center gap-2 font-sans font-semibold text-gold-light hover:text-gold transition-colors group/link"
                style={{ textShadow: "0 1px 6px rgba(15,38,71,0.8)" }}
              >
                Enquire about The Glass House{" "}
                <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>

        {/* 2. MoonGate — Full viewport height */}
        <div
          ref={moongateRef}
          className="relative rounded-3xl overflow-hidden min-h-[75vh] md:min-h-[88vh] flex flex-col justify-end group card-gold-border"
        >
          <motion.div style={{ y: y2 }} className="absolute inset-[-15%] z-0">
            <Image
              src={moongate.image}
              alt={moongate.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Bottom-up gradient — base text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
          {/* Left-side localized scrim — protects text from bright image areas */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: LEFT_SCRIM }}
          />

          <div className="relative z-20 p-8 md:p-16 flex flex-col items-start gap-5 max-w-3xl">
            <RevealOnScroll>
              <span className="inline-flex px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold-light mb-2">
                Signature Set
              </span>
              <h4 className="font-display text-[clamp(3rem,7vw,7rem)] font-bold text-cream leading-[0.95]">
                {moongate.title}
              </h4>
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light my-4" />
              <p className="font-sans text-lg md:text-xl text-cream/80 mb-6 max-w-lg">
                {moongate.headline}
              </p>
              <Link
                href={moongate.ctaHref}
                className="inline-flex items-center gap-2 font-sans font-semibold text-gold-light hover:text-gold transition-colors group/link"
              >
                Enquire about MoonGate{" "}
                <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
