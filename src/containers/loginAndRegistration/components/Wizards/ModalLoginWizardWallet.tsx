import { Modal } from "@/components/complex-controls/Modal";
import { ConnectWallet } from "./ConnectWallet";
import { VerifyWallet } from "./VerifyWallet";
import { useState } from "react";
import { Button } from "@/components/simple-controls/button/button";

interface ModalLoginWizardWalletProps {
  onClose(): void;
  onBack(): void;
}

export const ModalLoginWizardWallet = ({
  onClose,
  onBack,
}: ModalLoginWizardWalletProps) => {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<string | null>(null);
  const handleConnect = () => {
    if (step < 1) {
      setAddress("0xB3bF1Cc21cA5eeb7B21F985bF8b1aB6879eB7E9e");
      setStep(step + 1);
    }
  };
  const handleGoBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
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
      onBack={handleGoBack}
    >
      <div className="w-full md:min-w-[40rem] px-4 uppercase">
        <div className="w-full py-4">
          {step === 0 && <ConnectWallet />}
          {step === 1 && <VerifyWallet address={address!} />}
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Button variant="primary" onClick={handleConnect}>
            Connect
          </Button>
          <div className="text-inactive-600 min-h-[1.6em]">
            {step === 1 && "Skip and view profile"}
          </div>
        </div>
      </div>
    </Modal>
  );
};
