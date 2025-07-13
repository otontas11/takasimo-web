<template>
  <div class="popular-categories">
    <h2 class="text-h5 mb-6 text-center font-weight-bold">Popüler Kategoriler</h2>

    <!-- Skeleton Loading State -->
    <v-row v-if="isLoading" class="categories-grid">
      <v-col v-for="i in 5" :key="i" class="d-flex" cols="6" lg="2" md="3" sm="4">
        <v-card class="category-card category-card-skeleton w-100 d-flex flex-column align-center justify-center pa-4">
          <v-skeleton-loader type="image" width="120" height="90" class="mb-4" />
          <v-skeleton-loader type="text" width="100" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Categories Grid -->
    <v-row v-else-if="displayCategories.length > 0" class="categories-grid">
      <v-col v-for="category in displayCategories" :key="category.category_code" class="d-flex" cols="6" lg="2" md="3" sm="4">
        <v-card class="category-card w-100 d-flex flex-column align-center justify-center pa-4" hover @click="navigateToCategory(category)">
          <div class="category-image-container">
            <img
              :alt="category.name"
              :src="
                getImageUrl({
                  path: category.image || '/images/categories/default-category.svg',
                  provider: 'cdn'
                })
              "
              class="category-image"
              @error="onImageError"
            />
          </div>
          <h3 class="category-title">{{ truncateText(category.name, 15) }}</h3>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { getImageUrl } from '~/utils/getImageUrl'

// ✅ PROPS - Index.vue'den gelen veri
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Computed properties for template
const isLoading = computed(() => props.loading)

// Computed properties
const displayCategories = computed(() => {
  if (!props.categories || props.categories.length === 0) return []

  // Kısa isimleri tercih et
  const shortCategories = props.categories.filter((cat) => cat.name && cat.name.length <= 15)

  // Yeterli kısa kategori varsa onları kullan, yoksa tümünden al
  const selectedCategories = shortCategories.length >= 5 ? shortCategories : props.categories

  return selectedCategories.slice(0, 5)
})

// Methods
const navigateToCategory = (category) => {
  const slug = category.category_code || category.id?.toString()
  navigateTo(`/kategori/${slug}`)
}

const truncateText = (text, maxLength = 15) => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
}

const onImageError = (event) => {
  event.target.src = '/images/categories/default-category.svg'
}

// SEO
useHead({
  title: 'Popüler Kategoriler - Takasimo',
  meta: [
    {
      name: 'description',
      content: "Takasimo'da en popüler kategorileri keşfedin. Elektronik, moda, ev yaşam ve daha fazlası."
    }
  ]
})
</script>

<style scoped>
.category-card {
  background-color: #fff !important;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px !important;
  box-shadow: 0 2px 12px rgb(0 0 0 / 8%);
}

.category-card:hover {
  border-color: #8b2865;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(139 40 101 / 15%) !important;
}

.category-image-container {
  width: 120px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.category-card:hover .category-image-container {
  transform: scale(1.02);
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.category-title {
  color: #2c3e50;
  font-size: 1rem !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
  text-align: center;
  margin: 0;
  padding: 0 8px;
}

.category-card:hover .category-title {
  color: #8b2865;
}

.category-card-skeleton {
  height: 160px !important;
}

/* Mobile responsive adjustments */
@media (width <= 959px) {
  .category-card {
    min-height: 140px;
  }

  .category-card-skeleton {
    min-height: 140px !important;
  }

  .category-card-skeleton .v-skeleton-loader:first-child {
    width: 100px !important;
    height: 75px !important;
  }

  .category-image-container {
    width: 100px;
    height: 75px;
    margin-bottom: 12px;
  }

  .category-title {
    font-size: 0.9rem !important;
  }
}

@media (width <= 599px) {
  .category-card {
    min-height: 120px;
  }

  .category-card-skeleton {
    min-height: 120px !important;
  }

  .category-card-skeleton .v-skeleton-loader:first-child {
    width: 80px !important;
    height: 60px !important;
  }

  .category-image-container {
    width: 80px;
    height: 60px;
    margin-bottom: 10px;
  }

  .category-title {
    font-size: 0.85rem !important;
    line-height: 1.2 !important;
  }
}

/* Extra small screens */
@media (width <= 400px) {
  .category-card {
    min-height: 100px;
    padding: 0.75rem !important;
  }

  .category-card-skeleton {
    min-height: 100px !important;
    padding: 0.75rem !important;
  }

  .category-card-skeleton .v-skeleton-loader:first-child {
    width: 70px !important;
    height: 50px !important;
  }

  .category-image-container {
    width: 70px;
    height: 50px;
    margin-bottom: 8px;
  }

  .category-title {
    font-size: 0.8rem !important;
  }
}
</style>
