import { useTransactionStarter } from '../web3/useTransactionStarter'
import useStakingState from './dataSources/staking.slice'
import { KyotoAddTokenParametersForm } from './components/KyotoAddTokenParametersForm'
import { useStakingLogic } from './logic/useStakingLogic'
import { KyotoAddTokenPreview } from './components/KyotoAddTokenPreview'
import { parseEther } from 'viem'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { useVestingContract } from './dataSources/vestingContract'
import { KyotoClaimParametersForm } from './components/KyotoClaimParametersForm'

export const KyotoMigrationStakingModals = () => {
  const { stakeMigrationPopup, claimVestingPopup } = useStakingState()
  const { closeStakeVestingPopup, submitStakeVestingEthAmount, closeClaimVestingPopup } = useStakingLogic()

  const { startTransaction, chain, txHash, transactionInitStatus } = useTransactionStarter()
  const { stake, release } = useVestingContract({ scheduleIds: [] })

  const handleStakeKyoto = async () => {
    if (!stakeMigrationPopup) {
      return
    }
    const amount = parseEther(String(stakeMigrationPopup.stakedAmountEth))
    closeStakeVestingPopup()
    startTransaction('kyoto', () => stake(stakeMigrationPopup.vestingId, amount))
  }

  const handleClaimKyoto = async (amountEth: number) => {
    if (!claimVestingPopup) {
      return
    }
    const amount = parseEther(String(amountEth))
    closeClaimVestingPopup()
    startTransaction('kyoto', () => release(claimVestingPopup.vestingId, amount))
  }

  return (
    <>
      <TransactionProgressModal chain={chain} txHash={txHash} transactionInitStatus={transactionInitStatus} />
      {stakeMigrationPopup?.step === 'select-amount' && (
        <KyotoAddTokenParametersForm
          balance={stakeMigrationPopup.walletBalance}
          poolAvailability={stakeMigrationPopup.poolAvailability}
          minAmountEth={1}
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
      {claimVestingPopup && (
        <KyotoClaimParametersForm
          rewardsAvailable={claimVestingPopup.rewardsAvailable}
          onClose={closeClaimVestingPopup}
          onSubmit={handleClaimKyoto}
        />
      )}
    </>
  )
}
