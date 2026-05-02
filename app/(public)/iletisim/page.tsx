import { Mail, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/format";

export const metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <section className="container-prose py-16 md:py-24">
      <p className="label-eyebrow">İletişim</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink-700">
        Bizimle iletişime geçin
      </h1>
      <p className="mt-4 max-w-xl text-ink-500">
        Aklınızdaki tasarım, özel sipariş veya merak ettiğiniz her şey için
        bizimle her gün iletişime geçebilirsiniz.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <Phone className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
          <h3 className="mt-4 font-serif text-xl text-ink-700">Telefon</h3>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="mt-2 block text-ink-500 hover:text-gold-500"
          >
            {siteConfig.phone}
          </a>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <Mail className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
          <h3 className="mt-4 font-serif text-xl text-ink-700">E-posta</h3>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 block text-ink-500 hover:text-gold-500"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <MapPin className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
          <h3 className="mt-4 font-serif text-xl text-ink-700">Adres</h3>
          <p className="mt-2 text-ink-500">{siteConfig.address}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <MessageCircle className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
          <h3 className="mt-4 font-serif text-xl text-ink-700">WhatsApp</h3>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-ink-500 hover:text-gold-500"
          >
            Hızlı yanıt için yazın
          </a>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <Instagram className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
          <h3 className="mt-4 font-serif text-xl text-ink-700">Instagram</h3>
          <a
            href={`https://instagram.com/${siteConfig.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-ink-500 hover:text-gold-500"
          >
            @{siteConfig.instagram}
          </a>
        </div>

        <div className="rounded-2xl bg-ink-700 p-6 text-cream">
          <h3 className="font-serif text-xl">Çalışma Saatleri</h3>
          <ul className="mt-4 space-y-1 text-sm text-cream/80">
            <li className="flex justify-between">
              <span>Pazartesi – Cumartesi</span>
              <span>10:00 – 19:00</span>
            </li>
            <li className="flex justify-between">
              <span>Pazar</span>
              <span>Kapalı</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
