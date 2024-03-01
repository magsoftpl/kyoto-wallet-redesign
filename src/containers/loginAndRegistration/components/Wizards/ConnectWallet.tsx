import { ConnectWalletStepsTracker } from './ConnectWalletStepsTracker'

interface ConnectWalletProps {
  isProcessing: boolean
}

export const ConnectWallet = ({ isProcessing }: ConnectWalletProps) => {
  return (
    <div>
      <ConnectWalletStepsTracker
        steps={[
          {
            status: isProcessing ? 'in-processing' : 'current',
            description: (
              <div>
                <div className="font-semibold">Connect Wallet</div>
                <div>Tell KYOTOWALLET which address you want to use</div>
              </div>
            ),
          },
          {
            status: 'pending',
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
