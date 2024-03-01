'use client'

import useLoginStateData from './store/loginData.slice'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'
import { ModalResetPassword } from './components/Wizards/ModalResetPassword'

export const ResetPasswordWizard = () => {
  const { resetPasswordWizard } = useLoginStateData()
  const { showLoginWizard, resetPassword } = useLoginWizardLogic()
  return (
    <>
      {resetPasswordWizard && (
        <ModalResetPassword
          passwordResetStatus={resetPasswordWizard.passwordResetStatus}
          onLogin={showLoginWizard}
          onPasswordReset={resetPassword}
        />
      )}
    </>
  )
}
