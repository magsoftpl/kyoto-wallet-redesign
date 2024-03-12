import { useEffect, useState } from 'react'
import useLoginStateData from './dataSources/loginData.slice'
import { useSettingsAddEmailLogic } from './logic/useSettingsAddEmailLogic'
import { ModalSettingsAddEmail } from './components/Wizards/ModalSettingsAddEmail'

interface SettingsAddEmailWizardProps {
  onClose(): void
}

export const SettingsAddEmailWizard = ({ onClose }: SettingsAddEmailWizardProps) => {
  const { settingsAddEmailWizard } = useLoginStateData()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const {
    goToSettingsAddEmailWizardStep,
    hideSettingsAddEmailWizard,
    initSettingsAddEmailProcess,
    resendEmail,
    submitEmailVerificationCode,
    select2FaMethod,
    submit2FaCode,
    finishSettingsAddEmailProcess,
  } = useSettingsAddEmailLogic()

  useEffect(() => {
    if (isModalOpened && !settingsAddEmailWizard) {
      onClose()
    }
    setIsModalOpened(!!settingsAddEmailWizard)
  }, [isModalOpened, onClose, settingsAddEmailWizard])

  return (
    <>
      {settingsAddEmailWizard && (
        <ModalSettingsAddEmail
          data={settingsAddEmailWizard}
          onGoToSettingsAddEmailWizardStep={goToSettingsAddEmailWizardStep}
          onClose={hideSettingsAddEmailWizard}
          onFinishSettingsAddEmailProcess={finishSettingsAddEmailProcess}
          onInitSettingsAddEmailProcess={initSettingsAddEmailProcess}
          onResendEmail={resendEmail}
          onSubmitEmailVerificationCode={submitEmailVerificationCode}
          onSelect2FaMethod={select2FaMethod}
          onSubmit2FaCode={submit2FaCode}
          onSwitchToLogin={() => {}}
        />
      )}
    </>
  )
}
