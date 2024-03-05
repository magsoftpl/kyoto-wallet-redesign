import { SettingsRow } from './SettingsRow'
import { Reset2FaSvg } from '@/components/icons/Reset2FaSvg'

interface Reset2FaSettingsRowProps {
  onReset2FaClick(): void
  last2FaChange: Date | null
}

export const Reset2FaSettingsRow = ({ onReset2FaClick, last2FaChange }: Reset2FaSettingsRowProps) => {
  return (
    <SettingsRow
      icon={<Reset2FaSvg />}
      title="Reset 2FA"
      subTitle="Test"
      actionText="Reset"
      onActionClick={onReset2FaClick}
    />
  )
}
