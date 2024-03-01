import React, { ReactNode } from "react";
import { Button } from "../simple-controls/button/Button";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export type ModalTheme = "light" | "dark";

export interface ModalDialogWrapperProps {
  children: ReactNode;
  title: ReactNode;
  theme?: ModalTheme;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export const ModalDialogWrapper: React.FC<ModalDialogWrapperProps> = ({
  children,
  title,
  theme = "dark",
  hasBackButton,
  hasCloseButton,
  onBackClick,
  onCloseClick,
}) => {
  const showClose = hasCloseButton || hasCloseButton === undefined;
  const wrapperClass = classNames(
    "relative w-full md:min-w-[25rem] md:w-auto my-auto flex flex-col items-center rounded-lg",
    theme === "dark"
      ? "bg-secondary-950 text-white"
      : "bg-white text-secondary-950"
  );

  return (
    <div className={wrapperClass}>
      <section className="flex flex-row justify-between px-4 py-3 w-full">
        {hasBackButton ? (
          <Button
            type="button"
            layout="icon-only"
            variant="transparent"
            data-te-modal-dismiss
            aria-label="Back"
            onClick={onBackClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        ) : (
          <div className="w-6 h-6" />
        )}
        <div className="pt-2 text-base font-semibold text-center uppercase">
          {title}
        </div>
        <div>
          {showClose && (
            <Button
              type="button"
              layout="icon-only"
              variant="transparent"
              data-te-modal-dismiss
              aria-label="Close"
              onClick={onCloseClick}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
          )}
        </div>
      </section>
      <section className="relative w-full p-2 flex flex-col items-center justify-center">
        {children}
      </section>
    </div>
  );
};
