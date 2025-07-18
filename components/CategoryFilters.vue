<template>
  <div class="category-filters">
    <!-- Header -->
    <div class="filters-header">
      <h2>{{ categoryTitle }}</h2>
    </div>

    <!-- Filter Sections -->
    <div v-for="section in filterSections" :key="section.key" class="filter-section">
      <div class="section-header" @click="toggleSection(section.key)">
        <span>{{ section.title }}</span>
        <v-icon :class="{ 'rotate': !sections[section.key] }">mdi-chevron-up</v-icon>
      </div>
      
      <div v-show="sections[section.key]" class="section-content">
        <!-- Categories Section -->
        <div v-if="section.key === 'subCategories'">
          <div v-for="category in subCategories" :key="category.id" class="category-item">
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>

        <!-- Location Section -->
        <div v-else-if="section.key === 'location'">
          <v-select
            v-model="filters.province"
            :items="provinces"
            class="mb-3"
            density="compact"
            label="İl seçin"
            variant="outlined"
            item-title="name"
            item-value="id"
            @update:model-value="onProvinceChange"
          />
          <v-select
            v-model="filters.district"
            class="mb-3"
            density="compact"
            label="İlçe seçin"
            variant="outlined"
            item-title="name"
            item-value="id"
          />
        </div>

        <!-- Price Section -->
        <div v-else-if="section.key === 'price'" class="price-inputs">
          <v-text-field
            v-model="filters.minPrice"
            class="mr-2"
            density="compact"
            label="Min"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="filters.maxPrice"
            density="compact"
            label="Maks"
            type="number"
            variant="outlined"
          />
        </div>

        <!-- Exchange Section -->
        <div v-else-if="section.key === 'exchange'">
          <v-radio-group v-model="filters.exchange" density="compact">
            <v-radio 
              v-for="option in exchangeOptions" 
              :key="option.value"
              :label="option.label" 
              :value="option.value"
            />
          </v-radio-group>
        </div>

        <!-- Keyword Section -->
        <div v-else-if="section.key === 'keyword'">
          <v-text-field
            v-model="filters.keyword"
            density="compact"
            label="Kelime ara"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
          />
        </div>
      </div>
    </div>

    <!-- Search Button -->
    <div class="search-section">
      <v-btn @click="submitSearch" color="primary" block :loading="isSearching">
        {{ isSearching ? 'Aranıyor...' : 'Ara' }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useCategoriesApi } from "~/composables/api/useCategoriesApi"
import { useLocationApi } from "~/composables/api/useLocationApi"
import { useProductsStore } from "~/stores/productsStore"



// Composables
const route = useRoute()
const { getSubCategoriesById } = useCategoriesApi()
const { getCities, getDistricts } = useLocationApi()
const productsStore = useProductsStore()

// Reactive data
const subCategories = ref([])
const provinces = ref([])
const districts = ref([])
const isSearching = ref(false)

// Computed properties
const categoryId = computed(() => route.params.id)
const categoryTitle = computed(() => subCategories.value[0]?.parent?.name || 'Kategoriler')

// Filter sections configuration
const filterSections = [
  { key: 'subCategories', title: 'Kategoriler' },
  { key: 'location', title: 'Konum' },
  { key: 'price', title: 'Fiyat' },
  { key: 'exchange', title: 'Takas' },
  { key: 'keyword', title: 'Kelime ile Filtrele' }
]

const exchangeOptions = [
  { label: 'Tümü', value: 'all' },
  { label: 'Var', value: 'yes' },
  { label: 'Yok', value: 'no' }
]

// Reactive state
const sections = reactive({
  subCategories: true,
  location: true,
  price: true,
  exchange: true,
  keyword: true
})

const filters = reactive({
  province: null,
  district: null,
  minPrice: null,
  maxPrice: null,
  exchange: 'all',
  keyword: ''
})

// Store'dan mevcut filtreleri al
const currentFilters = computed(() => productsStore.currentFilters)

// Methods
const toggleSection = (sectionKey) => {
  if (sectionKey in sections) {
    sections[sectionKey] = !sections[sectionKey]
  }
}

const onProvinceChange = (provinceId) => {
  // Reset district when province changes
  filters.district = null
  districts.value = []
  
  // Load districts for selected province
  if (provinceId) {
    loadDistricts(provinceId)
  }
}

const loadDistricts = async (provinceId) => {
  try {
    const response = await getDistricts(provinceId)
    districts.value = response?.data || []
  } catch (error) {
    console.error('Error loading districts:', error)
    districts.value = []
  }
}

const prepareSearchData = () => {
  return {
    categoryCode: String(categoryId.value),
    selectedCities: filters.province ? [filters.province] : [],
    selectedDistricts: filters.district ? [filters.district] : [],
    swap: filters.exchange === 'yes' ? true : filters.exchange === 'no' ? false : '',
    priceRange: {
      min: filters.minPrice,
      max: filters.maxPrice
    },
    dateSort: currentFilters.value.dateSort,
    priceSort: currentFilters.value.priceSort
  }
}

const submitSearch = async () => {
  isSearching.value = true
  
  try {
    // Prepare search data
    const searchData = prepareSearchData()
    
    console.log('Search data:', searchData)
    
    // Update store filters and execute search
    productsStore.setFilters(searchData)
    const result = await productsStore.fetchFilteredProducts(1)
    
    if (result.success) {
      console.log('Search completed successfully')
    } else {
      console.error('Search failed:', result.error)
    }
  } catch (error) {
    console.error('Error during search:', error)
  } finally {
    isSearching.value = false
  }
}

const initializeData = async () => {
  try {
    // Load subcategories
    const subCategoriesResponse = await getSubCategoriesById(categoryId.value)
    if (subCategoriesResponse && subCategoriesResponse.data) {
      subCategories.value = subCategoriesResponse.data
    }
    
    // Load cities
    const citiesResponse = await getCities()
    provinces.value = citiesResponse?.data || []
  } catch (error) {
    console.error('Initialization error:', error)
  }
}

// Lifecycle
onMounted(initializeData)

// Expose methods for parent component
defineExpose({
  submitSearch
})
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
  transition: color 0.2s ease;
}

.section-header:hover {
  color: #8b2865;
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

.price-inputs {
  display: flex;
  gap: 8px;
}

.price-inputs .v-text-field {
  flex: 1;
}

.search-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
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