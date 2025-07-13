export const useAuthStore = defineStore('auth', () => {
  // ✅ STATE - Reactive references
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ GETTERS - Computed properties
  const getUser = computed(() => user.value)
  const getToken = computed(() => token.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getUserName = computed(() => user.value?.name || '')
  const getUserEmail = computed(() => user.value?.email || '')
  const getUserAvatar = computed(() => user.value?.avatar || '/images/default-avatar.jpg')

  // ✅ ACTIONS - Functions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (value: string | null) => {
    error.value = value
  }

  const setUser = (userData: any) => {
    user.value = userData
  }

  const setToken = (tokenValue: string | null) => {
    token.value = tokenValue
    isAuthenticated.value = !!tokenValue

    // Client-side token management
    if (process.client) {
      if (tokenValue) {
        localStorage.setItem('auth_token', tokenValue)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  const initializeAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token')
      if (savedToken) {
        setToken(savedToken)
      }
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    setError(null)

    try {
      const { login } = useAuth()
      const response = (await login(credentials)) as any

      if (response.token) {
        setToken(response.token)
        setUser(response.user)
      }

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Login error:', err)
      setError('Giriş yapılırken hata oluştu')
      return { success: false, error: 'Giriş yapılırken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    setError(null)

    try {
      const { register } = useAuth()
      const response = (await register(userData)) as any

      if (response.token) {
        setToken(response.token)
        setUser(response.user)
      }

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Register error:', err)
      setError('Kayıt olurken hata oluştu')
      return { success: false, error: 'Kayıt olurken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)

    try {
      const { logout } = useAuth()
      await logout()

      // Clear local state
      setToken(null)
      setUser(null)

      return { success: true }
    } catch (err: any) {
      console.error('Logout error:', err)
      // Clear local state even if API call fails
      setToken(null)
      setUser(null)
      return { success: true } // Consider logout successful even if API fails
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return { success: false, error: 'No token' }

    setLoading(true)
    setError(null)

    try {
      const { getCurrentUser } = useAuth()
      const response = await getCurrentUser()

      if (response) {
        setUser(response)
      }

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Fetch current user error:', err)
      setError('Kullanıcı bilgileri alınırken hata oluştu')
      // If token is invalid, clear auth state
      if (err.statusCode === 401) {
        setToken(null)
        setUser(null)
      }
      return { success: false, error: 'Kullanıcı bilgileri alınırken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: any) => {
    setLoading(true)
    setError(null)

    try {
      const { updateProfile } = useAuth()
      const response = await updateProfile(userData)

      if (response) {
        setUser(response)
      }

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Update profile error:', err)
      setError('Profil güncellenirken hata oluştu')
      return { success: false, error: 'Profil güncellenirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (passwordData: { current_password: string; new_password: string }) => {
    setLoading(true)
    setError(null)

    try {
      const { changePassword } = useAuth()
      const response = await changePassword(passwordData)

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Change password error:', err)
      setError('Şifre değiştirilirken hata oluştu')
      return { success: false, error: 'Şifre değiştirilirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setLoading(true)
    setError(null)

    try {
      const { forgotPassword } = useAuth()
      const response = await forgotPassword(email)

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Forgot password error:', err)
      setError('Şifre sıfırlama e-postası gönderilirken hata oluştu')
      return { success: false, error: 'Şifre sıfırlama e-postası gönderilirken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (resetData: { token: string; password: string }) => {
    setLoading(true)
    setError(null)

    try {
      const { resetPassword } = useAuth()
      const response = await resetPassword(resetData)

      return { success: true, data: response }
    } catch (err: any) {
      console.error('Reset password error:', err)
      setError('Şifre sıfırlanırken hata oluştu')
      return { success: false, error: 'Şifre sıfırlanırken hata oluştu' }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const clearAuth = () => {
    setToken(null)
    setUser(null)
    setError(null)
  }

  // ✅ RETURN - Expose state, getters, and actions
  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    getUser,
    getToken,
    getIsAuthenticated,
    isLoading,
    getError,
    getUserName,
    getUserEmail,
    getUserAvatar,

    // Actions
    initializeAuth,
    login,
    register,
    logout,
    fetchCurrentUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    setUser,
    setToken,
    clearError,
    clearAuth
  }
})
