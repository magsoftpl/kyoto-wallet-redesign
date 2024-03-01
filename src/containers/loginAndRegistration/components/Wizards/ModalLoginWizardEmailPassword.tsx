import { Modal } from '@/components/complex-controls/Modal'
import { EnterEmailPassword } from './EnterEmailPassword'
import { ForgotPassword } from './ForgotPassword'

interface ModalLoginWizardEmailPasswordProps {
  isForgotPassword: boolean
  isLoginError: boolean
  isResetPasswordEmailSent: boolean
  onClose(): void
  onBack(): void
  onChangeForgotPassword(val: boolean): void
  onLoginWithEmailPassword(email: string, password: string): void
  onSendResetPasswordEmail(email: string): void
}

export const ModalLoginWizardEmailPassword = ({
  isForgotPassword,
  isLoginError,
  isResetPasswordEmailSent,
  onClose,
  onBack,
  onChangeForgotPassword,
  onLoginWithEmailPassword,
  onSendResetPasswordEmail,
}: ModalLoginWizardEmailPasswordProps) => {
  return (
    <Modal
      theme="dark"
      show
      hasBackButton
      title={
        <>
          {!isForgotPassword && <div className="uppercase">Log In</div>}
          {isForgotPassword && <div className="uppercase">Forgot Password</div>}
        </>
      }
      onClose={onClose}
      onBack={onBack}
    >
      <div className="w-full md:min-w-[40rem]">
        {!isForgotPassword && (
          <EnterEmailPassword
            isLoginError={isLoginError}
            onSubmit={({ email, password }) => onLoginWithEmailPassword(email, password)}
            onForgotPassword={() => onChangeForgotPassword(true)}
          />
        )}
        {isForgotPassword && (
          <ForgotPassword
            isResetPasswordEmailSent={isResetPasswordEmailSent}
            onSubmit={onSendResetPasswordEmail}
            onLogin={() => onChangeForgotPassword(false)}
          />
        )}
      </div>
    </Modal>
  )
}
