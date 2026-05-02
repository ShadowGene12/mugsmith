import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Clock, Tag } from "lucide-react";

interface CouponBannerProps {
  variant?: "inline" | "floating";
}

export function CouponBanner({ variant = "inline" }: CouponBannerProps) {
  const { coupon, isCouponValid, getCouponTimeRemaining } = useCart();
  const [timeRemaining, setTimeRemaining] = useState(getCouponTimeRemaining());

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

  if (!coupon || !isCouponValid()) {
    return null;
  }

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  const formatTime = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50">
        <div className="bg-accent text-accent-foreground rounded-xl px-4 py-3 shadow-lift flex items-center gap-3">
          <Tag className="h-5 w-5" />
          <div className="flex-1">
            <div className="font-medium">
              Use code <span className="font-bold">{coupon.code}</span> for {coupon.discount}% off
            </div>
          </div>
          <div className="flex items-center gap-2 bg-accent-foreground/10 rounded-lg px-3 py-1">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-bold">{formatTime()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
      <Tag className="h-5 w-5 text-accent" />
      <div className="flex-1 text-center sm:text-left">
        <span className="text-foreground">
          Your exclusive code: <span className="font-bold text-accent">{coupon.code}</span> for {coupon.discount}% off
        </span>
      </div>
      <div className="flex items-center gap-2 bg-accent text-accent-foreground rounded-lg px-3 py-2">
        <Clock className="h-4 w-4" />
        <span className="font-mono font-bold text-sm">{formatTime()}</span>
        <span className="text-xs opacity-80">left</span>
      </div>
    </div>
  );
}
