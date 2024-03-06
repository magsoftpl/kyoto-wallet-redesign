'use client'

import { ModalLoginWizardMethodSelect } from './components/Wizards/ModalLoginWizardMethodSelect'
import { ModalLoginWizardWallet } from './components/Wizards/ModalLoginWizardWallet'
import { ModalLoginWizardEmailPassword } from './components/Wizards/ModalLoginWizardEmailPassword'
import useLoginStateData from './dataSources/loginData.slice'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'
import { useNavigator } from '../navigation/useNavigator'

export const LoginWizard = () => {
  const { loginWizard } = useLoginStateData()
  const {
    hideLoginWizard,
    selectLoginMethod,
    goToLoginMethod,
    changeForgotPasswordMode,
    loginWithEmailPassword,
    submitLogin2FaCode,
    initWalletLogin,
    resetWalletLogin,
    loginWithWallet,
    sendPasswordResetRequest,
  } = useLoginWizardLogic()
  const navigator = useNavigator()

  const handleSubmit2FaCode = ({ code }: { code: string }) => {
    submitLogin2FaCode(code, () => navigator('dashboard'))
  }

  const handleWalletAddressChange = () => {
    resetWalletLogin()
  }

  const handleLoginWithWallet = (address: string, data: string) => {
    loginWithWallet(address, data, () => navigator('dashboard'))
  }

  return (
    <>
      {loginWizard?.kind === 'method-select' && (
        <ModalLoginWizardMethodSelect onMethodSelect={selectLoginMethod} onClose={hideLoginWizard} />
      )}
      {loginWizard?.kind === 'wallet' && (
        <ModalLoginWizardWallet
          provider={loginWizard.provider}
          messageToSign={loginWizard.messageToSign}
          onClose={hideLoginWizard}
          onBack={goToLoginMethod}
          onWalletAddressChanged={handleWalletAddressChange}
          onWalletConnected={initWalletLogin}
          onLoginWithWallet={handleLoginWithWallet}
        />
      )}
      {loginWizard?.kind === 'email' && (
        <ModalLoginWizardEmailPassword
          step={loginWizard.step}
          errorCode={loginWizard.errorCode}
          onClose={hideLoginWizard}
          onBack={goToLoginMethod}
          onChangeForgotPassword={changeForgotPasswordMode}
          onLoginWithEmailPassword={loginWithEmailPassword}
          onSubmit2FaCode={handleSubmit2FaCode}
          onSendResetPasswordEmail={sendPasswordResetRequest}
        />
      )}
    </>
  )
}
