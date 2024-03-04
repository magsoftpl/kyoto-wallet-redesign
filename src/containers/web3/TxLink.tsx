import { AddressFormatter } from '@/components/formatters/AddressFormatter'
import { useNetworkConfig } from './useNetworkConfigs'

export const TxLink = ({ children, chain }: { children: string; chain: keyof ReturnType<typeof useNetworkConfig> }) => {
  const chains = useNetworkConfig()
  const exp = chains[chain].explorerUrl.endsWith('/') ? chains[chain].explorerUrl : `${chains[chain].explorerUrl}/`
  const link = exp + 'tx/' + children
  return (
    <a href={link} target="_blank" className="text-blue underline font-semibold">
      <AddressFormatter startChars={3} endChars={3}>
        {children}
      </AddressFormatter>
    </a>
  )
}
