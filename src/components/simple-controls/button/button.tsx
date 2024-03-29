import { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonVariant = 'primary' | 'secondary' | 'transparent'
type ButtonLayout = 'default' | 'compact' | 'icon-only'

type BaseButtonProps = Omit<ButtonHTMLAttributes<{}>, 'className' | 'style'>

interface ButtonProps extends BaseButtonProps {
  variant: ButtonVariant
  layout?: ButtonLayout
  uppercase?: boolean
  fullWidth?: boolean
}

export const Button = ({ variant, layout = 'default', uppercase = true, fullWidth, ...baseProps }: ButtonProps) => {
  const layoutClasses: Record<ButtonLayout, string> = {
    default: 'py-2 px-10 rounded-full',
    compact: 'p-1 px-4 rounded-full',
    'icon-only': 'p-2 rounded-full shrink-0 grow-0',
  }
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-400 text-secondary-950',
    secondary: 'bg-secondary-950 text-white',
    transparent: '',
  }
  const classes = classNames(
    layoutClasses[layout],
    variantClasses[variant],
    'font-semibold',
    uppercase && 'uppercase',
    fullWidth && 'w-full',
  )
  return <button className={classes} {...baseProps} />
}
