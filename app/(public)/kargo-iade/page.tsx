import { Truck, RotateCcw, Shield, Clock } from "lucide-react";

export const metadata = { title: "Kargo & İade" };

export default function ShippingReturnsPage() {
  return (
    <section className="container-prose py-16 md:py-24">
      <p className="label-eyebrow">Kargo & İade</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink-700">
        Kargo ve İade Politikası
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Tüm ürünlerimiz, sigortalı kargo ile özenle kapınıza kadar ulaştırılır.
        Aşağıda gönderim ve iade süreçlerimizi bulabilirsiniz.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Block
          icon={Truck}
          title="Hızlı Kargo"
          text="Stokta bulunan ürünler, ödeme onayını takip eden 1-3 iş günü içinde sigortalı olarak kargoya verilir."
        />
        <Block
          icon={Shield}
          title="Güvenli Paketleme"
          text="Tüm ürünlerimiz özel kutularında, taşımaya dayanıklı ek paketleme ile gönderilir. Hediye paketi ücretsizdir."
        />
        <Block
          icon={Clock}
          title="Özel Sipariş"
          text="Kişiye özel tasarım ve siparişe özel ürünlerin hazırlanma süresi 7-14 iş günü arasında değişir."
        />
        <Block
          icon={RotateCcw}
          title="14 Gün İçinde Değişim"
          text="Standart ürünlerde teslim tarihinden itibaren 14 gün içinde, fatura ile birlikte değişim hakkı sunuyoruz."
        />
      </div>

      <article className="prose prose-ink mt-16 max-w-3xl space-y-6 text-ink-500 leading-relaxed">
        <h2 className="font-serif text-2xl text-ink-700">Detaylar</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            Türkiye geneline anlaşmalı kargo firmaları üzerinden gönderim
            yapılmaktadır.
          </li>
          <li>
            500 ₺ üzeri tüm sipariş taleplerinde kargo ücretsizdir.
          </li>
          <li>
            Kişiselleştirilmiş ürünler (özel ölçü, kazıma, tasarım) iade kapsamı
            dışındadır.
          </li>
          <li>
            İade taleplerinde ürünün orijinal kutusunda, hasarsız ve faturasıyla
            birlikte gönderilmesi gerekir.
          </li>
          <li>
            İade onayı sonrası ücret iadesi 7 iş günü içinde yapılır.
          </li>
        </ul>
      </article>
    </section>
  );
}

function Block({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <Icon className="h-7 w-7 text-gold-500" strokeWidth={1.4} />
      <h3 className="mt-4 font-serif text-xl text-ink-700">{title}</h3>
      <p className="mt-2 text-sm text-ink-500 leading-relaxed">{text}</p>
    </div>
  );
}
