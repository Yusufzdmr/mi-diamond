import { ResetForm } from "./reset-form";

export const metadata = { title: "Yeni Şifre Belirle" };

export default function ResetPasswordPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <p className="label-eyebrow text-center">Şifre Sıfırlama</p>
        <h1 className="mt-2 text-center font-serif text-4xl text-ink-700">
          Yeni Şifre Belirle
        </h1>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-soft">
          <ResetForm />
        </div>
      </div>
    </div>
  );
}
