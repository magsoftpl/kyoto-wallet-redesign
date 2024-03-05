import classNames from 'classnames'
import { ReactNode } from 'react'

type PanelVariant = 'default' | 'primary'

interface PanelProps {
  title: ReactNode
  children: ReactNode
  variant?: PanelVariant
}

export const Panel = ({ children, title, variant = 'default' }: PanelProps) => {
  const titleClassMapping: Record<PanelVariant, string> = {
    default: 'bg-secondary-950 text-white',
    primary: 'bg-primary-400 text-sceondary-950',
  }
  const titleClass = classNames('px-8 py-4 uppercase', titleClassMapping[variant])

  return (
    <div className="w-full max-w-[100rem] rounded-2xl overflow-y-hidden border-inactive-100 border-solid border-2">
      <div className={titleClass}>{title}</div>
      <div className="p-8">{children}</div>
    </div>
  )
}
