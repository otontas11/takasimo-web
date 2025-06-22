import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    setUser(user: any) {
      this.user = user
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Local storage'ı temizle
      if (process.client) {
        localStorage.removeItem('auth-token')
      }
    },

    async login(credentials: any) {
      try {
        // API call burada yapılacak - şimdilik mock
        // const response = await $fetch('/api/auth/login', { method: 'POST', body: credentials })
        
        // Mock response for now
        const mockResponse = {
          success: true,
          user: { id: 1, email: credentials.email, name: 'Test User' },
          token: 'mock-token-123'
        }
        
        if (mockResponse.success) {
          this.setUser(mockResponse.user)
          this.setToken(mockResponse.token)
          
          return { success: true }
        }
        
        return { success: false, message: 'Giriş başarısız' }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, message: 'Giriş yapılırken hata oluştu' }
      }
    },

    async register(userData: any) {
      try {
        // API call burada yapılacak - şimdilik mock
        // const response = await $fetch('/api/auth/register', { method: 'POST', body: userData })
        
        return { success: true, message: 'Kayıt başarılı' }
      } catch (error) {
        console.error('Register error:', error)
        return { success: false, message: 'Kayıt olurken hata oluştu' }
      }
    }
  },

  persist: true
})
