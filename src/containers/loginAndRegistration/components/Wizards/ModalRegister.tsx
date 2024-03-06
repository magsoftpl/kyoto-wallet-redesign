import { DotTabs } from '@/components/complex-controls/DotTabs'
import { Modal } from '@/components/complex-controls/Modal'
import { useMemo } from 'react'
import { RegisterInitialData } from './RegisterInitialData'
import { EnterEmailVerificationCode } from './EnterEmailVerificationCode'
import { Init2Fa } from './Init2Fa'
import { Enter2FaCode } from './Enter2FaCode'
import { FinishRegistration } from './FinishRegistration'
import { RegistrationWizardData } from '../../dataSources/loginData.slice'
import {
  FinishRegistrationProcessPayload,
  InitRegistrationProcessPayload,
} from '../../logic/useRegistrationWizardLogic'

interface ModalRegisterProps {
  registrationWizard: RegistrationWizardData
  onGoToRegistrationWizardStep(step: number): void
  onClose(): void
  onInitRegistrationProcess(payload: InitRegistrationProcessPayload): void
  onSwitchToLogin(): void
  onResendRegistrationEmail(): void
  onSubmitEmailVerificationCode(payload: { code: string }): void
  onSelect2FaMethod(email: string | null): void
  onSubmit2FaCode(payload: { code: string }): void
  onFinishRegistrationProcess(payload: FinishRegistrationProcessPayload): void
}

export const ModalRegister = ({
  registrationWizard,
  onGoToRegistrationWizardStep,
  onClose,
  onInitRegistrationProcess,
  onSwitchToLogin,
  onResendRegistrationEmail,
  onSubmitEmailVerificationCode,
  onSelect2FaMethod,
  onSubmit2FaCode,
  onFinishRegistrationProcess,
}: ModalRegisterProps) => {
  const steps = useMemo(
    () => [
      {
        title: 'Create account',
        component: (
          <RegisterInitialData
            data={registrationWizard}
            errorCode={registrationWizard.errorCode}
            onSubmit={onInitRegistrationProcess}
            onLogin={onSwitchToLogin}
          />
        ),
      },
      {
        title: 'Verify email',
        component: (
          <EnterEmailVerificationCode
            email={registrationWizard.email}
            errorCode={registrationWizard.errorCode}
            onSubmit={onSubmitEmailVerificationCode}
            onResend={onResendRegistrationEmail}
          />
        ),
      },
      {
        title: 'Protect your account',
        component: (
          <Init2Fa
            twoFaUrl={registrationWizard.twoFaUrl}
            errorCode={registrationWizard.errorCode}
            on2FaMethodSelect={onSelect2FaMethod}
          />
        ),
      },
      {
        title: 'Verify 2FA',
        component: <Enter2FaCode errorCode={registrationWizard.errorCode} onSubmit={onSubmit2FaCode} />,
      },
      {
        title: 'Complete account',
        component: (
          <FinishRegistration
            data={registrationWizard}
            errorCode={registrationWizard.errorCode}
            onSubmit={onFinishRegistrationProcess}
          />
        ),
      },
    ],
    [
      onFinishRegistrationProcess,
      onInitRegistrationProcess,
      onResendRegistrationEmail,
      onSelect2FaMethod,
      onSubmit2FaCode,
      onSubmitEmailVerificationCode,
      onSwitchToLogin,
      registrationWizard,
    ],
  )

  const step = registrationWizard?.step || 0
  const maxStep = registrationWizard?.maxStep || 0

  const getStepTitle = () => {
    return steps[step]?.title || 'Register account'
  }

  return (
    <Modal theme="dark" show title={getStepTitle()} hasCloseButton onClose={onClose}>
      <div className="p-4 flex flex-col uppercase gap-4">
        <DotTabs steps={steps} currentStep={step} maxStep={maxStep} onStepClick={onGoToRegistrationWizardStep} />
      </div>
    </Modal>
  )
}
