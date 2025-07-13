import {useProductsApi} from "~/composables/api/useProductsApi";

export const useProductsStore = defineStore('products', () => {
  const { getFeaturedProducts,getProductById , getProducts, searchProducts} = useProductsApi()

  // ✅ STATE - Reactive references
  const products = ref<any[]>([])
  const selectedProduct = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const perPage = ref(12)

  // Filters
  const filters = ref({
    category: null as string | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    brand: null as string | null,
    search: '' as string
  })

  // Sorting
  const sortBy = ref('created_at')
  const sortOrder = ref('desc')

  // ✅ GETTERS - Computed properties
  const getAllProducts = computed(() => products.value)
  const getSelectedProduct = computed(() => selectedProduct.value)
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getCurrentPage = computed(() => currentPage.value)
  const getTotalPages = computed(() => totalPages.value)
  const getFilters = computed(() => filters.value)
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // ✅ ACTIONS - Functions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (value: string | null) => {
    error.value = value
  }

  const setProducts = (data: any[]) => {
    products.value = data
  }

  const setSelectedProduct = (product: any) => {
    selectedProduct.value = product
  }

  const setPagination = (data: any) => {
    currentPage.value = data.current_page || 1
    totalPages.value = data.last_page || 1
    totalItems.value = data.total || 0
    perPage.value = data.per_page || 12
  }

  const setFilters = (newFilters: any) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const setSorting = (sortByValue: string, sortOrderValue: string = 'desc') => {
    sortBy.value = sortByValue
    sortOrder.value = sortOrderValue
  }

  const clearFilters = () => {
    filters.value = {
      category: null,
      minPrice: null,
      maxPrice: null,
      brand: null,
      search: ''
    }
  }

  const fetchProducts = async (page: number = 1) => {
    setLoading(true)
    setError(null)

    try {
      const params = {
        query: filters.value.search || '',
        filters: {
          page,
          per_page: perPage.value,
          sort_by: sortBy.value,
          sort_order: sortOrder.value,
          category: filters.value.category,
          min_price: filters.value.minPrice,
          max_price: filters.value.maxPrice,
          brand: filters.value.brand
        }
      }

      const response = await searchProducts(params.query, params.filters)

      if (response) {
        const productData = Array.isArray(response) ? response : (response as any).data || []
        setProducts(productData)

        if ((response as any).meta) {
          setPagination((response as any).meta)
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

  const fetchFeaturedProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getFeaturedProducts()

      if (response) {
        console.log("fetchFeaturedProducts",response)
        const productData = Array.isArray(response) ? response : (response as any).data || []
        setProducts(productData)
      }

      return { success: true }
    } catch (err: any) {
      console.error('Featured products fetch error:', err)
      setError('Öne çıkan ürünler yüklenirken hata oluştu')
      return { success: false, error: 'Öne çıkan ürünler yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }


  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    products: readonly(products),
    selectedProduct: readonly(selectedProduct),
    loading: readonly(loading),
    error: readonly(error),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    totalItems: readonly(totalItems),
    perPage: readonly(perPage),
    filters: readonly(filters),
    sortBy: readonly(sortBy),
    sortOrder: readonly(sortOrder),

    // Getters
    getAllProducts,
    getFeaturedProducts,
    getSelectedProduct,
    isLoading,
    getError,
    getCurrentPage,
    getTotalPages,
    getFilters,
    hasNextPage,
    hasPrevPage,

    // Actions
    fetchProducts,
    fetchFeaturedProducts,
    searchProducts,
    setProducts,
    setFeaturedProducts,
    setSelectedProduct,
    setFilters,
    setSorting,
    clearFilters,
    clearError,
  }
})
