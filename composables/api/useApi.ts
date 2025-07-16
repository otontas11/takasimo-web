export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'https://ap1.takasimo.com/api'

  const apiRequest = async (endpoint: string, options: any = {}) => {
    const { method = 'GET', params = {}, body, headers = {} } = options

    try {
      let url = `${baseUrl}/${endpoint.replace(/^\//, '')}`
      const requestOptions: any = {
        method,
        headers: {
          ...headers,
          ...(method !== 'GET' && !headers['Content-Type'] ? { 'Content-Type': 'application/json' } : {})
        }
      }

      // GET query
      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Array parametreleri için key[] formatını kullan
            value.forEach((item) => searchParams.append(`${key}[]`, item))
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
          }
        })
        url += `?${searchParams.toString()}`
      }

      // Body
      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body)
      }

      const result = await $fetch(url, requestOptions)
      return result
    } catch (error: any) {
      console.error('API Request Error:', error)
      throw createError({
        statusCode: error?.response?.status || 500,
        statusMessage: error?.message || 'API error',
        data: error?.data
      })
    }
  }

  const api = {
    get: (endpoint: string, params?: any, headers?: any) => apiRequest(endpoint, { method: 'GET', params, headers }),
    post: (endpoint: string, body?: any, headers?: any) => apiRequest(endpoint, { method: 'POST', body, headers }),
    put: (endpoint: string, body?: any, headers?: any) => apiRequest(endpoint, { method: 'PUT', body, headers }),
    delete: (endpoint: string, headers?: any) => apiRequest(endpoint, { method: 'DELETE', headers })
  }

  return { api, baseUrl }
}
