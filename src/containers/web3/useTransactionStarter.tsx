import { Address } from '@/types/address.type'
import { useCallback, useMemo, useState } from 'react'
import { useNetworkConfig } from './useNetworkConfigs'
import { Hash } from 'viem'
import { useWriteContractPreparation } from './useWriteContractPreparation'

export type TransactionInitStatus = 'idle' | 'in-progress' | 'error'

export const useTransactionStarter = () => {
  const [transactionInitStatus, setTransactionInitStatus] = useState<TransactionInitStatus>('idle')
  const [chain, setChain] = useState<keyof ReturnType<typeof useNetworkConfig>>()
  const [txHash, setTxHash] = useState<Address>()
  const { ensureConnectionToNetwork } = useWriteContractPreparation()
  const chains = useNetworkConfig()

  const startTransaction = useCallback(
    async (txChain: keyof ReturnType<typeof useNetworkConfig>, txFn: () => Promise<Hash>) => {
      try {
        setTransactionInitStatus('in-progress')
        setChain(txChain)
        await ensureConnectionToNetwork(chains[txChain].chainId)
        const result = await txFn()
        setTransactionInitStatus('idle')
        setTxHash(result)
      } catch (err) {
        setTransactionInitStatus('error')
        return undefined
      }
    },
    [chains, ensureConnectionToNetwork],
  )

  const result = useMemo(
    () => ({
      chain,
      txHash,
      transactionInitStatus,
      startTransaction,
    }),
    [chain, startTransaction, transactionInitStatus, txHash],
  )

  return result
}
