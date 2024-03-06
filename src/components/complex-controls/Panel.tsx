import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { Button } from '../simple-controls/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

type PanelVariant = 'default' | 'primary'

interface PanelProps {
  title: ReactNode
  children: ReactNode
  variant?: PanelVariant
  collapsible?: boolean
}

export const Panel = ({ children, title, variant = 'default', collapsible }: PanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mainClass = classNames(
    'w-full max-w-[100rem] rounded-2xl overflow-y-hidden border-solid border-2',
    isCollapsed ? 'border-primary-400' : 'border-inactive-100',
  )

  const titleClassMapping: Record<PanelVariant, string> = {
    default: 'bg-secondary-950 text-white',
    primary: 'bg-primary-400 text-sceondary-950',
  }
  const titleClass = classNames(
    'w-full px-8 py-4 flex justify-between items-center gap-2 uppercase',
    titleClassMapping[variant],
  )

  return (
    <div className={mainClass}>
      <div className={titleClass}>
        <div className="w-full">{title}</div>
        <div>
          {collapsible && (
            <Button
              variant="transparent"
              layout="icon-only"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
            </Button>
          )}
        </div>
      </div>
      {!isCollapsed && <div className="p-8">{children}</div>}
    </div>
  )
}
