import { EmailSvg } from '@/components/icons/EmailSvg'
import { SettingsRow } from './SettingsRow'

interface EmailSettingsRowProps {
  email: string | undefined
  onAddEmailClick(): void
  onChangeEmailClick(): void
}

export const EmailSettingsRow = ({ email, onAddEmailClick, onChangeEmailClick }: EmailSettingsRowProps) => {
  const maskEmail = () => {
    if (!email) {
      return 'No email set'
    }
    const [mail, domain] = email.split('@')
    return `${mail.slice(0, 1)}....@${domain}`
  }

  const isEmailSet = !!email

  const handleActionClick = () => {
    if (isEmailSet) {
      onChangeEmailClick()
    } else {
      onAddEmailClick()
    }
  }

  return (
    <SettingsRow
      icon={<EmailSvg />}
      title="Email"
      subTitle={<div className="normal-case text-inactive-500">{maskEmail()}</div>}
      showAction
      actionText={!isEmailSet ? 'Register' : 'Change email'}
      onActionClick={handleActionClick}
    />
  )
}
