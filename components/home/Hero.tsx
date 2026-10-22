"use client";

import { asset } from "@/lib/assets";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { homeHero } from "@/lib/content";
import { ArrowUpRight, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: "daytime-wedding",
    label: "Daytime Wedding",
    zoomClass: "hero-zoom-0",
    desktop: asset("/images/hero/hero-daytime-wedding-desktop.jpg"),
    tablet: asset("/images/hero/hero-daytime-wedding-tablet.jpg"),
    mobile: asset("/images/hero/hero-daytime-wedding-mobile.jpg"),
  },
  {
    id: "tech-production",
    label: "Tech Production",
    zoomClass: "hero-zoom-1",
    desktop: asset("/images/hero/hero-tech-production-desktop.jpg"),
    tablet: asset("/images/hero/hero-tech-production-tablet.jpg"),
    mobile: asset("/images/hero/hero-tech-production-mobile.jpg"),
  },
  {
    id: "evening-reception",
    label: "Evening Reception",
    zoomClass: "hero-zoom-2",
    desktop: asset("/images/hero/hero-evening-reception-desktop.jpg"),
    tablet: asset("/images/hero/hero-evening-reception-tablet.jpg"),
    mobile: asset("/images/hero/hero-evening-reception-mobile.jpg"),
  },
] as const;

const ACTIVE_INTERVAL_MS = 6000;
const CROSSFADE_DURATION_MS = 1400;

