import { useApi } from '~/composables/api/useApi'

export const useProductsApi = () => {
  const { api } = useApi()

  const getFeaturedProducts = async (limit: number = 10) => {
    try {
      const response = await api.get('products', {
        limit,
        filter: [
          '{"k": "is_deleted", "o": "=", "v": false}',
          '{"k": "status", "o": "=", "v": true}'
        ],
        with: ['city', 'district', 'category', 'user'],
        orderBy: '{"k": "created_at", "v": "desc"}'
      })

      return response
    } catch (error) {
      console.error('getFeaturedProducts error:', error)
      throw error
    }
  }

  const getProducts = async (params: any = {}) => {
    try {
      const defaultParams = {
        filter: [
          '{"k": "is_deleted", "o": "=", "v": false}',
          '{"k": "status", "o": "=", "v": true}'
        ],
        with: ['city', 'district', 'category', 'user'],
        orderBy: '{"k": "created_at", "v": "desc"}',
        ...params
      }

      const response = await api.get('products', defaultParams)
      return response
    } catch (error) {
      console.error('getProducts error:', error)
      throw error
    }
  }

  const getProductById = async (id: string) => {
    try {
      const response = await api.get(`products/${id}`, {
        with: ['city', 'district', 'category', 'user', 'images']
      })

      return response
    } catch (error) {
      console.error('getProductById error:', error)
      throw error
    }
  }

  const searchProducts = async (query: string, filters: any = {}) => {
    try {
      const searchParams = {
        search: query,
        filter: [
          '{"k": "is_deleted", "o": "=", "v": false}',
          '{"k": "status", "o": "=", "v": true}'
        ],
        with: ['city', 'district', 'category', 'user'],
        ...filters
      }

      const response = await api.get('products/search', searchParams)
      return response
    } catch (error) {
      console.error('searchProducts error:', error)
      throw error
    }
  }

  const getProductsByCategory = async (categoryId: string, params: any = {}) => {
    try {
      const response = await api.get('products', {
        filter: [
          '{"k": "is_deleted", "o": "=", "v": false}',
          '{"k": "status", "o": "=", "v": true}',
          `{"k": "category_id", "o": "=", "v": "${categoryId}"}`
        ],
        with: ['city', 'district', 'category', 'user'],
        ...params
      })

      return response
    } catch (error) {
      console.error('getProductsByCategory error:', error)
      throw error
    }
  }

  const createProduct = async (productData: any) => {
    try {
      const response = await api.post('products', productData)
      return response
    } catch (error) {
      console.error('createProduct error:', error)
      throw error
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await api.put(`products/${id}`, productData)
      return response
    } catch (error) {
      console.error('updateProduct error:', error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await api.delete(`products/${id}`)
      return response
    } catch (error) {
      console.error('deleteProduct error:', error)
      throw error
    }
  }

  return {
    getFeaturedProducts,
    getProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
