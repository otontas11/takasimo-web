export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'https://fallback.api.com/api'

  const apiRequest = async (endpoint: string, options = {}) => {
    const {
      method = 'GET',
      params = {},
      body,
      headers = {}
    } = options

    try {
      let url = `${baseUrl}/${endpoint.replace(/^\//, '')}`
      const requestOptions = {
        method,
        headers: {
          ...headers,
          ...(method !== 'GET' && !headers['Content-Type']
              ? { 'Content-Type': 'application/json' }
              : {})
        }
      }

      // GET query
      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item))
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

      return await $fetch(url, requestOptions)
    } catch (error) {
      console.error('API Request Error:', error)
      throw createError({
        statusCode: error?.response?.status || 500,
        statusMessage: error?.message || 'API error',
        data: error?.data
      })
    }
  }

  const api = {
    get: (endpoint: string, params?) => apiRequest(endpoint, { method: 'GET', params }),
    post: (endpoint: string, body?, headers?) => apiRequest(endpoint, { method: 'POST', body, headers }),
    put: (endpoint: string, body?, headers?) => apiRequest(endpoint, { method: 'PUT', body, headers }),
    delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' })
  }

  return { api, baseUrl }
}
