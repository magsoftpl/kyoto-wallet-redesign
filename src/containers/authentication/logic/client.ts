import { logError } from '@/containers/maintenanceLogs/maintenanceLog'
import axios, { AxiosError } from 'axios'

const defaultOptions = {
  baseURL: '/api',
}

export const createClient = (accessToken?: string) => {
  const apiClient = axios.create(defaultOptions)

  if (accessToken) {
    apiClient.interceptors.request.use(
      async (request) => {
        request.headers.Authorization = `Bearer ${accessToken}`
        return request
      },
      (error) => {
        logError(`Failed to send request [${error.message}]: ${error.config.url}`, error)
        return Promise.reject(error)
      },
    )
  }

  apiClient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error instanceof AxiosError && error.response?.status !== 200) {
        logError(`Error response from server`, {
          status: error.response?.status,
          method: error.config?.method,
          url: error.config?.url,
        })
      }
      return Promise.reject(error)
    },
  )

  return apiClient
}
