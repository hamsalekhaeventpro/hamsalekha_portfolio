"use client";

import { Sparkles, Users, Briefcase, Landmark } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/lib/motion";
import { whoWeWorkWith } from "@/lib/content";

const ICONS = [Sparkles, Users, Briefcase, Landmark];

export function WhoWeWorkWith() {
  return (
    <Section tone="panel" aria-label="Who we work with">
      <div className="container-site flex flex-col gap-12 lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-gold-dark">
                WHO WE WORK WITH
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-tight">
              Built for everyone who builds events.
            </h2>
          </div>
        </Reveal>
        
        {/* Four icon cards — mobile snap row, desktop 4-column grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible">
          {whoWeWorkWith.map((item, i) => {
            const IconComponent = ICONS[i] || Sparkles;
            return (
              <Reveal
                key={item.label}
                delay={staggerDelay(i) + 0.2}
                className="w-[78vw] sm:w-auto shrink-0 snap-start bg-card-bg/60 sm:bg-transparent border border-navy-deep/8 sm:border-none p-5 sm:p-0 rounded-sm flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-dark mb-1">
                  <IconComponent size={20} />
                </div>
                
                <h3 className="font-display text-xl font-bold text-navy-deep">
                  {item.label}
                </h3>
                
                <p className="font-sans text-base text-text-slate leading-relaxed">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
