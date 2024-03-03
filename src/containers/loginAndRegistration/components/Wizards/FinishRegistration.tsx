import * as Yup from 'yup'
import { Input } from '@/components/simple-controls/input/Input'
import { Button } from '@/components/simple-controls/button/Button'
import { Form, Formik } from 'formik'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'
import { FlagsSelect } from '@/components/simple-controls/flagsSelect/FlagsSelect'
import { OperationError } from './OperationError'

const validationSchema = Yup.object({
  firstName: Yup.string(),
  lastName: Yup.string(),
  dateOfBirth: Yup.string(),
  residencyCountry: Yup.string(),
  phone: Yup.string(),
})

interface FinishRegistrationProps {
  data: {
    firstName: string
    lastName: string
    dateOfBirth: string
    residencyCountry: string
    phone: string
  }
  errorCode: string
  onSubmit(payload: {
    firstName: string
    lastName: string
    dateOfBirth: string
    residencyCountry: string
    phone: string
  }): void
}

export const FinishRegistration = ({ data, errorCode, onSubmit }: FinishRegistrationProps) => {
  return (
    <div className="w-full min-h-[25rem] max-w-[25rem] px-4 flex flex-col justify-between uppercase">
      <div className="w-full">
        <div className="w-full pb-1 flex justify-center text-center">
          To help with account recovery, please complete below for official documents
        </div>
        <Formik
          initialValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            residencyCountry: data.residencyCountry,
            phone: data.phone,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <div className="w-full flex flex-col gap-1">
                <Input
                  id="firstName"
                  value={values.firstName}
                  placeholder="FIRST NAME"
                  aria-label="First name"
                  error={getDisplayedError({ errors, touched }, 'firstName')}
                  onChange={handleChange}
                />
                <Input
                  id="lastName"
                  value={values.lastName}
                  placeholder="LAST NAME"
                  aria-label="Last name"
                  error={getDisplayedError({ errors, touched }, 'lastName')}
                  onChange={handleChange}
                />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={values.dateOfBirth}
                  placeholder="DATE OF BIRTH"
                  aria-label="Date of birth"
                  error={getDisplayedError({ errors, touched }, 'dateOfBirth')}
                  onChange={handleChange}
                />
                <FlagsSelect
                  name="residencyCountry"
                  value={values.residencyCountry}
                  error={getDisplayedError({ errors, touched }, 'residencyCountry')}
                  onChange={handleChange}
                />
                <Input
                  id="phone"
                  value={values.phone}
                  placeholder="PHONE"
                  aria-label="Phone"
                  error={getDisplayedError({ errors, touched }, 'phone')}
                  onChange={handleChange}
                />
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

      <div className="w-full p-2 flex justify-center"></div>
    </div>
  )
}
