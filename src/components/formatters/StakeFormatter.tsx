interface StakeFormatOptions {
  lockSuffix?: boolean
}

export const formatStake = (scheme: number | null | undefined, options?: StakeFormatOptions) => {
  if (scheme === null || scheme === undefined) {
    return null
  }
  let baseLabel: string
  switch (scheme) {
    case 0: {
      baseLabel = '1 month'
      break
    }
    case 1: {
      baseLabel = '6 months'
      break
    }
    case 2: {
      baseLabel = '1 year'
      break
    }
    default:
      baseLabel = '??'
  }
  return options?.lockSuffix ? `${baseLabel} lock` : baseLabel
}

interface StakeFormatterProps extends StakeFormatOptions {
  children: number
}

export const StakeFormatter = ({ children, ...opions }: StakeFormatterProps) => {
  return formatStake(children, opions)
}
