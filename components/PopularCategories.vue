<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold">Popüler Kategoriler</h2>
      </v-col>
    </v-row>
    
    <v-row justify="center">
      <v-col
        v-for="category in categories"
        :key="category.id"
        cols="6"
        sm="4"
        md="2"
        class="text-center"
      >
        <v-card
          class="category-card pa-4"
          elevation="0"
          rounded="xl"
          hover
          @click="navigateToCategory(category.slug)"
        >
          <div class="category-image-container mb-3">
            <img
              :src="category.image"
              :alt="category.name"
              class="category-image"
            />
          </div>
          <h3 class="category-title text-subtitle-1 font-weight-medium">
            {{ category.name }}
          </h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface Category {
  id: number
  name: string
  slug: string
  image: string
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Ev Elektroniği',
    slug: 'ev-elektronigi',
    image: '/images/categories/ev-elektronigi.svg'
  },
  {
    id: 2,
    name: 'Cep Telefonu & Tablet',
    slug: 'cep-telefonu-tablet',
    image: '/images/categories/telefon-tablet.svg'
  },
  {
    id: 3,
    name: 'Bilgisayar',
    slug: 'bilgisayar',
    image: '/images/categories/bilgisayar.svg'
  },
  {
    id: 4,
    name: 'Kıyafet',
    slug: 'kiyafet',
    image: '/images/categories/kiyafet.svg'
  },
  {
    id: 5,
    name: 'Ayakkabı',
    slug: 'ayakkabi',
    image: '/images/categories/ayakkabi.svg'
  }
]

const navigateToCategory = (slug: string) => {
  navigateTo(`/kategori/${slug}`)
}
</script>

<style scoped>
.category-card {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-card:hover {
  background-color: #ffffff !important;
  border-color: #8B2865;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(139, 40, 101, 0.15) !important;
}

.category-image-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-card:hover .category-image-container {
  transform: scale(1.05);
}

.category-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.category-title {
  color: #2c3e50;
  font-size: 0.95rem !important;
  line-height: 1.3 !important;
  text-align: center;
  margin-top: 8px;
}

.category-card:hover .category-title {
  color: #8B2865;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .category-image-container {
    width: 70px;
    height: 70px;
  }
  
  .category-image {
    width: 50px;
    height: 50px;
  }
  
  .category-title {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 599px) {
  .category-card {
    min-height: 120px;
  }
  
  .category-image-container {
    width: 60px;
    height: 60px;
  }
  
  .category-image {
    width: 40px;
    height: 40px;
  }
  
  .category-title {
    font-size: 0.85rem !important;
  }
}
</style> 