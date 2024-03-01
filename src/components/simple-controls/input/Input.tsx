import classNames from 'classnames'
import React from 'react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  id: string
  label?: string
  icon?: React.ReactElement
  required?: boolean
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, icon, required, error, ...props }) => {
  const labelClassName = classNames('block', 'mb-1.5', 'text-sm', 'font-medium', 'leading-6')

  const inputClassName = classNames(
    'block',
    'w-full',
    'h-11',
    'rounded-md',
    'py-2',
    'px-3.5',
    'text-black',
    'placeholder:text-secondary-950',
    'bg-white',
    'ring-inset',
    error && 'ring-1',
    error && 'ring-error-500',
    'outline-none',
    'sm:text-sm sm:leading-6',
  )

  return (
    <div className="mt-1">
      {label && <label className={labelClassName}>{label}</label>}
      <div className="relative">
        <input className={inputClassName} {...props} />
        {!!icon && <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black">{icon}</div>}
      </div>
      <div className="min-h-[1.6em] px-1 text-error-500 text-xs">{error}</div>
    </div>
  )
}
