import { FC, PropsWithChildren, ReactElement } from "react";

export const UnauthorizedLayout: FC<
  PropsWithChildren & {
    footer: ReactElement;
  }
> = ({ children, footer }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="basis-full grow">{children}</main>
      <footer className="w-full">{footer}</footer>
      <div id="modal-root" />
    </div>
  );
};
