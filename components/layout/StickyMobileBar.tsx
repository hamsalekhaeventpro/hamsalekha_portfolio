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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-deep border-t border-white/10 flex pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${microcopy.phoneRaw}`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors border-r border-white/10"
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
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors border-r border-white/10"
      >
        <MessageCircle size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          WhatsApp
        </span>
      </a>
      <Link
        href="/contact"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-cream/80 hover:text-gold-light hover:bg-white/5 transition-colors"
      >
        <PenLine size={18} />
        <span className="font-sans text-[9px] font-semibold tracking-wide uppercase">
          Enquire
        </span>
      </Link>
    </div>
  );
}
