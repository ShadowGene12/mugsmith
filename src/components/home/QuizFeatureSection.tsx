import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function QuizFeatureSection() {
  return (
    <section className="py-24 md:py-40 relative z-10 bg-background overflow-hidden">
      {/* Delicate background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-border/40" />
      <div className="absolute top-0 right-[15%] w-px h-24 bg-border/40" />

      <div className="container-wide text-center">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-secondary/30 rounded-sm -z-10" />

          <div className="inline-flex items-center gap-2 mb-10">
            <span className="w-6 h-px bg-accent"></span>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
              Discovery
            </span>
            <span className="w-6 h-px bg-accent"></span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Not sure which archetype <br className="hidden md:block"/> belongs on your desk?
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-14 leading-[1.8] font-light tracking-wide">
            Take a 60-second assessment. Answer a few precise questions about how you construct your days, and we'll map your identity.
          </p>

          <Button asChild variant="cta" size="lg" className="group min-w-[200px]">
            <Link to="/quiz">
              Begin Assessment
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
            </Link>
          </Button>

          {/* Quiz preview steps */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-2xl mx-auto px-4">
            {[
              { step: "01", label: "Answer questions about your daily rituals" },
              { step: "02", label: "Discover your exact workspace archetype" },
              { step: "03", label: "Secure early access to your piece" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="text-xs tracking-[0.2em] font-medium text-accent mb-4">
                  {item.step}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
