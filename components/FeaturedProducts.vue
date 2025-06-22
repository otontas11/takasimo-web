<template>
  <div class="py-16 mb-0">
    <!-- Loading State -->
    <v-row v-if="pending && products.length === 0">
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

    <!-- Load More Button -->
    <v-row v-if="products.length > 0" class="mt-4">
      <v-col cols="12" class="text-center">
        <v-btn
          :loading="loadingMore"
          :disabled="loadingMore"
          color="primary"
          variant="outlined"
          size="large"
          @click="loadMore"
          class="load-more-btn"
        >
          <v-icon start>mdi-refresh</v-icon>
          {{ loadingMore ? 'Yükleniyor...' : 'Daha Fazla Yükle' }}
        </v-btn>
        <div class="text-caption mt-2 text-medium-emphasis">
          Sayfa {{ currentPage }} / {{ lastPage }}
        </div>
      </v-col>
    </v-row>

    <!-- Loading More Products Skeleton -->
    <v-row v-if="loadingMore" class="mt-4">
      <v-col
        v-for="n in 4"
        :key="`loading-${n}`"
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
  </div>
</template>

<script setup lang="ts">
import {getImageUrl} from "~/utils/getImageUrl";

// Pagination state
const currentPage = ref(1)
const lastPage = ref(1)
const loadingMore = ref(false)
const allProducts = ref<any[]>([])

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

// Ürün yükleme fonksiyonu
const fetchProducts = async (page: number) => {
  try {
    let pageProducts: any[] = []
    
    // Normal ürünleri al
    try {
      const productList = await getMoreProduct(page)
      const responseData = Array.isArray(productList) 
        ? productList 
        : (productList as any)?.data || []
      
      // Pagination bilgilerini güncelle
      if ((productList as any)?.meta) {
        lastPage.value = (productList as any).meta.last_page || 1
      }
      
      console.log('Fetched products for page', page, ':', responseData)
      
      if (Array.isArray(responseData) && responseData.length) {
        pageProducts = [...responseData]
      }
    } catch (productError) {
      console.error('Normal products error:', productError)
      // Hata durumunda mock data kullan
      pageProducts = getMockProducts()
    }

    // İlk sayfa için doping ürünlerini de ekle
    if (page === 1) {
      try {
        const dopingProducts = await getProductDopingShowcase()
        const newShowcaseProducts = Array.isArray(dopingProducts) 
          ? dopingProducts 
          : (dopingProducts as any)?.data || []

        if (Array.isArray(newShowcaseProducts) && newShowcaseProducts.length) {
          // Mevcut ürünlerden tekrar edenleri filtrele
          const filteredExistingProducts = pageProducts.filter(
            existingProduct =>
              !newShowcaseProducts.some((newProduct: any) => 
                newProduct.product_code === existingProduct.product_code
              )
          )
          
          // Doping ürünlerini en başa ekle
          pageProducts = [...newShowcaseProducts, ...filteredExistingProducts]
        }
      } catch (dopingError) {
        console.warn('Doping products error (ignored):', dopingError)
      }
    }

    return pageProducts
    
  } catch (err) {
    console.error('Fetch products error:', err)
    return getMockProducts()
  }
}

// Load more fonksiyonu
const loadMore = async () => {
  if (loadingMore.value) return
  
  loadingMore.value = true
  
  try {
    let nextPage: number
    
    if (currentPage.value === lastPage.value) {
      nextPage = 1
    } else {
      nextPage = currentPage.value + 1
    }

    const newProducts = await fetchProducts(nextPage)
    
    // Her zaman mevcut ürünlerin üstüne ekle
    allProducts.value = [...allProducts.value, ...newProducts]
    
    currentPage.value = nextPage
    
  } catch (error) {
    console.error('Load more error:', error)
  } finally {
    loadingMore.value = false
  }
}

// SSR-friendly veri yükleme
const { data: initialData, pending, error, refresh } = await useLazyAsyncData(
  'featured-products',
  async () => {
    try {
      const initialProducts = await fetchProducts(1)
      allProducts.value = initialProducts
      return initialProducts
    } catch (err) {
      console.error('Featured products loading error:', err)
      const mockData = getMockProducts()
      allProducts.value = mockData
      return mockData
    }
  },
  {
    default: () => [],
    server: true
  }
)

// Products computed - allProducts'ı takip et
const products = computed(() => {
  return allProducts.value.length > 0 ? allProducts.value : initialData.value || []
})

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

.load-more-btn {
  min-width: 200px;
  border-radius: 12px;
  font-size: 16px;
}

.load-more-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(139, 40, 101, 0.15) !important;
}
</style> 