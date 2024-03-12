import { useCallback, useMemo } from 'react'
import useLoginStateData from '../dataSources/loginData.slice'
import { getApiClient } from '@/containers/authentication/authClient'
import { SessionDataResponse } from '@/types/api.type'
import { useSession } from '@/containers/authentication/useSession'
import { handleOperationError } from '@/containers/errorHandling/errorHandlingActions'
import { getErrorCode } from './getErrorCode'

export const useRegistrationWizardLogic = () => {
  const { registrationWizard, setRegistrationWizard } = useLoginStateData()
  const { startSession } = useSession()

  const showRegistrationWizard = useCallback(() => {
    setRegistrationWizard({
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
  }, [setRegistrationWizard])

  const goToRegistrationWizardStep = useCallback(
    (step: number) => {
      if (!registrationWizard) {
        return
      }
      if (step > registrationWizard.maxStep) {
        return
      }
      setRegistrationWizard({
        ...registrationWizard,
        errorCode: '',
        step,
      })
    },
    [registrationWizard, setRegistrationWizard],
  )

  const hideRegistrationWizard = useCallback(() => {
    setRegistrationWizard(null)
  }, [setRegistrationWizard])

  const initRegistrationProcess = useCallback(
    async ({ country, email, password, agreeToPolicy }: InitRegistrationProcessPayload) => {
      if (!registrationWizard) {
        return
      }
      try {
        const apiClient = await getApiClient.withoutAuth()
        const response = await apiClient.post('/register', { id: registrationWizard.registrationId, email })
        setRegistrationWizard({
          ...registrationWizard,
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
          setRegistrationWizard({
            ...registrationWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when initializing registration', err)
      }
    },
    [registrationWizard, setRegistrationWizard],
  )

  const resendRegistrationEmail = useCallback(async () => {
    if (!registrationWizard) {
      return
    }
    try {
      const apiClient = await getApiClient.withoutAuth()
      await apiClient.post('/register/email-resend', { id: registrationWizard.registrationId })
    } catch (err) {
      handleOperationError('Error when resending verification email', err)
    }
  }, [registrationWizard])

  const submitEmailVerificationCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!registrationWizard) {
        return
      }
      try {
        const apiClient = await getApiClient.withoutAuth()
        const response = await apiClient.post('/register/email-verify', { id: registrationWizard.registrationId, code })

        setRegistrationWizard({
          ...registrationWizard,
          twoFaUrl: response.data.twoFaUrl,
          step: 2,
          maxStep: 2,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setRegistrationWizard({
            ...registrationWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting verification code', err)
      }
    },
    [registrationWizard, setRegistrationWizard],
  )

  const select2FaMethod = useCallback(
    async (email: string | null) => {
      if (!registrationWizard) {
        return
      }
      try {
        const apiClient = await getApiClient.withoutAuth()
        await apiClient.post('/register/2fa', { id: registrationWizard.registrationId, email })
        setRegistrationWizard({
          ...registrationWizard,
          twoFaEmail: email || '',
          step: 3,
          maxStep: 3,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setRegistrationWizard({
            ...registrationWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when selecting 2FA method', err)
      }
    },
    [registrationWizard, setRegistrationWizard],
  )

  const submit2FaCode = useCallback(
    async ({ code }: { code: string }) => {
      if (!registrationWizard) {
        return
      }
      try {
        const apiClient = await getApiClient.withoutAuth()
        await apiClient.post('/register/2fa-verify', { id: registrationWizard.registrationId, code })

        setRegistrationWizard({
          ...registrationWizard,
          step: 4,
          maxStep: 4,
          errorCode: '',
        })
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setRegistrationWizard({
            ...registrationWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when submiting 2FA code', err)
      }
    },
    [registrationWizard, setRegistrationWizard],
  )

  const finishRegistrationProcess = useCallback(
    async (
      { firstName, lastName, dateOfBirth, residencyCountry, phone }: FinishRegistrationProcessPayload,
      navigate: () => void,
    ) => {
      if (!registrationWizard) {
        return
      }
      try {
        const apiClient = await getApiClient.withoutAuth()
        const response = await apiClient.post<SessionDataResponse>('/register/finish', {
          id: registrationWizard.registrationId,
          email: registrationWizard.email,
          twoFaEmail: registrationWizard.twoFaEmail,
          firstName,
          lastName,
          dob: dateOfBirth,
          residencyCountry,
          phoneNumber: phone,
          password: registrationWizard.password,
          country: registrationWizard.country,
        })
        await startSession(response.data.accessToken, response.data.refreshToken, navigate)
        setRegistrationWizard(null)
      } catch (err) {
        const errorCode = getErrorCode(err)
        if (!!errorCode) {
          setRegistrationWizard({
            ...registrationWizard,
            errorCode,
          })
          return
        }
        handleOperationError('Error when finalizing registration', err)
      }
    },
    [registrationWizard, setRegistrationWizard, startSession],
  )

  const result = useMemo(
    () => ({
      showRegistrationWizard,
      goToRegistrationWizardStep,
      hideRegistrationWizard,
      initRegistrationProcess,
      resendRegistrationEmail,
      submitEmailVerificationCode,
      select2FaMethod,
      submit2FaCode,
      finishRegistrationProcess,
    }),
    [
      showRegistrationWizard,
      goToRegistrationWizardStep,
      hideRegistrationWizard,
      initRegistrationProcess,
      resendRegistrationEmail,
      submitEmailVerificationCode,
      select2FaMethod,
      submit2FaCode,
      finishRegistrationProcess,
    ],
  )

  return result
}

export interface InitRegistrationProcessPayload {
  country: string
  email: string
  password: string
  agreeToPolicy: boolean
}

export interface FinishRegistrationProcessPayload {
  firstName: string
  lastName: string
  dateOfBirth: string
  residencyCountry: string
  phone: string
}
