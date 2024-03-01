import { Draft } from "immer";
import { immer } from "zustand/middleware/immer";
import { create } from "@/utils/zustand/storeUtils";

export type WalletProvider = "metamask" | "coinbase" | "brave";
export type LoginMethod = "wallet" | "email";

interface LoginWizardSelectMethodData {
  kind: "method-select";
}

interface LoginWizardWalletData {
  kind: "wallet";
  provider: WalletProvider;
}

interface LoginWizardEmailData {
  kind: "email";
  isForgotPassword: boolean;
  isLoginError: boolean;
  resetPasswordEmailSent: boolean;
}

export type LoginWizardData =
  | LoginWizardSelectMethodData
  | LoginWizardWalletData
  | LoginWizardEmailData;

export type PasswordResetStatus = "success" | "error";

export interface ResetPasswordWizardData {
  token: string;
  passwordResetStatus: PasswordResetStatus | null;
}

interface LoginState {
  loginWizard: LoginWizardData | null;
  setLoginWizard(data: LoginWizardData | null): void;
  resetPasswordWizard: ResetPasswordWizardData | null;
  setResetPasswordWizard(data: ResetPasswordWizardData | null): void;
}

const store = (set: Function) =>
  ({
    loginWizard: null,
    resetPasswordWizard: null,
    setLoginWizard(data: LoginWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.loginWizard = data;
      });
    },
    setResetPasswordWizard(data: ResetPasswordWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.resetPasswordWizard = data;
      });
    },
  } satisfies LoginState);

const useLoginStateData = create<LoginState>()(immer<LoginState>(store));
export default useLoginStateData;
