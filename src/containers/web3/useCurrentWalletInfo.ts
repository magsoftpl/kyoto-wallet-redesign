import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import useCurrentUserData from '@/containers/authentication/dataSources/currentUser.slice'
import { Address } from '@/types/address.type'

export const useCurrentWalletInfo = () => {
  const { currentUser } = useCurrentUserData()
  const currentUserWallet = currentUser?.walletAddress
  const { address, isConnected } = useAccount()
  const isConnectedToProperWallet = isConnected && address === currentUserWallet
  const resultAddress = currentUser?.walletAddress as Address
  const result = useMemo(
    () => ({
      address: resultAddress,
      isConnectedToProperWallet,
    }),
    [isConnectedToProperWallet, resultAddress],
  )
  return result
}
