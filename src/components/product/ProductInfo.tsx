import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Star, Shield, Truck, Package } from "lucide-react";
import { Product, Collection } from "@/data/products";
import { QuizResult } from "@/data/quiz";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface ProductInfoProps {
  product: Product;
  collection: Collection | null;
  matchedIdentity: QuizResult | undefined;
}

export function ProductInfo({ product, collection, matchedIdentity }: ProductInfoProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || "");
  const [quantity, setQuantity] = useState(1);

  const currentVariant = product.variants.find((v) => v.id === selectedVariant) || product.variants[0];

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    trackEvent({ event: "add_to_cart", productId: product.id, productName: product.name, variantId: selectedVariant, price: currentVariant.price });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant);
    trackEvent({ event: "add_to_cart", productId: product.id, productName: product.name, variantId: selectedVariant, price: currentVariant.price });
    toast.success(`${product.name} added to cart`);
    navigate("/checkout");
  };

  const identityHook = matchedIdentity
    ? `For the one who works best with ${collection?.traits?.slice(0, 2).join(", ").toLowerCase()}.`
    : product.description;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{product.name}</h1>
        {collection && (
          <Link to={`/collections/${collection.slug}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
            {collection.name} Collection
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-2xl font-semibold text-foreground">₹{currentVariant.price}</span>
        {product.comparePrice && (
          <>
            <span className="text-base text-muted-foreground line-through">₹{product.comparePrice}</span>
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
              Save ₹{product.comparePrice - currentVariant.price}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">4.9 · 50+ reviews</span>
      </div>

      <p className="text-sm text-muted-foreground italic border-l-2 border-accent pl-3">
        {identityHook}
      </p>

      {product.variants.length > 1 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Size</label>
          <div className="flex gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`px-5 py-2.5 rounded-lg border text-sm transition-colors ${
                  selectedVariant === variant.id
                    ? "border-accent bg-accent/5 text-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quantity</label>
        <div className="inline-flex items-center border border-border rounded-lg">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 hover:bg-secondary transition-colors">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="px-5 py-2.5 text-sm font-medium">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 hover:bg-secondary transition-colors">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-3 border-y border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-accent shrink-0" />
          <span>Free shipping above ₹499 · Delivers in 5–7 days</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-accent shrink-0" />
          <span>Cash on Delivery across India — pay when it arrives</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent shrink-0" />
          <span>Broken Mug Promise — free replacement, no questions</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={handleBuyNow} variant="cta" size="xl" className="w-full">
          Buy Now — ₹{currentVariant.price * quantity}
        </Button>
        <Button onClick={handleAddToCart} variant="outline" size="lg" className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
