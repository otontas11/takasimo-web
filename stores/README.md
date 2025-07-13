# Store Yapısı - Nuxt 3 + Pinia

Bu proje için oluşturulan store yapısı ve kullanım örnekleri.

## 📁 Store Dosyaları

### 1. **authStore.ts** - Kimlik Doğrulama

Kullanıcı girişi, çıkışı ve oturum yönetimi.

```typescript
const authStore = useAuthStore()

// Giriş yapma
await authStore.login({ email: 'user@example.com', password: '123456' })

// Kullanıcı bilgisi
const user = authStore.getUser
const isLoggedIn = authStore.isLoggedIn

// Çıkış yapma
authStore.logout()
```

### 2. **categoriesStore.ts** - Kategori Yönetimi

Kategori verilerini yönetir.

```typescript
const categoriesStore = useCategoriesStore()

// Kategorileri yükle
await categoriesStore.fetchCategories()

// Kategorileri al
const categories = categoriesStore.getAllCategories
const mainCategories = categoriesStore.getMainCategories

// Alt kategorileri al
const subCategories = categoriesStore.getSubCategories(parentId)
```

### 3. **productsStore.ts** - Ürün Yönetimi

Ürün listesi, arama, filtreleme ve pagination.

```typescript
const productsStore = useProductsStore()

// Ürünleri yükle
await productsStore.fetchProducts()

// Öne çıkan ürünleri yükle
await productsStore.fetchFeaturedProducts()

// Ürün arama
await productsStore.searchProducts('laptop')

// Filtreleme
await productsStore.filterProducts({
  category: 'electronics',
  minPrice: 100,
  maxPrice: 1000
})

// Sayfalama
await productsStore.nextPage()
await productsStore.prevPage()
```

### 4. **cartStore.ts** - Sepet Yönetimi

Alışveriş sepeti işlemleri.

```typescript
const cartStore = useCartStore()

// Ürün ekleme
cartStore.addItem(product, 2)

// Miktar güncelleme
cartStore.updateQuantity(productId, 3)

// Ürün çıkarma
cartStore.removeItem(productId)

// Sepet bilgileri
const itemCount = cartStore.getItemCount
const totalPrice = cartStore.getTotalPrice
const isEmpty = cartStore.isEmpty

// Sipariş verme
await cartStore.checkout()
```

### 5. **appMainStore.ts** - Genel Uygulama Durumu

Tema, dil, bildirimler ve UI durumu.

```typescript
const appStore = useAppStore()

// Tema değiştirme
appStore.toggleTheme()
appStore.setTheme('dark')

// Bildirim gösterme
appStore.showSuccessMessage('İşlem başarılı!')
appStore.showErrorMessage('Hata oluştu!')

// Arama geçmişi
appStore.addToSearchHistory('laptop')
const history = appStore.getSearchHistory

// Mobil menü
appStore.toggleMobileMenu()
```

## 🚀 Kullanım Örnekleri

### Component İçinde Kullanım

```vue
<template>
  <div>
    <!-- Loading durumu -->
    <div v-if="productsStore.isLoading">Yükleniyor...</div>

    <!-- Ürün listesi -->
    <div v-else>
      <div v-for="product in products" :key="product.id">
        {{ product.name }}
        <button @click="addToCart(product)">Sepete Ekle</button>
      </div>
    </div>

    <!-- Sepet bilgisi -->
    <div class="cart-info">Sepet: {{ cartStore.getItemCount }} ürün Toplam: {{ cartStore.getTotalPrice }} TL</div>
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const cartStore = useCartStore()
const appStore = useAppStore()

// Ürünleri yükle
await productsStore.fetchProducts()

// Computed
const products = computed(() => productsStore.getAllProducts)

// Methods
const addToCart = (product) => {
  cartStore.addItem(product)
  appStore.showSuccessMessage('Ürün sepete eklendi!')
}

// Watch
watch(
  () => productsStore.getError,
  (error) => {
    if (error) {
      appStore.showErrorMessage(error)
    }
  }
)
</script>
```

### Page İçinde Kullanım

```vue
<!-- pages/products/index.vue -->
<template>
  <div>
    <h1>Ürünler</h1>

    <!-- Filtreler -->
    <div class="filters">
      <input v-model="searchQuery" @keyup.enter="search" placeholder="Ürün ara..." />
      <select v-model="selectedCategory" @change="filterByCategory">
        <option value="">Tüm Kategoriler</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.code">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Ürün listesi -->
    <ProductList :products="products" />

    <!-- Sayfalama -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="goToPage" />
  </div>
</template>

<script setup>
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')

// Computed
const products = computed(() => productsStore.getAllProducts)
const categories = computed(() => categoriesStore.getAllCategories)
const currentPage = computed(() => productsStore.getCurrentPage)
const totalPages = computed(() => productsStore.getTotalPages)

// Methods
const search = async () => {
  await productsStore.searchProducts(searchQuery.value)
}

const filterByCategory = async () => {
  await productsStore.filterProducts({ category: selectedCategory.value })
}

const goToPage = async (page) => {
  await productsStore.goToPage(page)
}

// Initialize
onMounted(async () => {
  await Promise.all([productsStore.fetchProducts(), categoriesStore.fetchCategories()])
})

// SEO
useHead({
  title: 'Ürünler - Takasimo',
  meta: [{ name: 'description', content: 'Takasimo ürünlerini inceleyin' }]
})
</script>
```

## 🔧 Özellikler

- ✅ **TypeScript desteği** (basit yaklaşım)
- ✅ **Persist edilebilir** (localStorage)
- ✅ **Reactive state management**
- ✅ **Error handling**
- ✅ **Loading states**
- ✅ **Async actions**
- ✅ **Computed getters**
- ✅ **Nuxt 3 uyumlu**

## 📝 Notlar

- Tüm store'lar basit TypeScript yaklaşımı kullanır
- API çağrıları için composable'lar kullanılır
- Persist özelliği ile veriler localStorage'da saklanır
- Error handling ve loading states dahil
- Responsive ve performanslı yapı
