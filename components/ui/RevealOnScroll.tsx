"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  direction = "up",
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div data-reveal className={className}>
        {children}
      </div>
    );
  }

  const hidden =
    direction === "up"
      ? { opacity: 0, y: 16 }
      : direction === "left"
      ? { opacity: 0, x: -16 }
      : direction === "right"
      ? { opacity: 0, x: 16 }
      : { opacity: 0 };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={viewportOnce}
      data-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}
