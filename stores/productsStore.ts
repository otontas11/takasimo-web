import { useProductsApi } from '~/composables/api/useProductsApi'

export const useProductsStore = defineStore('products', () => {
  const { getProductById, getProducts, getProductsFilterQuery } = useProductsApi()

  // ✅ STATE - Reactive references
  const products = ref<any[]>([])
  const totalProducts = ref<any>(0)
  const totalPages = ref<any>(0)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Filter and sort state
  const currentFilters = ref({
    categoryCode: '',
    selectedCities: [],
    selectedDistricts: [],
    swap: '',
    priceRange: { min: null, max: null },
    dateSort: 'DESC',
    priceSort: ''
  })

  // ✅ GETTERS - Computed properties
  const getAllProducts = computed(() => products.value)
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // ✅ ACTIONS - Functions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (value: string | null) => {
    error.value = value
  }

  const clearError = () => {
    setError(null)
  }

  const setProducts = (data: any[]) => {
    products.value = data
  }

  const setFilters = (filters: any) => {
    currentFilters.value = { ...currentFilters.value, ...filters }
  }

  const updateSort = (sortType: 'date' | 'price', order: 'ASC' | 'DESC') => {
    if (sortType === 'date') {
      currentFilters.value.dateSort = order
      currentFilters.value.priceSort = ''
    } else if (sortType === 'price') {
      currentFilters.value.dateSort = ''
      currentFilters.value.priceSort = order
    }
  }

  const setTotalProductsAndPages = (response: any) => {
    totalPages.value = response.last_page
    totalProducts.value = response.total

    console.log("ssss",totalProducts.value)
  }

  const fetchProducts = async (page: number = 1) => {
    setLoading(true)
    setError(null)

    try {

      const response = await getProducts()

      if (response) {
        const productData = Array.isArray(response) ? response : (response as any).data || []

        // İlk sayfa ise verileri sıfırla, değilse mevcut listeye ekle
        if (page === 1) {
          setProducts(productData)
        } else {
          setProducts([...products.value, ...productData])
        }

      }

      return { success: true }
    } catch (err: any) {
      console.error('Products fetch error:', err)
      setError('Ürünler yüklenirken hata oluştu')
      return { success: false, error: 'Ürünler yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const fetchFilteredProducts = async (page: number = 1, filters?: any) => {
    setLoading(true)
    setError(null)

    try {
      // Merge filters with current filters
      const mergedFilters = filters ? { ...currentFilters.value, ...filters } : currentFilters.value
      
      const response = await getProductsFilterQuery(page, mergedFilters)
      setTotalProductsAndPages(response as any)

        console.log("getProductsFilterQuery",response)
      if (response) {
        const productData = Array.isArray(response) ? response : (response as any).data || []

        // İlk sayfa ise verileri sıfırla, değilse mevcut listeye ekle
        if (page === 1) {
          setProducts(productData)
        } else {
          setProducts([...products.value, ...productData])
        }
      }

      return { success: true }
    } catch (err: any) {
      console.error('Products fetch error:', err)
      setError('Ürünler yüklenirken hata oluştu')
      return { success: false, error: 'Ürünler yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const applySort = async (sortType: 'date' | 'price', order: 'ASC' | 'DESC') => {
    // Update sort in store
    updateSort(sortType, order)
    
    // Apply sort with current filters
    return await fetchFilteredProducts(1)
  }

  const searchProducts = async (query: string, filters: any = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = {
        query: query,
        filters: {
          page: 1,
          per_page: 1,
          sort_order: "",
          ...filters
        }
      }

      const response = await getProducts(params)

      if (response) {
        const productData = Array.isArray(response) ? response : (response as any).data || []
        setProducts(productData)
      }

      return { success: true }
    } catch (err: any) {
      console.error('Search products error:', err)
      setError('Arama yapılırken hata oluştu')
      return { success: false, error: 'Arama yapılırken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    products,
    loading,
    error,
    currentFilters,
    totalProducts,
    totalPages,

    // Getters
    getAllProducts,
    isLoading,
    getError,

    // Actions
    fetchProducts,
    searchProducts,
    setProducts,
    setFilters,
    updateSort,
    applySort,
    setTotalProductsAndPages,
    clearError,
    fetchFilteredProducts
  }
})
