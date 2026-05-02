import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getArticleBySlug, journalArticles } from "@/data/journal";
import { getProductBySlug, getCollectionBySlug } from "@/data/products";
import { quizResults } from "@/data/quiz";
import { SEO } from "@/hooks/useSEO";

export default function JournalPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <Layout>
        <SEO title="Article Not Found" description="This article doesn't exist." noindex url={`/journal/${slug}`} />
        <div className="container-narrow py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Article Not Found</h1>
          <Link to="/journal" className="text-accent hover:underline">Back to Journal</Link>
        </div>
      </Layout>
    );
  }

  const matchedProducts = article.productSlugs
    .map(s => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  const relatedIdentityResults = article.relatedIdentities
    .map(id => quizResults.find(r => r.identity === id))
    .filter(Boolean) as NonNullable<ReturnType<typeof quizResults.find>>[];

  const relatedArticles = journalArticles
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.description}
        url={`/journal/${article.slug}`}
        type="article"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
              { "@type": "ListItem", position: 2, name: "Journal", item: "https://mugsmith.lovable.app/journal" },
              { "@type": "ListItem", position: 3, name: article.title, item: `https://mugsmith.lovable.app/journal/${article.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.datePublished,
            author: { "@type": "Organization", name: "Mugsmith" },
            publisher: { "@type": "Organization", name: "Mugsmith" },
            mainEntityOfPage: `https://mugsmith.lovable.app/journal/${article.slug}`,
          },
        ]}
      />

      <article className="container-narrow py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/journal" className="hover:text-foreground transition-colors">Journal</Link></li>
            <li>/</li>
            <li className="text-foreground truncate max-w-[200px]">{article.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {article.categoryLabel}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{article.readTime} read</span>
            <span>·</span>
            <time dateTime={article.datePublished}>
              {new Date(article.datePublished).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </div>
        </header>

        {/* Intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          {article.intro}
        </p>

        {/* Sections */}
        <div className="space-y-10 mb-16">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Product Recommendations */}
        {matchedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Recommended Mugs
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Products mentioned in this article, matched to your workspace identity.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {matchedProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Related Identities */}
        {relatedIdentityResults.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Related Workspace Identities
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedIdentityResults.slice(0, 3).map(identity => (
                <Link
                  key={identity.identity}
                  to={`/workspace-identities/${identity.identity}`}
                  className="group p-5 bg-secondary rounded-xl hover:shadow-medium transition-all"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                    {identity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">"{identity.tagline}"</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {article.faq && article.faq.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {article.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Keep Reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.map(a => (
                <Link
                  key={a.slug}
                  to={`/journal/${a.slug}`}
                  className="group p-5 bg-card border border-border rounded-xl hover:border-accent/30 transition-all"
                >
                  <span className="text-xs text-accent uppercase tracking-wider">{a.categoryLabel}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.readTime} read</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quiz CTA */}
        <section className="bg-secondary rounded-2xl p-8 text-center">
          <Sparkles className="h-6 w-6 text-accent mx-auto mb-3" />
          <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
            Discover your workspace identity
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Take our 2-minute quiz and find the collection crafted for the way you work.
          </p>
          <Button asChild variant="cta" className="group">
            <Link to="/quiz">
              Take the Quiz
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </section>
      </article>
    </Layout>
  );
}
