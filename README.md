# 5 Yıldızlı Otel Web Sitesi

Bu proje, lüks bir otel için tasarlanmış modern, hızlı ve duyarlı (responsive) bir web uygulamasıdır. 

Başlangıçta düz HTML, CSS ve JavaScript (Vite/React) kullanılarak geliştirilen proje, daha iyi performans, SEO ve modüler bir yapı elde etmek amacıyla **Next.js** altyapısına geçirilmiştir. Sitenin eski statik versiyonu, referans olması açısından `old_site` klasörü altında saklanmaktadır.

## Kullanılan Teknolojiler

- **Next.js** - React tabanlı framework
- **React 19** - UI kütüphanesi
- **Zustand** - Global state yönetimi

## Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda denemek isterseniz adımlar oldukça basit:

1. Repoyu bilgisayarınıza indirdikten sonra, proje klasörüne girin ve bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek siteyi görebilirsiniz.

## Klasör Yapısı

- `src/` - Next.js sayfaları, React bileşenleri (components) ve uygulamanın ana kodları burada yer alır.
- `public/` - Resimler ve fontlar gibi statik dosyalar.
- `old_site/` - Projenin eski HTML/CSS tabanlı versiyonu.

*Projeyle ilgili geliştirmeler devam ediyor.*
