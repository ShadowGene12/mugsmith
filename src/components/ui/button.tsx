import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm tracking-widest uppercase font-medium ring-offset-background transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/95 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary/20 bg-transparent hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/5 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // Mugsmith custom variants
        gold: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold hover:shadow-lg hover:-translate-y-0.5",
        "gold-outline": "border border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-gold",
        hero: "bg-primary text-primary-foreground hover:bg-primary/95 hover:-translate-y-0.5 text-xs sm:text-sm hover:shadow-medium",
        "hero-secondary": "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        minimal: "text-foreground hover:text-accent underline-offset-8 hover:underline decoration-1",
        cta: "bg-accent text-accent-foreground hover:bg-accent/95 hover:-translate-y-0.5 text-sm shadow-gold hover:shadow-lg animate-pulse-gold",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
        "oto-accept": "bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold text-base tracking-widest py-4",
        "oto-decline": "text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-1",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-sm px-4",
        lg: "h-12 rounded-sm px-10",
        xl: "h-14 rounded-sm px-12 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
