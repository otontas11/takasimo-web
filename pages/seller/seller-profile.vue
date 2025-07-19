<template>
  <v-main class="seller-profile-page">
    <v-container>
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <v-progress-circular indeterminate color="primary" size="48" />
        <div class="mt-4 text-body-1">Satıcı bilgileri yükleniyor...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-10">
        <v-icon color="error" size="64" class="mb-4">mdi-alert-circle</v-icon>
        <h3 class="text-h6 text-error mb-2">Hata oluştu</h3>
        <p class="text-body-2 text-grey">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="sellerData && sellerData.length > 0">
        <!-- Seller Info Section -->
        <div class="seller-info-section mb-6">
          <v-card class="seller-card" elevation="2" rounded="lg">
            <v-card-text class="pa-6">
              <div class="d-flex align-center">
                <v-avatar size="80" color="deep-purple-accent-400" class="mr-4">
                  <v-img 
                    v-if="sellerData[0]?.owner?.photo" 
                    :src="getImageUrl({ path: sellerData[0].owner.photo })" 
                    cover
                  />
                  <v-icon v-else size="40">mdi-account</v-icon>
                </v-avatar>
                <div class="seller-details">
                  <h2 class="text-h4 font-weight-bold mb-2">{{ sellerData[0]?.owner?.name || 'Satıcı' }}</h2>
                  <div class="seller-meta d-flex align-center flex-wrap">
                    <div class="meta-item mr-6 mb-2">
                      <v-icon size="18" color="grey" class="mr-1">mdi-phone</v-icon>
                      <span class="text-body-1">{{ sellerData[0]?.owner?.phone || 'Telefon bilgisi yok' }}</span>
                    </div>
                    <div class="meta-item mr-6 mb-2">
                      <v-icon size="18" color="grey" class="mr-1">mdi-email</v-icon>
                      <span class="text-body-1">{{ sellerData[0]?.owner?.email || 'Email bilgisi yok' }}</span>
                    </div>
                    <div class="meta-item mb-2">
                      <v-icon size="18" color="grey" class="mr-1">mdi-package-variant</v-icon>
                      <span class="text-body-1">{{ sellerData.length }} ürün</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- Products Section -->
        <div class="products-section">
          <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h5 font-weight-bold">Satıcının Ürünleri</h3>
            <span class="text-body-2 text-grey">{{ sellerData.length }} ürün bulundu</span>
          </div>

          <!-- Products using FeaturedProducts component -->
          <FeaturedProducts :products="normalizedProducts" @loadMore="handleLoadMore" />
        </div>
      </div>

      <!-- No Data -->
      <div v-else class="text-center py-10">
        <v-icon color="grey-lighten-1" size="64" class="mb-4">mdi-account-off</v-icon>
        <h3 class="text-h6 text-grey-darken-1 mb-2">Satıcı bulunamadı</h3>
        <p class="text-body-2 text-grey">Aradığınız satıcı mevcut değil.</p>
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { useProductsApi } from '~/composables/api/useProductsApi'
import { getImageUrl } from '~/utils/getImageUrl.js'

const route = useRoute()
const { getSellerProfileAndProducts } = useProductsApi()

const sellerData = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)

// Computed properties
const normalizedProducts = computed(() => {
  return sellerData.value.map(item => ({
    id: item.product_code,
    name: item.product.name,
    description: item.product.description,
    price: item.product.price,
    showcase_image: item.product.showcase_image,
    product_code: item.product.product_code,
    category: item.product.category,
    city: item.product.city,
    district: item.product.district,
    created_at: item.created_at,
    owner: item.owner
  }))
})

const handleLoadMore = async () => {
  try {
    currentPage.value++
    const sellerId = route.params.id as string
    const response = await getSellerProfileAndProducts(sellerId, currentPage.value)
    const newData = (response as any)?.data || []
    
    if (newData.length > 0) {
      sellerData.value = [...sellerData.value, ...newData]
    }
  } catch (err: any) {
    console.error('Load more error:', err)
    currentPage.value-- // Revert page number on error
  }
}

// Fetch seller data
const fetchSellerData = async () => {
  loading.value = true
  error.value = null

  try {
    const sellerId = route.params.id as string
    if (!sellerId) {
      throw new Error('Satıcı ID bulunamadı')
    }

    const response = await getSellerProfileAndProducts(sellerId, 1)
    sellerData.value = (response as any)?.data || []
  } catch (err: any) {
    console.error('Seller profile fetch error:', err)
    error.value = 'Satıcı bilgileri yüklenirken hata oluştu'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchSellerData()
})

// SEO
useHead({
  title: computed(() => {
    const sellerName = sellerData.value[0]?.owner?.name || 'Satıcı'
    return `${sellerName} - Satıcı Profili - Takasimo`
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        const sellerName = sellerData.value[0]?.owner?.name || 'Satıcı'
        return `${sellerName} satıcısının ürünlerini keşfedin. Takasimo'da güvenilir alışveriş.`
      })
    }
  ]
})
</script>

<style scoped>
.seller-profile-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 80px;
}

.seller-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid #e2e8f0;
}

.seller-details {
  flex: 1;
}

.seller-meta {
  color: #64748b;
}

.meta-item {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .seller-details h2 {
    font-size: 1.5rem !important;
  }
  
  .seller-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .meta-item {
    margin-right: 0 !important;
  }
}
</style>