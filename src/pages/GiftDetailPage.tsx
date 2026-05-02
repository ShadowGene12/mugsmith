import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { getGiftGuideBySlug, giftGuides } from "@/data/giftGuides";
import { getProductBySlug } from "@/data/products";
import { quizResults } from "@/data/quiz";
import { SEO } from "@/hooks/useSEO";

export default function GiftDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGiftGuideBySlug(slug || "");

  if (!guide) {
    return (
      <Layout>
        <SEO title="Gift Guide Not Found" description="This gift guide doesn't exist." noindex url={`/gifts/${slug}`} />
        <div className="container-narrow py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Gift Guide Not Found</h1>
          <Link to="/gifting" className="text-accent hover:underline">Back to Gifting</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={guide.metaTitle}
        description={guide.description}
        url={`/gifts/${guide.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
            { "@type": "ListItem", position: 2, name: "Gifting", item: "https://mugsmith.lovable.app/gifting" },
            { "@type": "ListItem", position: 3, name: guide.title, item: `https://mugsmith.lovable.app/gifts/${guide.slug}` },
          ],
        }}
      />

      <div className="container-narrow py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/gifting" className="hover:text-foreground transition-colors">Gifting</Link></li>
            <li>/</li>
            <li className="text-foreground">{guide.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <Gift className="h-10 w-10 text-accent mx-auto mb-4" />
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {guide.description}
          </p>
        </header>

        {/* Intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-14 max-w-2xl mx-auto text-center">
          {guide.intro}
        </p>

        {/* Gift Sections with Product Cards */}
        <div className="space-y-16 mb-16">
          {guide.sections.map((section, i) => {
            const product = getProductBySlug(section.productSlug);
            const identity = quizResults.find(r => r.identity === section.identitySlug);
            return (
              <section key={i} className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {section.content}
                  </p>
                  {identity && (
                    <Link
                      to={`/workspace-identities/${identity.identity}`}
                      className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                    >
                      Learn about {identity.title}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                {product && (
                  <div className="max-w-xs mx-auto md:mx-0">
                    <ProductCard product={product} />
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* FAQ */}
        {guide.faq.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {guide.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Other Gift Guides */}
        <section className="mb-16">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            More Gift Guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {giftGuides.filter(g => g.slug !== guide.slug).map(g => (
              <Link
                key={g.slug}
                to={`/gifts/${g.slug}`}
                className="group p-5 bg-card border border-border rounded-xl hover:border-accent/30 transition-all"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {g.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{g.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="bg-secondary rounded-2xl p-8 text-center">
          <Sparkles className="h-6 w-6 text-accent mx-auto mb-3" />
          <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
            Not sure which to gift?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Take the quiz as them — answer how they work and we'll find the mug that fits.
          </p>
          <Button asChild variant="cta" className="group">
            <Link to="/quiz">
              Take the Quiz for Them
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
}
