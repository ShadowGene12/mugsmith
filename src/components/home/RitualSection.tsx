import { Coffee, Monitor, Sun } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function RitualSection() {
  return (
    <section className="py-12 md:py-24 relative z-10 px-4">
      <div className="container-wide glass-panel p-8 md:p-16 my-4 shadow-[0_20px_60px_rgba(43,74,38,0.05)] border-white/40">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-xs md:text-sm mb-3">
              Premium Handcrafted Ceramic
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight">
              The foundation of your morning ritual
            </h2>
            <div className="w-16 h-0.5 bg-accent/30 mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              icon: Sun,
              title: "Sets the Morning Tone",
              description: "Your morning ritual starts before the first sip. A premium handcrafted mug grounds your focus and signals your brain: it's time to create.",
            },
            {
              icon: Monitor,
              title: "Aesthetic Desk Accessory",
              description: "Designed to complement luxury minimalist desk setups and cozy corners. An object that looks as good as it feels in your hand.",
            },
            {
              icon: Coffee,
              title: "Story-Driven Design",
              description: "Our mugs carry the identity of your workspace archetype. Every detail, from the color to the glaze, says something about how you work.",
            },
          ].map((item, index) => (
            <ScrollReveal key={index} variant="scale-up" delay={0.1 + index * 0.15}>
              <div
                className="text-center p-8 md:p-10 rounded-[2rem] glass-card border-[1.5px] border-white/60 hover:-translate-y-2 transition-transform duration-500 h-full"
              >
                <div className="w-14 h-14 rounded-[1.5rem] bg-accent/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
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
