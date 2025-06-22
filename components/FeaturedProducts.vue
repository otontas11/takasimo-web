<template>
  <div class="py-16 mb-0">
    <!-- Loading State -->
    <v-row v-if="pending">
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
        <ProductCard :product="normalizeProduct(product)" />
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-else-if="error">
      <v-col cols="12" class="text-center">
        <v-alert type="error" variant="tonal" class="mx-auto" style="max-width: 400px;">
          <template v-slot:title>Ürünler Yüklenemedi</template>
          Ürünler yüklenirken bir hata oluştu.
          <template v-slot:append>
            <v-btn color="error" variant="text" @click="refresh">
              Tekrar Dene
            </v-btn>
          </template>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="info" variant="tonal" class="mx-auto" style="max-width: 400px;">
          <template v-slot:title>Ürün Bulunamadı</template>
          Şu anda görüntülenecek ürün bulunmuyor.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {getImageUrl} from "~/utils/getImageUrl";
// API fonksiyonları
const getMoreProduct = async (page: number = 1) => {
  try {
    const { api } = useApi()
    
    const response = await api.get(`products`, {
      page,
      filter: [
        JSON.stringify({ k: "is_deleted", o: "=", v: false }),
        JSON.stringify({ k: "status", o: "=", v: true })
      ],
      with: ['city', 'district', 'doping'],
      orderBy: `{"k":"created_at","v":"ASC"}`
    })
    
    console.log('Products API Response:', response)
    return response
  } catch (error) {
    console.error('getMoreProduct error:', error)
    throw error
  }
}

const getProductDopingShowcase = async () => {
  try {
    const { api } = useApi()
    
    const response = await api.get('product-with-dopings', {
      doping_code: 'bc373717-1335-4672-8b5f-7ffc5624486e',
      with: ["owner", "city", "district", "doping"],
      filter: [`{"k": "status", "o": "=", "v": true}`]
    })
    
    console.log('Doping Products API Response:', response)
    return response
  } catch (error) {
    console.error('getProductDopingShowcase error:', error)
    // Doping hata verirse normal ürünleri döndür
    return { data: [] }
  }
}

// SSR-friendly veri yükleme
const { data: products, pending, error, refresh } = await useLazyAsyncData(
  'featured-products',
  async () => {
    try {
      let allProducts: any[] = []
      
      // 1. Normal ürünleri al
      try {
        const productList = await getMoreProduct(1)
        const responseData = Array.isArray(productList) 
          ? productList 
          : (productList as any)?.data || []
        
        console.log('Normalized products:', responseData)
        
        if (Array.isArray(responseData) && responseData.length) {
          allProducts = [...responseData]
        }
      } catch (productError) {
        console.error('Normal products error:', productError)
        // Normal ürünler hata verirse mock data kullan
        allProducts = getMockProducts()
      }

      // 2. Doping showcase ürünlerini al (optional)
      try {
        const dopingProducts = await getProductDopingShowcase()
        const newShowcaseProducts = Array.isArray(dopingProducts) 
          ? dopingProducts 
          : (dopingProducts as any)?.data || []

        if (Array.isArray(newShowcaseProducts) && newShowcaseProducts.length) {
          // Mevcut ürünlerden tekrar edenleri filtrele
          const filteredExistingProducts = allProducts.filter(
            existingProduct =>
              !newShowcaseProducts.some((newProduct: any) => 
                newProduct.product_code === existingProduct.product_code
              )
          )
          
          // Doping ürünlerini en başa ekle
          allProducts = [...newShowcaseProducts, ...filteredExistingProducts]
        }
      } catch (dopingError) {
        console.warn('Doping products error (ignored):', dopingError)
        // Doping hata verirse sadece normal ürünlerle devam et
      }

      // İlk 4 ürünü döndür
      const finalProducts = allProducts.slice(0, 4)
      console.log('Final products:', finalProducts)
      
      return finalProducts
      
    } catch (err) {
      console.error('Featured products loading error:', err)
      // Tüm API'lar hata verirse mock data döndür
      return getMockProducts()
    }
  },
  {
    default: () => [],
    server: true
  }
)

// Mock data fallback
const getMockProducts = () => [
  {
    product_code: 'mock-1',
    name: 'Bebek Arabası',
    description: 'Temiz ve az kullanılmış bebek arabası',
    price: '2000',
    currency: 'TRY',
    city: { name: 'İstanbul' },
    district: { name: 'Maltepe' },
    showcase_image: '/images/products/baby_car.svg',
    status: true,
    is_deleted: false
  },
  {
    product_code: 'mock-2',
    name: 'Bebek Arabası',
    description: 'Temiz ve az kullanılmış bebek arabası',
    price: '2000',
    currency: 'TRY',
    city: { name: 'İstanbul' },
    district: { name: 'Maltepe' },
    showcase_image: '/images/products/baby_car.svg',
    status: true,
    is_deleted: false
  },
  {
    product_code: 'mock-3',
    name: 'Bebek Arabası',
    description: 'Temiz ve az kullanılmış bebek arabası',
    price: '2000',
    currency: 'TRY',
    city: { name: 'İstanbul' },
    district: { name: 'Maltepe' },
    showcase_image: '/images/products/baby_car.svg',
    status: true,
    is_deleted: false
  },
  {
    product_code: 'mock-4',
    name: 'Bebek Arabası',
    description: 'Temiz ve az kullanılmış bebek arabası',
    price: '2000',
    currency: 'TRY',
    city: { name: 'İstanbul' },
    district: { name: 'Maltepe' },
    showcase_image: '/images/products/baby_car.svg',
    status: true,
    is_deleted: false
  }
]

// Product normalization - API response'unu ProductCard'ın beklediği formata çevir
const normalizeProduct = (product: any) => {
  console.log("product", product)
  return {
    id: product.product_code,
    title: product.name,
    location: getProductLocation(product),
    price: parseInt(product.price) || 0,
    image: getImageUrl({path: product.showcase_image}),
    slug: product.product_code
  }
}

const getProductLocation = (product: any) => {
  const district = product.district?.name || ''
  const city = product.city?.name || ''
  
  if (district && city) {
    return `${district} / ${city}`
  }
  return city || district || 'Konum belirtilmemiş'
}


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

.product-card {
  width: 100%;
  min-height: 300px;
}
</style> 