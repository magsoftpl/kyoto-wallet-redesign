"use client";

import { usePathname } from "next/navigation";
import { useLinkProvider } from "../navigation/useNavigator";
import { NavigationLink } from "./components/NavigationLink";
import { NavigationDropdown } from "./components/NavigationDropdown";
import { useMemo } from "react";

export const NavigationToolbar = () => {
  const links = useLinkProvider();
  const pathname = usePathname();
  const linkItems = useMemo(
    () => [
      {
        label: "Dashboard",
        link: links("dashboard"),
      },
      {
        label: "Staking",
        link: links("staking"),
      },
      {
        label: "History",
        link: links("history"),
      },
      {
        label: "Settings",
        link: links("settings"),
      },
    ],
    [links]
  );
  return (
    <div className="w-full py-3 flex justify-center bg-secondary-950 ">
      <div className="flex lg:hidden w-full justify-center">
        <NavigationDropdown linkItems={linkItems} activeRoute={pathname} />
      </div>
      <div className="hidden lg:flex p-1 bg-white rounded-full uppercase">
        {linkItems.map((linkItem) => (
          <NavigationLink
            key={linkItem.link}
            title={linkItem.label}
            href={linkItem.link}
            activeRoute={pathname}
          />
        ))}
      </div>
    </div>
  );
};
