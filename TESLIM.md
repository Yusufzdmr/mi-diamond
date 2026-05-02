# Mi Diamond — Müşteri Teslim Notları

Bu dosya **Mi Diamond firma yetkilisine** sunulacak özet bilgileri içerir.

## Sitenin İçerdiği Sayfalar

| Sayfa | URL | İçerik |
|---|---|---|
| Ana Sayfa | `/` | Hero, kategoriler, öne çıkan ürünler |
| Koleksiyon | `/urunler` | Filtreli ürün listesi |
| Ürün Detay | `/urunler/[slug]` | Galeri, fiyat, özellikler, sepete ekle |
| Hakkımızda | `/hakkimizda` | Marka hikayesi |
| İletişim | `/iletisim` | Telefon, e-posta, adres, WhatsApp, IG |
| SSS | `/sss` | Sıkça sorulan sorular |
| Kargo & İade | `/kargo-iade` | Politikalar |
| Gizlilik | `/gizlilik` | KVKK metni |
| Sepet | `/sepet` | Müşteri sepet sayfası |
| Favoriler | `/favoriler` | İstek listesi |
| Sipariş Talebi | `/siparis` | Ödemesiz talep formu |
| Arama | `/arama?q=...` | Ürün araması |
| Yönetim | `/admin` | Yönetici paneli (giriş gerekir) |

## Müşterinin Yapabilecekleri

Yönetim panelinden firma yetkilisi:
- Ürün ekleyebilir / düzenleyebilir / silebilir
- Birden fazla fotoğraf yükleyebilir, kapak seçebilir
- Fiyatları güncelleyebilir, indirim ekleyebilir (otomatik %X rozeti çıkar)
- Stok durumunu yönetebilir (Stokta / Tükendi / Siparişe Özel)
- Kategori ekleyebilir / düzenleyebilir
- Gelen sipariş taleplerini görüntüleyebilir, müşteriyle iletişime geçebilir
- Talep durumunu güncelleyebilir

## Sipariş Akışı (Ödemesiz)

1. Müşteri ürünleri sepete ekler
2. Sipariş Talebi Oluştur'a tıklar
3. Ad / Telefon / Adres / Not formu doldurur
4. Talep, yönetim paneline düşer
5. Yetkilisi telefon/WhatsApp ile müşteriyi arar
6. Ürün ve ödeme detayları konuşulur
7. Havale / EFT / Mağazada nakit / kart ile ödeme alınır
8. Sipariş "Tamamlandı" olarak işaretlenir

## Yıllık Sabit Giderler

| Kalem | Tutar | Not |
|---|---|---|
| Domain (.com.tr) | ~250 TL | İl yenilenir |
| Hosting (Vercel) | 0 TL | Free tier yeterli |
| Veritabanı (Supabase) | 0 TL | Free tier (500 MB DB, 1 GB depo) |
| Görsel Depolama | 0 TL | Supabase'e dahil |
| **Toplam** | **~250 TL/yıl** | |

> Trafik artışında Vercel Pro (20 USD/ay) gerekebilir.  
> Supabase free tier'da 50.000 aylık aktif kullanıcı limiti var.

## Sonraki Aşama: Ödeme Entegrasyonu

Site ödeme alacak şekilde altyapısı **hazır** durumda.  
Aktif edilmek istendiğinde:

- iyzico/PayTR seçilir, sözleşme yapılır
- Ödeme sayfası eklenir (~15-20 saat dev)
- Ek maliyet: 15.000 TL (önceki anlaşmada belirtilen)

## Gerekli İçerikler (Müşteriden)

İlk yayına alınmadan önce:
- [ ] Logo dosyaları (.svg ve .png)
- [ ] Ürün fotoğrafları (yüksek çözünürlük)
- [ ] Ürün ad/açıklama/fiyat listesi
- [ ] WhatsApp numarası, Instagram kullanıcı adı
- [ ] Açık adres
- [ ] Hakkımızda metni (taslak hazır, özelleştirilebilir)
- [ ] (Opsiyonel) Banner görselleri

## Destek

İlk 3 ay süresince:
- Bug fix
- Küçük UI ayarlamaları
- Müşteri eğitimi (panel kullanımı)

dahildir.

İlerleyen dönem için aylık bakım anlaşması yapılabilir.
