import { Panel } from '@/components/complex-controls/Panel'
import { useStakingContract } from './dataSources/stakingContract'
import { Button } from '@/components/simple-controls/button/Button'
import { KyotoTokenStakingTable } from './components/KyotoTokenStakingTable'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { useStakingLogic } from './logic/useStakingLogic'
import { useCurrentUserBalance } from '../userFinances/useCurrentUserBalance'
import { useTransactionStarter } from '../web3/useTransactionStarter'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { ReactNode } from 'react'

interface KyotoTokenStakingProps {
  toolbar?: ReactNode
}

export const KyotoTokenStaking = ({ toolbar }: KyotoTokenStakingProps) => {
  const { address } = useCurrentWalletInfo()
  const { data: walletBalance } = useCurrentUserBalance()
  const { stakeCount, poolCapacity, stakes, rewards, unstake, refetch } = useStakingContract({ owner: address })
  const { showAddTokenStakePopup, showClaimStakePopup } = useStakingLogic()
  const { startTransaction, chain, txHash, transactionInitStatus } = useTransactionStarter()

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

  const handleWithdrawStake = async (stakeId: number) => {
    if (!rewards) {
      return
    }
    startTransaction('kyoto', () => unstake(BigInt(stakeId)))
  }

  const stakingCountSuffix = !!stakeCount ? ` (${stakeCount})` : ''
  return (
    <>
      <TransactionProgressModal
        chain={chain}
        txHash={txHash}
        transactionInitStatus={transactionInitStatus}
        onClose={refetch}
      />
      <Panel
        collapsible
        title={
          <div className="w-full flex justify-between items-center">
            <div>{`Staking${stakingCountSuffix}`}</div>
            <div className="flex gap-2">
              {!!stakeCount && (
                <Button variant="primary" onClick={handleShowStakingModal}>
                  Stake KYOTO
                </Button>
              )}
              {toolbar}
            </div>
          </div>
        }
      >
        {stakes && rewards && !!stakeCount && (
          <KyotoTokenStakingTable
            stakeData={stakes}
            rewardsData={rewards}
            onClaimStakeClick={handleShowClaimStakeModal}
            onWithdrawStakeClick={handleWithdrawStake}
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
    </>
  )
}
