import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { giftingContent } from "@/data/content";
import { giftGuides } from "@/data/giftGuides";
import { Gift, ArrowRight } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function GiftingPage() {
  return (
    <Layout>
      <SEO {...pageSEO.gifting} />
      <div className="container-narrow py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-up">
          <Gift className="h-12 w-12 text-accent mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            {giftingContent.hero.headline}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {giftingContent.hero.subheadline}
          </p>
        </div>

        {/* Gift Guides */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">
            Gift Guides by Personality
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {giftGuides.map(guide => (
              <Link
                key={guide.slug}
                to={`/gifts/${guide.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-medium hover:border-accent/30 transition-all"
              >
                <Gift className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {guide.description}
                </p>
                <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read guide <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Quiz CTA */}
        <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
            {giftingContent.cta.headline}
          </h2>
          <p className="text-muted-foreground mb-8">{giftingContent.cta.description}</p>
          <Button asChild variant="cta" size="lg" className="group">
            <Link to="/quiz">
              {giftingContent.cta.buttonText}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Occasions */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">Perfect For</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {giftingContent.occasions.map((occasion) => (
              <span key={occasion} className="px-4 py-2 bg-card border border-border rounded-full text-sm">
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
