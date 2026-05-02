import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { 
  Package, 
  Truck, 
  Shield, 
  CreditCard, 
  Check, 
  MapPin, 
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { 
    items, 
    orderBumpAdded, 
    orderBumpTotal, 
    otos,
    otoTotal,
    promoCode,
    getOrderBump 
  } = useCart();
  
  const [isConfirming, setIsConfirming] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const orderBump = getOrderBump();

  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    const variant = item.product.variants.find(v => v.id === item.variantId);
    return sum + (variant?.price || item.product.price) * item.quantity;
  }, 0);

  // Calculate discount
  const getDiscountPercentage = () => {
    const upperCode = promoCode.toUpperCase();
    const personalityCoupons = ["ARCHITECT20", "OPERATOR20", "MINIMALIST20", "CREATIVE20", "RITUALIST20"];
    if (personalityCoupons.includes(upperCode)) return 0.2;
    if (upperCode === "WELCOME10") return 0.1;
    return 0;
  };

  const discountPercentage = getDiscountPercentage();
  const discount = promoCode ? Math.round(subtotal * discountPercentage) : 0;
  const discountedSubtotal = subtotal - discount;
  const finalTotal = discountedSubtotal + orderBumpTotal + otoTotal;

  const handleConfirmOrder = () => {
    setIsConfirming(true);
    // Simulate processing
    setTimeout(() => {
      navigate("/thank-you");
    }, 1500);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <Layout hideAnnouncementBar>
        <div className="container-narrow py-20 text-center">
          <h1 className="font-serif text-3xl font-semibold mb-4">No Order to Confirm</h1>
          <p className="text-muted-foreground mb-8">Your cart is empty.</p>
          <Button asChild variant="cta">
            <Link to="/quiz">Find Your Mug</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideAnnouncementBar>
      <SEO {...pageSEO.orderConfirmation} />
      <div className="container-narrow py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <Package className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Review Your Order
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Take a moment to confirm everything looks right before we prepare your order.
          </p>
        </div>

        {/* Order Card */}
        <div className="max-w-xl mx-auto">
          <div 
            className="bg-card rounded-2xl shadow-soft overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_0.1s_forwards]"
          >
            {/* Order Items Header */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-6 border-b border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-semibold">Order Items</span>
                <span className="text-sm text-muted-foreground">
                  ({items.length + (orderBumpAdded ? 1 : 0) + otos.length} items)
                </span>
              </div>
              {showDetails ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {/* Collapsible Items */}
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300",
                showDetails ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-6 space-y-4 bg-secondary/30">
                {/* Cart Items */}
                {items.map((item, index) => {
                  const variant = item.product.variants.find(v => v.id === item.variantId);
                  const itemPrice = (variant?.price || item.product.price) * item.quantity;
                  const discountedPrice = promoCode ? Math.round(itemPrice * (1 - discountPercentage)) : itemPrice;
                  
                  return (
                    <div 
                      key={`${item.product.id}-${item.variantId}`}
                      className="flex items-center gap-4 opacity-0 animate-[fade-in_0.4s_ease-out_forwards]"
                      style={{ animationDelay: `${200 + index * 50}ms` }}
                    >
                      <div className="w-14 h-14 bg-secondary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{variant?.name} × {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        {promoCode && discountPercentage > 0 && (
                          <span className="text-sm text-muted-foreground line-through block">₹{itemPrice}</span>
                        )}
                        <span className="font-semibold">₹{discountedPrice}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Order Bump */}
                {orderBumpAdded && (
                  <div 
                    className="flex items-center gap-4 opacity-0 animate-[fade-in_0.4s_ease-out_forwards]"
                    style={{ animationDelay: `${200 + items.length * 50}ms` }}
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Check className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{orderBump.name}</h3>
                      <p className="text-sm text-accent">Bonus item</p>
                    </div>
                    <span className="font-semibold">₹{orderBumpTotal}</span>
                  </div>
                )}

                {/* OTOs */}
                {otos.map((oto, index) => (
                  <div 
                    key={oto.id}
                    className="flex items-center gap-4 opacity-0 animate-[fade-in_0.4s_ease-out_forwards]"
                    style={{ animationDelay: `${200 + (items.length + (orderBumpAdded ? 1 : 0) + index) * 50}ms` }}
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Check className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">
                        {oto.id === "desk-pad" ? "Desk Pad" : "Mouse Pad"}
                      </h3>
                      <p className="text-sm text-accent">Special offer</p>
                    </div>
                    <span className="font-semibold">₹{oto.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="p-6 space-y-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              
              {promoCode && discount > 0 && (
                <div className="flex justify-between text-sm text-accent">
                  <span>Discount ({Math.round(discountPercentage * 100)}%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              {orderBumpAdded && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{orderBump.name}</span>
                  <span>₹{orderBumpTotal}</span>
                </div>
              )}
              
              {otoTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Add-ons</span>
                  <span>₹{otoTotal}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-accent font-medium">Free</span>
              </div>
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-semibold">Total</span>
                  <span className="font-serif text-2xl font-bold text-foreground">₹{finalTotal}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Cash on Delivery</p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div 
            className="grid grid-cols-3 gap-4 mt-6 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]"
          >
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <Truck className="h-5 w-5 mx-auto text-accent mb-2" />
              <span className="text-xs text-muted-foreground">Free Shipping</span>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <Shield className="h-5 w-5 mx-auto text-accent mb-2" />
              <span className="text-xs text-muted-foreground">30-Day Guarantee</span>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <CreditCard className="h-5 w-5 mx-auto text-accent mb-2" />
              <span className="text-xs text-muted-foreground">Pay on Delivery</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div 
            className="mt-6 p-4 bg-secondary/50 rounded-xl flex items-start gap-3 opacity-0 animate-[fade-in_0.5s_ease-out_0.4s_forwards]"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Estimated Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Your order will arrive in 5-7 business days. We'll send tracking details to your email.
              </p>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
            <Button
              onClick={handleConfirmOrder}
              variant="cta"
              size="xl"
              className="w-full group relative overflow-hidden"
              disabled={isConfirming}
            >
              {isConfirming ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  <span>Confirming your order...</span>
                </div>
              ) : (
                <>
                  <span>Confirm Order — ₹{finalTotal}</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              By confirming, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}