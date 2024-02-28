"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { KyotoLogo } from "@/components/controls/kyotoLogo/KyotoLogo";
import { WalletTile } from "./components/WalletTile";
import { Button } from "@/components/controls/button/button";
import { useNavigator } from "../navigation/useNavigator";
import { useSession } from "../authentication/useSession";

export const UserInfoHeader = () => {
  const navigator = useNavigator();
  const { terminateSession } = useSession();

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
      <div className="basis-8/12 flex justify-center md:order-1">
        <WalletTile />
      </div>
    </div>
  );
};
