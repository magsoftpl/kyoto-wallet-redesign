import { useCallback, useMemo } from 'react'
import useLoginStateData, { WalletProvider } from '../store/loginData.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { AxiosError } from 'axios'
import { useCurrentUserDisplayData } from '@/containers/authentication/useCurrentUserDisplayData'

export const useConnectToNetworkWizardLogic = () => {
  const { connectToNetworkWizard, setConnectToNetworkWizard } = useLoginStateData()
  const { setWallet } = useCurrentUserDisplayData()

  const showConnectToNetworkWizard = useCallback(() => {
    setConnectToNetworkWizard({
      provider: null,
      messageToSign: null,
      errorCode: null,
    })
  }, [setConnectToNetworkWizard])

  const hideConnectToNetworkWizard = useCallback(() => {
    setConnectToNetworkWizard(null)
  }, [setConnectToNetworkWizard])

  const selectProvider = useCallback(
    (provider: WalletProvider | null) => {
      if (!connectToNetworkWizard) {
        return
      }
      setConnectToNetworkWizard({
        ...connectToNetworkWizard,
        provider,
        messageToSign: null,
        errorCode: null,
      })
    },
    [connectToNetworkWizard, setConnectToNetworkWizard],
  )

  const initWalletConnection = useCallback(
    async (walletAddress: string) => {
      if (!connectToNetworkWizard) {
        return
      }
      try {
        const client = await getApiClient()
        const response = await client.post<{ messageToSign: string }>('user/wallet', { walletAddress })
        setConnectToNetworkWizard({
          ...connectToNetworkWizard,
          messageToSign: response.data.messageToSign,
        })
      } catch (err) {
        handleOperationError('Error when connecting wallet', err)
      }
    },
    [connectToNetworkWizard, setConnectToNetworkWizard],
  )

  const resetWalletConnection = useCallback(async () => {
    if (!connectToNetworkWizard || !connectToNetworkWizard.messageToSign) {
      return
    }
    try {
      setConnectToNetworkWizard({
        ...connectToNetworkWizard,
        messageToSign: null,
      })
    } catch (err) {
      const errorCode = getErrorCode(err)
      if (!!errorCode) {
        setConnectToNetworkWizard({
          ...connectToNetworkWizard,
          errorCode,
        })
        return
      }
      handleOperationError('Error when connecting wallet', err)
    }
  }, [connectToNetworkWizard, setConnectToNetworkWizard])

  const finishConnecting = useCallback(
    async (walletAddress: string, signature: string) => {
      if (!connectToNetworkWizard) {
        return
      }
      try {
        const client = await getApiClient()
        await client.post('user/wallet-signature', {
          walletAddress,
          signature,
        })
        setWallet(walletAddress)
        setConnectToNetworkWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setConnectToNetworkWizard({
            ...connectToNetworkWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when connecting wallet', err)
      }
    },
    [connectToNetworkWizard, setConnectToNetworkWizard, setWallet],
  )

  const result = useMemo(
    () => ({
      showConnectToNetworkWizard,
      hideConnectToNetworkWizard,
      selectProvider,
      initWalletConnection,
      resetWalletConnection,
      finishConnecting,
    }),
    [
      showConnectToNetworkWizard,
      hideConnectToNetworkWizard,
      selectProvider,
      initWalletConnection,
      resetWalletConnection,
      finishConnecting,
    ],
  )
  return result
}

const getErrorCode = (error: unknown) => {
  if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 409)) {
    return error.response?.data?.code
  }
  return null
}
