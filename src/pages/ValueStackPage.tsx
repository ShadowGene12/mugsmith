import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Check, Gift, Sparkles, Shield, Truck, Star, ArrowRight } from "lucide-react";
import { SEO } from "@/hooks/useSEO";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  value: number;
  icon: React.ReactNode;
  included: boolean;
}

// Placeholder data - user will customize this
const defaultValueItems: ValueItem[] = [
  {
    id: "mug",
    title: "Premium Ceramic Mug",
    description: "Handcrafted with love, designed for your daily ritual",
    value: 599,
    icon: <Sparkles className="h-6 w-6" />,
    included: true,
  },
  {
    id: "stickers",
    title: "Exclusive Sticker Pack",
    description: "4 premium die-cut stickers matching your mug's personality",
    value: 149,
    icon: <Gift className="h-6 w-6" />,
    included: true,
  },
  {
    id: "coaster",
    title: "Cork Coaster",
    description: "Eco-friendly coaster to protect your surfaces",
    value: 99,
    icon: <Shield className="h-6 w-6" />,
    included: true,
  },
  {
    id: "care-kit",
    title: "Mug Care Kit",
    description: "Cleaning brush + care guide to keep your mug pristine",
    value: 79,
    icon: <Star className="h-6 w-6" />,
    included: true,
  },
  {
    id: "shipping",
    title: "Free Express Shipping",
    description: "Get it delivered within 3-5 business days",
    value: 99,
    icon: <Truck className="h-6 w-6" />,
    included: true,
  },
];

export default function ValueStackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  
  const [isAnimating, setIsAnimating] = useState(false);

  // Get product info from cart or location state
  const productName = location.state?.productName || items[0]?.product?.name || "Your Premium Mug";
  const productPrice = 599;

  const totalValue = defaultValueItems.reduce((sum, item) => sum + item.value, 0);
  const savings = totalValue - productPrice;

  const handleContinue = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 300);
  };

  return (
    <Layout>
      <SEO
        title="Your Complete Bundle"
        description="See everything included in your premium mug bundle"
        url="/value-stack"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="container-narrow py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Limited Time Bundle
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
              Look What You're Getting
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your {productName} comes with exclusive bonuses worth over ₹{totalValue - productPrice}
            </p>
          </div>

          {/* Value Stack */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-card rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden">
              {/* Items */}
              <div className="divide-y divide-border">
                {defaultValueItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 flex items-start gap-4 animate-fade-up opacity-0`}
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-foreground flex items-center gap-2">
                            {item.title}
                            <Check className="h-4 w-4 text-accent" />
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-muted-foreground line-through text-sm">
                            ₹{item.value}
                          </span>
                          <span className="block text-accent font-semibold">
                            FREE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="bg-secondary/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="text-xl font-semibold text-muted-foreground line-through">
                    ₹{totalValue}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">You Pay Only</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-accent">₹{productPrice}</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full">
                    You Save ₹{savings}!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-md mx-auto text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button
              onClick={handleContinue}
              variant="cta"
              size="xl"
              className={`w-full group ${isAnimating ? 'scale-95 opacity-75' : ''} transition-all`}
            >
              Claim Your Bundle — ₹{productPrice}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Cash on Delivery available • Free shipping
            </p>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-accent" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              Rated 4.9/5 by 50+ happy customers
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
