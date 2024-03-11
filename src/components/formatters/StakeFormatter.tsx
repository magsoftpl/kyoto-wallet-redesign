interface StakeFormatOptions {
  lockSuffix?: boolean
}

export const formatStake = (options?: StakeFormatOptions) => {
  const baseLabel = '1 year'
  return options?.lockSuffix ? `${baseLabel} lock` : baseLabel
}

interface StakeFormatterProps extends StakeFormatOptions {
  children: number
}

export const StakeFormatter = ({ children, ...options }: StakeFormatterProps) => {
  return formatStake(options)
}
