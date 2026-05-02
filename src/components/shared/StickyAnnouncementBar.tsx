import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Clock, Sparkles, X } from "lucide-react";

export function StickyAnnouncementBar() {
  const { coupon, isCouponValid, getCouponTimeRemaining, quizResult } = useCart();
  const [timeRemaining, setTimeRemaining] = useState(getCouponTimeRemaining());
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!coupon) return;

    const interval = setInterval(() => {
      const remaining = getCouponTimeRemaining();
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [coupon, getCouponTimeRemaining]);

  if (!coupon || !isCouponValid() || isDismissed) {
    return null;
  }

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  const totalSeconds = minutes * 60 + seconds;
  const maxSeconds = 60 * 60; // 60 minutes
  const progressPercent = (totalSeconds / maxSeconds) * 100;

  const formatTime = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get personality-based messaging
  const personalityName = quizResult ? quizResult.charAt(0).toUpperCase() + quizResult.slice(1) : "Your";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground">
      {/* Progress bar at bottom of announcement */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-foreground/20">
        <div 
          className="h-full bg-accent-foreground/60 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="container-wide py-2 md:py-2.5">
        <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
          <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
          
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center">
            <span className="font-medium hidden sm:inline">
              {personalityName} personality unlocked!
            </span>
            <span className="font-bold">
              {coupon.discount}% OFF
            </span>
            <span className="hidden md:inline">with code</span>
            <code className="bg-accent-foreground/15 px-1.5 py-0.5 rounded font-mono font-bold text-xs md:text-sm">
              {coupon.code}
            </code>
          </div>

          <div className="flex items-center gap-1 bg-accent-foreground/15 rounded-full px-2 py-0.5 md:px-3 md:py-1 flex-shrink-0">
            <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="font-mono font-bold text-xs md:text-sm">{formatTime()}</span>
          </div>

          <Link 
            to={quizResult ? `/collections/${quizResult}` : "/workspace-identities"}
            className="hidden sm:inline-block underline underline-offset-2 hover:no-underline font-medium"
          >
            Shop Now
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-accent-foreground/10 rounded-full transition-colors flex-shrink-0 ml-1"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}