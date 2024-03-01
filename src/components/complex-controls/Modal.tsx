'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalDialogWrapper, ModalTheme } from './ModalDialogWrapper'

interface ModalProps {
  children: ReactNode
  title: ReactNode
  hasBackButton?: boolean
  hasCloseButton?: boolean
  show: boolean
  theme?: ModalTheme
  onBack?: () => void
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  hasBackButton,
  hasCloseButton,
  title,
  show,
  theme,
  onBack,
  onClose,
}) => {
  const modalContent = show ? (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-blur backdrop-blur overflow-y-auto translate-x-0"></div>
      <div className="fixed top-0 left-0 w-screen min-h-screen flex items-center justify-center">
        <ModalDialogWrapper
          title={title}
          hasBackButton={hasBackButton}
          hasCloseButton={hasCloseButton}
          theme={theme}
          onCloseClick={onClose}
          onBackClick={onBack}
        >
          {children}
        </ModalDialogWrapper>
      </div>
    </>
  ) : null

  const [ref, setRef] = useState<Element | null>(null)
  useEffect(() => {
    if (!ref) {
      const element = document.getElementById('modal-root')
      setRef(element)
    }
  }, [ref])
  return show && ref ? createPortal(modalContent, ref) : null
}
