export type ArchetypeId = 'MIN' | 'BLD' | 'NGT' | 'STO' | 'RIT' | 'ROM' | 'MAV';

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    scores: Partial<Record<ArchetypeId, number>>;
  }[];
}

export interface QuizResult {
  identity: ArchetypeId;
  title: string;
  tagline: string;
  description: string;
  collection: string;
  collectionSlug: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "When your workspace feels \"right,\" it feels:",
    options: [
      { id: "q1-a", text: "Clear. Empty surfaces. Nothing extra.", scores: { MIN: 3, STO: 1 } },
      { id: "q1-b", text: "Warm. Lived-in. Objects that mean something.", scores: { RIT: 3, ROM: 2 } },
      { id: "q1-c", text: "Sharp. Precise. Built for the work.", scores: { BLD: 3, STO: 2 } },
      { id: "q1-d", text: "Alive. Colorful. A little chaotic.", scores: { MAV: 3, ROM: 1 } },
    ],
  },
  {
    id: "q2",
    question: "Your best working hours are:",
    options: [
      { id: "q2-a", text: "Early morning. Before the world is loud.", scores: { RIT: 3, STO: 2, MIN: 1 } },
      { id: "q2-b", text: "Mid-morning into afternoon. Steady, structured.", scores: { STO: 3, BLD: 2, MIN: 1 } },
      { id: "q2-c", text: "Late evening. When everything else has stopped.", scores: { NGT: 3, BLD: 1 } },
      { id: "q2-d", text: "Whenever the idea hits. The clock is a suggestion.", scores: { MAV: 3, ROM: 2, NGT: 1 } },
    ],
  },
  {
    id: "q3",
    question: "Pick the phrase that fits you most:",
    options: [
      { id: "q3-a", text: "I remove what isn't needed.", scores: { MIN: 3, STO: -1 } },
      { id: "q3-b", text: "I hold to what I've decided.", scores: { STO: 3, MIN: -1 } },
      { id: "q3-c", text: "I protect what feels right.", scores: { RIT: 3, ROM: 2, NGT: 1 } },
      { id: "q3-d", text: "I follow what pulls me.", scores: { MAV: 3, ROM: 1, NGT: 1 } },
    ],
  },
  {
    id: "q4",
    question: "On your desk right now, the object that says the most about you is:",
    options: [
      { id: "q4-a", text: "Nothing. That's the point.", scores: { MIN: 3 } },
      { id: "q4-b", text: "A tool I use every day — a notebook, a pen, a specific cup.", scores: { RIT: 3, BLD: 2, STO: 1 } },
      { id: "q4-c", text: "Something beautiful — a book, a photo, an object I love looking at.", scores: { ROM: 3, NGT: 1 } },
      { id: "q4-d", text: "The thing I'm currently building. It changes every month.", scores: { BLD: 3, MAV: 2 } },
    ],
  },
  {
    id: "q5",
    question: "Pick the palette that feels like your space:",
    options: [
      { id: "q5-a", text: "Off-white, bone, soft grey. Almost nothing.", scores: { MIN: 3, STO: 1 } },
      { id: "q5-b", text: "Warm wood, cream, terracotta, old gold.", scores: { RIT: 3, ROM: 2 } },
      { id: "q5-c", text: "Charcoal, deep navy, black, single warm glow.", scores: { NGT: 3, STO: 2, BLD: 1 } },
      { id: "q5-d", text: "Burnt orange, mustard, deep green, color on color.", scores: { MAV: 3, ROM: 1 } },
    ],
  },
  {
    id: "q6",
    question: "When you're deep in work, you feel most like:",
    options: [
      { id: "q6-a", text: "An architect — planning, refining, cutting.", scores: { BLD: 3, MIN: 1, STO: 1 } },
      { id: "q6-b", text: "A monk — quiet, steady, in rhythm.", scores: { STO: 3, RIT: 2, MIN: 1 } },
      { id: "q6-c", text: "An artist — feeling it out, following it.", scores: { ROM: 3, MAV: 2, NGT: 1 } },
      { id: "q6-d", text: "A storm — intense, fast, a lot at once.", scores: { MAV: 3, BLD: 1 } },
    ],
  },
  {
    id: "q7",
    question: "A good mug, to you, is one that:",
    options: [
      { id: "q7-a", text: "Disappears into the desk. You barely notice it's there.", scores: { MIN: 3, STO: 1 } },
      { id: "q7-b", text: "Feels earned. Sturdy. Built to last a decade.", scores: { BLD: 3, STO: 2 } },
      { id: "q7-c", text: "Has weight and depth. Dark, quiet, a little heavy.", scores: { NGT: 3, STO: 1 } },
      { id: "q7-d", text: "Says something. A phrase, a mark, a point of view.", scores: { MAV: 3, ROM: 1 } },
      { id: "q7-e", text: "Feels like a hand-made object. Warm. Imperfect.", scores: { RIT: 3, ROM: 2 } },
      { id: "q7-f", text: "Is beautiful enough to just look at.", scores: { ROM: 3, MIN: 1 } },
    ],
  },
  {
    id: "q8",
    question: "The feeling you're really trying to build into your day is:",
    options: [
      { id: "q8-a", text: "Clarity. Less noise.", scores: { MIN: 2, STO: 1 } },
      { id: "q8-b", text: "Focus. Deep work.", scores: { BLD: 2, NGT: 1, STO: 1 } },
      { id: "q8-c", text: "Stillness. A slower pace.", scores: { RIT: 2, ROM: 1, MIN: 1 } },
      { id: "q8-d", text: "Aliveness. Something to feel.", scores: { MAV: 2, ROM: 2, NGT: 1 } },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    identity: "MIN",
    title: "The Minimalist",
    tagline: "Clarity is a form of power. Less on the desk, more in the mind.",
    description: "You have done what most people cannot: you have chosen. Not once, but every day. You have made the quiet bet that the good life is not acquired, it is edited. You understand that taste is what you refuse.",
    collection: "Minimalist",
    collectionSlug: "the-minimalist",
  },
  {
    identity: "BLD",
    title: "The Builder",
    tagline: "The craft is the reward.",
    description: "The world is full of people who talk about doing. You are in the smaller set who actually do. Your coffee is strong because you made it strong. Your work has weight because you put weight into it. You believe the difference between good and great is measured in hours nobody sees you putting in.",
    collection: "Builder",
    collectionSlug: "the-builder",
  },
  {
    identity: "NGT",
    title: "The Nightshift",
    tagline: "The world sleeps. I work. I think clearest in the dark.",
    description: "You have known, for a long time, that the world gets quieter and better after most of it has gone to sleep. This is not a flaw in your rhythm. This is the rhythm. The silence that settles around you at eleven, at midnight, at one — that is where your thinking sharpens.",
    collection: "Nightshift",
    collectionSlug: "the-nightshift",
  },
  {
    identity: "STO",
    title: "The Stoic",
    tagline: "Discipline over mood. Principles over preferences. A chosen code.",
    description: "You have chosen a path that most people mistake for severity. You know it is the opposite — it is freedom. The freedom that comes from having decided, in advance, what you will do and what you will not. You train your body. You hold your word. You do not react when reaction is easy. Your days have a shape, and the shape is intentional.",
    collection: "Stoic",
    collectionSlug: "the-stoic",
  },
  {
    identity: "RIT",
    title: "The Ritualist",
    tagline: "Gentle consistency beats aggressive inconsistency. Small acts, done with care, build a life.",
    description: "You figured out, probably earlier than most people, that life is mostly texture. Mostly mornings. Mostly small acts, repeated. You have built the practices that stabilize you — the journal, the tea, the quiet hour before the day starts. You romanticize your own life on purpose, and you are right to.",
    collection: "Ritualist",
    collectionSlug: "the-ritualist",
  },
  {
    identity: "ROM",
    title: "The Romantic",
    tagline: "Slow mornings, thick books, warm light. The good life is a small one, well-lived.",
    description: "You have made a quiet bet against the pace of the world — that a slow afternoon is worth defending, that texture matters, that a good book on a rainy day is never, ever time wasted. You notice things other people walk past. You romanticize your own life, and you are right to.",
    collection: "Romantic",
    collectionSlug: "the-romantic",
  },
  {
    identity: "MAV",
    title: "The Maverick",
    tagline: "I think in color. My mind moves fast. The work is alive because I am.",
    description: "Your brain runs hot. You have ideas faster than you can catch them, and you catch most of them anyway. You think in color, in image, in metaphor — your desk shows it, your wardrobe shows it, your work shows it. You are not chaos. You are density. You just happen to live out loud.",
    collection: "Maverick",
    collectionSlug: "the-maverick",
  },
];

