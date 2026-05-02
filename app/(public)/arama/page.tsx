import Link from "next/link";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Arama" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let products: Product[] = [];
  if (query) {
    try {
      const supabase = await createClient();
      const term = `%${query}%`;
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .or(
          `name.ilike.${term},description.ilike.${term},metal.ilike.${term},stone.ilike.${term}`,
        )
        .order("created_at", { ascending: false })
        .limit(60);
      products = data ?? [];
    } catch {
      // env eksikse boş liste
    }
  }

  return (
    <div className="container-prose py-12 md:py-16">
      <div className="flex items-center gap-3">
        <Search className="h-5 w-5 text-gold-500" />
        <p className="label-eyebrow">Arama</p>
      </div>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl text-ink-700">
        {query ? `"${query}"` : "Ne aramıştınız?"}
      </h1>
      <p className="mt-2 text-ink-500">
        {query
          ? `${products.length} sonuç bulundu`
          : "Aramak istediğiniz ürünü üst menüden yazabilirsiniz."}
      </p>

      {query && products.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
          <p className="text-ink-500">Bu arama için sonuç bulunamadı.</p>
          <Link href="/urunler" className="mt-4 inline-block text-gold-500 hover:underline">
            Tüm ürünlere göz at →
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
