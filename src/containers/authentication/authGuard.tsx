'use client'
import React, { ReactNode, useEffect } from 'react'
import useAuthData from './store/authData.slice'
import { useRouter } from 'next/navigation'

type SessionRestriction = 'required' | 'prohibited'

export interface AuthGuardProps {
  children: ReactNode
  redirectTarget?: string
  sessionRestriction?: SessionRestriction
}

export const AuthGuard = ({ children, sessionRestriction, redirectTarget }: AuthGuardProps) => {
  const { session } = useAuthData()
  const router = useRouter()

  useEffect(() => {
    const isRedirect = redirectTarget && !allowContent(sessionRestriction, session)
    if (isRedirect) {
      router.replace(redirectTarget)
    }
  }, [redirectTarget, router, session, sessionRestriction])

  const showChildren = allowContent(sessionRestriction, session)
  return <>{showChildren ? children : null}</>
}

function allowContent(sessionRestriction: SessionRestriction | undefined, session: unknown) {
  return (sessionRestriction === 'required' && !!session) || (sessionRestriction === 'prohibited' && !session)
}
