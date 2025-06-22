// composables/useApi.ts
export const useApi = () => {
  const baseUrl = 'https://ap1.takasimo.com/api'

  // Generic API request function
  const apiRequest = async (endpoint: string, options: any = {}) => {
    const {
      method = 'GET',
      params = {},
      body,
      headers = {}
    } = options

    try {
      const url = `${baseUrl}/${endpoint.replace(/^\//, '')}`
      
      const requestOptions: any = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      }

      // Add query parameters for GET requests
      let finalUrl = url
      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams()
        
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => {
              if (typeof item === 'string') {
                searchParams.append(`${key}[]`, item)
              } else {
                searchParams.append(`${key}[]`, JSON.stringify(item))
              }
            })
          } else if (typeof value === 'object' && value !== null) {
            searchParams.append(key, JSON.stringify(value))
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
          }
        })
        
        finalUrl = `${url}?${searchParams.toString()}`
      }

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body)
      }

      const response = await $fetch(finalUrl, requestOptions)
      return response
    } catch (error: any) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  // Specific API methods
  const api = {
    get: (endpoint: string, params?: any) =>
      apiRequest(endpoint, { method: 'GET', params }),
    
    post: (endpoint: string, body?: any, headers?: any) =>
      apiRequest(endpoint, { method: 'POST', body, headers }),
    
    put: (endpoint: string, body?: any, headers?: any) =>
      apiRequest(endpoint, { method: 'PUT', body, headers }),
    
    delete: (endpoint: string) =>
      apiRequest(endpoint, { method: 'DELETE' })
  }

  // Categories API methods
  const getMainCategories = () => {
    const filter = [
      '{"k": "is_deleted", "o": "=", "v": false}',
      '{"k": "parent_code", "o": "=", "v": null}'
    ]
    
    const orderBy = [
      '{"k": "sequence", "v": "asc"}',
      '{"k": "name", "v": "asc"}'
    ]

    return api.get('categories', {
      filter,
      limit: 11,
      orderBy
    })
  }

  return {
    api,
    getMainCategories,
    baseUrl
  }
} 