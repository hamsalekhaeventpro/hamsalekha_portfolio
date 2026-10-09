export type Project = {
  slug: string;
  title: string;
  category: "wedding" | "celebration" | "corporate" | "signature-set" | "trade";
  year?: number;
  venue?: string;
  client?: string;
  summary: string;
  story: string[];
  production?: Partial<{
    eventType: string;
    venue: string;
    date: string;
    guestScale: string;
    lighting: string;
    power: string;
    structures: string;
    furniture: string;
    crew: string;
    buildTime: string;
  }>;
  images: { src: string; alt: string; kind: "hero" | "day" | "night" | "detail" }[];
};

export const projects: Project[] = [
  {
    slug: "glass-house",
    title: "The Glass House",
    category: "signature-set",
    year: 2026,
    // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set
    summary: "South India's first-of-its-kind glass theme set, designed for receptions and launches.",
    story: [
      "The Glass House is a flagship signature set, providing a transparent, glowing venue that integrates with its surroundings while offering full weather protection and rigging points."
    ],
    production: {
      eventType: "Signature Set",
    },
    images: [
      { src: "/images/signature-sets/glass-house.jpg", alt: "The Glass House glowing at night", kind: "night" }
    ]
  },
  {
    slug: "moongate",
    title: "MoonGate",
    category: "signature-set",
    summary: "Our circular arch set: a full-moon frame for entries, stages and photo moments.",
    story: [
      "MoonGate turns a walkway into a threshold and gives every guest the photograph they came for, with built-in halo lighting."
    ],
    production: {
      eventType: "Signature Set",
    },
    images: [
      { src: "/images/signature-sets/moongate.jpg", alt: "MoonGate circular arch", kind: "hero" }
    ]
  },
  {
    slug: "bwf-meet-up-4",
    title: "BWF Meet Up 4.0",
    category: "trade",
    summary: "Furniture Partner for the Bengaluru Wedding Fraternity Meet Up 4.0.",
    story: [
      "Providing premium furniture and seating arrangements for Bengaluru's premier wedding industry gathering."
    ],
    production: {
      eventType: "Industry Event",
    },
    // TODO(owner): confirm image mapping for BWF Meet Up 4
    images: [
      { src: "/images/about-timeline.jpg", alt: "BWF Meet Up 4.0 event", kind: "hero" }
    ]
  },
  {
    slug: "eden-gardens-palace-grounds",
    title: "Eden Gardens, Palace Grounds",
    category: "wedding",
    summary: "Early events where Hamsalekha delivered furniture, lighting and power as one package.",
    story: [
      "Events at Eden Gardens, Palace Grounds were among the first where Hamsalekha delivered furniture, lighting and power as one package — the beginning of the complete production house we are today."
    ],
    production: {
      venue: "Eden Gardens, Palace Grounds",
    },
    // TODO(owner): confirm image mapping for Eden Gardens
    images: [
      { src: "/images/hero.jpg", alt: "Palace Grounds early event", kind: "hero" }
    ]
  }
];
