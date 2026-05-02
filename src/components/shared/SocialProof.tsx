import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
}

interface SocialProofProps {
  variant?: "compact" | "full" | "inline";
}

const reviews: Review[] = [
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    text: "I took the quiz on a whim and ended up with The Minimalist. The ceramic quality is gorgeous — thick, smooth, perfectly weighted. It's the only mug I reach for now.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Arjun M.",
    location: "Bangalore",
    rating: 5,
    text: "Bought The Architect as a gift for my manager. The packaging alone made it feel premium. He uses it on every Zoom call now. Already ordering one for myself.",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Sneha R.",
    location: "Delhi",
    rating: 5,
    text: "My desk finally feels complete. The design is subtle but people always notice it. Three colleagues have asked me where I got it. Worth every rupee.",
    date: "3 days ago",
    verified: true,
  },
  {
    name: "Vikram K.",
    location: "Pune",
    rating: 5,
    text: "Was sceptical about a 'personality mug' but the quiz nailed it. Got The Operator and it genuinely fits my workflow vibe. The COD option sealed the deal.",
    date: "1 week ago",
    verified: true,
  },
];

export function SocialProof({ variant = "full" }: SocialProofProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-secondary border-2 border-background"
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">4.9/5</span> from 50+ verified buyers
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="p-4 bg-secondary rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-medium">4.9 out of 5</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on 50+ verified customer reviews
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-card p-6 rounded-xl shadow-soft"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-medium text-foreground">
                {review.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{review.name}</span>
                {review.verified && (
                  <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    Verified Buyer
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{review.location}</span>
                {review.date && (
                  <>
                    <span>·</span>
                    <span>{review.date}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-1 -left-1 h-6 w-6 text-accent/20" />
            <p className="text-foreground leading-relaxed pl-5">
              {review.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
