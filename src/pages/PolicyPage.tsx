import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { policies } from "@/data/content";
import { SEO } from "@/hooks/useSEO";

export default function PolicyPage() {
  const { type } = useParams<{ type: string }>();
  const policy = policies[type as keyof typeof policies];

  if (!policy) {
    return (
      <Layout>
        <div className="container-narrow py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Policy Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={policy.title}
        description={`${policy.title} for Mugsmith. Learn about our policies and how we protect your interests.`}
        url={`/policy/${type}`}
      />
      <div className="container-narrow py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8 text-center">
          {policy.title}
        </h1>
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {policy.content}
          </div>
        </div>
      </div>
    </Layout>
  );
}
