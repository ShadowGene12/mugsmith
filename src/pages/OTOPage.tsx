import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getOTOBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Check, Clock, Shield } from "lucide-react";
import { SEO } from "@/hooks/useSEO";

export default function OTOPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const oto = getOTOBySlug(slug || "");
  const { addOTO, subtotal, orderBumpTotal, otoTotal, promoCode } = useCart();

  // Calculate discount for proper total display
  const discountInfo = useMemo(() => {
    const upperCode = promoCode.toUpperCase();
    const personalityCoupons = ["ARCHITECT20", "OPERATOR20", "MINIMALIST20", "CREATIVE20", "RITUALIST20"];
    if (personalityCoupons.includes(upperCode)) return { percentage: 0.2, applied: true };
    if (upperCode === "WELCOME10") return { percentage: 0.1, applied: true };
    return { percentage: 0, applied: false };
  }, [promoCode]);

  const discount = discountInfo.applied ? Math.round(subtotal * discountInfo.percentage) : 0;
  const currentTotal = subtotal + orderBumpTotal + otoTotal - discount;


  useEffect(() => {
    if (!oto) {
      navigate("/order-confirmation");
    }
  }, [oto, navigate]);

  if (!oto) {
    return null;
  }

  const handleAccept = () => {
    addOTO(oto);
    toast.success(`${oto.id === "desk-pad" ? "Desk Pad" : "Mouse Pad"} added to your order!`);
    
    // After accepting any OTO, go to order confirmation
    navigate("/order-confirmation");
  };

  const handleDecline = () => {
    // If declining desk pad (first OTO), show mousepad offer
    // If declining mousepad (second OTO), go to order confirmation
    if (oto.id === "desk-pad") {
      navigate("/curated-add-on/mousepad");
    } else {
      navigate("/order-confirmation");
    }
  };

  const savings = oto.comparePrice - oto.price;
  const newTotal = currentTotal + oto.price;

  return (
    <Layout hideFooter hideAnnouncementBar staticHeader>
      <SEO
        title={`Special Offer: ${oto.headline}`}
        description={oto.description}
        noindex={true}
        url={`/curated-add-on/${oto.slug}`}
      />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Urgency Banner */}
          <div className="bg-accent text-accent-foreground text-center py-3 px-4 rounded-t-xl flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{oto.subheadline}</span>
          </div>

          <div className="bg-card rounded-b-xl shadow-lift p-8 md:p-12 animate-fade-up">
            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-4">
              {oto.headline}
            </h1>

            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              {oto.description}
            </p>

            {/* Product Image Placeholder */}
            <div className="aspect-video bg-secondary rounded-xl mb-8 flex items-center justify-center">
              <span className="font-serif text-2xl text-muted-foreground/50">
                {oto.id === "desk-pad" ? "Desk Pad" : "Mouse Pad"}
              </span>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {oto.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-secondary rounded-xl p-6 mb-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-3xl font-bold text-foreground">₹{oto.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{oto.comparePrice}</span>
              </div>
              <p className="text-accent font-medium">You save ₹{savings}!</p>
              <p className="text-sm text-muted-foreground mt-2">
                New order total: ₹{newTotal}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAccept}
                variant="cta"
                size="xl"
                className="w-full"
              >
                {oto.buttonText}
              </Button>

              <button
                onClick={handleDecline}
                className="w-full text-center text-muted-foreground hover:text-foreground underline underline-offset-4 text-sm transition-colors"
              >
                {oto.declineText}
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Same COD payment — pay everything on delivery</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
