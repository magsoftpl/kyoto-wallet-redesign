"use client";

import { ModalLoginWizardMethodSelect } from "./components/Wizards/ModalLoginWizardMethodSelect";
import { ModalLoginWizardWallet } from "./components/Wizards/ModalLoginWizardWallet";
import { ModalLoginWizardEmailPassword } from "./components/Wizards/ModalLoginWizardEmailPassword";
import useLoginStateData from "./store/loginData.slice";
import { useLoginWizardLogic } from "./logic/useLoginWizardLogic";
import { useNavigator } from "../navigation/useNavigator";

export const LoginWizard = () => {
  const { loginWizard } = useLoginStateData();
  const {
    hideLoginWizard,
    selectLoginMethod,
    goToLoginMethod,
    changeForgotPasswordMode,
    loginWithEmailPassword,
    sendPasswordResetRequest,
  } = useLoginWizardLogic();
  const navigator = useNavigator();

  const handleLoginWithEmailPassword = (email: string, password: string) => {
    loginWithEmailPassword(email, password, () => navigator("dashboard"));
  };

  return (
    <>
      {loginWizard?.kind === "method-select" && (
        <ModalLoginWizardMethodSelect
          onMethodSelect={selectLoginMethod}
          onClose={hideLoginWizard}
        />
      )}
      {loginWizard?.kind === "wallet" && (
        <ModalLoginWizardWallet
          onClose={hideLoginWizard}
          onBack={goToLoginMethod}
        />
      )}
      {loginWizard?.kind === "email" && (
        <ModalLoginWizardEmailPassword
          isForgotPassword={loginWizard.isForgotPassword}
          isLoginError={loginWizard.isLoginError}
          isResetPasswordEmailSent={loginWizard.resetPasswordEmailSent}
          onClose={hideLoginWizard}
          onBack={goToLoginMethod}
          onChangeForgotPassword={changeForgotPasswordMode}
          onLoginWithEmailPassword={handleLoginWithEmailPassword}
          onSendResetPasswordEmail={sendPasswordResetRequest}
        />
      )}
    </>
  );
};
