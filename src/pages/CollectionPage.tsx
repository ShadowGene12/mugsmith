import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { getCollectionBySlug, getProductsByCollection, collections } from "@/data/products";
import { quizResults } from "@/data/quiz";
import { ArrowRight, Star, Gift, BookOpen, Sparkles, Users } from "lucide-react";
import { SEO } from "@/hooks/useSEO";

const collectionCopy: Record<string, { whoFor: string; journalTeaser: string; giftAngle: string }> = {
  "the-architect": {
    whoFor: "For the strategic thinker who builds systems, plans ahead, and sees structure where others see chaos. If your bookshelf is sorted and your calendar is colour-coded, this collection was made for you.",
    journalTeaser: "Read how architects design their morning routines around structure and intention.",
    giftAngle: "The perfect gift for someone who builds things that last — from businesses to bookshelves. Pair with a premium notebook for the complete architect's desk.",
  },
  "the-operator": {
    whoFor: "For the one who ships first and asks questions later. You value speed, clarity, and tools that work without fuss. If your inbox is at zero and your to-do list is done by noon, this is your collection.",
    journalTeaser: "How operators use their morning ritual to transition from planning mode to execution mode.",
    giftAngle: "They won't buy themselves something beautiful — they're too busy getting things done. Gift them something that makes the grind feel intentional.",
  },
  "the-minimalist": {
    whoFor: "For the curator of less. You've learned that more isn't better — better is better. Every object on your desk has earned its place. This collection rewards your restraint with refined simplicity.",
    journalTeaser: "Why minimalists choose fewer, better objects — and how a single mug can anchor an entire workspace.",
    giftAngle: "The gift for someone who says 'I don't need anything.' Because this isn't a thing — it's the right thing. Simple, intentional, and worthy of their curated space.",
  },
  "the-creative": {
    whoFor: "For the one who sees what others miss. Your workspace is a studio, your desk a canvas. You work by feel, and your best ideas arrive sideways. This collection reveals itself slowly — because the magic is in the details.",
    journalTeaser: "How creatives use texture, colour, and ritual objects to fuel their best work.",
    giftAngle: "Wrap it in something textured — they'll notice the packaging before they open it. For the friend who finds beauty in everything and meaning in the overlooked.",
  },
  "the-ritualist": {
    whoFor: "For the one who treats their morning coffee as ceremony. You understand that how we do the small things is how we do everything. This collection honours the pause, the process, the quiet moment before the world rushes in.",
    journalTeaser: "The art of the morning ritual: how a mug becomes a meditation.",
    giftAngle: "Gift this with a bag of single-origin beans and a handwritten note. They'll remember it forever. For someone who takes their mornings — and their relationships — seriously.",
  },
};

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug || "");
  const products = collection ? getProductsByCollection(collection.slug) : [];
  const matchedIdentity = collection ? quizResults.find((r) => r.collectionSlug === collection.slug) : null;
  const copy = slug ? collectionCopy[slug] : null;

  const otherCollections = collections.filter((c) => c.slug !== slug);

  if (!collection) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Collection Not Found</h1>
          <Link to="/workspace-identities" className="text-accent hover:underline">View All Workspace Identities</Link>
        </div>
      </Layout>
    );
  }

  const reviews = [
    { name: "Priya S.", location: "Mumbai", rating: 5, text: "Finally, a mug that matches my aesthetic. The design is stunning!" },
    { name: "Arjun M.", location: "Bangalore", rating: 5, text: "Great quality and the packaging was beautiful. Perfect gift material." },
    { name: "Sneha R.", location: "Delhi", rating: 5, text: "The attention to detail is incredible. My workspace feels complete now." },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
      { "@type": "ListItem", position: 2, name: "Collections", item: "https://mugsmith.lovable.app/workspace-identities" },
      { "@type": "ListItem", position: 3, name: collection.name, item: `https://mugsmith.lovable.app/collections/${collection.slug}` },
    ],
  };

  return (
    <Layout>
      <SEO
        title={`${collection.name} Collection — Mugs for ${collection.identity} Workspaces`}
        description={`${collection.tagline}. ${collection.description}`}
        keywords={`${collection.name} mugs, ${collection.identity} workspace, ceramic mugs, designer mugs, Mugsmith`}
        url={`/collections/${collection.slug}`}
        structuredData={breadcrumbSchema}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-5">
                {collection.identity}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
                {collection.name}
              </h1>
              <p className="font-serif text-xl text-accent italic mb-5">
                {collection.tagline}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
                {collection.story}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {collection.traits.map((trait) => (
                  <span key={trait} className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-sm">
                    {trait}
                  </span>
                ))}
              </div>
              <Button asChild variant="cta" size="xl" className="group">
                <a href="#products">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-serif text-2xl text-muted-foreground/50 mb-2">{collection.name}</p>
                  <p className="text-sm text-muted-foreground/30">Collection Hero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-6 border-y border-border bg-card">
        <div className="container-wide">
          <TrustBadges />
        </div>
      </section>

      {/* Who This Collection Is For */}
      {copy && (
        <section className="py-16">
          <div className="container-narrow">
            <div className="p-8 md:p-10 bg-secondary/30 rounded-xl border border-border">
              <Users className="h-5 w-5 text-accent mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Who This Collection Is For
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {copy.whoFor}
              </p>
              {matchedIdentity && (
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm" className="group">
                    <Link to={`/workspace-identities/${matchedIdentity.identity}`}>
                      Explore the {matchedIdentity.title} identity
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section id="products" className="py-16 bg-secondary/30">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">
              The Collection
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Each piece is crafted to transform your daily ritual into a moment of meaning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Journal + Gifting */}
      {copy && (
        <section className="py-16">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-card rounded-xl border border-border">
                <BookOpen className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  From the Journal
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {copy.journalTeaser}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/journal">Read the Journal</Link>
                </Button>
              </div>
              <div className="p-8 bg-card rounded-xl border border-border">
                <Gift className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Gift This Collection
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {copy.giftAngle}
                </p>
                <Button asChild variant="outline" size="sm" className="group">
                  <Link to="/gifting">
                    Explore gifting
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-3 leading-relaxed">"{review.text}"</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{review.name}</span> · {review.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Identities */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">
            Explore Other Collections
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCollections.map((other) => {
              const otherIdentity = quizResults.find((r) => r.collectionSlug === other.slug);
              return (
                <Link
                  key={other.id}
                  to={`/collections/${other.slug}`}
                  className="group p-6 bg-secondary/50 rounded-xl hover:bg-secondary transition-all border border-transparent hover:border-border"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {other.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{other.tagline}</p>
                  {otherIdentity && (
                    <span className="text-xs text-accent font-medium">For {otherIdentity.identity}s →</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container-narrow text-center">
          <Sparkles className="h-6 w-6 text-accent mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Not sure which collection fits?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Take the 60-second quiz to discover your workspace identity and get matched with your perfect collection.
          </p>
          <Button asChild variant="cta" size="lg" className="group">
            <Link to="/quiz">
              Find Your Match
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
