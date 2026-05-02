import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const bestsellers = products.filter(p => p.badge || p.comparePrice).slice(0, 4);
const displayProducts = bestsellers.length >= 4 ? bestsellers : products.slice(0, 4);

export function BestsellersSection() {
  return (
    <section className="py-12 md:py-24 relative z-10">
      <div className="container-wide glass-panel p-8 md:p-12 my-4">
        <ScrollReveal variant="fade-up">
          <div className="flex items-end justify-between mb-8 md:mb-12 px-2 md:px-0">
            <div>
              <span className="inline-block text-accent font-medium tracking-widest uppercase text-xs md:text-sm mb-2">
                Customer Favourites
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-foreground">
                The mugs people keep coming back for
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex group text-muted-foreground">
              <Link to="/workspace-identities">
                Browse All
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0">
          {displayProducts.map((product, index) => (
            <ScrollReveal key={product.id} variant="fade-up" delay={0.1 + index * 0.1}>
              <Link
                to={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-xl bg-secondary overflow-hidden mb-3">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                    <ShoppingBag className="h-12 w-12" />
                  </div>
                  {product.badge && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] md:text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mb-1">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-semibold text-foreground">₹{product.price}</span>
                  {product.comparePrice && (
                    <span className="text-xs md:text-sm text-muted-foreground line-through">₹{product.comparePrice}</span>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={0.4}>
          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="outline" size="sm" className="group">
              <Link to="/workspace-identities">
                Browse All Collections
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
