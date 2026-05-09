import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { CouponTimer } from "@/components/shared/CouponTimer";
import { SocialProof } from "@/components/shared/SocialProof";
import { toast } from "sonner";
import { Trash2, Shield, Truck, Gift, Tag, Lock, Star } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    orderBumpAdded,
    subtotal,
    orderBumpTotal,
    total,
    removeItem,
    updateQuantity,
    toggleOrderBump,
    email,
    setEmail,
    promoCode,
    setPromoCode,
    paymentMethod,
    setPaymentMethod,
    getOrderBump,
    coupon,
    isCouponValid,
    quizResult,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: email,
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Track begin_checkout and auto-apply coupon
  useEffect(() => {
    if (items.length > 0) {
      trackEvent({ event: "begin_checkout", itemCount: items.length, total });
    }
  }, []);

  useEffect(() => {
    if (coupon && isCouponValid() && !promoApplied) {
      setPromoInput(coupon.code);
      setPromoCode(coupon.code);
      setPromoApplied(true);
      toast.success(`${coupon.code} applied! ${coupon.discount}% off your order.`);
    }
  }, [coupon, isCouponValid, promoApplied, setPromoCode]);

  const orderBump = getOrderBump();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setEmail(value);
    }
  };

  const handleApplyPromo = () => {
    const upperCode = promoInput.toUpperCase();
    // Check personality coupons (20% off)
    const personalityCoupons = ["ARCHITECT20", "OPERATOR20", "MINIMALIST20", "CREATIVE20", "RITUALIST20"];
    if (personalityCoupons.includes(upperCode)) {
      setPromoCode(promoInput);
      setPromoApplied(true);
      toast.success("Personality coupon applied! 20% off your order.");
    } else if (upperCode === "WELCOME10") {
      setPromoCode(promoInput);
      setPromoApplied(true);
      toast.success("Promo code applied! 10% off your order.");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Calculate discount based on coupon type - applies to subtotal only (mug prices)
  const getDiscountPercentage = () => {
    const upperCode = promoCode.toUpperCase();
    const personalityCoupons = ["ARCHITECT20", "OPERATOR20", "MINIMALIST20", "CREATIVE20", "RITUALIST20"];
    if (personalityCoupons.includes(upperCode)) return 0.2;
    if (upperCode === "WELCOME10") return 0.1;
    return 0;
  };

  const discountPercentage = getDiscountPercentage();
  const discount = promoApplied ? Math.round(subtotal * discountPercentage) : 0;
  // Final total = discounted subtotal + order bump (no discount on order bump or OTOs)
  const finalTotal = (subtotal - discount) + orderBumpTotal;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (paymentMethod === "online") {
      // TODO: Phase 2 - Razorpay Integration
      // 1. Call Supabase Edge Function to create Razorpay Order (pass items, secure prices)
      // 2. Initialize Razorpay Checkout with returned Order ID
      // 3. On success, verify signature via Edge Function
      toast.info("Online payments are being set up. Proceeding with COD for now.");
    }

    // Navigate to first OTO
    navigate("/curated-add-on/complete-workspace");
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-20">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Discover your workspace identity and find the perfect mug that matches your style.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link to="/quiz">Take the Quiz — It's Free</Link>
            </Button>
          </div>

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold text-center mb-8">
              Popular with Our Customers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {["The Architect", "The Minimalist", "The Creative"].map((collection, i) => (
                <Link 
                  key={i}
                  to={`/collections/${collection.toLowerCase().replace(" ", "-")}`}
                  className="group p-6 bg-card rounded-xl shadow-soft hover:shadow-lift transition-all"
                >
                  <div className="aspect-square bg-secondary rounded-lg mb-4" />
                  <h3 className="font-serif text-lg font-semibold group-hover:text-accent transition-colors">
                    {collection}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Explore collection →</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <SocialProof variant="inline" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO {...pageSEO.checkout} />
      <div className="container-wide py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-4">
          Secure Checkout {quizResult && <span className="block text-xl text-muted-foreground mt-2 font-normal italic">for {quizResult.identity}</span>}
        </h1>
        
        {/* Coupon Timer */}
        <div className="flex justify-center mb-8">
          <CouponTimer />
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact Information */}
              <div className="bg-card p-6 rounded-xl shadow-soft">
                <h2 className="font-serif text-xl font-semibold mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card p-6 rounded-xl shadow-soft">
                <h2 className="font-serif text-xl font-semibold mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card p-6 rounded-xl shadow-soft">
                <h2 className="font-serif text-xl font-semibold mb-6">Payment Method</h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as 'cod' | 'online')}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Pay when your order arrives
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex-1 cursor-pointer">
                      <div className="font-medium">Online Payment</div>
                      <div className="text-sm text-muted-foreground">
                        Credit Cards, UPI, Netbanking (Razorpay)
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <Shield className="h-4 w-4 inline mr-2 text-accent" />
                    <strong>Cash on Delivery</strong> — Pay when your order arrives at your doorstep. We trust you.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 rounded-xl shadow-soft sticky top-24">
                <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => {
                    const variant = item.product.variants.find(
                      (v) => v.id === item.variantId
                    );
                    return (
                      <div
                        key={`${item.product.id}-${item.variantId}`}
                        className="flex gap-4"
                      >
                        <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {variant?.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              ₹{(variant?.price || item.product.price) * item.quantity}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.variantId)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Order Bump */}
                <div className="border-2 border-dashed border-accent rounded-lg p-4 mb-6 bg-accent/5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="orderBump"
                      checked={orderBumpAdded}
                      onCheckedChange={toggleOrderBump}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="orderBump"
                        className="cursor-pointer block"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Gift className="h-4 w-4 text-accent" />
                          <span className="font-medium text-foreground">
                            Add {orderBump.name}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {orderBump.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-accent">
                            ₹{orderBump.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{orderBump.comparePrice}
                          </span>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Promo code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        disabled={promoApplied}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoInput}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-accent mt-2 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {promoCode.toUpperCase()} applied
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {orderBumpAdded && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {orderBump.name}
                      </span>
                      <span>₹{orderBumpTotal}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-accent">
                      <span>Discount ({Math.round(discountPercentage * 100)}%)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Place Order */}
                <Button type="submit" variant="cta" size="xl" className="w-full">
                  Place Order — ₹{finalTotal}
                </Button>

                {/* Trust Signals */}
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Lock className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex flex-col items-center gap-1 text-center bg-card p-2 rounded-md border border-border">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>Guaranteed Safe Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center bg-card p-2 rounded-md border border-border">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <span>Dishwasher & Microwave Safe</span>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">Trusted by 50+ customers</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
