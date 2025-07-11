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
    getSubCategories: (state) => (parentId: any) => 
      state.categories.filter((cat: any) => cat.parent_id === parentId),
    getCategoryById: (state) => (id: any) => 
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

    },

    async fetchCategoryById(id: any) {
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