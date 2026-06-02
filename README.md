<div align="center">

# 💎 Mi Diamond — Butik Kuyumcu Sitesi

**Next.js + Supabase ile mücevher e-katalog & sipariş talebi platformu**

Pırlanta/mücevher firması için katalog, filtreleme, sepet, favoriler ve
sipariş talebi akışı + tam donanımlı yönetim paneli. Ödeme altyapısı hazır.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20·%20DB%20·%20Storage-3FCF8E?logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## Özellikler

### Müşteri Tarafı
- Ana sayfa, koleksiyon, kategori ve ürün detay sayfaları
- Çoklu fotoğraflı ürün galerisi
- Fiyat / indirim / stok rozetleri
- Kategori, metal, taş, fiyat aralığı ve indirim filtreleri
- Arama
- Sepet (localStorage ile cihaza özel)
- Favoriler / İstek listesi (localStorage)
- Sipariş Talebi formu (ödemesiz checkout) → admin panele düşer
- WhatsApp hızlı iletişim butonu
- Bülten kaydı
- Hakkımızda, İletişim, SSS, Kargo & İade, Gizlilik sayfaları
- Mobil uyumlu, SEO uyumlu

### Yönetim Paneli
- Supabase Auth ile şifreli giriş
- Pano (ürün/kategori/talep özeti)
- Ürün CRUD: çoklu fotoğraf yükleme, kapak seçimi, sıralama
- Otomatik slug, indirim oranı, stok durumu
- Kategori CRUD
- Sipariş talepleri yönetimi: durum güncelleme, müşteriyi tek tıkla arama/WhatsApp
- Admin notları

### Ödeme İçin Altyapı (Hazır)
- `orders` tablosunda `payment_status`, `payment_method`, `payment_id` alanları mevcut
- Sipariş akışı: sepet → form → DB. İleride form → ödeme → DB akışına çevirmek için
  `app/(public)/siparis/checkout-form.tsx` dosyasında ödeme adımı eklenebilir
- Önerilen entegrasyon: iyzico (Türkiye) veya Stripe (yurt dışı)

---

## 1. Kurulum (Geliştirici)

### Gereksinimler
- Node.js 20+
- Supabase hesabı (ücretsiz katman yeterli)
- (İleri aşama) Vercel hesabı

### Bağımlılıklar
```bash
npm install
```

### Environment dosyası
`.env.example` → `.env.local` olarak kopyalayın ve doldurun:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_SITE_NAME=Mi Diamond
NEXT_PUBLIC_WHATSAPP_NUMBER=905551234567
NEXT_PUBLIC_INSTAGRAM=midiamond
NEXT_PUBLIC_PHONE=+90 555 123 45 67
NEXT_PUBLIC_EMAIL=info@midiamond.com.tr
NEXT_PUBLIC_ADDRESS=Ataşehir, İstanbul
```

### Geliştirme sunucusu
```bash
npm run dev
```
Site: http://localhost:3000  
Admin: http://localhost:3000/admin/login

---

## 2. Supabase Kurulumu (İlk Kurulum)

1. [supabase.com](https://supabase.com) → **New project** oluştur (TR bölgesi)
2. Settings → API'den şunları al ve `.env.local`'e kopyala:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`
3. **SQL Editor** → `supabase/schema.sql` dosyasının içeriğini çalıştır
4. **Storage** → "New bucket" → ad: `products`, **Public** seçili → oluştur
5. **Authentication → Providers → Email** açık, "Confirm email" KAPALI (admin manuel oluşturulacak)
6. **Authentication → Users → Add user** ile admin kullanıcısı oluştur
   (örnek: `admin@midiamond.com.tr` + güçlü şifre)

---

## 3. Vercel'e Deploy

1. Repo'yu GitHub'a push et
2. [vercel.com](https://vercel.com) → "Import Project" → repo seç
3. Environment Variables'a `.env.local`'deki tüm değerleri ekle
4. Deploy

### Domain bağlama
1. Vercel projesinde Settings → Domains → "Add" → `midiamond.com.tr`
2. Domain sağlayıcında verilen CNAME / A kayıtlarını ayarla
3. SSL sertifikası otomatik

---

## 4. İçerik Yönetimi (Müşteri için Notlar)

### İlk giriş
1. https://midiamond.com.tr/admin/login
2. Yöneticinin oluşturduğu e-posta + şifre

### Ürün ekleme
1. Sol menü → **Ürünler** → **Yeni Ürün**
2. Ad, fiyat zorunlu. Eski fiyat girilirse otomatik indirim rozeti çıkar.
3. Fotoğraf Yükle → birden fazla seçilebilir, ilki kapak olur, sürükle-bırak ile sıralanabilir.
4. Yayında / Öne Çıkan tikleri sağ üstte.

### İndirim kampanyası
- Toplu indirim için ürünlerin "Eski Fiyat" alanını doldurup yeni fiyatı düşürün.
- Otomatik %X indirim rozeti tüm sayfalarda görüntülenir.

### Sipariş takibi
- **Talepler** menüsünden gelen talepler görüntülenir.
- Her talebin yanında "Ara / WhatsApp" butonları var.
- Durum değiştirilebilir: Yeni → Arandı → Onaylandı → Kargolandı → Tamamlandı

---

## 5. Teknik Detaylar

### Klasör Yapısı
```
app/
  (public)/      → ziyaretçi sayfaları (header/footer ile)
  admin/         → korumalı yönetim paneli
components/
  cart/          → sepet + favoriler context'leri ve UI
  admin/         → admin paneli özel bileşenleri
lib/
  supabase/      → Supabase istemcileri (server / browser / middleware)
  format.ts      → fiyat, slug, ortak helper'lar
supabase/
  schema.sql     → veritabanı şeması (idempotent)
```

### Komutlar
```bash
npm run dev      # geliştirme
npm run build    # üretim build
npm run start    # üretim sunucusu
npm run lint     # lint kontrolü
```

---

## 6. Ödemeli Versiyona Geçiş (Sonraki Aşama)

Mevcut altyapı ödemeyi destekleyecek şekilde tasarlandı. Eklenmesi gerekenler:

1. **Ödeme sağlayıcı seçimi** (önerilen: iyzico)
2. `app/(public)/siparis/checkout-form.tsx` içinde "Sipariş Talebimi Gönder" butonunu
   "Ödemeye Geç" butonuna çevir; ödeme sayfasına yönlendir
3. `/api/payment/iyzico/initiate` ve `/api/payment/iyzico/callback` route handler'ları ekle
4. Başarılı ödeme sonrası `orders` kaydı `payment_status = paid` olarak güncellenir
5. KDV hesaplaması, fatura, kargo ücreti gibi ek alanlar için `orders` tablosuna kolon eklenir

Tahmini efor: ~15-20 saat geliştirme.

---

## Lisans
Mi Diamond için özel olarak geliştirilmiştir.
