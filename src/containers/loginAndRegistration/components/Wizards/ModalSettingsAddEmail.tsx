import { DotTabs } from '@/components/complex-controls/DotTabs'
import { Modal } from '@/components/complex-controls/Modal'
import { useMemo } from 'react'
import { RegisterInitialData } from './RegisterInitialData'
import { EnterEmailVerificationCode } from './EnterEmailVerificationCode'
import { Init2Fa } from './Init2Fa'
import { Enter2FaCode } from './Enter2FaCode'
import { FinishRegistration } from './FinishRegistration'
import { SettingsAddEmailWizardData } from '../../dataSources/loginData.slice'
import {
  InitSettingsAddEmailProcessPayload,
  FinishSettingsAddEmailProcessPayload,
} from '../../logic/useSettingsAddEmailLogic'

interface ModalSettingsAddEmailProps {
  data: SettingsAddEmailWizardData
  onGoToSettingsAddEmailWizardStep(step: number): void
  onClose(): void
  onInitSettingsAddEmailProcess(payload: InitSettingsAddEmailProcessPayload): void
  onSwitchToLogin(): void
  onResendEmail(): void
  onSubmitEmailVerificationCode(payload: { code: string }): void
  onSelect2FaMethod(email: string | null): void
  onSubmit2FaCode(payload: { code: string }): void
  onFinishSettingsAddEmailProcess(payload: FinishSettingsAddEmailProcessPayload): void
}

export const ModalSettingsAddEmail = ({
  data,
  onGoToSettingsAddEmailWizardStep,
  onClose,
  onInitSettingsAddEmailProcess,
  onSwitchToLogin,
  onResendEmail,
  onSubmitEmailVerificationCode,
  onSelect2FaMethod,
  onSubmit2FaCode,
  onFinishSettingsAddEmailProcess,
}: ModalSettingsAddEmailProps) => {
  const steps = useMemo(
    () => [
      {
        title: 'Create account',
        component: (
          <RegisterInitialData
            data={data}
            errorCode={data.errorCode}
            showSwitchToLogin={false}
            onSubmit={onInitSettingsAddEmailProcess}
            onLogin={onSwitchToLogin}
          />
        ),
      },
      {
        title: 'Verify email',
        component: (
          <EnterEmailVerificationCode
            email={data.email}
            errorCode={data.errorCode}
            onSubmit={onSubmitEmailVerificationCode}
            onResend={onResendEmail}
          />
        ),
      },
      {
        title: 'Protect your account',
        component: (
          <Init2Fa twoFaUrl={data.twoFaUrl} errorCode={data.errorCode} on2FaMethodSelect={onSelect2FaMethod} />
        ),
      },
      {
        title: 'Verify 2FA',
        component: <Enter2FaCode errorCode={data.errorCode} onSubmit={onSubmit2FaCode} />,
      },
      {
        title: 'Complete account',
        component: (
          <FinishRegistration data={data} errorCode={data.errorCode} onSubmit={onFinishSettingsAddEmailProcess} />
        ),
      },
    ],
    [
      data,
      onFinishSettingsAddEmailProcess,
      onInitSettingsAddEmailProcess,
      onResendEmail,
      onSelect2FaMethod,
      onSubmit2FaCode,
      onSubmitEmailVerificationCode,
      onSwitchToLogin,
    ],
  )

  const step = data?.step || 0
  const maxStep = data?.maxStep || 0

  const getStepTitle = () => {
    return steps[step]?.title || 'Register account'
  }

  return (
    <Modal theme="dark" show title={getStepTitle()} hasCloseButton onClose={onClose}>
      <div className="p-4 flex flex-col uppercase gap-4">
        <DotTabs steps={steps} currentStep={step} maxStep={maxStep} onStepClick={onGoToSettingsAddEmailWizardStep} />
      </div>
    </Modal>
  )
}
