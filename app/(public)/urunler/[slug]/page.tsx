import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  discountPercent,
  formatPrice,
  siteConfig,
  stockLabel,
  whatsappUrl,
} from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { WishlistButton } from "@/components/cart/wishlist-button";
import { ProductGallery } from "@/components/product-gallery";
import type { Product, ProductWithCategory } from "@/lib/supabase/types";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, categories(id, slug, name)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle<ProductWithCategory>();

  if (!product) notFound();

  const discount = discountPercent(product.price, product.old_price);
  const message = `Merhaba, ${product.name} (${formatPrice(product.price, product.currency)}) hakkında bilgi almak istiyorum.`;

  const { data: relatedRaw } = product.category_id
    ? await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .eq("category_id", product.category_id)
        .neq("id", product.id)
        .limit(4)
    : { data: [] as Product[] };

  const related = relatedRaw ?? [];

  const specs: { label: string; value: string | null }[] = [
    { label: "Metal", value: product.metal },
    { label: "Taş", value: product.stone },
    { label: "Karat", value: product.carat },
    { label: "Yüzük Ölçüsü", value: product.ring_size },
  ].filter((s) => s.value);

  return (
    <article className="container-prose py-10 md:py-14">
      <Link
        href="/urunler"
        className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700"
      >
        <ArrowLeft className="h-4 w-4" /> Koleksiyona dön
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          images={product.images}
          name={product.name}
          discount={discount}
        />

        {/* Details */}
        <div>
          {product.categories && (
            <Link
              href={`/urunler?kategori=${product.categories.slug}`}
              className="label-eyebrow hover:text-gold-400"
            >
              {product.categories.name}
            </Link>
          )}
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-ink-700">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-serif text-4xl text-ink-700">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.old_price && (
              <span className="text-xl text-ink-300 line-through">
                {formatPrice(product.old_price, product.currency)}
              </span>
            )}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-sm text-ink-500">
            <span
              className={`h-2 w-2 rounded-full ${
                product.stock_status === "available"
                  ? "bg-emerald-500"
                  : product.stock_status === "sold_out"
                    ? "bg-red-500"
                    : "bg-gold-400"
              }`}
            />
            {stockLabel[product.stock_status]}
          </div>

          {product.description && (
            <p className="mt-8 text-ink-500 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}

          {specs.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-700/10 pt-8">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-[0.15em] text-ink-400">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-ink-700">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <WishlistButton product={product} variant="button" />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp ile Sor
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="btn-outline"
            >
              <Phone className="h-4 w-4" /> Hemen Ara
            </a>
          </div>

          <p className="mt-6 text-xs text-ink-400">
            Fiyatlar günlük altın kuruna göre değişiklik gösterebilir. Güncel
            fiyat için iletişime geçiniz.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-2xl text-ink-700 mb-8">
            Benzer Tasarımlar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
