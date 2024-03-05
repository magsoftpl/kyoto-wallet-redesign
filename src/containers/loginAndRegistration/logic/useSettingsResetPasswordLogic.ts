import { useCallback, useMemo } from 'react'
import useLoginStateData from '../store/loginData.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getErrorCode } from './getErrorCode'

export const useSettingsResetPasswordLogic = () => {
  const { settingsResetPasswordWizard, setSettingsResetPasswordWizard } = useLoginStateData()

  const showSettingsResetPasswordWizard = useCallback(() => {
    setSettingsResetPasswordWizard({
      step: 'reset',
      email: null,
      errorCode: null,
    })
  }, [setSettingsResetPasswordWizard])

  const hideSettingsResetPasswordWizard = useCallback(() => {
    setSettingsResetPasswordWizard(null)
  }, [setSettingsResetPasswordWizard])

  const switchToResetPassword = useCallback(() => {
    if (!settingsResetPasswordWizard) {
      return
    }
    setSettingsResetPasswordWizard({
      ...settingsResetPasswordWizard,
      step: 'reset',
      errorCode: null,
    })
  }, [setSettingsResetPasswordWizard, settingsResetPasswordWizard])

  const switchToForgotPassword = useCallback(() => {
    if (!settingsResetPasswordWizard) {
      return
    }
    setSettingsResetPasswordWizard({
      ...settingsResetPasswordWizard,
      step: 'forgot-password',
      errorCode: null,
    })
  }, [setSettingsResetPasswordWizard, settingsResetPasswordWizard])

  const resetPassword = useCallback(
    async (password: string, oldPassword: string) => {
      if (!settingsResetPasswordWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/change-password', {
          password,
          oldPassword,
        })
        setSettingsResetPasswordWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsResetPasswordWizard({
            ...settingsResetPasswordWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when reseting password', err)
      }
    },
    [setSettingsResetPasswordWizard, settingsResetPasswordWizard],
  )

  const sendPasswordResetMail = useCallback(
    async (email: string) => {
      if (!settingsResetPasswordWizard) {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        await client.post('password/resetpassword', {
          email,
        })
        setSettingsResetPasswordWizard({
          ...settingsResetPasswordWizard,
          step: 'forgot-password-link-sent',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsResetPasswordWizard({
            ...settingsResetPasswordWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when sending password reset link', err)
      }
    },
    [setSettingsResetPasswordWizard, settingsResetPasswordWizard],
  )

  const result = useMemo(
    () => ({
      showSettingsResetPasswordWizard,
      hideSettingsResetPasswordWizard,
      switchToForgotPassword,
      switchToResetPassword,
      resetPassword,
      sendPasswordResetMail,
    }),
    [
      hideSettingsResetPasswordWizard,
      showSettingsResetPasswordWizard,
      switchToForgotPassword,
      switchToResetPassword,
      resetPassword,
      sendPasswordResetMail,
    ],
  )
  return result
}
