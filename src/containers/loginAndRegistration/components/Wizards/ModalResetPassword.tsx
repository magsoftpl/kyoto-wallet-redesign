import { Modal } from '@/components/complex-controls/Modal'
import { ChangePassword } from './ChangePassword'
import { PasswordResetStatus } from '../../store/loginData.slice'

interface ModalResetPasswordProps {
  passwordResetStatus: PasswordResetStatus | null
  onLogin(): void
  onPasswordReset(password: string): void
}

export const ModalResetPassword = ({ passwordResetStatus, onLogin, onPasswordReset }: ModalResetPasswordProps) => {
  return (
    <Modal theme="dark" show title="Reset password" hasCloseButton={false}>
      <div className="w-full md:w-[25rem] p-4 flex flex-col uppercase gap-4">
        <ChangePassword
          showSwitchToLogin
          passwordResetStatus={passwordResetStatus}
          showOldPassword={false}
          onLogin={onLogin}
          onPasswordReset={onPasswordReset}
        />
      </div>
    </Modal>
  )
}
