<template>
  <div 
    class="category-header"
    :class="{ 'scrollable': isScrollable }"
  >
    <v-container fluid class="pa-0">
      <v-row align="center" no-gutters class="px-4 py-3">
        <v-col>
          <div class="d-flex align-center justify-space-between">
            <!-- Categories -->
            <div class="d-flex align-center category-list">
              <span class="category-item font-weight-bold">Elektronik</span>
              <span class="category-item">Moda</span>
              <span class="category-item font-weight-bold">Ev/Yaşam</span>
              <span class="category-item">Vasıta</span>
              <span class="category-item font-weight-bold">Anne/Bebek</span>
              <span class="category-item">Spor/Outdoor</span>
              <span class="category-item font-weight-bold">Kozmetik/Kişisel Bakım</span>
            </div>
            
            <!-- See All Link -->
            <a href="#" class="see-all-link">
              Tümünü gör
              <v-icon size="16" class="ml-1">mdi-chevron-right</v-icon>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrollable = ref(false)
const scrollThreshold = 300 // 300px scroll sonrası scrollable olur

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isScrollable.value = scrollTop > scrollThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.category-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 80px; /* AppHeader'ın yüksekliği kadar */
  z-index: 999;
  width: 100%;
  transition: all 0.3s ease;
}

/* İlk başta fixed, scroll sonrası scrollable */
.category-header:not(.scrollable) {
  position: sticky;
  top: 80px;
}

.category-header.scrollable {
  position: relative;
  top: auto;
}

.category-list {
  gap: 2rem;
  flex-wrap: wrap;
}

.category-item {
  color: #333;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
}

.category-item:hover {
  color: #8B2865;
}

.see-all-link {
  color: #8B2865;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.2s;
}

.see-all-link:hover {
  color: #6d1e4f;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 960px) {
  .category-list {
    gap: 1rem;
  }
  
  .category-item {
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .category-list {
    gap: 0.8rem;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  
  .category-item {
    font-size: 0.85rem;
  }
}
</style> 