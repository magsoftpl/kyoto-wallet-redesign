import { AxiosResponse } from 'axios'
import { createClient } from './client'
import { SessionDataResponse } from '@/types/api.type'

import { jwtDecode } from 'jwt-decode'

export const isRefreshNeeded = (accessToken: string | undefined) => {
  if (!accessToken) {
    return false
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken)
  const exp = decoded.exp

  return new Date().getTime() > (exp - 20) * 1000
}

let pendingRefresh: Promise<AxiosResponse> | null = null

export const obtainNewTokens = async (refreshToken: string | undefined): Promise<SessionDataResponse> => {
  try {
    if (!pendingRefresh) {
      const client = createClient()
      pendingRefresh = client.post<SessionDataResponse>('session/refresh', {
        refreshToken,
      })
    }
    const response = await pendingRefresh
    if (!response?.data?.access_token) {
      throw new Error(`Failed to refresh token`)
    }
    return response.data
  } finally {
    pendingRefresh = null
  }
}
