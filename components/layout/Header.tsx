"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, microcopy } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Header — Phase 1 spec:
 * - Transparent over hero (cinematic dark appearance)
 * - Solid bg-navy-deep after scrollY > 40
 * - No backdrop-blur on fixed elements
 * - Subtle gold active state underline
 * - Gold "Plan Your Event" CTA
 * - Mobile: clean drawer slide, focus trap, keyboard nav
 * - transition-colors only (no transition-all)
 */
export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname  = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Focus trap and Escape key listener for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = document.getElementById("mobile-drawer");
    if (!drawer) return;

    const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = drawer.querySelectorAll<HTMLElement>(sel);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); return; }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
          if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    first?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-colors duration-300",
          scrolled
            ? "bg-navy-deep border-b border-gold/12"
            : "bg-transparent border-b border-transparent"
        )}
        data-theme="dark"
      >
        {/* Persistent gold hairline at bottom of header */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent pointer-events-none"
        />

        <div className="container-site flex items-center justify-between h-16 md:h-[4.5rem]">

          {/* Wordmark Logo */}
          <Link
            href="/"
            className="relative flex items-center justify-center group shrink-0 py-1"
            aria-label="Hamsalekha Event Production — Home"
          >
            <Image
              src="/images/hamsalekha-logo-v4.png"
              alt="Hamsalekha Event Production"
              width={839}
              height={422}
              className="w-24 md:w-32 h-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 128px, 256px"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-7"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "relative font-sans text-[0.8125rem] font-medium px-2 py-3 min-h-[44px] flex items-center group",
                    "transition-colors duration-300",
                    isActive
                      ? "text-gold-light"
                      : "text-cream/80 hover:text-cream",
                    item.external && "text-gold-light hover:text-gold"
                  )}
                >
                  {item.label}
                  {/* Gold underline draw — Phase 1 interaction language */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-px bg-gold origin-left transition-transform duration-[400ms]",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Gold CTA — Plan Your Event */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-gold text-navy-deep font-sans text-[0.75rem] font-semibold tracking-wide px-5 py-2.5 rounded-[2px] transition-colors duration-300 hover:bg-gold-light min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
              id="header-cta"
            >
              {microcopy.primaryCta}
            </Link>

            {/* Mobile toggle — 44px minimum touch target */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden size-11 flex items-center justify-center text-cream hover:text-gold-light transition-colors duration-300"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
              {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-[60] bg-navy-deep/80 lg:hidden animate-fade-in"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-navy-deep flex flex-col pt-20 pb-8 px-6 lg:hidden shadow-2xl border-l border-gold/10 animate-[slideInRight_0.4s_ease-out]"
              data-theme="dark"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 size-11 flex items-center justify-center text-cream/60 hover:text-cream transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <div className="absolute top-4 left-6">
                <Image
                  src="/images/hamsalekha-logo-v4.png"
                  alt="Hamsalekha Event Production"
                  width={839}
                  height={422}
                  className="w-24 md:w-32 h-auto object-contain"
                />
              </div>
              <div aria-hidden="true" className="w-full h-px bg-gold/15 mb-6" />
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <div key={item.label} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05 + 0.08}s` }}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block font-sans font-medium py-3 px-4 text-sm rounded-[2px] transition-colors duration-300",
                        pathname === item.href
                          ? "text-gold-light bg-gold/8 border-l-2 border-gold"
                          : "text-cream/75 hover:text-cream hover:bg-white/5",
                        item.external && "text-gold-light/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <div aria-hidden="true" className="w-full h-px bg-gold/12 mb-2" />
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center bg-gold text-navy-deep font-sans text-sm font-semibold tracking-wide px-6 py-3 rounded-[2px] transition-colors duration-300 hover:bg-gold-light min-h-[44px]"
                >
                  {microcopy.primaryCta}
                </Link>
                <a
                  href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-300 min-h-[44px]"
                >
                  <span>WhatsApp</span>
                  <span className="text-gold-light">{microcopy.whatsappNumberDisplay}</span>
                </a>
              </div>
            </div>
          </>
        )}
    </>
  );
}
