import { siteConfig } from "@/lib/format";

export const metadata = { title: "Gizlilik Politikası" };

export default function PrivacyPage() {
  return (
    <section className="container-prose py-16 md:py-24">
      <p className="label-eyebrow">Yasal</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink-700">
        Gizlilik Politikası
      </h1>

      <article className="prose prose-ink mt-10 max-w-3xl space-y-5 text-ink-500 leading-relaxed text-sm">
        <p>
          {siteConfig.name} olarak müşterilerimizin gizliliğine büyük önem
          veriyoruz. Bu politika, sitemizi ziyaret ettiğinizde toplanan
          bilgilerin nasıl kullanıldığını açıklar.
        </p>

        <h2 className="font-serif text-xl text-ink-700">Toplanan Bilgiler</h2>
        <p>
          Sipariş talebi formunda paylaştığınız ad, telefon, e-posta ve adres
          bilgileri yalnızca size ulaşmak ve siparişinizi işleme almak amacıyla
          kullanılır. 3. taraflarla paylaşılmaz.
        </p>

        <h2 className="font-serif text-xl text-ink-700">Çerezler</h2>
        <p>
          Sitemizde sepet ve favori bilgilerinizi tarayıcınızın yerel
          deposunda saklarız. Bu veriler tarayıcınızdan çıkmaz ve sunucularımıza
          gönderilmez.
        </p>

        <h2 className="font-serif text-xl text-ink-700">İletişim</h2>
        <p>
          Verilerinizin silinmesini veya değiştirilmesini istiyorsanız bizimle{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-gold-500 hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          adresinden iletişime geçebilirsiniz.
        </p>
      </article>
    </section>
  );
}
