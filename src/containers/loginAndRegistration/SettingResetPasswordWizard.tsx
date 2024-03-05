import { useEffect, useState } from 'react'
import { ModalSettingsResetPassword } from './components/Wizards/ModalSettingsResetPassword'
import { useSettingsResetPasswordLogic } from './logic/useSettingsResetPasswordLogic'
import useLoginStateData from './store/loginData.slice'

export const SettingResetPasswordWizard = ({ onClose }: { onClose(): void }) => {
  const { settingsResetPasswordWizard } = useLoginStateData()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const {
    hideSettingsResetPasswordWizard,
    switchToForgotPassword,
    switchToResetPassword,
    resetPassword,
    sendPasswordResetMail,
  } = useSettingsResetPasswordLogic()

  useEffect(() => {
    if (isModalOpened && !settingsResetPasswordWizard) {
      onClose()
    }
    setIsModalOpened(!!settingsResetPasswordWizard)
  }, [isModalOpened, onClose, settingsResetPasswordWizard])

  return (
    <>
      {settingsResetPasswordWizard && (
        <ModalSettingsResetPassword
          step={settingsResetPasswordWizard.step}
          errorCode={settingsResetPasswordWizard.errorCode}
          onPasswordReset={resetPassword}
          onSwitchToForgotPasword={switchToForgotPassword}
          onSwitchToResetPassword={switchToResetPassword}
          onClose={hideSettingsResetPasswordWizard}
          onSendPasswordResetMail={sendPasswordResetMail}
        />
      )}
    </>
  )
}
