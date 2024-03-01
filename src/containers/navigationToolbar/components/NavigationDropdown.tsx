import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/simple-controls/button/button";
import { useState } from "react";

export const NavigationDropdown = ({
  linkItems,
  activeRoute,
}: {
  linkItems: { label: string; link: string }[];
  activeRoute: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const calcLinkClass = (isActive: boolean) => {
    return classNames(
      "w-full py-1 flex justify-center",
      isActive && "bg-primary-400"
    );
  };
  return (
    <div className="w-full max-w-96 flex flex-col items-center p-1 bg-white rounded-3xl uppercase font-semibold">
      <Button
        variant="transparent"
        layout="icon-only"
        fullWidth
        onClick={() => setExpanded(!expanded)}
      >
        {linkItems.find((item) => item.link === activeRoute)?.label}
      </Button>
      {expanded && (
        <div className="w-full pb-3">
          {linkItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={calcLinkClass(item.link === activeRoute)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
