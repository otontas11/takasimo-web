<template>
  <v-main class="product-detail-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-if="loading" class="text-center py-10">
            <v-progress-circular indeterminate color="primary" size="48" />
          </div>
          <div v-else-if="error" class="text-center py-10 text-error">{{ error }}</div>
        </v-col>
      </v-row>
      <v-row v-if="!loading && !error && product">
        <!-- Sol Kısım: Ürün Görseli ve Bilgiler -->
        <v-col cols="12" md="6" class="left-section">
          <ImageCarousel :images="product.images" :showcase="product.showcase_image" />
          <div class="meta-info d-flex align-center mt-2">
            <v-icon size="18" class="mr-1" color="grey">mdi-clock-outline</v-icon>
            <span class="mr-4 text-grey">{{ timeAgo(product.updated_at) }}</span>
            <v-icon size="18" class="mr-1" color="grey">mdi-calendar-outline</v-icon>
            <span class="text-grey">{{ formatDate(product.created_at) }}</span>
          </div>
          <div class="mt-4">
            <h3 class="product-title">{{ product.name }}</h3>
            <div class="product-location">{{ product.city?.name || '' }} / {{ product.district?.name || '' }}</div>
          </div>
          <div class="mt-6 d-flex justify-space-between">
            <v-btn color="primary" class="action-btn" variant="flat">Düzenle</v-btn>
            <v-btn color="primary" class="action-btn" variant="flat">Yayından kaldır</v-btn>
          </div>
        </v-col>
        <!-- Sağ Kısım: Kullanıcı ve Detaylar -->
        <v-col cols="12" md="6" class="right-section">
          <div 
            class="user-info d-flex align-center mb-4" 
            @click="navigateToSellerProfile(product.owner?.user_code)"
            style="cursor: pointer;"
          >
            <v-avatar size="48" color="deep-purple-accent-400">
              <v-icon size="32">mdi-account</v-icon>
            </v-avatar>
            <span class="ml-3 user-name">{{ product.owner?.name || 'Kullanıcı' }}</span>
          </div>
          <div class="price mb-4">
            {{ product.price ? product.price.toLocaleString('tr-TR') + ' ' + (product.currency || 'TL') : '' }}
          </div>
          <v-divider class="mb-2"></v-divider>
          <div class="detail-row"><span class="label">İlan no</span><span class="value">{{ product.ad_no }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">İlan tarihi</span><span class="value">{{ formatDate(product.created_at || product.ad_date) }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">Konum</span><span class="value">{{ product.city?.name || '' }} / {{ product.district?.name || '' }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">İletişim</span><span class="value">{{ product.owner?.phone || '-' }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">Kategori</span><span class="value">{{ product.categories?.[0]?.name || '-' }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row"><span class="label">İlan Durum</span><span class="value">{{ product.condition === 'new' ? 'Yeni' : 'İkinci El' }}</span></div>
          <v-divider></v-divider>
          <div class="detail-row align-start">
            <span class="label">Açıklama</span>
            <span class="value">{{ product.description }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { useProductsApi } from '~/composables/api/useProductsApi'
const route = useRoute()
const { getProductById } = useProductsApi()

const product = ref(null)
const loading = ref(true)
const error = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('tr-TR')
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'az önce'
  if (diff < 3600) return `${Math.floor(diff / 60)} dakika önce`
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} gün önce`
  return formatDate(dateStr)
}

function navigateToSellerProfile(userCode) {
  if (userCode) {
    navigateTo(`/seller-profile/${userCode}`)
  }
}

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    const res = await getProductById(route.params.id)
    product.value = res
  } catch (err) {
    error.value = 'Ürün bulunamadı.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-detail-page {
  background: #fff;
}
.left-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.right-section {
  padding-left: 32px;
}
.like-info {
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 4px 12px;
  font-size: 18px;
  color: #8d2065;
  font-weight: 500;
}
.meta-info {
  font-size: 15px;
  color: #888;
}
.product-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.product-location {
  font-size: 18px;
  color: #888;
}
.action-btn {
  min-width: 180px;
  font-size: 20px;
  font-weight: 500;
  background: #8d2065 !important;
  color: #fff !important;
  border-radius: 12px;
}
.user-info .user-name {
  font-size: 22px;
  font-weight: 600;
}
.price {
  font-size: 32px;
  font-weight: 700;
  color: #8d2065;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 18px;
}
.detail-row .label {
  font-weight: 600;
  min-width: 120px;
}
.detail-row .value {
  flex: 1;
  text-align: right;
  font-weight: 400;
  margin-left: 16px;
}
.detail-row.align-start {
  align-items: flex-start;
}
.detail-row.align-start .value {
  text-align: left;
}
</style>
