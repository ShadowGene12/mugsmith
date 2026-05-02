import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/shared/CartDrawer";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  isStatic?: boolean;
}

export function Header({ isStatic = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { coupon, isCouponValid } = useCart();

  const hasAnnouncementBar = coupon && isCouponValid();

  const navLinks = [
    { href: "/collections/the-architect", label: "Shop" },
    { href: "/workspace-identities", label: "Workspace Identities" },
    { href: "/gifting", label: "Gifting" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    if (path === "/collections/the-architect") {
      return location.pathname.startsWith("/collections") || location.pathname.startsWith("/product");
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <header className={`${isStatic ? 'relative' : 'sticky'} z-40 bg-white/40 backdrop-blur-[40px] border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 ${!isStatic && hasAnnouncementBar ? 'top-[42px] md:top-[44px]' : 'top-0'}`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Mugsmith
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors gold-underline ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quiz CTA */}
            <Button asChild variant="cta" size="sm" className="hidden md:inline-flex">
              <Link to="/quiz">Take the Quiz</Link>
            </Button>

            <CartDrawer />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-2 ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quiz"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-2 text-accent"
              >
                Take the Quiz →
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
