export const useCartStore = defineStore('cart', () => {
  // ✅ STATE - Reactive references
  const items = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ GETTERS - Computed properties
  const getItems = computed(() => items.value)
  const getItemCount = computed(() => items.value.length)
  const getTotalPrice = computed(() => items.value.reduce((total, item) => total + item.price * item.quantity, 0))
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const isEmpty = computed(() => items.value.length === 0)
  const getItemById = computed(() => (id: string) => items.value.find((item) => item.id === id))

  // ✅ ACTIONS - Functions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (value: string | null) => {
    error.value = value
  }

  const addItem = (product: any, quantity: number = 1) => {
    try {
      const existingItem = items.value.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({
          id: product.id,
          name: product.name || product.title,
          price: product.price,
          image: product.image || product.showcase_image,
          quantity,
          product_code: product.product_code,
          category: product.category,
          user: product.user
        })
      }

      // Save to localStorage
      if (process.client) {
        localStorage.setItem('cart_items', JSON.stringify(items.value))
      }

      return { success: true }
    } catch (err: any) {
      console.error('Add item error:', err)
      setError('Ürün sepete eklenirken hata oluştu')
      return { success: false, error: 'Ürün sepete eklenirken hata oluştu' }
    }
  }

  const removeItem = (id: string) => {
    try {
      const index = items.value.findIndex((item) => item.id === id)
      if (index > -1) {
        items.value.splice(index, 1)
      }

      // Save to localStorage
      if (process.client) {
        localStorage.setItem('cart_items', JSON.stringify(items.value))
      }

      return { success: true }
    } catch (err: any) {
      console.error('Remove item error:', err)
      setError('Ürün sepetten çıkarılırken hata oluştu')
      return { success: false, error: 'Ürün sepetten çıkarılırken hata oluştu' }
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    try {
      const item = items.value.find((item) => item.id === id)
      if (item) {
        if (quantity <= 0) {
          return removeItem(id)
        } else {
          item.quantity = quantity
        }
      }

      // Save to localStorage
      if (process.client) {
        localStorage.setItem('cart_items', JSON.stringify(items.value))
      }

      return { success: true }
    } catch (err: any) {
      console.error('Update quantity error:', err)
      setError('Ürün miktarı güncellenirken hata oluştu')
      return { success: false, error: 'Ürün miktarı güncellenirken hata oluştu' }
    }
  }

  const clearCart = () => {
    try {
      items.value = []

      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('cart_items')
      }

      return { success: true }
    } catch (err: any) {
      console.error('Clear cart error:', err)
      setError('Sepet temizlenirken hata oluştu')
      return { success: false, error: 'Sepet temizlenirken hata oluştu' }
    }
  }

  const loadFromLocalStorage = () => {
    if (process.client) {
      try {
        const savedItems = localStorage.getItem('cart_items')
        if (savedItems) {
          items.value = JSON.parse(savedItems)
        }
      } catch (err) {
        console.error('Load from localStorage error:', err)
        // Clear corrupted data
        localStorage.removeItem('cart_items')
      }
    }
  }

  const saveToLocalStorage = () => {
    if (process.client) {
      try {
        localStorage.setItem('cart_items', JSON.stringify(items.value))
      } catch (err) {
        console.error('Save to localStorage error:', err)
      }
    }
  }

  const initializeCart = () => {
    loadFromLocalStorage()
  }

  const checkout = async () => {
    setLoading(true)
    setError(null)

    try {
      // Bu kısımda gerçek checkout API çağrısı yapılacak
      // Şimdilik mock response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Başarılı checkout sonrası sepeti temizle
      clearCart()

      return { success: true, message: 'Sipariş başarıyla oluşturuldu' }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError('Sipariş oluşturulurken hata oluştu')
      return { success: false, error: 'Sipariş oluşturulurken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    getItems,
    getItemCount,
    getTotalPrice,
    isLoading,
    getError,
    isEmpty,
    getItemById,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadFromLocalStorage,
    saveToLocalStorage,
    initializeCart,
    checkout,
    clearError
  }
})
