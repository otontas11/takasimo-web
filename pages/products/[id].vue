<template>
  <div class="product-detail-page">
    <v-container>
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-8">
        <v-progress-circular indeterminate size="64" color="primary" />
        <p class="mt-4">Ürün bilgileri yükleniyor...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <v-alert type="error" variant="tonal" class="mx-auto" style="max-width: 400px">
          <template v-slot:title>Hata Oluştu</template>
          Ürün bilgileri yüklenirken bir hata oluştu.
          <template v-slot:append>
            <v-btn color="error" variant="text" @click="refresh"> Tekrar Dene </v-btn>
          </template>
        </v-alert>
      </div>

      <!-- Product Content -->
      <div v-else-if="product">
        <v-row>
          <!-- Product Images -->
          <v-col cols="12" md="6">
            <v-card>
              <v-img
                :src="product.showcase_image || '/images/placeholder.jpg'"
                height="400"
                cover
              />
            </v-card>
          </v-col>

          <!-- Product Info -->
          <v-col cols="12" md="6">
            <h1 class="text-h4 mb-4">{{ product.title }}</h1>
            <p class="text-body-1 mb-4">{{ product.description }}</p>

            <div class="mb-4">
              <v-chip color="primary" variant="tonal" class="mr-2">
                {{ product.category?.name }}
              </v-chip>
              <v-chip color="secondary" variant="tonal">
                {{ product.city }}
              </v-chip>
            </div>

            <div class="d-flex align-center mb-4">
              <v-avatar size="40" class="mr-3">
                <v-img :src="product.user?.avatar || '/images/default-avatar.jpg'" />
              </v-avatar>
              <div>
                <p class="font-weight-medium mb-0">{{ product.user?.name }}</p>
                <p class="text-caption text-grey mb-0">{{ product.user?.city }}</p>
              </div>
            </div>

            <v-btn color="primary" size="large" block rounded="xl" class="mb-4">
              Takas Teklifi Ver
            </v-btn>
          </v-col>
        </v-row>

        <!-- Related Products -->
        <v-row v-if="relatedProducts?.length" class="mt-8">
          <v-col cols="12">
            <h2 class="text-h5 mb-4">Benzer Ürünler</h2>
            <v-row>
              <v-col
                v-for="relatedProduct in relatedProducts"
                :key="relatedProduct.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <ProductCard :product="relatedProduct" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-8">
        <v-alert type="warning" variant="tonal" class="mx-auto" style="max-width: 400px">
          <template v-slot:title>Ürün Bulunamadı</template>
          Aradığınız ürün bulunamadı veya kaldırılmış olabilir.
          <template v-slot:append>
            <v-btn color="warning" variant="text" to="/"> Ana Sayfaya Dön </v-btn>
          </template>
        </v-alert>
      </div>
    </v-container>
  </div>
</template>

<script setup>
const route = useRoute()
const productId = route.params.id

// ✅ TEMİZ VE BASİT - Mevcut composable yapısını kullan
const {
  data: product,
  pending,
  error,
  refresh
} = await useLazyAsyncData(`product-${productId}`, () => useProducts().getProductById(productId), {
  default: () => null,
  server: true
})

// Benzer ürünler - sadece kategori kodu varsa
const { data: relatedProducts } = await useLazyAsyncData(
  `related-${productId}`,
  () => {
    if (!product.value?.category_code) return []
    return useProducts().getProductsByCategory(product.value.category_code, 4)
  },
  {
    default: () => [],
    server: true,
    watch: [product]
  }
)

// SEO - Dinamik
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.title} - Takasimo`,
      meta: [
        {
          name: 'description',
          content: product.value.description || 'Ürün detay sayfası'
        },
        {
          property: 'og:title',
          content: product.value.title
        },
        {
          property: 'og:image',
          content: product.value.showcase_image
        }
      ]
    })
  }
})

// 404 handling
if (process.server && !product.value && !pending.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Ürün bulunamadı'
  })
}
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  padding: 2rem 0;
}
</style>
