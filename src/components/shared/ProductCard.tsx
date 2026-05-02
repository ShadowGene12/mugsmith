import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { trackEvent } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
      onClick={() => trackEvent({ event: "view_product", productId: product.id, productName: product.name, price: product.price })}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4" style={{ containIntrinsicSize: "auto 300px", contentVisibility: "auto" }}>
        {/* Placeholder */}
        <div className="absolute inset-0 bg-gradient-warm flex items-center justify-center">
          <span className="font-serif text-2xl text-muted-foreground/50">{product.name}</span>
        </div>
        
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            {product.badge}
          </div>
        )}

        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">₹{product.price}</span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.comparePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
