import { Modal } from '@/components/complex-controls/Modal'
import { ChangePassword } from './ChangePassword'

interface ModalResetPasswordProps {
  errorCode: string | null
  isSuccess: boolean
  onLogin(): void
  onPasswordReset(password: string): void
}

export const ModalResetPassword = ({ errorCode, isSuccess, onLogin, onPasswordReset }: ModalResetPasswordProps) => {
  return (
    <Modal theme="dark" show title="Reset password" hasCloseButton={false}>
      <div className="w-full md:w-[25rem] p-4 flex flex-col uppercase gap-4">
        <ChangePassword
          showSwitchToLogin
          errorCode={errorCode}
          isSuccess={isSuccess}
          showOldPassword={false}
          onLogin={onLogin}
          onPasswordReset={onPasswordReset}
        />
      </div>
    </Modal>
  )
}
