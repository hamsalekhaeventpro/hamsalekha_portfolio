"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { founder } from "@/lib/content";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";

const STATEMENT_LINE_1 = ["An", "event", "production", "house,"];
const STATEMENT_LINE_2 = ["not", "a", "rental", "counter."];
const STATEMENT_TOTAL_WORDS = 8;

const PARAGRAPH_TEXT =
  "Hamsalekha began in 2006 with general lighting, prepared inside a family home by a team of two or three. Twenty years later, the same belief drives every build: keep moving forward, and let one opportunity lead to the next.";

// Animation timing & easing specifications from design prompt
const EASE_SPEC = [0.2, 0.7, 0.2, 1] as const;

function subscribeWindow(callback: () => void) {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
}

function getIsDesktopSnapshot() {
  return typeof window !== "undefined" && window.innerWidth >= 900;
}

export function HomeIntro() {
  const rm = useReducedMotion();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDesktop = useSyncExternalStore(
    subscribeWindow,
    getIsDesktopSnapshot,
    () => false
  );

  // References for scroll calculations
  const yearRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const founderCardRef = useRef<HTMLDivElement>(null);

  // 1. Year Counter State (2006 -> 2026)
  const [displayYear, setDisplayYear] = useState(2006);
  const currentYearRef = useRef(2006);

  // 2. Statement Illumination State (0 -> 8 words)
  const [statementIlluminated, setStatementIlluminated] = useState(0);
  const currentStatementCountRef = useRef(0);



  // Global window scroll tracking
  const { scrollY } = useScroll();

  // 4. Desktop-only founder portrait drift
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: founderCardRef,
    offset: ["start end", "end start"],
  });
  const driftY = useTransform(cardScrollProgress, [0, 1], [-18, 18]);

  const updateCalculations = () => {
    if (rm) return;
    const vh = window.innerHeight;

    // Section 2: Year calculation
    // progress = (vh * 0.85 - elementTop) / (vh * 0.62)
    // year = Math.round(2006 + 20 * progress)
    if (yearRef.current) {
      const rect = yearRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.62)));
      const calculatedYear = Math.round(2006 + 20 * progress);
      if (calculatedYear !== currentYearRef.current) {
        currentYearRef.current = calculatedYear;
        setDisplayYear(calculatedYear);
      }
    }

    // Section 3: Statement word illumination
    // progress = (vh * 0.82 - elementTop) / (vh * 0.5)
    if (statementRef.current) {
      const rect = statementRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh * 0.82 - rect.top) / (vh * 0.5)));
      const count = Math.min(
        STATEMENT_TOTAL_WORDS,
        Math.max(0, Math.round(progress * STATEMENT_TOTAL_WORDS))
      );
      if (count !== currentStatementCountRef.current) {
        currentStatementCountRef.current = count;
        setStatementIlluminated(count);
      }
    }
  };

  // Re-calculate on window scroll events
  useMotionValueEvent(scrollY, "change", updateCalculations);

  // Resize listener
  useEffect(() => {
    window.addEventListener("resize", updateCalculations, { passive: true });
    return () => window.removeEventListener("resize", updateCalculations);
  });

  // Section 4: Subheading and Story Link Reveal (threshold: 20% visible, duration: 0.9s, y: 28px -> 0px)
  const revealVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: EASE_SPEC,
      },
    },
  };

  return (
    <section
      className="relative bg-bg-base text-text-slate py-16 sm:py-24 md:py-36 lg:py-44 overflow-hidden"
      aria-label="Company Story Intro"
    >
      <div className="container-site relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* 1. THE LARGE OUTLINED YEAR (Scroll-driven 2006 -> 2026) */}
          <div
            ref={yearRef}
            className="relative flex justify-center items-center w-full select-none pointer-events-none mb-8 md:mb-12 overflow-hidden h-[clamp(5rem,14vw,11.5rem)]"
            aria-hidden="true"
          >
            <span className="font-display font-bold tabular-nums text-[clamp(4.5rem,13vw,10.5rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-gold-border)] md:[-webkit-text-stroke:1.5px_var(--color-gold-border)] drop-shadow-[0_0_24px_rgba(192,155,48,0.12)] tracking-tight inline-block">
              {rm ? 2026 : displayYear}
            </span>
            <span className="sr-only">Hamsalekha journey from 2006 to 2026</span>
          </div>

          {/* Minimal gold accent rule */}
          <div className="w-16 h-px bg-gold-dark/50 mb-8 md:mb-10" />

          {/* 2. “An event production house, not a rental counter.” (Word-by-word illumination) */}
          <h2
            ref={statementRef}
            className="font-display font-bold text-navy-deep leading-[1.08] tracking-tight text-[clamp(2.25rem,5vw,4.25rem)] max-w-4xl"
          >
            <span className="sr-only">An event production house, not a rental counter.</span>
            <span aria-hidden="true">
              <span className="block">
                {STATEMENT_LINE_1.map((word, idx) => {
                  const isLit = rm || !isClient || idx < statementIlluminated;
                  return (
                    <span
                      key={idx}
                      style={{
                        opacity: isLit ? 1 : 0.2,
                        transition: "opacity 350ms ease",
                      }}
                      className="inline-block mr-[0.25em] last:mr-0"
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
              <span className="block font-cormorant italic text-gold-dark font-normal mt-2 md:mt-4">
                {STATEMENT_LINE_2.map((word, idx) => {
                  const overallIdx = 4 + idx;
                  const isLit = rm || !isClient || overallIdx < statementIlluminated;
                  return (
                    <span
                      key={idx}
                      style={{
                        opacity: isLit ? 1 : 0.2,
                        transition: "opacity 350ms ease",
                      }}
                      className="inline-block mr-[0.25em] last:mr-0"
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </span>
          </h2>

          {/* 3. “Built one event at a time.” (Reveal at 20% visible) */}
          <motion.h3
            initial={rm ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
            className="font-display font-bold text-navy-deep text-2xl md:text-3xl lg:text-4xl mt-12 md:mt-16 tracking-tight"
          >
            Built one event at a time.
          </motion.h3>

          {/* 4. COMPANY-STORY PARAGRAPH (Simple fade-up reveal) */}
          <motion.p
            initial={rm ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
            className="font-sans text-base md:text-lg lg:text-xl text-text-slate leading-relaxed max-w-2xl text-center mt-6 md:mt-8"
          >
            {PARAGRAPH_TEXT}
          </motion.p>

          {/* 5. “Read our story →” (Reveal at 20% visible) */}
          <motion.div
            initial={rm ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
            className="flex justify-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-8 md:mt-10 font-sans text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-gold-dark hover:text-navy-deep transition-colors group/link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
            >
              Read our story
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-out group-hover/link:translate-x-1.5"
              />
            </Link>
          </motion.div>

        </div>

        {/* 6. FOUNDER CARD (Reveal triggered when 25% enters viewport) */}
        <motion.div
          ref={founderCardRef}
          initial={rm ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-28 lg:mt-32 p-6 sm:p-10 lg:p-12 rounded-sm bg-base-warm border border-gold-dark/20 shadow-sm relative text-left"
        >
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Founder Portrait Frame with Bottom-to-Top Reveal & Inner Drift */}
            <div className="lg:col-span-5 w-full flex justify-center">
              {/* Outer Frame: clips reveal, aspect 3:2 to preserve landscape portrait */}
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                  visible: {
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: { duration: 1.1, ease: EASE_SPEC },
                  },
                }}
                className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none aspect-[3/2] rounded-sm overflow-hidden border border-gold-dark/20 bg-base-warm shadow-xs flex items-center justify-center"
              >
                {/* Inner Image / Drift Layer */}
                <motion.div
                  style={{
                    y: !rm && isDesktop ? driftY : 0,
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {founder.image ? (
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 1024px) 360px, 440px"
                      className="object-contain"
                    />
                  ) : (
                    <EditorialPlaceholder
                      aspectRatio="h-full w-full"
                      tone="light"
                      contextLabel="FOUNDER PORTRAIT"
                      caption={founder.name}
                      subline="Founder & Managing Director · Guiding since 2006"
                      className="w-full h-full border-0 shadow-none"
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Founder Details with Staggered Reveal */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 border-t lg:border-t-0 lg:border-l border-gold-dark/20 pt-6 lg:pt-0 lg:pl-8 sm:lg:pl-10">
              
              {/* Eyebrow: Leadership */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2, ease: EASE_SPEC },
                  },
                }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-6 sm:w-8 bg-gold-dark/40" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                  LEADERSHIP
                </span>
              </motion.div>

              {/* Founder Name (delay 0.30s) */}
              <motion.h4
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.3, ease: EASE_SPEC },
                  },
                }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-navy-deep leading-tight"
              >
                {founder.name}
              </motion.h4>

              {/* Founder Title (delay 0.48s) */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.48, ease: EASE_SPEC },
                  },
                }}
                className="font-sans text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.2em] text-gold-dark font-bold"
              >
                {founder.title}
              </motion.p>

              {/* Gold Underline (delay 0.50s, scaleX: 0 -> 1, origin: left) */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.8, delay: 0.5, ease: EASE_SPEC },
                  },
                }}
                style={{ transformOrigin: "left" }}
                className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full my-0.5"
              />

              {/* Guiding Line (delay 0.57s) */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.57, ease: EASE_SPEC },
                  },
                }}
                className="font-display italic text-xs sm:text-sm text-text-slate/75"
              >
                Guiding Hamsalekha since 2006
              </motion.p>

              {/* Biography (delay 0.66s) */}
              <motion.blockquote
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.66, ease: EASE_SPEC },
                  },
                }}
                className="font-sans text-sm sm:text-base lg:text-lg text-text-slate leading-relaxed mt-1"
              >
                {founder.bio}
              </motion.blockquote>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
