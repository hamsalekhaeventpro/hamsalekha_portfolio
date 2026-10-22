# Checkpoint: Website-Wide Image Audit & Signature Sets Full Image Display

**Date:** 2026-10-22  
**Commit Target:** `fix: preserve full images across website pages`  
**Branch:** `master`

---

## 1. Executive Summary

A comprehensive website-wide image audit was performed across all 21 routes of the Hamsalekha Event Production portfolio. Every photograph was verified to ensure:
- 100% complete photograph visibility with zero unintentional cropping, zoom cut-offs, or forced aspect-ratio distortion.
- Natural aspect ratio preservation using `object-fit: contain` with seamless dark stage letterboxing (`#050d1c`).
- Full separation of interactive UI controls (e.g. Day/Night view toggle) from photography subjects.
- Robust cross-device layout responsiveness across mobile, tablet, and desktop breakpoints.

---

## 2. Completed Implementations & Component Updates

### A. Signature Sets (`components/home/SignatureFeature.tsx` & `components/home/signature-feature.css`)
- **Day/Night Toggle Separation**:
  - Mobile (`<900px`): Relocated toggle from inside the photograph (`top: calc(var(--img-h) - 54px)`) to a dedicated control bar below the image band (`top: calc(var(--img-h) + 10px)`). The copy block was adjusted to begin beneath the toggle (`top: calc(var(--img-h) + 64px)`), guaranteeing 0px overlap with the photograph.
  - Desktop (`≥900px`): Relocated toggle below the stage media container (`top: calc(50% + 32svh + 14px); left: 8vw;`).
- **Glass House Photo Preservation**:
  - Set `object-fit: contain` on both Day aerial (`DJI_20260816180926_0336_D_VG.jpg`, 1.796 ratio) and Night pavilion (`PHOTOS_DEE05557.jpg`, 1.500 ratio).
  - Neutralized the 1.04×–1.26× push-in scale so that all four edges of the Glass House, trees, lawn, and lighting remain visible throughout scroll progress.
- **MoonGate Arch Reveal**:
  - Removed the initial 1.08× mobile zoom (`transform: none !important`).
  - Calibrated `--c` so that at `--m = 1`, the expanding circle reveal completely unmasks 100% of the photograph within the band.

### B. Dedicated Signature Sets Page (`components/signature-sets/SignatureSetsClient.tsx`)
- **The Glass House**: Replaced `aspect-[21/9]` with `aspect-[16/10] md:aspect-[3/2] max-h-[72vh]` using `object-contain`, completely eliminating the 35% vertical height crop.
- **The MoonGate**: Upgraded from a square circular crop to an architectural framed display (`aspect-[1.55/1]`, max-width 540px) with `object-contain`, revealing the complete circular arch, gold LED halo, floral decoration, and walkway.

### C. About Page (`components/about/AboutClient.tsx`)
- **Founder Portrait**: Fixed critical bug where a landscape 3:2 photograph (`founder.jpg`, $1536 \times 1024$) was forced into an `aspect-[3/4]` portrait box (lopping off over 50% horizontally). Upgraded container to `aspect-[3/2] max-w-[460px]` with `object-contain bg-base-warm`.
- **First Facility (`hero.jpg`)**: Updated from `aspect-[4/3]` to `aspect-[1.12/1] sm:aspect-[4/3]` with `object-contain bg-navy-deep`.
- **Crew Group Photo (`our-people-crew.jpg`)**: Updated from `aspect-[21/9]` to `aspect-[3/2] max-w-4xl` with `object-contain bg-navy-deep`.
- **Flagship Set (`glass-house.jpg`)**: Updated from `aspect-[4/3]` to `aspect-[3/2]` with `object-contain`.

### D. Homepage Intro (`components/home/HomeIntro.tsx`)
- **Founder Card**: Upgraded container from `aspect-[4/5]` to `aspect-[3/2] max-w-[420px]` with `object-contain`, eliminating lateral cropping.

### E. Services Page (`components/services/ServicesClient.tsx`)
- Replaced fixed pixel height (`h-[360px] sm:h-[420px] lg:h-[560px]`) with responsive `aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]` containers with `object-contain bg-navy-deep`.
- Verified all 6 service setups: Lighting, Power, Truss, Furniture, Decor, Full Production.

### F. The Vault (`components/vault/VaultClient.tsx`)
- **Warehouse (`warehouse.jpg`)**: Upgraded container to `aspect-[16/10] md:aspect-[16/9]` with `object-contain`.
- **Crew (`our-people-crew.jpg`)**: Upgraded container to `aspect-[3/2] max-w-4xl` with `object-contain`.

### G. Portfolio & Case Studies
- **Portfolio Featured Stories ([`components/portfolio/PortfolioClient.tsx`](file:///d:/hamsalekha-portfolio/components/portfolio/PortfolioClient.tsx))**: Upgraded all three story containers to `aspect-[3/2]` with `object-contain`.
- **Case Study Hero ([`components/portfolio/CaseStudyClient.tsx`](file:///d:/hamsalekha-portfolio/components/portfolio/CaseStudyClient.tsx))**: Upgraded hero container to `aspect-[16/10] sm:aspect-[16/9] lg:aspect-[3/2]` with `object-contain`.

---

## 3. Automated Viewport & Validation Results

### Responsive Overlap & Geometry Testing (Headless Chrome CDP)
Verified at 320px, 375px, 390px, 430px, 768px, 899px, 900px, 1440px, and 1920px viewports:
- Mobile Day/Night toggle vertical gap to photograph: **+6px to +10px** (PASS: 0px overlap).
- Desktop Day/Night toggle vertical gap to photograph: **+50px** (PASS: 0px overlap).
- Computed `object-fit`: **contain** across all target components.

### Build & Quality Verification
- **ESLint**: Passed with **0 errors, 0 warnings** (`npm run lint`).
- **Next.js Production SSG Build**: **21/21 static routes** generated cleanly in **1.3s** (`npm run build`).
- **Asset Integrity**: All 39 source images in `public/images/` remained untouched (no recompression, no deletion).

---

## 4. Known Limitations & Notes
- Untracked utility scripts and scratch profiling files in `scripts/` and `docs/screenshots/` are retained locally and deliberately excluded from this commit.
- External API integrations (e.g. Resend enquiry email submission) remain configured to use fallback logging when live environment credentials are not present in `.env.local`.
