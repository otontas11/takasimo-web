import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as any[],
    featuredProducts: [] as any[],
    selectedProduct: null as any,
    loading: false,
    error: null as string | null,
    
    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 12,
    
    // Filters
    filters: {
      category: null as string | null,
      minPrice: null as number | null,
      maxPrice: null as number | null,
      brand: null as string | null,
      search: '' as string
    },
    
    // Sorting
    sortBy: 'created_at',
    sortOrder: 'desc'
  }),

  getters: {
    getAllProducts: (state) => state.products,
    getFeaturedProducts: (state) => state.featuredProducts,
    getSelectedProduct: (state) => state.selectedProduct,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages,
    getFilters: (state) => state.filters,
    hasNextPage: (state) => state.currentPage < state.totalPages,
    hasPrevPage: (state) => state.currentPage > 1
  },

  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    setProducts(products: any[]) {
      this.products = products
    },

    setFeaturedProducts(products: any[]) {
      this.featuredProducts = products
    },

    setSelectedProduct(product: any) {
      this.selectedProduct = product
    },

    setPagination(data: any) {
      this.currentPage = data.current_page || 1
      this.totalPages = data.last_page || 1
      this.totalItems = data.total || 0
      this.perPage = data.per_page || 12
    },

    setFilters(filters: any) {
      this.filters = { ...this.filters, ...filters }
    },

    setSorting(sortBy: string, sortOrder: string = 'desc') {
      this.sortBy = sortBy
      this.sortOrder = sortOrder
    },

    clearFilters() {
      this.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        brand: null,
        search: ''
      }
    },

    async fetchProducts(page: number = 1) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { searchProducts } = useProducts()
        const params = {
          query: this.filters.search || '',
          filters: {
            page,
            per_page: this.perPage,
            sort_by: this.sortBy,
            sort_order: this.sortOrder,
            category: this.filters.category,
            min_price: this.filters.minPrice,
            max_price: this.filters.maxPrice,
            brand: this.filters.brand
          }
        }
        
        const response = await searchProducts(params.query, params.filters)
        
        if (response) {
          const products = Array.isArray(response) ? response : (response as any).data || []
          this.setProducts(products)
          
          if ((response as any).meta) {
            this.setPagination((response as any).meta)
          }
        }
        
        return { success: true }
      } catch (error) {
        console.error('Products fetch error:', error)
        this.setError('Ürünler yüklenirken hata oluştu')
        return { success: false, error: 'Ürünler yüklenirken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    async fetchFeaturedProducts() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getFeaturedProducts } = useProducts()
        const response = await getFeaturedProducts()
        
        if (response) {
          const products = Array.isArray(response) ? response : (response as any).data || []
          this.setFeaturedProducts(products)
        }
        
        return { success: true }
      } catch (error) {
        console.error('Featured products fetch error:', error)
        this.setError('Öne çıkan ürünler yüklenirken hata oluştu')
        return { success: false, error: 'Öne çıkan ürünler yüklenirken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    async fetchProductById(id: number) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getProduct } = useProducts()
        const response = await getProduct(id)
        
        if (response) {
          this.setSelectedProduct(response)
        }
        
        return { success: true }
      } catch (error) {
        console.error('Product fetch error:', error)
        this.setError('Ürün yüklenirken hata oluştu')
        return { success: false, error: 'Ürün yüklenirken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    async searchProducts(query: string, page: number = 1) {
      this.setFilters({ search: query })
      return await this.fetchProducts(page)
    },

    async filterProducts(filters: any, page: number = 1) {
      this.setFilters(filters)
      return await this.fetchProducts(page)
    },

    async sortProducts(sortBy: string, sortOrder: string = 'desc', page: number = 1) {
      this.setSorting(sortBy, sortOrder)
      return await this.fetchProducts(page)
    },

    nextPage() {
      if (this.hasNextPage) {
        return this.fetchProducts(this.currentPage + 1)
      }
    },

    prevPage() {
      if (this.hasPrevPage) {
        return this.fetchProducts(this.currentPage - 1)
      }
    },

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        return this.fetchProducts(page)
      }
    },

    clearError() {
      this.setError(null)
    }
  }
}) 