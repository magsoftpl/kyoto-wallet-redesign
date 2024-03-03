import { useCallback, useMemo } from 'react'
import useLoginStateData from '../store/loginData.slice'
import { AxiosError } from 'axios'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getApiClient } from '@/containers/authentication/authClient'

export const useResetPasswordWizardLogic = () => {
  const { resetPasswordWizard, setResetPasswordWizard } = useLoginStateData()

  const showResetPasswordWizard = useCallback(
    (token: string) => {
      setResetPasswordWizard({
        token,
        passwordResetStatus: null,
      })
    },
    [setResetPasswordWizard],
  )

  const resetPassword = useCallback(
    async (password: string) => {
      try {
        if (!resetPasswordWizard) {
          return
        }
        const client = await getApiClient.withoutAuth()
        await client.post('password/resetpassword/newpassword', {
          token: resetPasswordWizard.token,
          password,
        })
        setResetPasswordWizard({
          ...resetPasswordWizard,
          passwordResetStatus: 'success',
        })
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          if (!resetPasswordWizard) {
            return
          }
          setResetPasswordWizard({
            ...resetPasswordWizard,
            passwordResetStatus: 'error',
          })
          return
        }
        handleOperationError('Error when setting new password', err)
      }
    },
    [resetPasswordWizard, setResetPasswordWizard],
  )

  const result = useMemo(
    () => ({
      showResetPasswordWizard,
      resetPassword,
    }),
    [resetPassword, showResetPasswordWizard],
  )
  return result
}
