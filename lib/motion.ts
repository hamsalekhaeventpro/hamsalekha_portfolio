import type { Variants } from "framer-motion";

/**
 * lib/motion.ts — single source of truth for all motion tokens.
 *
 * Phase 1 update:
 * - expo easing aligned with cubic-bezier(0.22, 1, 0.36, 1) — premium feel
 * - duration.micro ≈ 0.4s  (hover, micro interactions)
 * - duration.reveal ≈ 0.8s (scroll reveals)
 * - duration.hero ≈ 1.2s   (hero/cinematic moments)
 *
 * BANNED: spring, bounce, repeat: Infinity (except scroll chevron),
 * setInterval, requestAnimationFrame (in motion code), transition-all.
 * Only use: transform, opacity, clip-path.
 */

export const ease = {
  expo:   [0.22, 1, 0.36, 1] as const,          // primary: reveals, slides
  power3: [0.215, 0.61, 0.355, 1] as const,      // fades, subtler motion
  linear: "linear" as const,                     // line drawing only
} as const;

export const duration = {
  micro:  0.4,    // hover / micro-interactions
  base:   0.5,    // mobile drawer, simple fades
  reveal: 0.8,    // scroll reveals (FADE-UP)
  large:  1.1,    // DRAW / LineDraw segments
  cue:    1.2,    // LIGHTS-UP overlay
  hero:   1.2,    // hero/cinematic moments
  settle: 6.0,    // image subtle settle (once)
} as const;

export const distance = { sm: 10, md: 20 } as const;
export const stagger   = { step: 0.10, maxTotal: 0.50 } as const;
export const staggerDelay = (i: number) => Math.min(i * stagger.step, stagger.maxTotal);

/**
 * viewport — used in whileInView.
 * IMPORTANT: never drive zero-area clipped elements from useInView.
 * Use an unclipped measurable wrapper as the observation target.
 */
export const viewport = {
  once:   true,
  margin: "0px 0px -8% 0px",
  amount: 0.10,
} as const;

// ── Core Variants ─────────────────────────────────────────────

/** FADE-UP — primary reveal cue */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

/** FADE-IN — opacity only (no transform) */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.power3 },
  },
};

/** Slide from left */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

/** Slide from right */
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

/** Scale in — subtle (no bounce/spring) */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

/** Stagger container — children stagger */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger.step,
      delayChildren:   stagger.step,
    },
  },
};

/** Slower stagger — editorial reveals */
export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren:   stagger.step,
    },
  },
};

/** Hero word — clip reveal per word */
export const heroWord: Variants = {
  hidden:  { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
};

// Backward-compat alias
export const viewportOnce = viewport;
