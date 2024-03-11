import { useBalance } from 'wagmi'
import { useNetworkConfig } from '../web3/useNetworkConfigs'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'

export const useCurrentUserBalance = () => {
  const { kyoto } = useNetworkConfig()
  const { address } = useCurrentWalletInfo()
  const { data, ...rest } = useBalance({
    address,
    chainId: kyoto.chainId,
    query: {
      enabled: !!address,
    },
  })
  return { data: data?.value, ...rest }
}
