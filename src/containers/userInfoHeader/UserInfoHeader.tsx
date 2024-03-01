"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { KyotoLogo } from "@/components/simple-controls/kyotoLogo/KyotoLogo";
import { WalletTile } from "./components/WalletTile";
import { Button } from "@/components/simple-controls/button/Button";
import { useNavigator } from "../navigation/useNavigator";
import { useSession } from "../authentication/useSession";
import { useCurrentWalletInfo } from "../web3/useCurrentWalletInfo";
import { Pill } from "@/components/simple-controls/pill/Pill";
import { AddressFormatter } from "@/components/formatters/AddressFormatter";

export const UserInfoHeader = () => {
  const navigator = useNavigator();
  const { terminateSession } = useSession();
  const { address } = useCurrentWalletInfo();

  const handleLogoutClick = () => {
    terminateSession(() => navigator("login"));
  };
  return (
    <div className="w-full p-4 flex flex-col md:flex-row justify-between bg-secondary-950 text-white">
      <div className="basis-2/12 flex justify-center md:justify-start gap-2">
        <div>
          <KyotoLogo />
        </div>
      </div>
      <div className="basis-2/12 md:order-2 py-4 flex justify-center md:justify-end">
        <div>
          <div className="flex gap-2">
            {address && (
              <Pill variant="primary">
                <AddressFormatter startChars={10} endChars={0}>
                  {address}
                </AddressFormatter>
              </Pill>
            )}
            <Button
              variant="primary"
              layout="icon-only"
              onClick={handleLogoutClick}
              aria-label="Logout"
            >
              <div className="w-4 h-4 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="w-4 h-4 text-primary-950"
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="basis-8/12 flex justify-center md:order-1">
        <WalletTile address={address} />
      </div>
    </div>
  );
};
