# 🧹 Temiz Kod Örnekleri - Nuxt 3 SSR

## 🎯 **Temel Prensip: Mevcut Composable Yapısını Kullan**

### ✅ **TEMİZ KOD (Önerilen)**

```vue
<script setup>
// Basit ve temiz - mevcut composable yapısını kullan
const { data: categories } = await useLazyAsyncData('categories', () => useCategoriesApi().getMainCategories(), {
  default: () => [],
  server: true
})

const { data: products } = await useLazyAsyncData('products', () => useProductsApi().getFeaturedProducts(), {
  default: () => [],
  server: true
})
</script>
```

### ❌ **KARMAŞIK KOD (Kaçının)**

```vue
<script setup>
// Gereksiz karmaşıklık - store güncellemeleri, watchers, computed
const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()

const [
  { data: categories, pending: catPending, error: catError },
  { data: products, pending: prodPending, error: prodError }
] = await Promise.all([...])

const isLoading = computed(() => catPending.value || prodPending.value)
const hasError = computed(() => catError.value || prodError.value)

watch(categories, (newCategories) => {
  if (newCategories && newCategories.length > 0) {
    categoriesStore.setCategories(newCategories)
  }
}, { immediate: true })

// ... daha fazla karmaşık kod
</script>
```

## 📋 **Temiz Kod Örnekleri**

### 1. **Basit Sayfa (Ana Sayfa)**

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <HeroSection />
    <CategoriesSection />
    <ProductsSection />
  </div>
</template>

<script setup>
// ✅ Minimal ve temiz
const { data: categories } = await useLazyAsyncData('categories', () => useCategoriesApi().getMainCategories(), {
  default: () => [],
  server: true
})

const { data: products } = await useLazyAsyncData('products', () => useProductsApi().getFeaturedProducts(), {
  default: () => [],
  server: true
})

// SEO
useHead({
  title: 'Ana Sayfa - Takasimo',
  meta: [{ name: 'description', content: 'Takasimo ana sayfası' }]
})
</script>
```

### 2. **Dinamik Sayfa (Ürün Detay)**

```vue
<!-- pages/products/[id].vue -->
<template>
  <div>
    <!-- Loading -->
    <div v-if="pending">Yükleniyor...</div>

    <!-- Error -->
    <div v-else-if="error">Hata oluştu</div>

    <!-- Content -->
    <div v-else-if="product">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
    </div>

    <!-- Not Found -->
    <div v-else>Ürün bulunamadı</div>
  </div>
</template>

<script setup>
const route = useRoute()

// ✅ Tek istek - temiz ve basit
const {
  data: product,
  pending,
  error
} = await useLazyAsyncData(`product-${route.params.id}`, () => useProductsApi().getProductById(route.params.id), {
  default: () => null,
  server: true
})

// Dinamik SEO
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.title} - Takasimo`,
      meta: [{ name: 'description', content: product.value.description }]
    })
  }
})
</script>
```

### 3. **Bağımlı İstekler**

```vue
<script setup>
const route = useRoute()

// Ana veri
const { data: category } = await useLazyAsyncData(
  `category-${route.params.slug}`,
  () => useCategoriesApi().getCategoryBySlug(route.params.slug),
  { default: () => null, server: true }
)

// Bağımlı veri - kategori geldiğinde çalışır
const { data: products } = await useLazyAsyncData(
  `category-products-${route.params.slug}`,
  () => {
    if (!category.value?.code) return []
    return useProductsApi().getProductsByCategory(category.value.code)
  },
  {
    default: () => [],
    server: true,
    watch: [category] // category değiştiğinde yeniden çalışır
  }
)
</script>
```

### 4. **Arama Sayfası**

```vue
<!-- pages/search.vue -->
<template>
  <div>
    <input v-model="searchQuery" @input="search" placeholder="Ara..." />

    <div v-if="pending">Aranıyor...</div>
    <div v-else-if="results?.length">
      <div v-for="product in results" :key="product.id">
        {{ product.title }}
      </div>
    </div>
    <div v-else>Sonuç bulunamadı</div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q || '')

// ✅ Reaktif arama
const { data: results, pending } = await useLazyAsyncData(
  'search-results',
  () => {
    if (!searchQuery.value) return []
    return useProductsApi().searchProducts(searchQuery.value)
  },
  {
    default: () => [],
    server: true,
    watch: [searchQuery]
  }
)

// URL'i güncelle
const search = useDebounceFn(() => {
  router.push({ query: { q: searchQuery.value } })
}, 300)
</script>
```

## 🎯 **Composable Yapısı Kullanımı**

### ✅ **Mevcut Composables:**

```javascript
// composables/useCategoriesApi.ts
useCategoriesApi().getMainCategories()
useCategoriesApi().getCategoryBySlug(slug)

// composables/useProductsApi.ts
useProductsApi().getFeaturedProducts(limit)
useProductsApi().getProductsByCategory(categoryCode, limit)
useProductsApi().getProductById(id)
useProductsApi().searchProducts(query)

// composables/useAuthApi.ts
useAuthApi().login(credentials)
useAuthApi().getCurrentUser()
```

### 🎯 **Kullanım Prensipleri:**

1. **🎯 Basit Tut**: Gereksiz karmaşıklık ekleme
2. **🔄 Mevcut Yapıyı Kullan**: Composable'lar hazır
3. **📊 Minimal State**: Sadece gerekli state'leri kullan
4. **🚀 SSR First**: Server-side rendering öncelikli
5. **🧹 Temiz Kod**: Okunabilir ve maintainable

## 🚀 **Faydalar:**

### ✅ **Temiz Kod Avantajları:**

- **📖 Okunabilir**: Kod daha anlaşılır
- **🔧 Maintainable**: Kolay bakım
- **🚀 Performanslı**: Gereksiz işlemler yok
- **🎯 Focused**: Her sayfa kendi işine odaklanır
- **🔄 Reusable**: Composable'lar tekrar kullanılabilir

### ❌ **Karmaşık Kod Dezavantajları:**

- **🤯 Anlaşılmaz**: Çok fazla abstraction
- **🐛 Hata Eğilimli**: Daha fazla hata riski
- **⚡ Yavaş**: Gereksiz işlemler
- **🔄 Tekrar**: Kod tekrarı
- **🎯 Unfocused**: Çok fazla sorumluluk

## 📝 **Sonuç:**

**Mevcut composable yapısını kullanarak temiz kod yazın!**

- ✅ `useLazyAsyncData` + `useCategoriesApi()`
- ✅ `useLazyAsyncData` + `useProductsApi()`
- ✅ `useLazyAsyncData` + `useAuthApi()`

Bu yaklaşım hem performanslı hem de maintainable kod sağlar! 🎉
