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
              :src="getImageUrl({path:category.image,provider:'cdn'})"
              :alt="category.name"
              class="category-image"
              @error="onImageError"
            />
          </div>
          <h3 class="category-title text-caption text-md-subtitle-1 font-weight-medium">
            {{ truncateText(category.name, 15) }}
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
import {getImageUrl} from "~/utils/getImageUrl";
// API composable'ını kullan
const { getMainCategories } = useApi()

// Veri çekme işlemi
const { data: categoriesData, pending, error, refresh } = await useLazyAsyncData(
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
  // Uzun isimleri olan kategorileri filtrele ve kısa olanları tercih et
  const filteredCategories = categories.value.filter((category: any) => {
    return category.name && category.name.length <= 15 // 15 karakterden kısa olanları al
  })
  
  // Eğer yeterli kısa kategori yoksa, uzun olanları da dahil et ama kısalt
  if (filteredCategories.length < 5) {
    return categories.value.slice(0, 5)
  }
  
  return filteredCategories.slice(0, 5) // İlk 5 kategoriyi göster
})

// Methods
const navigateToCategory = (category: any) => {
  const slug = category.slug || category.code || category.id.toString()
  navigateTo(`/kategori/${slug}`)
}

const truncateText = (text: string, maxLength: number = 15) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const onImageError = (event: any) => {
  const target = event.target
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
  background-color: #ffffff !important;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.category-card:hover {
  border-color: #8B2865;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(139, 40, 101, 0.15) !important;
}

.category-image-container {
  width: 120px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
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
  color: #8B2865;
}

/* Mobile responsive adjustments */
@media (max-width: 959px) {
  .category-card {
    min-height: 140px;
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

@media (max-width: 599px) {
  .category-card {
    min-height: 120px;
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
@media (max-width: 400px) {
  .category-card {
    min-height: 100px;
    padding: 0.75rem !important;
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