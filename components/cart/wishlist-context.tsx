"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WishItem = {
  product_id: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
};

type WishlistState = {
  items: WishItem[];
  ids: Set<string>;
  toggle: (item: WishItem) => void;
  has: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
};

const WishCtx = createContext<WishlistState | null>(null);
const STORAGE_KEY = "midiamond:wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const toggle = useCallback((item: WishItem) => {
    setItems((prev) =>
      prev.some((i) => i.product_id === item.product_id)
        ? prev.filter((i) => i.product_id !== item.product_id)
        : [...prev, item],
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistState>(() => {
    const ids = new Set(items.map((i) => i.product_id));
    return {
      items,
      ids,
      toggle,
      has: (id: string) => ids.has(id),
      remove,
      clear,
    };
  }, [items, toggle, remove, clear]);

  return <WishCtx.Provider value={value}>{children}</WishCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishCtx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
