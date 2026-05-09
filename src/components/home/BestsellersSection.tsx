import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const bestsellers = products.filter(p => p.badge || p.comparePrice).slice(0, 4);
const displayProducts = bestsellers.length >= 4 ? bestsellers : products.slice(0, 4);

export function BestsellersSection() {
  return (
    <section className="py-24 md:py-32 relative z-10 bg-background">
      <div className="container-wide px-6 md:px-12">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-2 md:px-0">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-4 h-px bg-accent"></span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  Signature Pieces
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground leading-tight">
                Objects of daily reverence.
              </h2>
            </div>
            <Button asChild variant="minimal" className="hidden md:inline-flex mt-6 md:mt-0 text-sm tracking-widest uppercase">
              <Link to="/workspace-identities">
                View Collection
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16 px-2 md:px-0">
          {displayProducts.map((product, index) => (
            <ScrollReveal key={product.id} variant="fade-up" delay={0.2 + index * 0.15}>
              <Link
                to={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] bg-secondary/50 overflow-hidden mb-6 rounded-sm">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 group-hover:text-accent/20 group-hover:scale-105 transition-all duration-1000 ease-out">
                    <ShoppingBag className="h-16 w-16 stroke-[1]" />
                  </div>
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-accent border border-accent/20 text-[10px] tracking-widest uppercase font-medium rounded-sm">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 ease-out" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-lg md:text-xl text-foreground font-light group-hover:text-accent transition-colors duration-500">
                      {product.name}
                    </h3>
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">₹{product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 font-light tracking-wide">
                    {product.description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={0.4}>
          <div className="text-center mt-16 md:hidden">
            <Button asChild variant="minimal" className="group text-xs tracking-widest uppercase">
              <Link to="/workspace-identities">
                View Collection
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
