'use client'
import { LoginTop } from './components/LoginTop'
import { LoginWizard } from './LoginWizard'
import useLoginStateData from './dataSources/loginData.slice'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'
import { ResetPasswordWizard } from './ResetPasswordWizard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { RegisterWizard } from './RegisterWizard'
import { useRegistrationWizardLogic } from './logic/useRegistrationWizardLogic'
import { useResetPasswordWizardLogic } from './logic/useResetPasswordWizardLogic'

export const Login = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { resetPasswordWizard } = useLoginStateData()
  const { showLoginWizard } = useLoginWizardLogic()
  const { showResetPasswordWizard } = useResetPasswordWizardLogic()
  const { showRegistrationWizard } = useRegistrationWizardLogic()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!!token && !resetPasswordWizard) {
      showResetPasswordWizard(token)
      const params = new URLSearchParams(searchParams.toString())
      params.delete('token')
      router.replace(pathname + '?' + params.toString())
    }
  }, [pathname, resetPasswordWizard, router, searchParams, showResetPasswordWizard])

  return (
    <div>
      <LoginTop onLoginClick={showLoginWizard} onSignupClick={showRegistrationWizard} />
      <LoginWizard />
      <ResetPasswordWizard />
      <RegisterWizard />
      <div className="h-[20rem]"></div>
    </div>
  )
}
