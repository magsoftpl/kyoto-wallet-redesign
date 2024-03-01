import classNames from "classnames";
import { ReactElement } from "react";

type PillVariant = "primary";

interface PillProps {
  variant: PillVariant;
  children: ReactElement;
  uppercase?: boolean;
}

export const Pill = ({ variant, children, uppercase }: PillProps) => {
  const variantClasses: Record<PillVariant, string> = {
    primary: "bg-primary-400 text-secondary-950",
  };
  const classes = classNames(
    variantClasses[variant],
    "py-1 px-10 flex items-center rounded-full font-semibold",
    uppercase && "uppercase"
  );
  return <div className={classes}>{children}</div>;
};
