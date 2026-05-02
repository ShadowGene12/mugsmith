import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the Mugsmith Circle!");
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 px-4 pb-4 mt-12 w-full">
      <div className="container-wide glass-panel border border-white/50 bg-white/20 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-[0_-20px_50px_rgba(43,74,38,0.03)] text-foreground/80">
        
        {/* Newsletter Section */}
        <div className="border-b border-foreground/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
          <div className="relative py-14 md:py-20 px-6">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="font-serif text-3xl md:text-4xl mb-4 text-foreground tracking-tight">
                Get Early Access to New Drops
              </h3>
              <p className="text-muted-foreground mb-8 text-sm md:text-base font-light">
                New collections, limited editions, and workspace inspiration delivered once a week. No generic spam, ever.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm mx-auto relative group">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-white/60 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 h-12 shadow-inner transition-colors group-hover:border-accent/40"
                />
                <Button type="submit" variant="cta" className="h-12 px-6 shadow-[0_10px_20px_rgba(43,74,38,0.15)]">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container-wide py-16 px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-serif text-3xl mb-4 text-foreground tracking-tight">Mugsmith</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                India's first identity-driven mug brand. Premium ceramic, designed specifically around your workspace archetype.
              </p>
            </div>

            {/* Shop Archetypes */}
            <div>
              <h5 className="font-semibold text-xs uppercase tracking-[0.2em] mb-6 text-foreground/50">
                The Collections
              </h5>
              <ul className="space-y-3">
                {[
                  { name: "The Builder", slug: "the-builder" },
                  { name: "The Minimalist", slug: "the-minimalist" },
                  { name: "The Nightshift", slug: "the-nightshift" },
                  { name: "The Stoic", slug: "the-stoic" },
                  { name: "The Ritualist", slug: "the-ritualist" },
                  { name: "The Romantic", slug: "the-romantic" },
                  { name: "The Maverick", slug: "the-maverick" }
                ].map(item => (
                  <li key={item.slug}>
                    <Link to={`/collections/${item.slug}`} className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h5 className="font-semibold text-xs uppercase tracking-[0.2em] mb-6 text-foreground/50">
                Discover
              </h5>
              <ul className="space-y-3">
                <li>
                  <Link to="/workspace-identities" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    The 7 Archetypes
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Discover Your Identity
                  </Link>
                </li>
                <li>
                  <Link to="/gifting" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Gifting Service
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    The Journal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-semibold text-xs uppercase tracking-[0.2em] mb-6 text-foreground/50">
                Company
              </h5>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h5 className="font-semibold text-xs uppercase tracking-[0.2em] mb-6 text-foreground/50">
                Policies
              </h5>
              <ul className="space-y-3">
                <li>
                  <Link to="/policies/shipping" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Shipping Details
                  </Link>
                </li>
                <li>
                  <Link to="/policies/returns" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/policies/privacy" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Privacy Rules
                  </Link>
                </li>
                <li>
                  <Link to="/policies/terms" className="text-sm text-muted-foreground hover:text-accent hover:pl-2 transition-all duration-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground font-medium tracking-wide">
              © 2025 Mugsmith. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="https://instagram.com/mugsmith" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-accent transition-colors tracking-widest uppercase">
                Instagram
              </a>
              <a href="https://pinterest.com/mugsmith" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-accent transition-colors tracking-widest uppercase">
                Pinterest
              </a>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Built with intention in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
