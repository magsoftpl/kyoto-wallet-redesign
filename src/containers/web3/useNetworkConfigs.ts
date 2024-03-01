import { useMemo } from 'react'
import { getEnvConfigValue } from '../envConfig/envConfig'

export const useNetworkConfig = () => {
  const kyotoChainId = Number(getEnvConfigValue('KYOTO_CHAIN_ID'))
  const kyotoRpc = getEnvConfigValue('KYOTO_RPC_URL')
  const kyotoExplorerUrl = getEnvConfigValue('KYOTO_EXPLORER_URL')
  const bscChainId = Number(getEnvConfigValue('BSC_CHAIN_ID'))
  const bscRpc = getEnvConfigValue('BSC_RPC_URL')
  const bscExplorerUrl = getEnvConfigValue('BSC_EXPLORER_URL')

  const result = useMemo(
    () => ({
      kyoto: {
        chainId: kyotoChainId,
        rpc: kyotoRpc,
        explorerUrl: kyotoExplorerUrl,
      },
      bsc: {
        chainId: bscChainId,
        rpc: bscRpc,
        explorerUrl: bscExplorerUrl,
      },
    }),
    [bscChainId, bscExplorerUrl, bscRpc, kyotoChainId, kyotoExplorerUrl, kyotoRpc],
  )

  return result
}
