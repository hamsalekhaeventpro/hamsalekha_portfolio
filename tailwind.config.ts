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
        // Bookend sections (header, hero, footer, quote bar)
        "navy-deep": "#0F2647",
        "navy-mid": "#16355C",
        navy: "#1B3A6B",
        "blue-royal": "#2E5C9E",
        "blue-royal-light": "#5C8AC9",
        cream: "#FAF8F3",
        // Mid sections (services, furniture, gallery, contact)
        "bg-panel": "#F3EEE0",
        "bg-base": "#FAF8F3",
        "card-bg": "#FFFFFF",
        "text-navy": "#0F2647",
        "text-slate": "#5B6B80",
        "tile-taupe": "#E7E1D0",
        "panel-warm": "#E7E1D0",
        // Gold accent family
        gold: "#C9A227",
        "gold-dark": "#8F6D1B",
        "gold-light": "#E4C368",
        "gold-outline": "#B8923A",
        "gold-border": "#B8923A",
      },
      fontSize: {
        hero: ["clamp(3.25rem, 7vw, 6.5rem)", { lineHeight: "1.03" }],
        "hero-xl": ["clamp(4rem, 9vw, 8.5rem)", { lineHeight: "1.0" }],
        h1: ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.1" }],
        h2: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15" }],
        h3: ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.2", letterSpacing: "0.18em" },
        ],
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 24px rgba(15,38,71,0.08)",
        "card-hover": "0 8px 40px rgba(15,38,71,0.14)",
        gold: "0 0 0 2px rgba(201,162,39,0.4)",
        "gold-glow": "0 4px 32px rgba(201,162,39,0.22)",
        "gold-glow-lg": "0 8px 60px rgba(201,162,39,0.3)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(135deg, rgba(15, 38, 71, 0.96) 0%, rgba(15, 38, 71, 0.88) 50%, rgba(15, 38, 71, 0.55) 100%)",
        "gold-shimmer":
          "linear-gradient(90deg,#8F6D1B,#C9A227,#E4C368,#C9A227)",
        "navy-band":
          "linear-gradient(135deg,#0F2647,#1B3A6B 60%,#2E5C9E)",
        "radial-glow":
          "radial-gradient(circle at 50% 30%,rgba(201,162,39,0.10),transparent 70%)",
        "panel-gradient":
          "linear-gradient(180deg,#FAF8F3 0%,#E7E1D0 100%)",
        "gold-to-cream":
          "linear-gradient(135deg,#C9A227 0%,#E4C368 50%,#FAF8F3 100%)",
      },
      keyframes: {
        kenBurns: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        goldPulse: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drawLine: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        wipeIn: {
          from: { clipPath: "inset(100% 0 0 0)" },
          to: { clipPath: "inset(0% 0 0 0)" },
        },
      },
      animation: {
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        shimmer: "shimmer 3s ease infinite",
        "gold-pulse": "goldPulse 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "wipe-in": "wipeIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
