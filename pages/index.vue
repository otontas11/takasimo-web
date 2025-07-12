<!-- pages/index.vue -->
<template lang="pug">
v-main.home-page
  //- Category Header (Sticky Navigation)
  CategoryHeader
  
  .page-content
    section.hero-section
      HeroSlider
    
    section.categories-section
      v-container
        PopularCategories(
          :categories="allCategories"
          :loading="categoriesStore.isLoading"
          :error="categoriesStore.getError"
          @refresh="categoriesStore.fetchCategories"
        )
    
    section.products-section
      v-container
        FeaturedProducts
    
    AppFooter
</template>

<script setup lang="ts">
import AppFooter from "~/components/AppFooter.vue";

// ✅ STORE YAKLAŞIMI - Store'lara istek at
const categoriesStore = useCategoriesStore()
//const productsStore = useProductsStore()

// Store'lardan veri al
const allCategories = computed(() => categoriesStore.getAllCategories)
//const products = computed(() => productsStore.getFeaturedProducts)


await useAsyncData('init-home', () => {
  return Promise.all([
    categoriesStore.fetchCategories(),
    //productsStore.fetchFeaturedProducts()
  ])
})


onMounted(async () => {
  if (!allCategories.value.length) await categoriesStore.fetchCategories()
  //if (!products.value.length) await productsStore.fetchFeaturedProducts()
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
