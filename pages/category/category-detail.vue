<template>
  <v-main class="category-detail-page">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row>
        <!-- Left Sidebar - Filters -->
        <v-col class="sidebar-col" cols="12" md="3">
          <CategoryFilters ref="categoryFiltersRef"/>
        </v-col>

        <!-- Right Content - Products -->
        <v-col class="content-col" cols="12" md="9">
          <!-- Header with results count and sort -->
          <div class="content-header">
            <div class="results-info">
              <span class="results-text">
                Bu kategoride toplam
                <strong>{{ totalResults }}</strong> ilan bulundu
              </span>
            </div>
            <div class="sort-section">
              <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  class="sort-select"
                  density="compact"
                  hide-details
                  item-title="title"
                  item-value="value"
                  label="Gelişmiş Sıralama"
                  prepend-inner-icon="mdi-sort-variant"
                  variant="outlined"
                  @update:model-value="onSortChange"
              />
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-cards">
            <FeaturedProducts :products="products" @loadMore="handleLoadMore" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import CategoryFilters from '~/components/CategoryFilters.vue'

// Sample data
const productsStore = useProductsStore()
const route = useRoute()

// Reactive data
const loading = ref(false)
const sortBy = ref('date_desc')
const currentPage = ref(1)
const categoryFiltersRef = ref()

const currentCategory = ref<any>(null)

const categoryName = computed(() => {
  return currentCategory.value?.name || 'Kategori'
})

const totalResults = computed(() => {
  return productsStore.totalProducts || 0
})

const products = computed(() => productsStore.getAllProducts)

const sortOptions = [
  {title: 'Tarihe göre sırala (Önce en yeni)', value: 'date_desc', key: 'date', order: 'DESC'},
  {title: 'Tarihe göre sırala (Önce en eski)', value: 'date_asc', key: 'date', order: 'ASC'},
  {title: 'Fiyata göre sırala (Önce en yüksek)', value: 'price_desc', key: 'price', order: 'DESC'},
  {title: 'Fiyata göre sırala (Önce en düşük)', value: 'price_asc', key: 'price', order: 'ASC'}
]

const onSortChange = async () => {
  // Sıralama değiştiğinde store üzerinden işlem yap
  try {
    // Seçilen seçeneği bul
    const selectedOption = sortOptions.find(option => option.value === sortBy.value)

    if (selectedOption) {
      // Store üzerinden sıralama uygula
      await productsStore.applySort(selectedOption.key as 'date' | 'price', selectedOption.order as 'ASC' | 'DESC')
    }
  } catch (error) {
    console.error('Sort change error:', error)
  }
}

// ✅ LOAD MORE - FeaturedProducts'dan gelen event ile sayfa yükle
const handleLoadMore = async () => {
  currentPage.value++
  await productsStore.fetchFilteredProducts(currentPage.value)
}

// Watch for sort changes
watch(sortBy, async (newSort) => {
  // Sıralama değiştiğinde ürünleri yeniden yükle
  currentPage.value = 1
  // Store'da sıralama zaten uygulanıyor, sadece sayfa sıfırla
})

// Initialize
onMounted(async () => {
  loading.value = true

  try {
    // Default filtrelerle ilk isteği at
    const defaultFilters = {
      categoryCode: String(route.params.id),
      selectedCities: [],
      selectedDistricts: [],
      swap: '',
      priceRange: {min: null, max: null},
      dateSort: 'DESC',
      priceSort: ''
    }

    // Store'a default filtreleri set et ve istek at
    productsStore.setFilters(defaultFilters)
    await productsStore.fetchFilteredProducts(1)

  } catch (error) {
    console.error('Initial load error:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.category-detail-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar-col {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.content-col {
  padding-left: 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

.results-text {
  font-size: 1rem;
  color: #333;
}

.results-text strong {
  color: #8b2865;
  font-weight: 600;
}

.sort-select {
  min-width: 200px;
}

@media (max-width: 768px) {
  .content-col {
    padding-left: 0;
    padding-top: 20px;
  }

  .content-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .sort-select {
    min-width: 100%;
  }

  .sidebar-col {
    position: static;
    margin-bottom: 20px;
  }
}
</style>