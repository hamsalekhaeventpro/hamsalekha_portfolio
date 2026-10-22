import { asset } from "@/lib/assets";
import type {
  NavItem,
  ServiceCard,
  TimelineEntry,
  ValueTile,
  FounderInfo,
  ProcessStep,
  InventoryRow,
  GalleryImage,
  FeaturedStory,
  SignatureSet,
  EnquiryField,
  FAQItem,
  StatItem,
  PageMeta,
  FooterColumn,
} from "@/types/content";

// ─── Global / Microcopy ───────────────────────────────────────

export const microcopy = {
  primaryCta: "Plan Your Event",
  catalogueLabel: "Browse the Catalogue →",
  catalogueUrl: "https://hamsalekha-event-production.web.app/",
  whatsappTooltip: "Chat with our team",
  whatsappNumber: "919972544316",
  whatsappNumberDisplay: "+91 99725 44316",
  whatsappMessage:
    "Hi Hamsalekha, I'd like to plan an event. Date: … Venue: … Guests: …",
  stickyBarLinks: ["Call", "WhatsApp", "Enquire"] as const,
  anniversaryBadge: "Hamsalekha · 20 Years · Since 2006",
  notFoundHeadline: "This stage isn't built yet.",
  notFoundSubline: "The page you're looking for doesn't exist.",
  notFoundCta: "Back to Home →",
  cookieNotice: "We use essential cookies to run this site.",
  phone: "+91 99725 44316",
  phoneRaw: "+919972544316",
  email: "hamsalekhaeventproductionpriva@gmail.com",
  instagram: "@hamsalekha.event.production",
  instagramUrl: "https://www.instagram.com/hamsalekha.event.production",
  address: "Kothanur, Bengaluru",
  addressNote: "Full address — to be provided",
  hours: "Warehouse visits by appointment",
} as const;

// ─── Navigation ───────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Signature Sets", href: "/signature-sets" },
  { label: "The Vault", href: "/the-vault" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  {
    label: "Catalogue ↗",
    href: microcopy.catalogueUrl,
    external: true,
  },
];

// ─── Footer ───────────────────────────────────────────────────

export const footerTagline =
  "Lighting, power, structures, premium furniture and props. Bengaluru, since 2006.";

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "The Vault", href: "/the-vault" },
      { label: "Careers", href: "/contact#careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Lighting", href: "/services#lighting" },
      { label: "Gensets & Power", href: "/services#power" },
      { label: "Truss & Structures", href: "/services#truss" },
      { label: "Premium Furniture", href: "/services#furniture" },
      { label: "Decor & Props", href: "/services#decor" },
      { label: "Full Production", href: "/services#production" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Signature Sets", href: "/signature-sets" },
      { label: "Portfolio", href: "/portfolio" },
      {
        label: "Catalogue ↗",
        href: microcopy.catalogueUrl,
        external: true,
      },
      { label: "FAQ", href: "/contact#faq" },
    ],
  },
];

// ─── Home ─────────────────────────────────────────────────────

export const homeHero = {
  eyebrow: "HAMSALEKHA EVENT PRODUCTION · SINCE 2006",
  line1: "You see the magic.",
  line2: "We set the stage for it.",
  subline: "Lighting, power, structures, premium furniture and props for weddings, corporate events and celebrations — built, run and struck by one Bengaluru team for twenty years.",
  cta: "PLAN YOUR EVENT",
  ctaHref: "/contact",
  catalogueLabel: "BROWSE THE CATALOGUE",
  catalogueHref: "https://hamsalekha-event-production.web.app/",
  image: asset("/images/hero.jpg"),
  imageAlt:
    "Grand outdoor wedding reception staged by Hamsalekha Event Production, Bengaluru, with truss lighting and premium furniture",
};

export const homeStats: StatItem[] = [
  { value: 20, prefix: "", suffix: " years", label: "Building events\nsince 2006" },
  { value: 10000, prefix: "", suffix: "+", label: "Chairs across\n34 designs" },
  { value: 1100, prefix: "", suffix: "+", label: "Sofa units\nacross 61 designs" },
  { value: 100000, prefix: "", suffix: "", label: "Sq ft of trussing\ncapacity" },
  { value: 40, prefix: "", suffix: "–125", label: "KVA gensets on\ncall" },
];

export const homeIntro = {
  eyebrow: "An event production house, not a rental counter.",
  body: "Most suppliers hand over furniture at the gate. We arrive before the decorator and leave after the last guest. The lights on the mandap, the power behind them, the truss overhead, the stage and every chair all come from one warehouse and one crew.",
  body2: "That is what twenty years in Bengaluru has built: the inventory to say yes, and the people to deliver it.",
  ctaLabel: "Our story →",
  ctaHref: "/about",
};

export const homeClosingCTA = {
  headline: "Let's create extraordinary.",
  subline: "Share your date, venue and guest count. Our team will come back with a plan and an itemised proposal.",
  proof: "SPACES · EXPERIENCES · TOGETHER",
  cta: "PLAN YOUR EVENT",
  ctaHref: "/contact",
  secondaryLabel: "WHATSAPP +91 99725 44316",
  secondaryHref: "https://wa.me/919972544316",
};

