import type { Variants } from "framer-motion";

export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,         // default for reveals and slides
  power3: [0.215, 0.61, 0.355, 1] as const, // fades
  linear: "linear" as const,                // line drawing only
};
export const duration = { micro: 0.25, base: 0.5, reveal: 0.7, large: 1.1, cue: 1.2, settle: 6 };
export const distance = { sm: 10, md: 20 };
export const stagger = { step: 0.1, maxTotal: 0.5 };
export const staggerDelay = (i: number) => Math.min(i * stagger.step, stagger.maxTotal);
export const viewport = { once: true, margin: "0px 0px -50px 0px", amount: "some" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.power3 },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.step,
      delayChildren: stagger.step,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: stagger.step,
    },
  },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

// Kept for backward compatibility if needed, but components should transition to `viewport`
export const viewportOnce = { once: true, margin: "0px 0px -50px 0px", amount: "some" as const };
