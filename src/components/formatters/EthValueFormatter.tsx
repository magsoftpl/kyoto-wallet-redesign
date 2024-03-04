import { formatEther } from 'viem'

interface FormatEthOptions {
  currency?: string
}

export const formatEthValue = (valueWei: bigint | null | undefined, options?: FormatEthOptions) => {
  if (valueWei === null || valueWei === undefined) {
    return null
  }
  const valueEth = formatEther(valueWei, 'wei')
  const result = options?.currency ? `${valueEth} ${options?.currency}` : valueEth
  return result
}

interface EthValueFormatterProps extends FormatEthOptions {
  valueWei: bigint | null | undefined
}

export const EthValueFormatter = ({ valueWei, ...options }: EthValueFormatterProps) => {
  return formatEthValue(valueWei, options)
}
