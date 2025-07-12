# 🔌 API Yapısı - Takasimo

## 🎯 **Doğru API Yapısı**

### ✅ **Composables Yaklaşımı (Önerilen)**

```
📁 composables/
├── useApi.ts          # Base API logic
├── useCategoriesApi.ts   # Categories API
├── useProductsApi.ts     # Products API
├── useAuthApi.ts         # Authentication API
└── useUsers.ts        # Users API (gelecekte)
```

### ❌ **Server API Yaklaşımı (Yanlış)**

```
📁 server/api/
├── useApi.ts          # ❌ Yanlış yer
├── productsApi.ts     # ❌ Yanlış yer
└── categoriesApi.ts   # ❌ Yanlış yer
```

## 🔍 **Neden Composables?**

### ✅ **Composables Avantajları:**

1. **🔄 Universal**: Hem client hem server tarafında çalışır
2. **🚀 SSR Uyumlu**: Server-side rendering ile uyumlu
3. **🎯 Auto-import**: Nuxt otomatik olarak import eder
4. **🔧 Reaktif**: Vue 3 reactivity sistemi ile uyumlu
5. **🛡️ Type Safe**: TypeScript desteği daha iyi

### ❌ **Server API Dezavantajları:**

1. **🚫 Import Kısıtlaması**: Client tarafında import edilemez
2. **⚠️ Vite Hatası**: "Importing from server is not allowed" hatası
3. **🔒 Sadece Server**: Sadece server tarafında çalışır
4. **🐛 Hydration Sorunları**: SSR/Client arasında uyumsuzluk

## 📋 **Mevcut Yapı:**

### ✅ **Tamamlanan Düzenlemeler:**

- ✅ `composables/useApi.ts` - Base API logic
- ✅ `composables/useCategoriesApi.ts` - Categories API
- ✅ `composables/useProductsApi.ts` - Products API
- ✅ `composables/useAuthApi.ts` - Authentication API
- ❌ `server/api/useApi.ts` - Silindi
- ❌ `server/api/productsApi.ts` - Silindi
- ❌ `server/api/categoriesApi.ts` - Silindi

## 🔧 **Kullanım Örnekleri:**

### 1. **Categories API:**

```typescript
// composables/useCategoriesApi.ts
export const useCategoriesApi = () => {
    const { api } = useApi()

    const getMainCategories = () => {
        return api.get('categories', {
            params: { filter: [...], limit: 11 }
        })
    }

    return { getMainCategories }
}

// Kullanım - herhangi bir component'te
const { getMainCategories } = useCategoriesApi()
const categories = await getMainCategories()
```

### 2. **Products API:**

```typescript
// composables/useProductsApi.ts
export const useProductsApi = () => {
    const { api } = useApi()

    const getFeaturedProducts = (limit = 10) => {
        return api.get('products', {
            params: { filter: [...], limit }
        })
    }

    return { getFeaturedProducts }
}

// Kullanım - herhangi bir component'te
const { getFeaturedProducts } = useProductsApi()
const products = await getFeaturedProducts()
```

### 3. **Auth API:**

```typescript
// composables/useAuthApi.ts
export const useAuthApi = () => {
  const { api } = useApi()

  const login = (credentials) => {
    return api.post('auth/login', credentials)
  }

  return { login }
}

// Kullanım - login component'te
const { login } = useAuthApi()
const result = await login({ email, password })
```

## 🎯 **Server API Ne Zaman Kullanılır?**

### ✅ **Server API Kullanım Alanları:**

1. **🛡️ Proxy Endpoints**: External API'leri proxy etmek için
2. **🔐 Secret Keys**: API key'leri gizlemek için
3. **🔄 Data Transformation**: Server tarafında veri dönüşümü
4. **🚀 Caching**: Server-side caching implementasyonu

### 📝 **Örnek Server API:**

```typescript
// server/api/proxy-external.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // External API'ye istek at (secret key ile)
  const response = await $fetch('https://external-api.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.SECRET_API_KEY}`
    },
    query
  })

  return response
})
```

## 🚀 **Sonuç:**

### ✅ **Önerilen Yaklaşım:**

- **Composables**: Tüm API logic'i için
- **Server API**: Sadece proxy/security gerektiren durumlar için

### 🎯 **Faydalar:**

- ✅ Temiz kod yapısı
- ✅ Kolay test edilebilir
- ✅ SSR uyumlu
- ✅ Type safe
- ✅ Auto-import desteği

Bu yapı ile API istekleriniz hem client hem server tarafında sorunsuz çalışacak! 🎉
