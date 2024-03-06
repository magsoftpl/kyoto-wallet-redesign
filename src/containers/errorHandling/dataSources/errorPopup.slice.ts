import { create } from '@/utils/zustand/storeUtils'
import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'

interface ErrorPopupState {
  currentError: string | null
  setCurrentError(data: string | null): void
}

const store = (set: Function) =>
  ({
    currentError: null,
    setCurrentError(data: string | null) {
      set((s: Draft<ErrorPopupState>) => {
        s.currentError = data
      })
    },
  } satisfies ErrorPopupState)

const useCurrentUserData = create<ErrorPopupState>()(immer<ErrorPopupState>(store))
export default useCurrentUserData
