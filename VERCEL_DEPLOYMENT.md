# Vercel Deployment Guide

## 🚀 Vercel'e Deploy Etme

### 1. Vercel CLI Kurulumu
```bash
npm i -g vercel
```

### 2. Proje Hazırlığı
```bash
# Dependencies yükle
npm install

# Build test et
npm run build
```

### 3. Vercel'e Deploy
```bash
# Vercel'e login ol
vercel login

# Deploy et
vercel

# Production'a deploy et
vercel --prod
```

### 4. Environment Variables (Vercel Dashboard)
Vercel dashboard'da şu environment variable'ları ekleyin:

```
NUXT_PUBLIC_API_BASE=https://ap1.takasimo.com/api
NODE_ENV=production
```

### 5. Build Settings
- **Framework Preset**: Nuxt.js
- **Build Command**: `npm run build`
- **Output Directory**: `.output`
- **Install Command**: `npm install`

### 6. Domain Ayarları
- Vercel dashboard'dan custom domain ekleyebilirsiniz
- SSL otomatik olarak aktif olacak

## 🔧 Optimizasyonlar

### Performance
- ✅ SSR aktif
- ✅ Image optimization
- ✅ Code splitting
- ✅ Caching headers

### Security
- ✅ HTTPS zorunlu
- ✅ Security headers
- ✅ XSS protection

## 📝 Notlar

1. **ESLint Hatası**: ESLint 8.x kullanıyoruz (9.x ile uyumsuzluk var)
2. **Build Time**: İlk build ~3-5 dakika sürebilir
3. **Cold Start**: Serverless functions için ilk istek yavaş olabilir

## 🐛 Sorun Giderme

### Build Hatası
```bash
# Node modules temizle
rm -rf node_modules package-lock.json
npm install
```

### ESLint Hatası
```bash
# ESLint cache temizle
npm run lint:fix
```

### Vercel Build Logs
Vercel dashboard'dan build loglarını kontrol edin.

## 📞 Destek
Sorun yaşarsanız:
1. Vercel build loglarını kontrol edin
2. Local build test edin: `npm run build`
3. Environment variables'ları kontrol edin 