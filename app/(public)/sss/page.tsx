import { siteConfig, whatsappUrl } from "@/lib/format";

export const metadata = { title: "Sıkça Sorulan Sorular" };

const FAQS = [
  {
    q: "Ürünlerinizin pırlantaları sertifikalı mı?",
    a: "Evet, koleksiyonumuzdaki tüm pırlanta ürünler uluslararası geçerli sertifikalarla birlikte teslim edilir. Karat, renk, berraklık ve kesim bilgileri sertifikada yer alır.",
  },
  {
    q: "Yüzük ölçüsü nasıl belirlenir?",
    a: "Mağazamızda profesyonel ölçüm yapılır. Online sipariş veriyorsanız, eski bir yüzüğünüzün iç çapını ölçüp bizimle paylaşabilir veya WhatsApp üzerinden ölçü kılavuzu talep edebilirsiniz.",
  },
  {
    q: "Sipariş süreci nasıl işliyor?",
    a: "Sepetinizi oluşturduktan sonra sipariş talebi formunu doldurun. Ekibimiz 24 saat içinde sizinle iletişime geçip ürün, ölçü ve ödeme detaylarını netleştirir.",
  },
  {
    q: "Ödemeyi nasıl yapabilirim?",
    a: "Şu an çevrimiçi ödeme almıyoruz. Sipariş onayından sonra havale/EFT, kredi kartı (link ile) veya mağazadan teslim alımda nakit/kart ile ödeme yapabilirsiniz.",
  },
  {
    q: "Kargo ne kadar sürer?",
    a: "Stokta bulunan ürünler ödeme onayını takip eden 1-3 iş günü içinde kargoya verilir. Siparişe özel tasarımlar 7-14 iş günü sürebilir.",
  },
  {
    q: "İade ve değişim mümkün mü?",
    a: "Hijyen ve değer koruma açısından kişiselleştirilmiş ürünlerde iade kabul edilmez. Standart ürünlerde 14 gün içinde, faturasıyla birlikte değişim yapılabilir.",
  },
  {
    q: "Özel tasarım yaptırabilir miyim?",
    a: "Elbette! Hayalinizdeki tasarımı bize iletin, ekibimiz tasarım önerileri ve fiyat teklifi hazırlasın. WhatsApp üzerinden hızlıca başlayabiliriz.",
  },
];

export default function FaqPage() {
  return (
    <section className="container-prose py-16 md:py-24">
      <p className="label-eyebrow">Yardım</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink-700">
        Sıkça Sorulan Sorular
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Aşağıdaki yanıtları faydalı bulacağınızı umuyoruz. Aklınıza takılan
        başka bir konu olursa bize her zaman ulaşabilirsiniz.
      </p>

      <div className="mt-12 max-w-3xl space-y-4">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl bg-white p-6 shadow-soft"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <h2 className="font-serif text-lg text-ink-700">{f.q}</h2>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-gold-500 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-sm text-ink-500 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-ink-700 p-10 text-center text-cream">
        <h2 className="font-serif text-2xl">Aradığınız cevabı bulamadınız mı?</h2>
        <p className="mt-2 text-cream/70">
          Bize {siteConfig.phone} numarasından ulaşabilir veya WhatsApp üzerinden
          yazabilirsiniz.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-6"
        >
          WhatsApp ile İletişim
        </a>
      </div>
    </section>
  );
}
