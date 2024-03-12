import { TokenStakingInfo, TokenStakingRewardsInfo } from '../dataSources/stakingContract'
import { KyotoTokenStakingTableRow } from './KyotoTokenStakingTableRow'

interface KyotoTokenStakingTableProps {
  stakeData: TokenStakingInfo[]
  rewardsData: TokenStakingRewardsInfo[]
  onClaimStakeClick(stakeId: number): void
  onWithdrawStakeClick(stakeId: number): void
}

export const KyotoTokenStakingTable = ({
  stakeData,
  rewardsData,
  onClaimStakeClick,
  onWithdrawStakeClick,
}: KyotoTokenStakingTableProps) => {
  const getRewardsData = (stakeId: number) => {
    const rewardItem = rewardsData.find((reward) => reward.stakeId === stakeId)
    if (!rewardItem) {
      return null
    }
    return rewardItem
  }

  return (
    <div role="table" className="w-full flex flex-col gap-2 uppercase">
      {stakeData.map((stake) => (
        <KyotoTokenStakingTableRow
          key={stake.stakeId}
          stakeId={stake.stakeId}
          stakeData={stake}
          rewardsData={getRewardsData(stake.stakeId)}
          onClaimStakeClick={onClaimStakeClick}
          onWithdrawStakeClick={onWithdrawStakeClick}
        />
      ))}
    </div>
  )
}
