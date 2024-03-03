import { Modal } from '@/components/complex-controls/Modal'
import { EnterEmailPassword } from './EnterEmailPassword'
import { ForgotPassword } from './ForgotPassword'
import { Enter2FaCode } from './Enter2FaCode'
import { EmailLoginOperationStep } from '../../store/loginData.slice'

interface ModalLoginWizardEmailPasswordProps {
  step: EmailLoginOperationStep
  errorCode: string
  onClose(): void
  onBack(): void
  onChangeForgotPassword(val: boolean): void
  onLoginWithEmailPassword(email: string, password: string): void
  onSubmit2FaCode(code: { code: string }): void
  onSendResetPasswordEmail(email: string): void
}

export const ModalLoginWizardEmailPassword = ({
  step,
  errorCode,
  onClose,
  onBack,
  onChangeForgotPassword,
  onLoginWithEmailPassword,
  onSubmit2FaCode,
  onSendResetPasswordEmail,
}: ModalLoginWizardEmailPasswordProps) => {
  const isForgotPassword = step === 'forgot-password' || step === 'forgot-password-link-sent'
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
      <div className="w-full flex justify-center">
        {step === 'credentials' && (
          <EnterEmailPassword
            errorCode={errorCode}
            onSubmit={({ email, password }) => onLoginWithEmailPassword(email, password)}
            onForgotPassword={() => onChangeForgotPassword(true)}
          />
        )}
        {step === 'otp' && <Enter2FaCode errorCode={errorCode} onSubmit={onSubmit2FaCode} />}
        {isForgotPassword && (
          <ForgotPassword
            isResetPasswordEmailSent={step === 'forgot-password-link-sent'}
            onSubmit={onSendResetPasswordEmail}
            onLogin={() => onChangeForgotPassword(false)}
          />
        )}
      </div>
    </Modal>
  )
}