function getDataSaverSnapshot() {
  if (typeof navigator === "undefined" || !("connection" in navigator)) return false;
  const conn = (navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return (
    conn?.saveData === true ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "slow-2g"
  );
}

function subscribeConnection(callback: () => void) {
  if (typeof navigator === "undefined" || !("connection" in navigator)) return () => {};
  const conn = (navigator as unknown as {
    connection?: {
      addEventListener?: (type: string, cb: () => void) => void;
      removeEventListener?: (type: string, cb: () => void) => void;
    };
  }).connection;
  if (conn?.addEventListener) {
    conn.addEventListener("change", callback);
    return () => conn.removeEventListener?.("change", callback);
  }
  return () => {};
}

export function Hero() {
  const rm = useReducedMotion();

  // Slide state machine
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [slideRunCount, setSlideRunCount] = useState<[number, number, number]>([0, 0, 0]);

  // Playback & connection states
  const [isPaused, setIsPaused] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);

  const isDataSaver = useSyncExternalStore(
    subscribeConnection,
    getDataSaverSnapshot,
    () => false
  );

  // Timers and touch refs
  const crossfadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // 2. Pause when tab/page is hidden via Visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 3. Pre-decode images on mount and start first slide zoom as soon as image 0 is ready
  useEffect(() => {
    if (typeof window !== "undefined") {
      const imgElements = document.querySelectorAll<HTMLImageElement>(
        'section[aria-label="Hero"] picture img'
      );
      imgElements.forEach((img, idx) => {
        if (img.decode) {
          img
            .decode()
            .then(() => {
              if (idx === 0) setFirstImageReady(true);
            })
            .catch(() => {
              if (idx === 0) setFirstImageReady(true);
            });
        } else if (img.complete) {
          if (idx === 0) setFirstImageReady(true);
        }
      });
    }
  }, []);

  // Check image readiness before transitioning
  const checkImageReady = (targetIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof document === "undefined") {
        resolve();
        return;
      }
      const selector = `[data-slide-index="${targetIndex}"] img`;
      const imgEl = document.querySelector<HTMLImageElement>(selector);
      if (!imgEl) {
        resolve();
        return;
      }
      if (imgEl.complete) {
        resolve();
      } else if (imgEl.decode) {
        imgEl.decode().then(resolve).catch(resolve);
      } else {
        imgEl.onload = () => resolve();
        imgEl.onerror = () => resolve();
      }
    });
  };

  // 4. Slide Transition Handler
  const goToSlide = useCallback(
    async (targetIndex: number) => {
      if (targetIndex === activeIndex) return;

      // Ensure target image is loaded and decoded before starting crossfade
      await checkImageReady(targetIndex);

      if (crossfadeTimerRef.current) {
        clearTimeout(crossfadeTimerRef.current);
        crossfadeTimerRef.current = null;
      }

      if (rm || isDataSaver) {
        // Instant switch without animation for reduced motion or data saver
        setActiveIndex(targetIndex);
        setOutgoingIndex(null);
        return;
      }

      const prevActive = activeIndex;
      setOutgoingIndex(prevActive);
      setActiveIndex(targetIndex);
      setSlideRunCount((prev) => {
        const next = [...prev] as [number, number, number];
        next[targetIndex] += 1;
        return next;
      });

      // Clear outgoing slide after 1.4s crossfade completes
      crossfadeTimerRef.current = setTimeout(() => {
        setOutgoingIndex(null);
        crossfadeTimerRef.current = null;
      }, CROSSFADE_DURATION_MS);
    },
    [activeIndex, rm, isDataSaver]
  );

  // 5. Autoplay rotation every 6 seconds, paused on hover/focus/hidden
  useEffect(() => {
    if (rm || isPaused) return;

    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % HERO_SLIDES.length;
      goToSlide(nextIndex);
    }, ACTIVE_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [rm, isPaused, activeIndex, goToSlide]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (crossfadeTimerRef.current) {
        clearTimeout(crossfadeTimerRef.current);
      }
    };
  }, []);

  // 6. Keyboard navigation (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide((activeIndex + 1) % HERO_SLIDES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide((activeIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(HERO_SLIDES.length - 1);
    }
  };

  // 7. Mobile swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left -> next slide
          goToSlide((activeIndex + 1) % HERO_SLIDES.length);
        } else {
          // Swipe right -> previous slide
          goToSlide((activeIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className={cn(
        "relative flex items-end md:items-center overflow-hidden bg-navy-deep",
        "min-h-[min(780px,100svh)] h-auto",
        "md:min-h-[680px] md:max-h-[900px] md:h-[clamp(680px,88vh,900px)]",
        isPaused && "hero-paused",
        isDataSaver && "hero-data-saver"
      )}
      aria-label="Hero"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {/* 1. Background Image Slideshow (7.4s Zoom-Out, Drift, 1.4s Crossfade) */}
      <div className="absolute inset-0 z-0 bg-navy-deep overflow-hidden pointer-events-none" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          const isOutgoing = index === outgoingIndex;
          const isVisible = isActive || isOutgoing;

          let zIndexClass = "z-0";
          let crossfadeClass = "opacity-0 pointer-events-none";

          if (rm || isDataSaver) {
            zIndexClass = isActive ? "z-10" : "z-0";
            crossfadeClass = isActive ? "opacity-100" : "opacity-0 pointer-events-none";
          } else if (isActive) {
            zIndexClass = "z-20";
            crossfadeClass = outgoingIndex !== null ? "hero-crossfade-in" : "opacity-100";
          } else if (isOutgoing) {
            zIndexClass = "z-10";
            crossfadeClass = "hero-crossfade-out";
          }

          // Zoom is active when visible and either first image is ready or index > 0
          const shouldZoom =
            !rm &&
            !isDataSaver &&
            isVisible &&
            (index !== 0 || firstImageReady);

          return (
            <div
              key={slide.id}
              data-slide-index={index}
              className={cn(
                "absolute inset-0 w-full h-full overflow-hidden",
                zIndexClass,
                crossfadeClass
              )}
              aria-hidden={!isActive}
            >
              <div
                key={`${slide.id}-zoom-${slideRunCount[index]}`}
                className={cn(
                  "w-full h-full",
                  shouldZoom && slide.zoomClass
                )}
              >
                <picture className="w-full h-full block">
                  <source
                    media="(min-width: 1024px)"
                    srcSet={slide.desktop}
                    width={2560}
                    height={1440}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={slide.tablet}
                    width={2048}
                    height={1536}
                  />
                  <img
                    src={slide.mobile}
                    alt=""
                    width={1440}
                    height={1800}
                    loading="eager"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    onLoad={() => {
                      if (index === 0) setFirstImageReady(true);
                    }}
                  />
                </picture>
              </div>
            </div>
          );
        })}

        {/* Scrims: Desktop & Tablet (Left-to-Right readability gradient) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(to right, rgba(11, 31, 58, 0.72) 0%, rgba(11, 31, 58, 0.64) 24%, rgba(11, 31, 58, 0.38) 40%, rgba(11, 31, 58, 0) 56%)",
          }}
        />

        {/* Scrims: Mobile (Bottom-to-Top readability gradient) */}
        <div
          aria-hidden="true"
          className="block md:hidden absolute inset-0 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(to top, rgba(11, 31, 58, 0.92) 0%, rgba(11, 31, 58, 0.75) 45%, rgba(11, 31, 58, 0.35) 70%, rgba(11, 31, 58, 0.15) 100%)",
          }}
        />

        {/* Ambient bottom stage glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: "radial-gradient(ellipse at 50% 110%, rgba(11,31,58,0.50), transparent 65%)",
          }}
        />
      </div>

      {/* 2. Hero Content (Stationary Foreground Layer) */}
      <div className="relative z-40 container-site pb-28 pt-32 md:pb-0 md:pt-0 w-full">
        <div className="max-w-[960px] flex flex-col gap-7">

          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50 shrink-0" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              {homeHero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-hero text-cream"
            aria-label={`${homeHero.line1} ${homeHero.line2}`}
          >
            <span className="block overflow-hidden pb-0 md:pb-1" aria-hidden="true">
              <span className="block">
                {homeHero.line1}
              </span>
            </span>
            <span className="block overflow-hidden mt-0 md:mt-1 pb-0 md:pb-2" aria-hidden="true">
              <span className="block font-display italic font-medium text-gold-light">
                {homeHero.line2}
              </span>
            </span>
          </h1>

          {/* Divider + Subline */}
          <div className="flex flex-col gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <p className="font-sans text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              {homeHero.subline}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <a
              href={homeHero.ctaHref}
              className="group relative flex items-center justify-center gap-3 bg-gold text-navy-deep px-9 py-4 rounded-[2px] font-sans text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-gold-light min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
            >
              {homeHero.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>

            <a
              href={homeHero.catalogueHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-cream/75 hover:text-gold-light transition-colors duration-300 font-sans text-xs font-bold tracking-[0.15em] uppercase"
            >
              {homeHero.catalogueLabel}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

        </div>
      </div>

      {/* 3. Three-Step Synchronized Progress Indicator / Controls */}
      <nav
        aria-label="Hero background slides"
        className="absolute bottom-20 md:bottom-8 right-4 sm:right-6 md:right-10 lg:right-16 z-40 flex items-center gap-1.5 sm:gap-2"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1} of ${HERO_SLIDES.length}: ${slide.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center justify-center min-h-[44px] min-w-[44px] p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light cursor-pointer"
            >
              <span
                className={cn(
                  "block h-[2px] rounded-[1px] transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "w-8 sm:w-11 bg-gold"
                    : "w-4 sm:w-6 bg-cream/35 group-hover:bg-gold/60"
                )}
              />
              <span className="sr-only">{slide.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 4. Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center gap-2">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/40">Scroll</span>
        <motion.div
          animate={rm ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center"
        >
          <ChevronDown size={14} className="text-cream/40" />
        </motion.div>
      </div>
    </section>
  );
}
