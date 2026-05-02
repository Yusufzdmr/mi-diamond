-- Mi Diamond — Veritabanı Şeması
-- Bu dosyayı Supabase Dashboard > SQL Editor üzerinden çalıştırın.
-- Sonra Storage'da `products` adında PUBLIC bucket oluşturun.

-- =====================================================
-- KATEGORİLER
-- =====================================================
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- =====================================================
-- ÜRÜNLER
-- =====================================================
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  category_id   uuid references public.categories(id) on delete set null,

  -- Fiyatlandırma
  price         numeric(12, 2) not null check (price >= 0),
  old_price     numeric(12, 2) check (old_price is null or old_price > price),
  currency      text not null default 'TRY',

  -- Görseller (Supabase Storage public URL'leri)
  images        text[] not null default '{}',

  -- Ürün özellikleri
  metal         text,            -- "14 Ayar Beyaz Altın", "18 Ayar Sarı Altın" vb.
  stone         text,            -- "Pırlanta", "Zirkon" vb.
  carat         text,            -- "0.25 ct" vb.
  ring_size     text,            -- "Ayarlanabilir", "13–18" vb.

  -- Vitrin & yayın
  is_published  boolean not null default true,
  is_featured   boolean not null default false,
  stock_status  text not null default 'available' check (stock_status in ('available', 'sold_out', 'on_request')),

  -- E-ticaret altyapısı (ödemeli versiyonda kullanılacak — şu an opsiyonel)
  sku           text,
  stock         int,
  weight_grams  numeric(8, 2),

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx   on public.products(category_id);
create index if not exists products_published_idx  on public.products(is_published);
create index if not exists products_featured_idx   on public.products(is_featured) where is_featured;
create index if not exists products_created_idx    on public.products(created_at desc);
create index if not exists products_search_idx     on public.products using gin (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(metal, '') || ' ' || coalesce(stone, ''))
);

-- updated_at otomatik güncelleme
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

-- =====================================================
-- SİPARİŞ TALEPLERİ (orders)
-- Şu an: ödemesiz "talep". İleride ödeme adımı eklenince payment alanları kullanılır.
-- =====================================================
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text not null unique default to_char(now(), 'YYMMDD') || '-' || substr(md5(random()::text), 1, 6),

  -- Müşteri bilgileri
  customer_name   text not null,
  customer_phone  text not null,
  customer_email  text,

  -- Adres (kargo gerektiğinde)
  address_line    text,
  city            text,
  district        text,
  postal_code     text,

  -- Sepet içeriği (snapshot — fiyat anlık olarak kayıt edilir)
  items           jsonb not null default '[]'::jsonb,
  -- items şeması: [{ product_id, slug, name, price, quantity, image }]

  subtotal        numeric(12, 2) not null default 0,
  total           numeric(12, 2) not null default 0,
  currency        text not null default 'TRY',

  customer_note   text,
  admin_note      text,

  -- Durum
  status          text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'shipped', 'completed', 'cancelled')),

  -- Ödeme — şu an boş, ödemeli versiyonda kullanılacak
  payment_status  text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'not_required')),
  payment_method  text,
  payment_id      text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists orders_status_idx     on public.orders(status);
create index if not exists orders_created_idx    on public.orders(created_at desc);

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
before update on public.orders
for each row execute function public.touch_updated_at();

-- =====================================================
-- BÜLTEN AB0NELERİ
-- =====================================================
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  is_active   boolean not null default true,
  source      text,
  created_at  timestamptz not null default now()
);

-- =====================================================
-- RLS — Row Level Security
-- =====================================================
alter table public.categories             enable row level security;
alter table public.products               enable row level security;
alter table public.orders                 enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Herkes yayında olan kategorileri ve ürünleri okuyabilir
drop policy if exists "categories: public read" on public.categories;
create policy "categories: public read"
  on public.categories for select
  using (true);

drop policy if exists "products: public read published" on public.products;
create policy "products: public read published"
  on public.products for select
  using (is_published = true);

-- Sadece giriş yapmış (admin) kullanıcılar yazabilir / tüm ürünleri görebilir
drop policy if exists "categories: admin write" on public.categories;
create policy "categories: admin write"
  on public.categories for all
  to authenticated
  using (true) with check (true);

drop policy if exists "products: admin all" on public.products;
create policy "products: admin all"
  on public.products for all
  to authenticated
  using (true) with check (true);

-- Sipariş: herkes oluşturabilir (anonim sipariş talebi), sadece admin görür/günceller
drop policy if exists "orders: anon insert" on public.orders;
create policy "orders: anon insert"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "orders: admin read" on public.orders;
create policy "orders: admin read"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "orders: admin update" on public.orders;
create policy "orders: admin update"
  on public.orders for update
  to authenticated
  using (true) with check (true);

drop policy if exists "orders: admin delete" on public.orders;
create policy "orders: admin delete"
  on public.orders for delete
  to authenticated
  using (true);

-- Bülten: herkes kayıt olabilir, sadece admin görür
drop policy if exists "newsletter: anon insert" on public.newsletter_subscribers;
create policy "newsletter: anon insert"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

drop policy if exists "newsletter: admin read" on public.newsletter_subscribers;
create policy "newsletter: admin read"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

drop policy if exists "newsletter: admin delete" on public.newsletter_subscribers;
create policy "newsletter: admin delete"
  on public.newsletter_subscribers for delete
  to authenticated
  using (true);

-- =====================================================
-- STORAGE POLİTİKALARI
-- =====================================================
-- Storage > Buckets'tan "products" adında PUBLIC bucket oluşturun.
-- Sonra aşağıdaki politikaları çalıştırın:

drop policy if exists "products bucket: admin upload" on storage.objects;
create policy "products bucket: admin upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products');

drop policy if exists "products bucket: admin update" on storage.objects;
create policy "products bucket: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'products');

drop policy if exists "products bucket: admin delete" on storage.objects;
create policy "products bucket: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products');

-- =====================================================
-- BAŞLANGIÇ KATEGORİLERİ
-- =====================================================
insert into public.categories (slug, name, sort_order) values
  ('tektas',    'Tektaş Yüzük',    10),
  ('alyans',    'Alyans',          20),
  ('pirlanta',  'Pırlanta Yüzük',  30),
  ('nisan',     'Nişan Yüzüğü',    40),
  ('koleksiyon','Özel Koleksiyon', 50)
on conflict (slug) do nothing;
