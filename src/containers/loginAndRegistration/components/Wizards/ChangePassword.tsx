import * as Yup from "yup";
import { Button } from "@/components/simple-controls/button/button";
import { Form, Formik } from "formik";
import { getDisplayedError } from "@/utils/formik/getDisplayedError";
import { PasswordInput } from "@/components/simple-controls/passwordInput/PasswordInput";
import { PasswordResetStatus } from "../../store/loginData.slice";

const validationSchema = Yup.object({
  showOldPassword: Yup.boolean(),
  oldPassword: Yup.string().when("showOldPassword", {
    is: true,
    then: () => Yup.string().required("Old password cannot be empty"),
  }),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password cannot be empty"),
  passwordConfirm: Yup.string()
    .min(6, "Password confirmation is too short")
    .required("Password confirmation cannot be empty")
    .oneOf(
      [Yup.ref("password"), ""],
      "Password and confirmation are not matching"
    ),
});

interface ChangePasswordProps {
  showOldPassword: boolean;
  showSwitchToLogin: boolean;
  passwordResetStatus: PasswordResetStatus | null;
  onLogin?(): void;
  onPasswordReset(password: string): void;
}

export const ChangePassword = ({
  showOldPassword,
  showSwitchToLogin,
  passwordResetStatus,
  onLogin,
  onPasswordReset,
}: ChangePasswordProps) => {
  const handleSubmit = ({
    password,
  }: {
    oldPassword: string;
    password: string;
    passwordConfirm: string;
  }) => {
    onPasswordReset(password);
  };

  return (
    <div className="w-full min-h-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full p-2 flex justify-center">
          Enter your new password for access to KYOTO Wallet
        </div>
        <Formik
          initialValues={{
            showOldPassword,
            oldPassword: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <div className="w-full flex flex-col gap-2">
                {showOldPassword && (
                  <PasswordInput
                    id="oldPassword"
                    value={values.oldPassword}
                    placeholder="OLD PASSWORD"
                    aria-label="Old password"
                    error={getDisplayedError(
                      { errors, touched },
                      "oldPassword"
                    )}
                    autoFocus={showOldPassword}
                    onChange={handleChange}
                  />
                )}
                <PasswordInput
                  id="password"
                  value={values.password}
                  placeholder="PASSWORD"
                  aria-label="Password"
                  error={getDisplayedError({ errors, touched }, "password")}
                  autoFocus={!showOldPassword}
                  onChange={handleChange}
                />
                <PasswordInput
                  id="passwordConfirm"
                  value={values.passwordConfirm}
                  placeholder="CONFIRM PASSWORD"
                  aria-label="Confirm password"
                  error={getDisplayedError(
                    { errors, touched },
                    "passwordConfirm"
                  )}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full pt-16 pb-8 flex flex-col items-center gap-2">
                <Button type="submit" variant="primary" fullWidth>
                  Reset password
                </Button>
              </div>
              <div className="w-full min-h-[1.6em] flex justify-center">
                {passwordResetStatus === "success" && "Password reset"}
                {passwordResetStatus === "error" && "Invalid or expired link"}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showSwitchToLogin && passwordResetStatus === "success" && (
        <div className="w-full p-2 flex justify-end text-primary-400">
          <Button variant="transparent" layout="icon-only" onClick={onLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};
