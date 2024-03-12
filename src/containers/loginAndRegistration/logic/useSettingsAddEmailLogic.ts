import { useCallback, useMemo } from 'react'
import useLoginStateData from '../dataSources/loginData.slice'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getApiClient } from '@/containers/authentication/authClient'
import { getErrorCode } from './getErrorCode'
import { useCurrentUserDisplayData } from '@/containers/authentication/useCurrentUserDisplayData'

export const useSettingsAddEmailLogic = () => {
  const { settingsAddEmailWizard, setSettingsAddEmailWizard } = useLoginStateData()
  const { setEmailAndName } = useCurrentUserDisplayData()

  const showSettingsAddEmailWizard = useCallback(async () => {
    try {
      setSettingsAddEmailWizard({
        step: 0,
        maxStep: 0,
        errorCode: '',
        country: '',
        registrationId: null,
        email: '',
        password: '',
        agreeToPolicy: false,
        twoFaEmail: '',
        twoFaUrl: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        residencyCountry: '',
        phone: '',
      })
    } catch (err) {
      handleOperationError('Error initializing 2FA reset')
    }
  }, [setSettingsAddEmailWizard])

  const hideSettingsAddEmailWizard = useCallback(() => {
    setSettingsAddEmailWizard(null)
  }, [setSettingsAddEmailWizard])

  const goToSettingsAddEmailWizardStep = useCallback(
    (step: number) => {
      if (!settingsAddEmailWizard) {
        return
      }
      if (step > settingsAddEmailWizard.maxStep) {
        return
      }
      setSettingsAddEmailWizard({
        ...settingsAddEmailWizard,
        errorCode: '',
        step,
      })
    },
    [setSettingsAddEmailWizard, settingsAddEmailWizard],
  )

  const initSettingsAddEmailProcess = useCallback(
    async ({ country, email, password, agreeToPolicy }: InitSettingsAddEmailProcessPayload) => {
      if (!settingsAddEmailWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        const response = await apiClient.post('/user/init-add-email', { email })
        setSettingsAddEmailWizard({
          ...settingsAddEmailWizard,
          registrationId: response.data.registrationId,
          step: 1,
          maxStep: 1,
          country,
          email,
          password,
          agreeToPolicy,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsAddEmailWizard({
            ...settingsAddEmailWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when initializing registration', err)
      }
    },
    [setSettingsAddEmailWizard, settingsAddEmailWizard],
  )

  const resendEmail = useCallback(async () => {
    if (!settingsAddEmailWizard) {
      return
    }
    try {
      const apiClient = await getApiClient()
      await apiClient.post('/user/resend-verification-email', { id: settingsAddEmailWizard.registrationId })
    } catch (err) {
      handleOperationError('Error when resending verification email', err)
    }
  }, [settingsAddEmailWizard])

  const submitEmailVerificationCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!settingsAddEmailWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        const response = await apiClient.post('/user/email-verify', { id: settingsAddEmailWizard.registrationId, code })

        setSettingsAddEmailWizard({
          ...settingsAddEmailWizard,
          twoFaUrl: response.data.twoFaUrl,
          step: 2,
          maxStep: 2,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsAddEmailWizard({
            ...settingsAddEmailWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting verification code', err)
      }
    },
    [setSettingsAddEmailWizard, settingsAddEmailWizard],
  )

  const select2FaMethod = useCallback(
    async (email: string | null) => {
      if (!settingsAddEmailWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/2fa-change', { id: settingsAddEmailWizard.registrationId, email })
        setSettingsAddEmailWizard({
          ...settingsAddEmailWizard,
          twoFaEmail: email || '',
          step: 3,
          maxStep: 3,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsAddEmailWizard({
            ...settingsAddEmailWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when selecting 2FA method', err)
      }
    },
    [settingsAddEmailWizard, setSettingsAddEmailWizard],
  )

  const submit2FaCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!settingsAddEmailWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/add-email-2fa-finish', { id: settingsAddEmailWizard.registrationId, code })

        setSettingsAddEmailWizard({
          ...settingsAddEmailWizard,
          step: 4,
          maxStep: 4,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsAddEmailWizard({
            ...settingsAddEmailWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting 2FA code', err)
      }
    },
    [settingsAddEmailWizard, setSettingsAddEmailWizard],
  )

  const finishSettingsAddEmailProcess = useCallback(
    async ({ firstName, lastName, dateOfBirth, residencyCountry, phone }: FinishSettingsAddEmailProcessPayload) => {
      if (!settingsAddEmailWizard) {
        return
      }
      try {
        const apiClient = await getApiClient()
        await apiClient.post('/user/finish-add-email', {
          id: settingsAddEmailWizard.registrationId,
          email: settingsAddEmailWizard.email,
          twoFaEmail: settingsAddEmailWizard.twoFaEmail,
          firstName,
          lastName,
          dob: dateOfBirth,
          residencyCountry,
          phoneNumber: phone,
          password: settingsAddEmailWizard.password,
          country: settingsAddEmailWizard.country,
        })
        setEmailAndName(settingsAddEmailWizard.email, firstName, lastName)
        setSettingsAddEmailWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setSettingsAddEmailWizard({
            ...settingsAddEmailWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when finalizing registration', err)
      }
    },
    [settingsAddEmailWizard, setEmailAndName, setSettingsAddEmailWizard],
  )

  const result = useMemo(
    () => ({
      showSettingsAddEmailWizard,
      hideSettingsAddEmailWizard,
      goToSettingsAddEmailWizardStep,
      initSettingsAddEmailProcess,
      resendEmail,
      submitEmailVerificationCode,
      select2FaMethod,
      submit2FaCode,
      finishSettingsAddEmailProcess,
    }),
    [
      showSettingsAddEmailWizard,
      hideSettingsAddEmailWizard,
      goToSettingsAddEmailWizardStep,
      initSettingsAddEmailProcess,
      resendEmail,
      submitEmailVerificationCode,
      select2FaMethod,
      submit2FaCode,
      finishSettingsAddEmailProcess,
    ],
  )
  return result
}

export interface InitSettingsAddEmailProcessPayload {
  country: string
  email: string
  password: string
  agreeToPolicy: boolean
}

export interface FinishSettingsAddEmailProcessPayload {
  firstName: string
  lastName: string
  dateOfBirth: string
  residencyCountry: string
  phone: string
}
