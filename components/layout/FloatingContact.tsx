"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { microcopy } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const whatsappHref = `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(
    microcopy.whatsappMessage
  )}`;
  const instagramHref = microcopy.instagramUrl || "#";

  // Click outside and escape to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  return (
    <div 
      ref={containerRef}
      className="hidden md:flex fixed bottom-8 right-6 z-40 flex-col items-end"
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-navy-deep rounded-2xl shadow-xl border border-gold/20 overflow-hidden w-[220px] mb-2"
            role="dialog"
            aria-label="Contact options"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gold/10">
              <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream/70">
                GET IN TOUCH
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-cream/60 hover:text-gold transition-colors p-1 -mr-1"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col p-2 gap-1">
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Instagram"
              >
                <div className="flex items-center gap-3 text-cream group-hover:text-gold transition-colors">
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
                  <span className="font-sans text-sm font-medium">Instagram</span>
                </div>
                <ArrowUpRight size={16} className="text-cream/40 group-hover:text-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="WhatsApp"
              >
                <div className="flex items-center gap-3 text-cream group-hover:text-gold transition-colors">
                  <MessageCircle size={18} />
                  <span className="font-sans text-sm font-medium">WhatsApp</span>
                </div>
                <ArrowUpRight size={16} className="text-cream/40 group-hover:text-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group flex items-center justify-center gap-3 h-[52px] w-[160px] rounded-full bg-navy-deep hover:bg-[#1a2333] shadow-lg border border-gold/20 transition-colors"
            aria-expanded={false}
            aria-label="Get in touch"
          >
            <span className="font-sans text-[0.7rem] font-bold tracking-[0.15em] uppercase text-cream">
              GET IN TOUCH
            </span>
            <span className="text-gold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
