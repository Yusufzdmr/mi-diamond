"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

type NavItem = { href: string; label: string };

export function HeaderNav({ nav }: { nav: NavItem[] }) {
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
    setOpen(false);
    setQuery("");
  }

  return (
    <>
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

      <div className="flex items-center gap-1 md:order-last">
        <button
          onClick={() => setSearchOpen((s) => !s)}
          className="hidden sm:flex h-10 w-10 items-center justify-center text-ink-700 hover:text-gold-500 transition"
          aria-label="Ara"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          className="md:hidden ml-1 text-ink-700"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-t border-ink-700/10 bg-cream">
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
        <div className="absolute inset-x-0 top-full md:hidden border-t border-ink-700/10 bg-cream">
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
    </>
  );
}
