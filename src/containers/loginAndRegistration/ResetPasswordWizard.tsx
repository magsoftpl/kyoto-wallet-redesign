'use client'

import useLoginStateData from './store/loginData.slice'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'
import { ModalResetPassword } from './components/Wizards/ModalResetPassword'
import { useResetPasswordWizardLogic } from './logic/useResetPasswordWizardLogic'

export const ResetPasswordWizard = () => {
  const { resetPasswordWizard } = useLoginStateData()
  const { showLoginWizard } = useLoginWizardLogic()
  const { resetPassword } = useResetPasswordWizardLogic()
  return (
    <>
      {resetPasswordWizard && (
        <ModalResetPassword
          errorCode={resetPasswordWizard.errorCode}
          isSuccess={resetPasswordWizard.isSuccess}
          onLogin={showLoginWizard}
          onPasswordReset={resetPassword}
        />
      )}
    </>
  )
}