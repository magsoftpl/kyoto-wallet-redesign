import Image from 'next/image'
import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/simple-controls/button/Button'

interface PendingMigrationProps {
  amount: bigint
  isConnected: boolean
  onSignTransactionClick(): void
}

export const PendingMigration = ({ amount, isConnected, onSignTransactionClick }: PendingMigrationProps) => {
  return (
    <div className="w-full flex justify-center uppercase">
      <div className="w-full max-w-[28rem] p-4 flex flex-col justify-between gap-4 bg-inactive-100 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="flex font-semibold gap-2 items-center">
              <div>
                <Image src="/icons/bsc.png" width={16} height={16} alt="Bsc logo" />
              </div>
              <div>BSCKYOTO</div>
            </div>
            <div className="text-sm text-inactive-600">Migration tax 9.1%</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold">
              <EthValueFormatter valueWei={amount} />
            </div>
            <div className="text-sm text-inactive-600">Total balance</div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-8 h-8 flex justify-center items-center bg-secondary-950 text-white rounded-lg">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="flex font-semibold gap-2 items-center">
              <div>
                <Image src="/icons/kyotoNetwork.svg" width={20} height={20} alt="Bsc logo" />
              </div>
              <div>KYOTO</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold">
              <EthValueFormatter valueWei={amount} />
            </div>
          </div>
        </div>
        <div className="w-full py-4 flex justify-center">
          {isConnected && (
            <Button variant="primary" onClick={onSignTransactionClick}>
              Sign transaction
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
