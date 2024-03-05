import { Button } from '@/components/simple-controls/button/Button'
import { ReactNode } from 'react'

interface SettingsRowProps {
  icon: ReactNode
  title: ReactNode
  subTitle: ReactNode
  actionText: string
  onActionClick(): void
}

export const SettingsRow = ({ icon, title, subTitle, actionText, onActionClick }: SettingsRowProps) => {
  return (
    <div className="w-ful p-4 flex justify-between items-center border-inactive-100 border-solid border-b-2">
      <div className="flex gap-10 items-center uppercase">
        <div className="w-8 h-8">{icon}</div>
        <div className="flex flex-col">
          <div>{title}</div>
          <div className="normal-case text-inactive-500">{subTitle}</div>
        </div>
      </div>
      <div className="w-48">
        <Button variant="primary" fullWidth onClick={onActionClick}>
          {actionText}
        </Button>
      </div>
    </div>
  )
}
