"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Diamond, Search } from "lucide-react";
import { siteConfig } from "@/lib/format";
import { CartIcon } from "./cart/cart-icon";
import { WishlistIcon } from "./cart/wishlist-icon";

const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/urunler", label: "Koleksiyon" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/arama?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/10 bg-cream/80 backdrop-blur-md">
      <div className="container-prose flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-ink-700 shrink-0">
          <Diamond className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
          <span className="font-serif text-2xl tracking-wide">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition ${
                  active
                    ? "text-ink-700 font-medium"
                    : "text-ink-500 hover:text-ink-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="hidden sm:flex h-10 w-10 items-center justify-center text-ink-700 hover:text-gold-500 transition"
            aria-label="Ara"
          >
            <Search className="h-5 w-5" />
          </button>
          <WishlistIcon />
          <CartIcon />
          <button
            className="md:hidden ml-1 text-ink-700"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink-700/10 bg-cream">
          <form
            onSubmit={onSubmit}
            className="container-prose flex items-center gap-3 py-3"
          >
            <Search className="h-4 w-4 text-ink-400" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün ara — yüzük, alyans, tektaş..."
              className="flex-1 bg-transparent py-2 text-sm focus:outline-none placeholder:text-ink-300"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-ink-400 hover:text-ink-700"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="md:hidden border-t border-ink-700/10 bg-cream">
          <nav className="container-prose flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ink-700 border-b border-ink-700/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <form onSubmit={onSubmit} className="flex items-center gap-2 py-3">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ara..."
                className="flex-1 bg-transparent py-1 text-sm focus:outline-none"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
