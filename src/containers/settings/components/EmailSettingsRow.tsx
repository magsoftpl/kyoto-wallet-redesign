import { EmailSvg } from '@/components/icons/EmailSvg'
import { SettingsRow } from './SettingsRow'

interface EmailSettingsRowProps {
  email: string | undefined
  onAddEmailClick(): void
}

export const EmailSettingsRow = ({ email, onAddEmailClick }: EmailSettingsRowProps) => {
  const maskEmail = () => {
    if (!email) {
      return email
    }
    const [mail, domain] = email.split('@')
    return `${mail.slice(0, 1)}....@${domain}`
  }

  return (
    <SettingsRow
      icon={<EmailSvg />}
      title="Email"
      subTitle={<div className="normal-case text-inactive-500">{maskEmail()}</div>}
      actionText="Add email"
      onActionClick={onAddEmailClick}
    />
  )
}
