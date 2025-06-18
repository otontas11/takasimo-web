<template>
  <div class="py-16 mb-0">

    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
interface Product {
  id: number
  title: string
  location: string
  price: number
  image: string
  slug?: string
}

const products: Product[] = [
  {
    id: 1,
    title: 'Bebek Arabası',
    location: 'Maltepe / İstanbul',
    price: 2000,
    image: '/images/products/baby_car.svg',
    slug: 'bebek-arabasi-maltepe'
  },
  {
    id: 2,
    title: 'Bebek Arabası',
    location: 'Maltepe / İstanbul',
    price: 2000,
    image: '/images/products/baby_car.svg',
    slug: 'bebek-arabasi-maltepe-2'
  },
  {
    id: 3,
    title: 'Bebek Arabası',
    location: 'Maltepe / İstanbul',
    price: 2000,
    image: '/images/products/baby_car.svg',
    slug: 'bebek-arabasi-maltepe-3'
  },
  {
    id: 4,
    title: 'Bebek Arabası',
    location: 'Maltepe / İstanbul',
    price: 2000,
    image: '/images/products/baby_car.svg',
    slug: 'bebek-arabasi-maltepe-4'
  }
]
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s ease !important;
}

.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 40, 101, 0.2) !important;
}
</style> 