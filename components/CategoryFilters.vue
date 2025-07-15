<template>
  <div class="category-filters">
    <!-- Header -->
    <div class="filters-header">
      <h2> {{categories[0]?.parent?.name}} </h2>
    </div>

    <!-- Categories Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('categories')">
        <span>Kategoriler</span>
        <v-icon :class="{ 'rotate': !sections.categories }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.categories" class="section-content">
        <div v-for="category in categories" :key="category.id" class="category-item">
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- Location Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('location')">
        <span>Konum</span>
        <v-icon :class="{ 'rotate': !sections.location }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.location" class="section-content">
        <v-select
          v-model="filters.province"
          :items="provinces"
          label="İl seçin"
          variant="outlined"
          density="compact"
          class="mb-3"
        />
        <v-select
          v-model="filters.district"
          :items="districts"
          label="İlçe seçin"
          variant="outlined"
          density="compact"
          class="mb-3"
        />
        <v-btn
          color="primary"
          variant="outlined"
          size="small"
          class="w-100"
          prepend-icon="mdi-map-marker"
        >
          Mevcut konumu kullan
        </v-btn>
      </div>
    </div>

    <!-- Price Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('price')">
        <span>Fiyat</span>
        <v-icon :class="{ 'rotate': !sections.price }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.price" class="section-content">
        <div class="price-inputs">
          <v-text-field
            v-model="filters.minPrice"
            label="Min"
            variant="outlined"
            density="compact"
            type="number"
            class="mr-2"
          />
          <v-text-field
            v-model="filters.maxPrice"
            label="Maks"
            variant="outlined"
            density="compact"
            type="number"
          />
        </div>
      </div>
    </div>

    <!-- Listing Date Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('date')">
        <span>İlan Tarihi</span>
        <v-icon :class="{ 'rotate': !sections.date }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.date" class="section-content">
        <v-radio-group v-model="filters.listingDate" density="compact">
          <v-radio value="all" label="Tümü" />
          <v-radio value="24h" label="Son 24 saat" />
          <v-radio value="3d" label="Son 3 gün içinde" />
          <v-radio value="7d" label="Son 7 gün içinde" />
          <v-radio value="15d" label="Son 15 gün içinde" />
        </v-radio-group>
      </div>
    </div>

    <!-- Keyword Filter Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('keyword')">
        <span>Kelime ile Filtrele</span>
        <v-icon :class="{ 'rotate': !sections.keyword }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.keyword" class="section-content">
        <v-text-field
          v-model="filters.keyword"
          label="Kelime ara"
          variant="outlined"
          density="compact"
          prepend-inner-icon="mdi-magnify"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
  categories?: Array<{ id: string; name: string; count: number }>
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [
    { id: '1', name: 'Telefon', count: 109728 },
    { id: '2', name: 'iPhone iOS Telefon', count: 109728 },
    { id: '3', name: 'Android Telefon', count: 103933 },
    { id: '4', name: 'Telefon Aksesuarları', count: 47221 },
    { id: '5', name: 'Diğer Cep Telefonları', count: 13551 },
    { id: '6', name: 'Telefon Yedek Parçaları', count: 13332 },
    { id: '7', name: 'Telsiz & Masaüstü Telefon', count: 6071 }
  ]
})

const sections = reactive({
  categories: true,
  location: true,
  price: true,
  date: true,
  keyword: true
})

const filters = reactive({
  province: null,
  district: null,
  minPrice: null,
  maxPrice: null,
  listingDate: 'all',
  keyword: ''
})

const provinces = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']
const districts = ['Beyoğlu', 'Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar']

const toggleSection = (section: keyof typeof sections) => {
  sections[section] = !sections[section]
}
</script>

<style scoped>
.category-filters {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.filters-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-section {
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.section-header span {
  font-size: 0.95rem;
}

.section-content {
  padding-left: 8px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  cursor: pointer;
  transition: color 0.2s;
}

.category-item:hover {
  color: #8b2865;
}

.category-name {
  font-size: 0.9rem;
  color: #666;
}

.category-count {
  font-size: 0.8rem;
  color: #999;
}

.price-inputs {
  display: flex;
  gap: 8px;
}

.price-inputs .v-text-field {
  flex: 1;
}

.v-icon.rotate {
  transform: rotate(180deg);
}

.v-icon {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .category-filters {
    margin-bottom: 20px;
    max-height: none;
  }
}
</style> 