<template>
  <div class="category-header" :class="{ scrollable: isScrollable }">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row align="center" no-gutters class="px-4 py-3">
        <v-col>
          <div class="d-flex align-center justify-space-between category-container">
            <!-- Categories -->
            <div ref="categoryListRef" class="category-list">
              <span
                v-for="(category, index) in visibleCategories"
                :key="category.id || category.category_code || index"
                class="category-item"
                :class="{ 'font-weight-bold': index % 2 === 0 }"
                @click="navigateToCategory(category)"
              >
                {{ category.name }}
              </span>
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

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

// Props
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const isScrollable = ref(false)
const scrollThreshold = 300 // 300px scroll sonrası scrollable olur
const categoryListRef = ref(null)
const containerWidth = ref(0)
const windowWidth = ref(1024) // Default desktop width

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

// Computed properties
const visibleCategories = computed(() => {
  if (!props.categories || props.categories.length === 0) {
    return []
  }
  // Masaüstü: 8 kategori, mobil: alan kadar
  if (windowWidth.value > 600) {
    return props.categories.slice(0, 8)
  }
  // Mobilde mevcut algoritma
  const maxCategories = calculateMaxCategories()
  return props.categories.slice(0, maxCategories)
})

// Methods
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isScrollable.value = scrollTop > scrollThreshold
}

const calculateMaxCategories = () => {
  if (!containerWidth.value) return props.categories?.length || 0

  // Base calculations for different screen sizes
  const baseCategoryWidth = 120 // Estimated width per category including gap
  const reservedSpace = 140 // Reserved space for "Tümünü gör" link + gap
  const containerPadding = 32 // Container padding
  
  const availableWidth = containerWidth.value - reservedSpace - containerPadding
  const maxCategories = Math.floor(availableWidth / baseCategoryWidth)
  
  // Ensure minimum and maximum bounds
  return Math.max(3, Math.min(maxCategories, props.categories?.length || 0))
}

const updateContainerWidth = () => {
  if (categoryListRef.value) {
    const container = categoryListRef.value.closest('.v-container')
    if (container) {
      // Get the actual container width
      containerWidth.value = container.offsetWidth
    } else {
      // Fallback to window width if container not found
      containerWidth.value = window.innerWidth
    }
  }
}

const navigateToCategory = (category) => {
  const slug = category.category_code || category.code || category.id?.toString()
  if (slug) {
    navigateTo(`/kategori/${slug}`)
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateContainerWidth)
  window.addEventListener('resize', updateWindowWidth)
  updateWindowWidth()
  // Initial width calculation
  nextTick(() => {
    updateContainerWidth()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateContainerWidth)
  window.removeEventListener('resize', updateWindowWidth)
})

// Watch for container width changes
watch(containerWidth, () => {
  // Trigger reactive update when width changes
}, { immediate: true })
</script>

<style scoped>
.category-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 80px;
  z-index: 999;
  width: 100%;
  transition: all 0.3s ease;
}
.category-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.category-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
}
.category-item {
  color: #333;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.category-item:hover {
  color: #8b2865;
}
.see-all-link {
  color: #8b2865;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.2s;
  flex-shrink: 0;
  min-width: 120px;
  margin-left: 1.5rem;
}
.see-all-link:hover {
  color: #6d1e4f;
  text-decoration: none;
}
@media (max-width: 600px) {
  .category-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .category-list {
    gap: 0.6rem;
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    max-width: 100%;
    flex-wrap: nowrap;
  }
  .category-item {
    font-size: 0.8rem;
  }
  .see-all-link {
    min-width: auto;
    align-self: flex-end;
    margin-left: 0;
  }
}
</style>
