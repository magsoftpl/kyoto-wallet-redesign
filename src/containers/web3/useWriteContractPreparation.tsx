import { useCallback, useMemo } from 'react'
import { useCurrentWalletInfo } from './useCurrentWalletInfo'

import { useChainId, useSwitchChain } from 'wagmi'

export const useWriteContractPreparation = () => {
  const { isConnectedToProperWallet } = useCurrentWalletInfo()
  const { switchChainAsync } = useSwitchChain()
  const currentChainId = useChainId()
  const ensureConnectionToNetwork = useCallback(
    async (chainId: number) => {
      if (!isConnectedToProperWallet) {
        throw new Error('Incorrect wallet connected')
      }
      if (currentChainId !== chainId) {
        try {
          await switchChainAsync({ chainId })
        } catch (err) {
          throw new Error('Cannot change network')
        }
      }
    },
    [currentChainId, isConnectedToProperWallet, switchChainAsync],
  )

  const result = useMemo(
    () => ({
      ensureConnectionToNetwork,
    }),
    [ensureConnectionToNetwork],
  )
  return result
}
