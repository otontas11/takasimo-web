import { useApi } from '~/composables/useApi'

export const useAuth = () => {
    const { api } = useApi()

    // Login
    const login = (credentials: any) => {
        return api.post('auth/login', credentials)
    }

    // Register
    const register = (userData: any) => {
        return api.post('auth/register', userData)
    }

    // Logout
    const logout = () => {
        return api.post('auth/logout')
    }

    // Get current user
    const getCurrentUser = () => {
        return api.get('auth/me')
    }

    // Refresh token
    const refreshToken = () => {
        return api.post('auth/refresh')
    }

    // Forgot password
    const forgotPassword = (email: string) => {
        return api.post('auth/forgot-password', { email })
    }

    // Reset password
    const resetPassword = (data: any) => {
        return api.post('auth/reset-password', data)
    }

    // Change password
    const changePassword = (data: any) => {
        return api.post('auth/change-password', data)
    }

    return {
        login,
        register,
        logout,
        getCurrentUser,
        refreshToken,
        forgotPassword,
        resetPassword,
        changePassword
    }
} 