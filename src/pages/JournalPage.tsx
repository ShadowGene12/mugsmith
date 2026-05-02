import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { journalArticles, journalCategories, JournalCategory } from "@/data/journal";
import { SEO } from "@/hooks/useSEO";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<JournalCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? journalArticles
    : journalArticles.filter(a => a.category === activeCategory);

  return (
    <Layout>
      <SEO
        title="The Journal"
        description="Stories about workspace identity, morning rituals, desk aesthetics, and thoughtful gift guides. From the Mugsmith editorial team."
        keywords="mugsmith journal, workspace blog, desk aesthetic, gift guide, morning ritual, study setup"
        url="/journal"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
            { "@type": "ListItem", position: 2, name: "Journal", item: "https://mugsmith.lovable.app/journal" },
          ],
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow text-center">
          <BookOpen className="h-10 w-10 text-accent mx-auto mb-5" />
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            The Mugsmith Journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Stories about workspace identity, morning rituals, desk aesthetics, and the meaning behind everyday objects.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container-wide mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              activeCategory === "all"
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/50"
            )}
          >
            All
          </button>
          {journalCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-accent/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category description */}
        {activeCategory !== "all" && (
          <p className="text-center text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
            {journalCategories.find(c => c.id === activeCategory)?.description}
          </p>
        )}
      </section>

      {/* Articles Grid */}
      <section className="container-wide pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <Link
              key={article.slug}
              to={`/journal/${article.slug}`}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-medium hover:border-accent/30 transition-all"
            >
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {article.categoryLabel}
              </span>
              <h2 className="font-serif text-xl font-semibold text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{article.readTime} read</span>
                <span>{new Date(article.datePublished).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No articles in this category yet. Check back soon.</p>
        )}
      </section>

      {/* Quiz CTA */}
      <section className="container-narrow pb-20">
        <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
            Not sure which collection fits?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Take our 2-minute workspace identity quiz and discover the mugs designed for the way you work.
          </p>
          <Button asChild variant="cta" size="lg" className="group">
            <Link to="/quiz">
              Discover Your Identity
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
