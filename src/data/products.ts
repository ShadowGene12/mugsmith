export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: string;
  price: number;
  comparePrice?: number;
  description: string;
  story: string;
  features: string[];
  careInstructions: string[];
  images: string[];
  variants: {
    id: string;
    name: string;
    price: number;
  }[];
  inStock: boolean;
  badge?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  identity: string;
  story: string;
  heroImage: string;
  description: string;
  traits: string[];
  products: string[];
}

export interface OrderBump {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number;
  image: string;
}

export interface OTOOffer {
  id: string;
  slug: string;
  headline: string;
  subheadline: string;
  description: string;
  price: number;
  comparePrice: number;
  image: string;
  features: string[];
  buttonText: string;
  declineText: string;
  nextOTO?: string;
}

export const collections: Collection[] = [
  {
    id: "the-builder",
    slug: "the-builder",
    name: "The Builder",
    tagline: "The craft is the reward.",
    identity: "The Builder",
    story: "The best shortcut is the long road done carefully. Substance matters more than surface, but surface is the signal that substance exists.",
    heroImage: "/images/builder-hero.jpg",
    description: "Substantial, considered, and earned objects for the ones who build.",
    traits: ["Substantial", "Grounded", "Quietly Proud", "Material"],
    products: ["bld-sediment", "bld-cubist"],
  },
  {
    id: "the-minimalist",
    slug: "the-minimalist",
    name: "The Minimalist",
    tagline: "Clarity is a form of power.",
    identity: "The Minimalist",
    story: "Clarity is power. Less on the desk, more in the mind. Taste is revealed by what you refuse, not by what you accept.",
    heroImage: "/images/minimalist-hero.jpg",
    description: "Smooth surfaces and refined contrast for the intentional.",
    traits: ["Considered", "Cool", "Contained", "Resolved"],
    products: ["min-onyx-current", "min-strata"],
  },
  {
    id: "the-nightshift",
    slug: "the-nightshift",
    name: "The Nightshift",
    tagline: "I think clearest in the dark.",
    identity: "The Nightshift",
    story: "The best ideas arrive when the noise stops. Being slightly outside the mainstream is a feature, not a bug.",
    heroImage: "/images/nightshift-hero.jpg",
    description: "Moody, high-contrast pieces that glow against the shadow.",
    traits: ["Shadowed", "Focused", "Intense", "Cinematic"],
    products: ["ngt-shadow-prowl", "ngt-midnight-abyss"],
  },
  {
    id: "the-stoic",
    slug: "the-stoic",
    name: "The Stoic",
    tagline: "Discipline over mood.",
    identity: "The Stoic",
    story: "Mastery is the only worthy pursuit. Reacting is weakness; responding is strength. A chosen code held in private.",
    heroImage: "/images/stoic-hero.jpg",
    description: "Ink-wash aesthetics and restrained composition for a life of discipline.",
    traits: ["Still", "Disciplined", "Principled", "Composed"],
    products: ["sto-echo-of-honor", "sto-blade-serenity"],
  },
  {
    id: "the-ritualist",
    slug: "the-ritualist",
    name: "The Ritualist",
    tagline: "Small acts, done with care.",
    identity: "The Ritualist",
    story: "Gentle consistency beats aggressive inconsistency. Rhythm is a form of love for yourself and your days.",
    heroImage: "/images/ritualist-hero.jpg",
    description: "Soft textures and considered morning scenes.",
    traits: ["Tender", "Warm", "Careful", "Deliberate"],
    products: ["rit-porcelain-indigo", "rit-ivory-fleur"],
  },
  {
    id: "the-romantic",
    slug: "the-romantic",
    name: "The Romantic",
    tagline: "A small life, well-lived.",
    identity: "The Romantic",
    story: "A slow afternoon is not wasted. Texture, warmth, and sensory details are not luxuries—they are the point.",
    heroImage: "/images/romantic-hero.jpg",
    description: "Layered visual density and heritage warmth.",
    traits: ["Sensory", "Unhurried", "Old-Soul", "Layered"],
    products: ["rom-canal-ride", "rom-gilded-garden"],
  },
  {
    id: "the-maverick",
    slug: "the-maverick",
    name: "The Maverick",
    tagline: "I think in color.",
    identity: "The Maverick",
    story: "More is often more, when it's the right more. Safe is the enemy of interesting. The mind is an instrument to be played.",
    heroImage: "/images/maverick-hero.jpg",
    description: "Bold color and expressive gestures for the creative maximalist.",
    traits: ["Expressive", "Alive", "Energetic", "Unapologetic"],
    products: ["mav-typenoise", "mav-tropical-reverie"],
  }
];

