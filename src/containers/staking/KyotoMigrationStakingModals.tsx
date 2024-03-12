import { useTransactionStarter } from '../web3/useTransactionStarter'
import useStakingState from './dataSources/staking.slice'
import { KyotoAddTokenParametersForm } from './components/KyotoAddTokenParametersForm'
import { useStakingLogic } from './logic/useStakingLogic'
import { KyotoAddTokenPreview } from './components/KyotoAddTokenPreview'
import { formatEther, parseEther } from 'viem'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { useVestingContract } from './dataSources/vestingContract'

export const KyotoMigrationStakingModals = () => {
  const { stakeMigrationPopup } = useStakingState()
  const { closeStakeVestingPopup, submitStakeVestingEthAmount } = useStakingLogic()

  const { startTransaction, chain, txHash, transactionInitStatus } = useTransactionStarter()
  const { stake } = useVestingContract({ scheduleIds: [] })

  const handleStakeKyoto = async () => {
    if (!stakeMigrationPopup) {
      return
    }
    const amount = parseEther(String(stakeMigrationPopup.stakedAmountEth))
    closeStakeVestingPopup()
    startTransaction('kyoto', () => stake(stakeMigrationPopup.vestingId, amount))
  }

  return (
    <>
      <TransactionProgressModal chain={chain} txHash={txHash} transactionInitStatus={transactionInitStatus} />
      {stakeMigrationPopup?.step === 'select-amount' && (
        <KyotoAddTokenParametersForm
          balance={stakeMigrationPopup.walletBalance}
          poolAvailability={stakeMigrationPopup.poolAvailability}
          minAmountEth={Number(formatEther(BigInt(1), 'wei'))}
          onClose={closeStakeVestingPopup}
          onSubmit={submitStakeVestingEthAmount}
        />
      )}
      {stakeMigrationPopup?.step === 'previev' && (
        <KyotoAddTokenPreview
          amountEth={stakeMigrationPopup.stakedAmountEth}
          onClose={closeStakeVestingPopup}
          onAccept={handleStakeKyoto}
        />
      )}
    </>
  )
}
