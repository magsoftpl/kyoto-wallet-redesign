'use client'
import { LoginTop } from './components/LoginTop'
import { LoginWizard } from './LoginWizard'
import useLoginStateData from './store/loginData.slice'
import { useLoginWizardLogic } from './logic/useLoginWizardLogic'
import { ResetPasswordWizard } from './ResetPasswordWizard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const Login = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { loginWizard, resetPasswordWizard } = useLoginStateData()
  const { showLoginWizard, showResetPasswordWizard } = useLoginWizardLogic()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!!token && !resetPasswordWizard) {
      showResetPasswordWizard(token)
      const params = new URLSearchParams(searchParams.toString())
      params.delete('token')
      router.replace(pathname + '?' + params.toString())
    }
  }, [pathname, resetPasswordWizard, router, searchParams, showResetPasswordWizard])

  const handleLoginClick = () => {
    showLoginWizard()
  }

  return (
    <div>
      <LoginTop onLoginClick={handleLoginClick} />
      {!!loginWizard && <LoginWizard />}
      {!!resetPasswordWizard && <ResetPasswordWizard />}
      <div className="h-[20rem]"></div>
    </div>
  )
}
