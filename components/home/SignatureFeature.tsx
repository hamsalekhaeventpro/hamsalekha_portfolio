"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { signatureSets, customSetCTA } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import "./signature-feature.css";

/* =========================================================================
   IMAGE PATHS (actual project assets)
   ========================================================================= */
const GH_DAY = "/images/signature-sets/DJI_20260816180926_0336_D_VG.jpg";
const GH_NIGHT = "/images/signature-sets/PHOTOS_DEE05557.jpg";
const MG_IMAGE = signatureSets[1].image || "/images/signature-sets/moongate.jpg";

/* =========================================================================
   HOMEPAGE COPY (from content.ts — first sentence for preview)
   ========================================================================= */
const GH = {
  index: "01",
  kind: signatureSets[0].eyebrow,
  title: signatureSets[0].title,
  text: "South India\u2019s first-of-its-kind glass theme set \u2014 a new canvas for extraordinary celebrations. A transparent venue within your venue, glowing by day and lit like a lantern by night.",
  chips: signatureSets[0].bestFor ?? [],
  ctaLabel: "Discover The Glass House",
  ctaHref: signatureSets[0].ctaHref,
};

const MG = {
  index: "02",
  kind: signatureSets[1].eyebrow,
  title: signatureSets[1].title,
  text: signatureSets[1].body,
  bullets: signatureSets[1].bullets ?? [],
  ctaLabel: signatureSets[1].ctaLabel.replace(/\u2192|→/g, "").trim(),
  ctaHref: signatureSets[1].ctaHref,
};

/* =========================================================================
   DUST PARTICLES (16 gold motes, 4–8s drift cycles)
   ========================================================================= */
const DUST = Array.from({ length: 16 }, (_, i) => ({
  x: `${(i * 37) % 100}%`,
  y: `${(i * 53) % 100}%`,
  d: `${4 + (i % 5)}s`,
}));

/* =========================================================================
   DAMPING & ANIMATION LIFECYCLE
   DAMPING_COEFF = 9 yields smooth frame-rate independent easing (~0.14 at 60fps)
   that absorbs touch scroll jitter while maintaining prompt response.
   ========================================================================= */
const DAMPING_COEFF = 9;

/* =========================================================================
   useSceneProgress — drives --p (0→1) via rAF with time-based damping.
   Caches section top & travel; re-measures on resize/load/DOM shifts.
   Zero getBoundingClientRect calls during scroll for optimal 60/120fps.
   IntersectionObserver & visibilitychange pause ticking when offscreen.
   ========================================================================= */
function useSceneProgress(
  rm: boolean,
  onProgressRef?: React.RefObject<((p: number) => void) | null>
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (rm) {
      el.style.setProperty("--p", "1");
      onProgressRef?.current?.(1);
      return;
    }

    let target = 0;
    let cur = 0;
    let raf = 0;
    let lastTime = 0;
    let isIntersecting = true;
    let geom = { pinStart: 0, travel: 1 };

    // Measure once & cache geometry; re-measure on resize, load, or DOM shifts
    const measure = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const sectionTop = rect.top + scrollTop;

      // Header height: 4.5rem (72px) on md+ (>=900px), 4rem (64px) on mobile (<900px)
      const headerH = window.innerWidth >= 900 ? 72 : 64;

      // First child is the sticky stage (.ss-intro-stage, .ss-gh-stage, etc.)
      const stageEl = el.firstElementChild as HTMLElement | null;
      const stageH = stageEl ? stageEl.offsetHeight : window.innerHeight - headerH;

      // Travel is the exact scroll distance while stage stays pinned
      const travel = el.offsetHeight - stageH;
      const pinStart = sectionTop - headerH;

      geom = {
        pinStart,
        travel: Math.max(travel, 1),
      };
      update();
    };

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      target = Math.min(1, Math.max(0, (scrollY - geom.pinStart) / geom.travel));
      if (!raf && isIntersecting && !document.hidden) {
        lastTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Frame-rate independent exponential damping with DAMPING_COEFF = 9
      const damping = 1 - Math.exp(-DAMPING_COEFF * dt);
      cur += (target - cur) * damping;

      if (Math.abs(target - cur) < 0.0004) cur = target;
      el.style.setProperty("--p", cur.toFixed(4));
      onProgressRef?.current?.(cur);

      if (cur !== target && isIntersecting && !document.hidden) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    measure();

    // IntersectionObserver to pause ticking when section is offscreen
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === el) {
              isIntersecting = entry.isIntersecting;
              if (isIntersecting) {
                measure();
              } else if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
              }
            }
          }
        },
        { rootMargin: "100px 0px 100px 0px" }
      );
      io.observe(el);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (isIntersecting) {
        update();
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.addEventListener("visibilitychange", handleVisibility);

    // Watch for layout shifts from assets loading above
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
      if (document.body) ro.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm]);

  return ref;
}

