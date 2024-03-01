import { ConnectWalletStepsTracker } from "./ConnectWalletStepsTracker";

export const ConnectWallet = () => {
  return (
    <div>
      <ConnectWalletStepsTracker
        steps={[
          {
            status: "current",
            description: (
              <div>
                <div className="font-semibold">Connect Wallet</div>
                <div>Tell KYOTOWALLET which address you want to use</div>
              </div>
            ),
          },
          {
            status: "pending",
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
