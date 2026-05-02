import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  children?: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-serif text-xl text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Discover your perfect mug by taking our quiz
              </p>
              <Button asChild variant="cta">
                <Link to="/quiz">
                  Take the Quiz
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {items.map((item) => {
                  const variant = item.product.variants.find(v => v.id === item.variantId);
                  const price = variant?.price || item.product.price;
                  
                  return (
                    <div key={`${item.product.id}-${item.variantId}`} className="flex gap-4 p-4 bg-secondary rounded-lg">
                      <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-muted-foreground text-center">{item.product.name}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">{variant?.name}</p>
                        <p className="font-semibold text-foreground mt-1">₹{price}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
                              className="p-1.5 hover:bg-card transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
                              className="p-1.5 hover:bg-card transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variantId)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipping and discounts calculated at checkout
                </p>
                <Button asChild variant="cta" size="lg" className="w-full">
                  <Link to="/checkout">
                    Checkout — ₹{subtotal}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/workspace-identities">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}