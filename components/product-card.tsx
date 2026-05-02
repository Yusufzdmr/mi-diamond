import Link from "next/link";
import Image from "next/image";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/supabase/types";
import { WishlistButton } from "./cart/wishlist-button";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.old_price);
  const cover = product.images[0];
  const soldOut = product.stock_status === "sold_out";

  return (
    <div className="group relative">
      <Link href={`/urunler/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-50">
          {cover ? (
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-200">
              <span className="font-serif text-3xl">Mi</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount && (
              <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-medium text-ink-700">
                %{discount} İndirim
              </span>
            )}
            {product.is_featured && !discount && (
              <span className="rounded-full bg-ink-700 px-3 py-1 text-xs font-medium text-cream">
                Öne Çıkan
              </span>
            )}
            {soldOut && (
              <span className="rounded-full bg-ink-700/80 px-3 py-1 text-xs font-medium text-cream">
                Tükendi
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-lg text-ink-700 group-hover:text-gold-500 transition">
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-medium text-ink-700">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.old_price && (
              <span className="text-sm text-ink-300 line-through">
                {formatPrice(product.old_price, product.currency)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
        <WishlistButton product={product} />
      </div>
    </div>
  );
}
