import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { footerTagline, footerColumns, microcopy } from "@/lib/content";

function InstagramIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Gold top border — Figma spec */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Main footer grid */}
      <div className="container-site pt-12 pb-16 md:py-20">
        {/* Anniversary Badge */}
        <div className="mb-12 inline-flex items-center gap-3 border border-gold/15 rounded-full px-5 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-light" />
          <span className="font-sans text-eyebrow uppercase text-gold-light">
            {microcopy.anniversaryBadge}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="relative w-48 h-20 shrink-0 overflow-hidden mb-2">
                <Image
                  src="/images/hamsalekha-logo-v4.png"
                  alt="Hamsalekha Event Production"
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
              {/* Gold rule under brand */}
              <div className="w-12 h-[2px] bg-gradient-to-r from-gold-dark to-gold mt-2" />
            </div>
            <p className="font-sans text-sm text-cream/65 leading-relaxed max-w-xs">
              {footerTagline}
            </p>
            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${microcopy.phoneRaw}`}
                className="flex items-center gap-2.5 font-sans text-sm text-cream/80 hover:text-gold-light transition-colors group"
              >
                <Phone size={14} className="text-gold group-hover:text-gold-light transition-colors" />
                <span className="font-semibold text-gold-light group-hover:text-gold transition-colors">
                  {microcopy.phone}
                </span>
              </a>
              <a
                href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-sans text-sm text-cream/80 hover:text-gold-light transition-colors group"
              >
                <WhatsAppIcon size={14} className="text-[#25D366]" />
                WhatsApp us
              </a>
              <a
                href={microcopy.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-sans text-sm text-cream/80 hover:text-gold-light transition-colors"
              >
                <InstagramIcon size={14} className="text-gold" />
                {microcopy.instagram}
              </a>
              <p className="font-sans text-sm text-cream/50">
                📍 {microcopy.address}
              </p>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <h3 className="font-sans text-eyebrow uppercase text-gold-light border-b border-gold/15 pb-3">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="font-sans text-sm text-cream/65 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-site py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/50 text-center md:text-left">
            © 2026 Hamsalekha Event Production Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="font-sans text-xs text-cream/50 hover:text-cream/90 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs text-cream/50 hover:text-cream/90 transition-colors">
              Terms of Use
            </Link>
            <span className="font-sans text-xs text-cream/40">
              Designed by Mejorars
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
