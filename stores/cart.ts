import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    getItems: (state) => state.items,
    getItemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    getTotalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    getItemById: (state) => (productId: number) => 
      state.items.find(item => item.product_id === productId),
    isEmpty: (state) => state.items.length === 0,
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

    addItem(product: any, quantity: number = 1) {
      const existingItem = this.getItemById(product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          price: product.price,
          quantity: quantity,
          product: product
        })
      }
      
      this.setError(null)
    },

    removeItem(productId: number) {
      const index = this.items.findIndex(item => item.product_id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.getItemById(productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    increaseQuantity(productId: number) {
      const item = this.getItemById(productId)
      if (item) {
        item.quantity += 1
      }
    },

    decreaseQuantity(productId: number) {
      const item = this.getItemById(productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          this.removeItem(productId)
        }
      }
    },

    clearCart() {
      this.items = []
      this.setError(null)
    },

    async syncWithServer() {
      // Server ile senkronizasyon için
      this.setLoading(true)
      this.setError(null)
      
      try {
        // API call burada yapılacak
        // const response = await $fetch('/api/cart/sync', {
        //   method: 'POST',
        //   body: { items: this.items }
        // })
        
        return { success: true }
      } catch (error) {
        console.error('Cart sync error:', error)
        this.setError('Sepet senkronizasyonunda hata oluştu')
        return { success: false, error: 'Sepet senkronizasyonunda hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    async checkout() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        // Checkout API call
        // const response = await $fetch('/api/checkout', {
        //   method: 'POST',
        //   body: {
        //     items: this.items,
        //     total: this.getTotalPrice
        //   }
        // })
        
        // Başarılı checkout sonrası sepeti temizle
        this.clearCart()
        
        return { success: true, message: 'Sipariş başarıyla oluşturuldu' }
      } catch (error) {
        console.error('Checkout error:', error)
        this.setError('Sipariş oluşturulurken hata oluştu')
        return { success: false, error: 'Sipariş oluşturulurken hata oluştu' }
      } finally {
        this.setLoading(false)
      }
    },

    clearError() {
      this.setError(null)
    }
  },

  persist: true
}) 