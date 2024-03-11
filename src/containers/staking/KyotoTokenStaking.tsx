import { Panel } from '@/components/complex-controls/Panel'
import { useStakingContract } from './dataSources/stakingContract'
import { Button } from '@/components/simple-controls/button/Button'
import { KyotoTokenStakingTable } from './components/KyotoTokenStakingTable'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { useStakingLogic } from './logic/useStakingLogic'
import { useCurrentUserBalance } from '../userFinances/useCurrentUserBalance'

export const KyotoTokenStaking = () => {
  const { address } = useCurrentWalletInfo()
  const { data: walletBalance } = useCurrentUserBalance()
  const { stakeCount, poolCapacity, stakes, rewards } = useStakingContract({ owner: address })
  const { showAddTokenStakePopup, showClaimStakePopup } = useStakingLogic()

  const handleShowStakingModal = () => {
    showAddTokenStakePopup({ walletBalance: walletBalance!, poolAvailability: poolCapacity! })
  }

  const handleShowClaimStakeModal = async (stakeId: number) => {
    if (!rewards) {
      return
    }
    const rewardsAvailable = rewards.find((reward) => reward.stakeId === stakeId)
    if (!rewardsAvailable) {
      return
    }
    showClaimStakePopup({ stakeId, rewardsAvailable: rewardsAvailable.amount })
  }

  const stakingCountSuffix = !!stakeCount ? ` (${stakeCount})` : ''
  return (
    <Panel
      collapsible
      title={
        <div className="w-full flex justify-between items-center">
          <div>{`Staking${stakingCountSuffix}`}</div>
          {!!stakeCount && (
            <Button variant="primary" onClick={handleShowStakingModal}>
              Stake KYOTO
            </Button>
          )}
        </div>
      }
    >
      {stakes && rewards && !!stakeCount && (
        <KyotoTokenStakingTable
          stakeData={stakes}
          rewardsData={rewards}
          onClaimStakeClick={handleShowClaimStakeModal}
        />
      )}
      {stakes && !stakeCount && (
        <div className="w-full flex flex-col items-center gap-2 font-semibold uppercase">
          <div>You have nothing currently staked</div>
          <div>Stake KYOTO and earn governance tokens</div>
          <Button variant="primary" onClick={handleShowStakingModal}>
            Stake KYOTO
          </Button>
        </div>
      )}
    </Panel>
  )
}
