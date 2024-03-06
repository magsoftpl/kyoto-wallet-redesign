import { useCallback, useMemo } from 'react'
import useLoginStateData from '../dataSources/loginData.slice'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getApiClient } from '@/containers/authentication/authClient'
import { getErrorCode } from './getErrorCode'

export const useResetPasswordWizardLogic = () => {
  const { resetPasswordWizard, setResetPasswordWizard } = useLoginStateData()

  const showResetPasswordWizard = useCallback(
    (token: string) => {
      setResetPasswordWizard({
        token,
        errorCode: null,
        isSuccess: false,
      })
    },
    [setResetPasswordWizard],
  )

  const resetPassword = useCallback(
    async (password: string) => {
      if (!resetPasswordWizard) {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        await client.post('password/resetpassword/newpassword', {
          token: resetPasswordWizard.token,
          password,
        })
        setResetPasswordWizard({
          ...resetPasswordWizard,
          errorCode: null,
          isSuccess: true,
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setResetPasswordWizard({
            ...resetPasswordWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when reseting password', err)
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
