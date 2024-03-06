'use client'
import React from 'react'
import ErrorMessageToast from './components/ErrorMessageToast'
import useErrorPopupState from './dataSources/errorPopup.slice'

export const ErrorToasts = () => {
  const { currentError, setCurrentError } = useErrorPopupState()

  const handleMessageToastClose = () => {
    setCurrentError(null)
  }

  return <>{currentError && <ErrorMessageToast show message={currentError} onClose={handleMessageToastClose} />}</>
}
