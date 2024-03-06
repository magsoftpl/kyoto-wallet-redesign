import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ToastWrapper } from './ToastWrapper'

interface ToastProps {
  show: boolean
  timeout?: number
  children: ReactNode
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ show, timeout, children, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, timeout || 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toastContent = show ? (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full flex items-end justify-center pointer-events-none"
    >
      <ToastWrapper handleClose={onClose}>{children}</ToastWrapper>
    </div>
  ) : null

  const [ref, setRef] = useState<Element | null>(null)
  useEffect(() => {
    if (!ref) {
      const element = document.getElementById('modal-root')
      setRef(element)
    }
  }, [ref])
  return show && ref ? createPortal(toastContent, ref) : null
}
