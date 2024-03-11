import { format } from 'date-fns'

interface FormatTimestampAsDateOptions {
  /** date-fns patter https://date-fns.org/v3.3.1/docs/format */
  datePattern?: string
}

export const formatBlockTimestampAsDate = (
  timeStamp: number | bigint | null | undefined,
  options?: FormatTimestampAsDateOptions,
) => {
  if (!timeStamp) {
    return null
  }
  const timestampNumber = typeof timeStamp === 'bigint' ? Number(timeStamp) : timeStamp
  const date = new Date(timestampNumber * 1000)
  return format(date, options?.datePattern || 'Pp')
}

interface BlockTimestampAsDateFormatterProps extends FormatTimestampAsDateOptions {
  children: number | bigint
}

export const BlockTimestampAsDateFormatter = ({ children, ...options }: BlockTimestampAsDateFormatterProps) => {
  return formatBlockTimestampAsDate(children, options)
}
