import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Navy family — cinematic stage palette ──
        "navy-deep":  "#0B1F3A",   // primary dark stage
        "navy-mid":   "#122744",
        navy:         "#1A3459",
        charcoal:     "#1C2433",   // warm dark neutral

        // ── Warm Ivory ──
        cream:        "#FAF8F3",
        "bg-base":    "#FAF8F3",
        "bg-panel":   "#F3EEE4",
        "panel-warm": "#E9E2D0",
        "soft-white": "#FEFCF8",
        "card-bg":    "#FFFFFF",

        // ── Text ──
        "text-navy":  "#0B1F3A",
        "text-slate": "#5A6878",

        // ── Gold family — premium accent ──
        gold:          "#D4AF37",
        "gold-dark":   "#9A7B1E",
        "gold-light":  "#E8CB6A",
        "gold-border": "#C09B30",
        "gold-text":   "#7A5B14",
      },
      fontSize: {
        hero:      ["clamp(3.25rem, 7vw, 6.5rem)", { lineHeight: "1.03" }],
        "hero-xl": ["clamp(4rem, 9vw, 8.5rem)",    { lineHeight: "1.0" }],
        h1:        ["clamp(2.5rem, 5vw, 5rem)",     { lineHeight: "1.1" }],
        h2:        ["clamp(2rem, 4vw, 3.5rem)",     { lineHeight: "1.15" }],
        h3:        ["clamp(1.5rem, 2.5vw, 2.25rem)",{ lineHeight: "1.2" }],
        body:      ["1.125rem",                      { lineHeight: "1.6" }],
        eyebrow:   ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      fontFamily: {
        display:   ["var(--font-playfair)", "Georgia", "serif"],
        sans:      ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        control: "2px",
      },
      boxShadow: {
        card:       "0 4px 24px rgba(11,31,58,0.08)",
        "card-hover":"0 8px 40px rgba(11,31,58,0.14)",
        gold:       "0 0 0 2px rgba(212,175,55,0.4)",
        "gold-glow":"0 4px 32px rgba(212,175,55,0.18)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(135deg, rgba(11,31,58,0.96) 0%, rgba(18,28,42,0.72) 55%, rgba(212,175,55,0.10) 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, #9A7B1E, #D4AF37, #E8CB6A, #D4AF37)",
        "navy-band":
          "linear-gradient(135deg, #0B1F3A 0%, #1A3459 60%, #1C2433 100%)",
        "stage-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08), transparent 65%)",
        "panel-gradient":
          "linear-gradient(180deg, #FAF8F3 0%, #E9E2D0 100%)",
        "gold-to-cream":
          "linear-gradient(135deg, #D4AF37 0%, #E8CB6A 50%, #FAF8F3 100%)",
      },
      keyframes: {
        kenBurns: {
          from: { transform: "scale(1)" },
          to:   { transform: "scale(1.06)" },
        },
        shimmer: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        goldPulse: {
          "0%,100%": { opacity: "0.6" },
          "50%":     { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        wipeIn: {
          from: { clipPath: "inset(100% 0 0 0)" },
          to:   { clipPath: "inset(0% 0 0 0)" },
        },
      },
      animation: {
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        shimmer:     "shimmer 3s ease infinite",
        "gold-pulse":"goldPulse 2s ease-in-out infinite",
        "fade-in-up":"fadeInUp 0.6s ease-out forwards",
        "wipe-in":   "wipeIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
