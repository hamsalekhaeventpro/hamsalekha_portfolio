"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewport, duration, ease } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div data-reveal className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.reveal, delay, ease: ease.expo }}
      data-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Keep export for backward compatibility
export const RevealOnScroll = Reveal;
