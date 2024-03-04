import { format } from 'date-fns'

interface FormatTimestampAsDateOptions {
  /** date-fns patter https://date-fns.org/v3.3.1/docs/format */
  datePattern?: string
}

export const formatBlockTimestampAsDate = (
  timeStamp: number | null | undefined,
  options?: FormatTimestampAsDateOptions,
) => {
  if (!timeStamp) {
    return null
  }
  const date = new Date(timeStamp * 1000)
  return format(date, options?.datePattern || 'Pp')
}

interface BlockTimestampAsDateFormatterProps extends FormatTimestampAsDateOptions {
  children: number
}

export const BlockTimestampAsDateFormatter = ({ children, ...options }: BlockTimestampAsDateFormatterProps) => {
  return formatBlockTimestampAsDate(children, options)
}
