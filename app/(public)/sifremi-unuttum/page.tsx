import Link from "next/link";
import { ForgotForm } from "./forgot-form";

export const metadata = { title: "Şifremi Unuttum" };

export default function ForgotPasswordPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <p className="label-eyebrow text-center">Şifre Sıfırlama</p>
        <h1 className="mt-2 text-center font-serif text-4xl text-ink-700">
          Şifrenizi mi unuttunuz?
        </h1>
        <p className="mt-3 text-center text-sm text-ink-500">
          E-postanıza bir sıfırlama bağlantısı göndereceğiz.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-soft">
          <ForgotForm />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Şifrenizi hatırladınız mı?{" "}
          <Link href="/giris" className="font-medium text-gold-500 hover:underline">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
