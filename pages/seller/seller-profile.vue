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

          <!-- Products Grid -->
          <v-row>
            <v-col 
              v-for="item in sellerData" 
              :key="item.product_code" 
              cols="12" 
              sm="6" 
              md="4" 
              lg="3"
              class="d-flex"
            >
              <v-card class="product-card w-100" elevation="1" rounded="lg" hover @click="navigateToProduct(item.product.product_code)">
                <div class="product-image-container">
                  <v-img 
                    :src="getImageUrl({ path: item.product.showcase_image })" 
                    :alt="item.product.name"
                    height="200"
                    cover
                    class="product-image"
                  />
                </div>
                <v-card-text class="pa-3">
                  <h4 class="product-title text-subtitle-2 font-weight-medium mb-2">
                    {{ truncateText(item.product.name, 50) }}
                  </h4>
                  <div class="product-price text-h6 font-weight-bold mb-2">
                    {{ formatPrice(item.product.price) }}
                  </div>
                  <div class="product-location text-caption text-grey">
                    {{ item.product.city?.name }}, {{ item.product.district?.name }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- No Products -->
          <div v-if="sellerData.length === 0" class="text-center py-10">
            <v-icon color="grey-lighten-1" size="64" class="mb-4">mdi-package-variant</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Ürün bulunamadı</h3>
            <p class="text-body-2 text-grey">Bu satıcının henüz ürünü bulunmuyor.</p>
          </div>
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

// Helper functions
const formatPrice = (price: number): string => {
  return `${price?.toLocaleString('tr-TR') || 0} TL`
}

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
}

const navigateToProduct = (productCode: string) => {
  navigateTo(`/product-detail/${productCode}`)
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

.product-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: #8b2865;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-title {
  color: #1e293b;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.4rem;
}

.product-price {
  color: #8b2865;
}

.product-location {
  font-size: 0.75rem;
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