import { useEffect, useState } from 'react'
import { ModalSettingsReset2Fa } from './components/Wizards/ModalSettingsReset2Fa'
import useLoginStateData from './dataSources/loginData.slice'
import { useSettingsReset2FaLogic } from './logic/useSettingsReset2FaLogic'

interface SettingsReset2FaWizardProps {
  onClose(): void
}

export const SettingsReset2FaWizard = ({ onClose }: SettingsReset2FaWizardProps) => {
  const { settingsReset2FaWizard } = useLoginStateData()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const {
    hideSettingsReset2FaWizard,
    goToSettingsReset2FaWizardStep,
    resendRegistrationEmail,
    submitEmailVerificationCode,
    select2FaMethod,
    submit2FaCode,
  } = useSettingsReset2FaLogic()

  useEffect(() => {
    if (isModalOpened && !settingsReset2FaWizard) {
      onClose()
    }
    setIsModalOpened(!!settingsReset2FaWizard)
  }, [isModalOpened, onClose, settingsReset2FaWizard])

  return (
    <>
      {settingsReset2FaWizard && (
        <ModalSettingsReset2Fa
          errorCode={settingsReset2FaWizard.errorCode}
          step={settingsReset2FaWizard.step}
          maxStep={settingsReset2FaWizard.maxStep}
          email={settingsReset2FaWizard.email}
          twoFaUrl={settingsReset2FaWizard.twoFaUrl}
          onGoToStep={goToSettingsReset2FaWizardStep}
          onClose={hideSettingsReset2FaWizard}
          onResendEmail={resendRegistrationEmail}
          onSubmitVerificationCode={submitEmailVerificationCode}
          on2FaMethodSelect={select2FaMethod}
          onSubmit2FaCode={submit2FaCode}
        />
      )}
    </>
  )
}
