export interface GiftGuide {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
    productSlug: string;
    identitySlug: string;
  }[];
  faq: { question: string; answer: string }[];
}

export const giftGuides: GiftGuide[] = [
  {
    slug: "gifts-for-students",
    title: "Gifts for Students",
    metaTitle: "Best Gifts for Students Who Love Their Desk",
    description: "Meaningful, useful gifts for students who take their study space seriously. Matched to how they work.",
    intro: "Students spend thousands of hours at their desks. The right gift becomes part of their daily routine — a companion for late-night study sessions, early-morning exam prep, and everything in between. These picks are chosen by workspace identity, so every gift feels personal.",
    sections: [
      { heading: "For the Organised Student", content: "They have a study timetable on the wall and notes colour-coded by subject. The Architect collection matches their structured mind — bold geometry, clean lines, and a sense of purpose in every detail. Pair it with a quality notebook and they'll use it every single day.", productSlug: "architect-blueprint", identitySlug: "architect" },
      { heading: "For the Efficiency-First Student", content: "No decorations, no distractions — just work. The Operator collection is built for students who care about output. Clean, functional design that earns its desk space through sheer usefulness.", productSlug: "operator-matte", identitySlug: "operator" },
      { heading: "For the Art & Design Student", content: "Their desk is covered in inspiration — magazine cutouts, colour swatches, half-finished sketches. The Creative collection has layered details that reward close looking, just like everything else in their world.", productSlug: "creative-layers", identitySlug: "creative" },
      { heading: "For the Mindful Student", content: "They study with lo-fi beats and a warm drink. The Ritualist collection brings warmth and grounding to those quiet hours when they need to slow down and focus.", productSlug: "ritualist-clay", identitySlug: "ritualist" },
    ],
    faq: [
      { question: "What's the best gift for a college student?", answer: "Something they'll use daily. A mug matched to their workspace identity becomes part of their routine — not just another random gift." },
      { question: "Are these mugs durable for student life?", answer: "Yes — they're microwave safe, dishwasher safe, and covered by our Broken Mug Promise. If it arrives damaged or breaks within 30 days, we replace it free." },
      { question: "Do you have student discounts?", answer: "Take our workspace identity quiz and unlock 20% off your first order. It works for everyone — students included." },
    ],
  },
  {
    slug: "gifts-for-remote-workers",
    title: "Gifts for Remote Workers",
    metaTitle: "Home Office Gifts for Remote Workers",
    description: "Desk gifts for people who work from home — matched to their workspace personality for maximum meaning.",
    intro: "Remote workers spend 8+ hours a day at their home desk. Most are still using whichever mug was closest when they set up their home office. These gifts change that — each one matched to a workspace identity so it feels chosen, not random.",
    sections: [
      { heading: "For the Home Office Architect", content: "They've cable-managed their desk, mounted their monitor, and have a dedicated office with a door that closes. The Architect collection completes their system — a mug that matches the precision of everything else.", productSlug: "architect-grid", identitySlug: "architect" },
      { heading: "For the No-Fuss Remote Worker", content: "They don't want pretty — they want functional. The Operator collection's clean, minimal designs fit right into a workspace optimised for getting things done. Pair it with premium coffee beans.", productSlug: "operator-steel", identitySlug: "operator" },
      { heading: "For the Minimalist WFH Setup", content: "Their desk has three things on it. The Minimalist collection is for the person who says 'I don't need anything' — this is the one thing worthy of their curated space.", productSlug: "minimalist-stone", identitySlug: "minimalist" },
      { heading: "For the Ritualist at Home", content: "Working from home means morning rituals matter more. The Ritualist collection turns the coffee break from fuel to moment. Gift it with a handwritten note — they'll remember it.", productSlug: "ritualist-grain", identitySlug: "ritualist" },
    ],
    faq: [
      { question: "What's a good gift for someone who works from home?", answer: "Something that improves their daily routine. A workspace-matched mug becomes part of their 8-hour day — seen, held, and appreciated every single morning." },
      { question: "Can I add a gift note?", answer: "We're working on custom gift notes. For now, we recommend adding a personal note with your shipment." },
    ],
  },
  {
    slug: "gifts-for-creators",
    title: "Gifts for Creators",
    metaTitle: "Gifts for Designers, Writers & Artists",
    description: "For the creator who notices the glaze, the weight, and the light — gifts that match their eye for detail.",
    intro: "Creators have a different relationship with objects. They notice the texture of the ceramic, the weight of the handle, the way morning light catches the glaze. These gifts are for people who see what others miss — and care about every detail.",
    sections: [
      { heading: "For the Visual Creative", content: "The Creative collection rewards close looking — layered glazes, hidden patterns, textures that reveal themselves slowly. It's a mug that gets better the longer you know it, like the best design work.", productSlug: "creative-layers", identitySlug: "creative" },
      { heading: "For the Abstract Thinker", content: "Not literal, not obvious. The Creative Abstract mug speaks in shapes and mood, not statements. For creators whose work is about feeling, not explaining.", productSlug: "creative-abstract", identitySlug: "creative" },
      { heading: "For the Quiet Creative", content: "Not every creator is loud. Some do their best work in silence and simplicity. The Minimalist collection speaks to the creative who finds inspiration in restraint and negative space.", productSlug: "minimalist-ivory", identitySlug: "minimalist" },
      { heading: "For the Process-Focused Creator", content: "They care as much about how they make as what they make. The Ritualist collection honours that — the slow pour, the quiet pause, the attention to craft.", productSlug: "ritualist-clay", identitySlug: "ritualist" },
    ],
    faq: [
      { question: "What's a good gift for a designer?", answer: "Something they'd choose themselves — which means something with considered form, quality materials, and a detail they'll discover later. Our Creative and Minimalist collections are designed for that kind of eye." },
      { question: "Do you gift-wrap?", answer: "We're working on premium gift packaging. Currently, all orders arrive in our signature protective packaging." },
    ],
  },
];

export function getGiftGuideBySlug(slug: string): GiftGuide | undefined {
  return giftGuides.find(g => g.slug === slug);
}
