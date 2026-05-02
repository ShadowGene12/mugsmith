import { forwardRef } from "react";
import { Shield, Truck, CreditCard, RefreshCw } from "lucide-react";

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
}

export const TrustBadges = forwardRef<HTMLDivElement, TrustBadgesProps>(
  ({ variant = 'horizontal' }, ref) => {
    const badges = [
      { icon: Shield, label: "Microwave Safe" },
      { icon: RefreshCw, label: "Dishwasher Safe" },
      { icon: Truck, label: "Free Shipping 499+" },
      { icon: CreditCard, label: "COD Available" },
    ];

    if (variant === 'grid') {
      return (
        <div ref={ref} className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 p-4 bg-secondary rounded-lg"
            >
              <badge.icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className="flex flex-wrap items-center justify-center gap-6">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <badge.icon className="h-4 w-4 text-accent" />
            <span className="text-sm">{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }
);

TrustBadges.displayName = "TrustBadges";