export const whoWeWorkWith = [
  {
    label: "Wedding planners & decorators",
    description: "Deep inventory, dependable timelines and a crew that builds faithfully to your design.",
  },
  {
    label: "Families",
    description: "One partner for light, power, stage and furniture, so nothing falls between vendors.",
  },
  {
    label: "Corporates & agencies",
    description: "Conferences, launches, award nights and dealer meets delivered to brief and schedule.",
  },
  {
    label: "Venues & convention centres",
    description: "A production partner that has worked Bengaluru's halls and grounds for two decades.",
  },
];


export const services: ServiceCard[] = [
  {
    eyebrow: "SINCE 2006",
    title: "Lighting",
    description: "Architectural, ambient and stage lighting designed for the venue and the camera.",
    bullets: [
      "Architectural and ambient lighting, uplighting and festoons",
      "Chandeliers and decorative fixtures",
      "Stage, concert and conference lighting",
      "Lighting for convention centres, festivals, roads and outdoor events",
    ],
    ctaLabel: "Explore lighting →",
      ctaHref: "/services#lighting",
    image: asset("/images/services/lighting.png"),
    imageAlt:
      "Professional event lighting with festoon canopy and chandeliers at an Indian wedding reception staged by Hamsalekha",
  },
  {
    eyebrow: "SINCE 2007",
    title: "Gensets & Power",
    description: "40–125 KVA gensets with our own operators, so the celebration never goes dark.",
    bullets: [
      "Silent gensets from 40 to 125 KVA",
      "Power distribution and cabling",
      "Fuel planning and backup for the full event",
      "On-site technicians from setup to strike",
    ],
    ctaLabel: "Explore power →",
      ctaHref: "/services#power",
    image: asset("/images/services/power.jpg"),
    imageAlt:
      "Industrial silent generator set providing power for a large-scale event by Hamsalekha Event Production",
  },
  {
    eyebrow: "SINCE 2010",
    title: "Truss & Structures",
    description: "Bombay truss, pagodas, stages and ramps, engineered up to 1,00,000 sq ft.",
    bullets: [
      "Bombay truss and aluminium truss grids",
      "Pagoda tents and hangar structures",
      "Stages, ramps, risers and catwalks",
      "LED wall and backdrop framing; rigging for lighting, sound and decor",
    ],
    ctaLabel: "Explore structures →",
      ctaHref: "/services#truss",
    image: asset("/images/services/truss.jpg"),
    imageAlt:
      "Aluminium truss grid structure being rigged for a large event venue by Hamsalekha crew",
  },
  {
    eyebrow: "SINCE 2013",
    title: "Premium Furniture",
    description: "Imported and designer chairs, sofas, lounges and tables for every theme.",
    bullets: [
      "Imported and designer chairs, sofas, lounges and ottomans",
      "Stage and couple seating, thrones and mandap furniture",
      "Dining, banquet, cocktail and conference tables",
      "Bars, counters, consoles and display furniture",
    ],
    ctaLabel: "Explore furniture →",
    ctaHref: "/services#furniture",
    image: asset("/images/services/furniture.jpg"),
    imageAlt:
      "Imported lounge seating with gold and navy velvet sofas arranged for a premium cocktail event by Hamsalekha",
  },
  {
    eyebrow: "TWENTY YEARS OF DETAIL",
    title: "Decor & Props",
    description: "Mandap props, entrance gates, traditional brass and themed installations.",
    bullets: [
      "Mandap and stage props, arches and entrance gates",
      "Brass, deepas, urulis and traditional decor",
      "Photo zones and lounge styling",
      "Signature sets, including The Glass House and MoonGate",
    ],
    ctaLabel: "Explore decor →",
    ctaHref: "/services#decor",
    image: asset("/images/services/decor.jpg"),
    imageAlt:
      "Ornate mandap with traditional brass deepas and floral decorations at a South Indian wedding staged by Hamsalekha",
  },
  {
    eyebrow: "END TO END",
    title: "Full Event Production",
    description: "One accountable team from site recce to final strike.",
    bullets: [
      "Site recce and technical layouts",
      "One production lead from brief to strike",
      "Coordination with your planner, caterer and sound team",
      "On-site crew throughout the event",
    ],
    ctaLabel: "Explore production →",
      ctaHref: "/services#production",
    image: asset("/images/services/production.png"),
    imageAlt:
      "Hamsalekha production crew setting up a large corporate event venue with stage lighting and LED screens",
  },
];

export const eventsWeProduceTags = [
  "Weddings & receptions",
  "Sangeet, mehendi & haldi",
  "Engagements",
  "Pujas & housewarmings",
  "Corporate conferences",
  "Product launches",
  "Award nights",
  "Dealer meets",
  "Exhibitions",
  "Festivals & cultural events",
  "Birthdays & anniversaries",
];

export const whereWeWork = {
  eyebrow: "COVERAGE",
  headline: "Where We Work",
  body: "Based in Kothanur, Bengaluru, and delivering events across the city and beyond.",
  ctaLabel: "Plan Your Event",
  ctaHref: "/contact",
};

