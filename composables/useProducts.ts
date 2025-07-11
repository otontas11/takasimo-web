import { useApi } from '~/composables/useApi'

export const useProducts = () => {
    const { api } = useApi()

    // Get featured products
    const getFeaturedProducts = (limit = 10) => {
        const filter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "is_active", "o": "=", "v": true}',
            '{"k": "is_featured", "o": "=", "v": true}'
        ]
        
        const orderBy = [
            '{"k": "featured_at", "v": "desc"}',
            '{"k": "created_at", "v": "desc"}'
        ]

        return api.get('products', {
            params: {
                filter,
                limit,
                orderBy,
                with: ["images", "category", "user"]
            }
        })
    }

    // Get products by category
    const getProductsByCategory = (categoryCode: string, limit = 20, page = 1) => {
        const filter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "is_active", "o": "=", "v": true}',
            `{"k": "category_code", "o": "=", "v": "${categoryCode}"}`
        ]
        
        const orderBy = [
            '{"k": "created_at", "v": "desc"}'
        ]

        return api.get('products', {
            params: {
                filter,
                limit,
                page,
                orderBy,
                with: ["images", "category", "user"]
            }
        })
    }

    // Search products
    const searchProducts = (query: string, filters: any = {}) => {
        const baseFilter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "is_active", "o": "=", "v": true}'
        ]

        // Add search query filter
        if (query) {
            baseFilter.push(`{"k": "title", "o": "like", "v": "%${query}%"}`)
        }

        // Add additional filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                baseFilter.push(`{"k": "${key}", "o": "=", "v": "${value}"}`)
            }
        })
        
        const orderBy = [
            '{"k": "created_at", "v": "desc"}'
        ]

        return api.get('products', {
            params: {
                filter: baseFilter,
                limit: filters.limit || 20,
                page: filters.page || 1,
                orderBy,
                with: ["images", "category", "user"]
            }
        })
    }

    // Get all products
    const getAllProducts = (limit = 20, page = 1) => {
        const filter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "is_active", "o": "=", "v": true}'
        ]
        
        const orderBy = [
            '{"k": "created_at", "v": "desc"}'
        ]

        return api.get('products', {
            params: {
                filter,
                limit,
                page,
                orderBy,
                with: ["images", "category", "user"]
            }
        })
    }

    return { 
        getFeaturedProducts,
        getProductsByCategory,
        searchProducts,
        getAllProducts
    }
} 