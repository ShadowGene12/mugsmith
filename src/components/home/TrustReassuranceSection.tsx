import { Link } from "react-router-dom";
import { Shield, Truck, Gift, RefreshCw } from "lucide-react";

export function TrustReassuranceSection() {
  return (
    <section className="py-12 md:py-20 relative z-10 px-4">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-6 md:p-10 glass-panel border-white/50 shadow-[0_10px_40px_rgba(43,74,38,0.04)]">
          {[
            {
              icon: Shield,
              title: "Luxury Ceramic Mugs",
              description: "Microwave-safe, dishwasher-friendly luxury ceramics built to last years of daily use.",
            },
            {
              icon: RefreshCw,
              title: "The Mugsmith Promise",
              description: "Arrives damaged? We ship a free handcrafted replacement immediately — no hassle.",
            },
            {
              icon: Truck,
              title: "Free Indian Shipping",
              description: "Pay via Cash on Delivery. Enjoy free shipping on all premium mug orders above ₹499.",
            },
            {
              icon: Gift,
              title: "Gift-Ready Presentation",
              description: "Secure, beautiful editorial packaging ready to give to the creative in your life.",
              link: "/gifting",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center mx-auto mb-4 shadow-inner border border-accent/20">
                <item.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              </div>
              <h3 className="font-serif text-sm md:text-xl font-semibold text-foreground mb-1 md:mb-3">
                {item.title}
              </h3>
              <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed font-light">
                {item.description}
              </p>
              {item.link && (
                <Link
                  to={item.link}
                  className="inline-block text-[11px] md:text-xs tracking-wider uppercase font-semibold text-accent mt-4 hover:opacity-80 transition-opacity"
                >
                  Explore gifts →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
