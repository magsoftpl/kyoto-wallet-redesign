import classNames from 'classnames'
import { ChangeEvent } from 'react'
import ReactFlagsSelect from 'react-flags-select'

export const FlagsSelect = ({
  name,
  value,
  label,
  error,
  onChange,
}: {
  name?: string
  value: string
  label?: string
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  const labelClassName = classNames('block', 'mb-1.5', 'text-sm', 'font-medium', 'leading-6')

  const handleSelect = (val: string) => {
    if (!onChange) {
      return
    }
    const event = {
      type: 'change',
      target: {
        name,
        value: val,
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    onChange(event)
  }

  return (
    <div className="mt-1">
      {label && <label className={labelClassName}>{label}</label>}
      <ReactFlagsSelect
        className="flags-dropdown"
        selected={value}
        onSelect={(code) => handleSelect(code)}
        selectedSize={14}
        searchable
      />
      <div className="min-h-[1.6em] px-1 text-error-500 text-xs">{error}</div>
    </div>
  )
}
