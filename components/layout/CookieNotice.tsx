"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { microcopy } from "@/lib/content";
import { ease, duration } from "@/lib/motion";

const STORAGE_KEY = "hamsalekha-cookie-accepted";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // Delay slightly so it doesn't pop immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: duration.base, ease: ease.expo }}
          role="region"
          aria-label="Cookie notice"
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-navy-deep text-cream rounded-2xl shadow-2xl border border-white/10 p-5 flex items-start gap-4"
        >
          <div className="flex-1">
            <p className="font-sans text-sm text-cream/85 leading-relaxed">
              {microcopy.cookieNotice}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={accept}
              className="font-sans text-xs font-semibold bg-gold text-navy-deep px-4 py-2 rounded-full hover:bg-gold-light transition-colors"
              id="cookie-accept"
            >
              OK
            </button>
            <button
              onClick={accept}
              aria-label="Dismiss cookie notice"
              className="text-cream/50 hover:text-cream transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
