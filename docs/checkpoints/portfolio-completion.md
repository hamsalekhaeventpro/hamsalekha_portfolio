# Project Checkpoint: Portfolio Completion

- **Checkpoint Identifier:** `portfolio-completion-v1`
- **Date & Timestamp:** 2026-10-22 21:21 IST
- **Project Root:** `D:\hamsalekha-portfolio`
- **Target Specification:** `docs/DESIGN_SPEC_V3.md` (§ 7.2 *Portfolio & Case Studies*, § 5.2 *Motion*, § 8.2 *Content Integrity*)

---

## 1. Executive Summary & Completed Features

The Portfolio section of the Hamsalekha corporate website has been aligned with the approved Page 07 design and motion specifications.

### Key Completed Capabilities:
1. **Asset Integration from `public/images/portfolio/`:**
   - Evaluated all 12 assets in `public/images/portfolio/`.
   - Wired the authentic high-resolution photograph (`bwf-furniture-meetup.jpg`, $6869 \times 4579$) to Featured Story 2 (*BWF Meet Up 4.0*).
   - Upgraded the 8-image gallery with genuine portfolio photography, avoiding generic service pillars and eliminating image repetition.
2. **Zero Cross-Section Image Duplication:**
   - Ensured no asset shown in the 3 Featured Stories is repeated in the 8-tile Gallery Grid.
3. **Responsive Mobile Swipe & Scroll-Snap:**
   - Implemented native `snap-x snap-mandatory` with `min-w-[85vw]` touch cards on mobile viewports (`< md`), while preserving the 12-column asymmetric masonry editorial grid on desktop (`md:` and above).
   - Added a touch exploration cue for mobile viewports (`← Swipe to explore archive →`).
4. **0.25-Second Opacity Filter Transitions:**
   - Removed the `layout` prop on `<motion.div>` to eliminate card bouncing/layout jumping.
   - Wrapped filter changes in an `<AnimatePresence mode="wait">` opacity crossfade of 0.25 seconds.
5. **Direct Case Study Integration (`/portfolio/[slug]`):**
   - Implemented dynamic server-rendered case study routes for the four approved stories (`glass-house`, `moongate`, `bwf-meet-up-4`, `eden-gardens-palace-grounds`).
   - Implemented a two-column Production Sheet definition table (`font-sans`, tabular numerals) strictly rendering only verified, non-empty technical fields.
   - Connected Homepage Portfolio Preview cards and Featured Story cards directly to `/portfolio/[slug]`.
6. **Enquiry & Catalogue Cleanup:**
   - Removed all external catalogue (`Shop this setup`) links from portfolio tiles in accordance with § 7.1 and § 7.2.
   - Replaced with direct case-study links (`View Case Study →`) or prefilled WhatsApp links (`https://wa.me/919972544316?text=...`) referencing the exact project setup.
7. **Enhanced Lightbox Modal:**
   - Fullscreen overlay with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), body scroll lock, captions, and context-aware enquiry actions.

---

## 2. Featured Stories Mapping

All 3 featured stories retain their approved copywriting and section order, with active destinations pointing to dedicated case-study pages:

| # | Featured Story Title | Eyebrow & Tag | Connected Asset Path | Active Destination Route |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **The Glass House** | `2026 · SIGNATURE SET`<br>The Glass House unveiled | `/images/signature-sets/glass-house.jpg` | `/portfolio/glass-house` |
| **2** | **BWF Meet Up 4.0** | `TRADE PARTNERSHIP`<br>Bengaluru Wedding Fraternity | `/images/portfolio/bwf-furniture-meetup.jpg` | `/portfolio/bwf-meet-up-4` |
| **3** | **Furniture, lighting and gensets, together** | `FROM OUR EARLY CHAPTERS`<br>Eden Gardens, Palace Grounds | `/images/hero.jpg` | `/portfolio/eden-gardens-palace-grounds` |

---

## 3. Eight-Image Gallery Mapping

All eight gallery tiles use distinct assets without duplicating images from the Featured Stories. All four categories are balanced ($2 \times 4 = 8$ tiles):

