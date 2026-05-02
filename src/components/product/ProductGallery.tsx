import { useState } from "react";

interface ProductGalleryProps {
  name: string;
  badge?: string;
  images: string[];
}

export function ProductGallery({ name, badge, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnails = images.length > 1 ? images : [images[0], images[0], images[0]];

  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-xl bg-secondary overflow-hidden relative">
        {badge && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-serif text-3xl text-muted-foreground/50">{name}</p>
        </div>
      </div>
      <div className="flex gap-3">
        {thumbnails.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`aspect-square w-20 rounded-lg bg-secondary transition-all ${
              activeIndex === i ? "ring-2 ring-accent" : "hover:ring-2 ring-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
