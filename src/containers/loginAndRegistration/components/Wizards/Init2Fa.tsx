import * as Yup from 'yup'
import { Button } from '@/components/simple-controls/button/Button'
import QRCode from 'react-qr-code'
import { Form, Formik } from 'formik'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'
import { Input } from '@/components/simple-controls/input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useClipboard } from '@/components/hooks/useClipboard'
import { appDescription } from '@/utils/constants'
import { OperationError } from './OperationError'

interface Init2FaProps {
  twoFaUrl: string
  errorCode: string | null
  on2FaMethodSelect(email: string | null): void
}

const validationSchema = Yup.object({
  email: Yup.string().email('It is not valid email address'),
})

export const Init2Fa = ({ twoFaUrl, errorCode, on2FaMethodSelect }: Init2FaProps) => {
  const copy = useClipboard()

  const handleSubmit = ({ email }: { email: string }) => {
    on2FaMethodSelect(email || null)
  }

  return (
    <div className="w-full min-h-[25rem] max-w-[25rem] px-4 flex flex-col justify-between uppercase">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, handleChange }) => (
          <Form>
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full pb-1 flex justify-center text-center">Set up two-factor authentication</div>
              <div className="w-full py-1 flex justify-between items-center">
                <div className="w-5 h-5 grow-0 shrink-0 flex justify-center items-center bg-white  text-black rounded-full">
                  1
                </div>
                <div className="basis-full h-px bg-white" />
                <div className="w-5 h-5 grow-0 shrink-0 flex justify-center items-center bg-white  text-black rounded-full">
                  2
                </div>
                <div className="basis-full h-px bg-white" />
                <div className="w-5 h-5 grow-0 shrink-0 flex justify-center items-center bg-white  text-black rounded-full">
                  3
                </div>
              </div>

              <div className="text-center text-sm">
                Use your authentication app
                <br />
                (such as Google Authenticator, Microsoft Authenticator, Twilio Authy) to scan this QR Code
              </div>
            </div>
            <div className="w-full py-2 flex justify-around">
              <QRCode size={128} className="m-w-full m-h-full" value={twoFaUrl} viewBox={`0 0 128 128`} />
              <div>
                <div className="pt-4 pb-2">
                  <div className="text-primary-400">Service name</div>
                  <div className="leading-none text-xs">{appDescription.title}</div>
                </div>
                <div className="pt-2 pb-4">
                  <div className="flex items-center text-primary-400">
                    <div>Key</div>
                    <button
                      className="px-2 flex items-center justify-center"
                      aria-label="Copy"
                      onClick={() => copy(twoFaUrl)}
                    >
                      <FontAwesomeIcon className="w-3 h-3 text-white" icon={faCopy} />
                    </button>
                  </div>
                  <div className="leading-none text-xs">XXXXXXX</div>
                </div>
              </div>
            </div>
            <div className="relative w-full px-4 flex justify-center">
              <div className="absolute top-1/2 w-full h-px bg-white" />
              <div className="z-10 p-2 bg-secondary-950">or</div>
            </div>
            <div className="py-2 text-center text-sm">
              Add these account details manually into your two-factor authenticator app
            </div>
            <Input
              id="email"
              value={values.email}
              placeholder="EMAIL ADDRESS"
              aria-label="Email address"
              error={getDisplayedError({ errors, touched }, 'email')}
              onChange={handleChange}
            />
            <div className="w-full p-2 text-center">
              <OperationError code={errorCode} />
            </div>
            <div className="w-full py-2 px-4 flex flex-col items-center gap-2">
              <Button type="submit" variant="primary" fullWidth>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
