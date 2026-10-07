"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewport, duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

/**
 * RevealOnScroll — FADE-UP scroll reveal primitive.
 * Delegates to the same viewport token as Reveal.tsx.
 * Kept for backward-compat; prefer <Reveal> for new components.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
  direction = "up",
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div data-reveal className={cn(className)}>
        {children}
      </div>
    );
  }

  const hidden =
    direction === "up"    ? { opacity: 0, y: 20 } :
    direction === "left"  ? { opacity: 0, x: -20 } :
    direction === "right" ? { opacity: 0, x: 20 } :
                            { opacity: 0 };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: duration.reveal,
      delay,
      ease: ease.expo as [number, number, number, number],
    },
  };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={viewport}
      data-reveal
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
