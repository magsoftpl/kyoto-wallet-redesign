import { useCallback, useMemo } from 'react'
import useCurrentUserSlice from './dataSources/currentUser.slice'

export const useCurrentUserDisplayData = () => {
  const { currentUser, setCurrentUser } = useCurrentUserSlice()

  const setWallet = useCallback(
    (walletAddress: string) => {
      if (!currentUser) {
        return
      }
      setCurrentUser({
        ...currentUser,
        walletAddress,
      })
    },
    [currentUser, setCurrentUser],
  )

  const setEmailAndName = useCallback(
    (email: string, firstName: string, lastName: string) => {
      if (!currentUser) {
        return
      }
      setCurrentUser({
        ...currentUser,
        email,
        firstName,
        lastName,
      })
    },
    [currentUser, setCurrentUser],
  )

  const result = useMemo(
    () => ({
      setWallet,
      setEmailAndName,
    }),
    [setEmailAndName, setWallet],
  )
  return result
}
