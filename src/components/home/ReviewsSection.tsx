import { SocialProof } from "@/components/shared/SocialProof";

export function ReviewsSection() {
  return (
    <section className="py-12 md:py-24 relative z-10 px-4">
      <div className="container-wide glass-panel p-8 md:p-16 my-4 border-white/50">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-accent font-medium tracking-widest uppercase text-[10px] md:text-xs mb-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white/40 px-3 py-1 rounded-full border border-white/60">
            Real Reviews
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
            Don't take our word for it
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-xl mx-auto font-light leading-relaxed">
            Hear from hundreds of backers who upgraded their morning ritual with premium Mugsmith ceramics.
          </p>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 glass-card p-6 border-[#e2dfdb]">
          <SocialProof variant="full" />
        </div>
      </div>
    </section>
  );
}
