import Link from "next/link";
import { Diamond, Instagram, Phone, Mail, MapPin, LayoutGrid } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/format";
import { NewsletterForm } from "./newsletter-form";
import { getCurrentProfile } from "@/lib/supabase/auth";

export async function SiteFooter() {
  let isAdmin = false;
  let loggedIn = false;
  try {
    const { user, profile } = await getCurrentProfile();
    loggedIn = !!user;
    isAdmin = profile?.is_admin ?? false;
  } catch {
    // env eksikse anonim render
  }

  return (
    <footer className="mt-24 border-t border-ink-700/10 bg-ink-700 text-cream">
      <div className="container-prose py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Diamond className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
              <span className="font-serif text-2xl">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-cream/70 leading-relaxed">
              Özenle seçilmiş pırlanta yüzükler, alyanslar ve butik tasarımlarla
              hayatınızın özel anlarına eşlik eden bir kuyumculuk markası.
            </p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-400 mb-3">
                Bültenimize katılın
              </p>
              <NewsletterForm />
              <p className="mt-2 text-xs text-cream/50">
                Yeni koleksiyonlar ve özel kampanyalardan ilk siz haberdar olun.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gold-400">
              Keşfedin
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li><Link href="/urunler" className="hover:text-gold-400">Koleksiyon</Link></li>
              <li><Link href="/favoriler" className="hover:text-gold-400">Favorilerim</Link></li>
              <li><Link href="/sepet" className="hover:text-gold-400">Sepetim</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-gold-400">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-gold-400">İletişim</Link></li>
            </ul>

            <h4 className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-gold-400">
              Hesap
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {loggedIn ? (
                <>
                  <li><Link href="/hesap" className="hover:text-gold-400">Hesabım</Link></li>
                  <li><Link href="/hesap/siparislerim" className="hover:text-gold-400">Siparişlerim</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/giris" className="hover:text-gold-400">Giriş Yap</Link></li>
                  <li><Link href="/kayit" className="hover:text-gold-400">Hesap Oluştur</Link></li>
                </>
              )}
            </ul>

            <h4 className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-gold-400">
              Yardım
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li><Link href="/sss" className="hover:text-gold-400">SSS</Link></li>
              <li><Link href="/kargo-iade" className="hover:text-gold-400">Kargo & İade</Link></li>
              <li><Link href="/gizlilik" className="hover:text-gold-400">Gizlilik</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gold-400">
              İletişim
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gold-400 shrink-0" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-gold-400" />
                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400"
                >
                  @{siteConfig.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/60">
          <span>© {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-5">
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Yönetim Paneli
              </Link>
            )}
            <a
              href={whatsappUrl("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400"
            >
              WhatsApp ile yazın →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
