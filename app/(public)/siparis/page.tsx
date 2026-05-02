import { CheckoutForm } from "./checkout-form";

export const metadata = { title: "Sipariş Talebi" };

export default function CheckoutPage() {
  return (
    <div className="container-prose py-12 md:py-16">
      <p className="label-eyebrow">Son Adım</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl text-ink-700">
        Sipariş Talebi Oluştur
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Aşağıdaki formu doldurarak sipariş talebinizi oluşturun. Ekibimiz en
        kısa sürede sizinle iletişime geçerek ürün ve ödeme detaylarını
        iletecektir.
      </p>

      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
