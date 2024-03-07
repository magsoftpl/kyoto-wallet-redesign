import { useCallback, useMemo } from 'react'
import useLoginStateData from '../dataSources/loginData.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getErrorCode } from './getErrorCode'

export const useSettingsReset2FaLogic = () => {
  const { settingsReset2FaWizard, setSettingsReset2FaWizard } = useLoginStateData()

  const showSettingsReset2FaWizard = useCallback(
    async (email: string) => {
      try {
        const apiClient = await getApiClient()
        const response = await apiClient.post<{ registrationId: string }>('user/init-2fa-change')
        setSettingsReset2FaWizard({
          registrationId: response.data.registrationId,
          step: 0,
          maxStep: 0,
          email,
          twoFaUrl: '',
          errorCode: null,
        })
      } catch (err) {
        handleOperationError('Error initializing 2FA reset')
      }
    },
    [setSettingsReset2FaWizard],
  )

  const hideSettingsReset2FaWizard = useCallback(() => {
    setSettingsReset2FaWizard(null)
  }, [setSettingsReset2FaWizard])

  const goToSettingsReset2FaWizardStep = useCallback(
    (step: number) => {
      if (!settingsReset2FaWizard) {
        return
      }
      if (step > settingsReset2FaWizard.maxStep) {
        return
      }
      setSettingsReset2FaWizard({
        ...settingsReset2FaWizard,
        errorCode: '',
        step,
      })
    },
    [setSettingsReset2FaWizard, settingsReset2FaWizard],
  )

  const resendRegistrationEmail = useCallback(async () => {
    if (!settingsReset2FaWizard) {
      return
    }
    try {
      const apiClient = await getApiClient()
      await apiClient.post('user/resend-2fa-change-email', { id: settingsReset2FaWizard.registrationId })
    } catch (err) {
      handleOperationError('Error when resending verification email', err)
    }
  }, [settingsReset2FaWizard])

  const submitEmailVerificationCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!settingsReset2FaWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        const response = await apiClient.post('/user/2fa-change-email-verify', {
          id: settingsReset2FaWizard.registrationId,
          code,
        })

        setSettingsReset2FaWizard({
          ...settingsReset2FaWizard,
          twoFaUrl: response.data.twoFaUrl,
          step: 1,
          maxStep: 1,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsReset2FaWizard({
            ...settingsReset2FaWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting verification code', err)
      }
    },
    [setSettingsReset2FaWizard, settingsReset2FaWizard],
  )

  const select2FaMethod = useCallback(
    async (email: string | null) => {
      if (!settingsReset2FaWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/2fa-change', { id: settingsReset2FaWizard.registrationId, email })
        setSettingsReset2FaWizard({
          ...settingsReset2FaWizard,
          step: 2,
          maxStep: 2,
          errorCode: null,
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsReset2FaWizard({
            ...settingsReset2FaWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when selecting 2FA method', err)
      }
    },
    [setSettingsReset2FaWizard, settingsReset2FaWizard],
  )

  const submit2FaCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!settingsReset2FaWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/2fa-change-finish', { id: settingsReset2FaWizard.registrationId, code })

        setSettingsReset2FaWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsReset2FaWizard({
            ...settingsReset2FaWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting 2FA cede', err)
      }
    },
    [settingsReset2FaWizard, setSettingsReset2FaWizard],
  )

  const result = useMemo(
    () => ({
      showSettingsReset2FaWizard,
      hideSettingsReset2FaWizard,
      goToSettingsReset2FaWizardStep,
      resendRegistrationEmail,
      submitEmailVerificationCode,
      select2FaMethod,
      submit2FaCode,
    }),
    [
      goToSettingsReset2FaWizardStep,
      hideSettingsReset2FaWizard,
      resendRegistrationEmail,
      select2FaMethod,
      showSettingsReset2FaWizard,
      submit2FaCode,
      submitEmailVerificationCode,
    ],
  )
  return result
}
