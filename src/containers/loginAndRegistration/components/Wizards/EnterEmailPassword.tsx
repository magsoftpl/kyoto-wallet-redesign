import * as Yup from "yup";
import { Input } from "@/components/simple-controls/input/Input";
import { Button } from "@/components/simple-controls/button/Button";
import { Form, Formik, FormikProps } from "formik";
import { PasswordInput } from "@/components/simple-controls/passwordInput/PasswordInput";
import { useEffect, useRef } from "react";
import { getDisplayedError } from "@/utils/formik/getDisplayedError";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("It is not valid email address")
    .required("Email cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
});

interface EnterEmailPasswordProps {
  isLoginError: boolean;
  onSubmit(values: { email: string; password: string }): void;
  onForgotPassword(): void;
}

export const EnterEmailPassword = ({
  isLoginError,
  onSubmit,
  onForgotPassword,
}: EnterEmailPasswordProps) => {
  const formikRef = useRef<
    FormikProps<{
      email: string;
      password: string;
    }>
  >();

  useEffect(() => {
    if (isLoginError && formikRef.current) {
      formikRef.current.setFieldValue("password", "", false);
    }
  }, [isLoginError, formikRef]);

  return (
    <div className="w-full min-h-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full pb-1 flex justify-center">
          Log in to your KYOTO account to oversee your funds
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          innerRef={formikRef as any}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <div className="w-full flex flex-col gap-2">
                <Input
                  id="email"
                  value={values.email}
                  placeholder="EMAIL ADDRESS"
                  aria-label="Email address"
                  error={getDisplayedError({ errors, touched }, "email")}
                  autoFocus
                  onChange={handleChange}
                />
                <PasswordInput
                  id="password"
                  value={values.password}
                  placeholder="PASSWORD"
                  aria-label="Password"
                  error={getDisplayedError({ errors, touched }, "password")}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full p-12 flex flex-col items-center gap-2">
                <Button type="submit" variant="primary" fullWidth>
                  Login
                </Button>
              </div>
              <div className="w-full min-h-[1.6em] flex justify-center">
                {isLoginError && "Invalid email or password"}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-2 flex justify-end text-primary-400">
        <Button
          variant="transparent"
          layout="icon-only"
          onClick={onForgotPassword}
        >
          Forgot password
        </Button>
      </div>
    </div>
  );
};
