import { useState, useEffect, useCallback } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { coupon, isCouponValid, items, quizResult } = useCart();

  const hasCoupon = coupon && isCouponValid();
  const hasItemsInCart = items.length > 0;
  const hasCompletedQuiz = !!quizResult;

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 10 && !hasShown) {
      const excludedPaths = ['/checkout', '/thank-you', '/oto', '/curated-add-on', '/order-confirmation'];
      const isExcluded = excludedPaths.some(path => window.location.pathname.startsWith(path));
      
      if (!isExcluded) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    }
  }, [hasShown]);

  useEffect(() => {
    if (sessionStorage.getItem('exitPopupShown')) {
      setHasShown(true);
      return;
    }

    // Delay listener by 30s to avoid premature triggers
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 30000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => setIsVisible(false);

  // Do not show popup if they have completed the quiz to avoid funnel fatigue
  if (!isVisible || hasCompletedQuiz) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/50" onClick={handleClose} />
      
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
            {hasCoupon ? <Sparkles className="h-6 w-6 text-accent" /> : <Gift className="h-6 w-6 text-accent" />}
          </div>

          {hasCoupon ? (
            <>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                Your 20% off is still active
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Use code <strong className="text-foreground">{coupon.code}</strong> before it expires.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                Find your workspace mug
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Take our 2-minute quiz and discover the collection designed for the way you work.
              </p>
            </>
          )}

          <div className="space-y-2">
            {hasItemsInCart ? (
              <Button asChild variant="cta" size="lg" className="w-full">
                <Link to="/checkout" onClick={handleClose}>
                  Complete Order
                </Link>
              </Button>
            ) : (
              <Button asChild variant="cta" size="lg" className="w-full">
                <Link to="/quiz" onClick={handleClose}>
                  Take the Quiz
                </Link>
              </Button>
            )}
            <button
              onClick={handleClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors block w-full py-1"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
