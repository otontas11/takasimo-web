<!-- pages/index.vue -->
<template>
  <div class="home-page">
    <!-- Hero Slider -->
    <div class="hero-section">
      <HeroSlider />
    </div>
    
    <!-- Popular Categories -->
    <PopularCategories />
    
    <!-- Featured Products -->
    <FeaturedProducts />
    

  </div>
</template>

<script setup lang="ts">
// SEO ayarları
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
  margin-top: -140px;
}

.hero-section {
  position: relative;
  z-index: 1;
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
