import { AddressFormatter } from '@/components/formatters/AddressFormatter'
import { WalletChain, useNetworkConfig } from './useNetworkConfigs'
import { ReactNode } from 'react'

export const TxLink = ({ children, txHash, chain }: { children: ReactNode; txHash: string; chain: WalletChain }) => {
  const chains = useNetworkConfig()
  const exp = chains[chain].explorerUrl.endsWith('/') ? chains[chain].explorerUrl : `${chains[chain].explorerUrl}/`
  const link = exp + 'tx/' + txHash
  return (
    <a href={link} target="_blank" className="text-blue underline font-semibold">
      {typeof children === 'string' && (
        <AddressFormatter startChars={3} endChars={3}>
          {children}
        </AddressFormatter>
      )}
      {typeof children !== 'string' && children}
    </a>
  )
}
