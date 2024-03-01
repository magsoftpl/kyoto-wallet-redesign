import { Modal } from "@/components/complex-controls/Modal";
import { ConnectWallet } from "./ConnectWallet";
import { VerifyWallet } from "./VerifyWallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/simple-controls/button/Button";
import { WalletProvider } from "../../store/loginData.slice";
import { useConnect, useAccount, useSignMessage, useChainId } from "wagmi";
import { useNetworkConfig } from "@/containers/web3/useNetworkConfigs";

interface ModalLoginWizardWalletProps {
  provider: WalletProvider;
  onClose(): void;
  onBack(): void;
  onLoginWithWallet(): void;
}

export const ModalLoginWizardWallet = ({
  provider,
  onClose,
  onBack,
  onLoginWithWallet,
}: ModalLoginWizardWalletProps) => {
  const { connectors, connect, isPending: isConnectionPending } = useConnect();
  const { address, connector, isConnected: isAccountConnected } = useAccount();
  const {
    signMessage,
    isPending: isSigningPending,
    isSuccess: isSigningSuccess,
  } = useSignMessage();

  const [isConnectActive, setIsConnectActive] = useState(false);
  const chainId = useChainId();
  const { kyoto } = useNetworkConfig();

  const connectorId = connectorMapping[provider];
  const isConnected = isAccountConnected && connectorId === connector?.id;
  const isCorrectNetwork = !isConnected || chainId === kyoto.chainId;

  useEffect(() => {
    const checkConnectivity = async () => {
      const connector = connectors.find((c) => c.id === connectorId);
      if (!connector) {
        return;
      }
      const prov = await connector.getProvider();
      setIsConnectActive(!!prov);
    };
    checkConnectivity();
  }, [connectorId, connectors, provider]);

  useEffect(() => {
    if (isSigningSuccess) {
      onLoginWithWallet(); //TODO: verify signature
    }
  }, [isSigningSuccess, onLoginWithWallet]);

  const handleConnect = () => {
    if (!isConnected) {
      const connector = connectors.find((c) => c.id === connectorId);
      if (!connector) {
        return;
      }
      connect({ connector, chainId: kyoto.chainId });
      return;
    }
    if (isConnected) {
      const message = `Kyoto Wallet Authentication \n\nWallet Address: ${address}\n\nIssued at:\n${new Date().toLocaleString()}`;
      signMessage({ message });
    }
  };

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
          {isConnected && (
            <VerifyWallet address={address!} isProcessing={isSigningPending} />
          )}
        </div>
        {!isCorrectNetwork && "Invalid network"}
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            variant="primary"
            disabled={
              !isConnectActive ||
              isConnectionPending ||
              isSigningPending ||
              !isCorrectNetwork
            }
            onClick={handleConnect}
          >
            Connect
          </Button>
          <div className="text-inactive-600 min-h-[1.6em]">
            {isConnected && "Skip and view profile"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const connectorMapping: Record<WalletProvider, string> = {
  metamask: "metaMask",
  coinbase: "coinbaseWalletSDK",
  brave: "metaMask",
};
