import Link from "next/link";
import {
  Package,
  Tags,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: featuredCount },
    { count: categoryCount },
    { count: newOrdersCount },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Ürün", value: productCount ?? 0, href: "/admin/urunler", icon: Package },
    { label: "Öne Çıkan", value: featuredCount ?? 0, href: "/admin/urunler?onecikan=1", icon: TrendingUp },
    { label: "Kategori", value: categoryCount ?? 0, href: "/admin/kategoriler", icon: Tags },
    { label: "Yeni Talep", value: newOrdersCount ?? 0, href: "/admin/siparisler", icon: ShoppingBag },
  ];

  return (
    <>
      <header>
        <h1 className="font-serif text-3xl text-ink-700">Hoş geldiniz</h1>
        <p className="mt-1 text-sm text-ink-500">
          Mağazanızı yönetmeye buradan başlayabilirsiniz.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl bg-white p-5 shadow-soft transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-gold-500" />
              <ArrowRight className="h-4 w-4 text-ink-300" />
            </div>
            <p className="mt-6 text-3xl font-medium text-ink-700">{s.value}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-ink-400 mt-1">
              {s.label}
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg text-ink-700">Son Talepler</h2>
            <Link
              href="/admin/siparisler"
              className="text-xs text-ink-500 hover:text-ink-700"
            >
              Tümü →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-ink-700/10">
            {(recentOrders as Order[] | null)?.map((o) => (
              <li key={o.id} className="py-3 flex items-center justify-between text-sm">
                <Link
                  href={`/admin/siparisler/${o.id}`}
                  className="flex-1 truncate"
                >
                  <span className="font-medium text-ink-700">{o.customer_name}</span>
                  <span className="ml-2 text-ink-400">{o.order_number}</span>
                </Link>
                <span className="text-ink-700">{formatPrice(o.total, o.currency)}</span>
              </li>
            ))}
            {(!recentOrders || recentOrders.length === 0) && (
              <li className="py-6 text-center text-sm text-ink-400">
                Henüz sipariş talebi yok.
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl bg-ink-700 p-6 text-cream shadow-soft">
          <h2 className="font-serif text-lg">Hızlı İşlemler</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/admin/urunler/yeni"
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10"
              >
                <span>Yeni Ürün Ekle</span>
                <ArrowRight className="h-4 w-4 text-gold-400" />
              </Link>
            </li>
            <li>
              <Link
                href="/admin/kategoriler"
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10"
              >
                <span>Kategori Yönet</span>
                <ArrowRight className="h-4 w-4 text-gold-400" />
              </Link>
            </li>
            <li>
              <Link
                href="/admin/siparisler"
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10"
              >
                <span>Talepleri Görüntüle</span>
                <ArrowRight className="h-4 w-4 text-gold-400" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
