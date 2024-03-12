import useStakingState from '../dataSources/staking.slice'
import { useCallback, useMemo } from 'react'

export const useStakingLogic = () => {
  const {
    addStakePopup,
    setAddStakePopup,
    setClaimStakePopup,
    setStakeMigrationPopup,
    stakeMigrationPopup,
    setClaimVestingPopup,
  } = useStakingState()

  const showAddTokenStakePopup = useCallback(
    ({ poolAvailability, walletBalance }: { poolAvailability: bigint; walletBalance: bigint }) => {
      setAddStakePopup({ step: 'select-amount', poolAvailability, walletBalance, stakedAmountEth: 0 })
    },
    [setAddStakePopup],
  )

  const closeAddTokenStakePopup = useCallback(() => {
    setAddStakePopup(null)
  }, [setAddStakePopup])

  const submitAddTokensStakeEthAmount = useCallback(
    (stakedAmountEth: number) => {
      if (!addStakePopup) {
        return
      }
      setAddStakePopup({
        ...addStakePopup,
        step: 'previev',
        stakedAmountEth,
      })
    },
    [addStakePopup, setAddStakePopup],
  )

  const showClaimStakePopup = useCallback(
    ({ stakeId, rewardsAvailable }: { stakeId: number; rewardsAvailable: bigint }) => {
      setClaimStakePopup({
        stakeId,
        rewardsAvailable,
      })
    },
    [setClaimStakePopup],
  )

  const closeClaimStakePopup = useCallback(() => {
    setClaimStakePopup(null)
  }, [setClaimStakePopup])

  const showStakeVestingPopup = useCallback(
    ({
      poolAvailability,
      walletBalance,
      vestingId,
    }: {
      poolAvailability: bigint
      walletBalance: bigint
      vestingId: bigint
    }) => {
      setStakeMigrationPopup({
        step: 'select-amount',
        poolAvailability,
        walletBalance,
        stakedAmountEth: 0,
        vestingId,
      })
    },
    [setStakeMigrationPopup],
  )

  const closeStakeVestingPopup = useCallback(() => {
    setStakeMigrationPopup(null)
  }, [setStakeMigrationPopup])

  const submitStakeVestingEthAmount = useCallback(
    (stakedAmountEth: number) => {
      if (!stakeMigrationPopup) {
        return
      }
      setStakeMigrationPopup({
        ...stakeMigrationPopup,
        step: 'previev',
        stakedAmountEth,
      })
    },
    [setStakeMigrationPopup, stakeMigrationPopup],
  )

  const showClaimVestingPopup = useCallback(
    ({ rewardsAvailable, vestingId }: { rewardsAvailable: bigint; vestingId: bigint }) => {
      setClaimVestingPopup({
        rewardsAvailable,
        vestingId,
      })
    },
    [setClaimVestingPopup],
  )

  const closeClaimVestingPopup = useCallback(() => {
    setClaimVestingPopup(null)
  }, [setClaimVestingPopup])

  const result = useMemo(
    () => ({
      showAddTokenStakePopup,
      closeAddTokenStakePopup,
      submitAddTokensStakeEthAmount,
      showClaimStakePopup,
      closeClaimStakePopup,
      showStakeVestingPopup,
      closeStakeVestingPopup,
      submitStakeVestingEthAmount,
      showClaimVestingPopup,
      closeClaimVestingPopup,
    }),
    [
      closeAddTokenStakePopup,
      closeClaimStakePopup,
      closeStakeVestingPopup,
      showAddTokenStakePopup,
      showClaimStakePopup,
      showStakeVestingPopup,
      submitAddTokensStakeEthAmount,
      submitStakeVestingEthAmount,
      showClaimVestingPopup,
      closeClaimVestingPopup,
    ],
  )
  return result
}
