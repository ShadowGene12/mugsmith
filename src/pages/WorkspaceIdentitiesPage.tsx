import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { quizResults } from "@/data/quiz";
import { collections } from "@/data/products";
import { ArrowRight, Sparkles, Grid3x3, Compass, Minimize2, Palette, Coffee, Moon, Flame } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

// Updated for the new 7 Archetypes Codex
const personalityIcons: Record<string, any> = {
  builder: Grid3x3,
  minimalist: Minimize2,
  nightshift: Moon,
  stoic: Compass,
  ritualist: Coffee,
  romantic: Palette,
  maverick: Flame,
};

const personalityColors: Record<string, string> = {
  builder: "from-[#8B7355] to-[#5C4A3D]", // Earthy/Sediment
  minimalist: "from-stone-300 to-stone-500", // Clean stone
  nightshift: "from-slate-800 to-slate-950", // Dark mode
  stoic: "from-zinc-500 to-zinc-700", // Iron/Heavy
  ritualist: "from-amber-600 to-orange-800", // Warmth/Sunrise
  romantic: "from-rose-800 to-[rgb(80,20,30)]", // Deep wine
  maverick: "from-red-600 to-orange-600", // Fire intensity
};

export default function WorkspaceIdentitiesPage() {
  return (
    <Layout>
      <SEO {...pageSEO.workspaceIdentities} />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 z-10 px-4">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center glass-panel p-10 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full mb-6 shadow-inner">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">The 7 Archetypes</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              Which One Are You?
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light max-w-2xl mx-auto">
              Your workspace says something about you. The way you arrange your desk, 
              the hours you choose to work—they tell a story. We've coded seven distinct identities. Each has an aesthetic designed just for them.
            </p>

            <Button asChild variant="cta" size="xl" className="group rounded-xl shadow-[0_10px_30px_rgba(43,74,38,0.2)]">
              <Link to="/quiz">
                Discover Your Archetype
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-10 md:py-20 z-10 relative px-4">
        <div className="container-wide">
          <div className="space-y-16 md:space-y-24">
            {quizResults.map((result, index) => {
              const Icon = personalityIcons[result.identity] || Compass; // Fallback to Compass
              const collection = collections.find(c => c.slug === result.collectionSlug);
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={result.identity}
                  className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 lg:gap-20 items-center glass-panel p-6 md:p-10 border-white/50 shadow-soft`}
                >
                  {/* Visual Side */}
                  <div className="w-full md:w-1/2">
                    <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br ${personalityColors[result.identity] || "from-stone-400 to-stone-600"} shadow-inner`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_2px,transparent_1px)] bg-[length:32px_32px]" />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 shadow-xl">
                          <Icon className="h-12 w-12 md:h-16 md:w-16 text-white" />
                        </div>
                      </div>
                      
                      <div className="absolute top-6 left-6 font-serif text-6xl md:text-8xl font-bold text-white/10 select-none">
                        0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 space-y-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-accent/5 border border-accent/20 text-accent">
                      {result.identity}
                    </span>
                    
                    <h3 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
                      {result.title}
                    </h3>
                    
                    <p className="font-serif text-2xl text-accent italic">
                      "{result.tagline}"
                    </p>

                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                      {result.description}
                    </p>

                    {collection && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {collection.traits.map((trait) => (
                          <span
                            key={trait}
                            className="px-4 py-1.5 glass-card border border-white/50 text-foreground rounded-full text-xs font-medium tracking-wide uppercase"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-6">
                      <Button asChild variant="outline" size="lg" className="group/btn bg-white/40 border-border/50 backdrop-blur-sm rounded-full">
                        <Link to={`/collections/${result.collectionSlug}`}>
                          Explore Collection
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Waitlist Flow Breakdown */}
          <div className="mt-24 text-center glass-panel p-10 md:p-16 border-accent/20 shadow-[0_20px_50px_rgba(43,74,38,0.05)]">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Unlock Your Designation
            </h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-light">
              We don't just sell mugs. We identify how you work and grant you access to the specific collection engineered for your aesthetic.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "1", title: "Take the Quiz", desc: "Answer 8 precise behavioral questions." },
                { number: "2", title: "Get Your Result", desc: "Uncover your true workspace archetype." },
                { number: "3", title: "Secure Access", desc: "Join your exclusive collection waitlist." }
              ].map(step => (
                <div key={step.number} className="text-center p-6 glass-card border-white/30 rounded-[2rem]">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 text-accent font-serif text-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    {step.number}
                  </div>
                  <h3 className="font-medium text-foreground tracking-wide mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <Button asChild variant="cta" size="xl" className="group rounded-xl px-12">
                <Link to="/quiz">
                  Start the Profiling Quiz
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