export const servicesPageList = [
  {
    id: "lighting",
    number: "01",
    eyebrow: "SINCE 2006",
    title: "Lighting",
    headline: "Light that sets the mood.",
    description: "Architectural, ambient and stage lighting designed for the venue and the camera.",
    bullets: [
      "Architectural and ambient lighting, uplighting and festoons",
      "Chandeliers and decorative fixtures",
      "Stage, concert and conference lighting",
      "Lighting for convention centres, festivals, roads and outdoor events",
    ],
    ctaLabel: "Plan your lighting →",
    ctaHref: "/contact?service=Lighting",
    image: asset("/images/services/lighting.png"),
    imageAlt:
      "Professional event lighting with festoon canopy and chandeliers at an Indian wedding reception staged by Hamsalekha",
  },
  {
    id: "power",
    number: "02",
    eyebrow: "SINCE 2007",
    title: "Gensets & Power",
    headline: "Power that never blinks.",
    description: "40–125 KVA gensets with our own operators, so the celebration never goes dark.",
    bullets: [
      "Silent gensets from 40 to 125 KVA",
      "Power distribution and cabling",
      "Fuel planning and backup for the full event",
      "On-site technicians from setup to strike",
    ],
    ctaLabel: "Plan your power →",
    ctaHref: "/contact?service=Gensets",
    image: asset("/images/services/power.jpg"),
    imageAlt:
      "Industrial silent generator set providing power for a large-scale event by Hamsalekha Event Production",
  },
  {
    id: "truss",
    number: "03",
    eyebrow: "SINCE 2010",
    title: "Truss & Structures",
    headline: "Structures engineered to hold the moment.",
    description: "Bombay truss, pagodas, stages and ramps, engineered up to 1,00,000 sq ft.",
    bullets: [
      "Bombay truss and aluminium truss grids",
      "Pagoda tents and hangar structures",
      "Stages, ramps, risers and catwalks",
      "LED wall and backdrop framing; rigging for lighting, sound and decor",
    ],
    ctaLabel: "Plan your structures →",
    ctaHref: "/contact?service=Truss",
    image: asset("/images/services/truss.jpg"),
    imageAlt:
      "Aluminium truss grid structure being rigged for a large event venue by Hamsalekha crew",
  },
  {
    id: "furniture",
    number: "04",
    eyebrow: "SINCE 2013",
    title: "Premium Furniture",
    headline: "A seat for every occasion.",
    description: "Imported and designer chairs, sofas, lounges and tables for every theme. 10,000+ chairs across 34 designs, 1,100+ sofa units across 61 designs, with imported collections since 2020.",
    bullets: [
      "Imported and designer chairs, sofas, lounges and ottomans",
      "Stage and couple seating, thrones and mandap furniture",
      "Dining, banquet, cocktail and conference tables",
      "Bars, counters, consoles and display furniture",
    ],
    ctaLabel: "Browse the full catalogue ↗",
    ctaHref: microcopy.catalogueUrl,
    image: asset("/images/services/furniture.jpg"),
    imageAlt:
      "Imported lounge seating with gold and navy velvet sofas arranged for a premium cocktail event by Hamsalekha",
  },
  {
    id: "decor",
    number: "05",
    eyebrow: "TWENTY YEARS OF DETAIL",
    title: "Decor & Props",
    headline: "The details guests remember.",
    description: "Mandap props, entrance gates, traditional brass and themed installations. Signature sets, including The Glass House and MoonGate.",
    bullets: [
      "Mandap and stage props, arches and entrance gates",
      "Brass, deepas, urulis and traditional decor",
      "Photo zones and lounge styling",
      "Signature sets, including The Glass House and MoonGate",
    ],
    ctaLabel: "Plan your decor →",
    ctaHref: "/contact?service=Decor",
    image: asset("/images/services/decor.jpg"),
    imageAlt:
      "Ornate mandap with traditional brass deepas and floral decorations at a South Indian wedding staged by Hamsalekha",
  },
  {
    id: "production",
    number: "06",
    eyebrow: "END TO END",
    title: "Full Event Production",
    headline: "Hand us the brief. We'll hand you the event.",
    description: "One accountable team from site recce to final strike.",
    bullets: [
      "Site recce and technical layouts",
      "One production lead from brief to strike",
      "Coordination with your planner, caterer and sound team",
      "On-site crew throughout the event",
    ],
    ctaLabel: "Plan your full production →",
    ctaHref: "/contact?service=Full%20Production",
    image: asset("/images/services/production.png"),
    imageAlt:
      "Hamsalekha production crew setting up a large corporate event venue with stage lighting and LED screens",
  },
];

// ─── Signature Sets ───────────────────────────────────────────

