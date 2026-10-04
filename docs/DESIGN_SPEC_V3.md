# Hamsalekha Event Production: Design, Motion, Content & Build Spec (v3)

Single source of truth for AI agents and developers. **Read this fully before changing any UI.**
Supersedes v1 and v2. v3 is based on (a) a code audit and (b) a review of the live site
(`https://hamsalekha-event-production.netlify.app/`), so it contains site-specific rules, not just principles.

**Stack:** Next.js 16, React 19, Tailwind CSS v4, framer-motion 13, lucide-react, zod.
**Business:** Hamsalekha Event Production, Kothanur, Bengaluru, since 2006. Lighting, gensets, truss and
structures, premium furniture, décor and full production. Own crew, one warehouse.

---

## 1. Positioning and theme

### 1.1 Positioning
**Editorial luxury with technical authority.** The site must say: *our shows look beautiful and they are
engineered properly.* Design-led planners cannot credibly claim the second half; dark, neon production
vendors do not deliver the first.

Real proof points already in the site copy (use them, never inflate them):
own crew (not subcontractors) · in-house gensets 40–125 KVA · 10,000+ chairs across 34 designs ·
1,100+ sofa units across 61 designs · truss for venues up to 1 lakh sq ft · one warehouse in Kothanur ·
five-stage process including a venue recce · The Glass House (South India's first glass theme set, launched 2026) ·
Furniture Partner, Bengaluru Wedding Fraternity Meet Up 4.0 · 20 years (2006 to 2026).

### 1.2 Theme: evolve, do not replace
Keep cream / navy / gold (it is already distinct from both "dark + neon" and "white + airy" competitors). Add:
1. **Light/dark rhythm.** Cream "gallery" sections hold story and proof; navy "stage" sections hold production
   and lighting moments. Alternate; never two identical backgrounds back to back without a rule.
2. **Gold sparingly.** Gold is an accent (lines, small icons, one CTA per view), not a wash.
3. **Mixed-type headlines.** One key word per headline in Cormorant italic (see 3.3).
4. **Spec-sheet numerals.** Figures use Inter with `tabular-nums`, set like a technical rider.
5. **Night imagery as the signature.** Glowing sets (Glass House, MoonGate) lead the visual story.
6. **Quiet chrome, bold imagery.** Buttons and UI stay restrained; photos are large and full-bleed.

### 1.3 Hard constraints
- No gradients on borders or lines. Gradients only as image scrims (see 9).
- No spring, bounce or elastic motion. No press-scale on buttons.
- No glow shadows, shimmer sweeps, or backdrop-blur on fixed UI.
- No default blue links or generic UI-kit looks.
- Everything aligns to the 12-column grid.
- No invented facts, numbers, clients or testimonials (see 8).
- All user-visible copy lives in `lib/content.ts` (or `lib/projects.ts` for project data).

---

## 2. Design tokens (Tailwind v4)

> **Critical:** Tailwind v4 ignores `tailwind.config.ts` unless `@config` is declared, and this project does
> not use it. **All tokens live in the `@theme` block of `app/globals.css`.** Do not add tokens to
> `tailwind.config.ts` (the file is deleted). If a utility does not render, the token is missing from `@theme`.
> Never work around it with inline `style={{ fontSize }}`.

### 2.1 Colour

| Token | Value | Use |
|---|---|---|
| `bg-base` | `#FAF8F3` | Page background |
| `bg-panel` | `#F3EEE0` | Alternate sections |
| `panel-warm` | `#E7E1D0` | Tiles, dividers on light |
| `card-bg` | `#FFFFFF` | Cards, inputs |
| `navy-deep` | `#0F2647` | Headings on light, "stage" sections, header, footer |
| `navy-mid` / `navy` | `#16355C` / `#1B3A6B` | Layered dark surfaces |
| `blue-royal` / `-light` | `#2E5C9E` / `#5C8AC9` | Rare accents. Never for form focus |
| `cream` | `#FAF8F3` | Text on navy |
| `text-slate` | `#5B6B80` | Body text on light |
| `gold` | `#C9A227` | Lines, icons, borders, primary button, text on navy |
| `gold-light` | `#E4C368` | Hover, focus ring and accent text on navy |
| `gold-dark` | `#8F6D1B` | Focus ring on light, hover on light |
| `gold-text` | `#7A5B14` | **Gold-coloured text on light backgrounds (new)** |
| `gold-border` | `#B8923A` | Outline buttons, card borders |
| `error` / `error-bg` | `#A3261F` / `#FBEDEB` | Form errors (new) |
| `success` / `success-bg` | `#2F6B3F` / `#EAF3EC` | Form success (new) |

Removed duplicates: `text-navy` (use `navy-deep`), `tile-taupe` (use `panel-warm`), `gold-outline` (use `gold-border`).

**Contrast rules (measured; re-verify if values change)**
- Gold text on light: `gold-text`, never `gold` (about 2.3:1).
- `gold-dark` on `bg-panel` is about 4.2:1 (fails AA for small text): use for lines, rings and hover only.
- On navy: `gold` and `gold-light` pass; `gold-dark` is about 3.2:1, do not use for text on navy.
- Text on navy: `cream` headings, `cream/70` body, `cream/60` minimum for meta. `cream/40` and below is decorative only.
- Allowed opacity tokens: `gold/10`, `gold/15`, `gold/20`, `white/5`, `white/10`, `navy-deep/5`, `navy-deep/70` (backdrops).

### 2.2 `@theme` additions

```css
@theme {
  /* next/font variable names must DIFFER from the theme names for cormorant (see 3.2) */
  --font-display: var(--font-playfair), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-cormorant: var(--font-cormorant-src), Georgia, serif;

  --text-hero: clamp(3.25rem, 7vw, 6.5rem);   --text-hero--line-height: 1.03;
  --text-hero-xl: clamp(4rem, 9vw, 8.5rem);   --text-hero-xl--line-height: 1;
  --text-h1: clamp(2.5rem, 5vw, 5rem);        --text-h1--line-height: 1.1;
  --text-h2: clamp(2rem, 4vw, 3.5rem);        --text-h2--line-height: 1.15;
  --text-h3: clamp(1.5rem, 2.5vw, 2.25rem);   --text-h3--line-height: 1.2;
  --text-body: 1.125rem;                      --text-body--line-height: 1.6;
  --text-eyebrow: 0.75rem;                    --text-eyebrow--line-height: 1.2;
  --text-eyebrow--letter-spacing: 0.2em;      --text-eyebrow--font-weight: 600;

  --shadow-card: 0 4px 24px rgb(15 38 71 / 0.08);
  --radius-control: 2px;

  --color-gold-text: #7A5B14;
  --color-error: #A3261F;   --color-error-bg: #FBEDEB;
  --color-success: #2F6B3F; --color-success-bg: #EAF3EC;
}
```

(The colour table in 2.1 also lives in `@theme`.)

---

## 3. Typography

### 3.1 Rules

| Role | Classes | Notes |
|---|---|---|
| Hero | `font-display text-hero font-bold text-cream text-balance` | Home hero only |
| H1 to H3 | `font-display text-h1/h2/h3 font-bold text-navy-deep text-balance` | `text-cream` on navy |
| Body | `font-sans text-body text-text-slate text-pretty` | `max-w-[65ch]` |
| Eyebrow | `font-sans text-eyebrow uppercase` | `text-gold-text` on light, `text-gold` on navy; preceded by a `w-8 h-px bg-gold` rule |
| Figures / specs | `font-sans tabular-nums font-semibold` | Spec sheets, proof strip |
| Accent word | `font-cormorant italic font-medium` | One word per headline, and pull quotes |
| Microcopy / buttons | `font-sans text-sm tracking-wide` | |

### 3.2 Fonts (`next/font/google`, `display: "swap"`, `latin`)
- Playfair Display: 400, 600, 700 (`variable: "--font-playfair"`)
- Inter: 400, 500, 600 (`variable: "--font-inter"`)
- Cormorant Garamond: **italic 400 and 500 only**, `variable: "--font-cormorant-src"`.
  The old code used `--font-cormorant`, which would make `@theme --font-cormorant` reference itself. Rename it.

### 3.3 Mixed-type headline pattern
`<Headline>You see the <em className="font-cormorant italic font-medium">magic.</em> We set the stage.</Headline>`
Keep accent words in `content.ts` as a structured value (`{ before, accent, after }`), not as HTML strings.
Headlines must keep real spaces between words even when animated word by word (see 5.5 and 10).

---

## 4. Layout and structure

- `container-site`: max-width 80rem; padding 1.25rem / 2rem (md) / 3rem (lg).
- `section-py`: 5rem; 8rem at `lg`.
- Grid: `lg:grid-cols-12`, `gap-12 lg:gap-24`.
- **Section tone prop:** build one `<Section tone="base|panel|stage">` wrapper that sets background, text colour
  and eyebrow/heading colours, so the light/dark rhythm is enforced in one place.
- **Sticky split:** left `lg:col-span-5 lg:sticky lg:top-32 self-start`, right `lg:col-span-7`. Always `lg:sticky`.
- **Overflow rule:** a sticky element must have no `overflow-hidden` or `overflow-auto` ancestor. Clip decorative
  content in a separate `div.absolute.inset-0.overflow-clip.pointer-events-none` that does not contain the sticky element.
- **Decorative numerals** (`01`, `02`): `aria-hidden`, `font-display`, `text-navy-deep/5`, `z-0`, inside the clip wrapper.
- Hero height: `min-h-svh` (not `h-screen`).
- Radius: 0 for cards, images, sections; `rounded-control` (2px) for buttons, inputs, focus ring.
- Shadow: one static level `shadow-card`; never animated; no glows.
- Lines: 1px or 2px solid tokens only.
- `content-visibility`: define `.cv-auto { content-visibility: auto; contain-intrinsic-size: auto 800px; }` and use it
  on below-the-fold sections. **Do not** use it on sections that contain a sticky column or anchor-link targets.

### 4.1 Z-index scale (CSS variables; use `z-(--z-name)`)

| Variable | Value | Element |
|---|---|---|
| `--z-bg` | 0 | Background images, decorative numerals |
| `--z-content` | 10 | Scrims and text above backgrounds |
| `--z-raised` | 20 | Timeline nodes, overlapping content |
| `--z-floating` | 40 | FloatingContact (desktop), StickyMobileBar (mobile) |
| `--z-cookie` | 45 | Cookie notice (above the mobile bar on mobile) |
| `--z-header` | 50 | Header |
| `--z-drawer-backdrop` | 60 | Mobile menu backdrop |
| `--z-drawer` | 70 | Mobile menu |
| `--z-modal` | 80 | Lightbox / reel modal |

### 4.2 Global widgets
- **Header:** transparent on load, solid `bg-navy-deep` after `scrollY > 40` (`transition-colors duration-300`),
  `border-b border-gold/15`, no backdrop blur, always visible (no hide-on-scroll). **One logo treatment on every page**
  (currently text on some pages and an image on others): use a single logo component; if an image, serve a small
  SVG or a PNG with correct `sizes`.
- **FloatingContact** (`hidden md:flex`, `fixed bottom-8 right-6`) and **StickyMobileBar** (`md:hidden`) swap at `md`
  and never coexist. Keep this.
- **CookieNotice:** on mobile offset above the bar
  (`bottom-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom))]`); bottom-left on desktop.
- Mobile bar: `padding-bottom: env(safe-area-inset-bottom)`; body gets matching bottom padding on mobile.
- Footer: Kothanur map link; address and phone from `content.ts`.

---

## 5. Motion system

### 5.1 Concept: lighting cues
You sell light. Motion is a show's cue sheet: a small set of cues, used consistently.

| Cue | Look | Used for |
|---|---|---|
| **Fade-up** | Opacity 0 to 1 with a 10 to 20px rise | Text, cards |
| **Lights-up** | A navy overlay fades from about 0.7 to 0 while the image settles from 1.06 to 1 | Heroes, Glass House, portfolio tiles |
| **Draw** | A 1 to 2px gold line scales along its axis | Timelines, dividers |
| **Count** | A number ticks up once | Proof strip (real figures only) |

Principles: slow, deliberate, expo-out. Reveals run once. Nothing bounces. Nothing loops except the single
allowed exception in 5.5. Animate only `transform`, `opacity` and (where necessary) `clip-path`. Never animate
`height`, `width`, `box-shadow`, `filter` or `background-position` (sole exception: the FAQ accordion, see 6).
A "lights-up" is an opacity fade on an overlay, which is cheap on phones.

### 5.2 Tokens: `lib/motion.ts` is the only place numbers live

```ts
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,         // default for reveals and slides
  power3: [0.215, 0.61, 0.355, 1] as const, // fades
  linear: "linear" as const,                // line drawing only
};
export const duration = { micro: 0.25, base: 0.5, reveal: 0.7, large: 1.1, cue: 1.2, settle: 6 };
export const distance = { sm: 10, md: 20 };
export const stagger = { step: 0.1, maxTotal: 0.5 };
export const staggerDelay = (i: number) => Math.min(i * stagger.step, stagger.maxTotal);
export const viewport = { once: true, margin: "0px 0px -10% 0px", amount: 0.1 } as const;
```

No component may hard-code a duration, ease or distance. Existing variants (`fadeUp`, `fadeIn`, `staggerContainer`,
`heroWord`) stay but read these tokens (`fadeUp` uses `duration.reveal`, not 0.8).

### 5.3 Bundle and providers
- One client `Providers` component wraps the app in
  `<MotionConfig reducedMotion="user"><LazyMotion features={domAnimation} strict>...</LazyMotion></MotionConfig>`.
- Use `m.*` (not `motion.*`) everywhere. `strict` makes any leftover `motion.*` throw in dev, which catches misses.
  `domAnimation` covers `whileInView`, `animate` and variants. Do not use drag or layout animations; if ever needed,
  import `domMax` for that component only after approval.
- `useScroll`, `useTransform`, `useMotionValue` and the `animate()` function do not depend on LazyMotion features.

### 5.4 Reduced motion (two layers, both required)
1. `MotionConfig reducedMotion="user"` disables transform and layout animations globally and keeps opacity fades.
2. It does **not** cover `clip-path`, scale values, parallax or the scroll-linked crossfade. Any component using
   those also reads `useReducedMotion()` and renders the final static state.
3. The global CSS `prefers-reduced-motion` block stays (CSS animations).
4. Counters show the final value immediately; lights-up becomes an instant reveal.

### 5.5 Primitives (build once, use everywhere; all in `components/motion/`)
- **`Reveal`** (extend the existing `RevealOnScroll`, keep its export name): `m.div`, `initial {opacity 0, y}`,
  `whileInView`, `viewport` token, `data-reveal`, props `delay`, `y`, `className`. **One observer per block**; never drive
  far-apart children from one section-level `useInView`. Siblings stagger with `delay={staggerDelay(i)}`.
- **`LightsUp`**: wraps an image frame: an absolutely positioned `bg-navy-deep` overlay animating opacity
  0.7 to 0 over `duration.cue`, and the image scaling 1.06 to 1 over `duration.settle`. Props: `once`, `trigger="load"|"view"`.
  The scale part checks `useReducedMotion()`. Sets `data-lightsup` on the overlay (see no-JS rule).
- **`LineDraw`**: gold 1 to 2px line, `scaleY` or `scaleX`, `origin-top` or `origin-left`, `ease.linear`,
  `duration.large` per segment, triggered per segment when it enters view.
- **`ImageReveal`**: `clip-path: inset(0 0 100% 0)` to `inset(0)`, `duration.large`, `ease.expo`; own `useReducedMotion()` guard.
- **`CountUp`**: the markup contains the **final value** (visible to crawlers, no-JS and screen readers, e.g. as
  `sr-only` text plus a `data-value` attribute). The visual number animates from 0 once when it enters view,
  `duration.large`, `ease.expo`. Shows the final value instantly when reduced motion is on. Only for real figures.
- **`DayNightCrossfade`** (Glass House only): two stacked images; the night image's opacity is a `useTransform` of
  `scrollYProgress` mapped from 0.2 to 0.6 of the section. Motion values only (no React re-render per frame).
  If no day image exists, fall back to a plain `LightsUp`. Reduced motion: show the night image statically.
- **`useMotionSafe()`**: returns `{ reduced }`; the only way to branch on motion preference.
- **No-JS safety:** root layout includes
  `<noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}[data-lightsup]{opacity:0!important}"}</style></noscript>`.

### 5.6 Hero load sequence (home; `AboutHero` and case-study heroes reuse the pattern)

| t (s) | Element | Motion |
|---|---|---|
| 0 | Image + overlay | Lights-up: overlay 0.7 to 0 over 1.2s; image 1.06 to 1 over 6s (once, no loop) |
| 0.5 | Eyebrow + rule | Fade-up, `duration.base` |
| 0.6 | Headline | Word by word, 0.08s stagger (`heroWord`); real spaces between words; `aria-label` on the `h1` with the full sentence |
| 1.3 | Subline | `fadeIn` |
| 1.5 | CTA(s) | Fade-up |
| 2.0 | Scroll cue | Fade in, then the one allowed loop: chevron opacity 0.4 to 1 over 3s. Static when reduced |

Structure: `<section min-h-svh bg-navy-deep>` then `next/image` (`fill`, `priority`, `quality={80}`, `sizes="100vw"`)
then **two** scrims (left-to-right `--gradient-hero-overlay` plus a bottom vignette) then content.
No `mix-blend-*`, no radial glow layer. **LCP guard:** the hero image must paint immediately; if mobile LCP exceeds
2.5s, shorten the overlay fade, never delay the image.

### 5.7 Signature moments (one per page, nothing more)

| Page | Signature moment | Supporting motion |
|---|---|---|
| Home | Hero lights-up | Proof-strip count-up; project tiles light up on view |
| Signature Sets | Glass House day-to-night crossfade | "Best for" chips stagger in |
| Portfolio | Tiles light up row by row | Filter change: 0.25s opacity swap, no layout animation |
| Case study | Hero lights-up | Production-sheet rows stagger; swipe gallery; desktop lightbox |
| Services | Image clip-reveal per service | Numbered rows fade up |
| How we work / About timeline | Gold line draws segment by segment; each node lights as reached (single ring, no loop) | Fade-up copy |
| Vault | Capacity table rows stagger | Warehouse image reveal; parallax (5.8) |
| Contact | None (calm) | Field focus, error and success fades, FAQ accordion |

### 5.8 Scroll-linked motion
- Parallax (Vault warehouse image only): range **±6%**, `md` and up only, disabled when `useReducedMotion()` is true.
- Crossfade (5.5) is the only other scroll-linked effect.
- `will-change: transform` / `opacity` only on those two elements.
- Timelines are time-based and triggered per node, not scroll-scrubbed.
- No page transitions, no custom cursor, no scroll-jacking.

### 5.9 Mobile smoothness rules
- Few concurrent animations per screen; stagger totals capped at 0.5s.
- Hover-only effects live behind `@media (hover: hover)` so cards do not stick on touch.
- Swipe galleries use CSS scroll-snap with no JS animation.
- Image frames have fixed aspect ratios so reveals never shift layout.
- Test on a real mid-range Android and an iPhone; if motion is janky, simplify it.

---

## 6. Interaction catalog

Use explicit transition properties. Never `transition-all`. Hover/focus transitions are `duration-300` unless noted.

| Component | Spec |
|---|---|
| **Button, primary** | Flat `bg-gold text-navy-deep`; hover `bg-gold-light`; active `bg-gold-dark`; `rounded-control`; `transition-colors`; min height 44px; arrow icon `group-hover:translate-x-1`. Delete `.btn-shimmer`. |
| **Button, outline** | `border border-gold-border text-navy-deep` (on navy: `text-cream border-gold`); hover `bg-gold/10`. |
| **Button, ghost** | Transparent; hover `bg-navy-deep/5` (on navy `bg-white/5`). Disabled: `opacity-50 cursor-not-allowed`. |
| **Focus ring** | `outline-2 outline-offset-3`; `gold-dark` on light, `gold-light` on navy (via `.on-navy` or `data-theme="dark"`). `focus-visible` only. |
| **Text/nav link** | Underline span `h-[2px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300`. |
| **Card / tile** | Border `border-gold-border/25`, hover `/50`. Image inside `overflow-hidden`, `group-hover:scale-105 duration-700` (inside `@media (hover: hover)`). No card scale, no shadow change. |
| **Header** | See 4.2. |
| **Mobile menu** | Slide `x: 100%` to `0`, `duration.base`, `ease.expo` (no spring). Backdrop fade `duration.micro`, solid `bg-navy-deep/70`. Required: focus trap, Escape closes, body scroll lock, `aria-expanded`/`aria-controls` on toggle, focus returns to toggle, links stagger 0.05s. |
| **FloatingContact** | Toggle `h-[52px]`; expands with fade and `y` 10 to 0, `duration.micro`; links stagger 0.05s; Escape and click-outside close; `aria-expanded`. |
| **StickyMobileBar** | Every icon-only link has an `aria-label`; targets at least 44px. |
| **Accordion (FAQ)** | Grid-rows technique (`grid-rows-[0fr]` to `[1fr]`, 400ms) and chevron `rotate-180 duration-300`; `button` with `aria-expanded` and `aria-controls`; panel `role="region"` with `aria-labelledby`. This is the one allowed non-transform exception. |
| **Form field** | `bg-card-bg border border-panel-warm rounded-control`; focus `border-gold-border` plus the gold ring (not blue); label always visible. |
| **Form error** | `text-error text-sm` with icon, `aria-invalid`, `aria-describedby`, `role="alert"` on the summary. |
| **Form success** | `bg-success-bg border border-success/30 text-success rounded-control`; fades in `duration.base`; focus moves to it. |
| **Cookie notice** | Slides `y: 20` to `0`, `duration.base`; non-modal `role="region"` with `aria-label`; no focus trap. |
| **Lightbox / reel modal** | Backdrop fade `duration.micro`; panel fade plus `scale 0.98` to `1`, `duration.base`; focus trap, Escape, `aria-modal`. Video never autoplays. |
| **Filter chips** | Selected: `bg-navy-deep text-cream`; others outlined; list swap is a 0.25s opacity change. |
| **Icons** | lucide-react, stroke 1.5, sizes 16, 20 or 24. |

---

## 7. Page specifications

### 7.1 Home (`/`): new section order
1. **Hero:** lights-up sequence (5.6). Primary CTA "Plan your event"; secondary "Browse the catalogue".
2. **Proof strip (stage tone):** verifiable specs: Since 2006 · 10,000+ chairs · 1,100+ sofa units · 40–125 KVA gensets · Own crew.
   Use `CountUp` for numeric items. The existing "events delivered / corporate clients / crew members" counters
   appear only if the owner confirms real figures (see 8.2); otherwise remove them.
3. **Signature Sets (flagship):** Glass House large and full-bleed (night image), MoonGate secondary; CTA "Enquire about The Glass House".
4. **Project stories:** 3 to 4 case-study cards linking to `/portfolio/[slug]` (see 7.2), not to the catalogue.
5. **Services:** the four pillars. Short.
6. **How we work:** five stages, compact timeline.
7. **The Vault (stage tone):** the four proof cards; CTA "Book a warehouse visit".
8. **Who we work with.**
9. **Closing CTA.** The standalone "Our complete inventory" band is merged into the Vault section.
- Catalogue (external) is linked from the nav and the Vault section only. No other placements.
- One primary CTA phrase everywhere: **"Plan your event"**. Contextual variants: "Enquire about [name]".

### 7.2 Portfolio (`/portfolio`) and case studies (`/portfolio/[slug]`)
- Index: featured stories (case-study cards) then "From our archive" grid; filters: All, Weddings, Celebrations,
  Corporate, Signature Sets. Show a filter only if it has at least one item.
- Archive tiles show real project names. Where a real name does not exist, use a truthful neutral caption
  ("From our archive") with no event type or year.
- Tiles open case studies when one exists; otherwise they open a WhatsApp enquiry with the tile named. They never
  default to the external catalogue.
- Mobile: swipe gallery (scroll-snap). Desktop: large editorial grid.
- **Case-study page:** hero (lights-up), title, eyebrow (type · year), short story (2 to 4 paragraphs),
  **Production sheet**, gallery (swipe on mobile, lightbox on desktop), "Enquire about this setup" CTA, next-project link.
- **Production sheet:** a two-column definition table (`font-sans`, tabular numerals). Only fields with real data
  render; absent fields do not appear. Never show a placeholder. Fields: Event type · Venue · Date · Guest scale ·
  Lighting · Power · Structures · Furniture · Crew · Build time.
- Initial case studies (content already exists in the site copy): `glass-house`, `moongate`, `bwf-meet-up-4`,
  `eden-gardens-palace-grounds`. Add more only with owner-supplied data.

### 7.3 Signature Sets (`/signature-sets`)
Glass House day-to-night crossfade (5.5); gallery with day and night images; "Best for" chips (existing copy);
size, capacity and lead time **only if supplied**; MoonGate section; custom-set CTA. Each set gets a shareable
anchor. CTA "Enquire about [set]" opens the pre-filled WhatsApp or `contact?set=` as now.

### 7.4 Services (`/services`)
Keep the strong content. Add a project link or proof image under each service where one exists. The catalogue link
appears only under Premium Furniture. Add anchor ids `#lighting #power #truss #furniture #decor #production` (the
footer already links to them; verify they work).

### 7.5 The Vault (`/the-vault`)
Promote the capacity table (the best technical proof on the site); keep the warehouse-visit offer. Use a table with
a proper header row, tabular numerals, and a stagger reveal.

### 7.6 About (`/about`)
Fix the warehouse claim (8.2). Replace the founder pull quote with a first-person quote supplied by the owner (the
current text is a third-person bio); until then render it as a normal paragraph, not a quote. Timeline uses
`LineDraw`. Remove the conflicting hero image caption.

### 7.7 Contact (`/contact`)
Server component page exporting metadata, with a client `ContactForm` and `FaqAccordion` inside. The form and FAQ
content must be present in the server-rendered HTML where possible. Short form: event type, date, venue, guests,
name, phone, message. Read `?set=`, `?type=`, `?brief=` to pre-select the event type or subject (wrap
`useSearchParams` in `Suspense`). Show a response-time promise only if the owner confirms one.

### 7.8 Enquiry builder
`lib/enquiry.ts` exports `buildWhatsAppUrl({ kind: "general"|"set"|"project"|"visit", name? })`. Message pattern:
"Hi Hamsalekha, I'd like to enquire about {name}. Date: … Venue: … Guests: …". The phone number comes from
`microcopy.whatsappNumber`. Used by tiles, case studies, signature sets and the mobile bar.

---

## 8. Data and content rules

### 8.1 Project data model (`lib/projects.ts`)
```ts
export type Project = {
  slug: string;
  title: string;
  category: "wedding" | "celebration" | "corporate" | "signature-set" | "trade";
  year?: number;
  venue?: string;
  client?: string;                 // only with owner permission
  summary: string;
  story: string[];
  production?: Partial<{
    eventType: string; venue: string; date: string; guestScale: string;
    lighting: string; power: string; structures: string; furniture: string;
    crew: string; buildTime: string;
  }>;
  images: { src: string; alt: string; kind: "hero" | "day" | "night" | "detail" }[];
};
```
Unknown values are **omitted**, never guessed. Mark owner-pending items with `// TODO(owner): ...`.

### 8.2 Items the owner must confirm (agents must not resolve these by guessing)
1. The real figures behind the home counters (events delivered, years, crew members, corporate clients).
2. About says the Kothanur facility holds "100,000+ sq ft of proprietary inventory", while Services and Vault say truss
   covers venues up to 1,00,000 sq ft. These are different claims; confirm which is true.
3. The founder quote is currently a third-person bio.
4. `hero.jpg` is captioned as a 2025 wedding (home, gallery) and as an early Palace Grounds event (Portfolio stories);
   service photos are reused as "Corporate Conference 2025" and "Product Launch 2024". Confirm what each really shows.
5. Numeric format: choose one style site-wide. Recommended: "1 lakh sq ft" (or "100,000 sq ft"), not "1,00,000".

### 8.3 Voice
Confident, restrained, specific; short sentences; sentence-case headings; CTAs are verbs ("Plan your event",
"Enquire about The Glass House", "Book a warehouse visit"). No exclamation marks. No invented statistics, awards,
clients or testimonials.

### 8.4 Copy location
Every user-visible string lives in `lib/content.ts` (project data in `lib/projects.ts`), including eyebrows, "Scroll",
"WhatsApp"/"Instagram" labels, aria-labels and the headline accent structure. Eyebrows are stored in sentence case
and uppercased with the `uppercase` class.

---

## 9. Imagery

- `next/image` everywhere, accurate `sizes`, `priority` only on the above-the-fold hero.
- `next.config`: set `images.formats: ["image/avif", "image/webp"]` and cap
  `deviceSizes: [360, 640, 828, 1080, 1440, 1920]`, `imageSizes: [96, 160, 256, 384]` so 3840px variants are never requested
  (the live site currently requests `w=3840` even for small cards and the logo; verify in the Network tab).
- Blur placeholders on every image (static imports or `blurDataURL`).
- Quality: hero 80, others default 75.
- Source budgets: hero 1MB or less; others 500KB or less; max 2400px wide.
- Fixed-ratio frames: portrait `aspect-[4/5]`, landscape `aspect-[3/2]`, banners `aspect-[16/9]`.
- Mobile art direction: set `object-position` per breakpoint so the subject stays in frame on portrait screens.
- **Scrims:** at most two layers per image (one directional navy gradient, one bottom vignette). Gradients only for scrims.
- Alt text from content files; decorative images `alt=""`. Alt text must describe what is truly in the photo.
- Night/day pairs for signature sets are named `*-night.jpg` / `*-day.jpg`.
- `/public` holds only brand assets; delete the default Next.js SVGs.

---

## 10. SEO and metadata

- Set `metadataBase` in the root layout from `NEXT_PUBLIC_SITE_URL` (fallback to the current Netlify URL until a
  custom domain exists). Every OG and Twitter image URL must be absolute and live; none may reference `localhost`.
- Every route has its own `title`, `description`, `openGraph` (title, description, image 1200x630) and `canonical`.
  Currently `/portfolio` and `/contact` fall back to home metadata, and OG tags repeat the home values everywhere.
- Page components that need metadata must be server components (client-only pages cannot export it): keep client
  code in child components.
- `generateMetadata` and `generateStaticParams` for `/portfolio/[slug]`; `sitemap.ts` includes case studies.
- JSON-LD: `Organization` and `LocalBusiness` (name, Kothanur Bengaluru address, phone, Instagram `sameAs`, opening
  hours only if supplied); `BreadcrumbList` on case studies. No fabricated ratings or reviews.
- Keep the current local-keyword meta descriptions (Bengaluru, lighting, gensets, truss, furniture).
- Add `error.tsx` and `global-error.tsx`; keep `not-found.tsx`; verify `/privacy` and `/terms` exist.

---

## 11. Accessibility

- **Skip link:** first focusable element, visible on focus, targets `<main id="main">`.
- Targets at least 44x44px on touch; mobile menu button grows from `p-2` to `size-11`.
- Gold text on light uses `gold-text`; see 2.1 for contrast rules.
- Keyboard: every control operable; `focus-visible` ring on light and navy.
- Landmarks: one `<header>`, `<nav aria-label>`, `<main>`, `<footer>`; one `<h1>` per page; headings in order.
- Animated headlines keep real spaces and an `aria-label`.
- Respect `prefers-reduced-motion` (5.4). Video never autoplays with sound; the reel is opt-in.
- Icon-only links and buttons have `aria-label` from `content.ts`.

---

## 12. Performance budgets (mobile, throttled 4G)

| Metric | Target |
|---|---|
| LCP | 2.5s or better |
| CLS | 0.1 or better |
| INP | 200ms or better |
| Gradient layers above the fold | 2 maximum |
| Client boundaries | Server components by default; `Reveal` and other motion primitives are the client boundary; section content passed as `children` can stay server-rendered |

No `backdrop-blur` on fixed elements. Only the listed font weights. `will-change` only on scroll-linked elements.

---

## 13. Out of scope (do not add)

Dark mode, custom cursor, preloader, page transitions, hide-on-scroll header, autoplay background video, scroll-jacking,
inertia-scroll libraries, sound, shimmer or glow effects, infinite loops (other than the hero chevron), invented
content or numbers, and new npm packages without explicit approval.

---

## 14. New component template

```tsx
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/lib/motion";
import { content } from "@/lib/content";

export function ExampleSection() {
  const c = content.example;
  return (
    <Section tone="base">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="self-start lg:col-span-5 lg:sticky lg:top-32">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold" />
            <span className="font-sans text-eyebrow uppercase text-gold-text">{c.eyebrow}</span>
          </Reveal>
          <Reveal delay={staggerDelay(1)}>
            <h2 className="mt-6 font-display text-h2 font-bold text-navy-deep text-balance">
              {c.heading.before}<em className="font-cormorant italic font-medium">{c.heading.accent}</em>{c.heading.after}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          {c.items.map((item, i) => (
            <Reveal key={item.id} delay={staggerDelay(i)}>{/* block */}</Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
```
(Server component; the only client boundary is `Reveal`.)

---

## 15. Definition of done (check on every change)

- [ ] Every utility class used renders (tokens exist in `@theme`); no inline font sizes.
- [ ] No hard-coded durations, eases or distances; tokens imported from `lib/motion.ts`; only `m.*` used.
- [ ] No spring, scale-press, `transition-all`, glow, shimmer or fixed-UI blur.
- [ ] Each reveal block has its own trigger; no section-level `useInView` driving distant children.
- [ ] Reduced motion verified: clip-path, scale, parallax and crossfade are static.
- [ ] AA contrast; gold text on light uses `gold-text`.
- [ ] Keyboard-only walkthrough works; focus ring visible on light and navy.
- [ ] Touch targets 44px or larger; icon-only controls have `aria-label`.
- [ ] No strings outside `content.ts` / `projects.ts`; no invented facts; owner-pending items marked `TODO(owner)`.
- [ ] Each route has its own metadata, absolute OG image, and canonical.
- [ ] Images: `sizes`, blur placeholder, fixed-ratio frame, truthful alt, no 3840px requests.
- [ ] Mobile Lighthouse targets in 12 are met; tested on a mid-range Android and an iPhone.
- [ ] `npm run build` and `npm run lint` pass; no new dependencies.
