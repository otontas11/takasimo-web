<template>
  <div class="featured-products py-8">
    <h2 class="text-h5 mb-6 text-center font-weight-bold">Öne Çıkan Ürünler</h2>

    <!-- Loading State -->
    <v-row v-if="isLoading && products.length === 0">
      <v-col
        v-for="n in 4"
        :key="n"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
        <v-card class="product-card" elevation="0" rounded="xl">
          <v-skeleton-loader type="image, article" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Products -->
    <v-row v-else-if="products.length > 0">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
        <ProductCard
          v-if="normalizeProduct(product)"
          :product="normalizeProduct(product)"
        />
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-else-if="hasError">
      <v-col cols="12" class="text-center">
        <v-alert type="error" variant="tonal" class="mx-auto" style="max-width: 400px;">
          <template #title>Ürünler Yüklenemedi</template>
          Ürünler yüklenirken bir hata oluştu.
          <template #append>
            <v-btn color="error" variant="text" @click="refresh">Tekrar Dene</v-btn>
          </template>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="info" variant="tonal" class="mx-auto" style="max-width: 400px;">
          <template #title>Ürün Bulunamadı</template>
          Şu anda görüntülenecek ürün bulunmuyor.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '~/utils/getImageUrl'

// ✅ SETUP STORE VERİSİNİ KULLAN - Index.vue'den provide edilen veri
const productsStore = useProductsStore()

// Store'dan veri al
const products = computed(() => productsStore.getFeaturedProducts)
const isLoading = computed(() => productsStore.isLoading)
const hasError = computed(() => productsStore.getError)

// Refresh function
const refresh = async () => {
  await productsStore.fetchFeaturedProducts()
}

// Ürün normalize fonksiyonu
const normalizeProduct = (product: any) => {
  if (!product) return null

  return {
    id: product.id,
    title: product.name || product.title,
    description: product.description || '',
    price: product.price || 0,
    image: product.showcase_image || product.image_url || '/images/placeholder.jpg',
    category: product.category?.name || 'Kategori',
    city: product.city || 'Şehir',
    district: product.district || 'İlçe',
    user: {
      name: product.user?.name || product.owner?.name || 'Kullanıcı',
      avatar: product.user?.avatar || product.owner?.avatar || '/images/default-avatar.jpg'
    },
    created_at: product.created_at,
    product_code: product.product_code
  } as any
}

// SEO
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
</style>
