<template>
  <v-app-bar app color="white" elevation="1" height="80" class="px-4">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row align="center" no-gutters>
        <!-- Hamburger (Mobile) -->
        <v-col cols="auto" class="d-flex align-center">
          <v-btn icon v-if="isMobile" @click="drawer = true" aria-label="Menüyü Aç">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>

        <!-- Logo (Ortada mobilde, solda masaüstünde) -->
        <v-col cols="auto" class="logo-col ml-auto">
          <h1 @click="navigateTo('/')" class="logo-text">takasimo</h1>
        </v-col>

        <!-- Arama (Sadece masaüstü) -->
        <v-col v-if="!isMobile" class="search-col">
          <v-text-field
            variant="outlined"
            placeholder="marka, ürün adı, kategori arayın"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            hide-details
            rounded="xl"
            class="search-field"
            style="max-width: 500px"
          />
        </v-col>

        <!-- Sağ Alan (Sadece masaüstü) -->
        <v-col v-if="!isMobile" cols="auto" class="d-flex align-center ga-4 right-col">
          <v-btn
            color="#8B2865"
            variant="flat"
            rounded="xl"
            size="large"
            prepend-icon="mdi-plus"
            class="text-white font-weight-medium px-6"
          >
            İlan Ver
          </v-btn>
          <div class="d-flex align-center ga-2 user-profile" @click="navigateTo('login')">
            <v-avatar size="40" color="#8B2865">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
            <div class="d-flex align-center">
              <span class="text-body-1 font-weight-medium mr-1">Giriş yapın</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Drawer (Mobile) -->
  <v-navigation-drawer v-model="drawer" temporary left class="mobile-drawer" style="z-index: 2000">
    <div class="pa-4">
      <!-- User Profile -->
      <div class="d-flex align-center ga-2 mb-6">
        <v-avatar size="40" color="#8B2865">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>
        <div class="d-flex align-center">
          <span class="text-body-1 font-weight-medium mr-1">Zeynep Tektaş</span>
          <v-icon size="20" color="#8B2865">mdi-chevron-down</v-icon>
        </div>
      </div>
      <!-- Menü Linkleri (örnek) -->
      <v-list nav dense>
        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>Ana Sayfa</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </template>
          <v-list-item-title>İlanlarım</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const drawer = ref(false)
const isMobile = ref(false)
const { router } = useRouter()

const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 960
  }
}
onMounted(() => {
  checkMobile()
  if (process.client) {
    window.addEventListener('resize', checkMobile)
  }
})
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>

<style scoped>
.logo-text {
  font-family: Roboto, sans-serif;
  letter-spacing: -0.5px;
  color: #8b2865;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.logo-col {
  display: flex;
  align-items: center;
}

@media (width <= 960px) {
  .logo-col {
    justify-content: flex-end !important;
    text-align: right !important;
    margin-right: 0 !important;
    margin-left: auto !important;
  }

  .search-col,
  .right-col {
    display: none !important;
  }
}

.search-field :deep(.v-field) {
  background-color: #f5f5f5;
}

.search-field :deep(.v-field__input) {
  padding: 12px 16px;
}

.mobile-drawer {
  height: 100% !important;
  max-height: 100vh !important;
  top: 0 !important;
}

.user-profile {
  cursor: pointer;
}
</style>