export const products: Product[] = [
  // THE BUILDER
  {
    id: "bld-sediment",
    name: "Sediment",
    slug: "sediment",
    collection: "the-builder",
    price: 65,
    description: "Layered, geological, monochrome. Earth's memory.",
    story: "It reads as earth's memory — contours carved by time and thought. This is the mug that says 'I respect process.'",
    features: ["Matte Texture", "Weighted Base", "Charcoal/Bone Palette"],
    careInstructions: ["Hand wash recommended"],
    images: ["/images/products/bld-sediment.jpg", "/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 65 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "bld-cubist",
    name: "Cubist Harmony",
    slug: "cubist-harmony",
    collection: "the-builder",
    price: 65,
    description: "Geometric, deconstructed, emotionally grounded.",
    story: "The cerebral edge of The Builder — the engineer who understands that beauty emerges from structure.",
    features: ["Architectural pattern", "Earthy palette", "Tactile finish"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 65 }],
    inStock: true,
  },
  
  // THE MINIMALIST
  {
    id: "min-onyx-current",
    name: "Onyx Current",
    slug: "onyx-current",
    collection: "the-minimalist",
    price: 55,
    description: "Strength in simplicity, bold contrast.",
    story: "A mug that says 'I have made my choices and they are clean.'",
    features: ["Smooth surface", "Monochrome palette", "Invisible construction"],
    careInstructions: ["Dishwasher safe"],
    images: ["/images/products/min-onyx.jpg", "/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 55 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "min-strata",
    name: "Strata",
    slug: "strata",
    collection: "the-minimalist",
    price: 55,
    description: "Sculpted monochrome, perfect balance.",
    story: "A meditation on geological layering reduced to its essentials.",
    features: ["Pale grey/bone", "Generous negative space"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 55 }],
    inStock: true,
  },

  // THE NIGHTSHIFT
  {
    id: "ngt-shadow-prowl",
    name: "Shadow Prowl",
    slug: "shadow-prowl",
    collection: "the-nightshift",
    price: 70,
    description: "Creatures veiled by darkness, shadows whispering.",
    story: "Pure Nightshift mood captured on ceramic. An object seen by lamplight.",
    features: ["Midnight blue", "High contrast details", "Subtle glow effect"],
    careInstructions: ["Hand wash recommended"],
    images: ["/images/products/ngt-shadow.jpg", "/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 70 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "ngt-midnight-abyss",
    name: "Midnight Abyss",
    slug: "midnight-abyss",
    collection: "the-nightshift",
    price: 70,
    description: "Deep navy moonlit waters.",
    story: "Mysterious, grounded, endless. The hour after the inbox stops.",
    features: ["Dark dominant", "Cinematic framing"],
    careInstructions: ["Hand wash recommended"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 70 }],
    inStock: true,
  },

  // THE STOIC
  {
    id: "sto-echo-of-honor",
    name: "Echo of Honor",
    slug: "echo-of-honor",
    collection: "the-stoic",
    price: 60,
    description: "Integrity, strength guided by virtue.",
    story: "The mug that states the code. The morning cup for the person whose day is already decided before it begins.",
    features: ["Ink-wash aesthetic", "Restrained composition"],
    careInstructions: ["Hand wash recommended"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 60 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "sto-blade-serenity",
    name: "Blade and Serenity",
    slug: "blade-and-serenity",
    collection: "the-stoic",
    price: 60,
    description: "The duality of chaos and calm.",
    story: "The balance at the center of the Stoic path.",
    features: ["Natural materials", "Dignified imagery"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 60 }],
    inStock: true,
  },

  // THE RITUALIST
  {
    id: "rit-porcelain-indigo",
    name: "Porcelain Indigo",
    slug: "porcelain-indigo",
    collection: "the-ritualist",
    price: 50,
    description: "Classic blue and white florals on ivory ceramic.",
    story: "Timeless, calm, true. The first mug of the morning, before the phone.",
    features: ["Hand-drawn florals", "Ivory tone", "Soft hold"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 50 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "rit-ivory-fleur",
    name: "Ivory Fleur",
    slug: "ivory-fleur",
    collection: "the-ritualist",
    price: 50,
    description: "A symphony of elegance and restraint.",
    story: "The Ritualist's permission to have quiet ornament.",
    features: ["Watercolor wash", "Matte feel"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 50 }],
    inStock: true,
  },

  // THE ROMANTIC
  {
    id: "rom-canal-ride",
    name: "Canal Ride – Amsterdam",
    slug: "canal-ride-amsterdam",
    collection: "the-romantic",
    price: 55,
    description: "Autumn reflections, bicycles by water.",
    story: "Romantic travel, romanticized. The four o'clock cup for the hour when the light turns honey.",
    features: ["Painterly surfaces", "Warm ambers and rust", "Heritage look"],
    careInstructions: ["Hand wash recommended"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 55 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "rom-gilded-garden",
    name: "Gilded Garden",
    slug: "gilded-garden",
    collection: "the-romantic",
    price: 55,
    description: "Stories of bloom framed in gold.",
    story: "Old-world warmth and abundance.",
    features: ["Warm metals", "Lived-in interiors look", "Rich terracotta"],
    careInstructions: ["Hand wash recommended"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 55 }],
    inStock: true,
  },

  // THE MAVERICK
  {
    id: "mav-typenoise",
    name: "TypeNoise",
    slug: "typenoise",
    collection: "the-maverick",
    price: 65,
    description: "Words becoming movement, urban rebellion.",
    story: "Because the desk should look like the inside of the head. Loud, loaded, lived in.",
    features: ["Type play", "Bold electric blue", "High energy pattern"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 65 }],
    inStock: true,
    badge: "Hero"
  },
  {
    id: "mav-tropical-reverie",
    name: "Tropical Reverie",
    slug: "tropical-reverie",
    collection: "the-maverick",
    price: 65,
    description: "Bold watercolor, movement through color.",
    story: "Floral in a Maverick register.",
    features: ["Expressive gestures", "Hot pink and ochre"],
    careInstructions: ["Dishwasher safe"],
    images: ["/placeholder.svg"],
    variants: [{ id: "v1", name: "Standard", price: 65 }],
    inStock: true,
  }
];

