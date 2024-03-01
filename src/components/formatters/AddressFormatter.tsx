interface FormatAddressOptions {
  startChars: number
  endChars: number
}

export const formatAddress = (address: string | null | undefined, { startChars, endChars }: FormatAddressOptions) => {
  if (!address) {
    return null
  }
  const firstPart = address.slice(0, startChars)
  const secondPart = endChars > 0 ? address.slice(-endChars) : ''
  return `${firstPart}${!!firstPart ? '..' : ''}${!!secondPart ? '..' : ''}${secondPart}`
}

interface AddressFormatterProps extends FormatAddressOptions {
  children: string
}

export const AddressFormatter = ({ children, ...options }: AddressFormatterProps) => {
  return formatAddress(children, options)
}
