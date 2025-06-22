<template>
  <div class="py-8 py-md-16">
    <v-row>
      <v-col cols="12" class="text-center mb-4 mb-md-8">
        <h2 class="text-h5 text-md-h4 font-weight-bold">Popüler Kategoriler</h2>
      </v-col>
    </v-row>
    
    <!-- Loading State -->
    <v-row v-if="pending" justify="center">
      <v-col
        v-for="n in 5"
        :key="n"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="2"
        class="text-center"
      >
        <v-card
          class="category-card pa-3 pa-md-4"
          elevation="0"
          rounded="xl"
        >
          <v-skeleton-loader
            type="avatar, text"
            class="mx-auto"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-else-if="error" justify="center">
      <v-col cols="12" class="text-center">
        <v-alert
          type="error"
          variant="tonal"
          class="mx-auto"
          style="max-width: 400px;"
        >
          <template v-slot:title>
            Kategoriler Yüklenemedi
          </template>
          {{ error.message || 'Kategoriler yüklenirken bir hata oluştu.' }}
          <template v-slot:append>
            <v-btn
              color="error"
              variant="text"
              @click="refresh()"
            >
              Tekrar Dene
            </v-btn>
          </template>
        </v-alert>
      </v-col>
    </v-row>
    
    <!-- Categories Data -->
    <v-row v-else-if="categories && categories.length > 0" justify="center">
      <v-col
        v-for="category in displayCategories"
        :key="category.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="2"
        class="text-center"
      >
        <v-card
          class="category-card pa-3 pa-md-4"
          elevation="0"
          rounded="xl"
          hover
          @click="navigateToCategory(category)"
        >
          <div class="category-image-container mb-2 mb-md-3">
            <img
              :src="getCategoryImage(category)"
              :alt="category.name"
              class="category-image"
              @error="onImageError"
            />
          </div>
          <h3 class="category-title text-caption text-md-subtitle-1 font-weight-medium">
            {{ category.name }}
          </h3>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else justify="center">
      <v-col cols="12" class="text-center">
        <v-alert
          type="info"
          variant="tonal"
          class="mx-auto"
          style="max-width: 400px;"
        >
          <template v-slot:title>
            Kategori Bulunamadı
          </template>
          Şu anda görüntülenecek kategori bulunmuyor.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Category, CategoriesResponse } from '~/types/api'

// API composable'ını kullan
const { getMainCategories } = useApi()

// Veri çekme işlemi
const { data: categoriesData, pending, error, refresh } = await useLazyAsyncData<CategoriesResponse>(
  'main-categories',
  () => getMainCategories(),
  {
    transform: (data: any) => data,
    default: () => ({ data: [], success: false })
  }
)

// Computed properties
const categories = computed(() => {
  if (!categoriesData.value) return []
  return Array.isArray(categoriesData.value) ? categoriesData.value : categoriesData.value.data || []
})

const displayCategories = computed(() => {
  return categories.value.slice(0, 5) // İlk 5 kategoriyi göster
})

// Methods
const navigateToCategory = (category: Category) => {
  const slug = category.slug || category.code || category.id.toString()
  navigateTo(`/kategori/${slug}`)
}

const getCategoryImage = (category: Category): string => {
  // Önce category'nin kendi image_url'ini kontrol et
  if (category.image_url) {
    return category.image_url
  }
  
  // Eğer images array'i varsa ilk resmi al
  if (category.images && category.images.length > 0) {
    const primaryImage = category.images.find(img => img.is_primary)
    if (primaryImage) {
      return primaryImage.image_url
    }
    return category.images[0].image_url
  }
  
  // Fallback olarak varsayılan resim
  return '/images/categories/default-category.svg'
}

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/categories/default-category.svg'
}

// SEO
useHead({
  title: 'Popüler Kategoriler - Takasimo',
  meta: [
    {
      name: 'description',
      content: 'Takasimo\'da en popüler kategorileri keşfedin. Elektronik, moda, ev yaşam ve daha fazlası.'
    }
  ]
})
</script>

<style scoped>
.category-card {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-card:hover {
  background-color: #ffffff !important;
  border-color: #8B2865;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(139, 40, 101, 0.15) !important;
}

.category-image-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-card:hover .category-image-container {
  transform: scale(1.05);
}

.category-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.category-title {
  color: #2c3e50;
  font-size: 0.95rem !important;
  line-height: 1.3 !important;
  text-align: center;
  margin-top: 8px;
}

.category-card:hover .category-title {
  color: #8B2865;
}

/* Mobile responsive adjustments */
@media (max-width: 959px) {
  .category-card {
    min-height: 120px;
  }
  
  .category-image-container {
    width: 70px;
    height: 70px;
  }
  
  .category-image {
    width: 50px;
    height: 50px;
  }
  
  .category-title {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 599px) {
  .category-card {
    min-height: 100px;
  }
  
  .category-image-container {
    width: 60px;
    height: 60px;
  }
  
  .category-image {
    width: 40px;
    height: 40px;
  }
  
  .category-title {
    font-size: 0.8rem !important;
    line-height: 1.2 !important;
  }
}

/* Extra small screens */
@media (max-width: 400px) {
  .category-card {
    min-height: 90px;
    padding: 0.5rem !important;
  }
  
  .category-image-container {
    width: 50px;
    height: 50px;
  }
  
  .category-image {
    width: 35px;
    height: 35px;
  }
  
  .category-title {
    font-size: 0.75rem !important;
  }
}
</style> 