export const orderBump: OrderBump = {
  id: "coffee-care-kit",
  name: "Coffee Care Kit",
  description: "Gold-plated spoon + premium cork coaster. The finishing touch.",
  price: 249,
  comparePrice: 399,
  image: "/images/coffee-care-kit.jpg",
};

export const otoOffers: OTOOffer[] = [
  {
    id: "desk-pad",
    slug: "complete-workspace",
    headline: "Wait — your mug needs company.",
    subheadline: "One-time offer for new customers only",
    description: "Complete your workspace with the matching Desk Pad. Same design. Same intention. This price won't return.",
    price: 899,
    comparePrice: 1299,
    image: "/images/desk-pad.jpg",
    features: [
      "Full-size premium desk pad (800×400mm)",
      "Water-resistant surface",
      "Non-slip backing",
      "Same collection design as your mug",
      "Protects your desk from wear"
    ],
    buttonText: "Yes — Add the Desk Pad",
    declineText: "No thanks, I'll pass",
    nextOTO: "mousepad",
  },
  {
    id: "mouse-pad",
    slug: "mousepad",
    headline: "One more thing.",
    subheadline: "Final offer before checkout",
    description: "The matching mouse pad. Same design, same quality. Completes the set.",
    price: 299,
    comparePrice: 449,
    image: "/images/mousepad-only.jpg",
    features: [
      "Premium mouse pad (250×210mm)",
      "Smooth tracking surface",
      "Non-slip rubber base",
      "Same collection design as your mug"
    ],
    buttonText: "Yes — Add Mouse Pad",
    declineText: "No thanks, finish my order",
  },
];

export const trustBadges = [
  { icon: "microwave", label: "Microwave Safe" },
  { icon: "dishwasher", label: "Dishwasher Safe" },
  { icon: "package", label: "Secure Packaging" },
  { icon: "shield", label: "Broken Mug Guarantee" },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter(p => p.collection === collectionId);
}

export function getOTOBySlug(slug: string): OTOOffer | undefined {
  return otoOffers.find(o => o.slug === slug);
}
