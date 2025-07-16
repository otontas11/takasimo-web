<template>
  <v-main class="category-detail-page">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row>
        <!-- Left Sidebar - Filters -->
        <v-col class="sidebar-col" cols="12" md="3">
          <CategoryFilters />
        </v-col>

        <!-- Right Content - Products -->
        <v-col class="content-col" cols="12" md="9">
          <!-- Header with results count and sort -->
          <div class="content-header">
            <div class="results-info">
              <span class="results-text">
                İkinci El {{ categoryName }} kategorisinde 
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
                  label="Gelişmiş Sıralama"
                  prepend-inner-icon="mdi-sort-variant"
                  variant="outlined"
              />
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-cards">
            <FeaturedProducts :products="products" />
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreProducts" class="load-more-section">
            <v-btn
                :loading="loading"
                class="load-more-btn"
                color="primary"
                size="large"
                variant="outlined"
                @click="loadMoreProducts"
            >
              Daha Fazla Yükle
            </v-btn>
          </div>

          <!-- No Results -->
          <div v-if="!loading && products.length === 0" class="no-results">
            <v-icon class="mb-4" color="grey-lighten-1" size="64">mdi-package-variant</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Ürün bulunamadı</h3>
            <p class="text-body-2 text-grey">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import CategoryFilters from '~/components/CategoryFilters.vue'
-
// Sample data
const productsStore = useProductsStore()

// Reactive data
const loading = ref(false)
const sortBy = ref('date_desc')
const currentPage = ref(1)
const hasMoreProducts = ref(true)

const currentCategory = ref<any>(null)

const categoryName = computed(() => {
  return currentCategory.value?.name || 'Kategori'
})

const totalResults = computed(() => {
  return 293806 // Sample total count
})

const products = computed(() => productsStore.getAllProducts)

const sortOptions = [
  {title: 'Tarihe göre sırala (Önce en yeni)', value: 'date_desc'},
  {title: 'Tarihe göre sırala (Önce en eski)', value: 'date_asc'},
  {title: 'Fiyata göre sırala (Önce en yüksek)', value: 'price_desc'},
  {title: 'Fiyata göre sırala (Önce en düşük)', value: 'price_asc'}
]

const loadMoreProducts = async () => {
  if (loading.value) return

  loading.value = true
  currentPage.value++

  try {
    // await productsStore.fetchProducts(currentPage.value) // Original line commented out
    // Eğer daha fazla ürün yoksa hasMoreProducts'ı false yap
    // if (productsStore.getAllProducts.length >= productsStore.totalItems) { // Original line commented out
    //   hasMoreProducts.value = false
    // }
  } catch (error) {
    console.error('Load more products error:', error)
  } finally {
    loading.value = false
  }
}

// Watch for sort changes
watch(sortBy, async (newSort) => {
  // Sıralama değiştiğinde ürünleri yeniden yükle
  currentPage.value = 1
  hasMoreProducts.value = true
  // await productsStore.fetchProducts(1) // Original line commented out
})

// Initialize
onMounted(async () => {
  loading.value = true

  try {
    console.log("")
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

.load-more-section {
  display: flex;
  justify-content: center;
  margin: 32px 0;
}

.load-more-btn {
  min-width: 200px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  text-align: center;
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