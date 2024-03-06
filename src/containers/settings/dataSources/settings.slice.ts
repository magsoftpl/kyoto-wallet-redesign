import { LoadingState } from '@/types/loadingState.type'
import { create } from '@/utils/zustand/storeUtils'
import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'

export interface SettingsData {
  lastPasswordChange: Date | null
  last2FaChange: Date | null
}

interface SettingsState {
  loadingState: LoadingState
  setLoadingState(data: LoadingState): void
  settings: SettingsData | null
  setSettingsData(data: SettingsData | null): void
}

const store = (set: Function) =>
  ({
    loadingState: 'not-loaded',
    setLoadingState(data: LoadingState) {
      set((s: Draft<SettingsState>) => {
        s.loadingState = data
      })
    },
    settings: null,
    setSettingsData(data: SettingsData | null) {
      set((s: Draft<SettingsState>) => {
        s.settings = data
      })
    },
  } satisfies SettingsState)

const useCurrentUserData = create<SettingsState>()(immer<SettingsState>(store))
export default useCurrentUserData
