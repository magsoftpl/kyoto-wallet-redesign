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
import { useCurrentUserBalance } from '../userFinances/useCurrentUserBalance'
import { useStakingContract } from './dataSources/stakingContract'

export const MigrationStaking = () => {
  const { showStakeVestingPopup } = useStakingLogic()
  const { data: walletBalance } = useCurrentUserBalance()
  const { address, isConnectedToProperWallet } = useCurrentWalletInfo()
  const { balance: balanceToMigrate, migrate } = useBscMigrationSourceContract({ owner: address! })
  const { data: vestingData, refetch: refetchVestingData } = useVestingData({ address })
  const { vestingInfo, releasableInfo, release, refetchVestingInfo } = useVestingContract({
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
    startTransaction('kyoto', () => release(vestingId))
  }

  const handleStakeVesting = async (vestingId: bigint) => {
    showStakeVestingPopup({ poolAvailability: poolCapacity!, walletBalance: walletBalance!, vestingId })
  }

  return (
    <Panel variant="primary" collapsible title="Migration">
      <TransactionProgressModal txHash={txHash} chain={chain} transactionInitStatus={transactionInitStatus} />
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
