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
  errorCode: string | null
  isSuccess: boolean
}

export interface RegistrationWizardData {
  step: number
  maxStep: number
  errorCode: string | null
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

export type SettingsResetPasswordWizardStep = 'reset' | 'forgot-password' | 'forgot-password-link-sent'

interface SettingsResetPasswordWizardData {
  step: SettingsResetPasswordWizardStep
  email: string | null
  errorCode: string | null
}

export interface SettingsReset2FaWizardData {
  registrationId: string
  step: number
  maxStep: number
  errorCode: string | null
  email: string
  twoFaUrl: string
}

export interface SettingsAddEmailWizardData extends RegistrationWizardData {}

interface LoginState {
  loginWizard: LoginWizardData | null
  setLoginWizard(data: LoginWizardData | null): void
  resetPasswordWizard: ResetPasswordWizardData | null
  setResetPasswordWizard(data: ResetPasswordWizardData | null): void
  registrationWizard: RegistrationWizardData | null
  setRegistrationWizard(data: RegistrationWizardData | null): void
  connectToNetworkWizard: ConnectToNetworkWizardData | null
  setConnectToNetworkWizard(data: ConnectToNetworkWizardData | null): void
  settingsResetPasswordWizard: SettingsResetPasswordWizardData | null
  setSettingsResetPasswordWizard(data: SettingsResetPasswordWizardData | null): void
  settingsReset2FaWizard: SettingsReset2FaWizardData | null
  setSettingsReset2FaWizard(data: SettingsReset2FaWizardData | null): void
  settingsAddEmailWizard: SettingsAddEmailWizardData | null
  setSettingsAddEmailWizard(data: SettingsAddEmailWizardData | null): void
}

const store = (set: Function) =>
  ({
    loginWizard: null,
    resetPasswordWizard: null,
    registrationWizard: null,
    connectToNetworkWizard: null,
    settingsResetPasswordWizard: null,
    settingsReset2FaWizard: null,
    settingsAddEmailWizard: null,
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
    setSettingsResetPasswordWizard(data: SettingsResetPasswordWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.settingsResetPasswordWizard = data
      })
    },
    setSettingsReset2FaWizard(data: SettingsReset2FaWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.settingsReset2FaWizard = data
      })
    },
    setSettingsAddEmailWizard(data: SettingsAddEmailWizardData | null) {
      set((s: Draft<LoginState>) => {
        s.settingsAddEmailWizard = data
      })
    },
  } satisfies LoginState)

const useLoginStateData = create<LoginState>()(immer<LoginState>(store))
export default useLoginStateData
