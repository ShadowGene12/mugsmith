import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Check, Package, Mail, Users } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

// Store order data before cart is cleared
interface OrderData {
  items: Array<{
    name: string;
    variant: string;
    quantity: number;
    originalPrice: number;
    discountedPrice: number;
  }>;
  orderBumpAdded: boolean;
  orderBumpTotal: number;
  otos: Array<{ id: string; price: number }>;
  otoTotal: number;
  finalTotal: number;
  email: string;
  discountApplied: boolean;
}

export default function ThankYouPage() {
  const { items, orderBumpAdded, otos, email, clearCart, setCoupon, promoCode, orderBumpTotal, otoTotal } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const hasStoredOrder = useRef(false);

  // Calculate discount based on promo code
  const discountInfo = useMemo(() => {
    const upperCode = promoCode.toUpperCase();
    const personalityCoupons = ["ARCHITECT20", "OPERATOR20", "MINIMALIST20", "CREATIVE20", "RITUALIST20"];
    if (personalityCoupons.includes(upperCode)) return { percentage: 0.2, applied: true };
    if (upperCode === "WELCOME10") return { percentage: 0.1, applied: true };
    return { percentage: 0, applied: false };
  }, [promoCode]);

  // Calculate subtotal from items
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const variant = item.product.variants.find(v => v.id === item.variantId);
      return sum + (variant?.price || item.product.price) * item.quantity;
    }, 0);
  }, [items]);

  // Calculate discounted mug price
  const discountedSubtotal = discountInfo.applied 
    ? Math.round(subtotal * (1 - discountInfo.percentage)) 
    : subtotal;

  const finalTotal = discountedSubtotal + orderBumpTotal + otoTotal;

  // Store order data and clear cart on mount
  useEffect(() => {
    // Only store if we have items and haven't stored yet
    if (items.length > 0 && !hasStoredOrder.current) {
      hasStoredOrder.current = true;
      
      const storedOrder: OrderData = {
        items: items.map(item => {
          const variant = item.product.variants.find(v => v.id === item.variantId);
          const originalPrice = (variant?.price || item.product.price) * item.quantity;
          const discountedPrice = discountInfo.applied 
            ? Math.round(originalPrice * (1 - discountInfo.percentage))
            : originalPrice;
          return {
            name: item.product.name,
            variant: variant?.name || '',
            quantity: item.quantity,
            originalPrice,
            discountedPrice,
          };
        }),
        orderBumpAdded,
        orderBumpTotal,
        otos: otos.map(o => ({ id: o.id, price: o.price })),
        otoTotal,
        finalTotal,
        email,
        discountApplied: discountInfo.applied,
      };
      setOrderData(storedOrder);
      
      // Clear coupon and cart
      setCoupon(null);
      clearCart();
      
      // Clear quiz completion to allow new quiz with fresh coupon after purchase
      localStorage.removeItem('quiz_completed');
      localStorage.removeItem('quiz_result');
      localStorage.removeItem('quiz_coupon_expires');
    }
  }, [items, orderBumpAdded, otos, email, orderBumpTotal, otoTotal, finalTotal, discountInfo, setCoupon, clearCart]);

  // Generate a random order number
  const orderNumber = useMemo(() => `MUG${Date.now().toString().slice(-8)}`, []);

  // Use stored order data for display
  const displayData = orderData;

  // If no order data yet, show loading or empty state
  if (!displayData) {
    return (
      <Layout hideAnnouncementBar>
        <SEO {...pageSEO.thankYou} />
        <div className="container-narrow py-16 md:py-24">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-8">
              <Check className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your order has been placed successfully.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideAnnouncementBar>
      <SEO {...pageSEO.thankYou} />
      <div className="container-narrow py-16 md:py-24">
        <div className="text-center animate-fade-up">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-8">
            <Check className="h-10 w-10 text-accent" />
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Thank You for Your Order!
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Your order has been placed successfully. We'll send you tracking details once your mug is on its way.
          </p>

          {/* Order Number */}
          <div className="inline-block bg-secondary rounded-lg px-6 py-4 mb-8">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="font-mono text-xl font-semibold text-foreground">{orderNumber}</p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-card rounded-xl shadow-soft p-8 mb-8 text-left max-w-md mx-auto">
            <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {displayData.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.name} ({item.variant}) × {item.quantity}
                  </span>
                  <div className="text-right">
                    {displayData.discountApplied && (
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        ₹{item.originalPrice}
                      </span>
                    )}
                    <span className="font-medium">₹{item.discountedPrice}</span>
                  </div>
                </div>
              ))}
              
              {displayData.orderBumpAdded && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coffee Care Kit</span>
                  <span className="font-medium">₹{displayData.orderBumpTotal}</span>
                </div>
              )}

              {displayData.otos.map((oto) => (
                <div key={oto.id} className="flex justify-between">
                  <span className="text-muted-foreground">{oto.id === "desk-pad" ? "Desk Pad" : "Mouse Pad"}</span>
                  <span className="font-medium">₹{oto.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total (COD)</span>
                <span>₹{displayData.finalTotal}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-secondary rounded-xl p-6 text-left">
              <Mail className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation to {displayData.email || "your email"}. Tracking details coming soon!
              </p>
            </div>
            <div className="bg-secondary rounded-xl p-6 text-left">
              <Package className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Your order will arrive in 5-7 business days. Pay on delivery.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button asChild variant="cta" size="lg" className="group">
              <Link to="/community">
                <Users className="h-5 w-5 mr-2" />
                Join the Mugsmith Circle
              </Link>
            </Button>
            <div>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 text-sm"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}