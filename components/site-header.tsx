import Link from "next/link";
import { Diamond } from "lucide-react";
import { siteConfig } from "@/lib/format";
import { CartIcon } from "./cart/cart-icon";
import { WishlistIcon } from "./cart/wishlist-icon";
import { UserMenu } from "./user-menu";
import { HeaderNav } from "./header-nav";
import { getCurrentProfile } from "@/lib/supabase/auth";

const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/urunler", label: "Koleksiyon" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export async function SiteHeader() {
  let loggedIn = false;
  let fullName: string | null = null;
  let email: string | null = null;
  let isAdmin = false;
  try {
    const { user, profile } = await getCurrentProfile();
    loggedIn = !!user;
    email = user?.email ?? null;
    fullName = profile?.full_name ?? null;
    isAdmin = profile?.is_admin ?? false;
  } catch {
    // env eksikse anonim render
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

        <HeaderNav nav={nav} />

        <div className="flex items-center gap-1">
          <WishlistIcon />
          <CartIcon />
          <UserMenu
            loggedIn={loggedIn}
            fullName={fullName}
            email={email}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </header>
  );
}
