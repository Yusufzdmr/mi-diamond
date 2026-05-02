"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { updateOrderStatusAction } from "@/app/admin/order-actions";
import type { OrderStatus } from "@/lib/supabase/types";

const OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "Müşteri Arandı" },
  { value: "confirmed", label: "Onaylandı" },
  { value: "shipped", label: "Kargolandı" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal Edildi" },
];

export function OrderStatusForm({
  id,
  status,
  adminNote,
}: {
  id: string;
  status: OrderStatus;
  adminNote: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateOrderStatusAction(id, fd);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-6 shadow-soft space-y-4"
    >
      <h2 className="font-serif text-lg text-ink-700">Durum & Notlar</h2>

      <label className="block text-sm">
        <span className="text-ink-700 font-medium">Durum</span>
        <select
          name="status"
          defaultValue={status}
          className="mt-1 w-full rounded-lg border border-ink-200 bg-cream/50 px-4 py-2.5 text-sm focus:border-ink-700 focus:outline-none"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-ink-700 font-medium">İç Not</span>
        <textarea
          name="admin_note"
          rows={5}
          defaultValue={adminNote ?? ""}
          placeholder="Sadece sizin görebileceğiniz not..."
          className="mt-1 w-full rounded-lg border border-ink-200 bg-cream/50 px-4 py-2.5 text-sm focus:border-ink-700 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink-700 py-2.5 text-sm font-medium text-cream hover:bg-ink-600 disabled:opacity-60"
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Kaydediliyor
          </span>
        ) : saved ? (
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4" /> Kaydedildi
          </span>
        ) : (
          "Güncelle"
        )}
      </button>
    </form>
  );
}
