import * as Yup from 'yup'
import { Input } from '@/components/simple-controls/input/Input'
import { Button } from '@/components/simple-controls/button/Button'
import { Form, Formik } from 'formik'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'
import { OperationError } from './OperationError'

const validationSchema = Yup.object({
  code: Yup.string().required('Code cannot be empty'),
})

interface Enter2FaCodeProps {
  errorCode: string | null
  onSubmit(payload: { code: string }): void
}

export const Enter2FaCode = ({ errorCode, onSubmit }: Enter2FaCodeProps) => {
  return (
    <div className="w-full min-h-[25rem] max-w-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full pb-2 text-center">
          <div>
            Open the email or two-factor authentication app on your device to receive a unique time-based one-time
            verification code
          </div>
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
                  placeholder="AUTHENTICATION CODE"
                  aria-label="Authentication code"
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
              <div className="w-full p-2 text-center">
                <OperationError code={errorCode} />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full p-2 flex flex-col items-center gap-2 text-center"></div>
    </div>
  )
}
