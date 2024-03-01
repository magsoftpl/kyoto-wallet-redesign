import * as Yup from "yup";
import { Input } from "@/components/simple-controls/input/Input";
import { Button } from "@/components/simple-controls/button/Button";
import { Form, Formik } from "formik";
import { useState } from "react";
import { getDisplayedError } from "@/utils/formik/getDisplayedError";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("It is not valid email address")
    .required("Email cannot be empty"),
});

interface ForgotPasswordProps {
  isResetPasswordEmailSent: boolean;
  onSubmit(email: string): void;
  onLogin(): void;
}

export const ForgotPassword = ({
  isResetPasswordEmailSent,
  onSubmit,
  onLogin,
}: ForgotPasswordProps) => {
  const [lastSentAddress, setLastSentAddress] = useState("");

  const handleSubmit = ({ email }: { email: string }) => {
    setLastSentAddress(email);
    onSubmit(email);
  };

  return (
    <div className="w-full min-h-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full flex justify-center">
          Enter your email address to recieve a lost password link
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              </div>
              <div className="w-full p-16 flex flex-col items-center gap-2">
                <Button type="submit" variant="primary" fullWidth>
                  Request
                </Button>
              </div>
              <div className="w-full min-h-[6rem] flex flex-col items-center">
                {isResetPasswordEmailSent && (
                  <>
                    <div>Link has been sent to:</div>
                    <div> {lastSentAddress} </div>
                    <div className="w-full max-w-[35rem] text-center">
                      if you have not received this email please check the
                      address and retry
                    </div>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-2 flex justify-end text-primary-400">
        <Button variant="transparent" layout="icon-only" onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};
