import { useBscMigrationSourceContract } from './dataSources/bscMigrationSourceContract'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { PendingMigration } from './components/PendingMigration'
import { useVestingData } from './dataSources/useVestingData'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { MigrationsTable } from './components/MigrationsTable'
import { useVestingContract } from './dataSources/vestingContract'
import { useTransactionStarter } from '../web3/useTransactionStarter'
import { Panel } from '@/components/complex-controls/Panel'
import { useStakingLogic } from './logic/useStakingLogic'
import { useStakingContract } from './dataSources/stakingContract'

export const MigrationStaking = () => {
  const { showStakeVestingPopup, showClaimVestingPopup } = useStakingLogic()
  const { address, isConnectedToProperWallet } = useCurrentWalletInfo()
  const { balance: balanceToMigrate, migrate } = useBscMigrationSourceContract({ owner: address! })
  const { data: vestingData, refetch: refetchVestingData } = useVestingData({ address })
  const { vestingInfo, releasableInfo } = useVestingContract({
    scheduleIds: vestingData.map((vs) => vs.vestingId),
  })
  const { poolCapacity } = useStakingContract({ owner: address })

  const { chain, txHash, transactionInitStatus, startTransaction } = useTransactionStarter()

  const handleSignTransaction = async () => {
    if (!balanceToMigrate) {
      return
    }
    startTransaction('bsc', () => migrate(balanceToMigrate))
  }

  const handleReleaseVesting = async (vestingId: bigint) => {
    const toRelease = releasableInfo?.find((ri) => ri.vestingId === vestingId)
    if (!toRelease) {
      return
    }
    showClaimVestingPopup({ rewardsAvailable: toRelease.amount, vestingId })
  }

  const handleStakeVesting = async (vestingId: bigint) => {
    const toRelease = releasableInfo?.find((ri) => ri.vestingId === vestingId)
    if (!toRelease) {
      return
    }
    showStakeVestingPopup({ poolAvailability: poolCapacity!, walletBalance: toRelease.amount, vestingId })
  }

  return (
    <Panel variant="primary" collapsible title="Migration">
      <TransactionProgressModal
        txHash={txHash}
        chain={chain}
        transactionInitStatus={transactionInitStatus}
        onClose={refetchVestingData}
      />
      <div className="w-full flex flex-col gap-2">
        {vestingInfo && releasableInfo && (
          <MigrationsTable
            vestingInfoData={vestingInfo}
            releasableData={releasableInfo}
            onClaimClick={handleReleaseVesting}
            onStakeClick={handleStakeVesting}
          />
        )}
        {!!balanceToMigrate && (
          <PendingMigration
            amount={balanceToMigrate}
            isConnected={isConnectedToProperWallet}
            onSignTransactionClick={handleSignTransaction}
          />
        )}
      </div>
    </Panel>
  )
}