export const signatureSets: SignatureSet[] = [
  {
    // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set
    eyebrow: "SOUTH INDIA'S FIRST-OF-ITS-KIND GLASS THEME SET",
    title: "The Glass House",
    headline: "A new canvas for extraordinary celebrations.",
    launched: "Launched 2026",
    body: "The Glass House is a walk-in glass structure set inside your venue or on an open lawn. By day it fills with natural light. By night it glows like a lantern, lit from within and visible from every corner of the event.\n\nIt was created for moments that deserve to be framed: a sangeet stage, a reception lounge, a couple's entry, a luxury brand launch. Launched in our twentieth year, it is the clearest expression of where Hamsalekha is headed.",
    bestFor: [
      "Receptions",
      "Sangeets",
      "Cocktail evenings",
      "Pre-wedding shoots",
      "Brand launches",
      "Private dinners",
    ],
    comesWith: [
      "Styling with our premium furniture and lighting, or your decorator's design",
      "Installation, power and on-site support by the Hamsalekha crew",
    ],
    ctaLabel: "Enquire About The Glass House",
    ctaHref: "/contact?service=Glass%20House",
    image: asset("/images/signature-sets/glass-house.jpg"),
    imageAlt:
      "The Glass House — South India's first glass theme set by Hamsalekha, glowing at night on an outdoor lawn",
  },
  {
    eyebrow: "SIGNATURE SET",
    title: "MoonGate",
    headline: "An entrance worth waiting for.",
    body: "MoonGate is our circular arch set: a full-moon frame for entries, stages and photo moments. It turns a walkway into a threshold and gives every guest the photograph they came for.",
    bullets: [
      "Works as an entrance, a stage backdrop or a couple's frame",
      "Pairs with our lighting for a glowing night-time halo",
    ],
    ctaLabel: "Enquire About MoonGate",
    ctaHref: "/contact?service=MoonGate",
    image: asset("/images/signature-sets/moongate.jpg"),
    imageAlt:
      "MoonGate circular arch with gold LED halo and floral decorations at a luxury wedding reception by Hamsalekha",
  },
];

export const customSetCTA = {
  headline: "Want a set built around your story?",
  body: "Our team designs custom structures for weddings and brands, bringing together our truss, lighting, furniture and props into one set.",
  ctaLabel: "Start a Custom Brief",
  ctaHref: "/contact?brief=custom",
};

// ─── The Vault ────────────────────────────────────────────────

export const vaultHero = {
  eyebrow: "THE VAULT",
  headline: "Scale is our quiet advantage.",
  subline:
    "Twenty years of inventory, one warehouse and a crew that has done this thousands of times.",
};

export const inventory: InventoryRow[] = [
  { category: "Chairs", capacity: "10,000+ across 34 designs" },
  { category: "Sofa units", capacity: "1,100+ across 61 designs" },
  // TODO(owner): resolve mixed number format (1,00,000 vs 100,000+) and claim (100,000+ sq ft inventory vs trussing up to 1,00,000 sq ft)
  { category: "Trussing", capacity: "Up to 1,00,000 sq ft" },
  { category: "Gensets", capacity: "40 to 125 KVA" },
  {
    category: "Lighting, tables & props",
    capacity: "Full ranges for weddings, corporate events and festivals",
  },
];

export const warehouseSection = {
  eyebrow: "THE WAREHOUSE",
  headline: "Everything under one roof.",
  body: "Lighting, power, structures, furniture and props are stored, prepared and dispatched from our warehouse in Kothanur, Bengaluru. When stock sits in one place, planning is faster and nothing is left to chance.",
  image: asset("/images/vault/warehouse.jpg"),
  imageAlt:
    "Hamsalekha Event Production warehouse interior in Kothanur, Bengaluru, showing rows of event chairs and sofa inventory",
};

export const crewSection = {
  eyebrow: "THE CREW",
  headline: "People who stay until the last piece is loaded.",
  body: "Riggers, electricians, genset operators, carpenters, drivers and site supervisors — our own team, not subcontractors. Many have grown with Hamsalekha for years, and they carry that experience into every load-in.",
  image: asset("/images/about/our-people-crew.jpg"),
  imageAlt: "Own crew on every build — riggers, carpenters, and technicians from load-in to final strike",
};

export const protectionPoints = [
  "Structures planned and rigged by our own team before guests arrive",
  "Gensets run and fuel-planned with backup for the full event",
  "Power distribution handled by our technicians",
  "A site briefing before every build",
];

export const vaultPillars = [
  {
    eyebrow: "POWER",
    title: "In-house gensets",
    body: "Silent 40–125 KVA sets with our own operators. Power planned before any wire is laid.",
  },
  {
    eyebrow: "STRUCTURES",
    title: "Own crew, always",
    body: "Riggers and carpenters on every build — not subcontractors. They carry the same standards site to site.",
  },
  {
    eyebrow: "INVENTORY",
    title: "One warehouse",
    body: "10,000+ chairs, 1,100+ sofa units, lighting and props — all dispatched from Kothanur.",
  },
  {
    eyebrow: "CREW",
    title: "People who stay",
    body: "From load-in to strike, our team is on-site. We leave when the venue is back to how we found it.",
  },
];

export const vaultCTA = {
  headline: "See the scale for yourself.",
  body: "Planners, decorators and corporate teams are welcome to visit the warehouse by appointment.",
  ctaLabel: "Book a Warehouse Visit",
  ctaHref: "/contact?type=warehouse-visit",
};

// ─── How We Work ──────────────────────────────────────────────

