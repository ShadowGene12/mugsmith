import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

const journalPreviews = [
  {
    slug: "why-your-mug-matters",
    title: "Why Your Morning Mug Matters More Than You Think",
    excerpt: "Psychologists call it 'object attachment.' We call it the reason your morning coffee tastes different in a mug you actually chose.",
    category: "Rituals",
  },
  {
    slug: "the-seven-archetypes",
    title: "The 7 Workspace Archetypes — Which Are You?",
    description: "The Builder, The Minimalist, The Nightshift... A deep dive into the identity-driven aesthetic of our collections.",
    category: "Workspace Identity",
  },
  {
    slug: "building-mugsmith",
    title: "From Clay to Character: How Luxury Mugs Are Made",
    excerpt: "Behind every collection is an artisanal process, from design sketches to kiln-fired ceramic. Here's a look inside our Indian studios.",
    category: "Behind the Scenes",
  },
];

export function JournalPreviewSection() {
  return (
    <section className="py-12 md:py-24 relative z-10 px-4">
      <div className="container-wide glass-panel p-8 md:p-16 my-4">
        <div className="flex items-end justify-between mb-8 md:mb-12 px-2 md:px-0">
          <div>
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-xs md:text-sm mb-3">
              The Mugsmith Journal
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Ideas for better mornings and sharper desks
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex group text-muted-foreground hover:bg-white/10 hover:backdrop-blur-sm rounded-full transition-all duration-300">
            <Link to="/journal">
              Read All
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
          {journalPreviews.map((post) => (
            <Link
              key={post.slug}
              to={`/journal/${post.slug}`}
              className="group block p-6 md:p-8 rounded-[2rem] glass-card border border-white/50 hover:border-accent/40 shadow-[0_10px_30px_rgba(43,74,38,0.03)] hover:shadow-[0_20px_50px_rgba(43,74,38,0.08)] transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-accent" />
                <span className="text-[10px] md:text-xs font-semibold text-accent uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 font-light leading-relaxed">
                {post.excerpt || post.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button asChild variant="outline" size="sm">
            <Link to="/journal">
              Read the Journal
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
