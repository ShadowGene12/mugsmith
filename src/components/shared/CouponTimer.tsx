import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Clock, Tag } from "lucide-react";

interface CouponTimerProps {
  variant?: "inline" | "banner";
}

export function CouponTimer({ variant = "inline" }: CouponTimerProps) {
  const { coupon, isCouponValid, getCouponTimeRemaining } = useCart();
  const [timeRemaining, setTimeRemaining] = useState(getCouponTimeRemaining());

  useEffect(() => {
    if (!coupon || !isCouponValid()) return;

    const interval = setInterval(() => {
      const remaining = getCouponTimeRemaining();
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [coupon, getCouponTimeRemaining, isCouponValid]);

  if (!coupon || !isCouponValid() || timeRemaining <= 0) {
    return null;
  }

  const totalDuration = 15 * 60 * 1000; // 15 mins default
  const progress = Math.max(0, Math.min(100, (timeRemaining / totalDuration) * 100));

  if (variant === "banner") {
    return (
      <div className="bg-background border-b border-border py-2 px-4 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gold/10 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <Tag className="h-4 w-4 text-gold" />
            <span className="font-medium text-sm">
              Your <span className="text-gold">{coupon.discount}%</span> advantage is reserved.
            </span>
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Offer expires soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border text-foreground rounded-full text-xs tracking-wide">
      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      <span>Code <span className="font-semibold text-gold">{coupon.code}</span> applied</span>
    </div>
  );
}