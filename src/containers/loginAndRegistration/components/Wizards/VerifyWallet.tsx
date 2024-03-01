import { AddressFormatter } from '@/components/formatters/AddressFormatter'
import { ConnectWalletStepsTracker } from './ConnectWalletStepsTracker'

interface VerifyWalletProps {
  address: string
  isProcessing: boolean
}

export const VerifyWallet = ({ address, isProcessing }: VerifyWalletProps) => {
  return (
    <div>
      <ConnectWalletStepsTracker
        steps={[
          {
            status: 'completed',
            description: (
              <div>
                <div className="font-semibold">Connected</div>
                <div>
                  <AddressFormatter startChars={6} endChars={6}>
                    {address}
                  </AddressFormatter>
                </div>
              </div>
            ),
          },
          {
            status: isProcessing ? 'in-processing' : 'current',
            description: (
              <div>
                <div className="font-semibold">Verify address</div>
                <div>Prove you are the holder of the address</div>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
