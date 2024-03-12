import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { Pill } from '@/components/simple-controls/pill/Pill'
import { TxLink } from '../TxLink'
import { WalletChain } from '../useNetworkConfigs'

export interface TransactionBlockChainPendingProps {
  chain: WalletChain
  txHash: string
}

export const TransactionBlockChainPending = ({ chain, txHash }: TransactionBlockChainPendingProps) => {
  return (
    <div className="w-full h-full p-4 pb-8 flex flex-col gap-8 justify-center uppercase text-center">
      <div className="w-full px-12">
        <div className="h-16 p-2 rounded-full border-[6px] border-solid border-white">
          <div className="h-full p-1 w-1/3 rounded-l-full bg-white" />
        </div>
      </div>
      <div className="min-h-[3.2em] text-white">Your transaction will be completed in approximately 60s</div>
      <div className="w-full flex justify-center items-center gap-2">
        <div>View transaction</div>
        <TxLink chain={chain} txHash={txHash}>
          <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3 text-white" />
        </TxLink>
      </div>
      <div className="w-full px-8">
        <Pill variant="primary">Please wait</Pill>
      </div>
    </div>
  )
}

export const transactionBlockChainPendingTitle = 'Waiting for confirmation'
