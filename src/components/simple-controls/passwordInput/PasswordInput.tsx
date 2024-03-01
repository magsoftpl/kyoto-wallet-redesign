import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

type PasswordInputProps = Omit<Parameters<typeof Input>[0], "type">;

export const PasswordInput = (props: PasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const button = (
    <Button
      variant="transparent"
      layout="icon-only"
      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
      onClick={() => setPasswordVisible(!isPasswordVisible)}
    >
      <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
    </Button>
  );
  return (
    <div className="relative">
      {!isPasswordVisible && <Input type="password" {...props} icon={button} />}
      {isPasswordVisible && (
        <Input type="text" autoComplete="off" {...props} icon={button} />
      )}
    </div>
  );
};
