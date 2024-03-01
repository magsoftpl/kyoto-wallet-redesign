import { AddressFormatter } from "@/components/formatters/AddressFormatter";
import { ConnectWalletStepsTracker } from "./ConnectWalletStepsTracker";

interface VerifyWalletProps {
  address: string;
}

export const VerifyWallet = ({ address }: VerifyWalletProps) => {
  return (
    <div>
      <ConnectWalletStepsTracker
        steps={[
          {
            status: "completed",
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
            status: "in-processing",
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
  );
};
