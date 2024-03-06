import { Modal } from '@/components/complex-controls/Modal'
import { ConnectWallet } from './ConnectWallet'
import { VerifyWallet } from './VerifyWallet'
import { useEffect, useState } from 'react'
import { Button } from '@/components/simple-controls/button/Button'
import { WalletProvider } from '../../dataSources/loginData.slice'
import { useConnect, useAccount, useSignMessage, useChainId } from 'wagmi'
import { useNetworkConfig } from '@/containers/web3/useNetworkConfigs'

interface ModalLoginWizardWalletProps {
  provider: WalletProvider
  messageToSign: string | null
  onClose(): void
  onBack(): void
  onWalletAddressChanged(address: string | undefined): void
  onWalletConnected(address: string): void
  onLoginWithWallet(address: string, data: string): void
}

export const ModalLoginWizardWallet = ({
  provider,
  messageToSign,
  onClose,
  onBack,
  onWalletAddressChanged,
  onWalletConnected,
  onLoginWithWallet,
}: ModalLoginWizardWalletProps) => {
  const { connectors, connect, isPending: isConnectionPending } = useConnect()
  const { address, connector, isConnected: isAccountConnected } = useAccount()
  const { signMessage, isPending: isSigningPending, isSuccess: isSigningSuccess, data } = useSignMessage()

  const [isConnectActive, setIsConnectActive] = useState(false)
  const chainId = useChainId()
  const { kyoto } = useNetworkConfig()

  const connectorId = connectorMapping[provider]
  const isConnected = isAccountConnected && connectorId === connector?.id
  const isCorrectNetwork = !isConnected || chainId === kyoto.chainId

  useEffect(() => {
    const checkConnectivity = async () => {
      const connector = connectors.find((c) => c.id === connectorId)
      if (!connector) {
        return
      }
      const prov = await connector.getProvider()
      setIsConnectActive(!!prov)
    }
    checkConnectivity()
  }, [connectorId, connectors, provider])

  useEffect(() => {
    onWalletAddressChanged(address)
  }, [address, onWalletAddressChanged])

  useEffect(() => {
    if (!!messageToSign) {
      signMessage({ message: messageToSign })
    }
  }, [messageToSign, signMessage])

  useEffect(() => {
    if (isSigningSuccess && address && data) {
      onLoginWithWallet(address, data)
    }
  }, [address, data, isSigningSuccess, onLoginWithWallet])

  const handleConnect = () => {
    if (!isConnected) {
      const connector = connectors.find((c) => c.id === connectorId)
      if (!connector) {
        return
      }
      connect({ connector, chainId: kyoto.chainId })
      return
    }
    if (isConnected && address) {
      onWalletConnected(address)
    }
  }

  return (
    <Modal
      theme="light"
      hasBackButton
      show
      title={
        <div className="uppercase">
          Follow the steps
          <br />
          to connect your wallet
        </div>
      }
      onClose={onClose}
      onBack={onBack}
    >
      <div className="w-full md:min-w-[40rem] px-4 uppercase">
        <div className="w-full py-4">
          {!isConnected && <ConnectWallet isProcessing={isConnectionPending} />}
          {isConnected && <VerifyWallet address={address!} isProcessing={isSigningPending} />}
        </div>
        {!isCorrectNetwork && 'Invalid network'}
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            variant="primary"
            disabled={!isConnectActive || isConnectionPending || isSigningPending || !isCorrectNetwork}
            onClick={handleConnect}
          >
            {!isConnected ? 'Connect' : 'Verify'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const connectorMapping: Record<WalletProvider, string> = {
  metamask: 'metaMask',
  coinbase: 'coinbaseWalletSDK',
  brave: 'metaMask',
}
