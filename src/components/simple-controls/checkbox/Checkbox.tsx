import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent, ReactNode } from 'react'

interface CheckBoxProps {
  name: string
  label: ReactNode
  isChecked: boolean
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckBox: React.FC<CheckBoxProps> = ({ name, label, isChecked, error, onChange }) => {
  const handleChange = () => {
    if (!onChange) {
      return
    }
    const event = {
      type: 'change',
      target: {
        name,
        checked: !isChecked,
        value: !isChecked,
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    onChange(event)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center cursor-pointer" onClick={handleChange}>
        <div className="relative h-4 w-4 flex justify-center items-center">
          <FontAwesomeIcon className="w-full h-full" icon={faSquare} />
          {isChecked && <FontAwesomeIcon className="absolute left-0 top-w w-full h-full  text-black" icon={faCheck} />}
        </div>
        <div className="text-gray-700 text-sm font-semibold ml-2 line-clamp-2">{label}</div>
      </div>
      <div className="min-h-[1.6em] px-1 text-error-500 text-xs">{error}</div>
    </div>
  )
}
