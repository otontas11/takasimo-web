import { useProductsApi } from '~/composables/api/useProductsApi'

export const useProductsStore = defineStore('products', () => {
  const { getProductById, getProducts } = useProductsApi()

  // ✅ STATE - Reactive references
  const products = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

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

    // Getters
    getAllProducts,
    isLoading,
    getError,

    // Actions
    fetchProducts,
    searchProducts,
    setProducts,
    clearError
  }
})
