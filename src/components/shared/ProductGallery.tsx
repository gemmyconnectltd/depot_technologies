"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface GalleryImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export default function ProductGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sorted = [...images].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary)
  );
  const active = sorted[selectedIndex] ?? sorted[0];

  if (sorted.length === 0) {
    return (
      <div
        className={cn(
          "w-full aspect-square rounded-2xl",
          "bg-zinc-100 flex items-center justify-center"
        )}
      >
        <span className="text-zinc-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative w-full aspect-square rounded-2xl overflow-hidden",
          "bg-zinc-100 border border-zinc-200"
        )}
      >
        <Image
          src={active.url}
          alt={active.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {sorted.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {sorted.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View ${image.alt}`}
              className={cn(
                "relative w-20 h-20 shrink-0 rounded-lg overflow-hidden",
                "border-2 motion-safe:transition-all duration-150",
                index === selectedIndex
                  ? "border-electronics ring-1 ring-electronics"
                  : "border-zinc-200 hover:border-zinc-300"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
