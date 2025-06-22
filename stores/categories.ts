import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as any[],
    loading: false,
    error: null as string | null,
    selectedCategory: null as any
  }),

  getters: {
    getAllCategories: (state) => state.categories,
    getMainCategories: (state) => state.categories.filter((cat: any) => !cat.parent_id),
    getSubCategories: (state) => (parentId: number) => 
      state.categories.filter((cat: any) => cat.parent_id === parentId),
    getCategoryById: (state) => (id: number) => 
      state.categories.find((cat: any) => cat.id === id),
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    setCategories(categories: any[]) {
      this.categories = categories
    },

    setSelectedCategory(category: any) {
      this.selectedCategory = category
    },

    async fetchCategories() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getMainCategories } = useApi()
        const response = await getMainCategories()
        
        if (response) {
          const categories = Array.isArray(response) ? response : (response as any).data || []
          this.setCategories(categories)
        }
        
        return { success: true }
      } catch (error) {
        console.error('Categories fetch error:', error)
        this.setError('Kategoriler yüklenirken hata oluştu')
        return { success: false, error: 'Kategoriler yüklenirken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    async fetchCategoryById(id: number) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        // API call burada yapılacak
        const response = await $fetch(`/api/categories/${id}`)
        
        if (response) {
          this.setSelectedCategory(response)
        }
        
        return { success: true }
      } catch (error) {
        console.error('Category fetch error:', error)
        this.setError('Kategori yüklenirken hata oluştu')
        return { success: false, error: 'Kategori yüklenirken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    clearError() {
      this.setError(null)
    }
  }
}) 