import { useMemo } from 'react'
import { getEnvConfigValue } from '../envConfig/envConfig'
import { bsc as bscProvider } from 'wagmi/chains'
import { Chain } from '@rainbow-me/rainbowkit'

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

export const useFullChainConfig = () => {
  const { kyoto, bsc } = useNetworkConfig()

  const kyotoChain = useMemo(
    () => ({
      id: kyoto.chainId,
      chainId: kyoto.chainId,
      name: 'Kyoto',
      nativeCurrency: { name: 'KYOTO', symbol: 'KYOT', decimals: 18 },
      rpcUrls: {
        default: { http: [kyoto.rpc] },
      },
      blockExplorers: {
        default: { name: 'KYOTO', url: kyoto.explorerUrl },
      },
    }),
    [kyoto],
  )

  const bscChain: Chain = useMemo(
    () => ({
      ...bscProvider,
      id: bsc.chainId,
      chainId: bsc.chainId,
      rpcUrls: {
        default: { http: [bsc.rpc] },
      },
      blockExplorers: {
        default: { name: 'Polygon', url: bsc.explorerUrl },
      },
    }),
    [bsc.chainId, bsc.explorerUrl, bsc.rpc],
  )

  const result = useMemo(
    () => ({
      kyotoChain,
      bscChain,
      allChains: [kyotoChain, bscChain],
    }),
    [kyotoChain, bscChain],
  )

  return result
}
