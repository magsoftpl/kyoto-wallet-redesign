import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

interface ToastWrapperProps {
  handleClose?: () => void
  children: ReactNode
}

export const ToastWrapper: React.FC<ToastWrapperProps> = ({ handleClose, children }) => {
  return (
    <div className="min-w-[35rem] p-2 mb-8 rounded-lg shadow-lg pointer-events-auto overflow-hidden bg-white">
      <div className="w-full h-full px-4 py-2 flex flex-row items-center bg-secondary-950 rounded-lg">
        <div className="w-full pr-4">{children}</div>
        <div role="button" aria-label="Close" onClick={handleClose} className="cursor-pointer p-2">
          <FontAwesomeIcon className="w-4 h-4 text-white" icon={faX} />
        </div>
      </div>
    </div>
  )
}
