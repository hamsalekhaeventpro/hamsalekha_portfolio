"use client";

import Image from "next/image";
import { services, eventsWeProduceTags } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

// Helper to determine the specific tone based on the Phase 3 specs
function getServiceTone(index: number) {
  switch (index) {
    case 0: return "base"; // Lighting (Light)
    case 1: return "stage"; // Power (Dark)
    case 2: return "base"; // Truss (Light)
    case 3: return "stage"; // Furniture (Dark)
    case 4: return "base"; // Decor (Light)
    case 5: return "stage"; // Full Production (Dark Finale)
    default: return "base";
  }
}

function TrussSVGDraw({ animateState }: { animateState: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M10 10 L90 10 L90 90 L10 90 Z M10 10 L90 90 M90 10 L10 90 M30 10 L30 90 M70 10 L70 90 M10 50 L90 50"
        fill="transparent"
        stroke="#C9A227"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={animateState === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.svg>
  );
}

function ServiceSection({ service, index }: { service: (typeof services)[0]; index: number }) {
  const tone = getServiceTone(index);
  const isDark = tone === "stage";
  const imageLeft = index % 2 === 0;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  // Specific image animations based on service index
  const renderImageMotion = () => {
    // 0: Lighting - diagonal beam sweep
    if (index === 0) {
      return (
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden">
          <motion.div
            initial={rm ? {} : { clipPath: "inset(0 100% 0 0)" }}
            animate={animateState === "visible" ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: duration.hero, ease: EXPO }}
            className="w-full h-full absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {!rm && (
              <motion.div
                className="absolute inset-0 w-[150%] bg-gradient-to-r from-transparent via-gold/15 to-transparent origin-bottom-left -skew-x-12 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={animateState === "visible" ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: "linear" }}
              />
            )}
          </motion.div>
        </div>
      );
    }
    
    // 1: Power - subtle pulse
    if (index === 1) {
      return (
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden">
          <motion.div
            initial={rm ? {} : { opacity: 0, scale: 0.98 }}
            animate={animateState === "visible" ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: duration.hero, ease: EXPO }}
            className="w-full h-full absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {!rm && (
              <motion.div
                className="absolute inset-0 bg-gold-light pointer-events-none mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={animateState === "visible" ? { opacity: [0, 0.25, 0] } : {}}
                transition={{ duration: 1.5, times: [0, 0.1, 1], ease: "easeOut", delay: 0.6 }}
              />
            )}
          </motion.div>
        </div>
      );
    }

    // 2: Truss - structural draw
    if (index === 2) {
      return (
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden">
          <motion.div
            initial={rm ? {} : { clipPath: "inset(0 0 100% 0)" }}
            animate={animateState === "visible" ? { clipPath: "inset(0 0 0% 0)" } : {}}
            transition={{ duration: duration.hero, ease: EXPO }}
            className="w-full h-full absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {!rm && <TrussSVGDraw animateState={animateState} />}
          </motion.div>
        </div>
      );
    }

    // Default clip reveals for the rest
    const clipDirection = imageLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    return (
      <div className="relative w-full h-full group bg-navy-deep overflow-hidden">
        <motion.div
          initial={rm ? {} : { clipPath: clipDirection }}
          animate={animateState === "visible" ? { clipPath: "inset(0 0 0 0)" } : {}}
          transition={{ duration: duration.hero, ease: EXPO }}
          className="w-full h-full absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    );
  };

  return (
    <Section tone={tone as "stage" | "base" | "panel" | "image" | "charcoal"} className="relative overflow-hidden py-20 lg:py-32">
      <div className="container-site relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <div className={`relative w-full h-[400px] lg:h-[600px] ${!imageLeft ? "lg:order-last" : ""}`}>
            {renderImageMotion()}
          </div>

          {/* Content */}
          <motion.div 
            className="flex flex-col gap-6"
            initial="hidden"
            animate={animateState}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: index === 5 ? 0.3 : 0.1 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold/50" />
                <span className={`font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] ${isDark ? "text-gold-light" : "text-gold-dark"}`}>
                  {service.eyebrow}
                </span>
              </div>
            </motion.div>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}
              className={`font-display text-4xl md:text-5xl font-bold ${isDark ? "text-cream" : "text-navy-deep"}`}
            >
              {service.title}
            </motion.h2>

            <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: EXPO } } }} style={{ transformOrigin: "left" }}>
              <div className="w-12 h-[1px] bg-gold/40 my-2" />
            </motion.div>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}
              className={`font-sans text-lg leading-relaxed ${isDark ? "text-cream/70" : "text-text-slate"}`}
            >
              {service.description}
            </motion.p>

            <motion.ul 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}
              className="flex flex-col gap-3 mt-2"
            >
              {service.bullets.map((bullet: string) => (
                <li key={bullet} className={`flex items-start gap-3 font-sans text-sm ${isDark ? "text-cream/80" : "text-text-slate"}`}>
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}>
              <Button
                href={service.ctaHref}
                variant={isDark ? "primary" : "outline"}
                size="md"
                className="mt-6 self-start"
                external={service.ctaHref.startsWith("http")}
              >
                {service.ctaLabel}
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Section tone="stage" className="pt-36 pb-20 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-stage-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-6">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                What We Do
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display font-bold text-hero text-cream leading-tight">
              One team.<br />
              <span className="font-display italic text-gold-light">Every layer</span> of your event.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
              Book one service or all of them. Either way, it comes from our
              warehouse and is installed by our crew.
            </p>
          </Reveal>
        </div>
      </Section>

      {services.map((service, i) => (
        <ServiceSection key={service.title} service={service} index={i} />
      ))}

      <Section tone="stage" className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.10), transparent 70%)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                Events We Produce
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
              From intimate pujas to city-scale festivals.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mt-4">
              {eventsWeProduceTags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-sm text-cream/80 bg-white/5 border border-white/10 px-6 py-3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Plan Your Event
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
