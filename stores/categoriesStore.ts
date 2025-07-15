import { useCategoriesApi } from '~/composables/api/useCategoriesApi'

export const useCategoriesStore = defineStore('categories', () => {
  const { getMainCategories } = useCategoriesApi()

  // ✅ STATE - Reactive references
  const categories = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ GETTERS - Computed properties
  const getAllCategories = computed(() => categories.value)
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

  const setCategories = (data: any[]) => {
    categories.value = data
  }

  const fetchCategories = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getMainCategories()

      if (response) {
        const categoryData = Array.isArray(response) ? response : (response as any).data || []
        setCategories(categoryData)
      }

      return { success: true }
    } catch (err: any) {
      console.error('Categories fetch error:', err)
      setError('Kategoriler yüklenirken hata oluştu')
      return { success: false, error: 'Kategoriler yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }


  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    categories,
    loading,
    error,

    // Getters
    getAllCategories,
    isLoading,
    getError,

    // Actions
    fetchCategories,
    setCategories,
    clearError,
  }
})
