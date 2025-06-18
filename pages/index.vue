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
// SEO ayarları
import AppFooter from "~/components/AppFooter.vue";

useHead({
  title: 'Takasimo - Güvenli Ürün Takası',
  meta: [
    {
      name: 'description',
      content: 'Ürünlerinizi güvenle takas edin. Takasimo ile yeni deneyimler yaşayın, çevreye katkıda bulunun.'
    }
  ]
})
</script>

<style scoped>
.home-page {
  /* Ana sayfa container */
  min-height: 100vh;
  padding-top: 80px; /* AppHeader için space */
  display: flex;
  flex-direction: column;
}

.page-content {
  /* İçerik alanı */
  position: relative;
  flex: 1;
}

.hero-section,
.categories-section,
.products-section {
  /* Section'lar için temel stilleri */
  position: relative;
  z-index: 1;
}

/* Hero section'ı category header'ın altına yerleştir */
.hero-section {
  margin-top: 0;
}

/* Footer section */
.products-section {
  margin-bottom: 0; /* Footer ile arasında boşluk olmasın */
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
