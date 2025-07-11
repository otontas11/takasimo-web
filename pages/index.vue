<!-- pages/index.vue -->
<template>
  <v-main class="home-page">
    <!-- Category Header (Sticky Navigation) -->
    <CategoryHeader />
    
    <!-- Page Content -->
    <div class="page-content">
      <!-- Hero Slider -->
      <section class="hero-section">
        <HeroSlider />
      </section>
      
      <!-- Popular Categories -->
      <section class="categories-section">
        <v-container>
          <PopularCategories />
        </v-container>
      </section>
      
      <!-- Featured Products -->
      <section class="products-section">
        <v-container>
          <FeaturedProducts />
        </v-container>
      </section>
      
      <!-- Footer -->
      <AppFooter />
    </div>
  </v-main>
</template>

<script setup lang="ts">
import AppFooter from "~/components/AppFooter.vue";

// ✅ STORE YAKLAŞIMI - Store'lara istek at
const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()

// Store'lardan veri al
const categories = computed(() => categoriesStore.getAllCategories)
const products = computed(() => productsStore.getFeaturedProducts)
const isLoading = computed(() => categoriesStore.isLoading || productsStore.isLoading)
const hasError = computed(() => categoriesStore.getError || productsStore.getError)

// SSR'da store'lara istek at
if (process.server) {
  // Server-side: Store'lar composable'ları kullanacak
  await Promise.all([
    categoriesStore.fetchCategories(),
    productsStore.fetchFeaturedProducts()
  ])
} else {
  // Client-side: Eğer veri yoksa yükle
  onMounted(async () => {
    if (categories.value.length === 0) {
      await categoriesStore.fetchCategories()
    }
    if (products.value.length === 0) {
      await productsStore.fetchFeaturedProducts()
    }
  })
}

// Veriyi template'e provide et
provide('categories', categories)
provide('products', products)
provide('isLoading', isLoading)
provide('hasError', hasError)

// SEO
useHead({
  title: 'Takasimo - Güvenli Ürün Takası',
  meta: [
    {
      name: 'description',
      content: 'Ürünlerinizi güvenle takas edin. Takasimo ile yeni deneyimler yaşayın, çevreye katkıda bulunun.'
    },
    {
      name: 'keywords',
      content: 'takas, ürün takası, ikinci el, sürdürülebilir, çevre dostu'
    }
  ]
})
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.v-icon {
  transition: transform 0.3s ease;
}

.v-card:hover .v-icon {
  transform: scale(1.1);
}
</style>
