import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface StickyMobileBarProps {
  product: Product;
  variantId: string;
}

export function StickyMobileBar({ product, variantId }: StickyMobileBarProps) {
  const isMobile = useIsMobile();
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!isMobile) return null;

  const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];

  const handleBuyNow = () => {
    addItem(product, variantId);
    trackEvent({ event: "add_to_cart", productId: product.id, productName: product.name, variantId, price: variant.price });
    toast.success(`${product.name} added to cart`);
    navigate("/checkout");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3 flex items-center gap-3 safe-area-bottom">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
        <p className="text-sm font-semibold text-accent">₹{variant.price}</p>
      </div>
      <Button onClick={handleBuyNow} variant="cta" size="sm" className="shrink-0">
        Buy Now
      </Button>
    </div>
  );
}
