import { create } from '@/utils/zustand/storeUtils'
import { Draft } from 'immer'
import { immer } from 'zustand/middleware/immer'

export interface AddStakePopupdata {
  step: 'select-amount' | 'previev'
  poolAvailability: bigint
  walletBalance: bigint
  stakedAmountEth: number
}

export interface MigrationStakePopupdata extends AddStakePopupdata {
  vestingId: bigint
}

export interface ClaimStakePopupdata {
  stakeId: number
  rewardsAvailable: bigint
}

interface SettingsState {
  addStakePopup: AddStakePopupdata | null
  setAddStakePopup(data: AddStakePopupdata | null): void
  claimStakePopup: ClaimStakePopupdata | null
  setClaimStakePopup(data: ClaimStakePopupdata | null): void
  stakeMigrationPopup: MigrationStakePopupdata | null
  setStakeMigrationPopup(data: MigrationStakePopupdata | null): void
}

const store = (set: Function) =>
  ({
    addStakePopup: null,
    claimStakePopup: null,
    stakeMigrationPopup: null,
    setAddStakePopup(data: AddStakePopupdata) {
      set((s: Draft<SettingsState>) => {
        s.addStakePopup = data
      })
    },
    setClaimStakePopup(data: ClaimStakePopupdata | null) {
      set((s: Draft<SettingsState>) => {
        s.claimStakePopup = data
      })
    },
    setStakeMigrationPopup(data: MigrationStakePopupdata) {
      set((s: Draft<SettingsState>) => {
        s.stakeMigrationPopup = data
      })
    },
  } satisfies SettingsState)

const useStaking = create<SettingsState>()(immer<SettingsState>(store))
export default useStaking
