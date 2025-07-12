<template lang="pug">
.popular-categories
  h2.text-h5.mb-6.text-center.font-weight-bold Popüler Kategoriler

  //- Loading State
  v-row(v-if="isLoading" justify="center")
    v-col(cols="12" class="text-center")
      v-progress-circular(indeterminate size="64" color="primary")
      p.mt-4 Kategoriler yükleniyor...

  //- Categories Grid
  v-row(v-else-if="displayCategories.length > 0" class="categories-grid")
    v-col(
      v-for="category in displayCategories"
      :key="category.id"
      cols="6"
      sm="4"
      md="3"
      lg="2"
      class="d-flex"
    )
      v-card.category-card.w-100.d-flex.flex-column.align-center.justify-center.pa-4(
        @click="navigateToCategory(category)"
        hover
      )
        .category-image-container
          img.category-image(
            :src="getImageUrl({ path: category.image_url || '/images/categories/default-category.svg', provider: 'locale' })"
            :alt="category.name"
            @error="onImageError"
          )
        h3.category-title {{ truncateText(category.name, 15) }}

  //- Error State
  v-row(v-else-if="hasError" justify="center")
    v-col(cols="12" class="text-center")
      v-alert(type="error" variant="tonal" class="mx-auto" style="max-width: 400px;")
        template(#title) Kategoriler Yüklenemedi
        | Kategoriler yüklenirken bir hata oluştu.
        template(#append)
          v-btn(color="error" variant="text" @click="refresh") Tekrar Dene

  //- Empty State
  v-row(v-else justify="center")
    v-col(cols="12" class="text-center")
      v-alert(type="info" variant="tonal" class="mx-auto" style="max-width: 400px;")
        template(#title) Kategori Bulunamadı
        | Şu anda görüntülenecek kategori bulunmuyor.
        template(#append)
          v-btn(color="info" variant="text" @click="refresh") Yenile
</template>

<script setup lang="ts">
import { getImageUrl } from "~/utils/getImageUrl"

// ✅ PROPS - Index.vue'den gelen veri
interface Props {
  categories?: any[]
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  loading: false,
  error: null
})

// Computed properties for template
const isLoading = computed(() => props.loading)
const hasError = computed(() => !!props.error)

// Computed properties
const displayCategories = computed(() => {
  if (!props.categories || props.categories.length === 0) return []
  
  // Kısa isimleri tercih et
  const shortCategories = props.categories.filter((cat: any) => 
    cat.name && cat.name.length <= 15
  )
  
  // Yeterli kısa kategori varsa onları kullan, yoksa tümünden al
  const selectedCategories = shortCategories.length >= 5 
    ? shortCategories 
    : props.categories
  
  return selectedCategories.slice(0, 5)
})

// Methods
const navigateToCategory = (category: any) => {
  const slug = category.slug || category.code || category.id.toString()
  navigateTo(`/kategori/${slug}`)
}

const truncateText = (text: string, maxLength: number = 15) => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
}

const onImageError = (event: any) => {
  event.target.src = '/images/categories/default-category.svg'
}

// Emit events to parent
const emit = defineEmits<{
  refresh: []
}>()

const refresh = async () => {
  // Parent component'e refresh event'i gönder
  emit('refresh')
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