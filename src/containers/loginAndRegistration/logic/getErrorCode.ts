import { AxiosError } from 'axios'

export const getErrorCode = (error: unknown) => {
  if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 409)) {
    return error.response?.data?.code || null
  }
  return null
}
