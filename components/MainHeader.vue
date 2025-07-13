<template>
  <div class="header-wrapper">
    <v-container class="pa-0" style="max-width: 1100px">
      <v-row class="align-center py-4" no-gutters>
        <!-- Logo -->
        <v-col cols="2" class="d-flex align-center">
          <span class="logo font-weight-bold" style="font-size: 2.2rem; color: #8d2065; font-family: sans-serif">takasimo</span>
        </v-col>
        <!-- Search -->
        <v-col cols="6">
          <v-text-field
            density="compact"
            hide-details
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
            placeholder="marka, ürün adı, kategori arayın"
            class="search-bar"
            style="background: #f5f5f5"
          />
        </v-col>
        <!-- Actions -->
        <v-col cols="4" class="d-flex justify-end align-center gap-4">
          <v-btn color="#8d2065" class="text-white px-6" rounded="xl" style="font-weight: 600">
            <v-icon left>mdi-plus-circle</v-icon>
            İlan Ver
          </v-btn>
          <v-avatar color="#8d2065" size="36">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          <span class="user-name ml-2" style="font-weight: 500; color: #222"
            >Zeynep Tektaş<v-icon size="16" color="#8d2065">mdi-chevron-down</v-icon></span
          >
        </v-col>
      </v-row>
      <!-- Kategoriler -->
      <v-row
        class="category-row align-center"
        no-gutters
        style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; background: #fafafa"
      >
        <v-col>
          <div class="d-flex align-center" style="gap: 28px; padding: 10px 0 6px">
            <span class="font-weight-bold">Elektronik</span>
            <span>Moda</span>
            <span class="font-weight-bold">Ev/Yaşam</span>
            <span>Vasıta</span>
            <span class="font-weight-bold">Anne/Bebek</span>
            <span>Spor/Outdoor</span>
            <span class="font-weight-bold">Kozmetik/Kişisel Bakım</span>
            <span class="see-all" style="color: #8d2065; font-weight: 400; margin-left: auto; cursor: pointer">Tümünü gör&gt;</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- Arka plan -->
    <div class="header-bg" />
  </div>
</template>

<style scoped>
.header-wrapper {
  position: relative;
  z-index: 10;
}

.header-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100px;
  background: #232222;
  z-index: -1;
}

.logo {
  letter-spacing: -1px;
}

.search-bar input {
  font-size: 1rem;
}

.category-row {
  margin-top: 0.5rem;
}

.see-all {
  font-size: 1rem;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
