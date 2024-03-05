'use client'
import { WagmiProvider, http } from 'wagmi'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getEnvConfigValue } from '../envConfig/envConfig'
import { mainnet as mainnetProvider } from 'wagmi/chains'

import { appDescription } from '@/utils/constants'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { useFullChainConfig, useNetworkConfig } from './useNetworkConfigs'

const queryClient = new QueryClient()

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const projectId = getEnvConfigValue('WALLET_CONNECT_PROJECT_ID')
  const { kyoto, bsc } = useNetworkConfig()
  const { allChains } = useFullChainConfig()

  const config = getDefaultConfig({
    appName: appDescription.title,
    projectId,
    chains: [mainnetProvider, ...allChains],
    transports: {
      [mainnetProvider.id]: http(),
      [kyoto.chainId]: http(kyoto.rpc),
      [bsc.chainId]: http(bsc.rpc),
    },
    ssr: true,
  })
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
