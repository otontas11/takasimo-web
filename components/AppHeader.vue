<template>
  <v-app-bar
    app
    color="white"
    elevation="1"
    height="80"
    class="px-4"
  >
    <v-container fluid class="pa-0">
      <v-row align="center" no-gutters>
        <!-- Logo -->
        <v-col cols="auto" class="mr-8">
          <h1 class="logo-text" style="color: #8B2865; font-size: 2rem; font-weight: bold; margin: 0;">
            takasimo
          </h1>
        </v-col>

        <!-- Search Bar -->
        <v-col>
          <v-text-field
            variant="outlined"
            placeholder="marka, ürün adı, kategori arayın"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            hide-details
            rounded="xl"
            class="search-field"
            style="max-width: 500px;"
          />
        </v-col>

        <!-- Actions -->
        <v-col cols="auto" class="d-flex align-center ga-4">
          <!-- İlan Ver Button -->
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

          <!-- User Profile -->
          <div class="d-flex align-center ga-2">
            <v-avatar
              size="40"
              color="#8B2865"
            >
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
            <div class="d-flex align-center">
              <span class="text-body-1 font-weight-medium mr-1">Zeynep Tektaş</span>
              <v-icon size="20" color="#8B2865">mdi-chevron-down</v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
// Header component logic
</script>

<style scoped>
.logo-text {
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.5px;
}

.search-field :deep(.v-field) {
  background-color: #f5f5f5;
}

.search-field :deep(.v-field__input) {
  padding: 12px 16px;
}
</style> 