import { Link } from "react-router-dom";
import { collections } from "@/data/products";
import { ArrowRight, Compass, Crosshair, Minimize2, Palette, Flame, Moon, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

// Expand icons to map exactly to the 7 archetypes:
// Builder, Minimalist, Nightshift, Stoic, Ritualist, Romantic, Maverick
const icons = [Compass, Minimize2, Moon, Crosshair, Flame, Palette, Zap];

export function IdentityStripSection() {
  return (
    <section className="py-20 md:py-32 relative z-10 bg-secondary/30">
      <div className="container-wide px-6 md:px-12">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-4 h-px bg-accent"></span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                The Seven Archetypes
              </span>
              <span className="w-4 h-px bg-accent"></span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-2xl leading-tight">
              A collection for every kind of <span className="italic">quiet pursuit.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll strip */}
        <div className="flex md:hidden gap-6 overflow-x-auto pb-8 px-2 -mx-2 scrollbar-hide snap-x">
          {collections.map((collection, index) => {
            const Icon = icons[index] || Compass;
            return (
              <ScrollReveal key={collection.id} variant="slide-right" delay={0.1 + (index * 0.1)}>
                <Link
                  to={`/collections/${collection.slug}`}
                  className="flex-shrink-0 flex flex-col items-center text-center p-6 bg-background rounded-sm snap-center w-[200px]"
                >
                  <div className="mb-6">
                    <Icon className="h-6 w-6 text-foreground stroke-[1]" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light tracking-wide">
                    {collection.tagline}
                  </p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.slice(0, 4).map((collection, index) => {
            const Icon = icons[index] || Compass;
            return (
              <ScrollReveal key={collection.id} variant="fade-up" delay={0.2 + (index * 0.1)}>
                <Link
                  to={`/collections/${collection.slug}`}
                  className="group flex flex-col p-8 bg-background rounded-sm hover:-translate-y-1 transition-transform duration-700 h-full border border-border/40"
                >
                  <div className="mb-8">
                    <Icon className="h-8 w-8 text-foreground stroke-[1] group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light tracking-wide mb-8">
                    {collection.tagline}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-foreground group-hover:text-accent transition-colors">
                    Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 text-center hidden md:block">
           <Link to="/workspace-identities" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors pb-1 border-b border-border hover:border-foreground">
             View All Archetypes
           </Link>
        </div>
      </div>
    </section>
  );
}
