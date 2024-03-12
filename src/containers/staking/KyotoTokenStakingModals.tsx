import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { useTransactionStarter } from '../web3/useTransactionStarter'
import { useStakingContract } from './dataSources/stakingContract'
import useStakingState from './dataSources/staking.slice'
import { KyotoAddTokenParametersForm } from './components/KyotoAddTokenParametersForm'
import { useStakingLogic } from './logic/useStakingLogic'
import { KyotoAddTokenPreview } from './components/KyotoAddTokenPreview'
import { parseEther } from 'viem'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { KyotoClaimParametersForm } from './components/KyotoClaimParametersForm'

export const KyotoTokenStakingModals = () => {
  const { address } = useCurrentWalletInfo()
  const { addStakePopup, claimStakePopup } = useStakingState()
  const { closeAddTokenStakePopup, submitAddTokensStakeEthAmount, closeClaimStakePopup } = useStakingLogic()

  const { startTransaction, chain, txHash, transactionInitStatus } = useTransactionStarter()
  const { stake, claimRewards, refetch } = useStakingContract({ owner: address, readEnabled: false })

  const handleStakeKyoto = async () => {
    if (!addStakePopup) {
      return
    }
    const amount = parseEther(String(addStakePopup.stakedAmountEth))
    closeAddTokenStakePopup()
    startTransaction('kyoto', () => stake(amount))
  }

  const handleClaimKyoto = async (amountEth: number) => {
    if (!claimStakePopup) {
      return
    }
    const stakeId = BigInt(claimStakePopup.stakeId)
    const amount = parseEther(String(amountEth))
    closeClaimStakePopup()
    startTransaction('kyoto', () => claimRewards(stakeId, amount))
  }

  return (
    <>
      <TransactionProgressModal
        chain={chain}
        txHash={txHash}
        transactionInitStatus={transactionInitStatus}
        onClose={refetch}
      />
      {addStakePopup?.step === 'select-amount' && (
        <KyotoAddTokenParametersForm
          balance={addStakePopup.walletBalance}
          poolAvailability={addStakePopup.poolAvailability}
          minAmountEth={1}
          onClose={closeAddTokenStakePopup}
          onSubmit={submitAddTokensStakeEthAmount}
        />
      )}
      {addStakePopup?.step === 'previev' && (
        <KyotoAddTokenPreview
          amountEth={addStakePopup.stakedAmountEth}
          onClose={closeAddTokenStakePopup}
          onAccept={handleStakeKyoto}
        />
      )}
      {claimStakePopup && (
        <KyotoClaimParametersForm
          rewardsAvailable={claimStakePopup.rewardsAvailable}
          onClose={closeClaimStakePopup}
          onSubmit={handleClaimKyoto}
        />
      )}
    </>
  )
}