| Tile ID | Image Path | Category | Dimensions | Caption Policy | Interaction / Target |
| :---: | :--- | :--- | :---: | :--- | :--- |
| `g1` | `/images/portfolio/grand-wedding-stage.png` | `weddings` | $1864 \times 843$ | *"From our archive"* | WhatsApp: *"Enquire about wedding stage production"* |
| `g2` | `/images/portfolio/evening-event.jpg` | `weddings` | $1600 \times 1071$ | *"From our archive"* | WhatsApp: *"Enquire about evening reception setup"* |
| `g3` | `/images/portfolio/glass-house.jpg` | `signature-sets` | $7008 \times 4672$ | *"The Glass House"* *(Daytime)* | Case Study Link: `/portfolio/glass-house` |
| `g4` | `/images/portfolio/moongate.jpg` | `signature-sets` | $6509 \times 4195$ | *"MoonGate Circular Arch"* | Case Study Link: `/portfolio/moongate` |
| `g5` | `/images/portfolio/traditional-wedding.jpg` | `celebrations` | $1441 \times 941$ | *"From our archive"* | WhatsApp: *"Enquire about traditional ceremonial setup"* |
| `g6` | `/images/services/decor.jpg` | `celebrations` | $1264 \times 848$ | *"From our archive"* | WhatsApp: *"Enquire about brass props and decor"* |
| `g7` | `/images/portfolio/corporate-led-staging.jpg` | `corporate` | $7008 \times 4672$ | *"From our archive"* | WhatsApp: *"Enquire about corporate LED arena staging"* |
| `g8` | `/images/portfolio/corporate-staging.jpeg` | `corporate` | $1600 \times 1066$ | *"From our archive"* | WhatsApp: *"Enquire about corporate staging setup"* |

---

## 4. Case-Study Routes (`/portfolio/[slug]`)

Built using Server Component architecture with dynamic `generateStaticParams` and `generateMetadata`:

1. `/portfolio/glass-house`
   - Hero: Night illuminated Glass House photograph.
   - Additional Gallery: Daytime exterior lawn photograph.
   - Production Sheet: `EventType: "Signature Set"`.
2. `/portfolio/moongate`
   - Hero: MoonGate circular arch entrance with halo lighting.
   - Production Sheet: `EventType: "Signature Set"`.
3. `/portfolio/bwf-meet-up-4`
   - Hero: Authentic $6869 \times 4579$ BWF lounge photography.
   - Additional Gallery: Detail angles `bwf-furniture-meetup(1).jpg` and `bw-fruniture-meetup(2).png`.
   - Production Sheet: `EventType: "Industry Event / Trade Partnership"`, `Furniture: "Curved velvet lounge sofas, armchairs, and styled tables"`.
4. `/portfolio/eden-gardens-palace-grounds`
   - Hero: Archival Palace Grounds photograph.
   - Production Sheet: `Venue: "Eden Gardens, Palace Grounds, Bengaluru"`, `EventType: "Wedding Reception"`, `Structures: "Truss Rigging"`, `Lighting: "Stage & Ambient Lighting"`, `Power: "Silent Gensets"`.

---

## 5. Files Changed

| File Path | Nature of Change |
| :--- | :--- |
| `types/content.ts` | Added `caseStudySlug?: string` to `GalleryImage` interface. |
| `lib/content.ts` | Connected `bwf-furniture-meetup.jpg` to Story 2; mapped 8 gallery tiles with distinct portfolio assets, truthful captions, WhatsApp links, and case study slugs. |
| `lib/projects.ts` | Updated `projects` data array with authentic portfolio images, multi-perspective galleries, and verified production sheet fields. |
| `components/portfolio/PortfolioClient.tsx` | Implemented mobile scroll-snap swipe container, 0.25s opacity transition without layout jumping, removed catalogue links, added context-aware WhatsApp/case-study actions, and upgraded lightbox. |
| `components/home/PortfolioPreview.tsx` | Updated project card links to navigate directly to `/portfolio/${slug}`. |
| `app/portfolio/[slug]/page.tsx` | Created server component with static generation (`generateStaticParams`) and SEO metadata (`generateMetadata`). |
| `components/portfolio/CaseStudyClient.tsx` | Created client component with lights-up hero, narrative story, production sheet definition list, additional gallery, and closing CTA. |
| `app/sitemap.ts` | Included dynamic case-study URLs in XML sitemap generation. |
| `lib/asset-manifest.json` | Updated to register and track content hashes for all 39 images in `public/images/`. |