export const howWeWorkHero = {
  eyebrow: "OUR PROCESS",
  headline: "From first call to final strike.",
  subline: "Five stages, one team and no surprises on the day.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    stage: "Brief",
    body: "Tell us the date, venue, guest count and the feeling you want to create. Share your planner's or decorator's moodboard if you have one. We listen first.",
  },
  {
    number: "02",
    stage: "Recce & Plan",
    body: "We visit the venue, measure the space, check power and access, and draw the layout: lighting, genset placement, truss, stage and seating.",
  },
  {
    number: "03",
    stage: "Proposal",
    body: "You receive a clear, itemised proposal listing every piece, quantity and timeline. Choose from the catalogue or let us curate, and revise until it is right.",
  },
  {
    number: "04",
    stage: "Build",
    body: "Our crew loads in to schedule, raises structures, lights the space, places furniture and tests power. Your site lead walks the venue with you before handover.",
  },
  {
    number: "05",
    stage: "Show & Strike",
    body: "Technicians and crew stay through the event. When the last guest leaves, we strike cleanly and return the venue the way we found it.",
  },
];

export const howWeWorkCTA = {
  headline: "Ready for step one?",
  ctaLabel: "Start Your Brief",
  ctaHref: "/contact",
};

// ─── About ────────────────────────────────────────────────────

export const aboutHero = {
  eyebrow: "OUR STORY · 2006 — 2026",
  title1: "Twenty years.",
  title2: "Built one event at a time.",
  body:
    "In 2006 there was no twenty-year plan. There was a dream of building something of our own, a willingness to work hard, and the belief that one opportunity would lead to another.",
  headline: "Twenty years of building experiences.",
  image: asset("/images/about/hero.jpg"),
  imageAlt:
    "Early days of Hamsalekha Event Production warehouse in Kothanur, Bengaluru, circa 2006",
};

export const aboutStory = [
  "Ramesh V started Hamsalekha from his home in 2006 with lighting equipment and a small, loyal team. The name came first — a word that carried weight, a name that felt like a promise. Within the year, we had a proper office and a warehouse in Kothanur.",
  "The early years moved quickly. Gensets came in 2007 so we could offer lighting and power together. By 2008 and 2009 we were in convention centres and at large-scale events across Bengaluru, including the grounds at Eden Gardens, Palace Grounds.",
  "Truss and structures followed in 2010. Furniture launched in 2013 as clients began asking for more. In 2017, the next generation of the family joined — bringing new thinking to a business that had already been built on getting it right.",
  "In 2020 events stopped. What could have been the most difficult chapter in our history became a turning point. Hamsalekha used the pause to study what premium events would demand next. We used the time to think harder about quality and presentation, and opened the door to premium and imported furniture.",
  // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set
  "From 2022 onwards, Hamsalekha kept raising the bar across furniture, truss, lighting, gensets and props. In 2026, as we celebrate twenty years, we unveiled The Glass House — South India's first-of-its-kind glass theme set, and a sign of where Hamsalekha is going next.",
];

export const aboutChapters = [
  {
    number: "01",
    tag: "2006",
    title: "It Began at Home",
    body: "Ramesh V started Hamsalekha from his home in 2006 with lighting equipment and a small, loyal team. The name came first — a word that carried weight, a name that felt like a promise. Within the year, we had a proper office and a warehouse in Kothanur.",
  },
  {
    number: "02",
    tag: "2007 — 2009",
    title: "Lighting Became Lighting and Power",
    body: "The early years moved quickly. Gensets came in 2007 so we could offer lighting and power together. By 2008 and 2009 we were in convention centres and at large-scale events across Bengaluru, including the grounds at Eden Gardens, Palace Grounds.",
  },
  {
    number: "03",
    tag: "2010 — 2017",
    title: "Structures, Then Furniture",
    body: "Truss and structures followed in 2010. Furniture launched in 2013 as clients began asking for more. In 2017, the next generation of the family joined — bringing new thinking to a business that had already been built on getting it right.",
  },
  {
    number: "04",
    tag: "2020",
    title: "The Pause That Became a Turning Point",
    body: "In 2020 events stopped. What could have been the most difficult chapter in our history became a turning point. Hamsalekha used the pause to study what premium events would demand next. We used the time to think harder about quality and presentation, and opened the door to premium and imported furniture.",
    highlight: true,
  },
  {
    number: "05",
    tag: "2022 — 2026",
    title: "Raising the Bar",
    // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set
    body: "From 2022 onwards, Hamsalekha kept raising the bar across furniture, truss, lighting, gensets and props. In 2026, as we celebrate twenty years, we unveiled The Glass House — South India's first-of-its-kind glass theme set, and a sign of where Hamsalekha is going next.",
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2006",
    description:
      "Founded by Ramesh V with general lighting; within the year, first office and warehouse in Kothanur",
  },
  { year: "2007", description: "Gensets added — lighting and power together" },
  {
    year: "2008–09",
    description:
      "Convention centres and event productions across Bengaluru; Eden Gardens, Palace Grounds",
  },
  { year: "2010", description: "Truss and structures added" },
  { year: "2013", description: "Hamsalekha Furniture launched" },
  {
    year: "2017",
    description: "The next generation of the family joins the business",
  },
  {
    year: "2020",
    description:
      "A pause becomes a turning point: premium and imported furniture",
  },
  {
    year: "2022",
    // TODO: Needs source verification or named award/evidence for claim: 2022 recognition
    description:
      "Recognised for premium furniture and high-quality truss and structures",
  },
  { year: "2026", description: "Twenty years — The Glass House unveiled" },
];

