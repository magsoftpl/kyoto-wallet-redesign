import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { Pill } from '@/components/simple-controls/pill/Pill'
import { Modal } from '@/components/complex-controls/Modal'
import { useTransactionReceipt } from 'wagmi'
import { Address } from '@/types/address.type'
import { useNetworkConfig } from './useNetworkConfigs'
import { TxLink } from './TxLink'
import { useEffect, useState } from 'react'

interface TransactionProgressModalProps {
  txHash: Address | undefined
  chain: keyof ReturnType<typeof useNetworkConfig>
}

export const TransactionProgressModal = ({ txHash, chain }: TransactionProgressModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const info = useTransactionReceipt({
    query: {
      enabled: !!txHash,
    },
    hash: txHash,
  })

  useEffect(() => {
    if (txHash) {
      setIsVisible(true)
    }
  }, [txHash])

  const handleClose = () => {
    setIsVisible(false)
  }

  const isPending = !info.isSuccess && !info.isError
  const title = !isPending ? 'Transaction submitted' : 'Waiting for confirmation'
  const outerProgressClass = classNames(
    'h-16 p-2 rounded-full border-[6px] border-solid',
    isPending && 'border-white',
    info.isSuccess && 'border-primary-400',
    info.isError && 'border-red',
  )
  const innerProgressClass = classNames(
    'h-full p-1',
    isPending && 'w-1/3 rounded-l-full bg-white',
    info.isSuccess && 'w-full rounded-full bg-primary-400',
    info.isError && 'w-full rounded-full bg-red',
  )

  const getMessageClass = () =>
    classNames(
      'min-h-[3.2em]',
      isPending && 'text-white',
      info.isSuccess && 'text-primary-400',
      info.isError && 'text-red',
    )

  const getText = () => {
    if (info.isSuccess) {
      return 'Your transaction succeded'
    }
    if (info.isError) {
      return 'Your transaction failed'
    }
    return 'Your transaction will be completed in approximately 60s'
  }

  return (
    <Modal title={title} theme="dark" show={isVisible} hasCloseButton onClose={handleClose}>
      <div className="w-full max-w-[25rem] p-4 pb-8 flex flex-col gap-8 justify-center uppercase text-center">
        <div className="w-full px-12">
          <div className={outerProgressClass}>
            <div className={innerProgressClass} />
          </div>
        </div>
        <div className={getMessageClass()}>{getText()}</div>
        <div className="w-full flex justify-center items-center gap-2">
          <div>View transaction</div>
          <TxLink chain={chain} txHash={txHash!}>
            <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3 text-white" />
          </TxLink>
        </div>
        <div className="w-full px-8">
          <Pill variant="primary">{isPending ? 'Please wait' : 'Confirmation complete'}</Pill>
        </div>
      </div>
    </Modal>
  )
}
