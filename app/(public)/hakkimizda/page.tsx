import { Diamond, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/format";

export const metadata = { title: "Hakkımızda" };

export default function AboutPage() {
  return (
    <>
      <section className="container-prose py-16 md:py-24">
        <p className="label-eyebrow">Hakkımızda</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink-700 max-w-3xl">
          {siteConfig.name} — özenle seçilmiş, butik bir kuyumculuk deneyimi
        </h1>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-20 items-start">
          <div className="space-y-5 text-ink-500 leading-relaxed">
            <p>
              {siteConfig.name}, hayatınızın özel anlarına eşlik edecek
              tasarımları, ustalık ve incelikle bir araya getiren bir butik
              kuyumculuk markasıdır.
            </p>
            <p>
              Her yüzük, sertifikalı taşlar ve titiz işçilik ile şekillenir.
              Klasik tasarımları modern bir bakış açısıyla yeniden yorumlar,
              size özel koleksiyonlar oluştururuz.
            </p>
            <p>
              Markamız, sadece bir mücevher değil — saklayacağınız bir hatıra
              sunmayı amaçlar. Sevdiklerinize hediye etmek ya da kendinizi
              ödüllendirmek için tasarladığımız parçalar, zamana meydan okuyan
              bir zarafetle sizinle olur.
            </p>
          </div>

          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-ink-700 to-ink-500 p-1 shadow-soft">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.4rem] bg-cream">
              <Diamond className="h-24 w-24 text-gold-400" strokeWidth={0.6} />
              <span className="mt-4 font-serif text-2xl text-ink-700">
                {siteConfig.name}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500">
                Est. 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-ink-700/10">
        <div className="container-prose py-16 md:py-24">
          <h2 className="font-serif text-3xl text-ink-700 text-center max-w-2xl mx-auto">
            Değerlerimiz, her tasarımımıza yansır
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Güven",
                text: "Sertifikalı taşlar ve şeffaf fiyat politikası.",
              },
              {
                icon: Sparkles,
                title: "Ustalık",
                text: "Geleneksel zanaat, modern detaylarla buluşuyor.",
              },
              {
                icon: Heart,
                title: "Duygu",
                text: "Her tasarım, bir hikâyenin başlangıcıdır.",
              },
              {
                icon: Diamond,
                title: "Zarafet",
                text: "Zamansız tasarım, kalıcı zarafet.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-50">
                  <v.icon className="h-6 w-6 text-gold-500" strokeWidth={1.4} />
                </div>
                <h3 className="mt-5 font-serif text-xl text-ink-700">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
