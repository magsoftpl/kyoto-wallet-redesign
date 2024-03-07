import { Modal } from '@/components/complex-controls/Modal'
import { DotTabs } from '@/components/complex-controls/DotTabs'
import { useMemo } from 'react'
import { Init2Fa } from './Init2Fa'
import { EnterEmailVerificationCode } from './EnterEmailVerificationCode'
import { Enter2FaCode } from './Enter2FaCode'

interface ModalSettingsReset2FaProps {
  step: number
  maxStep: number
  errorCode: string | null
  email: string
  twoFaUrl: string
  onClose(): void
  onGoToStep(step: number): void
  onResendEmail(): void
  onSubmitVerificationCode(payload: { code: string }): void
  on2FaMethodSelect(email: string | null): void
  onSubmit2FaCode(payload: { code: string }): void
}

export const ModalSettingsReset2Fa = ({
  step,
  maxStep,
  errorCode,
  email,
  twoFaUrl,
  onClose,
  onGoToStep,
  onResendEmail,
  onSubmitVerificationCode,
  on2FaMethodSelect,
  onSubmit2FaCode,
}: ModalSettingsReset2FaProps) => {
  const steps = useMemo(
    () => [
      {
        title: 'Reset 2FA',
        component: (
          <EnterEmailVerificationCode
            email={email}
            errorCode={errorCode}
            onResend={onResendEmail}
            onSubmit={onSubmitVerificationCode}
          />
        ),
      },
      {
        title: 'Protect your account',
        component: <Init2Fa errorCode={errorCode} twoFaUrl={twoFaUrl} on2FaMethodSelect={on2FaMethodSelect} />,
      },
      {
        title: 'Verify 2FA',
        component: <Enter2FaCode errorCode={errorCode} onSubmit={onSubmit2FaCode} />,
      },
    ],
    [email, errorCode, on2FaMethodSelect, onResendEmail, onSubmit2FaCode, onSubmitVerificationCode, twoFaUrl],
  )

  return (
    <Modal theme="dark" show title="Protect your account" hasCloseButton onClose={onClose}>
      <div className="w-full md:w-[25rem] min-h-[35rem] p-4 flex flex-col justify-between uppercase gap-4">
        <DotTabs steps={steps} currentStep={step} maxStep={maxStep} onStepClick={onGoToStep}></DotTabs>
      </div>
    </Modal>
  )
}
