import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { LoginForm } from "./login-form";

export const metadata = { title: "Giriş Yap" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/hesap");

  const { next } = await searchParams;

  return (
    <div className="container-prose py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <p className="label-eyebrow text-center">Müşteri Girişi</p>
        <h1 className="mt-2 text-center font-serif text-4xl text-ink-700">
          Tekrar hoş geldiniz
        </h1>
        <p className="mt-3 text-center text-sm text-ink-500">
          Hesabınıza giriş yapın, siparişlerinizi takip edin.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-soft">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Henüz hesabınız yok mu?{" "}
          <Link href="/kayit" className="font-medium text-gold-500 hover:underline">
            Hemen kayıt olun
          </Link>
        </p>
      </div>
    </div>
  );
}
