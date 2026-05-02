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

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  if (variant === "banner") {
    return (
      <div className="bg-accent text-accent-foreground py-3 px-4">
        <div className="container-wide flex items-center justify-center gap-3">
          <Tag className="h-4 w-4" />
          <span className="font-medium">
            {coupon.code} — {coupon.discount}% OFF
          </span>
          <span className="text-accent-foreground/80">|</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-bold">
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-sm">remaining</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm">
      <Clock className="h-3.5 w-3.5" />
      <span className="font-mono font-semibold">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
      <span className="text-accent/80">left for {coupon.discount}% off</span>
    </div>
  );
}