"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { homeIntro } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomeIntro() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-py bg-bg-base overflow-hidden relative" aria-label="Our Journey">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:pr-8">
            <RevealOnScroll direction="up" delay={0}>
              <Badge label="OUR JOURNEY" variant="gold" className="self-start" />
            </RevealOnScroll>
            
            <RevealOnScroll direction="up" delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-navy-deep leading-tight">
                An event production house, not a rental counter.
              </h2>
            </RevealOnScroll>
            
            <RevealOnScroll direction="up" delay={0.2}>
              <div className="flex flex-col gap-5 text-body text-text-slate font-sans leading-relaxed">
                <p>{homeIntro.body}</p>
                <p>{homeIntro.body2}</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="up" delay={0.3}>
              <Button href="/about" variant="outline" size="md" className="self-start mt-2">
                OUR STORY →
              </Button>
            </RevealOnScroll>
          </div>

          {/* Image Content */}
          <div className="lg:col-span-5 relative order-last">
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden group shadow-card-hover card-gold-border"
            >
              <Image
                src="/images/about/hero.jpg"
                alt="Early days of Hamsalekha Event Production warehouse in Kothanur"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
