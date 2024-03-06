'use client'
import { Panel } from '@/components/complex-controls/Panel'
import { Pill } from '@/components/simple-controls/pill/Pill'
import { useStakingMigrationLogic } from './logic/useStakingMigrationLogic'
import { useEffect, useState } from 'react'
import { useBscMigrationSourceContract } from './dataSources/bscMigrationSourceContract'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { PendingMigration } from './components/PendingMigration'
import { useVestingData } from './dataSources/useVestingData'
import { Address } from 'viem'
import { TransactionProgressModal } from '../web3/TransactionProgressModal'
import { MigrationsTable } from './components/MigrationsTable'
import { useVestingContract } from './dataSources/vestingContract'

export const Staking = () => {
  const { loadPage, unloadPage } = useStakingMigrationLogic()
  const { address, isConnectedToProperWallet } = useCurrentWalletInfo()
  const { balance: balanceToMigrate, migrate } = useBscMigrationSourceContract({ owner: address! })
  const { data: vestingData, refetch: refetchVestingData } = useVestingData({ address })
  const { vestingInfo, releasableInfo } = useVestingContract({ scheduleIds: vestingData.map((vs) => vs.vestingId) })

  const [txHash, setTxHash] = useState<Address>()

  useEffect(() => {
    loadPage()
    refetchVestingData()
    return () => {
      unloadPage()
    }
  }, [loadPage, refetchVestingData, unloadPage])

  const handleSignTransaction = async () => {
    if (!balanceToMigrate) {
      return
    }
    const hash = await migrate(balanceToMigrate)
    setTxHash(hash)
  }

  return (
    <>
      <TransactionProgressModal txHash={txHash} chain="bsc" />
      <div className="w-full min-h-72 py-12 md:px-4 flex flex-col items-center gap-12">
        <Panel
          variant="primary"
          collapsible
          title={
            <div className="w-full flex justify-between">
              <div className="flex items-center">Migration</div>
              <Pill variant="primary">Live</Pill>
            </div>
          }
        >
          <div className="w-full flex flex-col gap-2">
            {vestingInfo && releasableInfo && (
              <MigrationsTable vestingInfoData={vestingInfo} releasableData={releasableInfo} />
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
      </div>
    </>
  )
}
