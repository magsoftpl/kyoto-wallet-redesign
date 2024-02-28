"use client";

import { usePathname } from "next/navigation";
import { useLinkProvider } from "../navigation/useNavigator";
import { NavigationLink } from "./components/NavigationLink";

export const NavigationToolbar = () => {
  const links = useLinkProvider();
  const pathname = usePathname();
  return (
    <div className="w-full py-3 flex justify-center bg-secondary-950 ">
      <div className="flex p-1 bg-white rounded-full uppercase">
        <NavigationLink
          title="Dashboard"
          href={links("dashboard")}
          activeRoute={pathname}
        />
        <NavigationLink
          title="Staking"
          href={links("staking")}
          activeRoute={pathname}
        />
        <NavigationLink
          title="History"
          href={links("history")}
          activeRoute={pathname}
        />
        <NavigationLink
          title="Settings"
          href={links("settings")}
          activeRoute={pathname}
        />
      </div>
    </div>
  );
};
