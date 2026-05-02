import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { quizResults } from "@/data/quiz";
import { collections, getProductsByCollection } from "@/data/products";
import { ArrowRight, Grid3x3, Compass, Minimize2, Palette, Coffee, Gift, Sparkles, Monitor, BookOpen } from "lucide-react";
import { SEO } from "@/hooks/useSEO";

const personalityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  architect: Grid3x3,
  operator: Compass,
  minimalist: Minimize2,
  creative: Palette,
  ritualist: Coffee,
};

const deskVibes: Record<string, { headline: string; description: string }> = {
  architect: {
    headline: "The Command Centre",
    description: "Your desk is a system. Notebooks stacked by priority, tools within reach, every object placed with intention. You think in blueprints — and your workspace reflects that precision.",
  },
  operator: {
    headline: "The Launch Pad",
    description: "Clean surface, dual monitors, zero clutter. Your desk is built for speed — nothing stays that doesn't serve a purpose. You ship first, decorate never.",
  },
  minimalist: {
    headline: "The Curated Surface",
    description: "One notebook. One pen. One mug. Your desk is a gallery of restraint — every object has earned its place through beauty, function, or meaning. Nothing more.",
  },
  creative: {
    headline: "The Studio Corner",
    description: "Sketchbooks layered over colour swatches, inspiration pinned to the wall, half-finished ideas that will become something brilliant. Your desk is alive with possibility.",
  },
  ritualist: {
    headline: "The Quiet Altar",
    description: "A candle, a journal, a warm mug. Your desk isn't just where you work — it's where you pause. The ritual of setting up is as important as the work itself.",
  },
};

const ritualFits: Record<string, { headline: string; description: string }> = {
  architect: {
    headline: "The Planning Hour",
    description: "You reach for your mug during the first hour — the one where you map the day, review the systems, and set the structure. The weight of the ceramic grounds you while your mind builds.",
  },
  operator: {
    headline: "The Execution Block",
    description: "Your mug lives next to your keyboard. It's fuel for deep work — the companion during the 90-minute sprint where everything else disappears and only output matters.",
  },
  minimalist: {
    headline: "The Intentional Pause",
    description: "You don't multitask with your coffee. You stop. You hold the mug. You look out the window. Then you return to work, clearer than before. The mug is part of the practice.",
  },
  creative: {
    headline: "The Wandering Moment",
    description: "Your best ideas arrive between sips. The mug sits beside your sketchbook during those unstructured hours when you're not trying to think — you're letting thoughts arrive.",
  },
  ritualist: {
    headline: "The Morning Ceremony",
    description: "Before email, before the world, before anything — there's the ritual. Boil water. Choose the mug. Pour slowly. This isn't caffeine. It's a conversation with yourself.",
  },
};

const giftAngles: Record<string, string> = {
  architect: "Know someone who colour-codes their bookshelf and has a five-year plan? This is their mug. Gift it with a note: 'For the one who builds what lasts.'",
  operator: "For the friend who replies to emails in under a minute and has three side projects. They won't buy themselves something beautiful — so you should.",
  minimalist: "The perfect gift for someone who says 'I don't need anything.' Because this isn't a thing — it's the right thing.",
  creative: "For the one who sees beauty in everything. Wrap it in something textured. They'll notice the packaging before they open it.",
  ritualist: "Gift this to someone who takes their morning seriously. Include a bag of single-origin beans and a handwritten note. They'll remember it.",
};

