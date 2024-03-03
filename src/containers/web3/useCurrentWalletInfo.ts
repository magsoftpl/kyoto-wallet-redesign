import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import useCurrentUserData from '@/containers/authentication/store/currentUser.slice'

export const useCurrentWalletInfo = () => {
  const { currentUser } = useCurrentUserData()
  const currentUserWallet = currentUser?.walletAddress
  const { address, isConnected } = useAccount()
  const isConnectedToProperWallet = isConnected && address === currentUserWallet
  const result = useMemo(
    () => ({
      address: currentUser?.walletAddress,
      isConnectedToProperWallet,
    }),
    [currentUser?.walletAddress, isConnectedToProperWallet],
  )
  return result
}
