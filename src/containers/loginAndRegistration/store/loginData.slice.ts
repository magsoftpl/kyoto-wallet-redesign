import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { create } from '@/utils/zustand/storeUtils'

export type WalletProvider = 'metamask' | 'coinbase' | 'brave'
export type LoginMethod = 'wallet' | 'email'
export type EmailLoginOperationStep = 'credentials' | 'otp' | 'forgot-password' | 'forgot-password-link-sent'

interface LoginWizardSelectMethodData {
  kind: 'method-select'
}

interface LoginWizardWalletData {
  kind: 'wallet'
  provider: WalletProvider
  messageToSign: string | null
}

interface LoginWizardEmailData {
  kind: 'email'
  step: EmailLoginOperationStep
  email: string
  errorCode: string
}

export type LoginWizardData = LoginWizardSelectMethodData | LoginWizardWalletData | LoginWizardEmailData

export type PasswordResetStatus = 'success' | 'error'

export interface ResetPasswordWizardData {
  token: string
  passwordResetStatus: PasswordResetStatus | null
}

export interface RegistrationWizardData {
  step: number
  maxStep: number
  errorCode: string
  registrationId: string | null
  country: string
  email: string
  password: string
  agreeToPolicy: boolean
  twoFaUrl: string
  twoFaEmail: string
  firstName: string
  lastName: string
  dateOfBirth: string
  residencyCountry: string
  phone: string
}

export interface ConnectToNetworkWizardData {
  provider: WalletProvider | null
  messageToSign: string | null
  errorCode: string | null
}

interface LoginState {
  loginWizard: LoginWizardData | null
  setLoginWizard(data: LoginWizardData | null): void
  resetPasswordWizard: ResetPasswordWizardData | null
  setResetPasswordWizard(data: ResetPasswordWizardData | null): void
  registrationWizard: RegistrationWizardData | null
  setRegistrationWizard(data: RegistrationWizardData | null): void
  connectToNetworkWizard: ConnectToNetworkWizardData | null
  setConnectToNetworkWizard(data: ConnectToNetworkWizardData | null): void
}

const store = (set: Function) =>
  ({
    loginWizard: null,
    resetPasswordWizard: null,
    registrationWizard: null,
    connectToNetworkWizard: null,
    setLoginWizard(data: LoginWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.loginWizard = data
      })
    },
    setResetPasswordWizard(data: ResetPasswordWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.resetPasswordWizard = data
      })
    },
    setRegistrationWizard(data: RegistrationWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.registrationWizard = data
      })
    },
    setConnectToNetworkWizard(data: ConnectToNetworkWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.connectToNetworkWizard = data
      })
    },
  } satisfies LoginState)

const useLoginStateData = create<LoginState>()(immer<LoginState>(store))
export default useLoginStateData
