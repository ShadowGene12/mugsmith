import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function QuizFeatureSection() {
  return (
    <section className="py-12 md:py-24 relative z-10 px-4">
      <div className="container-narrow text-center glass-panel p-8 md:p-16 border-accent/20 bg-accent/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(43,74,38,0.05)]">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full mb-4 md:mb-6 shadow-inner border border-accent/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs md:text-sm font-medium tracking-wide uppercase">Free · 60 seconds · Instant mapping</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-3 md:mb-6 tracking-tight">
          Not sure which archetype you belong to?
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed font-light">
          Answer a few precise questions about how you construct your days. We'll map your identity and secure your place on the waitlist for your exclusive collection.
        </p>

        <Button asChild variant="cta" size="lg" className="group">
          <Link to="/quiz">
            Take the Free Quiz
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* Quiz preview steps */}
        <div className="mt-10 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto">
          {[
            { step: "1", label: "Answer 8 behavioral questions" },
            { step: "2", label: "Receive your true workspace identity" },
            { step: "3", label: "Secure early access to your collection" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-2 font-serif font-semibold text-sm md:text-base">
                {item.step}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
