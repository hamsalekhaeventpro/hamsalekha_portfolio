// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Service Cards ────────────────────────────────────────────
export interface ServiceCard {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

// ─── About / Timeline ─────────────────────────────────────────
export interface TimelineEntry {
  year: string;
  description: string;
}

export interface ValueTile {
  title: string;
  body: string;
}

export interface FounderInfo {
  name: string;
  title: string;
  bio: string;
  image: string;
}

// ─── Process Steps ────────────────────────────────────────────
export interface ProcessStep {
  number: string;
  stage: string;
  body: string;
}

// ─── Inventory ────────────────────────────────────────────────
export interface InventoryRow {
  category: string;
  capacity: string;
}

// ─── Portfolio ────────────────────────────────────────────────
export type GalleryCategory =
  | "all"
  | "weddings"
  | "celebrations"
  | "corporate"
  | "signature-sets";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  eventType: string;
  venue: string;
  year: string;
  catalogueHref?: string;
  span?: "normal" | "tall"; // for masonry visual variation
}

export interface FeaturedStory {
  tag: string;
  subtitle: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

// ─── Signature Sets ───────────────────────────────────────────
export interface SignatureSet {
  eyebrow: string;
  title: string;
  headline: string;
  body: string;
  launched?: string;
  bestFor?: string[];
  comesWith?: string[];
  bullets?: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

// ─── Contact / Form ───────────────────────────────────────────
export interface EnquiryField {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "select" | "multiselect" | "date" | "textarea";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Stats ────────────────────────────────────────────────────
export interface StatItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

// ─── SEO ──────────────────────────────────────────────────────
export interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
}

// ─── Footer ───────────────────────────────────────────────────
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}
