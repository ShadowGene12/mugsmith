export type JournalCategory = 
  | "workspace-identity"
  | "rituals-atmosphere"
  | "gift-guides"
  | "desk-aesthetic"
  | "study-work-mood";

export interface JournalArticle {
  slug: string;
  title: string;
  description: string;
  category: JournalCategory;
  categoryLabel: string;
  readTime: string;
  datePublished: string;
  heroImage?: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  productSlugs: string[];
  relatedIdentities: string[];
  relatedCollections: string[];
  faq?: { question: string; answer: string }[];
}

export const journalCategories: { id: JournalCategory; label: string; description: string }[] = [
  { id: "workspace-identity", label: "Workspace Identity", description: "Understand how your workspace personality shapes everything — from your desk setup to your morning mug." },
  { id: "rituals-atmosphere", label: "Rituals & Atmosphere", description: "The art of slowing down. Stories about morning routines, intentional living, and the quiet moments that define your day." },
  { id: "gift-guides", label: "Gift Guides", description: "Thoughtful gift ideas matched to personality — because the right gift says 'I see you.'" },
  { id: "desk-aesthetic", label: "Desk Aesthetic", description: "Curated inspiration for desks that feel as good as they look. Minimal, maximal, and everything between." },
  { id: "study-work-mood", label: "Study & Work Mood", description: "Focus tools, study setups, and work-from-home rituals for students and remote professionals." },
];

