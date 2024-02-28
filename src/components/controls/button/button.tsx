import classNames from "classnames";

type ButtonVariant = "primary";
type ButtonLayout = "default" | "icon-only";

type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<{}>,
  "className" | "style"
>;

interface ButtonProps extends BaseButtonProps {
  variant: ButtonVariant;
  layout?: ButtonLayout;
  uppercase?: boolean;
}

export const Button = ({
  variant,
  layout = "default",
  uppercase = true,
  ...baseProps
}: ButtonProps) => {
  const layoutClasses: Record<ButtonLayout, string> = {
    default: "py-1 px-10 rounded-full",
    "icon-only": "p-2 rounded-full",
  };
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary-400",
  };
  const classes = classNames(
    layoutClasses[layout],
    variantClasses[variant],
    "font-semibold",
    uppercase && "uppercase"
  );
  return <button className={classes} {...baseProps} />;
};