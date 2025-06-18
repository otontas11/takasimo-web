<template>
  <div>
    <!-- Main Header -->
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

    <!-- Category Header -->
    <div class="category-header" style="margin-top: 80px;">
      <v-container fluid class="pa-0">
        <v-row align="center" no-gutters class="px-4 py-3">
          <v-col>
            <div class="d-flex align-center justify-space-between">
              <!-- Categories -->
              <div class="d-flex align-center category-list">
                <span class="category-item font-weight-bold">Elektronik</span>
                <span class="category-item">Moda</span>
                <span class="category-item font-weight-bold">Ev/Yaşam</span>
                <span class="category-item">Vasıta</span>
                <span class="category-item font-weight-bold">Anne/Bebek</span>
                <span class="category-item">Spor/Outdoor</span>
                <span class="category-item font-weight-bold">Kozmetik/Kişisel Bakım</span>
              </div>
              
              <!-- See All Link -->
              <a href="#" class="see-all-link">
                Tümünü gör
                <v-icon size="16" class="ml-1">mdi-chevron-right</v-icon>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
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

.category-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
}

.category-list {
  gap: 2rem;
  flex-wrap: wrap;
}

.category-item {
  color: #333;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
}

.category-item:hover {
  color: #8B2865;
}

.see-all-link {
  color: #8B2865;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.2s;
}

.see-all-link:hover {
  color: #6d1e4f;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 960px) {
  .category-list {
    gap: 1rem;
  }
  
  .category-item {
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .category-list {
    gap: 0.8rem;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  
  .category-item {
    font-size: 0.85rem;
  }
}
</style> 