export const founder: FounderInfo = {
  name: "Ramesh V",
  title: "Founder & Managing Director",
  bio: "Ramesh V started Hamsalekha from his home in 2006 with lighting equipment and a small, loyal team. Over two decades he has grown it into a complete production house — adding power, structures, furniture and premium collections, each time because clients asked for more and he found a way to deliver it.",
  image: asset("/images/about/founder.jpg"),
};

export const values: ValueTile[] = [
  {
    title: "Growth follows trust",
    body: "Every new service began because a client trusted us with more.",
  },
  {
    title: "Own the backstage",
    body: "Light, power, structures and crew stay in-house, so accountability does too.",
  },
  {
    title: "Serve the design",
    body: "The planner's vision leads. Our job is to build it faithfully.",
  },
  {
    title: "Respect the occasion",
    body: "Weddings, pujas and milestones carry meaning. We work with that care.",
  },
];

export const aboutPeople = {
  headline: "Behind every light switched on, every structure raised, every chair placed.",
  body: "Behind every light switched on, every structure raised, every chair placed and every event delivered, there have always been people. People who believed. People who stayed. People who worked when nobody was watching.\n\nMany of our crew have been with Hamsalekha for years, and their contribution is part of every chapter of this story.",
  image: asset("/images/about/our-people-crew.jpg"),
  imageAlt: "Riggers, carpenters, and technicians behind every build — authentic backstage crew photography",
};

export const aboutCTA = {
  // TODO(owner): founder quote on About is written in third person
  quote: "Twenty years of trust. Twenty years of growth. Twenty years of building experiences. Hamsalekha — 2006 to 2026. The journey continues.",
  ctaLabel: "Talk to Our Team",
  ctaHref: "/contact",
};

// ─── Portfolio ────────────────────────────────────────────────

export const portfolioHero = {
  eyebrow: "PORTFOLIO",
  headline: "Stages we've set.",
  subline:
    "Twenty years of weddings, celebrations and corporate events across Bengaluru.",
};

export const featuredStories: FeaturedStory[] = [
  {
    // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set
    tag: "2026 · SIGNATURE SET",
    subtitle: "The Glass House unveiled",
    title: "The Glass House",
    body: "Launched in our twentieth year, The Glass House brought South India's first-of-its-kind glass theme set to Bengaluru's celebrations — a transparent lounge styled with our premium furniture and lit from within.",
    ctaLabel: "Discover The Glass House →",
    ctaHref: "/portfolio/glass-house",
    image: asset("/images/signature-sets/glass-house.jpg"),
    imageAlt:
      "The Glass House signature set by Hamsalekha glowing at night at a Bengaluru reception",
  },
  {
    tag: "TRADE PARTNERSHIP",
    subtitle: "Bengaluru Wedding Fraternity",
    title: "BWF Meet Up 4.0",
    body: "Hamsalekha was Furniture Partner for the Bengaluru Wedding Fraternity Meet Up 4.0, furnishing a gathering of the city's leading wedding planners, decorators and vendors.",
    ctaLabel: "See case study →",
    ctaHref: "/portfolio/bwf-meet-up-4",
    image: asset("/images/portfolio/bwf-furniture-meetup.jpg"),
    imageAlt:
      "Premium lounge furniture by Hamsalekha at the Bengaluru Wedding Fraternity Meet Up 4.0",
  },
  {
    tag: "FROM OUR EARLY CHAPTERS",
    subtitle: "Eden Gardens, Palace Grounds",
    title: "Furniture, lighting and gensets, together",
    body: "Events at Eden Gardens, Palace Grounds were among the first where Hamsalekha delivered furniture, lighting and power as one package — the beginning of the complete production house we are today.",
    ctaLabel: "See case study →",
    ctaHref: "/portfolio/eden-gardens-palace-grounds",
    image: asset("/images/hero.jpg"),
    imageAlt:
      "Early full-production event by Hamsalekha at Palace Grounds, Bengaluru, with lighting and furniture",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: asset("/images/portfolio/grand-wedding-stage.png"),
    alt: "Grand wedding stage production with floral arch and warm illumination",
    caption: "From our archive",
    category: "weddings",
    eventType: "Wedding Reception",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the wedding stage production from your portfolio archive.")}`,
    span: "tall",
  },
  {
    id: "g2",
    src: asset("/images/portfolio/evening-event.jpg"),
    alt: "Evening reception celebration with ambient canopy lighting and banquet dining",
    caption: "From our archive",
    category: "weddings",
    eventType: "Evening Celebration",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the evening reception setup from your portfolio archive.")}`,
    span: "normal",
  },
  {
    id: "g3",
    src: asset("/images/portfolio/glass-house.jpg"),
    alt: "The Glass House signature set daytime architectural structure on outdoor lawn",
    caption: "The Glass House",
    category: "signature-sets",
    eventType: "Signature Set",
    venue: "Bengaluru",
    year: "2026",
    caseStudySlug: "glass-house",
    enquireHref: "/portfolio/glass-house",
    span: "tall",
  },
  {
    id: "g4",
    src: asset("/images/portfolio/moongate.jpg"),
    alt: "MoonGate circular arch signature set for entrance and photo backdrops",
    caption: "MoonGate Circular Arch",
    category: "signature-sets",
    eventType: "Signature Set",
    venue: "Bengaluru",
    year: "2025",
    caseStudySlug: "moongate",
    enquireHref: "/portfolio/moongate",
    span: "normal",
  },
  {
    id: "g5",
    src: asset("/images/portfolio/traditional-wedding.jpg"),
    alt: "Traditional wedding ceremony with mandap and ceremonial decor",
    caption: "From our archive",
    category: "celebrations",
    eventType: "Ceremony & Mandap",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the traditional ceremonial setup from your portfolio archive.")}`,
    span: "tall",
  },
  {
    id: "g6",
    src: asset("/images/services/decor.jpg"),
    alt: "Traditional brass urlis, marigold decor and mandap ceremonial props",
    caption: "From our archive",
    category: "celebrations",
    eventType: "Decor & Props",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the brass props and decor from your portfolio archive.")}`,
    span: "normal",
  },
  {
    id: "g7",
    src: asset("/images/portfolio/corporate-led-staging.jpg"),
    alt: "Corporate conference arena staging with high-resolution LED screens and box truss rigging",
    caption: "From our archive",
    category: "corporate",
    eventType: "Arena LED Staging",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the corporate LED arena staging from your portfolio archive.")}`,
    span: "normal",
  },
  {
    id: "g8",
    src: asset("/images/portfolio/corporate-staging.jpeg"),
    alt: "Technical corporate staging and conference lighting production",
    caption: "From our archive",
    category: "corporate",
    eventType: "Corporate Staging",
    venue: "Bengaluru",
    enquireHref: `https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent("Hi Hamsalekha, I would like to enquire about the corporate staging setup from your portfolio archive.")}`,
    span: "normal",
  },
];

