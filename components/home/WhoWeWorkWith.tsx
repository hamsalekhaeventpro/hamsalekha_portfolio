"use client";

import { whoWeWorkWith } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Icons for each category — inline SVG for zero dependency
const icons = [
  // Family / Heart
  <svg key="family" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  // Planner / Clipboard
  <svg key="planner" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>,
  // Corporate / Briefcase
  <svg key="corporate" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  // Venue / Building
  <svg key="venue" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
];

export function WhoWeWorkWith() {
  return (
    <section className="section-py bg-bg-base" aria-label="Who we work with">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading
          eyebrow="WHO WE WORK WITH"
          heading="Built for everyone who builds events."
          align="center"
        />
        {/* 2×2 grid — Figma layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
          {whoWeWorkWith.map((item, i) => (
            <RevealOnScroll
              key={item.label}
              delay={i * 0.1}
              className="gold-top-bar bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold-dark group-hover:bg-gold/20 transition-colors duration-300">
                {icons[i]}
              </div>
              {/* Label */}
              <h3 className="font-display text-xl font-bold text-navy-deep">
                {item.label}
              </h3>
              {/* Description */}
              <p className="font-sans text-sm text-text-slate leading-relaxed">
                {item.description}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
