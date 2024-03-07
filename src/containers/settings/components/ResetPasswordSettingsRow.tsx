import { ResetPasswordSvg } from '@/components/icons/ResetPasswordSvg'
import { SettingsRow } from './SettingsRow'
import { DurationClock } from '@/components/simple-controls/durationClock/DurationClock'

interface Reset2FaSettingsRowProps {
  email: string | undefined
  onResetPasswordClick(): void
  lastPasswordChange: Date | null
}

export const ResetPasswordSettingsRow = ({
  email,
  lastPasswordChange,
  onResetPasswordClick,
}: Reset2FaSettingsRowProps) => {
  const lastPasswordChangeLabel = (
    <div className="flex gap-2 uppercase">
      <span>Last reset:</span>
      {lastPasswordChange ? <DurationClock startDate={lastPasswordChange} /> : 'never'}
    </div>
  )

  return (
    <SettingsRow
      icon={<ResetPasswordSvg />}
      title="Reset password"
      subTitle={lastPasswordChangeLabel}
      showAction={!!email}
      actionText="Reset"
      onActionClick={onResetPasswordClick}
    />
  )
}
