"use client";

import { useReducedMotion } from "framer-motion";

export function ServiceTicker() {
  const rm = useReducedMotion();
  const servicesList = ["Lighting", "Power", "Structures", "Furniture", "Decor", "Signature Sets"];
  
  // Create enough items to fill and loop seamlessly
  const content = [...servicesList, ...servicesList, ...servicesList, ...servicesList].map((s, i) => (
    <span key={i} className="flex items-center gap-6 md:gap-12 text-sm md:text-base font-sans tracking-[0.2em] uppercase text-navy-deep/40 whitespace-nowrap">
      {s}
      <span className="text-gold-light/60 text-xs">✦</span>
    </span>
  ));

  if (rm) {
    return (
      <div className="w-full overflow-hidden flex items-center py-8 opacity-80" aria-hidden="true">
        <div className="flex gap-6 md:gap-12">
          {servicesList.map((s, i) => (
            <span key={i} className="flex items-center gap-6 md:gap-12 text-sm md:text-base font-sans tracking-[0.2em] uppercase text-navy-deep/40 whitespace-nowrap">
              {s}
              {i < servicesList.length - 1 && <span className="text-gold-light/60 text-xs">✦</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden flex items-center py-6 md:py-10 group" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-ticker {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: ticker-scroll 45s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-ticker {
            gap: 3rem;
          }
        }
        .group:hover .animate-ticker {
          animation-play-state: paused;
        }
      ` }} />
      <div className="animate-ticker">
        {content}
      </div>
    </div>
  );
}
