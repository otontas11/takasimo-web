<template>
  <v-carousel hide-delimiter-background show-arrows="hover" cycle interval="5000" class="hero-slider">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" class="hero-slide">
      <img :src="slide" class="slider-image" />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      '/images/banner/1.png',
      '/images/banner/2.png'
    ]
  }
})
</script>

<style scoped>
.hero-slider {
  border-radius: 0 !important;
  overflow: hidden;
}
.hero-slide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.slider-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}
</style>
