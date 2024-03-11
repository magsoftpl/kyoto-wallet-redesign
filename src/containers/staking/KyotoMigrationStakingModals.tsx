import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { useTransactionStarter } from '../web3/useTransactionStarter'
import { useStakingContract } from './dataSources/stakingContract'
import useStakingState from './dataSources/staking.slice'
import { KyotoAddTokenParametersForm } from './components/KyotoAddTokenParametersForm'
import { useStakingLogic } from './logic/useStakingLogic'
import { KyotoAddTokenPreview } from './components/KyotoAddTokenPreview'
import { parseEther } from 'viem'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'

export const KyotoMigrationStakingModals = () => {
  const { address } = useCurrentWalletInfo()
  const { stakeMigrationPopup } = useStakingState()
  const { closeStakeVestingPopup, submitStakeVestingEthAmount } = useStakingLogic()

  const { startTransaction, chain, txHash, transactionInitStatus } = useTransactionStarter()
  const {} = useStakingContract({ owner: address, readEnabled: false })

  const handleStakeKyoto = async () => {
    if (!stakeMigrationPopup) {
      return
    }
    const amount = parseEther(String(stakeMigrationPopup.stakedAmountEth))
    closeStakeVestingPopup()
    // startTransaction('kyoto', () => stake(amount))
  }

  return (
    <>
      <TransactionProgressModal chain={chain} txHash={txHash} transactionInitStatus={transactionInitStatus} />
      {stakeMigrationPopup?.step === 'select-amount' && (
        <KyotoAddTokenParametersForm
          balance={stakeMigrationPopup.walletBalance}
          poolAvailability={stakeMigrationPopup.poolAvailability}
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