export const portfolioCTA = {
  headline: "Your event could be next.",
  ctaLabel: "Plan Your Event",
  ctaHref: "/contact",
  instagramLabel: "Follow @hamsalekha.event.production",
  instagramHref: microcopy.instagramUrl,
};

// ─── Contact ──────────────────────────────────────────────────

export const contactHero = {
  eyebrow: "CONTACT",
  headline: "Let's create extraordinary.",
  subline:
    "Tell us about your event and our team will get back to you with next steps.",
};

export const contactDetails = {
  phone: microcopy.phone,
  phoneRaw: microcopy.phoneRaw,
  email: microcopy.email,
  location: microcopy.address,
  locationNote: microcopy.addressNote,
  hours: microcopy.hours,
  instagram: microcopy.instagram,
  instagramUrl: microcopy.instagramUrl,
  eventSupport: "Our site team stays with you from setup to strike",
};

export const enquiryFields: EnquiryField[] = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    required: true,
    placeholder: "Full name",
  },
  {
    name: "phone",
    label: "Phone / WhatsApp",
    type: "tel",
    required: true,
    placeholder: "+91",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: false,
    placeholder: "you@example.com",
  },
  {
    name: "clientType",
    label: "I am a…",
    type: "select",
    required: true,
    options: ["Family", "Planner / Decorator", "Corporate / Agency", "Venue"],
  },
  {
    name: "eventType",
    label: "Event type",
    type: "select",
    required: true,
    options: [
      "Wedding",
      "Reception",
      "Sangeet / Mehendi",
      "Puja",
      "Corporate",
      "Launch",
      "Other",
    ],
  },
  {
    name: "eventDate",
    label: "Event date",
    type: "date",
    required: true,
    placeholder: "Select a date",
  },
  {
    name: "venue",
    label: "Venue & city",
    type: "text",
    required: true,
    placeholder: "Venue name, city",
  },
  {
    name: "guestCount",
    label: "Guest count",
    type: "select",
    required: true,
    options: ["Under 200", "200–500", "500–1,000", "1,000+"],
  },
  {
    name: "services",
    label: "Services needed",
    type: "multiselect",
    required: true,
    options: [
      "Lighting",
      "Gensets",
      "Truss & Structures",
      "Furniture",
      "Decor & Props",
      "Signature Set",
      "Full Production",
    ],
  },
  {
    name: "message",
    label: "Tell us more",
    type: "textarea",
    required: false,
    placeholder: "Theme, references, anything we should know",
  },
];

export const formMessages = {
  success:
    "Thank you — your enquiry is with our team. We'll call or WhatsApp you soon. For anything urgent, call +91 99725 44316.",
  error:
    "Something didn't go through. Please try again, or WhatsApp us on +91 99725 44316.",
  submitLabel: "Send Enquiry",
};

