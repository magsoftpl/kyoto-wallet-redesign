import { formatEther } from 'viem'

interface FormatEthOptions {
  currency?: string
  precision?: number
}

export const formatEthValue = (valueWei: bigint | null | undefined, options?: FormatEthOptions) => {
  if (valueWei === null || valueWei === undefined) {
    return null
  }
  let valueEth = Number(formatEther(valueWei, 'wei'))
  if (options?.precision !== undefined) {
    valueEth = applyRounding(valueEth, options.precision)
  }
  const formater = new Intl.NumberFormat(undefined, { maximumFractionDigits: 18 })
  const displayValue = formater.format(valueEth)
  const result = options?.currency ? `${displayValue} ${options?.currency}` : displayValue
  return result
}

interface EthValueFormatterProps extends FormatEthOptions {
  valueWei: bigint | null | undefined
}

export const EthValueFormatter = ({ valueWei, ...options }: EthValueFormatterProps) => {
  return formatEthValue(valueWei, options)
}

const applyRounding = (value: number, precision: number) => {
  const multiplier = 10 ** precision
  return Math.ceil(value * multiplier) / multiplier
}
