"use client";

import Image from "next/image";
import { servicesPageList, eventsWeProduceTags, whereWeWork } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

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

function ServiceItemSection({ service, index }: { service: (typeof servicesPageList)[0]; index: number }) {
  const tone = getServiceTone(index);
  const isDark = tone === "stage";
  const imageLeft = index % 2 === 0;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  const renderImageMotion = () => {
    // 0: Lighting - diagonal beam sweep
    if (index === 0) {
      return (
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden rounded-sm">
          <div className="w-full h-full absolute inset-0 md:animate-wipe-in-right">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={true}
              quality={60}
            />
            <div className="hidden md:block absolute inset-0 w-[150%] bg-gradient-to-r from-transparent via-gold/15 to-transparent origin-bottom-left -skew-x-12 pointer-events-none animate-[sweep_1.5s_linear_0.6s_forwards]" />
          </div>
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden rounded-sm">
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
              priority={false}
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
        <div className="relative w-full h-full group bg-navy-deep overflow-hidden rounded-sm">
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
              priority={false}
            />
            {!rm && <TrussSVGDraw animateState={animateState} />}
          </motion.div>
        </div>
      );
    }

    // 3, 4, 5: Editorial reveals
    const clipDirection = imageLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    return (
      <div className="relative w-full h-full group bg-navy-deep overflow-hidden rounded-sm">
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
              priority={false}
          />
        </motion.div>
        </div>
      );
    };

  return (
    <Section 
      id={service.id} 
      tone={tone as "stage" | "base" | "panel" | "image" | "charcoal"} 
      className="relative overflow-hidden py-20 lg:py-32 scroll-mt-20"
    >
      <div className="container-site relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <div className={`relative w-full h-[360px] sm:h-[420px] lg:h-[560px] ${!imageLeft ? "lg:order-last" : ""}`}>
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
                <span className="font-mono text-xs font-bold tracking-widest text-gold-dark">{service.number}</span>
                <span className="h-px w-8 bg-gold/50" />
                <span className={`font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] ${isDark ? "text-gold-light" : "text-gold-dark"}`}>
                  {service.eyebrow}
                </span>
              </div>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } } }}>
              <h2 className={`font-display text-4xl md:text-5xl font-bold ${isDark ? "text-cream" : "text-navy-deep"} mb-2`}>
                {service.title}
              </h2>
              <p className={`font-display italic text-xl md:text-2xl ${isDark ? "text-gold-light" : "text-gold-dark"}`}>
                {service.headline}
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: EXPO } } }} style={{ transformOrigin: "left" }}>
              <div className="w-12 h-[1px] bg-gold/40 my-1" />
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

export function ServicesClient() {
  return (
    <>
      {/* 1. HERO */}
      <Section tone="stage" className="pt-36 pb-20 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-stage-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-6">
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                What We Do
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-cream leading-tight">
              One team.<br />
              <span className="font-display italic text-gold-light">Every layer</span> of your event.
            </h1>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
              Book one service or all of them. Either way, it comes from our
              warehouse and is installed by our crew.
            </p>
          </div>
        </div>
      </Section>

      {/* 2. SIX SERVICES */}
      {servicesPageList.map((service, i) => (
        <ServiceItemSection key={service.id} service={service} index={i} />
      ))}

      {/* 3. EVENTS WE PRODUCE */}
      <Section tone="base" className="relative overflow-hidden py-24 lg:py-32 border-t border-navy-deep/10">
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-10">
          <div className="opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                Events We Produce
              </span>
              <span className="h-px w-8 bg-gold-dark/40" />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep">
              From intimate pujas to city-scale festivals.
            </h2>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mt-2">
              {eventsWeProduceTags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-sm text-navy-deep bg-panel-warm border border-navy-deep/10 px-6 py-3 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 4. WHERE WE WORK & CLOSING CTA */}
      <Section tone="stage" className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.10), transparent 70%)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
          <div className="opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                {whereWeWork.eyebrow}
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
              {whereWeWork.headline}
            </h2>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="font-sans text-lg md:text-xl text-cream/75 leading-relaxed">
              {whereWeWork.body}
            </p>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button href={whereWeWork.ctaHref} variant="primary" size="lg" className="mt-4">
              {whereWeWork.ctaLabel}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
