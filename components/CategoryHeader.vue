<template>
  <div class="category-header" :class="{ scrollable: isScrollable }">
    <v-container class="pa-0" style="max-width: 1320px">
      <v-row align="center" no-gutters class="px-4 py-3">
        <v-col>
          <div class="d-flex align-center justify-space-between category-container">
            <!-- Categories -->
            <div ref="categoryListRef" class="category-list">

                <template v-if="visibleCategories.length > 0">
                  <span
                    v-for="(category, index) in visibleCategories"
                    :key="(category as any).id || (category as any).category_code || index"
                    class="category-item"
                    :class="{ 'font-weight-bold': index % 2 === 0 }"
                    @click="navigateToCategory(category)"
                  >
                    {{ (category as any).name }}
                  </span>
                </template>
                <template v-else>
                  <!-- Skeleton loading for categories -->
                  <div class="skeleton-container">
                    <div v-for="i in 6" :key="i" class="skeleton-item"></div>
                  </div>
                </template>

            </div>

            <!-- See All Link with Dropdown -->
            <div 
              class="see-all-container"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            >
              <a href="#" class="see-all-link">
                Tümünü gör
                <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
              </a>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="showDropdown && remainingCategories.length > 0" 
                class="dropdown-menu"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              >
                <div class="dropdown-content">
                  <div 
                    v-for="category in remainingCategories" 
                    :key="(category as any).id || (category as any).category_code"
                    class="dropdown-item"
                    @click="navigateToCategory(category)"
                  >
                    {{ (category as any).name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

interface Category {
  id?: string | number
  category_code?: string
  code?: string
  name?: string
}

// Props
const props = defineProps({
  categories: {
    type: Array as () => Category[],
    default: () => []
  }
})

const isScrollable = ref(false)
const scrollThreshold = 300 // 300px scroll sonrası scrollable olur
const categoryListRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const windowWidth = ref(1024) // Default desktop width
const isClient = ref(false)
const showDropdown = ref(false)

const updateWindowWidth = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth
  }
}

// Computed properties
const visibleCategories = computed(() => {
  if (!isClient.value || !props.categories || props.categories.length === 0) {
    return []
  }
  if (windowWidth.value > 600) {
    return props.categories.slice(0, 8)
  }
  // Mobilde sadece 4 kategori
  return props.categories.slice(0, 4)
})

const remainingCategories = computed(() => {
  if (!props.categories || props.categories.length === 0) {
    return []
  }
  const visibleCount = windowWidth.value > 600 ? 8 : 4
  return props.categories.slice(visibleCount)
})

// Methods
const handleScroll = () => {
  if (process.client) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    isScrollable.value = scrollTop > scrollThreshold
  }
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
  if (process.client && categoryListRef.value) {
    const container = categoryListRef.value.closest('.v-container') as HTMLElement
    if (container) {
      // Get the actual container width
      containerWidth.value = container.offsetWidth
    } else {
      // Fallback to window width if container not found
      containerWidth.value = window.innerWidth
    }
  }
}

const navigateToCategory = (category: Category) => {
  const slug = category.category_code || category.code || category.id?.toString()
  if (slug) {
    navigateTo(`/category-detail/${slug}`)
  }
}

let closeTimeout: NodeJS.Timeout | null = null

const handleMouseLeave = () => {
  // Önceki timeout'u temizle
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
  
  // Daha uzun gecikme ile dropdown'ı kapat
  closeTimeout = setTimeout(() => {
    showDropdown.value = false
  }, 300)
}

const handleMouseEnter = () => {
  // Mouse girdiğinde timeout'u temizle
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  showDropdown.value = true
}

// Lifecycle
onMounted(() => {
  isClient.value = true
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateContainerWidth)
    window.addEventListener('resize', updateWindowWidth)
    updateWindowWidth()
    // Initial width calculation
    nextTick(() => {
      updateContainerWidth()
    })
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', updateContainerWidth)
    window.removeEventListener('resize', updateWindowWidth)
  }
  
  // Timeout'u temizle
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
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
.category-item.placeholder {
  color: #999;
  cursor: default;
  font-style: italic;
}

/* Skeleton Loading Styles */
.skeleton-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
}

.skeleton-item {
  width: 80px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  flex-shrink: 0;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.see-all-container {
  position: relative;
  display: flex;
  align-items: center;
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
  cursor: pointer;
}

.see-all-link:hover {
  color: #6d1e4f;
  text-decoration: none;
}

/* Dropdown Styles */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  animation: dropdown-fade-in 0.2s ease-out;
}

.dropdown-content {
  padding: 8px 0;
}

.dropdown-item {
  padding: 8px 16px;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #8b2865;
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .category-container {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  .category-list {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    flex: 1 1 0;
    min-width: 0;
    gap: 0.6rem;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
  .category-item {
    font-size: 0.8rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .see-all-link {
    min-width: auto;
    flex-shrink: 0;
    margin-left: 1rem;
    margin-top: 0;
    font-size: 0.9rem;
    align-self: auto;
  }
  .skeleton-container {
    gap: 0.6rem;
  }
  
  .skeleton-item {
    width: 60px;
    height: 16px;
  }
  
  .dropdown-menu {
    right: -10px;
    min-width: 180px;
  }
}
</style>