export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  const scores: Record<ArchetypeId, number> = {
    MIN: 0,
    BLD: 0,
    NGT: 0,
    STO: 0,
    RIT: 0,
    ROM: 0,
    MAV: 0,
  };

  quizQuestions.forEach((question) => {
    const answerId = answers[question.id];
    const selectedOption = question.options.find(opt => opt.id === answerId);
    if (selectedOption && selectedOption.scores) {
      Object.entries(selectedOption.scores).forEach(([identity, score]) => {
        if (score) {
          scores[identity as ArchetypeId] += score;
        }
      });
    }
  });

  // Find max score
  const maxScore = Math.max(...Object.values(scores));
  
  // Find all archetypes with the max score
  const tiedArchetypes = (Object.keys(scores) as ArchetypeId[]).filter(
    (id) => scores[id] === maxScore
  );

  let winningIdentity = tiedArchetypes[0];

  if (tiedArchetypes.length > 1) {
    // Tiebreaker logic
    // Rule 1: Q7 priority
    const q7AnswerId = answers["q7"];
    const q7Option = quizQuestions.find(q => q.id === "q7")?.options.find(opt => opt.id === q7AnswerId);
    let q7Winner: ArchetypeId | null = null;
    let maxQ7Score = -Infinity;
    
    // Find the tied archetype with highest score in Q7
    if (q7Option && q7Option.scores) {
      tiedArchetypes.forEach(arch => {
        const score = q7Option.scores[arch] || 0;
        if (score > maxQ7Score) {
          maxQ7Score = score;
          q7Winner = arch;
        }
      });
    }
    
    // Check if q7Winner resolves tie
    const q7Ties = tiedArchetypes.filter(arch => (q7Option?.scores[arch] || 0) === maxQ7Score);
    
    if (q7Ties.length === 1 && q7Winner) {
      winningIdentity = q7Winner;
    } else {
      // Rule 2: Q3 priority
      const q3AnswerId = answers["q3"];
      const q3Option = quizQuestions.find(q => q.id === "q3")?.options.find(opt => opt.id === q3AnswerId);
      let q3Winner: ArchetypeId | null = null;
      let maxQ3Score = -Infinity;
      
      if (q3Option && q3Option.scores) {
        q7Ties.forEach(arch => {
          const score = q3Option.scores[arch] || 0;
          if (score > maxQ3Score) {
            maxQ3Score = score;
            q3Winner = arch;
          }
        });
      }
      
      const q3Ties = q7Ties.filter(arch => (q3Option?.scores[arch] || 0) === maxQ3Score);
      
      if (q3Ties.length === 1 && q3Winner) {
        winningIdentity = q3Winner;
      } else {
        // Rule 3: Fixed hierarchy fallback
        // STO > MIN, RIT > ROM, BLD > MAV, NGT > STO
        const fallbackPriority: Record<ArchetypeId, number> = {
          NGT: 7,
          STO: 6,
          MIN: 5,
          RIT: 4,
          ROM: 3,
          BLD: 2,
          MAV: 1
        };
        
        winningIdentity = q3Ties.reduce((a, b) => fallbackPriority[a] > fallbackPriority[b] ? a : b);
      }
    }
  }

  return quizResults.find(r => r.identity === winningIdentity) || quizResults[0];
}
