<!-- pages/index.vue -->
<template>
  <v-main class="home-page">
    <!-- Category Header (Sticky Navigation) -->
    <CategoryHeader :categories="allCategories" />

    <div class="page-content">
      <section class="hero-section">
        <HeroSlider />
      </section>

      <section class="categories-section">
        <v-container>
          <PopularCategories :categories="allCategories" :loading="categoriesStore.isLoading" />
        </v-container>
      </section>

      <section class="products-section">
        <v-container>
          <h2 class="text-h5 mb-6 text-center font-weight-bold">Öne Çıkan Ürünler</h2>
          <FeaturedProducts :products="products" @loadMore="handleLoadMore" />
        </v-container>
      </section>

      <AppFooter />
    </div>
  </v-main>
</template>

<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import PopularCategories from '~/components/populer-categories/PopularCategories.vue'

// ✅ STORE YAKLAŞIMI - Store'lara istek at
const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()

// Store'lardan veri al
const allCategories = computed(() => categoriesStore.getAllCategories)
const products = computed(() => productsStore.getAllProducts)

// ✅ SSR-SAFE - Sadece useAsyncData ile fetch yap
await useAsyncData('init-home', () => {
  return Promise.all([categoriesStore.fetchCategories(), productsStore.fetchProducts(1)])
})

onMounted(async () => {
  if (!allCategories.value.length) await categoriesStore.fetchCategories()
  if (!products.value.length) await productsStore.fetchProducts(1)
})

onUnmounted(() => {
  productsStore.clearProducts()
})

// ✅ LOAD MORE - Sonraki sayfa için ürün yükle
const handleLoadMore = async () => {
  const nextPage = productsStore.getCurrentPage + 1
  console.log('Loading page:', nextPage) // Debug için
  await productsStore.fetchProducts(nextPage)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
}

.page-content {
  position: relative;
  flex: 1;
}

.hero-section,
.categories-section,
.products-section {
  position: relative;
  z-index: 1;
}

.hero-section {
  margin-top: 0;
}

.products-section {
  margin-bottom: 0;
}

.v-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 12%) !important;
}

.v-icon {
  transition: transform 0.3s ease;
}

.v-card:hover .v-icon {
  transform: scale(1.1);
}
</style>
