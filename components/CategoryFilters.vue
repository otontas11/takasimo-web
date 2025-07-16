<template>
  <div class="category-filters">
    <!-- Header -->
    <div class="filters-header">
      <h2> {{ subCategories[0]?.parent?.name }} </h2>
    </div>

    <!-- Categories Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('subCategories')">
        <span>Kategoriler</span>
        <v-icon :class="{ 'rotate': !sections.subCategories }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.subCategories" class="section-content">
        <div v-for="category in subCategories" :key="category.id" class="category-item">
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
            :items="districts"
            class="mb-3"
            density="compact"
            label="İlçe seçin"
            variant="outlined"
            item-title="name"
            item-value="id"
        />
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
      </div>
    </div>

    <!-- Exchange Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('exchange')">
        <span>Takas</span>
        <v-icon :class="{ 'rotate': !sections.exchange }">mdi-chevron-up</v-icon>
      </div>
      <div v-show="sections.exchange" class="section-content">
        <v-radio-group v-model="filters.exchange" density="compact">
          <v-radio label="Tümü" value="all"/>
          <v-radio label="Var" value="yes"/>
          <v-radio label="Yok" value="no"/>
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
            density="compact"
            label="Kelime ara"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
        />
      </div>
    </div>

    <v-btn @click="submitSearch">Search</v-btn>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useCategoriesApi} from "~/composables/api/useCategoriesApi";
import {useLocationApi} from "~/composables/api/useLocationApi";
import {useProductsStore} from "~/stores/productsStore";

const route = useRoute()
const subCategories = ref<any[]>([])

const {getSubCategoriesById} = useCategoriesApi()
const {getCities,getDistricts}=useLocationApi()
const productsStore = useProductsStore()

const categoryId = computed(() => route.params.id)

const sections = reactive({
  subCategories: true,
  location: true,
  price: true,
  exchange: true,
  keyword: true
})

const data = reactive({
  categoryCode: '',
  selectedCities: [] as number[],
  selectedDistricts: [] as number[],
  swap: '' as string | boolean,
  priceRange: { min: null as string | number | null, max: null as string | number | null },
  dateSort: 'desc' as string,
  priceSort: '' as string
})

const filters = reactive({
  province: null,
  district: null,
  minPrice: null,
  maxPrice: null,
  exchange: 'all',
  keyword: ''
})

const provinces = ref([])
const districts = ref([])


// Initialize
onMounted(async () => {

  try {
    // Alt kategorileri al
    const subCategoriesResponse = await getSubCategoriesById(categoryId.value)

    if (subCategoriesResponse && (subCategoriesResponse as any).data) {
      subCategories.value = (subCategoriesResponse as any).data
    }
    
    const cities=await getCities()
    provinces.value = (cities as any)?.data ||[]

  } catch (error) {
    console.error('Initial load error:', error)
  }
})

// Province değiştiğinde çağrılacak fonksiyon
const onProvinceChange = (provinceId: any) => {
  // District'i sıfırla
  filters.district = null
  districts.value = []
  
  // Eğer province seçildiyse ilçeleri getir
  if (provinceId) {
    loadDistricts(provinceId)
  }
}

// İlçeleri yükle
const loadDistricts = async (provinceId: any) => {
  try {
    const districtsResponse = await getDistricts(provinceId)
    districts.value = (districtsResponse as any)?.data || []
  } catch (error) {
    console.error('Error loading districts:', error)
    districts.value = []
  }
}

const toggleSection = (section: keyof typeof sections) => {
  sections[section] = !sections[section]
}


const submitSearch = () => {
  // Category code - route'dan al
  data.categoryCode = String(categoryId.value)
  
  // Selected cities - filters.province'den al
  if (filters.province) {
    data.selectedCities = [filters.province]
  } else {
    data.selectedCities = []
  }
  
  // Selected districts - filters.district'den al
  if (filters.district) {
    data.selectedDistricts = [filters.district]
  } else {
    data.selectedDistricts = []
  }
  
  // Swap filter - filters.exchange'den al
  if (filters.exchange === 'yes') {
    data.swap = true
  } else if (filters.exchange === 'no') {
    data.swap = false
  } else {
    data.swap = ''
  }
  
  // Price range - filters.minPrice ve filters.maxPrice'den al
  data.priceRange.min = filters.minPrice
  data.priceRange.max = filters.maxPrice
  
  // Keyword - filters.keyword'den al (eğer API destekliyorsa)
  
  console.log('Search data:', data)
  
  productsStore
    .fetchFilteredProducts(1, data)
    .then(res => {
      console.log("Filtered products response:", res)
    })
    .catch(error => {
      console.error("Error fetching filtered products:", error)
    })
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