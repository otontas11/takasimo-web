import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // Theme & UI
    theme: 'light' as 'light' | 'dark',
    sidebarOpen: false,
    mobileMenuOpen: false,

    // Language & Localization
    locale: 'tr' as string,
    currency: 'TRY' as string,

    // Notifications
    notifications: [] as any[],

    // Loading states
    globalLoading: false,

    // Search
    searchQuery: '',
    searchHistory: [] as string[],

    // Page meta
    pageTitle: 'Takasimo',
    pageDescription: '',

    // App settings
    settings: {
      showWelcomeMessage: true,
      enableNotifications: true,
      autoSave: true
    }
  }),

  getters: {
    getTheme: (state) => state.theme,
    isDarkMode: (state) => state.theme === 'dark',
    isSidebarOpen: (state) => state.sidebarOpen,
    isMobileMenuOpen: (state) => state.mobileMenuOpen,
    getLocale: (state) => state.locale,
    getCurrency: (state) => state.currency,
    getNotifications: (state) => state.notifications,
    getUnreadNotifications: (state) => state.notifications.filter((n) => !n.read),
    getNotificationCount: (state) => state.notifications.filter((n) => !n.read).length,
    isGlobalLoading: (state) => state.globalLoading,
    getSearchQuery: (state) => state.searchQuery,
    getSearchHistory: (state) => state.searchHistory,
    getPageTitle: (state) => state.pageTitle,
    getSettings: (state) => state.settings
  },

  actions: {
    // Theme actions
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme

      // Update HTML class for CSS - only on client side
      if (process.client && typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
    },

    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },

    // UI actions
    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open
    },

    toggleSidebar() {
      this.setSidebarOpen(!this.sidebarOpen)
    },

    setMobileMenuOpen(open: boolean) {
      this.mobileMenuOpen = open
    },

    toggleMobileMenu() {
      this.setMobileMenuOpen(!this.mobileMenuOpen)
    },

    // Language actions
    setLocale(locale: string) {
      this.locale = locale
    },

    setCurrency(currency: string) {
      this.currency = currency
    },

    // Notification actions
    addNotification(notification: any) {
      const id = Date.now().toString()
      this.notifications.unshift({
        id,
        read: false,
        createdAt: new Date(),
        ...notification
      })
    },

    markNotificationAsRead(id: string) {
      const notification = this.notifications.find((n) => n.id === id)
      if (notification) {
        notification.read = true
      }
    },

    markAllNotificationsAsRead() {
      this.notifications.forEach((n) => (n.read = true))
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex((n) => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearNotifications() {
      this.notifications = []
    },

    // Loading actions
    setGlobalLoading(loading: boolean) {
      this.globalLoading = loading
    },

    // Search actions
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    addToSearchHistory(query: string) {
      if (query.trim() && !this.searchHistory.includes(query)) {
        this.searchHistory.unshift(query)

        // Keep only last 10 searches
        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10)
        }
      }
    },

    clearSearchHistory() {
      this.searchHistory = []
    },

    // Page meta actions
    setPageTitle(title: string) {
      this.pageTitle = title

      // Update document title - only on client side
      if (process.client && typeof document !== 'undefined') {
        document.title = title
      }
    },

    setPageDescription(description: string) {
      this.pageDescription = description
    },

    // Settings actions
    updateSettings(settings: any) {
      this.settings = { ...this.settings, ...settings }
    },

    // Utility actions
    showSuccessMessage(message: string) {
      this.addNotification({
        type: 'success',
        title: 'Başarılı',
        message,
        autoClose: true,
        duration: 3000
      })
    },

    showErrorMessage(message: string) {
      this.addNotification({
        type: 'error',
        title: 'Hata',
        message,
        autoClose: true,
        duration: 5000
      })
    },

    showInfoMessage(message: string) {
      this.addNotification({
        type: 'info',
        title: 'Bilgi',
        message,
        autoClose: true,
        duration: 4000
      })
    },

    showWarningMessage(message: string) {
      this.addNotification({
        type: 'warning',
        title: 'Uyarı',
        message,
        autoClose: true,
        duration: 4000
      })
    },

    // Initialize app
    async initializeApp() {
      // Load user preferences - only on client side
      if (process.client && typeof window !== 'undefined') {
        try {
          const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
          if (savedTheme) {
            this.setTheme(savedTheme)
          }

          const savedLocale = localStorage.getItem('locale')
          if (savedLocale) {
            this.setLocale(savedLocale)
          }
        } catch (error) {
          console.warn('Failed to load user preferences:', error)
        }
      }
    }
  },

  persist: true
})
