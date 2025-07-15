# Takasimo Web - Nuxt 3

İkinci el alışveriş platformu - Nuxt 3 ile geliştirilmiş modern web uygulaması.

## 🚀 Özellikler

- **Modern UI/UX**: Vuetify 3 ile tasarlanmış responsive arayüz
- **SSR**: Server-side rendering ile SEO optimizasyonu
- **TypeScript**: Tip güvenliği
- **Pinia**: State management
- **API Integration**: RESTful API entegrasyonu
- **Responsive Design**: Mobil ve desktop uyumlu

## 📦 Kurulum

```bash
# Dependencies yükle
npm install --legacy-peer-deps

# Development server başlat
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🌐 Vercel Deployment

### Otomatik Deploy
1. GitHub'a push edin
2. [Vercel](https://vercel.com)'e gidin
3. "New Project" → GitHub repo'nuzu seçin
4. Framework: **Nuxt.js** seçin
5. Deploy edin

### Manuel Deploy
```bash
# Vercel CLI kur
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables
Vercel dashboard'da şu değişkenleri ekleyin:
```
NUXT_PUBLIC_API_BASE=https://ap1.takasimo.com/api
NODE_ENV=production
```

## 🏗️ Proje Yapısı

```
├── components/          # Vue bileşenleri
├── pages/              # Sayfa bileşenleri
├── stores/             # Pinia store'ları
├── composables/        # Composables
├── assets/             # Statik dosyalar
├── public/             # Public dosyalar
└── utils/              # Yardımcı fonksiyonlar
```

## 🔧 Teknolojiler

- **Nuxt 3**: Vue.js framework
- **Vuetify 3**: UI component library
- **Pinia**: State management
- **TypeScript**: Type safety
- **Vercel**: Hosting platform

## 📱 Sayfalar

- `/` - Ana sayfa
- `/category-detail/:slug` - Kategori detay
- `/product-detail/:id` - Ürün detay
- `/login` - Giriş
- `/signup` - Kayıt

## 🎨 Tasarım

- Modern ve temiz arayüz
- Responsive tasarım
- Material Design prensipleri
- Kullanıcı dostu navigasyon

## 🚀 Performance

- SSR ile hızlı yükleme
- Code splitting
- Image optimization
- Caching strategies

## 📄 Lisans

MIT License