export default function WorkspaceIdentityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const result = quizResults.find((r) => r.identity === slug);
  const collection = result ? collections.find((c) => c.slug === result.collectionSlug) : null;
  const products = collection ? getProductsByCollection(collection.slug) : [];
  const Icon = slug ? personalityIcons[slug] || Grid3x3 : Grid3x3;

  const otherIdentities = quizResults.filter((r) => r.identity !== slug);
  const deskVibe = slug ? deskVibes[slug] : null;
  const ritualFit = slug ? ritualFits[slug] : null;
  const giftAngle = slug ? giftAngles[slug] : null;

  if (!result || !collection) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Identity Not Found</h1>
          <Link to="/workspace-identities" className="text-accent hover:underline">
            View All Workspace Identities
          </Link>
        </div>
      </Layout>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
      { "@type": "ListItem", position: 2, name: "Workspace Identities", item: "https://mugsmith.lovable.app/workspace-identities" },
      { "@type": "ListItem", position: 3, name: result.title, item: `https://mugsmith.lovable.app/workspace-identities/${slug}` },
    ],
  };

  return (
    <Layout>
      <SEO
        title={`${result.title} — Workspace Identity`}
        description={`${result.description} Discover mugs designed for the ${result.identity} workspace.`}
        keywords={`${result.identity} workspace identity, ${result.identity} mugs, workspace personality, Mugsmith`}
        url={`/workspace-identities/${slug}`}
        structuredData={breadcrumbSchema}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Icon className="h-7 w-7 text-accent" />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
              Workspace Identity
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-4">
              {result.title}
            </h1>
            <p className="font-serif text-xl text-accent italic mb-6">"{result.tagline}"</p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6">
              {result.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {collection.traits.map((trait) => (
                <span key={trait} className="px-3 py-1.5 bg-secondary text-muted-foreground rounded-full text-sm font-medium">
                  {trait}
                </span>
              ))}
            </div>
            <Button asChild variant="cta" size="xl" className="group">
              <Link to={`/collections/${collection.slug}`}>
                Shop {collection.name} Collection
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Desk Aesthetic + Ritual Fit */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {deskVibe && (
              <div className="p-8 bg-card rounded-xl border border-border">
                <Monitor className="h-5 w-5 text-accent mb-4" />
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Your Desk: {deskVibe.headline}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {deskVibe.description}
                </p>
              </div>
            )}
            {ritualFit && (
              <div className="p-8 bg-card rounded-xl border border-border">
                <Coffee className="h-5 w-5 text-accent mb-4" />
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Your Ritual: {ritualFit.headline}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {ritualFit.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Matched Products */}
      {products.length > 0 && (
        <section className="py-16">
          <div className="container-wide">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">
                Mugs Made for {result.title}
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Every piece in the {collection.name} collection is designed around how you think, work, and move through your day.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gifting Angle */}
      {giftAngle && (
        <section className="py-16 bg-secondary/30">
          <div className="container-narrow">
            <div className="p-8 bg-card rounded-xl border border-border text-center">
              <Gift className="h-6 w-6 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
                Gift This Identity
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
                {giftAngle}
              </p>
              <Button asChild variant="outline" size="sm" className="group">
                <Link to="/gifting">
                  Explore gifting options
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related Identities */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">
            Explore Other Identities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherIdentities.map((other) => {
              const OtherIcon = personalityIcons[other.identity] || Grid3x3;
              return (
                <Link
                  key={other.identity}
                  to={`/workspace-identities/${other.identity}`}
                  className="group p-6 bg-secondary/50 rounded-xl hover:bg-secondary transition-all border border-transparent hover:border-border"
                >
                  <OtherIcon className="h-5 w-5 text-accent mb-3" />
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{other.tagline}</p>
                  <span className="text-xs font-medium text-accent">Explore →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journal + Quiz CTAs */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card rounded-xl border border-border text-center">
              <BookOpen className="h-5 w-5 text-accent mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Stories for {result.identity}s
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Read how others with this identity design their workspace rituals.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/journal">Browse the Journal</Link>
              </Button>
            </div>
            <div className="p-8 bg-card rounded-xl border border-border text-center">
              <Sparkles className="h-5 w-5 text-accent mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Not sure this is you?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take the 60-second quiz to discover your true workspace identity.
              </p>
              <Button asChild variant="cta" size="sm" className="group">
                <Link to="/quiz">
                  Find Your Match
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
