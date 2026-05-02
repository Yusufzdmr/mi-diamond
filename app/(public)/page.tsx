import Link from "next/link";
import { ArrowRight, Diamond, Heart, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import { siteConfig } from "@/lib/format";
import type { Product, Category } from "@/lib/supabase/types";

export const revalidate = 60;

export default async function HomePage() {
  let featured: Product[] = [];
  let categories: Category[] = [];

  try {
    const supabase = await createClient();
    const [{ data: featuredData }, { data: categoriesData }] = await Promise.all([
      supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);
    featured = featuredData ?? [];
    categories = categoriesData ?? [];
  } catch {
    // Supabase env vars set edilmemişse build/preview kırılmasın.
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-prose grid gap-10 py-20 md:grid-cols-2 md:py-28 md:gap-16 items-center">
          <div>
            <p className="label-eyebrow">Butik Pırlanta Koleksiyonu</p>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05] text-ink-700">
              Hayatınızın <span className="italic text-gold-500">özel</span> anlarına
              eşlik eden zarif tasarımlar
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-500">
              {siteConfig.name}, özenle seçilmiş pırlanta yüzükler, alyanslar ve butik
              tasarımlarla unutulmaz anlarınızda yanınızda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/urunler" className="btn-primary">
                Koleksiyonu Keşfet <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/iletisim" className="btn-outline">
                İletişime Geç
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-ink-700 via-ink-600 to-ink-500 p-1 shadow-soft">
              <div className="flex h-full w-full items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-cream to-ink-50">
                <Diamond className="h-32 w-32 text-gold-400" strokeWidth={0.6} />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex h-32 w-32 items-center justify-center rounded-2xl bg-gold-400 text-ink-700 shadow-gold">
              <div className="text-center">
                <div className="font-serif text-3xl">Mi</div>
                <div className="text-xs uppercase tracking-[0.2em]">Diamond</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-ink-700/10 bg-white">
        <div className="container-prose grid gap-8 py-12 md:grid-cols-3">
          {[
            {
              icon: Diamond,
              title: "Sertifikalı Pırlanta",
              text: "Her ürünümüz uluslararası standartlarda sertifikalandırılır.",
            },
            {
              icon: ShieldCheck,
              title: "Ömür Boyu Garanti",
              text: "Tasarımlarımız, ustalığımızın garantisi altında.",
            },
            {
              icon: Heart,
              title: "Özel Koleksiyon",
              text: "Butik tasarımlar ve kişiye özel modeller.",
            },
          ].map((f) => (
            <div key={f.title} className="flex gap-4">
              <f.icon className="h-8 w-8 text-gold-400 shrink-0" strokeWidth={1.2} />
              <div>
                <h3 className="font-serif text-xl text-ink-700">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-500 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-prose py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label-eyebrow">Koleksiyonlar</p>
              <h2 className="mt-2 font-serif text-4xl text-ink-700">Kategoriler</h2>
            </div>
            <Link
              href="/urunler"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700"
            >
              Tümünü gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/urunler?kategori=${c.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-ink-700 to-ink-500 p-6 transition hover:shadow-soft"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition">
                  <Diamond className="h-32 w-32 text-gold-400" strokeWidth={0.4} />
                </div>
                <div className="relative flex h-full flex-col justify-end">
                  <h3 className="font-serif text-2xl text-cream">{c.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-400">
                    Keşfet →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="container-prose py-12 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-eyebrow">Öne Çıkanlar</p>
            <h2 className="mt-2 font-serif text-4xl text-ink-700">
              Yeni Sezon Tasarımlar
            </h2>
          </div>
          <Link
            href="/urunler"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700"
          >
            Tümünü gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
            <p className="text-ink-500">
              Yakında sizinle olacak özel tasarımlarımız için bizi takipte kalın.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container-prose pb-20">
        <div className="rounded-3xl bg-ink-700 px-8 py-16 md:px-16 md:py-20 text-center text-cream">
          <p className="label-eyebrow">İletişim</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Aklınızdaki tasarımı bulamadınız mı?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            Sizin için özel tasarım yapıyoruz. Ekibimizle iletişime geçin,
            hayalinizdeki yüzüğü birlikte tasarlayalım.
          </p>
          <Link href="/iletisim" className="btn-gold mt-8">
            Bize Ulaşın <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
