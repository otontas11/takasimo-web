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
import { getImageUrl } from '~/utils/getImageUrl.js'

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
  if (slug) {
    navigateTo(`/category-detail/${slug}`)
  }
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

<style lang="scss" scoped src="./PopularCategories.scss" />
