import { FC, PropsWithChildren, ReactElement } from "react";

export const AuthorizedLayout: FC<
  PropsWithChildren & {
    header: ReactElement;
    toolbar: ReactElement;
    footer: ReactElement;
  }
> = ({ children, header, toolbar, footer }) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <header className="w-full">{header}</header>
      <nav className="w-full sticky top-0">{toolbar}</nav>
      <main className="basis-full grow">{children}</main>
      <footer className="w-full">{footer}</footer>
      <div id="modal-root" />
    </div>
  );
};
