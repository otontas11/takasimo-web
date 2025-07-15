<template>
  <v-main class="category-detail-page">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row>
        <!-- Left Sidebar - Filters -->
        <v-col cols="12" md="3" class="sidebar-col">
          <CategoryFilters :categories="subCategories" />
        </v-col>

        <!-- Right Content - Products -->
        <v-col cols="12" md="9" class="content-col">
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
                label="Akıllı Sıralama"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-sort-variant"
                hide-details
                class="sort-select"
              />
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @favorite="handleFavorite"
            />
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreProducts" class="load-more-section">
            <v-btn
              color="primary"
              variant="outlined"
              size="large"
              :loading="loading"
              @click="loadMoreProducts"
              class="load-more-btn"
            >
              Daha Fazla Yükle
            </v-btn>
          </div>

          <!-- No Results -->
          <div v-if="!loading && products.length === 0" class="no-results">
            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-package-variant</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Ürün bulunamadı</h3>
            <p class="text-body-2 text-grey">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import CategoryFilters from '~/components/CategoryFilters.vue'
import ProductCard from '~/components/ProductCard.vue'
import {useCategoriesApi} from "~/composables/api/useCategoriesApi";

// Route params
const route = useRoute()

console.log("route.params.slug",route.params)
// API
const { getCategoryById, getSubCategoriesById } = useCategoriesApi()

// Sample data
const { generateSampleProducts, generateSampleCategories } = useSampleData()

// Reactive data
const loading = ref(false)
const sortBy = ref('smart')
const currentPage = ref(1)
const hasMoreProducts = ref(true)

const subCategories = ref<any[]>([])
const currentCategory = ref<any>(null)

const categoryId = computed(()=>route.params.id)


// Sample products for demonstration
const sampleProducts = ref(generateSampleProducts())
const sampleCategories = ref(generateSampleCategories())

const categoryName = computed(() => {
  return currentCategory.value?.name || 'Kategori'
})

const totalResults = computed(() => {
  return 293806 // Sample total count
})

const products = computed(() => {
  return sampleProducts.value
})

const sortOptions = [
  { title: 'Akıllı Sıralama', value: 'smart' },
  { title: 'Fiyat (Düşükten Yükseğe)', value: 'price_asc' },
  { title: 'Fiyat (Yüksekten Düşüğe)', value: 'price_desc' },
  { title: 'Tarih (Yeniden Eskiye)', value: 'date_desc' },
  { title: 'Tarih (Eskiden Yeniye)', value: 'date_asc' }
]

// Methods
const handleFavorite = (productId: string | number) => {
  // Favori işlemi burada yapılacak
  console.log('Toggle favorite for product:', productId)
}

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
    // Alt kategorileri al
    const subCategoriesResponse = await getSubCategoriesById(categoryId.value)
    console.log("subCategoriesResponse",subCategoriesResponse)
    if (subCategoriesResponse && subCategoriesResponse.data) {
      subCategories.value = subCategoriesResponse.data
    }

    // Kategori ve ürünleri paralel olarak yükle
    // await Promise.all([ // Original line commented out
    //   categoriesStore.fetchCategories(),
    //   productsStore.fetchProducts(1)
    // ])
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
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
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .sidebar-col {
    position: static;
    margin-bottom: 20px;
  }
}
</style>