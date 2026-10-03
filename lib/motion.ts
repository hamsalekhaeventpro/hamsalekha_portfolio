import type { Variants } from "framer-motion";

// ─── Motion System (Master Plan) ─────────────────────────────
// MICRO: 200-300ms | INTERACTION: 300-450ms | REVEAL: 600-900ms | CINEMATIC: 1000-1400ms
// Easing: power3.out, expo.out, easeOut

const easeExpoOut = [0.16, 1, 0.3, 1] as const;
const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeExpoOut }, // REVEAL
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easePower3Out }, // REVEAL
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeExpoOut }, // REVEAL
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeExpoOut }, // REVEAL
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeExpoOut }, // REVEAL
  },
};

// ─── Stagger containers ───────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ─── Hero text stagger ────────────────────────────────────────

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeExpoOut }, // REVEAL
  },
};

// ─── Card hover ───────────────────────────────────────────────

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 4px 24px rgba(15,38,71,0.08)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 40px rgba(15,38,71,0.14)",
    transition: { duration: 0.4, ease: easePower3Out }, // INTERACTION
  },
};

// ─── Viewport defaults for whileInView ────────────────────────

export const viewportOnce = { once: true, margin: "-60px" };
