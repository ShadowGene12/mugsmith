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
    <header className={`${isStatic ? 'relative' : 'sticky'} z-40 bg-background/95 backdrop-blur-md border-b border-border/40 transition-all duration-500 ${!isStatic && hasAnnouncementBar ? 'top-[42px] md:top-[44px]' : 'top-0'}`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground">
              Mugsmith
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs tracking-[0.15em] uppercase transition-colors relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left ${
                  isActive(link.href)
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Quiz CTA */}
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex text-[10px] h-9">
              <Link to="/quiz">Assessment</Link>
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
