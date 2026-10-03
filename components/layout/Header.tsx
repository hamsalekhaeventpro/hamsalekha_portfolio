"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, microcopy } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy-deep/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(184,146,58,0.15),0_4px_20px_rgba(15,38,71,0.3)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* Always-visible gold hairline at very bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

        <div className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex flex-col leading-tight group"
            aria-label="Hamsalekha Event Production — Home"
          >
            <span className="font-display text-xl font-bold text-cream tracking-wide group-hover:text-gold-light transition-colors duration-300">
              Hamsalekha
            </span>
            <span className="font-sans text-[0.65rem] text-gold-light tracking-[0.2em] uppercase">
              Event Production
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-7"
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
                    "relative font-sans text-sm font-medium px-1 py-2 transition-colors duration-200 group",
                    isActive
                      ? "text-gold-light"
                      : "text-cream/85 hover:text-cream",
                    item.external && "text-gold-light hover:text-gold"
                  )}
                >
                  {item.label}
                  {/* Gold underline draw effect */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              id="header-cta"
            >
              {microcopy.primaryCta}
            </Button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-cream hover:text-gold-light transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy-deep/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-navy-deep flex flex-col pt-20 pb-8 px-6 lg:hidden shadow-2xl border-l border-gold/10"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 p-2 text-cream/70 hover:text-cream"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              {/* Wordmark in drawer */}
              <div className="absolute top-5 left-6">
                <span className="font-display text-lg font-bold text-cream">Hamsalekha</span>
              </div>

              {/* Gold hairline */}
              <div className="w-full h-px bg-gold/20 mb-6" />

              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "block font-sans font-medium py-3 px-4 rounded-xl transition-all text-sm",
                        pathname === item.href
                          ? "text-gold-light bg-gold/8 border-l-2 border-gold"
                          : "text-cream/80 hover:text-cream hover:bg-white/6",
                        item.external && "text-gold-light/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <div className="w-full h-px bg-gold/15 mb-2" />
                <Button href="/contact" variant="primary" size="md" className="w-full">
                  {microcopy.primaryCta}
                </Button>
                <a
                  href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-sans text-sm text-cream/70 hover:text-cream transition-colors"
                >
                  <span>WhatsApp</span>
                  <span className="text-gold-light">{microcopy.whatsappNumberDisplay}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
