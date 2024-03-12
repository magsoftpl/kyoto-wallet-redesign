import { Modal } from '@/components/complex-controls/Modal'
import { useTransactionReceipt } from 'wagmi'
import { Address } from '@/types/address.type'
import { useNetworkConfig } from './useNetworkConfigs'
import { useEffect, useState } from 'react'
import { TransactionInitStatus } from './useTransactionStarter'
import {
  TransactionWalletActionPending,
  transactionWalletActionPendingTitle,
} from './components/TransactionWalletActionPending'
import {
  TransactionWalletActionFailed,
  transactionWalletActionFailedTitle,
} from './components/TransactionWalletActionFailed'
import {
  TransactionBlockChainPending,
  transactionBlockChainPendingTitle,
} from './components/TransactionBlockChainPending'
import { TransactionBlockChainFailed, transactionBlockChainFailedTitle } from './components/TransactionBlockChainFailed'
import {
  TransactionBlockChainSuccess,
  transactionBlockChainSuccessTitle,
} from './components/TransactionBlockChainSuccess'

interface TransactionProgressModalProps {
  txHash: Address | undefined
  chain: keyof ReturnType<typeof useNetworkConfig> | undefined
  transactionInitStatus: TransactionInitStatus
  onClose?(): void
}

export const TransactionProgressModal = ({
  txHash,
  chain,
  transactionInitStatus,
  onClose,
}: TransactionProgressModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const info = useTransactionReceipt({
    query: {
      enabled: !!txHash,
    },
    hash: txHash,
  })

  useEffect(() => {
    if (transactionInitStatus !== 'idle' || (txHash && chain)) {
      setIsVisible(true)
    }
  }, [chain, transactionInitStatus, txHash])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const getTitle = () => {
    if (transactionInitStatus === 'in-progress') {
      return transactionWalletActionPendingTitle
    }
    if (transactionInitStatus === 'error') {
      return transactionWalletActionFailedTitle
    }
    if (info.isPending) {
      return transactionBlockChainPendingTitle
    }
    if (info.isError) {
      return transactionBlockChainFailedTitle
    }
    if (info.isSuccess) {
      return transactionBlockChainSuccessTitle
    }
    return 'Waiting for confirmation'
  }

  return (
    <Modal
      title={<div className="pt-4">{getTitle()}</div>}
      theme="dark"
      show={isVisible}
      hasCloseButton
      onClose={handleClose}
    >
      <div className="w-screen max-w-[30rem] h-[20rem]">
        {transactionInitStatus === 'in-progress' && <TransactionWalletActionPending />}
        {transactionInitStatus === 'error' && <TransactionWalletActionFailed />}
        {transactionInitStatus === 'idle' && info.isPending && (
          <TransactionBlockChainPending txHash={txHash!} chain={chain!} />
        )}
        {transactionInitStatus === 'idle' && info.isError && (
          <TransactionBlockChainFailed txHash={txHash!} chain={chain!} />
        )}
        {transactionInitStatus === 'idle' && info.isSuccess && (
          <TransactionBlockChainSuccess txHash={txHash!} chain={chain!} />
        )}
      </div>
    </Modal>
  )
}
