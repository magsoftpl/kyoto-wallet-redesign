import { DurationClock } from '@/components/simple-controls/durationClock/DurationClock'
import { SettingsRow } from './SettingsRow'
import { Reset2FaSvg } from '@/components/icons/Reset2FaSvg'

interface Reset2FaSettingsRowProps {
  email: string | undefined
  onReset2FaClick(): void
  last2FaChange: Date | null
}

export const Reset2FaSettingsRow = ({ email, last2FaChange, onReset2FaClick }: Reset2FaSettingsRowProps) => {
  const lastPasswordChangeLabel = (
    <div className="flex gap-2 uppercase">
      <span>Last reset:</span>
      {last2FaChange ? <DurationClock startDate={last2FaChange} /> : 'never'}
    </div>
  )
  return (
    <SettingsRow
      icon={<Reset2FaSvg />}
      title="Reset 2FA"
      subTitle={lastPasswordChangeLabel}
      actionText="Reset"
      showAction={!!email}
      onActionClick={onReset2FaClick}
    />
  )
}