export const journalArticles: JournalArticle[] = [
  // Workspace Identity
  {
    slug: "what-your-desk-says-about-you",
    title: "What Your Desk Says About You",
    description: "Your workspace isn't just functional — it's autobiographical. Here's how to read yours.",
    category: "workspace-identity",
    categoryLabel: "Workspace Identity",
    readTime: "5 min",
    datePublished: "2025-03-01",
    intro: "Every desk tells a story. The stack of notebooks, the single pen, the mug that's been there so long it feels structural. Whether you know it or not, your workspace is a portrait of how you think, work, and create. Here's what the seven workspace archetypes reveal about yours.",
    sections: [
      { heading: "The Builder's Desk", content: "Systems, stacked notebooks, colour-coded folders. The Builder's desk looks like a command centre because it is one. Every tool has coordinates. Every object is placed where productivity demands it." },
      { heading: "The Minimalist's Desk", content: "One notebook. One pen. One mug. The Minimalist's desk is a gallery of restraint. They believe that fewer objects means fewer distractions — and they're usually right." },
      { heading: "The Nightshift's Desk", content: "Dark mode everything, soft amber lighting, zero morning glare. The Nightshift's desk comes alive when the rest of the world goes to sleep." },
      { heading: "The Maverick's Desk", content: "Chaotic. Brilliant. Fast. The Maverick doesn't decorate, they disrupt. Unconventional elements mixed with highly specific tools of the trade." },
      { heading: "The Ritualist's Desk", content: "A candle, a journal, a warm mug. The Ritualist's desk isn't just where they work — it's where they breathe. Setting up the desk each morning is part of the ritual." },
    ],
    productSlugs: ["the-builder-mug", "the-minimalist-mug", "the-nightshift-mug", "the-maverick-mug", "the-ritualist-mug"],
    relatedIdentities: ["builder", "minimalist", "nightshift", "maverick", "ritualist"],
    relatedCollections: ["the-builder", "the-minimalist", "the-ritualist"],
  },
  {
    slug: "the-seven-archetypes-explained",
    title: "The 7 Workspace Archetypes, Explained",
    description: "Builder, Minimalist, Nightshift, Stoic, Ritualist, Romantic, Maverick — which one shapes how you work?",
    category: "workspace-identity",
    categoryLabel: "Workspace Identity",
    readTime: "7 min",
    datePublished: "2025-02-15",
    intro: "At Mugsmith, we established seven distinct archetypes that capture the way people relate to their work and workspace. They're not just personality types — they are fundamental work styles. Understanding yours can change how you engineer your morning, organize your desk, and approach your day.",
    sections: [
      { heading: "Why Identity Matters at Your Desk", content: "Most workspace advice is generic: get a standing desk, buy a plant, keep it tidy. But the best workspace isn't the tidiest — it's the one that matches how you think. A Builder needs structure. A Maverick needs speed. Knowing which you are unlocks a workspace that actually works for you." },
      { heading: "How We Coded the Codex", content: "We studied how 5,000+ top-tier professionals described their workspaces, their morning rituals, and their relationship with objects. Seven concrete patterns emerged — not as boxes, but as lenses." },
      { heading: "Unlocking Your Identity", content: "Our profiling quiz takes under two minutes. It doesn't ask about your job — it asks how you work. The result isn't just a label. It's a map to the mug, the aesthetic, and the desk that fits." },
    ],
    productSlugs: ["the-builder-mug", "the-minimalist-mug"],
    relatedIdentities: ["builder", "minimalist", "nightshift", "stoic", "ritualist", "romantic", "maverick"],
    relatedCollections: ["the-builder", "the-minimalist"],
    faq: [
      { question: "Can I be more than one archetype?", answer: "Absolutely. Most people have a primary (dominant) and a secondary (latent) archetype. The quiz identifies your dominant one." },
      { question: "Does my identity change over time?", answer: "Yes. Your workspace identity can shift with massive life changes — a new career trajectory, a remote pivot, or a complete lifestyle overhaul." },
    ],
  },

  // Rituals & Atmosphere
  {
    slug: "morning-ritual-guide",
    title: "How to Build a Morning Ritual That Sticks",
    description: "A practical guide to building a meaningful morning routine — no 4am alarm required.",
    category: "rituals-atmosphere",
    categoryLabel: "Rituals & Atmosphere",
    readTime: "6 min",
    datePublished: "2025-03-05",
    intro: "A morning ritual isn't about waking up at 4am or drinking celery juice. It's about starting your day with one intentional act — something that signals to your brain: this is my time. Here's how to build one that actually sticks.",
    sections: [
      { heading: "Start With One Anchor", content: "Don't overhaul your morning. Pick one thing — making coffee, journaling, sitting in silence — and protect it. That single act becomes the anchor that holds the rest of your day together." },
      { heading: "Objects Shape Rituals", content: "The mug you reach for matters. Not because of the brand, but because of the feeling. A heavy ceramic mug slows you down. A beautiful one makes the pause feel earned. Ritual objects aren't luxury — they're architecture for attention." },
      { heading: "The 10-Minute Rule", content: "If you can protect 10 minutes before email, before notifications, before the world — you've won. The goal isn't a two-hour morning routine. It's 10 minutes of being human before you start performing." },
      { heading: "Make It Visible", content: "Leave your mug out. Set up your journal the night before. The fewer decisions between waking up and starting your ritual, the more likely it sticks. Make the path frictionless." },
    ],
    productSlugs: ["ritualist-clay", "ritualist-grain", "minimalist-ivory"],
    relatedIdentities: ["ritualist", "minimalist"],
    relatedCollections: ["the-ritualist", "the-minimalist"],
  },

  // Gift Guides
  {
    slug: "gifts-for-students",
    title: "Thoughtful Gifts for Students Who Care About Their Space",
    description: "Useful, beautiful gifts for students who take their study setup seriously. Not another generic mug.",
    category: "gift-guides",
    categoryLabel: "Gift Guides",
    readTime: "5 min",
    datePublished: "2025-02-28",
    intro: "Students spend more time at their desk than almost anyone. The right gift doesn't just look good on a shelf — it becomes part of their daily routine. Here are our picks for students who care about how they work.",
    sections: [
      { heading: "For the Organised Student", content: "They colour-code their notes and have a study schedule on the wall. The Architect collection — with its structured geometry and bold lines — matches how they think. Pair with a quality notebook." },
      { heading: "For the Focused Student", content: "No distractions. No clutter. Just work. The Operator collection is built for students who value function over flair. Clean designs that don't compete for attention." },
      { heading: "For the Creative Student", content: "Art history, design, writing, film — their desk is covered in inspiration. The Creative collection has layered details they'll appreciate more each day." },
      { heading: "For the Mindful Student", content: "They study with lo-fi music and a warm drink. The Ritualist collection brings warmth and grounding to late-night study sessions." },
    ],
    productSlugs: ["architect-blueprint", "operator-matte", "creative-layers", "ritualist-clay"],
    relatedIdentities: ["architect", "operator", "creative", "ritualist"],
    relatedCollections: ["the-architect", "the-operator", "the-creative", "the-ritualist"],
    faq: [
      { question: "What's the best gift for a college student?", answer: "Something they'll use every day. A mug matched to their workspace identity becomes part of their routine — not just another object on the shelf." },
      { question: "Do you offer student discounts?", answer: "Take our quiz and unlock 20% off your first order — works for students and anyone finding their workspace identity." },
    ],
  },
  {
    slug: "gifts-for-remote-workers",
    title: "Desk Gifts for Remote Workers Who Deserve Better",
    description: "Home office gifts that say 'your workspace matters' — for remote workers who've earned a proper desk.",
    category: "gift-guides",
    categoryLabel: "Gift Guides",
    readTime: "5 min",
    datePublished: "2025-02-20",
    intro: "Remote workers spend 8+ hours a day at their home desk. Most of them are still using the mug they grabbed from the kitchen cabinet three years ago. These gifts change that.",
    sections: [
      { heading: "For the Builder", content: "They've built their entire home office from scratch — monitor arm, cable management, ergonomic chair. The Architect collection completes the system with a mug that matches the precision of everything else on their desk." },
      { heading: "For the Pragmatist", content: "They don't want pretty — they want functional. The Operator collection's clean, no-fuss designs fit right into a workspace optimised for output. Pair it with good coffee beans." },
      { heading: "For the Minimalist", content: "Their desk has three things on it. Make sure the mug is one of them. The Minimalist collection is designed for the kind of person who says 'I don't need anything' — and means it." },
      { heading: "For the Ritualist", content: "Working from home means every ritual matters more. The Ritualist collection turns the morning coffee break from 'fuel' to 'moment.' Gift it with a handwritten note." },
    ],
    productSlugs: ["architect-grid", "operator-steel", "minimalist-stone", "ritualist-grain"],
    relatedIdentities: ["architect", "operator", "minimalist", "ritualist"],
    relatedCollections: ["the-architect", "the-operator", "the-minimalist", "the-ritualist"],
  },
  {
    slug: "gifts-for-creators",
    title: "Gifts for Creators Who Notice Everything",
    description: "For the designer, writer, or artist who finds beauty in the details — gifts that match their eye.",
    category: "gift-guides",
    categoryLabel: "Gift Guides",
    readTime: "4 min",
    datePublished: "2025-02-10",
    intro: "Creators have a different relationship with objects. They notice the texture of the glaze, the weight of the handle, the way light catches the surface. These gifts are chosen for people who see what others miss.",
    sections: [
      { heading: "The Detail Lover", content: "The Creative collection rewards close looking. Layered glazes, hidden patterns, textures that reveal themselves over time. It's a mug that gets better the longer you know it." },
      { heading: "The Quiet Creative", content: "Not every creator is loud. Some do their best work in silence and simplicity. The Minimalist collection speaks to the creative who finds inspiration in restraint." },
      { heading: "The Process-Driven Creator", content: "They care as much about how they make something as what they make. The Ritualist collection honours the process — the slow pour, the quiet pause, the attention." },
    ],
    productSlugs: ["creative-layers", "creative-abstract", "minimalist-ivory", "ritualist-clay"],
    relatedIdentities: ["creative", "minimalist", "ritualist"],
    relatedCollections: ["the-creative", "the-minimalist", "the-ritualist"],
  },

  // Desk Aesthetic
  {
    slug: "minimalist-desk-setup-guide",
    title: "The Minimalist Desk: A Guide to Less, But Better",
    description: "How to build a minimalist desk setup that's functional, beautiful, and intentional.",
    category: "desk-aesthetic",
    categoryLabel: "Desk Aesthetic",
    readTime: "6 min",
    datePublished: "2025-03-08",
    intro: "A minimalist desk isn't about having nothing — it's about having exactly enough. Every object earns its place through function, beauty, or meaning. Here's how to curate a workspace that lets you think clearly.",
    sections: [
      { heading: "The Three-Object Rule", content: "Start with three objects on your desk. Your laptop, a notebook, and a mug. Everything else gets stored, donated, or moved out of sight. If something doesn't support your work or your wellbeing, it doesn't belong." },
      { heading: "Choose Materials That Feel Right", content: "Minimalism isn't about cheap and bare — it's about considered. A heavy ceramic mug, a linen notebook cover, a wooden tray. Natural materials age well and feel intentional." },
      { heading: "Colour Coherence", content: "Pick a palette and commit. Muted tones — ivory, stone, warm grey — create calm. Avoid visual noise from clashing objects. Your desk should feel like one thought, not twelve." },
      { heading: "The Mug as Centrepiece", content: "On a minimal desk, your mug isn't just a container — it's the focal point. Choose one that rewards attention. Something with a glaze you want to touch, a shape that feels right in your hand." },
    ],
    productSlugs: ["minimalist-ivory", "minimalist-stone"],
    relatedIdentities: ["minimalist", "ritualist"],
    relatedCollections: ["the-minimalist", "the-ritualist"],
    faq: [
      { question: "What's the best mug for a minimalist desk?", answer: "Something simple in form but rich in material. Our Minimalist collection features clean silhouettes in ivory and stone finishes — designed to be the only mug you need." },
    ],
  },
  {
    slug: "cozy-desk-setup-for-winter",
    title: "Cozy Desk Setup Ideas for Cold Mornings",
    description: "Warm textures, soft light, and the right mug — how to make your desk feel like a hug.",
    category: "desk-aesthetic",
    categoryLabel: "Desk Aesthetic",
    readTime: "4 min",
    datePublished: "2025-01-15",
    intro: "When the mornings get cold, your desk should get warmer. Not with a heater — with texture, light, and objects that make you want to sit down and stay. Here's how to build a cozy desk setup that still lets you get things done.",
    sections: [
      { heading: "Warm Materials", content: "Trade the cold steel for wood, ceramic, and fabric. A knitted coaster, a wooden pen tray, a ceramic mug with a textured glaze. Your hands should enjoy touching everything on your desk." },
      { heading: "Soft Light", content: "Replace overhead lights with a warm desk lamp. Light temperature changes how a space feels more than almost anything else. Aim for 2700K — warm, golden, present." },
      { heading: "The Warm Mug", content: "A heavy ceramic mug holds heat longer and feels better in cold hands. The Ritualist collection's earth-toned glazes were designed for exactly this — mornings that need warmth." },
    ],
    productSlugs: ["ritualist-clay", "ritualist-grain", "creative-layers"],
    relatedIdentities: ["ritualist", "creative"],
    relatedCollections: ["the-ritualist", "the-creative"],
  },

  // Study & Work Mood
  {
    slug: "study-desk-essentials",
    title: "Study Desk Essentials: What Actually Helps You Focus",
    description: "Skip the viral desk tours. Here's what really improves focus — backed by how your brain works.",
    category: "study-work-mood",
    categoryLabel: "Study & Work Mood",
    readTime: "5 min",
    datePublished: "2025-02-25",
    intro: "Your desk setup affects how you think. Not in a vague wellness way — in a real, cognitive way. Clutter increases cortisol. Warm drinks improve mood. The right environment can add hours of productive focus. Here's what actually works.",
    sections: [
      { heading: "Declutter to Think Clearly", content: "Visual clutter competes for your attention. Even if you've trained yourself to ignore it, your brain hasn't. Start each study session by clearing your desk to essentials: laptop, notebook, mug, one pen." },
      { heading: "The Warm Drink Effect", content: "Holding a warm drink creates a psychological effect called 'haptic warmth.' It reduces stress and increases feelings of connection and comfort. A good mug isn't a luxury — it's a focus tool." },
      { heading: "Create a Start Signal", content: "Your brain responds to cues. Making your coffee, placing your mug on the desk, opening your notebook — these can become the signal that says 'it's time to work.' Consistency turns actions into triggers." },
      { heading: "Choose Objects That Don't Distract", content: "Your phone is the obvious culprit, but anything visually complex can pull focus. Choose desk objects that are interesting up close but calm from a distance — that's the design principle behind every Mugsmith piece." },
    ],
    productSlugs: ["operator-matte", "minimalist-ivory", "architect-blueprint"],
    relatedIdentities: ["operator", "minimalist", "architect"],
    relatedCollections: ["the-operator", "the-minimalist", "the-architect"],
    faq: [
      { question: "What's the best mug for studying?", answer: "One that holds heat well, feels comfortable in your hands, and doesn't distract visually. Our Operator and Minimalist collections are designed for exactly this kind of focused work." },
      { question: "Does your desk setup really affect focus?", answer: "Yes. Research shows that visual clutter increases cognitive load and reduces working memory. A clean, intentional desk setup genuinely helps you think better." },
    ],
  },
  {
    slug: "coffee-mugs-for-work-from-home",
    title: "The Best Coffee Mugs for Working from Home",
    description: "Your home office mug shouldn't be a random kitchen castoff. Here's how to choose one that fits your work style.",
    category: "study-work-mood",
    categoryLabel: "Study & Work Mood",
    readTime: "4 min",
    datePublished: "2025-01-20",
    intro: "You've invested in the chair, the monitor, maybe even the desk plant. But the mug? It's probably whatever was closest when you moved your office home. Here's why your mug choice matters more than you think — and how to pick the right one.",
    sections: [
      { heading: "Why Your WFH Mug Matters", content: "At the office, your mug is communal, disposable, forgettable. At home, it's yours — permanently. It sits on your desk 8 hours a day. It should be something you chose deliberately, not something you settled for." },
      { heading: "Match Your Mug to Your Style", content: "If you're a systems builder, the Architect collection's structured designs fit. If you value speed and simplicity, the Operator line works. If your desk is a sanctuary, the Ritualist collection feels right. Your mug should match your work style, not just your kitchen." },
      { heading: "Invest in One Good Mug", content: "You don't need five. You need one — the one that feels right in your hand, holds heat well, and looks good on your desk at 3pm when the afternoon slump hits. Fewer, better." },
    ],
    productSlugs: ["architect-grid", "operator-steel", "ritualist-grain"],
    relatedIdentities: ["architect", "operator", "ritualist"],
    relatedCollections: ["the-architect", "the-operator", "the-ritualist"],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: JournalCategory): JournalArticle[] {
  return journalArticles.filter(a => a.category === category);
}
