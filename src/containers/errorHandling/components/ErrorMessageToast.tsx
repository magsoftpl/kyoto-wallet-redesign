import { Toast } from '@/components/complex-controls/Toast'
import React from 'react'

const ErrorMessageToast = ({ message, show, onClose }: { show: boolean; message: string; onClose: () => void }) => {
  return (
    <Toast onClose={onClose} timeout={10000} show={show}>
      <div className="w-full flex flex-row items-center gap-2">
        <div className="text-red font-bold">Error</div>
        <div className="text-white text-sm font-medium">{message}</div>
      </div>
    </Toast>
  )
}

export default ErrorMessageToast
