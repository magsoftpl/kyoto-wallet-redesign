import { Button } from "@/components/simple-controls/button/button";
import { KyotoLogo } from "@/components/simple-controls/kyotoLogo/KyotoLogo";
import Image from "next/image";

interface LoginTopProps {
  onLoginClick(): void;
}

export const LoginTop = ({ onLoginClick }: LoginTopProps) => {
  return (
    <div className="w-full h-[50rem] p-16 flex flex-col gap-2 bg-secondary-950">
      <div>
        <div className="w-full flex justify-between items-center">
          <KyotoLogo />
          <Button variant="primary" onClick={onLoginClick}>
            Login
          </Button>
        </div>
      </div>
      <div className="basis-full w-full grow flex">
        <div className="lg:w-1/2 max-w-[47rem] flex flex-col justify-around">
          <h1 className="text-white font-semibold text-5xl uppercase">
            A <span className="text-primary-400">safe</span> and{" "}
            <span className="text-primary-400">secure</span> wallet to earn,
            buy, store and stake KYOTO
          </h1>
          <div className="text-white text-xl uppercase">
            Join over 350k+ KYOTO holders earning 18.25% staking rewards per
            year
          </div>
          <div></div>
        </div>
        <div className="relative hidden lg:block h-full w-[28rem]">
          <div className="absolute bottom-[-12rem] w-full h-[50rem]">
            <div className="relative w-full h-full">
              <Image
                src="/images/mobile-wallet.png"
                alt="Mobile wallet"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
