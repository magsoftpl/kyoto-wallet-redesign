import { useCallback, useMemo } from 'react'
import useLoginStateData, { LoginWizardData, WalletProvider } from '../store/loginData.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { SessionDataResponse } from '@/types/api.type'
import { useSession } from '@/containers/authentication/useSession'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getErrorCode } from './getErrorCode'

export const useLoginWizardLogic = () => {
  const { loginWizard, setLoginWizard, setResetPasswordWizard, setRegistrationWizard } = useLoginStateData()
  const { startSession } = useSession()

  const showLoginWizard = useCallback(() => {
    setLoginWizard({ kind: 'method-select' })
    setResetPasswordWizard(null)
    setRegistrationWizard(null)
  }, [setLoginWizard, setRegistrationWizard, setResetPasswordWizard])

  const hideLoginWizard = useCallback(() => {
    setLoginWizard(null)
  }, [setLoginWizard])

  const selectLoginMethod = useCallback(
    (
      payload:
        | 'email'
        | {
            kind: 'wallet'
            provider: WalletProvider
          },
    ) => {
      const initialState: LoginWizardData =
        payload === 'email'
          ? {
              kind: 'email',
              email: '',
              step: 'credentials',
              errorCode: '',
            }
          : {
              kind: 'wallet',
              provider: payload.provider,
              messageToSign: null,
            }
      setLoginWizard(initialState)
    },
    [setLoginWizard],
  )

  const goToLoginMethod = useCallback(() => {
    setLoginWizard({
      kind: 'method-select',
    })
  }, [setLoginWizard])

  const changeForgotPasswordMode = useCallback(
    (isForgotPassword: boolean) => {
      if (loginWizard?.kind !== 'email') {
        return
      }
      setLoginWizard({
        ...loginWizard,
        step: isForgotPassword ? 'forgot-password' : 'credentials',
      })
    },
    [loginWizard, setLoginWizard],
  )

  const loginWithEmailPassword = useCallback(
    async (email: string, password: string) => {
      if (loginWizard?.kind !== 'email') {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        await client.post('login/email', {
          email,
          password,
        })
        setLoginWizard({
          ...loginWizard,
          email,
          step: 'otp',
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setLoginWizard({
            ...loginWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error during login operation', err)
      }
    },
    [loginWizard, setLoginWizard],
  )

  const submitLogin2FaCode = useCallback(
    async (code: string, navigate: () => void) => {
      if (loginWizard?.kind !== 'email') {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        const loginResponse = await client.post<SessionDataResponse>('login/otp-verify', {
          email: loginWizard.email,
          code,
        })
        await startSession(loginResponse.data.accessToken, loginResponse.data.refreshToken, navigate)
        setLoginWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setLoginWizard({
            ...loginWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error during login operation', err)
      }
    },
    [loginWizard, setLoginWizard, startSession],
  )

  const resetWalletLogin = useCallback(async () => {
    if (loginWizard?.kind !== 'wallet' || !loginWizard.messageToSign) {
      return
    }
    try {
      setLoginWizard({
        ...loginWizard,
        messageToSign: null,
      })
    } catch (err) {
      handleOperationError('Error during login operation', err)
    }
  }, [loginWizard, setLoginWizard])

  const initWalletLogin = useCallback(
    async (walletAddress: string) => {
      if (loginWizard?.kind !== 'wallet') {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        const response = await client.post<{ messageToSign: string }>('login/wallet', { walletAddress })
        setLoginWizard({
          ...loginWizard,
          messageToSign: response.data.messageToSign,
        })
      } catch (err) {
        handleOperationError('Error during login operation', err)
      }
    },
    [loginWizard, setLoginWizard],
  )

  const loginWithWallet = useCallback(
    async (walletAddress: string, signature: string, navigate: () => void) => {
      try {
        const client = await getApiClient.withoutAuth()
        const loginResponse = await client.post<SessionDataResponse>('login/wallet-signature', {
          walletAddress,
          signature,
        })
        await startSession(loginResponse.data.accessToken, loginResponse.data.refreshToken, navigate)
        setLoginWizard(null)
      } catch (err) {
        handleOperationError('Error during login operation', err)
      }
    },
    [setLoginWizard, startSession],
  )

  const sendPasswordResetRequest = useCallback(
    async (email: string) => {
      if (loginWizard?.kind !== 'email') {
        return
      }
      try {
        const client = await getApiClient.withoutAuth()
        await client.post('password/resetpassword', {
          email,
        })
        if (loginWizard?.kind !== 'email') {
          return
        }
        setLoginWizard({
          ...loginWizard,
          step: 'forgot-password-link-sent',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setLoginWizard({
            ...loginWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when sending password reset link', err)
      }
    },
    [loginWizard, setLoginWizard],
  )

  const result = useMemo(
    () => ({
      showLoginWizard,
      hideLoginWizard,
      selectLoginMethod,
      goToLoginMethod,
      changeForgotPasswordMode,
      loginWithEmailPassword,
      submitLogin2FaCode,
      initWalletLogin,
      resetWalletLogin,
      loginWithWallet,
      sendPasswordResetRequest,
    }),
    [
      showLoginWizard,
      hideLoginWizard,
      selectLoginMethod,
      goToLoginMethod,
      changeForgotPasswordMode,
      loginWithEmailPassword,
      submitLogin2FaCode,
      initWalletLogin,
      resetWalletLogin,
      loginWithWallet,
      sendPasswordResetRequest,
    ],
  )

  return result
}
