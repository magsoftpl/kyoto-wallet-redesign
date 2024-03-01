import classNames from "classnames";
import { Fragment, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@/components/simple-controls/loader/Loader";

type LoginWizardStepStatus =
  | "completed"
  | "current"
  | "in-processing"
  | "pending";

interface LoginWizardStep {
  status: LoginWizardStepStatus;
  description: ReactNode;
}

interface ConnectWalletStepsTrackerProps {
  steps: LoginWizardStep[];
}

export const ConnectWalletStepsTracker = ({
  steps,
}: ConnectWalletStepsTrackerProps) => {
  const calcStepIconClass = (status: LoginWizardStepStatus) => {
    return classNames(
      "w-20 h-20 shrink-0 flex justify-center items-center rounded-full text-white font-semibold text-4xl",
      status === "pending" ? "bg-inactive-300" : "bg-secondary-950"
    );
  };
  const calcStepBaseStepDescClass = (status: LoginWizardStepStatus) => {
    return classNames(
      status === "pending" ? "text-inactive-300" : "text-secondary-950"
    );
  };
  const getStepIndexContent = (
    stepIndex: number,
    status: LoginWizardStepStatus
  ) => {
    if (status === "completed") {
      return <FontAwesomeIcon icon={faCheck} />;
    }
    if (status === "in-processing") {
      return <Loader theme="light" />;
    }
    return stepIndex + 1;
  };
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div className="flex gap-4">
            <div className={calcStepIconClass(step.status)}>
              {getStepIndexContent(index, step.status)}
            </div>
            <div className={calcStepBaseStepDescClass(step.status)}>
              {step.description}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div className="w-20 p-1 flex justify-center">
              <div className="w-[2px] h-4 bg-inactive-300"></div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
