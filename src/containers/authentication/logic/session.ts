import { obtainNewTokens } from './token'
import { getApiClient } from '../authClient'
import { resetAllStores } from '@/utils/zustand/storeUtils'
import useAuthData from '../store/authData.slice'
import useCurrentUserData from '../store/currentUser.slice'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { UserProfileResponse } from '@/types/api.type'
import { clearLogs } from '@/containers/maintenanceLogs/maintenanceLog'

export const setSessionData = (data: { accessToken: string; refreshToken: string } | null) => {
  const { setSessionData } = useAuthData.getState()

  setSessionData(data)
  if (data?.refreshToken) {
    localStorage.setItem('refresh-token', data.refreshToken)
  } else {
    localStorage.removeItem('refresh-token')
  }
}

export const loadStoredSession = async () => {
  const { setCurrentUser } = useCurrentUserData.getState()
  const refreshToken = localStorage.getItem('refresh-token')
  if (!refreshToken) {
    setSessionData(null)
    setCurrentUser(null)
    return
  }
  const data = await obtainNewTokens(refreshToken)
  setSessionData(data)
  const apiClient = await getApiClient()
  const userData = await apiClient.get<UserProfileResponse>('user/profile')
  setCurrentUser(userData.data.profile)
}

export const deleteSession = async (navigate?: () => void) => {
  try {
    const { setCurrentUser } = useCurrentUserData.getState()
    clearLogs()
    resetAllStores()
    const apiClient = await getApiClient()
    await apiClient.delete('session')
    setCurrentUser(null)
    setSessionData(null)
  } catch (err) {
    handleOperationError('Logout operation failed', err)
  }
  window.localStorage.clear()
  if (navigate) {
    navigate()
  } else {
    window.location.replace('/login')
  }
}

export const startSession = async (accessToken: string, refreshToken: string, navigate: () => void) => {
  try {
    setSessionData({
      accessToken,
      refreshToken,
    })
    const { setCurrentUser } = useCurrentUserData.getState()
    const apiClient = await getApiClient()
    const userData = await apiClient.get<UserProfileResponse>('user/profile')
    setCurrentUser(userData.data.profile)
    navigate()
  } catch (err) {
    handleOperationError('Login operation failed', err)
  }
}
