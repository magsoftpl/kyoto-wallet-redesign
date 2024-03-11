import { TokenStakingInfo, TokenStakingRewardsInfo } from '../dataSources/stakingContract'
import { BlockTimestampAsDateFormatter } from '@/components/formatters/BlockTimestampAsDateFormatter'
import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { Button } from '@/components/simple-controls/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface KyotoTokenStakingTableProps {
  stakeData: TokenStakingInfo[]
  rewardsData: TokenStakingRewardsInfo[]
  onClaimStakeClick(stakeId: number): void
}

export const KyotoTokenStakingTable = ({ stakeData, rewardsData, onClaimStakeClick }: KyotoTokenStakingTableProps) => {
  const addYear = (timestamp: bigint) => {
    const year = 60 * 60 * 24 * 365
    return timestamp + BigInt(year)
  }

  const calcReward = (stakeId: number, stakedAmount: bigint) => {
    const rewardItem = rewardsData.find((reward) => reward.stakeId === stakeId)
    if (!rewardItem) {
      return null
    }
    return rewardItem.amount
  }

  return (
    <div role="table" className="w-full flex flex-col gap-2 uppercase">
      {stakeData.map((stake, index) => (
        <div key={index} role="row" className="p-2 flex gap-2 w-full">
          <div className="w-full flex flex-col md:flex-row items-start">
            <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
              <div className="font-semibold">Lock date</div>
              <BlockTimestampAsDateFormatter datePattern="P">{stake.startTimestamp}</BlockTimestampAsDateFormatter>
            </div>
            <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
              <div className="font-semibold">Unlock date</div>
              <BlockTimestampAsDateFormatter datePattern="P">
                {addYear(stake.startTimestamp)}
              </BlockTimestampAsDateFormatter>
            </div>
            <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
              <div className="font-semibold">Kyoto staked</div>
              <EthValueFormatter valueWei={stake.stakedAmount} currency="KYOTO" />
            </div>
            <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
              <div className="font-semibold">Rewards</div>
              <EthValueFormatter valueWei={calcReward(index, stake.stakedAmount)} currency="KYOTO" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="lg:min-w-[9rem]">
              <Button variant="primary" onClick={() => onClaimStakeClick(index)}>
                Claim
              </Button>
            </div>
            <Button variant="secondary">
              <div className="flex items-center gap-2">
                Unstake
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
