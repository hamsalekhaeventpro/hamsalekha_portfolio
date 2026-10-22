"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, PenLine } from "lucide-react";
import Link from "next/link";
import { microcopy } from "@/lib/content";

export function StickyMobileBar() {
  const [isHidden, setIsHidden] = useState(false);

  const whatsappHref = `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(
    microcopy.whatsappMessage
  )}`;

  useEffect(() => {
    const visibilityMap = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target, entry.isIntersecting);
        });
        const anyVisible = Array.from(visibilityMap.values()).some(Boolean);
        setIsHidden(anyVisible);
      },
      { rootMargin: "0px 0px 50px 0px", threshold: 0.05 }
    );

    const targetSet = new Set(document.querySelectorAll("[data-final-cta], #final-cta, footer"));
    targetSet.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-deep border-t border-white/10 flex pb-[env(safe-area-inset-bottom)] transition-all duration-300 ${
        isHidden ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100 pointer-events-auto"
      }`}
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${microcopy.phoneRaw}`}
        className="flex-1 h-14 min-h-[56px] flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors border-r border-white/10"
      >
        <Phone size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Call
        </span>
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-14 min-h-[56px] flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors border-r border-white/10"
      >
        <MessageCircle size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          WhatsApp
        </span>
      </a>
      <Link
        href="/contact"
        className="flex-1 h-14 min-h-[56px] flex flex-col items-center justify-center gap-1 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors"
      >
        <PenLine size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Enquire
        </span>
      </Link>
    </div>
  );
}
