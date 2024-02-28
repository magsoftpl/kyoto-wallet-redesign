import classNames from "classnames";
import Link from "next/link";

interface NavigationLinkProps {
  title: string;
  href: string;
  activeRoute: string;
}

export const NavigationLink = ({
  title,
  href,
  activeRoute,
}: NavigationLinkProps) => {
  const isActive = activeRoute === href;
  const classes = classNames(
    "w-52 flex justify-center font-semibold",
    isActive && "bg-primary-400 rounded-full"
  );
  return (
    <Link href={href} className={classes}>
      {title}
    </Link>
  );
};
