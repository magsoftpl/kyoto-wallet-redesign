import classNames from 'classnames'
import React from 'react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  id: string
  label?: string
  icon?: React.ReactElement
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, icon, error, ...props }) => {
  const labelClassName = classNames('block', 'mb-1.5', 'text-sm', 'font-medium', 'leading-6')

  const wrapperClassName = classNames(
    'block',
    'w-full',
    'flex',
    'justify-between',
    'items-center',
    'overflow-hidden',
    'h-11',
    'rounded-md',
    'text-black',
    'placeholder:text-secondary-950',
    'bg-white',
    'ring-inset',
    error && 'ring-1',
    error && 'ring-error-500',
    'outline-none',
    'sm:text-sm sm:leading-6',
  )

  const inputClassName = classNames(
    'block',
    'w-full',
    'h-full',
    'py-2',
    !!icon ? 'pl-3.5' : 'px-3.5',
    'text-black',
    'placeholder:text-secondary-950',
    'outline-none',
    'sm:text-sm sm:leading-6',
  )

  return (
    <div className="">
      {label && <label className={labelClassName}>{label}</label>}
      <div className={wrapperClassName}>
        <input className={inputClassName} {...props} />
        {!!icon && <div className="text-black">{icon}</div>}
      </div>
      <div className="min-h-[1.6em] px-1 text-error-500 text-xs">{error}</div>
    </div>
  )
}
