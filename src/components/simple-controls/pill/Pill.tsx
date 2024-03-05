import classNames from 'classnames'
import { ReactNode } from 'react'

type PillVariant = 'primary'

interface PillProps {
  variant: PillVariant
  children: ReactNode
  uppercase?: boolean
}

export const Pill = ({ variant, children, uppercase }: PillProps) => {
  const variantClasses: Record<PillVariant, string> = {
    primary: 'bg-primary-400 text-secondary-950 border-secondary-950 border-solid border',
  }
  const classes = classNames(
    variantClasses[variant],
    'py-1 px-10 flex items-center justify-center rounded-full font-semibold',
    uppercase && 'uppercase',
  )
  return <div className={classes}>{children}</div>
}
