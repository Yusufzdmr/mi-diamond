import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/cart/providers";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mi Diamond — Butik Pırlanta & Yüzük",
    template: "%s | Mi Diamond",
  },
  description:
    "Mi Diamond, özenle seçilmiş pırlanta yüzükler, alyanslar ve butik tasarımlarıyla hayatınızın özel anlarına eşlik eder.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Mi Diamond",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
