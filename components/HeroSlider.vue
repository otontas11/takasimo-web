<template>
  <div class="hero-slider">
    <div class="carousel-wrapper">
      <button class="carousel-arrow left" @click="prevSlide" aria-label="Önceki">
        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <img :src="slides[current]" class="slider-image" />
      <button class="carousel-arrow right" @click="nextSlide" aria-label="Sonraki">
        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </button>
    </div>
    <div class="carousel-dots">
      <span v-for="(slide, i) in slides" :key="i" :class="['dot', { active: i === current }]" @click="goTo(i)"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const slides = [
  '/images/banner/1.png',
  '/images/banner/2.png'
]
const current = ref(0)
const nextSlide = () => {
  current.value = (current.value + 1) % slides.length
}
const prevSlide = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
}
const goTo = (i) => {
  current.value = i
}
</script>

<style scoped>
.hero-slider {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 6%);
  overflow: hidden;
  position: relative;
  padding: 0;
}
.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.slider-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
  background: #f8f9fa;
  border-radius: 0;
  transition: box-shadow 0.2s;
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 1.5px solid #eee;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: #8B2865;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  outline: none;
  border: none;
}
.carousel-arrow.left {
  left: 12px;
}
.carousel-arrow.right {
  right: 12px;
}
.carousel-arrow:hover {
  background: #8B2865;
  color: #fff;
  box-shadow: 0 4px 16px rgb(139 40 101 / 18%);
}
.carousel-arrow svg {
  fill: currentColor;
}
.carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 8px 0;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.active {
  background: #8B2865;
}
@media (max-width: 600px) {
  .hero-slider {
    max-width: 100vw;
    border-radius: 0;
  }
  .slider-image {
    max-height: 180px;
  }
  .carousel-arrow {
    width: 32px;
    height: 32px;
  }
  .carousel-arrow.left {
    left: 4px;
  }
  .carousel-arrow.right {
    right: 4px;
  }
}
</style>
