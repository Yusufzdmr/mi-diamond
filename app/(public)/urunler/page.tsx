import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import type { Product, Category } from "@/lib/supabase/types";

export const revalidate = 60;

type Props = {
  searchParams: Promise<{
    kategori?: string;
    sirala?: string;
    metal?: string;
    tas?: string;
    min?: string;
    max?: string;
    indirim?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = params.kategori;
  const sort = params.sirala ?? "yeni";
  const metalFilter = params.metal;
  const stoneFilter = params.tas;
  const minPrice = params.min ? parseFloat(params.min) : null;
  const maxPrice = params.max ? parseFloat(params.max) : null;
  const onlyDiscount = params.indirim === "1";

  let products: Product[] = [];
  let categories: Category[] = [];
  let activeCategory: Category | null = null;
  let metals: string[] = [];
  let stones: string[] = [];

  try {
    const supabase = await createClient();

    const { data: cats } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    categories = cats ?? [];
    activeCategory = categories.find((c) => c.slug === categorySlug) ?? null;

    let query = supabase
      .from("products")
      .select("*")
      .eq("is_published", true);

    if (activeCategory) query = query.eq("category_id", activeCategory.id);
    if (metalFilter) query = query.eq("metal", metalFilter);
    if (stoneFilter) query = query.eq("stone", stoneFilter);
    if (minPrice !== null) query = query.gte("price", minPrice);
    if (maxPrice !== null) query = query.lte("price", maxPrice);
    if (onlyDiscount) query = query.not("old_price", "is", null);

    switch (sort) {
      case "ucuz":
        query = query.order("price", { ascending: true });
        break;
      case "pahali":
        query = query.order("price", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data } = await query;
    products = data ?? [];

    // Filtre seçeneklerini bütün ürünlerden derle (filtrelenmemiş)
    const { data: distinctData } = await supabase
      .from("products")
      .select("metal, stone")
      .eq("is_published", true);
    metals = Array.from(
      new Set((distinctData ?? []).map((p) => p.metal).filter(Boolean) as string[]),
    ).sort();
    stones = Array.from(
      new Set((distinctData ?? []).map((p) => p.stone).filter(Boolean) as string[]),
    ).sort();
  } catch {
    // env eksikse boş listeyle render
  }

  function buildHref(overrides: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    const next = { ...params, ...overrides };
    Object.entries(next).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `/urunler?${qs}` : "/urunler";
  }

  return (
    <div className="container-prose py-12 md:py-16">
      <header className="mb-10">
        <p className="label-eyebrow">Koleksiyon</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-ink-700">
          {activeCategory ? activeCategory.name : "Tüm Ürünler"}
        </h1>
        {activeCategory?.description && (
          <p className="mt-3 max-w-2xl text-ink-500">
            {activeCategory.description}
          </p>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <aside className="lg:sticky lg:top-28 lg:h-fit space-y-6">
          <FilterGroup title="Kategori">
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href={buildHref({ kategori: undefined })}
                  className={!activeCategory ? "font-medium text-ink-700" : "text-ink-500 hover:text-ink-700"}
                >
                  Tümü
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildHref({ kategori: c.slug })}
                    className={
                      activeCategory?.id === c.id
                        ? "font-medium text-ink-700"
                        : "text-ink-500 hover:text-ink-700"
                    }
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FilterGroup>

          {metals.length > 0 && (
            <FilterGroup title="Metal">
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    href={buildHref({ metal: undefined })}
                    className={!metalFilter ? "font-medium text-ink-700" : "text-ink-500 hover:text-ink-700"}
                  >
                    Tümü
                  </Link>
                </li>
                {metals.map((m) => (
                  <li key={m}>
                    <Link
                      href={buildHref({ metal: m })}
                      className={
                        metalFilter === m
                          ? "font-medium text-ink-700"
                          : "text-ink-500 hover:text-ink-700"
                      }
                    >
                      {m}
                    </Link>
                  </li>
                ))}
              </ul>
            </FilterGroup>
          )}

          {stones.length > 0 && (
            <FilterGroup title="Taş">
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    href={buildHref({ tas: undefined })}
                    className={!stoneFilter ? "font-medium text-ink-700" : "text-ink-500 hover:text-ink-700"}
                  >
                    Tümü
                  </Link>
                </li>
                {stones.map((s) => (
                  <li key={s}>
                    <Link
                      href={buildHref({ tas: s })}
                      className={
                        stoneFilter === s
                          ? "font-medium text-ink-700"
                          : "text-ink-500 hover:text-ink-700"
                      }
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </FilterGroup>
          )}

          <FilterGroup title="Fiyat Aralığı">
            <form action="/urunler" method="get" className="space-y-2">
              {categorySlug && <input type="hidden" name="kategori" value={categorySlug} />}
              {metalFilter && <input type="hidden" name="metal" value={metalFilter} />}
              {stoneFilter && <input type="hidden" name="tas" value={stoneFilter} />}
              <div className="flex gap-2">
                <input
                  name="min"
                  type="number"
                  defaultValue={params.min}
                  placeholder="Min ₺"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-700 focus:outline-none"
                />
                <input
                  name="max"
                  type="number"
                  defaultValue={params.max}
                  placeholder="Max ₺"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-700 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-ink-700 py-2 text-xs font-medium text-cream hover:bg-ink-600"
              >
                Uygula
              </button>
            </form>
          </FilterGroup>

          <FilterGroup title="Diğer">
            <Link
              href={buildHref({ indirim: onlyDiscount ? undefined : "1" })}
              className={`text-sm ${onlyDiscount ? "font-medium text-gold-500" : "text-ink-500 hover:text-ink-700"}`}
            >
              {onlyDiscount ? "✓ " : ""}Sadece İndirimli Ürünler
            </Link>
          </FilterGroup>

          {(metalFilter || stoneFilter || minPrice || maxPrice || onlyDiscount) && (
            <Link
              href={activeCategory ? `/urunler?kategori=${activeCategory.slug}` : "/urunler"}
              className="block text-center text-xs text-ink-400 hover:text-ink-700"
            >
              Filtreleri Temizle
            </Link>
          )}
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between border-b border-ink-700/10 pb-4 text-sm">
            <span className="text-ink-500">{products.length} ürün</span>
            <div className="flex items-center gap-3">
              <span className="text-ink-500">Sırala:</span>
              {[
                { v: "yeni", label: "Yeni" },
                { v: "ucuz", label: "Artan" },
                { v: "pahali", label: "Azalan" },
              ].map((s) => (
                <Link
                  key={s.v}
                  href={buildHref({ sirala: s.v })}
                  className={
                    sort === s.v
                      ? "font-medium text-ink-700"
                      : "text-ink-400 hover:text-ink-700"
                  }
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-16 text-center">
              <p className="text-ink-500">
                Bu kriterlere uyan ürün bulunmuyor.
              </p>
              <Link href="/urunler" className="mt-4 inline-block text-gold-500 hover:underline">
                Filtreleri temizle →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
