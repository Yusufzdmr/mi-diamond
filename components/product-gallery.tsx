"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  name,
  discount,
}: {
  images: string[];
  name: string;
  discount: number | null;
}) {
  const [active, setActive] = useState(0);
  const cover = images[active];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink-50">
        {cover ? (
          <Image
            src={cover}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-5xl text-ink-200">Mi</span>
          </div>
        )}
        {discount && (
          <span className="absolute top-4 left-4 rounded-full bg-gold-400 px-4 py-1.5 text-sm font-medium text-ink-700">
            %{discount} İndirim
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-ink-50 transition ${
                active === i ? "ring-2 ring-gold-400" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${name} - ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 10vw, 20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
