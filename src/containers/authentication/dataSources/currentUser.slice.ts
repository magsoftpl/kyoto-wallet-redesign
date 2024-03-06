import { create } from '@/utils/zustand/storeUtils'
import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'

export interface CurrentUserData {
  email: string
  firstName: string
  lastName: string
  walletAddress: string
}

interface CurrentUserState {
  currentUser: CurrentUserData | null
  setCurrentUser(data: CurrentUserData | null): void
}

const store = (set: Function) =>
  ({
    currentUser: null,

    setCurrentUser(data: CurrentUserData | null) {
      set((s: Draft<CurrentUserState>) => {
        s.currentUser = data
      })
    },
  } satisfies CurrentUserState)

const useCurrentUserData = create<CurrentUserState>()(immer<CurrentUserState>(store))
export default useCurrentUserData
