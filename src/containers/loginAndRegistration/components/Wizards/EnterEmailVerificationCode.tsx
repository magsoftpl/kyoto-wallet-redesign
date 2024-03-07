import * as Yup from 'yup'
import { Input } from '@/components/simple-controls/input/Input'
import { Button } from '@/components/simple-controls/button/Button'
import { Form, Formik } from 'formik'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'
import { OperationError } from './OperationError'

const validationSchema = Yup.object({
  code: Yup.string().required('Code cannot be empty'),
})

interface EnterEmailVerificationCodeProps {
  email: string
  errorCode: string | null
  onSubmit(payload: { code: string }): void
  onResend(): void
}

export const EnterEmailVerificationCode = ({
  email,
  errorCode,
  onSubmit,
  onResend,
}: EnterEmailVerificationCodeProps) => {
  return (
    <div className="w-full min-h-[25rem] max-w-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full pb-2 text-center">
          <div>Enter the verification code we sent to</div>
          <div className="truncate text-ellipsis">{email}</div>
        </div>
        <Formik
          initialValues={{
            code: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <div className="w-full flex flex-col gap-1">
                <Input
                  id="code"
                  value={values.code}
                  placeholder="VERIFICATION CODE"
                  aria-label="Verification code"
                  error={getDisplayedError({ errors, touched }, 'code')}
                  autoFocus
                  onChange={handleChange}
                />
              </div>
              <div className="w-full p-12 flex flex-col items-center gap-2">
                <Button type="submit" variant="primary" fullWidth>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-2 flex flex-col items-center gap-2 text-center">
        <div>Didn&apos;t receive the verification code? Please check your spam folder</div>
        <Button variant="transparent" layout="icon-only" onClick={onResend}>
          <span className="text-primary-400">Resend code</span>
        </Button>
      </div>
      <div className="w-full p-2 text-center">
        <OperationError code={errorCode} />
      </div>
    </div>
  )
}
