import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import useSettingsData from '../store/settings.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { useCallback, useMemo } from 'react'

export const useSettingsLogic = () => {
  const { setLoadingState, setSettingsData } = useSettingsData()
  const loadSettingsData = useCallback(async () => {
    try {
      const apiClient = await getApiClient()
      const response = await apiClient.get<{
        settings: { lastPasswordChange?: string; last2faChangeDate?: string }
      }>('/user/settings')
      const lastPasswordChange = response.data.settings.lastPasswordChange
        ? new Date(response.data.settings.lastPasswordChange)
        : null
      const last2FaChange = response.data.settings.last2faChangeDate
        ? new Date(response.data.settings.last2faChangeDate)
        : null
      setSettingsData({
        lastPasswordChange,
        last2FaChange,
      })
    } catch (err) {
      handleOperationError('Error when loading settigs data', err)
    }
  }, [setSettingsData])

  const loadPage = useCallback(async () => {
    try {
      setLoadingState('loading')
      await loadSettingsData()
      setLoadingState('loaded')
    } catch (err) {
      setLoadingState('error')
      handleOperationError('Error when loading settigs data', err)
    }
  }, [loadSettingsData, setLoadingState])

  const unloadPage = useCallback(async () => {
    setLoadingState('not-loaded')
  }, [setLoadingState])

  const result = useMemo(
    () => ({
      loadPage,
      unloadPage,
      loadSettingsData,
    }),
    [loadPage, loadSettingsData, unloadPage],
  )
  return result
}
