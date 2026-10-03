"use client";

import { Phone, MessageCircle, PenLine } from "lucide-react";
import Link from "next/link";
import { microcopy } from "@/lib/content";

export function StickyMobileBar() {
  const whatsappHref = `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(
    microcopy.whatsappMessage
  )}`;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-deep border-t border-white/10 flex"
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${microcopy.phoneRaw}`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-all border-r border-white/10"
      >
        <Phone size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Call
        </span>
      </a>
      <a
        href={microcopy.instagramUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-all border-r border-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Instagram
        </span>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-all border-r border-white/10"
      >
        <MessageCircle size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          WhatsApp
        </span>
      </a>
      <Link
        href="/contact"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-all"
      >
        <PenLine size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Enquire
        </span>
      </Link>
    </div>
  );
}
