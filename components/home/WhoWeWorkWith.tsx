"use client";

import { Sparkles, Users, Briefcase, Landmark } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { whoWeWorkWith } from "@/lib/content";

const ICONS = [Sparkles, Users, Briefcase, Landmark];

export function WhoWeWorkWith() {
  return (
    <Section tone="panel" aria-label="Who we work with">
      <div className="container-site flex flex-col gap-12 lg:gap-16">
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

        {/* Responsive Grid: 1 col Mobile, 2 cols Tablet/Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          {whoWeWorkWith.map((item, i) => {
            const IconComponent = ICONS[i] || Sparkles;
            return (
              <Reveal
                key={item.label}
                delay={0.08 * i + 0.15}
                y={16}
                className="group flex flex-col h-full"
              >
                <div className="flex flex-col h-full bg-white border border-navy-deep/5 rounded-sm p-8 lg:p-10 transition-[transform,box-shadow,border-color] duration-500 ease-out lg:hover:-translate-y-1 lg:hover:shadow-md lg:hover:border-navy-deep/10">

                  <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-dark mb-6 transition-colors duration-500 ease-out lg:group-hover:bg-gold/20 lg:group-hover:border-gold/40 shrink-0">
                    <IconComponent size={24} className="transition-transform duration-500 ease-out lg:group-hover:scale-110" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-navy-deep mb-3">
                    {item.label}
                  </h3>

                  <p className="font-sans text-base lg:text-lg text-text-slate leading-relaxed flex-1">
                    {item.description}
                  </p>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
