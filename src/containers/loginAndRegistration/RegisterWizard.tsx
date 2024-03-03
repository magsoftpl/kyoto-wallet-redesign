'use client'

import useLoginStateData from './store/loginData.slice'
import { FinishRegistrationProcessPayload, useRegistrationWizardLogic } from './logic/useRegistrationWizardLogic'
import { ModalRegister } from './components/Wizards/ModalRegister'
import { useNavigator } from '../navigation/useNavigator'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'

export const RegisterWizard = () => {
  const navigator = useNavigator()
  const { registrationWizard } = useLoginStateData()
  const {
    goToRegistrationWizardStep,
    hideRegistrationWizard,
    initRegistrationProcess,
    resendRegistrationEmail,
    submitEmailVerificationCode,
    select2FaMethod,
    submit2FaCode,
    finishRegistrationProcess,
  } = useRegistrationWizardLogic()

  const { showLoginWizard } = useLoginWizardLogic()

  const handleRegistrationFinish = (data: FinishRegistrationProcessPayload) => {
    finishRegistrationProcess(data, () => navigator('dashboard'))
  }

  return (
    <>
      {registrationWizard && (
        <ModalRegister
          registrationWizard={registrationWizard}
          onGoToRegistrationWizardStep={goToRegistrationWizardStep}
          onClose={hideRegistrationWizard}
          onInitRegistrationProcess={initRegistrationProcess}
          onSwitchToLogin={showLoginWizard}
          onResendRegistrationEmail={resendRegistrationEmail}
          onSubmitEmailVerificationCode={submitEmailVerificationCode}
          onSelect2FaMethod={select2FaMethod}
          onSubmit2FaCode={submit2FaCode}
          onFinishRegistrationProcess={handleRegistrationFinish}
        />
      )}
    </>
  )
}
