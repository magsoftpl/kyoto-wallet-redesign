import * as Yup from 'yup'
import { Input } from '@/components/simple-controls/input/Input'
import { Button } from '@/components/simple-controls/button/Button'
import { Form, Formik } from 'formik'
import { PasswordInput } from '@/components/simple-controls/passwordInput/PasswordInput'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'
import { CheckBox } from '@/components/simple-controls/checkbox/Checkbox'
import { FlagsSelect } from '@/components/simple-controls/flagsSelect/FlagsSelect'
import { OperationError } from './OperationError'

const validationSchema = Yup.object({
  country: Yup.string().required('Country cannot be empty'),
  email: Yup.string().email('It is not valid email address').required('Email cannot be empty'),
  password: Yup.string().min(6, 'Password is too short').required('Password cannot be empty'),
  passwordConfirm: Yup.string()
    .min(6, 'Password confirmation is too short')
    .required('Password confirmation cannot be empty')
    .oneOf([Yup.ref('password'), ''], 'Password and confirmation are not matching'),
  agreeToPolicy: Yup.bool().equals([true], 'Privacy Policy must be accepted'),
})

interface RegisterInitialDataProps {
  data: { country: string; email: string; agreeToPolicy: boolean }
  errorCode: string
  onSubmit(payload: { email: string; country: string; password: string; agreeToPolicy: boolean }): void
  onLogin(): void
}

export const RegisterInitialData = ({ data, errorCode, onSubmit, onLogin }: RegisterInitialDataProps) => {
  return (
    <div className="w-full min-h-[25rem] max-w-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full pb-1 flex justify-center text-center">Create an account to manage your KYOTO funds</div>
        <Formik
          initialValues={{
            country: data.country,
            email: data.email,
            password: '',
            passwordConfirm: '',
            agreeToPolicy: data.agreeToPolicy,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <div className="w-full flex flex-col gap-1">
                <FlagsSelect
                  name="country"
                  value={values.country}
                  error={getDisplayedError({ errors, touched }, 'country')}
                  onChange={handleChange}
                />
                <Input
                  id="email"
                  value={values.email}
                  placeholder="EMAIL ADDRESS"
                  aria-label="Email address"
                  error={getDisplayedError({ errors, touched }, 'email')}
                  onChange={handleChange}
                />
                <PasswordInput
                  id="password"
                  value={values.password}
                  placeholder="PASSWORD"
                  aria-label="Password"
                  error={getDisplayedError({ errors, touched }, 'password')}
                  onChange={handleChange}
                />
                <PasswordInput
                  id="passwordConfirm"
                  value={values.passwordConfirm}
                  placeholder="CONFIRM PASSWORD"
                  aria-label="passwordConfirm"
                  error={getDisplayedError({ errors, touched }, 'passwordConfirm')}
                  onChange={handleChange}
                />
                <div className="flex gap-2">
                  <CheckBox
                    label={
                      <>
                        I agree to the&nbsp;
                        <a href="#" target="_blank" className="text-primary-400 text-sm">
                          T&C, Privacy Policy
                        </a>
                      </>
                    }
                    name="agreeToPolicy"
                    isChecked={values.agreeToPolicy}
                    error={getDisplayedError({ errors, touched }, 'agreeToPolicy')}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full p-2 text-center">
                <OperationError code={errorCode} />
              </div>
              <div className="w-full p-8 flex flex-col items-center gap-2">
                <Button type="submit" variant="primary" fullWidth>
                  Create your account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-2 flex justify-center">
        <div className="flex items-center gap-2">
          Already have an account?
          <Button variant="transparent" layout="icon-only" onClick={onLogin}>
            <span className="text-primary-400">Login</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
