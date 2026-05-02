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
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/arama?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

      <form
        onSubmit={onSubmit}
        className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-auto"
      >
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün ara..."
            className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-700 placeholder:text-ink-400 transition focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/20"
          />
        </div>
      </form>

      <button
        className="md:hidden ml-1 text-ink-700"
        onClick={() => setOpen(!open)}
        aria-label="Menü"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full md:hidden border-t border-ink-700/10 bg-cream shadow-soft">
          <div className="container-prose py-3">
            <form onSubmit={onSubmit} className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-700 placeholder:text-ink-400 focus:border-gold-400 focus:outline-none"
              />
            </form>

            <nav className="mt-3 flex flex-col">
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
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
