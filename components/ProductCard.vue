<template>
  <v-card class="product-card" elevation="0" rounded="xl" hover @click="navigateToProduct">
    <div class="product-image-container">
      <v-img :src="getImageUrl({path:product.image})" :alt="product.title" height="180" cover class="product-image">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="grey-lighten-4" indeterminate />
          </div>
        </template>
      </v-img>
    </div>

    <v-card-text class="pa-4">
      <h3 class="product-title text-subtitle-1 font-weight-medium mb-2">
        {{ product.title }}
      </h3>
      <p class="product-location text-body-2 text-grey-darken-1 mb-2">
        {{ product.location }}
      </p>
      <div class="product-price text-h6 font-weight-bold">
        {{ formatPrice(product.price) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { getImageUrl } from '~/utils/getImageUrl.js'

interface Product {
  id: number
  title: string
  location: string
  price: number
  image: string
  slug?: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const formatPrice = (price: number): string => {
  return `${price.toLocaleString('tr-TR')} TL`
}

const navigateToProduct = () => {
  const slug = props.product.slug || props.product.id.toString()
  navigateTo(`/urun/${slug}`)
}
</script>

<style scoped>
.product-card {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.product-card:hover {
  background-color: #fff !important;
  border-color: #8b2865;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(139 40 101 / 15%) !important;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-title {
  color: #2c3e50;
  font-size: 1rem !important;
  line-height: 1.4 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8rem;
}

.product-card:hover .product-title {
  color: #8b2865;
}

.product-location {
  font-size: 0.875rem !important;
  color: #6c757d !important;
}

.product-price {
  color: #8b2865 !important;
  font-size: 1.1rem !important;
}

/* Responsive adjustments */
@media (width <= 599px) {
  .product-image-container {
    height: 160px;
  }

  .product-title {
    font-size: 0.9rem !important;
  }

  .product-price {
    font-size: 1rem !important;
  }
}
</style>
