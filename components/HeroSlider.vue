<template>
  <v-carousel
    height="200"
    hide-delimiter-background
    show-arrows="hover"
    cycle
    interval="5000"
    class="hero-slider"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.background"
      cover
      class="hero-slide"
    >
      <div class="hero-content">
        <v-container fluid class="fill-height">
          <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" md="6" class="text-center text-md-left">
              <div class="hero-text">
                <h1 class="hero-title mb-4">
                  {{ slide.title }}
                </h1>
                <p class="hero-subtitle mb-6">
                  {{ slide.subtitle }}
                </p>
                <v-btn
                  :color="slide.buttonColor || 'primary'"
                  size="large"
                  rounded
                  class="hero-button px-8 py-3"
                  elevation="2"
                >
                  {{ slide.buttonText }}
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="text-center" v-if="slide.image">
              <div class="hero-image">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="phone-mockup"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
interface Slide {
  title: string
  subtitle: string
  buttonText: string
  buttonColor?: string
  background: string
  image?: string
}

const slides: Slide[] = [
  {
    title: "İlanını öne çıkar, daha fazla kişiye ulaş!",
    subtitle: "Daha geniş bir kitleye tanıtır ve hızla yeni sahipler bulmanıza yardımcı olur!",
    buttonText: "Planları İncele",
    buttonColor: "#8B2865",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    image: "/images/phone-mockup.svg"
  },
  {
    title: "Güvenli Takas İmkanı",
    subtitle: "Ürünlerinizi güvenle takas edin, yeni deneyimler yaşayın!",
    buttonText: "Hemen Başla",
    buttonColor: "#8B2865",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "Hızlı ve Kolay",
    subtitle: "Sadece birkaç dakikada ürününüzü listeleyin ve takas tekliflerini alın!",
    buttonText: "İlan Ver",
    buttonColor: "#8B2865",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  }
]
</script>

<style scoped>
.hero-slider {
  border-radius: 0 !important;
  overflow: hidden;
}

.hero-slide {
  position: relative;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 40, 101, 0.8) 0%, rgba(139, 40, 101, 0.6) 100%);
  display: flex;
  align-items: center;
  z-index: 1;
}

.hero-text {
  color: white;
  max-width: 600px;
}

.hero-title {
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.hero-button {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s ease !important;
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 40, 101, 0.4) !important;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.phone-mockup {
  max-width: 150px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 959px) {
  .hero-title {
    font-size: 1.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.9rem !important;
  }
  
  .hero-text {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .phone-mockup {
    max-width: 120px;
  }
}

@media (max-width: 599px) {
  .hero-title {
    font-size: 1.25rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.85rem !important;
  }
  
  .phone-mockup {
    max-width: 100px;
  }
}

/* Carousel Navigation Styling */
:deep(.v-carousel__controls) {
  background: rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-carousel__controls .v-btn) {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
}

:deep(.v-carousel__controls .v-btn--active) {
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-color: rgba(255, 255, 255, 1) !important;
}

:deep(.v-carousel__prev),
:deep(.v-carousel__next) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 50% !important;
}

:deep(.v-carousel__prev:hover),
:deep(.v-carousel__next:hover) {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
</style> 