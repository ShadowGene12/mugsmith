import { Layout } from "@/components/layout/Layout";
import { aboutContent } from "@/data/content";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function AboutPage() {
  return (
    <Layout>
      <SEO {...pageSEO.about} />
      <div className="container-narrow py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            {aboutContent.hero.headline}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {aboutContent.hero.subheadline}
          </p>
        </div>

        <div className="space-y-12 mb-16">
          {aboutContent.story.map((section, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {aboutContent.values.map((value, i) => (
            <div key={i} className="p-6 bg-secondary rounded-xl">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
