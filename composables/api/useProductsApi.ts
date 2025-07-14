import { useApi } from '~/composables/api/useApi'

export const useProductsApi = () => {
  const { api } = useApi()

  const getProducts = async (params: any = {}) => {
    try {
      const orderBy: string[] = []

      // Varsayılan sıralama: created_at ASC
      orderBy.push(`{"k":"created_at","v":"ASC"}`)

      const defaultParams = {
        filter: [JSON.stringify({ k: 'is_deleted', o: '=', v: false }), JSON.stringify({ k: 'status', o: '=', v: true })],
        with: ['city', 'district', 'doping'],
        page: 1,
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
        filter: [JSON.stringify({ k: "is_deleted", o: "=", v: false })],
        with: ["images", "owner", "city", "district", "categories"]
      })

      return response
    } catch (error) {
      console.error('getProductById error:', error)
      throw error
    }

  }

  return {
    getProducts,
    getProductById
  }
}
