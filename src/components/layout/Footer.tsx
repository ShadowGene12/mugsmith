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
        <div className="border-b border-border/40 relative overflow-hidden bg-background">
          <div className="absolute top-0 right-0 w-1/2 h-px bg-border/40" />
          <div className="relative py-20 md:py-32 px-6">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-4 h-px bg-accent"></span>
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
                  The Inner Circle
                </span>
                <span className="w-4 h-px bg-accent"></span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-6 text-foreground font-light tracking-wide">
                Join the Journal
              </h3>
              <p className="text-muted-foreground mb-10 text-sm md:text-base font-light tracking-wide leading-relaxed">
                Quiet dispatches on design, intentional workspaces, and early access to new collections. Sent thoughtfully, once a week.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-4 max-w-sm mx-auto relative group">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 h-12 transition-colors"
                />
                <Button type="submit" variant="minimal" className="h-12 px-0 tracking-widest uppercase text-xs">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container-wide py-20 px-6 bg-background">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-10 mb-20">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-serif text-4xl mb-6 text-foreground font-light">Mugsmith</h4>
              <p className="text-sm text-muted-foreground leading-[1.8] font-light tracking-wide">
                Identity-driven ceramics. Designed specifically around your workspace archetype.
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
