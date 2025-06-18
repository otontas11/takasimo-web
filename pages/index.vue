<!-- pages/index.vue -->
<template>
  <div>
    <!-- Hero Slider -->
    <HeroSlider />
    
    <!-- Ana İçerik -->
    <v-container class="py-12">
      <!-- Öne Çıkan Özellikler -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 font-weight-bold mb-4">Neden Takasimo?</h2>
          <p class="text-h6 text-grey-darken-1 mb-8">
            Ürün takasını güvenli ve kolay hale getiriyoruz
          </p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="4" class="text-center">
          <v-card flat class="pa-6" elevation="0">
            <v-icon size="64" color="primary" class="mb-4">mdi-shield-check</v-icon>
            <h3 class="text-h6 font-weight-bold mb-3">Güvenli Takas</h3>
            <p class="text-body-1">
              Tüm takaslar güvenli sistem üzerinden gerçekleşir. 
              Dolandırıcılık riskini minimuma indiriyoruz.
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center">
          <v-card flat class="pa-6" elevation="0">
            <v-icon size="64" color="primary" class="mb-4">mdi-lightning-bolt</v-icon>
            <h3 class="text-h6 font-weight-bold mb-3">Hızlı Eşleşme</h3>
            <p class="text-body-1">
              Gelişmiş algoritma ile ürününüze uygun takas tekliflerini 
              hızlıca bulun ve eşleşin.
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center">
          <v-card flat class="pa-6" elevation="0">
            <v-icon size="64" color="primary" class="mb-4">mdi-earth</v-icon>
            <h3 class="text-h6 font-weight-bold mb-3">Çevre Dostu</h3>
            <p class="text-body-1">
              Ürünleri yeniden kullanıma kazandırarak çevreye 
              katkıda bulunun ve sürdürülebilir yaşamı destekleyin.
            </p>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- CTA Section -->
      <v-row class="mt-12">
        <v-col cols="12" class="text-center">
          <v-card 
            color="primary" 
            class="pa-8" 
            rounded="lg"
            elevation="4"
          >
            <h3 class="text-h5 font-weight-bold text-white mb-4">
              Hemen Başlayın!
            </h3>
            <p class="text-h6 text-white mb-6 opacity-90">
              İlk takas deneyiminizi yaşamak için ürününüzü listeleyin
            </p>
            <v-btn
              size="large"
              color="white"
              class="text-primary font-weight-bold px-8"
              rounded
              elevation="2"
            >
              İlan Ver
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
