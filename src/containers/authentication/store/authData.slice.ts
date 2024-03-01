import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { create } from '@/utils/zustand/storeUtils'

export interface SessionData {
  accessToken: string
  refreshToken: string
}

interface AuthDataState {
  session: SessionData | null
  setSessionData(data: SessionData | null): void
}

const store = (set: Function) =>
  ({
    session: null,
    setSessionData(data: SessionData | null) {
      set((s: Draft<AuthDataState>) => {
        s.session = data
      })
    },
  } satisfies AuthDataState)

const useAuthData = create<AuthDataState>()(immer<AuthDataState>(store))
export default useAuthData
