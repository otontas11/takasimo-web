# 📁 Takasimo - Önerilen Dosya Yapısı

## 🎯 **Mevcut Durum ve İyileştirmeler**

### ✅ **Tamamlanan İyileştirmeler:**

- ❌ Gereksiz `server/api/categoriesApi.ts` silindi
- ✅ `composables/useProductsApi.ts` oluşturuldu
- ✅ `pages/404.vue` error sayfası eklendi
- ✅ `types/index.ts` temel type tanımları oluşturuldu

### 📂 **Önerilen Yapı:**

```
takasimo-web-nuxt3/
├── 📁 assets/
│   ├── css/
│   │   ├── main.css              ✅ Mevcut
│   │   ├── components.css        🆕 Önerilir
│   │   └── utilities.css         🆕 Önerilir
│   ├── images/
│   │   ├── logo/                 🆕 Önerilir
│   │   ├── icons/                🆕 Önerilir
│   │   └── placeholders/         🆕 Önerilir
│   └── fonts/                    🆕 Önerilir
│
├── 📁 components/
│   ├── ui/                       🆕 Önerilir
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseCard.vue
│   │   └── BaseModal.vue
│   ├── layout/                   🆕 Önerilir
│   │   ├── AppHeader.vue         ✅ Mevcut
│   │   ├── AppFooter.vue         ✅ Mevcut
│   │   └── CategoryHeader.vue    ✅ Mevcut
│   ├── product/                  🆕 Önerilir
│   │   ├── ProductCard.vue       ✅ Mevcut
│   │   ├── ProductList.vue       🆕 Önerilir
│   │   ├── ProductFilter.vue     🆕 Önerilir
│   │   └── FeaturedProducts.vue  ✅ Mevcut
│   └── category/                 🆕 Önerilir
│       ├── PopularCategories.vue ✅ Mevcut
│       └── CategoryList.vue      🆕 Önerilir
│
├── 📁 composables/
│   ├── useCategoriesApi.ts          ✅ Mevcut
│   ├── useProductsApi.ts            ✅ Yeni eklendi
│   ├── useAuthApi.ts                🆕 Önerilir
│   ├── useLocalStorage.ts        🆕 Önerilir
│   ├── useDebounce.ts            🆕 Önerilir
│   └── usePagination.ts          🆕 Önerilir
│
├── 📁 layouts/
│   ├── default.vue               ✅ Mevcut
│   ├── auth.vue                  🆕 Önerilir
│   ├── admin.vue                 🆕 Önerilir
│   └── error.vue                 🆕 Önerilir
│
├── 📁 middleware/
│   ├── authStore.ts                   🆕 Önerilir
│   ├── guest.ts                  🆕 Önerilir
│   └── admin.ts                  🆕 Önerilir
│
├── 📁 pages/
│   ├── index.vue                 ✅ Mevcut
│   ├── about.vue                 ✅ Mevcut
│   ├── 404.vue                   ✅ Yeni eklendi
│   ├── 500.vue                   🆕 Önerilir
│   ├── auth/                     🆕 Önerilir
│   │   ├── login.vue
│   │   ├── register.vue
│   │   └── forgot-password.vue
│   ├── products/                 ✅ Mevcut (kısmi)
│   │   ├── index.vue             🆕 Önerilir
│   │   ├── [id].vue              🆕 Önerilir
│   │   └── create.vue            🆕 Önerilir
│   ├── categories/               🆕 Önerilir
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── profile/                  🆕 Önerilir
│   │   ├── index.vue
│   │   ├── settings.vue
│   │   └── my-products.vue
│   └── admin/                    🆕 Önerilir
│       ├── index.vue
│       ├── products.vue
│       └── categories.vue
│
├── 📁 plugins/
│   ├── vuetify.ts                🆕 Önerilir
│   ├── pinia.ts                  🆕 Önerilir
│   └── api.client.ts             🆕 Önerilir
│
├── 📁 server/
│   ├── api/
│   │   ├── useApi.ts             ✅ Mevcut
│   │   └── productsApi.ts        ✅ Mevcut
│   └── middleware/               🆕 Önerilir
│       └── cors.ts
│
├── 📁 stores/
│   ├── categoriesStore.ts             ✅ Mevcut
│   ├── productsStore.ts               ✅ Mevcut
│   ├── authStore.ts                   ✅ Mevcut
│   ├── cartStore.ts                   ✅ Mevcut
│   ├── appMainStore.ts                    ✅ Mevcut
│   └── README.md                 ✅ Mevcut
│
├── 📁 types/
│   ├── index.ts                  ✅ Yeni eklendi
│   ├── api.ts                    🆕 Önerilir
│   ├── authStore.ts                   🆕 Önerilir
│   └── components.ts             🆕 Önerilir
│
├── 📁 utils/
│   ├── getImageUrl.ts            ✅ Mevcut
│   ├── formatters.ts             🆕 Önerilir
│   ├── validators.ts             🆕 Önerilir
│   ├── constants.ts              🆕 Önerilir
│   └── helpers.ts                🆕 Önerilir
│
└── 📁 public/
    ├── images/
    │   ├── categories/           ✅ Mevcut
    │   ├── products/             🆕 Önerilir
    │   └── icons/                🆕 Önerilir
    ├── favicon.ico               🆕 Önerilir
    ├── robots.txt                🆕 Önerilir
    └── sitemap.xml               🆕 Önerilir
```

## 🚀 **Öncelikli Yapılacaklar:**

### 1. **Acil Öncelik (Bu Hafta)**

- [ ] Components'i kategorilere ayır (ui/, layout/, product/, category/)
- [ ] 500.vue error sayfası oluştur
- [ ] Basic middleware'ler ekle (auth, guest)
- [ ] Vuetify plugin'i düzenle

### 2. **Orta Öncelik (Gelecek Hafta)**

- [ ] Auth sayfaları oluştur (login, register)
- [ ] Product detail sayfası oluştur
- [ ] Profile sayfaları oluştur
- [ ] SEO optimizasyonları (robots.txt, sitemap)

### 3. **Düşük Öncelik (Gelecek Ay)**

- [ ] Admin paneli oluştur
- [ ] Advanced composables ekle
- [ ] Utility functions genişlet
- [ ] Test dosyaları ekle

## 🎯 **Faydalar:**

### ✅ **Organizasyon**

- Dosyalar kategorilere ayrılmış
- Benzer fonksiyonlar bir arada
- Kolay navigasyon

### ✅ **Ölçeklenebilirlik**

- Yeni özellikler kolayca eklenebilir
- Modüler yapı
- Yeniden kullanılabilir bileşenler

### ✅ **Maintainability**

- Kod tekrarı azaltılmış
- Standart yapı
- Kolay debug

### ✅ **Developer Experience**

- Hızlı dosya bulma
- Otomatik import'lar
- TypeScript desteği

## 📝 **Notlar:**

- ✅ = Mevcut ve iyi durumda
- 🆕 = Önerilen yeni dosya/klasör
- ❌ = Silinen/gereksiz dosya
- 🔄 = Düzenlenmesi gereken dosya

Bu yapı, modern Nuxt 3 projelerinin best practice'lerini takip eder ve projenin büyümesini destekler.
