# Dönerbros Catering - Project Dashboard

- [x] 1. Gallery/Video bölümü mobil düzeni (dikey kart dizilimi, boyut ve spacing)
- [x] 2. Global section padding ve spacing mobil küçültme
- [x] 3. Hero bölümü 480px ince ayar (badge, stats, orbs)
- [x] 4. PricingCalculator mobil responsive düzeltmeleri
- [x] 5. Menu, Reviews, Process bölümleri ince ayar
- [x] 6. Footer mobil iyileştirmeleri
- [x] 7. Tarayıcıda mobil test ve doğrulama

# Phase 2: Domain Migration & SEO optimization
- [x] 8. donerbros.berlin domain kurulumu (DNS settings on Strato & Vercel)
- [x] 9. Sitedeki URL ve Meta Tag güncellemeleri (donerbros.berlin adresine geçiş)
- [x] 10. Sitemap.xml ve Robots.txt güncellemeleri
- [x] 11. Final test ve SSL doğrulaması

## Phase 4: Multi-Language Expansion (Turkish) & Final Polish
- [x] Integrated TR translations in `translations.js`
- [x] Upgraded `LanguageContext.jsx` for 3-language cycle
- [x] Updated `Header.jsx` language switcher UI
- [x] Added tr_TR meta tags to `index.html`
- [x] Final UI check and localized Hero stats

## Phase 5: Catering Removal & Online Ordering System (WhatsApp Cart)
- [x] Catering servisleri ve fiyat hesaplayıcı tamamen kaldırıldı (`Services`, `PricingCalculator`).
- [x] Tek merkezli menü ve sipariş veri mimarisi kuruldu (`src/data/menu.js`).
- [x] Sepet context ve yerel depolama altyapısı eklendi (`src/context/CartContext.jsx`).
- [x] Gerçek fiyatlı ve adet artırma/azaltmalı menü kartları entegre edildi (`src/components/Menu.jsx`, `Menu.css`).
- [x] Canlı sepet çubuğu ve açılır sipariş çekmecesi (Cart Drawer & Checkout) eklendi (`src/components/Cart.jsx`, `Cart.css`).
- [x] Gel-Al (Abholung) ve Paket Servis (Lieferung) geçişi ve minimum sipariş tutarı kuralı eklendi.
- [x] WhatsApp formatlı sipariş oluşturma motoru kuruldu.
- [x] Süreç bölümü sipariş adımlarına dönüştürüldü (`src/components/Process.jsx`).
- [x] Müşteri yorumları restoran ve sipariş memnuniyetine uyarlandı (`src/i18n/translations.js`, `src/components/Reviews.jsx`).
- [x] SEO meta etiketleri, OpenGraph, PWA ve Schema.org JSON-LD verileri restoran ve online sipariş yapısına güncellendi.
- [x] `npm run build` ile derleme hatasız doğrulandı.
