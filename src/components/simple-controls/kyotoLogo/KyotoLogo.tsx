import { KyotoLogoSvg } from "./KyotoLogoSvg";

export const KyotoLogo = () => {
  return (
    <div className="flex items-center text-white">
      <div className="w-14">
        <KyotoLogoSvg />
      </div>
      <div className="uppercase leading-none">
        <div className="font-semibold">Kyoto</div>
        <div>Wallet</div>
      </div>
    </div>
  );
};
