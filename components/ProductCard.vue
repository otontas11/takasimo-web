<template>
  <v-card class="product-card" elevation="1" rounded="xl" hover @click="navigateToProduct">
    <div class="product-image-container">
      <v-img :src="getImageUrl({ path: product.image })" :alt="product.title" cover class="product-image">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="grey-lighten-4" indeterminate />
          </div>
        </template>
        
        <!-- Subtle Gradient Overlay -->
        <div class="image-overlay"></div>
      </v-img>
    </div>

    <v-card-text class="pa-4 product-content">
      <!-- Product Title - Max 2 lines -->
      <h3 class="product-title text-subtitle-2 font-weight-medium mb-3">
        {{ product.title }}
      </h3>
      
      <!-- Price - Above location/date -->
      <div class="product-price text-h6 font-weight-semibold mb-3">
        {{ formatPrice(product.price) }}
      </div>
      
      <!-- Location and Date - Same Line -->
      <div class="product-footer">
        <span class="product-location text-body-2">
          {{ formatLocation(product.city, product.district) }}
        </span>
        <span class="product-date text-caption">
          {{ formatDate(product.created_at) }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { getImageUrl } from '~/utils/getImageUrl.js'

interface Product {
  id: number
  title: string
  price: number
  image: string
  product_code: string
  city?: string | { name: string }
  district?: string | { name: string }
  created_at?: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const formatPrice = (price: number): string => {
  return `${price.toLocaleString('tr-TR')} TL`
}

const formatLocation = (city: any, district: any): string => {
  const cityName = typeof city === 'string' ? city : city?.name || ''
  const districtName = typeof district === 'string' ? district : district?.name || ''
  
  if (cityName && districtName) {
    return `${cityName}, ${districtName}`
  } else if (cityName) {
    return cityName
  } else if (districtName) {
    return districtName
  }
  return 'Konum belirtilmemiş'
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return 'BUGÜN'
  } else if (diffDays === 2) {
    return 'DÜN'
  } else if (diffDays <= 7) {
    return `${diffDays - 1} GÜN ÖNCE`
  } else {
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short' 
    }).toUpperCase()
  }
}

const navigateToProduct = () => {
  console.log("props.product", props.product)
  const slug = props.product.product_code.toString()
  navigateTo(`/product-detail/${slug}`)
}
</script>

<style scoped>
.product-card {
  background: #ffffff !important;
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
}

.product-card:hover {
  background: #fafbfc !important;
  border-color: #e2e8f0;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08) !important;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover::before {
  opacity: 1;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  aspect-ratio: 1;
  background: #f8fafc;
}

.product-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 100%);
  pointer-events: none;
}

.product-content {
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 0;
  background: #ffffff;
}

.product-title {
  color: #334155;
  font-size: 0.9rem !important;
  line-height: 1.4 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.5rem;
  max-height: 2.5rem;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.product-card:hover .product-title {
  color: #1e293b;
}

.product-price {
  color: #6366f1 !important;
  font-size: 1.1rem !important;
  margin-bottom: 12px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
  margin-top: auto;
}

.product-location {
  font-size: 0.8rem !important;
  color: #64748b !important;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.product-date {
  font-size: 0.75rem !important;
  color: #94a3b8 !important;
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* Responsive adjustments */
@media (width <= 599px) {
  .product-image-container {
    aspect-ratio: 1;
  }

  .product-title {
    font-size: 0.85rem !important;
  }

  .product-price {
    font-size: 1rem !important;
  }
  
  .product-location {
    font-size: 0.75rem !important;
  }
  
  .product-date {
    font-size: 0.7rem !important;
  }
}
</style>
