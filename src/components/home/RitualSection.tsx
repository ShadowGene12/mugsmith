import { Coffee, Monitor, Sun } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function RitualSection() {
  return (
    <section className="py-24 md:py-40 relative z-10 bg-secondary/20">
      <div className="container-wide px-6 md:px-12">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col items-center text-center mb-20 md:mb-28">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-4 h-px bg-accent"></span>
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
                Craft & Purpose
              </span>
              <span className="w-4 h-px bg-accent"></span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-2xl leading-tight">
              The foundation of your <br className="hidden md:block"/> daily ritual.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          {[
            {
              icon: Sun,
              title: "Sets the Morning Tone",
              description: "Your ritual starts before the first sip. A premium handcrafted mug grounds your focus and signals your brain: it's time to create.",
            },
            {
              icon: Monitor,
              title: "Aesthetic Accessory",
              description: "Designed to complement luxury minimalist desk setups and cozy corners. An object that looks as good as it feels in your hand.",
            },
            {
              icon: Coffee,
              title: "Story-Driven Design",
              description: "Our mugs carry the identity of your workspace archetype. Every detail, from the color to the glaze, says something about how you work.",
            },
          ].map((item, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={0.2 + index * 0.15}>
              <div
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-full border border-border/60 bg-background flex items-center justify-center mx-auto mb-8 group-hover:border-accent transition-colors duration-700">
                  <item.icon className="h-6 w-6 text-foreground stroke-[1]" />
                </div>
                <h3 className="font-serif text-2xl font-light text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.8] font-light tracking-wide max-w-sm mx-auto">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
