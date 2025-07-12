export const useProductsStore = defineStore('products', () => {
  // ✅ STATE - Reactive references
  const products = ref<any[]>([])
  const featuredProducts = ref<any[]>([])
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
  const getFeaturedProducts = computed(() => featuredProducts.value)
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

  const setFeaturedProducts = (data: any[]) => {
    featuredProducts.value = data
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
      const { searchProducts } = useProducts()
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
      const { getFeaturedProducts } = useProducts()
      const response = await getFeaturedProducts()

      if (response) {
        const productData = Array.isArray(response) ? response : (response as any).data || []
        setFeaturedProducts(productData)
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

  const fetchProductById = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const { getProductById } = useProducts()
      const response = await getProductById(id.toString())

      if (response) {
        setSelectedProduct(response)
      }

      return { success: true }
    } catch (err: any) {
      console.error('Product fetch error:', err)
      setError('Ürün yüklenirken hata oluştu')
      return { success: false, error: 'Ürün yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const searchProducts = async (query: string, page: number = 1) => {
    setFilters({ search: query })
    return await fetchProducts(page)
  }

  const filterProducts = async (newFilters: any, page: number = 1) => {
    setFilters(newFilters)
    return await fetchProducts(page)
  }

  const sortProducts = async (
    sortByValue: string,
    sortOrderValue: string = 'desc',
    page: number = 1
  ) => {
    setSorting(sortByValue, sortOrderValue)
    return await fetchProducts(page)
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      return fetchProducts(currentPage.value + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      return fetchProducts(currentPage.value - 1)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      return fetchProducts(page)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const clearProducts = () => {
    setProducts([])
    setFeaturedProducts([])
    setSelectedProduct(null)
  }

  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    products: readonly(products),
    featuredProducts: readonly(featuredProducts),
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
    fetchProductById,
    searchProducts,
    filterProducts,
    sortProducts,
    nextPage,
    prevPage,
    goToPage,
    setProducts,
    setFeaturedProducts,
    setSelectedProduct,
    setFilters,
    setSorting,
    clearFilters,
    clearError,
    clearProducts
  }
})
