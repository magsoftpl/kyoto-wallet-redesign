import { Modal } from '@/components/complex-controls/Modal'
import { ChangePassword } from './ChangePassword'
import { SettingsResetPasswordWizardStep } from '../../dataSources/loginData.slice'
import { Button } from '@/components/simple-controls/button/Button'
import { DotTabs } from '@/components/complex-controls/DotTabs'
import { useMemo } from 'react'
import { ForgotPassword } from './ForgotPassword'

interface ModalSettingsResetPasswordProps {
  step: SettingsResetPasswordWizardStep
  errorCode: string | null
  onPasswordReset(password: string, oldPassword: string): void
  onClose(): void
  onSwitchToForgotPasword(): void
  onSwitchToResetPassword(): void
  onSendPasswordResetMail(email: string): void
}

export const ModalSettingsResetPassword = ({
  step,
  errorCode,
  onPasswordReset,
  onClose,
  onSwitchToForgotPasword,
  onSwitchToResetPassword,
  onSendPasswordResetMail,
}: ModalSettingsResetPasswordProps) => {
  const currentStep = step === 'reset' ? 0 : 1
  const maxStep = currentStep

  const steps = useMemo(
    () => [
      {
        title: 'Reset password',
        component: (
          <ChangePassword
            showSwitchToLogin={false}
            showOldPassword
            isSuccess={false}
            errorCode={errorCode}
            onPasswordReset={onPasswordReset}
          />
        ),
      },
      {
        title: 'Forgot password',
        component: (
          <ForgotPassword
            showSwitchToLogin={false}
            isResetPasswordEmailSent={step === 'forgot-password-link-sent'}
            onSubmit={onSendPasswordResetMail}
          />
        ),
      },
    ],
    [errorCode, onPasswordReset, onSendPasswordResetMail, step],
  )

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber === 0) {
      onSwitchToResetPassword()
    } else {
      onSwitchToForgotPasword()
    }
  }

  return (
    <Modal theme="dark" show title="Reset password" hasCloseButton onClose={onClose}>
      <div className="w-full md:w-[25rem] min-h-[35rem] p-4 flex flex-col justify-between uppercase gap-4">
        <DotTabs steps={steps} currentStep={currentStep} maxStep={maxStep} onStepClick={handleStepClick}></DotTabs>

        {step === 'reset' && (
          <div className="w-full flex justify-end text-primary-400">
            <Button variant="transparent" layout="icon-only" onClick={onSwitchToForgotPasword}>
              Forgot Password
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
