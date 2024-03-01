import { KyotoLogoSvg } from "@/components/simple-controls/kyotoLogo/KyotoLogoSvg";

export const WalletTile = () => {
  return (
    <div className="w-full max-w-[35rem] aspect-[7/4]">
      <div className="w-full h-full p-6 rounded-2xl bg-secondary-900 uppercase">
        <div className="w-full flex justify-between">
          <div className="font-semibold">Your Wallet</div>
          <div className="w-20 h-20">
            <KyotoLogoSvg />
          </div>
        </div>
      </div>
    </div>
  );
};
