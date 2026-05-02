import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/format";

export const metadata = { title: "Talebiniz Alındı" };

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>;
}) {
  const { no } = await searchParams;

  return (
    <div className="container-prose py-20 md:py-28 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <Check className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl text-ink-700">
        Talebiniz Alındı
      </h1>
      <p className="mt-4 mx-auto max-w-xl text-ink-500">
        Sipariş talebiniz başarıyla iletildi. Ekibimiz en kısa sürede sizinle
        iletişime geçerek ürün detaylarını ve ödeme seçeneklerini paylaşacak.
      </p>

      {no && (
        <div className="mt-8 inline-block rounded-full bg-white px-6 py-3 shadow-soft">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-400">
            Sipariş No
          </span>
          <span className="ml-3 font-mono text-ink-700">{no}</span>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/urunler" className="btn-primary">
          Alışverişe Devam Et
        </Link>
        <a
          href={whatsappUrl(`Merhaba, ${no} numaralı talebim hakkında bilgi almak istiyorum.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          WhatsApp ile Yaz
        </a>
      </div>

      <p className="mt-12 text-xs text-ink-400">
        Acil durumlarda bizi {siteConfig.phone} numarasından arayabilirsiniz.
      </p>
    </div>
  );
}
