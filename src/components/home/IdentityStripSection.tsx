import { Link } from "react-router-dom";
import { collections } from "@/data/products";
import { ArrowRight, Compass, Crosshair, Minimize2, Palette, Flame, Moon, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

// Expand icons to map exactly to the 7 archetypes:
// Builder, Minimalist, Nightshift, Stoic, Ritualist, Romantic, Maverick
const icons = [Compass, Minimize2, Moon, Crosshair, Flame, Palette, Zap];

export function IdentityStripSection() {
  return (
    <section className="py-10 md:py-16 relative z-10">
      <div className="container-wide glass-panel p-8 md:p-12 my-4">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-xs md:text-sm mb-2">
              Personality-Matched Collections
            </span>
            <h2 className="font-serif text-xl md:text-3xl font-semibold text-foreground">
              Every mug tells a story. Which one is yours?
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll strip */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide">
          {collections.map((collection, index) => {
            const Icon = icons[index] || Compass;
            return (
              <ScrollReveal key={collection.id} variant="slide-right" delay={0.1 + (index * 0.1)}>
                <Link
                  to={`/collections/${collection.slug}`}
                  className="flex-shrink-0 flex flex-col items-center text-center p-3 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all w-28 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-serif text-xs font-semibold text-foreground line-clamp-1">
                    {collection.name}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Desktop: horizontal wrap */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          {collections.map((collection, index) => {
            const Icon = icons[index] || Compass;
            return (
              <ScrollReveal key={collection.id} variant="scale-up" delay={0.1 + (index * 0.1)}>
                <Link
                  to={`/collections/${collection.slug}`}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-accent/30 hover:shadow-md transition-all duration-300 h-full w-[180px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {collection.tagline}
                  </p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
