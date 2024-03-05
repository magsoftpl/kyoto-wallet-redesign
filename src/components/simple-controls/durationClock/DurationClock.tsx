import { useEffect, useState } from 'react'

export const DurationClock = ({ startDate }: { startDate: Date | null }) => {
  const [result, setResult] = useState(calcDiffLabel(startDate))

  useEffect(() => {
    const interval = setInterval(() => {
      const label = calcDiffLabel(startDate)
      setResult(label)
    }, 3 * 1000)
    return () => clearInterval(interval)
  }, [startDate])

  return result
}

const calcDiffLabel = (startDate: Date | null) => {
  if (!startDate) {
    return ''
  }
  const diff = new Date().getTime() - startDate.getTime()
  const formatter = formatters.find((f) => !f.threshold || diff < f.threshold)
  if (!formatter) {
    return
  }
  return formatter.label(diff)
}

const MIN = 60 * 1000
const HOUR = 60 * MIN
const DAY = 24 * HOUR

const formatters = [
  {
    threshold: MIN,
    label: (diff: number) => 'just now',
  },
  {
    threshold: 2 * MIN,
    label: (diff: number) => 'minute ago',
  },
  {
    threshold: HOUR,
    label: (diff: number) => `${Math.ceil(diff / MIN)} minutes ago`,
  },
  {
    threshold: 2 * HOUR,
    label: (diff: number) => 'hour ago',
  },
  {
    threshold: DAY,
    label: (diff: number) => `${Math.ceil(diff / HOUR)} hours ago`,
  },
  {
    threshold: 2 * DAY,
    label: (diff: number) => 'day ago',
  },
  {
    threshold: null,
    label: (diff: number) => `${Math.ceil(diff / DAY)} days ago`,
  },
]
