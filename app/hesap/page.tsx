import Link from "next/link";
import { ArrowRight, Package, Heart, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/auth";
import { formatPrice } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Talep Alındı",
  contacted: "İletişime Geçildi",
  confirmed: "Onaylandı",
  shipped: "Kargoda",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

export default async function AccountDashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  return (
    <>
      <header>
        <h1 className="font-serif text-3xl text-ink-700">Hesabım</h1>
        <p className="mt-1 text-sm text-ink-500">
          Hoş geldiniz! Sipariş geçmişinizi ve hesap bilgilerinizi buradan
          yönetebilirsiniz.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/hesap/siparislerim"
          className="rounded-2xl bg-white p-5 shadow-soft hover:shadow-md transition"
        >
          <Package className="h-5 w-5 text-gold-500" />
          <p className="mt-4 text-3xl font-medium text-ink-700">
            {totalOrders ?? 0}
          </p>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-400 mt-1">
            Sipariş Talebi
          </p>
        </Link>

        <Link
          href="/favoriler"
          className="rounded-2xl bg-white p-5 shadow-soft hover:shadow-md transition"
        >
          <Heart className="h-5 w-5 text-gold-500" />
          <p className="mt-4 font-medium text-ink-700">Favorilerim</p>
          <p className="text-xs text-ink-400 mt-1">Beğendiklerini gör</p>
        </Link>

        <Link
          href="/sepet"
          className="rounded-2xl bg-white p-5 shadow-soft hover:shadow-md transition"
        >
          <ShoppingBag className="h-5 w-5 text-gold-500" />
          <p className="mt-4 font-medium text-ink-700">Sepetim</p>
          <p className="text-xs text-ink-400 mt-1">Devam et</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-ink-700">Son Siparişlerim</h2>
          <Link
            href="/hesap/siparislerim"
            className="text-xs text-ink-500 hover:text-ink-700 inline-flex items-center gap-1"
          >
            Tümü <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <ul className="mt-4 divide-y divide-ink-700/10">
          {(orders as Order[] | null)?.map((o) => (
            <li
              key={o.id}
              className="py-4 flex flex-wrap items-center gap-3 justify-between"
            >
              <div className="min-w-0">
                <Link
                  href={`/hesap/siparislerim/${o.id}`}
                  className="font-medium text-ink-700 hover:text-gold-500"
                >
                  #{o.order_number}
                </Link>
                <p className="text-xs text-ink-400">
                  {new Date(o.created_at).toLocaleDateString("tr-TR")} —{" "}
                  {STATUS_LABEL[o.status]}
                </p>
              </div>
              <span className="text-ink-700">
                {formatPrice(o.total, o.currency)}
              </span>
            </li>
          ))}
          {(!orders || orders.length === 0) && (
            <li className="py-8 text-center text-sm text-ink-400">
              Henüz sipariş talebiniz yok.{" "}
              <Link href="/urunler" className="text-gold-500 hover:underline">
                Koleksiyona göz atın →
              </Link>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
