import classNames from "classnames";

type ButtonVariant = "primary" | "transparent";
type ButtonLayout = "default" | "icon-only";

type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<{}>,
  "className" | "style"
>;

interface ButtonProps extends BaseButtonProps {
  variant: ButtonVariant;
  layout?: ButtonLayout;
  uppercase?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant,
  layout = "default",
  uppercase = true,
  fullWidth,
  ...baseProps
}: ButtonProps) => {
  const layoutClasses: Record<ButtonLayout, string> = {
    default: "py-2 px-10 rounded-full",
    "icon-only": "p-2 rounded-full",
  };
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary-400 text-secondary-950",
    transparent: "",
  };
  const classes = classNames(
    layoutClasses[layout],
    variantClasses[variant],
    "font-semibold",
    uppercase && "uppercase",
    fullWidth && "w-full"
  );
  return <button className={classes} {...baseProps} />;
};
