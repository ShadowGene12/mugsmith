import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SocialProof } from "@/components/shared/SocialProof";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product, Collection, getProductsByCollection } from "@/data/products";
import { QuizResult } from "@/data/quiz";
import { ProductCard } from "@/components/shared/ProductCard";

interface ProductDetailsProps {
  product: Product;
  collection: Collection | null;
  matchedIdentity: QuizResult | undefined;
}

export function ProductDetails({ product, collection, matchedIdentity }: ProductDetailsProps) {
  const relatedProducts = collection
    ? getProductsByCollection(collection.slug).filter((p) => p.id !== product.id)
    : [];

  return (
    <div className="space-y-16">
      {/* Review preview */}
      <section>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">What Customers Say</h2>
        <SocialProof variant="full" />
      </section>

      {/* Who this is for */}
      {matchedIdentity && (
        <section className="p-8 bg-secondary/50 rounded-xl border border-border">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Who This Is For
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            {matchedIdentity.description}
          </p>
          {collection?.traits && (
            <div className="flex flex-wrap gap-2 mt-4">
              {collection.traits.map((trait) => (
                <span key={trait} className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {trait}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Ritual / desk fit */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-secondary/30 rounded-xl">
          <Sparkles className="h-5 w-5 text-accent mb-3" />
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Morning Anchor</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This isn't just a mug — it's the first object you reach for. The weight in your hand, the warmth through the ceramic, the pause before the day begins.
          </p>
        </div>
        <div className="p-6 bg-secondary/30 rounded-xl">
          <Sparkles className="h-5 w-5 text-accent mb-3" />
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Desk Companion</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Designed to sit beside your work, not just hold your drink. A quiet presence that reflects how you think and move through your day.
          </p>
        </div>
      </section>

      {/* Accordions: Story, Care, Shipping */}
      <section>
        <Accordion type="multiple" defaultValue={["story"]}>
          <AccordionItem value="story">
            <AccordionTrigger>Design Story</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">{product.story}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>{f}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger>Care Instructions</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {product.careInstructions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>{c}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Returns</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-muted-foreground">
                <p>• Free shipping on orders above ₹499</p>
                <p>• Standard delivery: 5–7 business days</p>
                <p>• Easy returns within 14 days</p>
                <p>• Broken Mug Guarantee: free replacement if damaged</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
            More from {collection?.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Quiz CTA */}
      <section className="text-center p-8 bg-secondary/50 rounded-xl border border-border">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Not sure which mug fits you?
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          Take the 60-second quiz to discover your workspace identity and matched collection.
        </p>
        <Button asChild variant="cta" size="lg" className="group">
          <Link to="/quiz">
            Find Your Mugsmith Match
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