export const faqs: FAQItem[] = [
  {
    question: "Do you only supply furniture, or do you produce full events?",
    answer:
      "Both. Book a single service — lighting, a genset, truss or furniture — or hand us the full production.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "For peak wedding season and muhurta dates, the earlier the better. For smaller events, call us — if the stock is in the warehouse, we'll find a way.",
  },
  {
    question: "Can we see the furniture before booking?",
    answer:
      "Yes. Browse the full catalogue online, or book a warehouse visit to see pieces in person.",
  },
  {
    question: "Do you work with our planner or decorator?",
    answer:
      "Always. Much of our work is alongside planners and decorators; we build to their design and coordinate directly with their team.",
  },
  {
    question: "How is pricing worked out?",
    answer:
      "Every event is quoted to its brief — items, quantities, venue, duration and logistics. Share your details and we'll send an itemised proposal.",
  },
  {
    question: "Do you provide power backup?",
    answer:
      "Yes. Our gensets run from 40 to 125 KVA and come with our own operators for the whole event.",
  },
  {
    question: "How large an event can you handle?",
    // TODO(owner): resolve mixed number format (1,00,000 vs 100,000+) and claim (100,000+ sq ft inventory vs trussing up to 1,00,000 sq ft)
    answer:
      "With over 10,000 chairs and trussing up to 1,00,000 sq ft, large weddings, conferences and festivals are well within reach.",
  },
  {
    question: "Can you create a custom set for our event?",
    answer:
      "Yes. We design and build custom structures — it's how The Glass House and MoonGate began.",
  },
];

export const careersSection = {
  eyebrow: "CAREERS",
  headline: "Build the stage with us.",
  body: "We're always looking for people who take pride in getting it right on the day: riggers, electricians, genset operators, carpenters, drivers, stylists, site supervisors and client coordinators.",
  bullets: [
    "Steady work across wedding and corporate seasons",
    "Hands-on learning in lighting, power and structures",
    "A team where people grow with the company",
  ],
  cta: `WhatsApp ${microcopy.phone} with your name and the role you're interested in.`,
  ctaHref: `https://wa.me/${microcopy.whatsappNumber}?text=Hi+Hamsalekha%2C+I'm+interested+in+joining+your+team.+My+name+is+...+and+I'm+interested+in+the+role+of+...`,
};

// ─── SEO Map ──────────────────────────────────────────────────

export const seoMap: Record<string, PageMeta> = {
  home: {
    title: "Hamsalekha Event Production | Event Production in Bengaluru",
    description:
      "Lighting, power, structures, premium furniture and props for weddings, celebrations and corporate events across Bengaluru. Built and struck by one accountable team since 2006.",
    ogImage: "/images/og/home.jpg",
  },
  about: {
    title: "About Hamsalekha | Hamsalekha Event Production",
    description:
      "Twenty years of backstage craftsmanship in Bengaluru. How Ramesh V built Hamsalekha from lighting prepared at home in 2006 into a complete event production house.",
    ogImage: "/images/og/home.jpg",
  },
  services: {
    title: "Event Production Services | Hamsalekha Event Production",
    description:
      "Architectural lighting, silent 40–125 KVA gensets, Bombay trussing up to 1,00,000 sq ft, and imported furniture rentals for weddings and corporate galas in Bengaluru.",
    ogImage: "/images/og/home.jpg",
  },
  signatureSets: {
    title: "Signature Sets | Hamsalekha Event Production",
    // TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind Glass House
    description:
      "Architectural set pieces designed and fabricated by Hamsalekha, featuring South India's first-of-its-kind Glass House and the circular MoonGate arch.",
    ogImage: "/images/og/home.jpg",
  },
  vault: {
    title: "The Vault | Hamsalekha Event Production",
    description:
      "Behind the build: our Kothanur warehouse, 10,000+ chairs, 1,100+ sofa units, in-house technical crew, and fleet logistics supporting events across Bengaluru.",
    ogImage: "/images/og/home.jpg",
  },
  howWeWork: {
    title: "Our Process | Hamsalekha Event Production",
    description:
      "Our five-step event production workflow: brief, site recce, itemised proposal, precision setup, and overnight strike with zero venue damage.",
    ogImage: "/images/og/home.jpg",
  },
  portfolio: {
    title: "Portfolio | Hamsalekha Event Production",
    description:
      "A curation of grand weddings, sangeet receptions, and corporate galas staged by Hamsalekha Event Production at premier Bengaluru venues.",
    ogImage: "/images/og/home.jpg",
  },
  contact: {
    title: "Contact Hamsalekha | Hamsalekha Event Production",
    description:
      "Plan your wedding or corporate event in Bengaluru. Contact Ramesh V and the Hamsalekha team for site recces, inventory checks, and itemised proposals.",
    ogImage: "/images/og/home.jpg",
  },
  privacy: {
    title: "Privacy Policy | Hamsalekha Event Production",
    description:
      "Privacy policy and data handling guidelines for event enquiries and quotation requests submitted to Hamsalekha Event Production Pvt. Ltd., Bengaluru.",
    ogImage: "/images/og/home.jpg",
  },
  terms: {
    title: "Terms of Use | Hamsalekha Event Production",
    description:
      "Terms of use, quotation expectations, and booking guidelines for technical event production and rental services by Hamsalekha Event Production.",
    ogImage: "/images/og/home.jpg",
  },
};

