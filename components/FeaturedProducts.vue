<template>
  <div class="featured-products py-8">

    <!-- Initial Loading State - Only show when no products and loading -->
    <v-row v-if="shouldShowInitialLoading">
      <v-col v-for="n in 4" :key="n" cols="6" sm="6" md="3" class="d-flex">
        <v-card class="product-card" elevation="0" rounded="xl">
          <v-skeleton-loader type="image, article" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Products -->
    <v-row v-else-if="hasProducts">
      <v-col v-for="product in props.products" :key="(product as any).id" cols="6" sm="6" md="3" class="d-flex">
        <ProductCard v-if="normalizeProduct(product)" :product="normalizeProduct(product)" />
      </v-col>
    </v-row>

    <!-- Empty State - No products and not loading -->
    <v-row v-else-if="!isLoading">
      <v-col cols="12" class="text-center">
        <v-icon class="mb-4" color="grey-lighten-1" size="64">mdi-package-variant</v-icon>
        <h3 class="text-h6 text-grey-darken-1 mb-2">Ürün bulunamadı</h3>
        <p class="text-body-2 text-grey">Bu kategoride henüz ürün bulunmuyor.</p>
      </v-col>
    </v-row>

    <!-- Infinite Scroll Loading -->
    <div ref="infiniteScrollTrigger" class="infinite-scroll-loading">
      <v-row v-if="isLoading && hasProducts">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="40" width="4" class="mb-4" />
          <div class="text-body-2 text-medium-emphasis">Daha fazla ürün yükleniyor...</div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['loadMore'])

const hasInitialData = ref(false)
const productsStore = useProductsStore()
const isLoading = computed(() => productsStore.isLoading)
const currentPage = ref(1)
const infiniteScrollTrigger = ref(null)
let observer: IntersectionObserver | null = null

// SSR-safe computed properties
const hasProducts = computed(() => {
  return Array.isArray(props.products) && props.products.length > 0
})

// ✅ Skeleton loading logic - Only show during initial load when no products exist
const shouldShowInitialLoading = computed(() => {
  return isLoading.value && !hasProducts.value
})

const refresh = async () => {
  // Parentten fetch fonksiyonu prop ile gelirse burada çağrılabilir
}

const loadMore = async () => {
  console.log('loadMore')
  emit('loadMore')
}

onMounted(() => {
  // Mark that we have initial data after mount
  hasInitialData.value = true

  observer = new window.IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { root: null, threshold: 0.1, rootMargin: '100px' }
  )
  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value)
  }
})

onUnmounted(() => {
  if (observer && infiniteScrollTrigger.value) {
    observer.unobserve(infiniteScrollTrigger.value)
  }
})

const normalizeProduct = (product: any) => {
  if (!product) return null
  return {
    id: product.id,
    title: product.name || product.title,
    description: product.description || '',
    price: product.price || 0,
    image: product.showcase_image || product.image_url || '/images/placeholder.jpg',
    product_code: product.product_code,
    category: product.category?.name || 'Kategori',
    city: product.city,
    district: product.district,
    created_at: product.created_at,
    user: {
      name: product.user?.name || product.owner?.name || 'Kullanıcı',
      avatar: product.user?.avatar || product.owner?.avatar || '/images/default-avatar.jpg'
    },
  } as any
}

useHead({
  title: 'Öne Çıkan Ürünler - Takasimo',
  meta: [
    {
      name: 'description',
      content: "Takasimo'da öne çıkan ürünleri keşfedin. En popüler takas ürünleri burada."
    }
  ]
})
</script>

<style scoped>
.featured-products {
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.product-card {
  width: 100%;
  height: 100%;
  min-height: 300px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 15%) !important;
}

@media (width <= 959px) {
  .featured-products {
    padding: 1.5rem;
    margin: 1rem 0;
  }
}

@media (width <= 599px) {
  .featured-products {
    padding: 1rem;
    border-radius: 12px;
  }
}

.infinite-scroll-loading {
  padding: 2rem 0;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