/* =========================================================================
   DESKTOP · INTRO SCENE (200svh)
   Eyebrow → Heading → Gold line → Scroll cue
   ========================================================================= */
function IntroScene({ rm }: { rm: boolean }) {
  const ref = useSceneProgress(rm);
  return (
    <section ref={ref} className="ss-intro">
      <div className="ss-intro-stage">
        {!rm && (
          <div className="ss-dust">
            {DUST.map((d, i) => (
              <i
                key={i}
                style={
                  { "--x": d.x, "--y": d.y, "--d": d.d } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
        <p
          className="ss-rv ss-eyebrow"
          style={{ "--s": "0" } as React.CSSProperties}
        >
          Signature Sets
        </p>
        <h2
          className="ss-rv ss-heading"
          style={{ "--s": "0.05" } as React.CSSProperties}
        >
          Sets that define <em>the space.</em>
        </h2>
        <div className="ss-gold-line" />
        {!rm && <div className="ss-cue" />}
      </div>
    </section>
  );
}

/* =========================================================================
   GLASS HOUSE SCENE (340svh desktop, 300svh mobile)
   Letterbox bars → Image reveal → Day-to-night → Text choreography
   ========================================================================= */
function GlassHouseDesktop({ rm }: { rm: boolean }) {
  const [activeView, setActiveView] = useState<"day" | "night">(
    rm ? "night" : "day"
  );
  const [manual, setManual] = useState<"day" | "night" | null>(null);
  const lastScrollY = useRef(0);
  const activeRef = useRef(activeView);
  const onProgress = useRef<((p: number) => void) | null>(null);

  // Keep refs fresh after each render (not during render)
  useEffect(() => {
    activeRef.current = activeView;
    onProgress.current = (p) => {
      if (manual !== null) return;
      const n = Math.min(1, Math.max(0, (p - 0.15) * 2.5));
      const next = n >= 0.5 ? "night" : "day";
      if (next !== activeRef.current) {
        setActiveView(next);
      }
    };
  });

  const ref = useSceneProgress(rm, onProgress);

  // Manual override handler
  const handleSelect = useCallback((view: "day" | "night") => {
    setActiveView(view);
    setManual(view);
    lastScrollY.current = window.scrollY;
  }, []);

  // Auto-reset manual override after 220px scroll travel
  useEffect(() => {
    if (manual === null || rm) return;
    const check = () => {
      if (Math.abs(window.scrollY - lastScrollY.current) > 220) {
        setManual(null);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [manual, rm]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="ss-gh"
      data-manual={manual || undefined}
      id="glass-house-scene"
      style={{ "--ratio": "1.5" } as React.CSSProperties}
    >
      <div className="ss-gh-stage">
        {/* Letterbox bars */}
        <div className="ss-bar ss-bar-t" />
        <div className="ss-bar ss-bar-b" />

        {/* Progress rail */}
        <div className="ss-rail" />

        {/* Image container */}
        <div className="ss-gh-media relative">
          <Image
            src={GH_DAY}
            alt="The Glass House pavilion, aerial daytime view"
            fill
            priority
            sizes="(min-width: 900px) 55vw, 100vw"
            className="ss-day-img"
          />
          <Image
            src={GH_NIGHT}
            alt="The Glass House illuminated at night"
            fill
            loading="lazy"
            sizes="(min-width: 900px) 55vw, 100vw"
            className="ss-night-img"
          />
          <div className="ss-shade" />
          {!rm && <div className="ss-glow" />}
        </div>

        {/* Day/Night toggle */}
        <div
          className="ss-toggle ss-rv"
          style={{ "--s": "0.05" } as React.CSSProperties}
        >
          <div
            className="ss-toggle-pill"
            style={{
              transform: `translateX(${activeView === "night" ? "100%" : "0"})`,
            }}
          />
          <button
            type="button"
            className="ss-toggle-btn"
            data-active={activeView === "day"}
            onClick={() => handleSelect("day")}
            aria-label="View Glass House daytime aerial"
            aria-pressed={activeView === "day"}
          >
            Day aerial
          </button>
          <button
            type="button"
            className="ss-toggle-btn"
            data-active={activeView === "night"}
            onClick={() => handleSelect("night")}
            aria-label="View Glass House at night"
            aria-pressed={activeView === "night"}
          >
            By night
          </button>
        </div>

        {/* Copy */}
        <div className="ss-copy">
          <div
            className="ss-rv ss-kind"
            style={{ "--s": "0.10" } as React.CSSProperties}
          >
            <b>{GH.index} / {GH.kind}</b>
          </div>
          <h3
            className="ss-rv ss-title"
            style={{ "--s": "0.18" } as React.CSSProperties}
          >
            {GH.title}
          </h3>
          <p
            className="ss-rv ss-text"
            style={{ "--s": "0.26" } as React.CSSProperties}
          >
            {GH.text}
          </p>
          <ul className="ss-chips">
            {GH.chips.map((chip, i) => (
              <li
                key={chip}
                className="ss-rv"
                style={
                  { "--s": `${0.36 + i * 0.04}` } as React.CSSProperties
                }
              >
                {chip}
              </li>
            ))}
          </ul>
          <Link
            href={GH.ctaHref}
            className="ss-rv ss-cta-link"
            style={{ "--s": "0.62" } as React.CSSProperties}
          >
            {GH.ctaLabel}
            <ArrowRight size={14} className="ss-cta-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   MOONGATE SCENE (340svh desktop, 300svh mobile)
   Moon rises → Circle reveals → Ring rotates → Text choreography
   ========================================================================= */
function MoonGateDesktop({ rm }: { rm: boolean }) {
  const ref = useSceneProgress(rm);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="ss-mg"
      id="moongate-scene"
      style={{ "--ratio": "1.5516" } as React.CSSProperties}
    >
      <div className="ss-mg-stage">
        {/* Letterbox bars */}
        <div className="ss-bar ss-bar-t" />
        <div className="ss-bar ss-bar-b" />

        {/* Progress rail */}
        <div className="ss-rail" />

        {/* Moon media */}
        <div className="ss-mg-media">
          {!rm && <div className="ss-mg-ring" />}
          <div className="ss-mg-disc relative">
            <Image
              src={MG_IMAGE}
              alt={signatureSets[1].imageAlt || "MoonGate circular arch"}
              fill
              loading="lazy"
              sizes="(min-width: 900px) 46vw, 100vw"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="ss-copy">
          <div
            className="ss-rv ss-kind"
            style={{ "--s": "0.10" } as React.CSSProperties}
          >
            <b>{MG.index} / {MG.kind}</b>
          </div>
          <h3
            className="ss-rv ss-title"
            style={{ "--s": "0.18" } as React.CSSProperties}
          >
            {MG.title}
          </h3>
          <p
            className="ss-rv ss-text"
            style={{ "--s": "0.26" } as React.CSSProperties}
          >
            {MG.text}
          </p>
          <ul className="ss-bullets">
            {MG.bullets.map((b, i) => (
              <li
                key={b}
                className="ss-rv"
                style={
                  { "--s": `${0.36 + i * 0.08}` } as React.CSSProperties
                }
              >
                {b}
              </li>
            ))}
          </ul>
          <Link
            href={MG.ctaHref}
            className="ss-rv ss-cta-link"
            style={{ "--s": "0.62" } as React.CSSProperties}
          >
            {MG.ctaLabel}
            <ArrowRight size={14} className="ss-cta-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   CUSTOM COMMISSIONS CTA (preserved verbatim from content.ts)
   ========================================================================= */
function CustomCTA() {
  return (
    <div className="w-full flex flex-col items-center text-center p-8 sm:p-12 md:p-16 border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-sm max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream font-bold mb-4">
        {customSetCTA.headline}
      </h4>
      <p className="font-sans text-sm md:text-base text-cream/70 mb-8 max-w-xl leading-relaxed">
        {customSetCTA.body}
      </p>
      <Link
        href={customSetCTA.ctaHref}
        className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-navy-deep font-sans text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 transition-colors duration-300 min-h-[44px]"
      >
        {customSetCTA.ctaLabel}
      </Link>
    </div>
  );
}

/* =========================================================================
   MAIN EXPORT · SIGNATURE FEATURE
   Desktop: cinematic scroll-driven storytelling (200svh + 340svh + 340svh)
   Mobile: full-screen pinned poster scenes (170svh + 300svh + 300svh)
   ========================================================================= */
export function SignatureFeature() {
  const rm = Boolean(useReducedMotion());

  return (
    <Section
      tone="stage"
      id="signature-sets"
      aria-label="Signature Sets"
      className="overflow-x-clip relative !py-0"
    >
      <IntroScene rm={rm} />
      <GlassHouseDesktop rm={rm} />
      <MoonGateDesktop rm={rm} />

      {/* ── Custom commissions CTA ── */}
      <div className="container-site relative z-10 pb-16 sm:pb-20 md:pb-28 pt-8 sm:pt-10">
        <CustomCTA />
      </div>
    </Section>
  );
}
