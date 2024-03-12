import { TokenStakingInfo, TokenStakingRewardsInfo } from '../dataSources/stakingContract'
import { BlockTimestampAsDateFormatter } from '@/components/formatters/BlockTimestampAsDateFormatter'
import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { Button } from '@/components/simple-controls/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faWarning } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { calcApyValue } from '../logic/getStakeApy'

interface KyotoTokenStakingTableProps {
  stakeId: number
  stakeData: TokenStakingInfo
  rewardsData: TokenStakingRewardsInfo | null
  onClaimStakeClick(stakeId: number): void
  onWithdrawStakeClick(stakeId: number): void
}

export const KyotoTokenStakingTableRow = ({
  stakeId,
  stakeData,
  rewardsData,
  onClaimStakeClick,
  onWithdrawStakeClick,
}: KyotoTokenStakingTableProps) => {
  const [isExpanded, setExpanded] = useState(false)

  const addYear = (timestamp: bigint) => {
    const year = 60 * 60 * 24 * 365
    return timestamp + BigInt(year)
  }

  return (
    <>
      <div role="row" className="p-2 flex gap-2 w-full">
        <div className="w-full flex flex-col md:flex-row items-start">
          <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
            <div className="font-semibold">Lock date</div>
            <BlockTimestampAsDateFormatter datePattern="P">{stakeData.startTimestamp}</BlockTimestampAsDateFormatter>
          </div>
          <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
            <div className="font-semibold">Unlock date</div>
            <BlockTimestampAsDateFormatter datePattern="P">
              {addYear(stakeData.startTimestamp)}
            </BlockTimestampAsDateFormatter>
          </div>
          <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
            <div className="font-semibold">Kyoto staked</div>
            <EthValueFormatter valueWei={stakeData.stakedAmount} precision={4} currency="KYOTO" />
          </div>
          <div role="cell" className="basis-1/4 flex flex-col items-start md:items-center">
            <div className="font-semibold">Rewards</div>
            <EthValueFormatter valueWei={rewardsData?.amount} precision={4} currency="KYOTO" />
          </div>
        </div>
        <div className="shrink-0 flex justify-center items-center gap-2">
          <div className="lg:min-w-[9rem]">
            {!!rewardsData?.amount && (
              <Button variant="primary" onClick={() => onClaimStakeClick(stakeId)}>
                Claim
              </Button>
            )}
          </div>
          <div className="lg:min-w-[9rem]">
            {!!rewardsData?.amount && (
              <div className="lg:min-w-[9rem]">
                <Button variant="secondary" onClick={() => setExpanded(!isExpanded)}>
                  Unstake
                  <FontAwesomeIcon className="ml-2" icon={isExpanded ? faChevronUp : faChevronDown} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div role="row" className="p-2 w-full flex justify-end">
          <div role="cell" className="w-full p-6 max-w-[31rem] flex flex-col gap-3 bg-inactive-100 rounded-xl">
            <div className="w-full flex justify-between">
              <div className="font-semibold">Your stake</div>
              <EthValueFormatter valueWei={stakeData.stakedAmount} precision={4} currency="KYOTO" />
            </div>
            <div className="w-full flex justify-between">
              <div className="font-semibold">Lock date</div>
              <BlockTimestampAsDateFormatter datePattern="P">{stakeData.startTimestamp}</BlockTimestampAsDateFormatter>
            </div>
            <div className="w-full flex justify-between">
              <div className="font-semibold">Unlock date</div>
              <BlockTimestampAsDateFormatter datePattern="P">
                {addYear(stakeData.startTimestamp)}
              </BlockTimestampAsDateFormatter>
            </div>
            <div className="w-full flex justify-between">
              <div className="font-semibold">Lock period total rewards</div>
              <EthValueFormatter valueWei={calcApyValue(stakeData.stakedAmount)} precision={4} currency="KYOTO" />
            </div>
            <div className="py-3 w-full flex justify-center">
              <Button variant="primary" layout="compact" onClick={() => onWithdrawStakeClick(stakeId)}>
                Withdraw
              </Button>
            </div>
            <div className="w-full overflow-hidden flex bg-white rounded-xl">
              <div className="w-24 px-4 py-2 flex justify-center items-center bg-secondary-950 text-white">
                <FontAwesomeIcon icon={faWarning} />
              </div>
              <div className="px-4 py-2 text-sm">Withdrawal fee when withdrawing before unlock date</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
