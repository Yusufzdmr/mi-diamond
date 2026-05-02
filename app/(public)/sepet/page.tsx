"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, update, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-prose py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-ink-200" strokeWidth={1.2} />
        <h1 className="mt-6 font-serif text-3xl text-ink-700">Sepetiniz boş</h1>
        <p className="mt-2 text-ink-500">
          Koleksiyonumuzdaki tasarımları keşfedin.
        </p>
        <Link href="/urunler" className="btn-primary mt-8">
          Ürünlere Göz At <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-prose py-12 md:py-16">
      <h1 className="font-serif text-4xl text-ink-700">Sepetim</h1>
      <p className="mt-1 text-sm text-ink-500">
        {items.length} ürün — toplam {items.reduce((a, i) => a + i.quantity, 0)} adet
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-ink-700/10 rounded-2xl bg-white shadow-soft">
          {items.map((item) => (
            <li key={item.product_id} className="flex gap-4 p-4 sm:p-6">
              <Link
                href={`/urunler/${item.slug}`}
                className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-xl bg-ink-50 shrink-0"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-xl text-ink-200">
                    Mi
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/urunler/${item.slug}`}
                  className="font-serif text-lg text-ink-700 hover:text-gold-500 transition"
                >
                  {item.name}
                </Link>
                <div className="mt-1 text-sm text-ink-500">
                  {formatPrice(item.price)}
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-ink-200">
                    <button
                      onClick={() =>
                        update(item.product_id, item.quantity - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center text-ink-500 hover:text-ink-700"
                      aria-label="Azalt"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        update(item.product_id, item.quantity + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center text-ink-500 hover:text-ink-700"
                      aria-label="Arttır"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-ink-700">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => remove(item.product_id)}
                      className="text-ink-400 hover:text-red-500"
                      aria-label="Kaldır"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="sticky top-28 h-fit rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl text-ink-700">Sipariş Özeti</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">Ara Toplam</dt>
              <dd className="text-ink-700">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Kargo</dt>
              <dd className="text-ink-700">Sipariş Sonrası</dd>
            </div>
            <div className="flex justify-between border-t border-ink-700/10 pt-3 text-base font-medium">
              <dt className="text-ink-700">Toplam</dt>
              <dd className="text-ink-700">{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <Link
            href="/siparis"
            className="btn-primary mt-6 w-full"
          >
            Sipariş Talebi Oluştur <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-4 text-xs text-ink-400 leading-relaxed">
            Şu an çevrimiçi ödeme alınmamaktadır. Sipariş talebinizi
            oluşturduktan sonra ekibimiz sizinle iletişime geçer ve ödeme
            seçeneklerini iletir.
          </p>

          <button
            onClick={() => {
              if (confirm("Sepeti temizlemek istediğinize emin misiniz?")) {
                clear();
              }
            }}
            className="mt-4 w-full text-xs text-ink-400 hover:text-red-500"
          >
            Sepeti Temizle
          </button>
        </aside>
      </div>
    </div>
  );
}