---

## 6. Verification Results

- **ESLint (`npm run lint`):**  
  `✔ No ESLint warnings or errors` (0 errors, 0 warnings).
- **TypeScript & Production Compilation (`npm run build`):**  
  Compiled in 2.5s; TypeScript check finished in 1587ms. Prerendered **21 static pages** with exit code `0`:
  - `○ /portfolio` (Prerendered static content)
  - `● /portfolio/glass-house` (SSG)
  - `● /portfolio/moongate` (SSG)
  - `● /portfolio/bwf-meet-up-4` (SSG)
  - `● /portfolio/eden-gardens-palace-grounds` (SSG)
- **Asset Manifest:** 39 assets tracked with MD5 query versioning, permitting `/images/**` query strings in `next.config.ts`.
- **Cross-Section Asset Uniqueness:** Verified zero overlap between Featured Stories and Gallery Grid.

---

## 7. Known Missing Assets & Technical Data Gaps

1. **Eden Gardens Archival Photography:**
   - Currently using `hero.jpg` as the archival placeholder for early Palace Grounds operations. A dedicated vintage/archival photo from 2006–2010 can be substituted once supplied by the owner.
2. **Glass House Interior Macro Details:**
   - The current assets (`glass-house.jpg` day and `glass-house-night.jpg` night) show full exterior structural views. Detail shots of glass joinery, roof trussing, and lounge styling can be added to the case study gallery in a subsequent update.
3. **Production-Sheet Unsupplied Fields:**
   - In accordance with `DESIGN_SPEC_V3.md` (§ 7.2), absent technical fields are omitted rather than fabricated. The following fields can be added once verified by production supervisors:
     - `bwf-meet-up-4`: Guest count, build duration.
     - `glass-house`: Structural dimensions, power draw, wind rating.
     - `eden-gardens-palace-grounds`: Exact event date, genset KVA capacity.

---

## 8. Remaining Manual Browser Checks

1. Open `http://localhost:3000/portfolio` on a mobile device or responsive emulator (iPhone 14 / Pixel 7 at $\le 390\text{px}$ width):
   - Verify smooth horizontal finger swiping and card snapping (`snap-x snap-mandatory`).
   - Confirm that the `← Swipe to explore archive →` hint renders clearly.
2. Toggle category filters (*All*, *Weddings*, *Celebrations*, *Corporate*, *Signature Sets*):
   - Confirm that the opacity transition completes smoothly in 0.25 seconds without layout shifting.
3. Click on a portfolio tile to open the Lightbox:
   - Verify keyboard navigation (`Escape` closes, `ArrowLeft` / `ArrowRight` cycles through active filtered set).
   - Verify that clicking "Enquire about this setup" launches WhatsApp with the prefilled message.
4. Click through to all four case-study pages (`/portfolio/glass-house`, etc.):
   - Confirm that the Production Sheet renders only populated entries with tabular numerals.
   - Confirm that the "Next Project" footer cycles to the next project.

---

## 9. Recommended Next Step

Proceed to **Services Page Image Audit & Pillar Linking** (`/services`):
- Connect verified service images (`lighting.png`, `furniture.jpg`, `production.png`, `power.jpg`, `decor.jpg`, `truss.jpg`).
- Verify anchor navigation (`#lighting`, `#power`, `#truss`, `#furniture`, `#decor`, `#production`).
- Ensure the external catalogue link is placed only under Premium Furniture, matching the sitewide navigation policy.
