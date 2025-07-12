import {useCategoriesApi} from "~/composables/api/useCategoriesApi";

export const useCategoriesStore = defineStore('categories', () => {
  const { getMainCategories } = useCategoriesApi()

  // ✅ STATE - Reactive references
  const categories = ref<any[]>([])
  const selectedCategory = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ GETTERS - Computed properties
  const getAllCategories = computed(() => categories.value)
  const mainCategories = computed(() =>
      categories.value.filter((cat: any) => !cat.parent_id)
  )
  const getSubCategories = computed(() => (parentId: any) =>
      categories.value.filter((cat: any) => cat.parent_id === parentId)
  )
  const getCategoryById = computed(() => (id: any) =>
      categories.value.find((cat: any) => cat.id === id)
  )
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  // ✅ ACTIONS - Functions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (value: string | null) => {
    error.value = value
  }

  const setCategories = (data: any[]) => {
    categories.value = data
  }

  const setSelectedCategory = (category: any) => {
    selectedCategory.value = category
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

  const fetchCategoryById = async (id: any) => {
    setLoading(true)
    setError(null)

    try {
      const { getCategoryById } = useCategories()
      const response = await getCategoryById(id)

      if (response) {
        setSelectedCategory(response)
      }

      return { success: true }
    } catch (err: any) {
      console.error('Category fetch error:', err)
      setError('Kategori yüklenirken hata oluştu')
      return { success: false, error: 'Kategori yüklenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const clearCategories = () => {
    setCategories([])
    setSelectedCategory(null)
  }

  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    categories: readonly(categories),
    selectedCategory: readonly(selectedCategory),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    getAllCategories,
    mainCategories,
    getSubCategories,
    getCategoryById,
    isLoading,
    getError,

    // Actions
    fetchCategories,
    fetchCategoryById,
    setCategories,
    setSelectedCategory,
    clearError,
    clearCategories
  }
}) 